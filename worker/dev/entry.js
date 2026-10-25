// Local test harness only (wrangler dev -c wrangler.dev.toml).
// Wraps the real Worker and swaps env.AI for a stand-in, because the real
// Workers AI binding cannot run offline. The stand-in answers instantly with a
// marker so a fallback is easy to spot in tests.
import worker from "../src/worker.js";
import { aiRoute } from "../src/local-ai.js";

const FAKE_AI = {
  async run(model, body) {
    const text = "WORKERS_AI_STANDIN " + model;
    return { response: text, choices: [{ message: { content: text } }], usage: { prompt_tokens: 1, completion_tokens: 1 } };
  },
};

const withAi = (env) => new Proxy(env, { get: (t, k) => (k === "AI" ? FAKE_AI : t[k]) });

export default {
  async fetch(req, env, ctx) {
    const e = withAi(env);
    const url = new URL(req.url);
    // Direct router call for latency and shape tests: POST {kind,bg,model,body}
    if (url.pathname === "/__dev/ai" && req.method === "POST") {
      const { kind, bg, model, body } = await req.json();
      const t0 = Date.now();
      const r = await aiRoute(e, model, body, 0, { kind, bg }, (env2, m, b) => FAKE_AI.run(m, b));
      return Response.json({ ms: Date.now() - t0, via: r.__via || "workers-ai", text: r.response });
    }
    return worker.fetch(req, e, ctx);
  },
  scheduled(ev, env, ctx) {
    return worker.scheduled(ev, withAi(env), ctx);
  },
};
