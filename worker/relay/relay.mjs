#!/usr/bin/env node
// Poller for Bot or Nah's own AI server. Outbound only: it long-polls the
// botornah Worker over HTTPS, runs each job on the local Ollama, and posts the
// answer back. Nothing listens on a port and nothing is exposed.
//
// Env:
//   RELAY_URL    Worker origin (default https://botornah.com)
//   RELAY_KEY    shared secret, or
//   RELAY_KEY_CMD a command that prints it (so the key can stay in the
//                server's secret store instead of a file or env var)
//   OLLAMA_URL   default http://127.0.0.1:11434
//   OLLAMA_MODEL default qwen3.5:35b-a3b-mxfp8
//   RELAY_SLOTS  parallel jobs (default 2)
//   RELAY_NAME   label stored as the poller heartbeat (default "ai-server")

import { execFileSync } from "node:child_process";

const RELAY_URL = (process.env.RELAY_URL || "https://botornah.com").replace(/\/+$/, "");
const OLLAMA_URL = (process.env.OLLAMA_URL || "http://127.0.0.1:11434").replace(/\/+$/, "");
const MODEL = process.env.OLLAMA_MODEL || "qwen3.5:35b-a3b-mxfp8";
const SLOTS = Math.max(1, Math.min(4, Number(process.env.RELAY_SLOTS || 2)));
const NAME = process.env.RELAY_NAME || "ai-server";
const JOB_TIMEOUT_MS = 280000;

function readKey() {
  if (process.env.RELAY_KEY) return process.env.RELAY_KEY.trim();
  const cmd = (process.env.RELAY_KEY_CMD || "").trim();
  if (!cmd) return "";
  try {
    const [bin, ...args] = cmd.split(/\s+/);
    return execFileSync(bin, args, { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

const KEY = readKey();
if (!KEY) {
  console.error("relay: no key (set RELAY_KEY or RELAY_KEY_CMD)");
  process.exit(78);
}

let stopping = false;
for (const s of ["SIGTERM", "SIGINT"]) process.on(s, () => { stopping = true; log("stopping", { signal: s }); setTimeout(() => process.exit(0), 1500); });

function log(msg, extra) {
  console.log(new Date().toISOString(), msg, extra ? JSON.stringify(extra) : "");
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function post(path, body, timeoutMs) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const r = await fetch(RELAY_URL + path, {
      method: "POST",
      headers: { "content-type": "application/json", "x-relay-key": KEY, "user-agent": "botornah-ai-relay/1" },
      body: JSON.stringify(body),
      signal: ac.signal,
    });
    if (!r.ok) throw new Error(path + " HTTP " + r.status);
    return await r.json();
  } finally {
    clearTimeout(t);
  }
}

// Workers AI style body -> Ollama /api/chat.
function toOllama(body) {
  let messages = Array.isArray(body.messages) ? body.messages : [{ role: "user", content: String(body.prompt || "") }];
  messages = messages.map((m) => ({ role: m.role === "developer" ? "system" : m.role, content: typeof m.content === "string" ? m.content : JSON.stringify(m.content) }));
  const options = {};
  if (body.max_tokens) options.num_predict = Number(body.max_tokens);
  if (typeof body.temperature === "number") options.temperature = body.temperature;
  return { model: MODEL, messages, stream: false, think: false, options };
}

async function runJob(job) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), JOB_TIMEOUT_MS);
  const t0 = Date.now();
  try {
    const r = await fetch(OLLAMA_URL + "/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(toOllama(job.body || {})), signal: ac.signal });
    if (!r.ok) throw new Error("ollama HTTP " + r.status + " " + (await r.text()).slice(0, 200));
    const d = await r.json();
    const text = (d.message && d.message.content) || "";
    const usage = { prompt_tokens: d.prompt_eval_count || 0, completion_tokens: d.eval_count || 0, total_tokens: (d.prompt_eval_count || 0) + (d.eval_count || 0) };
    return { text, usage, ms: Date.now() - t0 };
  } finally {
    clearTimeout(t);
  }
}

async function slot(i) {
  let backoff = 1000;
  while (!stopping) {
    let job = null;
    try {
      const r = await post("/__ai/next", { hold_ms: 25000, name: NAME }, 40000);
      job = r && r.job;
      backoff = 1000;
    } catch (e) {
      log("poll error", { slot: i, error: String(e).slice(0, 160), retry_ms: backoff });
      await sleep(backoff);
      backoff = Math.min(backoff * 2, 30000);
      continue;
    }
    if (!job) continue;
    let res;
    try {
      res = await runJob(job);
      log("job done", { slot: i, id: job.id, kind: job.kind, asked: job.model, ms: res.ms, in: res.usage.prompt_tokens, out: res.usage.completion_tokens });
    } catch (e) {
      res = { error: String(e).slice(0, 400) };
      log("job failed", { slot: i, id: job.id, kind: job.kind, error: res.error });
    }
    for (let a = 0; a < 3; a++) {
      try {
        const ok = await post("/__ai/done", { id: job.id, ...res }, 20000);
        if (!ok.ok) log("late answer ignored", { id: job.id });
        break;
      } catch (e) {
        log("done error", { id: job.id, error: String(e).slice(0, 160) });
        await sleep(1000 * (a + 1));
      }
    }
  }
}

// Heartbeat so the Worker knows the server is alive even while every slot is busy.
setInterval(() => { post("/__ai/beat", { name: NAME }, 8000).catch(() => {}); }, 10000);

log("relay start", { url: RELAY_URL, model: MODEL, slots: SLOTS });
await Promise.all(Array.from({ length: SLOTS }, (_, i) => slot(i)));
