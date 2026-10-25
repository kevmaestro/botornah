// Bot or Nah's own AI server: outbound-only relay.
//
// The Worker never calls out to the AI server. Jobs go into a D1 table
// (ai_jobs, on the existing DB1 binding). A small worker on the AI server
// long-polls POST /__ai/next over HTTPS with a shared secret, runs the job,
// and posts the answer to POST /__ai/done. The caller waits a short time for
// that answer and falls back to Workers AI if none arrives, so the site keeps
// working when the server is off.
//
// Off switches, fastest first:
//   1. stop the poller on the server   -> the next call goes straight to Workers AI
//   2. `wrangler secret delete AI_RELAY_KEY` -> relay disabled, routes return 404
//   3. `wrangler rollback <previous version id>`

const DEFAULTS = {
  // How long a job may sit unclaimed before we give up and use Workers AI.
  ackMs: { fg: 2500, bg: 20000 },
  // Total wait for an answer once the server has claimed the job.
  totalMs: { reverse: 60000, kit: 240000, test: 120000, other: 90000 },
  // Poller counts as online if it polled within this window.
  aliveMs: 45000,
  // Long-poll hold for /__ai/next.
  holdMs: 25000,
};

const SCHEMA = [
  "CREATE TABLE IF NOT EXISTS ai_jobs (id TEXT PRIMARY KEY, kind TEXT NOT NULL, model TEXT NOT NULL, prio INTEGER NOT NULL DEFAULT 1, status TEXT NOT NULL, body TEXT NOT NULL, result TEXT, error TEXT, created INTEGER NOT NULL, taken INTEGER, finished INTEGER)",
  "CREATE INDEX IF NOT EXISTS ai_jobs_pick ON ai_jobs (status, prio, created)",
  "CREATE TABLE IF NOT EXISTS ai_meta (k TEXT PRIMARY KEY, v TEXT NOT NULL, t INTEGER NOT NULL)",
];

let schemaReady = false;
async function ensureSchema(db) {
  if (schemaReady) return;
  await db.batch(SCHEMA.map((s) => db.prepare(s)));
  schemaReady = true;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const nowMs = () => Date.now();
const jid = () => "aj_" + [...crypto.getRandomValues(new Uint8Array(10))].map((b) => b.toString(16).padStart(2, "0")).join("");

function enabled(env, kind) {
  if (!env.AI_RELAY_KEY || !env.DB1 || env.LOCAL_AI !== "1") return false;
  const kinds = String(env.LOCAL_AI_KINDS || "reverse,kit").split(",").map((s) => s.trim());
  return kinds.includes(kind) || kinds.includes("*");
}

function num(v, d) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : d;
}

// Constant-time compare of the shared secret.
async function keyOk(req, env) {
  const got = req.headers.get("x-relay-key") || "";
  const want = env.AI_RELAY_KEY || "";
  if (!want || got.length !== want.length) return false;
  const enc = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(got)),
    crypto.subtle.digest("SHA-256", enc.encode(want)),
  ]);
  const x = new Uint8Array(a), y = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

async function lastSeen(db) {
  const r = await db.prepare("SELECT t FROM ai_meta WHERE k = 'poller'").first().catch(() => null);
  return r ? Number(r.t) : 0;
}

// Shape the server's answer like a Workers AI chat result so every caller's
// existing parsing (response / choices[0].message.content) keeps working.
function asWorkersAiResult(text, usage) {
  return {
    response: text,
    choices: [{ index: 0, message: { role: "assistant", content: text }, finish_reason: "stop" }],
    usage: usage || {},
    __via: "local",
  };
}

// Drop-in for aiRun(env, model, body, lim). `o` = { kind, bg }.
export async function aiRoute(env, model, body, lim, o, viaWorkersAI) {
  const kind = (o && o.kind) || "other";
  const bg = !!(o && o.bg);
  if (!enabled(env, kind)) return viaWorkersAI(env, model, body, lim);
  const db = env.DB1;
  const t0 = nowMs();
  let why = "";
  try {
    await ensureSchema(db);
    const seen = await lastSeen(db);
    if (t0 - seen > num(env.LOCAL_AI_ALIVE_MS, DEFAULTS.aliveMs)) {
      why = "offline";
    } else {
      const id = jid();
      const ackMs = bg ? num(env.LOCAL_AI_ACK_BG_MS, DEFAULTS.ackMs.bg) : num(env.LOCAL_AI_ACK_MS, DEFAULTS.ackMs.fg);
      const totalMs = num(env["LOCAL_AI_TOTAL_MS_" + kind.toUpperCase()], DEFAULTS.totalMs[kind] || DEFAULTS.totalMs.other);
      await db
        .prepare("INSERT INTO ai_jobs (id, kind, model, prio, status, body, created) VALUES (?, ?, ?, ?, 'new', ?, ?)")
        .bind(id, kind, model, bg ? 1 : 0, JSON.stringify(body), t0)
        .run();
      let claimed = false, lastBeatCheck = 0;
      for (;;) {
        const el = nowMs() - t0;
        await sleep(el < 3000 ? 150 : el < 20000 ? 400 : 800);
        const row = await db.prepare("SELECT status, result, error FROM ai_jobs WHERE id = ?").bind(id).first();
        const st = row && row.status;
        if (st === "done") {
          let out = null;
          try { out = JSON.parse(row.result); } catch {}
          const text = out && typeof out.text === "string" ? out.text : "";
          if (!text.trim()) { why = "empty"; break; }
          console.log("ai local", JSON.stringify({ kind, model, bg, ms: nowMs() - t0, out: text.length }));
          return asWorkersAiResult(text, out.usage);
        }
        if (st === "error") { why = "server error: " + String(row.error || "").slice(0, 120); break; }
        if (st === "taken") claimed = true;
        if (!claimed && nowMs() - t0 > ackMs) {
          // Only cancel if still unclaimed; if the server grabbed it this instant, keep waiting.
          const del = await db.prepare("DELETE FROM ai_jobs WHERE id = ? AND status = 'new'").bind(id).run();
          if (del.meta && del.meta.changes) { why = "not claimed in " + ackMs + "ms"; break; }
          claimed = true;
        }
        // Server went quiet mid-job (crash, sleep, network): stop waiting early.
        if (claimed && el > 15000 && nowMs() - lastBeatCheck > 5000 && ((lastBeatCheck = nowMs()), nowMs() - (await lastSeen(db)) > num(env.LOCAL_AI_SILENT_MS, 30000))) {
          await db.prepare("UPDATE ai_jobs SET status = 'abandoned', finished = ? WHERE id = ? AND status = 'taken'").bind(nowMs(), id).run();
          why = "server went silent";
          break;
        }
        if (claimed && nowMs() - t0 > ackMs + totalMs) {
          await db.prepare("UPDATE ai_jobs SET status = 'abandoned', finished = ? WHERE id = ? AND status = 'taken'").bind(nowMs(), id).run();
          why = "timeout " + (nowMs() - t0) + "ms";
          break;
        }
      }
    }
  } catch (e) {
    why = "relay failed: " + String(e).slice(0, 160);
  }
  console.log("ai fallback", JSON.stringify({ kind, model, bg, why, waited: nowMs() - t0 }));
  return viaWorkersAI(env, model, body, lim);
}

