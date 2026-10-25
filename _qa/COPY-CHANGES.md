# botornah.com conversion copy (branch marketing-psych-oct25)

Important: the botornah.com pages are rendered by the Cloudflare Worker `botornah`, not by this repo. This repo is only the app data the Worker syncs. The Worker source is not in git and was not found on the Mac mini. These are exact text swaps for that Worker. The line numbers come from the deployed bundle, read only on Oct 25, 2026. Nothing was deployed or changed in Cloudflare.

The after-preview screenshots show the live page with only these swaps applied in the browser:
- `before-home-desktop.png`
- `before-home-mobile.png`
- `after-preview-home-desktop.png`
- `after-preview-home-mobile.png`

| # | Where (bundle line) | Before | After | Why (principle) |
|---|---|---|---|---|
| 1 | Home `p.lede` (~1384) | Plain answers on whether ChatGPT, Claude or Gemini can handle a real task in your life, and which paid apps AI can replace. Every answer comes with the exact prompt to copy and what can go wrong. | Ask before you pay. Plain answers on whether ChatGPT, Claude or Gemini can do a real task for you, and which paid apps AI can replace, each with the exact prompt to copy and the catch to watch for. | Leads with the job to be done and loss aversion ("before you pay"), and is one sentence shorter. |
| 2 | Home, right after the `.try` "Popular" row (~1386) | (nothing) | `<p class="save-hook">Paying for apps every month? <a href="/savings">See what AI could save you</a></p>` | Mental accounting and loss aversion. Gives the savings calculator, the most concrete money hook, a path from the hero. |
| 3 | Header nav CTA `a.cta` (~1345) | Suggest a task | Ask about a task | Visitors come with a question. "Ask" fits their intent better than "Suggest", which reads like work. |

Not changed: the rotating "Can AI ...? Bot or Nah." headline, which already does the job. The task and app counts, which work as social proof. No invented numbers or testimonials.

To ship it, Kevin first points Claude to the Worker source, or approves pulling the bundle into this repo as `worker/`. Then the swaps get applied on this branch and the dry-run deploy gets checked. Kevin approves the deploy.