// Routes used only by the poller on Bot or Nah's own AI server.
// Anything without the right key gets a plain 404, same as a missing page.
export async function relayRoute(req, env, path) {
  const nf = () => new Response("Not found", { status: 404 });
  if (!env.AI_RELAY_KEY || !env.DB1 || req.method !== "POST") return nf();
  if (!(await keyOk(req, env))) return nf();
  const db = env.DB1;
  await ensureSchema(db);
  const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });
  let input = {};
  try { input = await req.json(); } catch {}

  if (path === "/__ai/next") {
    const hold = Math.min(num(input.hold_ms, DEFAULTS.holdMs), 28000);
    const until = nowMs() + hold;
    const beat = () =>
      db.prepare("INSERT INTO ai_meta (k, v, t) VALUES ('poller', ?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v, t = excluded.t")
        .bind(String(input.name || "server").slice(0, 40), nowMs()).run();
    await beat();
    while (nowMs() < until) {
      const job = await db
        .prepare("UPDATE ai_jobs SET status = 'taken', taken = ? WHERE id = (SELECT id FROM ai_jobs WHERE status = 'new' ORDER BY prio, created LIMIT 1) AND status = 'new' RETURNING id, kind, model, body")
        .bind(nowMs())
        .first();
      if (job) {
        let body = {};
        try { body = JSON.parse(job.body); } catch {}
        return json({ job: { id: job.id, kind: job.kind, model: job.model, body } });
      }
      await sleep(250);
    }
    return json({ job: null });
  }

  if (path === "/__ai/beat") {
    await db.prepare("INSERT INTO ai_meta (k, v, t) VALUES ('poller', ?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v, t = excluded.t").bind(String(input.name || "server").slice(0, 40), nowMs()).run();
    return json({ ok: true });
  }

  if (path === "/__ai/done") {
    const id = String(input.id || "");
    if (!/^aj_[a-f0-9]{20}$/.test(id)) return json({ ok: false }, 400);
    const r = input.error
      ? await db.prepare("UPDATE ai_jobs SET status = 'error', error = ?, finished = ? WHERE id = ? AND status = 'taken'").bind(String(input.error).slice(0, 500), nowMs(), id).run()
      : await db
          .prepare("UPDATE ai_jobs SET status = 'done', result = ?, finished = ? WHERE id = ? AND status = 'taken'")
          .bind(JSON.stringify({ text: String(input.text || ""), usage: input.usage || {} }), nowMs(), id)
          .run();
    return json({ ok: !!(r.meta && r.meta.changes) });
  }

  if (path === "/__ai/status") {
    const seen = await lastSeen(db);
    const day = nowMs() - 86400000;
    const rows = (await db.prepare("SELECT kind, status, COUNT(*) n, AVG(finished - created) avg_ms FROM ai_jobs WHERE created > ? GROUP BY kind, status").bind(day).all()).results || [];
    return json({ online: nowMs() - seen < DEFAULTS.aliveMs, last_poll_ms_ago: seen ? nowMs() - seen : null, kinds: env.LOCAL_AI_KINDS || "reverse,kit", enabled: env.LOCAL_AI === "1", last24h: rows });
  }

  return nf();
}

// Housekeeping from the cron: keep the job table small.
export async function relaySweep(env) {
  if (!env.AI_RELAY_KEY || !env.DB1) return "off";
  await ensureSchema(env.DB1);
  const r = await env.DB1.prepare("DELETE FROM ai_jobs WHERE created < ?").bind(nowMs() - 2 * 86400000).run();
  return "swept " + ((r.meta && r.meta.changes) || 0);
}
