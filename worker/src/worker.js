import{HOOK_PATH}from"./hook.local.js";
import{aiRoute,relayRoute,relaySweep}from"./local-ai.js";
var styles_default=`:root{
--paper:#f6f2e9;--paper2:#efe9dc;--card:#fffdf8;--ink:#141414;--ink2:#2e2c27;--slate:#5d5a52;--mute:#8a867c;
--hair:#e4ddcd;--hair2:#cfc6b2;
--bot:#d6f2de;--bot-ink:#0b6420;--bot-hi:#22c55e;
--half:#fdf1c4;--half-ink:#6e5200;--half-hi:#ffc83d;
--nah:#fde0ea;--nah-ink:#96173f;--nah-hi:#ff4f7b;
--lav:#e7e1f6;--sky:#dcebf8;--mint:#d6f2de;--yellow:#fdf1c4;--rose:#fde0ea;
--link:#0a58b0;
--sans:"Inter",ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
--serif:"Instrument Serif",ui-serif,Georgia,serif;
--mono:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
--ease:cubic-bezier(.23,1,.32,1);--r:18px;--rs:10px;
--shadow:0 1px 0 rgba(20,20,20,.04),0 10px 30px -12px rgba(20,20,20,.18);
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-padding-top:90px}
body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.6 var(--sans);font-feature-settings:"ss01","cv11";-webkit-font-smoothing:antialiased}
body::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.35;
background-image:radial-gradient(rgba(20,20,20,.07) 1px,transparent 1px);background-size:22px 22px}
body>*{position:relative;z-index:1}
a{color:var(--link);text-underline-offset:3px}
img,svg{display:block}
::selection{background:var(--half-hi);color:var(--ink)}
:focus-visible{outline:3px solid var(--ink);outline-offset:3px;border-radius:6px}
.wrap{max-width:1180px;margin:0 auto;padding:0 20px}
.skip{position:absolute;left:-9999px;top:8px;background:var(--ink);color:#fff;padding:8px 14px;border-radius:8px;z-index:50}
.skip:focus{left:12px}


.top{position:sticky;top:0;z-index:40;background:rgba(246,242,233,.86);backdrop-filter:saturate(1.4) blur(10px);-webkit-backdrop-filter:saturate(1.4) blur(10px);border-bottom:1px solid var(--hair)}
.nav{display:flex;align-items:center;gap:18px;min-height:68px}
.logo{display:inline-flex;align-items:center;gap:8px;font-size:20px;text-decoration:none;color:var(--ink);letter-spacing:-.03em;white-space:nowrap}
.logo b{font-weight:850}.logo i{font-style:normal;font-weight:500;color:var(--mute)}
.logo .mark{width:36px;height:31px;transition:transform .5s var(--ease)}
.logo:hover .mark{transform:rotate(-8deg)}
.menu{display:flex;gap:4px;margin-left:auto;align-items:center}
.menu a{color:var(--ink2);text-decoration:none;font-size:15px;font-weight:500;padding:8px 12px;border-radius:999px;transition:background-color .2s ease}
.menu a:hover{background:var(--paper2)}
.menu a[aria-current=page]{background:var(--ink);color:#fff}
.menu .cta{background:var(--ink);color:#fff;margin-left:6px}
.menu .cta:hover{background:#000}
.burger{display:none;margin-left:auto;background:none;border:1px solid var(--hair2);border-radius:999px;padding:8px 14px;font:600 14px var(--sans);color:var(--ink);cursor:pointer}
@media (max-width:860px){
 .burger{display:inline-flex}
 .menu{display:none;position:absolute;left:0;right:0;top:100%;flex-direction:column;align-items:stretch;background:var(--paper);border-bottom:1px solid var(--hair);padding:10px 16px 16px;gap:2px}
 .menu.open{display:flex}
 .menu a{padding:12px 14px;font-size:17px}
 .menu .cta{margin:6px 0 0;text-align:center}
}


h1,h2,h3{font-weight:800;letter-spacing:-.035em;text-wrap:balance;margin:0}
h1{font-size:clamp(40px,7.2vw,92px);line-height:.98}
h2{font-size:clamp(30px,4.4vw,52px);line-height:1.02}
h3{font-size:20px;line-height:1.25;letter-spacing:-.02em}
.serif{font-family:var(--serif);font-weight:400;font-style:italic;letter-spacing:-.01em}
.eyebrow{display:inline-flex;align-items:center;gap:8px;font:600 12px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--slate)}
.eyebrow::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--bot-hi);box-shadow:0 0 0 4px rgba(34,197,94,.18)}
.lede{font-size:clamp(18px,1.6vw,21px);line-height:1.55;color:var(--ink2);max-width:640px;margin:0}
.muted{color:var(--slate)}
.small{font-size:14px}
section{padding:72px 0}
.sec-head{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:28px;flex-wrap:wrap}
.sec-head p{margin:10px 0 0;color:var(--slate);max-width:560px}
.link-arrow{font-weight:600;color:var(--ink);text-decoration:none;border-bottom:2px solid var(--ink);padding-bottom:2px;white-space:nowrap}
.link-arrow:hover{border-color:var(--nah-hi)}


.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 22px;border-radius:999px;background:var(--ink);color:#fff;text-decoration:none;font:600 16px/1 var(--sans);border:0;cursor:pointer;transition:transform .16s var(--ease),background-color .2s ease,box-shadow .2s ease;box-shadow:0 6px 18px -8px rgba(0,0,0,.5)}
.btn:hover{background:#000}
.btn:active{transform:scale(.97)}
.btn.ghost{background:transparent;color:var(--ink);border:1.5px solid var(--ink);box-shadow:none}
.btn.ghost:hover{background:var(--card)}
.btn.small{padding:10px 16px;font-size:14px}
.row{display:flex;gap:12px;flex-wrap:wrap;align-items:center}


.stamp{display:inline-flex;align-items:center;gap:7px;font:800 12px/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;padding:8px 12px 8px 10px;border-radius:8px;border:2px solid currentColor;white-space:nowrap}
.stamp::before{content:"";width:9px;height:9px;border-radius:50%;background:currentColor}
.stamp.bot{background:var(--bot);color:var(--bot-ink)}
.stamp.half{background:var(--half);color:var(--half-ink)}
.stamp.nah{background:var(--nah);color:var(--nah-ink)}
.stamp.big{font-size:clamp(20px,2.6vw,30px);padding:14px 22px 14px 18px;border-width:3px;border-radius:14px;transform:rotate(-4deg);box-shadow:0 12px 30px -14px rgba(0,0,0,.35)}
.stamp.big::before{width:14px;height:14px}
.stamp-in{animation:stamp .55s var(--ease) .15s both}
@keyframes stamp{0%{opacity:0;transform:rotate(-14deg) scale(1.6)}60%{opacity:1}100%{opacity:1;transform:rotate(-4deg) scale(1)}}


.hero{padding:64px 0 40px;overflow:hidden}
.hero-grid{display:grid;grid-template-columns:1.25fr .9fr;gap:48px;align-items:center}
.hero h1{margin:18px 0 22px}
.hero h1 .serif{display:block;font-size:.9em;color:var(--ink2)}
.hero .lede{margin-bottom:28px}
.search{position:relative;max-width:620px}
.search form{display:flex;align-items:center;background:var(--card);border:2px solid var(--ink);border-radius:999px;padding:6px 6px 6px 20px;box-shadow:6px 6px 0 var(--ink);transition:box-shadow .2s var(--ease),transform .2s var(--ease)}
.search form:focus-within{box-shadow:3px 3px 0 var(--ink);transform:translate(3px,3px)}
.search svg{flex:none;width:20px;height:20px;color:var(--slate)}
.search input{flex:1;min-width:0;border:0;background:transparent;font:500 17px var(--sans);color:var(--ink);padding:12px 12px;outline:none}
.search input::placeholder{color:var(--mute)}
.search button{padding:12px 20px}
.results{position:absolute;left:0;right:0;top:calc(100% + 12px);background:var(--card);border:1.5px solid var(--ink);border-radius:16px;box-shadow:var(--shadow);padding:6px;list-style:none;margin:0;z-index:30;display:none;transform-origin:top center}
.results.show{display:block;animation:pop .18s var(--ease)}
@keyframes pop{from{opacity:0;transform:translateY(-4px) scale(.98)}to{opacity:1;transform:none}}
.results a{display:flex;gap:12px;align-items:center;justify-content:space-between;padding:12px 14px;border-radius:10px;text-decoration:none;color:var(--ink);font-weight:500}
.results a[aria-selected=true],.results a:hover{background:var(--paper2)}
.results .stamp{font-size:10px;padding:5px 8px 5px 7px}
.results .empty{padding:14px;color:var(--slate)}
.try{margin-top:16px;font-size:14px;color:var(--slate);display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.try a{color:var(--ink2);background:var(--card);border:1px solid var(--hair2);padding:5px 12px;border-radius:999px;text-decoration:none;transition:transform .16s var(--ease),border-color .2s}
.try a:hover{border-color:var(--ink)}
.try a:active{transform:scale(.97)}
.facts{display:flex;gap:28px;margin-top:36px;flex-wrap:wrap}
.facts div{font-size:14px;color:var(--slate)}
.facts b{display:block;font-size:30px;color:var(--ink);letter-spacing:-.03em;line-height:1.1}


.deck{position:relative;height:460px}
.dcard{position:absolute;width:min(360px,92%);background:var(--card);border:1.5px solid var(--ink);border-radius:20px;padding:22px 22px 20px;box-shadow:8px 8px 0 var(--ink);text-decoration:none;color:var(--ink);transition:transform .35s var(--ease)}
.dcard .qq{font-size:20px;font-weight:750;letter-spacing:-.02em;line-height:1.2;margin:16px 0 10px}
.dcard p{margin:0;font-size:14px;color:var(--slate);line-height:1.5}
.dcard .stamp{position:absolute;top:-16px;right:18px;transform:rotate(6deg)}
.dcard:nth-of-type(1){top:0;left:6%;transform:rotate(-5deg);animation:deal .7s var(--ease) .05s both}
.dcard:nth-of-type(2){top:150px;left:22%;transform:rotate(3deg);animation:deal .7s var(--ease) .18s both;background:#fffef6}
.dcard:nth-of-type(3){top:300px;left:2%;transform:rotate(-2deg);animation:deal .7s var(--ease) .31s both}
.dcard:hover{transform:rotate(0) translateY(-6px);z-index:5}
@keyframes deal{from{opacity:0;translate:0 40px;rotate:8deg}to{opacity:1;translate:0 0;rotate:0deg}}
@media (max-width:980px){.hero-grid{grid-template-columns:1fr}.deck{height:420px;max-width:460px}}
@media (max-width:520px){.deck{display:none}.hero{padding-top:40px}}


.legend{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:1.5px solid var(--ink);border-radius:var(--r);overflow:hidden;background:var(--card)}
.legend>div{padding:26px 24px}
.legend>div+div{border-left:1.5px solid var(--ink)}
.legend h3{margin:14px 0 6px}
.legend p{margin:0;color:var(--slate);font-size:15px}
.legend .n{float:right;font:800 13px var(--sans);color:var(--mute)}
@media (max-width:760px){.legend{grid-template-columns:1fr}.legend>div+div{border-left:0;border-top:1.5px solid var(--ink)}}


.cats{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px}
.cat{position:relative;display:flex;flex-direction:column;gap:8px;min-height:170px;padding:20px;border-radius:var(--r);text-decoration:none;color:var(--ink);border:1.5px solid transparent;transition:transform .25s var(--ease),border-color .2s,box-shadow .25s var(--ease)}
.cat:hover{transform:translateY(-4px);border-color:var(--ink);box-shadow:5px 5px 0 var(--ink)}
.cat:active{transform:translateY(-2px) scale(.99)}
.cat .ic{width:44px;height:44px;border-radius:12px;background:var(--ink);color:#fff;display:grid;place-items:center;font:800 18px var(--sans)}
.cat h3{font-size:19px;margin-top:auto}
.cat p{margin:0;font-size:14px;color:var(--ink2);line-height:1.45}
.cat .count{position:absolute;top:18px;right:18px;font:700 12px var(--sans);background:rgba(255,255,255,.7);padding:4px 9px;border-radius:999px}
.t-mint{background:var(--mint)}.t-sky{background:var(--sky)}.t-lav{background:var(--lav)}.t-yellow{background:var(--yellow)}.t-rose{background:var(--rose)}


.vgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
.vcard{position:relative;display:flex;flex-direction:column;gap:12px;background:var(--card);border:1.5px solid var(--hair2);border-radius:var(--r);padding:22px;text-decoration:none;color:var(--ink);transition:transform .25s var(--ease),border-color .2s,box-shadow .25s var(--ease)}
.vcard:hover{transform:translateY(-4px);border-color:var(--ink);box-shadow:5px 5px 0 var(--ink)}
.vcard:active{transform:translateY(-2px) scale(.99)}
.vcard .top-row{display:flex;justify-content:space-between;align-items:center;gap:10px}
.vcard .cn{font-size:13px;color:var(--slate);font-weight:500}
.vcard h3{font-size:21px}
.vcard p{margin:0;color:var(--slate);font-size:15px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.vcard .go{margin-top:auto;font-weight:600;font-size:14px;color:var(--ink);display:flex;align-items:center;gap:6px}
.vcard .go span{transition:transform .25s var(--ease)}
.vcard:hover .go span{transform:translateX(4px)}
.vcard[hidden]{display:none}


.filters{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:28px 0 24px;padding:14px;background:var(--card);border:1.5px solid var(--hair2);border-radius:var(--r);position:sticky;top:80px;z-index:10}
.chip{font:600 14px var(--sans);padding:9px 14px;border-radius:999px;border:1.5px solid var(--hair2);background:var(--paper);color:var(--ink);cursor:pointer;transition:transform .16s var(--ease),background-color .2s,border-color .2s}
.chip:active{transform:scale(.97)}
.chip[aria-pressed=true]{background:var(--ink);color:#fff;border-color:var(--ink)}
.filters select,.filters input{font:500 15px var(--sans);padding:9px 14px;border-radius:999px;border:1.5px solid var(--hair2);background:var(--paper);color:var(--ink)}
.filters input{flex:1;min-width:180px}
.filters .count{margin-left:auto;font-size:14px;color:var(--slate)}
.noresults{display:none;padding:40px;text-align:center;border:1.5px dashed var(--hair2);border-radius:var(--r);color:var(--slate)}


.band{background:var(--ink);color:#f4efe4;border-radius:28px;padding:56px;position:relative;overflow:hidden}
.band h2{color:#fff}
.band .lede{color:#cfc9bb}
.band a.vcard{background:#1f1e1b;border-color:#3a3833;color:#fff}
.band a.vcard p,.band a.vcard .cn{color:#b9b3a5}
.band a.vcard .go{color:#fff}
.band a.vcard:hover{border-color:var(--half-hi);box-shadow:5px 5px 0 var(--half-hi)}
.band .link-arrow{color:#fff;border-color:#fff}
.band .glyph{position:absolute;right:-60px;top:-60px;width:320px;opacity:.08;pointer-events:none}
@media (max-width:640px){.band{padding:32px 22px;border-radius:22px}}


.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;counter-reset:s}
.step{background:var(--card);border:1.5px solid var(--hair2);border-radius:var(--r);padding:24px;counter-increment:s}
.step::before{content:counter(s,decimal-leading-zero);display:block;font:400 44px/1 var(--serif);font-style:italic;color:var(--mute);margin-bottom:14px}
.step p{margin:8px 0 0;color:var(--slate);font-size:15px}
@media (max-width:760px){.steps{grid-template-columns:1fr}}


.signup{display:grid;grid-template-columns:1.1fr 1fr;gap:40px;align-items:center;background:var(--half);border:1.5px solid var(--ink);border-radius:28px;padding:48px;box-shadow:8px 8px 0 var(--ink)}
.signup h2{font-size:clamp(28px,3.6vw,44px)}
.signup p{margin:12px 0 0;color:var(--ink2)}
@media (max-width:820px){.signup{grid-template-columns:1fr;padding:30px 22px;gap:22px}}
.form{display:flex;flex-direction:column;gap:12px}
.form .inline{display:flex;gap:8px;background:var(--card);border:1.5px solid var(--ink);border-radius:999px;padding:6px}
.form .inline input{flex:1;min-width:0;border:0;background:transparent;padding:10px 14px;font:500 16px var(--sans);outline:none;color:var(--ink)}
.field{display:flex;flex-direction:column;gap:6px}
.field label{font-weight:600;font-size:14px}
.field input,.field textarea,.field select{font:500 16px var(--sans);padding:13px 15px;border-radius:12px;border:1.5px solid var(--hair2);background:var(--card);color:var(--ink);transition:border-color .2s}
.field input:focus,.field textarea:focus,.field select:focus{border-color:var(--ink);outline:none}
.field textarea{min-height:120px;resize:vertical}
.field .hint{font-size:13px;color:var(--slate)}
.hp{position:absolute!important;left:-10000px!important;width:1px;height:1px;overflow:hidden}
.msg{font-size:15px;font-weight:600;min-height:1.4em;margin:0}
.msg.ok{color:var(--bot-ink)}.msg.err{color:var(--nah-ink)}
.radio-row{display:flex;gap:10px;flex-wrap:wrap}
.radio-row label{display:flex;gap:8px;align-items:center;padding:10px 14px;border:1.5px solid var(--hair2);border-radius:999px;background:var(--card);cursor:pointer;font-weight:500}
.radio-row input:checked+span{font-weight:700}
.radio-row label:has(input:checked){border-color:var(--ink);background:var(--paper2)}


.spon{display:flex;gap:16px;align-items:center;justify-content:space-between;flex-wrap:wrap;border:1.5px dashed var(--hair2);border-radius:var(--r);padding:18px 22px;color:var(--slate);font-size:15px;background:rgba(255,253,248,.6)}
.spon b{color:var(--ink)}
.spon-top{margin:0 0 28px}
.spon-in{margin:0 0 36px}
.spon .tag{font:700 11px var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--mute);display:block;margin-bottom:4px}


.crumbs{font-size:14px;color:var(--slate);margin:32px 0 0;display:flex;gap:8px;flex-wrap:wrap}
.crumbs a{color:var(--slate);text-decoration:none}.crumbs a:hover{color:var(--ink);text-decoration:underline}
.vhead{display:grid;grid-template-columns:1fr auto;gap:32px;align-items:center;padding:28px 0 36px;border-bottom:1.5px solid var(--ink)}
.vhead h1{font-size:clamp(36px,5.6vw,68px)}
.vhead .lede{margin-top:20px}
.meta{display:flex;gap:16px;flex-wrap:wrap;margin-top:20px;font-size:14px;color:var(--slate)}
.meta span{display:inline-flex;gap:6px;align-items:center}
@media (max-width:760px){.vhead{grid-template-columns:1fr}.vhead .stamp.big{justify-self:start;order:-1}}
.vbody{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:48px;padding:40px 0 20px}
@media (max-width:960px){.vbody{grid-template-columns:1fr}}
.block{margin-bottom:44px}
.block>h2{font-size:clamp(24px,2.6vw,32px);margin-bottom:16px;display:flex;align-items:center;gap:12px}
.block>h2 .num{font:400 20px var(--serif);font-style:italic;color:var(--mute)}
.why{list-style:none;padding:0;margin:0;display:grid;gap:10px}
.why li{display:flex;gap:14px;background:var(--card);border:1.5px solid var(--hair);border-radius:14px;padding:16px 18px}
.why li::before{content:"";flex:none;width:10px;height:10px;border-radius:50%;margin-top:8px;background:var(--dot,var(--ink))}
.v-bot .why{--dot:var(--bot-hi)}.v-half .why{--dot:var(--half-hi)}.v-nah .why{--dot:var(--nah-hi)}
.prompt{background:#171614;color:#efe9dc;border-radius:20px;overflow:hidden;border:1.5px solid var(--ink);box-shadow:8px 8px 0 var(--half-hi)}
.prompt .bar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px 12px 18px;border-bottom:1px solid #2f2d29;background:#1e1d1a}
.prompt .dots{display:flex;gap:6px}.prompt .dots i{width:10px;height:10px;border-radius:50%;background:#3b3934}
.prompt .dots i:nth-child(1){background:var(--nah-hi)}.prompt .dots i:nth-child(2){background:var(--half-hi)}.prompt .dots i:nth-child(3){background:var(--bot-hi)}

.copy{font:700 14px var(--sans);padding:10px 16px;border-radius:999px;border:0;background:var(--half-hi);color:var(--ink);cursor:pointer;display:inline-flex;gap:8px;align-items:center;transition:transform .16s var(--ease),background-color .2s}
.copy:active{transform:scale(.96)}
.copy.done{background:var(--bot-hi)}
.prompt pre{margin:0;padding:22px 22px 26px;font:14px/1.7 var(--mono);white-space:pre-wrap;word-break:break-word;max-height:560px;overflow:auto}
.prompt pre mark{background:rgba(255,200,61,.18);color:var(--half-hi);border-radius:4px;padding:0 3px}
.ol{counter-reset:o;list-style:none;padding:0;margin:0;display:grid;gap:10px}
.ol li{counter-increment:o;display:flex;gap:14px;align-items:flex-start;padding:4px 0}
.ol li::before{content:counter(o);flex:none;width:30px;height:30px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;font:700 14px var(--sans)}
.warn{background:var(--nah);border:1.5px solid var(--nah-ink);border-radius:18px;padding:20px 22px;color:#4a0b1f}
.warn ul{margin:0;padding-left:20px}.warn li{margin:6px 0}
.tools{background:var(--card);border:1.5px solid var(--hair2);border-radius:18px;padding:18px 22px}
.side{display:flex;flex-direction:column;gap:16px;position:sticky;top:96px;align-self:start}
.panel{background:var(--card);border:1.5px solid var(--ink);border-radius:18px;padding:20px}
.panel h3{font-size:17px;margin-bottom:10px}
.vote{display:flex;gap:8px;margin-top:6px}
.vote button{flex:1;font:700 15px var(--sans);padding:12px;border-radius:12px;border:1.5px solid var(--ink);background:var(--paper);color:var(--ink);cursor:pointer;transition:transform .16s var(--ease),background-color .2s}
.vote button:active{transform:scale(.96)}
.vote button[data-v=yes]:hover,.vote button.on[data-v=yes]{background:var(--bot)}
.vote button[data-v=no]:hover,.vote button.on[data-v=no]{background:var(--nah)}
.vote button:disabled{cursor:default;opacity:.75}
.tally{font-size:13px;color:var(--slate);margin:10px 0 0}
.toc{list-style:none;margin:0;padding:0;font-size:15px}
.toc a{display:block;padding:6px 0;color:var(--ink2);text-decoration:none}.toc a:hover{color:var(--ink);text-decoration:underline}
.related{padding:24px 0 72px}


.page-head{padding:56px 0 36px;border-bottom:1.5px solid var(--ink);margin-bottom:40px}
.page-head h1{font-size:clamp(40px,6vw,76px);margin:14px 0 18px}
.prose{max-width:740px;font-size:17px}
.prose h2{font-size:26px;margin:40px 0 10px}
.prose p,.prose li{color:var(--ink2)}
.prose li{margin:6px 0}
.cards3{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}
.box{background:var(--card);border:1.5px solid var(--hair2);border-radius:var(--r);padding:24px}
.box p{margin:8px 0 0;color:var(--slate)}
.price-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:16px}
.price{position:relative;background:var(--card);border:1.5px solid var(--ink);border-radius:var(--r);padding:26px;display:flex;flex-direction:column;gap:10px}
.price .amt{font-size:42px;font-weight:850;letter-spacing:-.04em;line-height:1}
.price .amt small{font-size:15px;font-weight:500;color:var(--slate);letter-spacing:0}
.price p{margin:0;color:var(--slate);font-size:15px}
.price .avail{margin-top:auto;padding-top:12px;font-size:13px;font-weight:700;color:var(--bot-ink)}
.price.feat{background:var(--ink);color:#fff}.price.feat p{color:#cfc9bb}.price.feat .amt small{color:#cfc9bb}.price.feat .avail{color:var(--bot-hi)}
.note{background:var(--card);border:1.5px solid var(--hair2);border-radius:var(--r);padding:18px 22px;color:var(--ink2);margin-top:24px}
.two{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start}
@media (max-width:860px){.two{grid-template-columns:1fr}}
table{width:100%;border-collapse:collapse;font-size:15px;background:var(--card);border:1.5px solid var(--hair2);border-radius:var(--r);overflow:hidden}
th,td{text-align:left;padding:14px 16px;border-bottom:1px solid var(--hair);vertical-align:top}
th{font-size:13px;color:var(--slate);font-weight:600;background:var(--paper2)}
td.p{font-weight:750;white-space:nowrap}
@media (max-width:600px){thead{display:none}tr{display:block;border-bottom:1px solid var(--hair);padding:10px 4px}td{display:block;border:0;padding:3px 12px}}


footer{margin-top:40px;background:var(--ink);color:#bdb7a8;padding:64px 0 40px;font-size:15px}
footer a{color:#e9e3d6;text-decoration:none}footer a:hover{text-decoration:underline}
.fgrid{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:32px}
.fgrid h4{color:#fff;font-size:13px;letter-spacing:.12em;text-transform:uppercase;margin:0 0 14px}
.fgrid ul{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.flogo{display:flex;align-items:center;gap:10px;color:#fff;font-size:22px;letter-spacing:-.03em;margin-bottom:12px}
.flogo b{font-weight:850}.flogo i{font-style:normal;color:#8a867c;font-weight:500}
.flogo svg{width:40px;height:34px}
.fbottom{border-top:1px solid #2f2d29;margin-top:40px;padding-top:22px;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;font-size:13px;color:#8a867c}
@media (max-width:820px){.fgrid{grid-template-columns:1fr 1fr}}


@supports (animation-timeline:view()){
 .reveal{animation:rise linear both;animation-timeline:view();animation-range:entry 0% entry 40%}
 @keyframes rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
}
@media (prefers-reduced-motion:reduce){
 *,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
}
.hero-grid>*,.signup>*,.two>*,.vbody>*,.vhead>*{min-width:0}
@media (max-width:980px){.hero-grid{grid-template-columns:minmax(0,1fr)}}
@media (max-width:820px){.signup{grid-template-columns:minmax(0,1fr)}}
.prompt .bar>span{font:500 13px var(--mono);color:#9f998b}
.prompt .bar .copy span{font:700 14px var(--sans);color:var(--ink)}
.msg:empty{display:none}
.dcard p{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.deck{height:540px}.dcard:nth-of-type(2){top:175px}.dcard:nth-of-type(3){top:350px}
@media (max-width:560px){.cats{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.cat{min-height:150px;padding:14px}.cat h3{font-size:16px}.cat p{font-size:13px}.cat .count{top:14px;right:12px;font-size:11px}.cat .ic{width:36px;height:36px}.facts{gap:18px}.facts b{font-size:24px}section{padding:52px 0}}
.deck{height:590px}.dcard:nth-of-type(2){top:195px}.dcard:nth-of-type(3){top:390px}
:root{--primary:#3fd07a;--kinda-bg:#ffc83d;--border:#3a3833;--fg:#f4efe4}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@supports (animation-timeline:scroll()){.top{animation:navsh linear both;animation-timeline:scroll();animation-range:0 120px}@keyframes navsh{to{box-shadow:0 8px 24px -16px rgba(0,0,0,.35)}}}
.rot-h>span[aria-hidden]{display:block}
.rot{display:inline-block;vertical-align:baseline}
.rot-pill{display:inline-flex;align-items:center;gap:.28em;padding:.02em .42em .08em .32em;border-radius:.42em;border:3px solid currentColor;font-size:.78em;line-height:1.05;transition:transform .26s var(--ease),opacity .26s var(--ease)}
.rot-pill i{width:.3em;height:.3em;border-radius:50%;background:currentColor;flex:none}
.rot-pill.bot{background:var(--bot);color:var(--bot-ink)}.rot-pill.half{background:var(--half);color:var(--half-ink)}.rot-pill.nah{background:var(--nah);color:var(--nah-ink)}
.rot-pill.out{opacity:0;transform:translateY(-.35em) scale(.96)}.rot-pill.in{opacity:0;transform:translateY(.35em) scale(.96);transition:none}
.peek{position:absolute;right:4%;top:-34px;width:86px;height:88px;z-index:0;transform:rotate(12deg);animation:peek 4s var(--ease) 1s infinite}
@keyframes peek{0%,70%,100%{transform:rotate(12deg) translateY(0)}80%{transform:rotate(4deg) translateY(-8px)}90%{transform:rotate(16deg) translateY(0)}}
.tape{overflow:hidden;border-block:1.5px solid var(--ink);background:var(--card);padding:12px 0;mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
.tape.rev{border-top:0;background:var(--paper2)}
.tape-track{display:flex;gap:10px;width:max-content;animation:tape 315s linear infinite}
.tape.rev .tape-track{animation-direction:reverse;animation-duration:100s}
.tape:hover .tape-track{animation-play-state:paused}
@keyframes tape{to{transform:translateX(-50%)}}
.tape-i{display:inline-flex;align-items:center;gap:8px;white-space:nowrap;padding:6px 14px 6px 8px;border-radius:999px;background:var(--paper);border:1px solid var(--hair);color:var(--ink);text-decoration:none;font-size:14px;font-weight:600}
.tape-i:hover{border-color:var(--ink)}
.tape-i .stamp{font-size:10px;padding:4px 7px 4px 6px}
.tape-i img{border-radius:6px}
.tape-p{color:var(--slate);font-weight:500}
.stats{padding:44px 0 8px}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1.5px solid var(--ink);border-radius:var(--r);background:var(--card);overflow:hidden}
.stats-grid>div{padding:22px 24px}.stats-grid>div+div{border-left:1.5px solid var(--hair)}
.stats-grid b{display:block;font-size:clamp(30px,3.6vw,44px);letter-spacing:-.04em;line-height:1}
.stats-grid span{font-size:14px;color:var(--slate)}
@media (max-width:760px){.stats-grid{grid-template-columns:1fr 1fr}.stats-grid>div:nth-child(3){border-left:0}.stats-grid>div:nth-child(n+3){border-top:1.5px solid var(--hair)}}
.bento{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:16px}
.bento-c{display:flex;flex-direction:column;gap:8px;min-height:260px;padding:26px;border-radius:24px;border:1.5px solid var(--ink);text-decoration:none;color:var(--ink);overflow:hidden;position:relative;transition:transform .25s var(--ease),box-shadow .25s var(--ease)}
.bento-c:hover{transform:translateY(-4px);box-shadow:6px 6px 0 var(--ink)}
.bento-c p{margin:0;color:var(--ink2)}
.b1{background:var(--mint)}.b2{background:var(--lav)}.b3{background:var(--yellow)}
.mini-stamps{margin-top:auto;display:flex;gap:8px;flex-wrap:wrap}
.mini-stamps .stamp:nth-child(1){transform:rotate(-4deg)}.mini-stamps .stamp:nth-child(3){transform:rotate(3deg)}
.mini-prompt{margin-top:auto;background:#171614;color:#efe9dc;border-radius:12px;padding:14px;font:13px/1.5 var(--mono);overflow:hidden}
.mini-prompt mark{background:rgba(255,200,61,.2);color:var(--half-hi);border-radius:4px;padding:0 3px}
.typing{display:inline-block;white-space:nowrap;overflow:hidden;border-right:2px solid var(--half-hi);max-width:100%;animation:typing 3.5s steps(40) 1s infinite alternate,caret .8s step-end infinite}
@keyframes typing{from{max-width:0}to{max-width:100%}}@keyframes caret{50%{border-color:transparent}}
.mini-total{margin-top:auto;background:var(--card);border:1.5px solid var(--ink);border-radius:14px;padding:12px 14px}
.mini-total span{display:block;font-size:12px;color:var(--slate)}.mini-total b{font-size:34px;letter-spacing:-.04em}
@media (max-width:900px){.bento{grid-template-columns:1fr}.bento-c{min-height:0}}
.faq-wrap{align-items:start}
.faq details{border-bottom:1.5px solid var(--hair2);padding:4px 0}
.faq summary{cursor:pointer;list-style:none;font-weight:700;font-size:18px;padding:16px 36px 16px 0;position:relative}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";position:absolute;right:4px;top:12px;font:400 26px var(--sans);transition:transform .2s var(--ease)}
.faq details[open] summary::after{transform:rotate(45deg)}
.faq details p{margin:0 0 18px;color:var(--ink2)}
.globe-band{padding:24px 0 72px}
.globe-strip{background:#141412;color:#e9e3d6;border-radius:28px;padding:30px 34px 36px;border:1.5px solid var(--ink);font-family:var(--mono)}
.strip-head{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#a8a293}
.strip-note{text-transform:none;letter-spacing:0}
.globe-grid{display:grid;grid-template-columns:minmax(0,420px) minmax(0,1fr);gap:40px;align-items:center;margin-top:18px}
.globe-wrap{display:flex;justify-content:center}
#globe-canvas{max-width:100%}
.g-count{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap}
.g-num{font:800 clamp(56px,7vw,92px)/1 var(--sans);letter-spacing:-.05em;color:#fff}
.g-lab{color:#cfc9bb}
.g-sub{display:block;margin:10px 0 18px;color:#a8a293;font-size:14px}
.g-feed{list-style:none;margin:0;padding:14px 0;border-block:1px solid #2f2d29;display:grid;gap:10px;min-height:40px}
.g-feed li{display:flex;gap:10px;align-items:baseline;font-size:14px;color:#b9b3a5}
.g-feed li.fresh{color:#fff}
.g-dot{width:7px;height:7px;border-radius:50%;background:var(--primary);flex:none;transform:translateY(-1px)}
.g-ago{color:#8a867c;white-space:nowrap}
.g-countries{margin-top:16px}.microlabel{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#a8a293}
.g-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.g-chip{border:1px solid #3a3833;border-radius:10px;padding:7px 12px;font-size:14px;color:#e9e3d6}
.g-more{align-self:center;color:#a8a293;font-size:14px}
.chart-tip{position:fixed;z-index:60;pointer-events:none;background:#141412;color:#fff;border:1px solid #3a3833;border-radius:10px;padding:8px 10px;font:13px/1.4 var(--mono);box-shadow:var(--shadow)}
@media (max-width:820px){.globe-grid{grid-template-columns:1fr}.globe-strip{padding:22px 18px}}
.aicon{width:40px;height:40px;border-radius:10px;flex:none;object-fit:contain;background:var(--card);border:1px solid var(--hair)}
.aicon.sm{width:22px;height:22px;border-radius:6px;margin-right:6px;vertical-align:middle}.aicon.lg{width:56px;height:56px;border-radius:14px}
.lt{display:inline-grid;place-items:center;font:800 15px var(--sans);color:var(--slate);background:var(--paper2)}
.cn .aicon.sm.lt{display:inline-grid;font-size:11px}
.tally3{display:flex;gap:18px;flex-wrap:wrap;margin-top:22px;font-size:15px;color:var(--ink2)}
.tally3 span{display:inline-flex;gap:8px;align-items:center}
.atable{display:grid;border:1.5px solid var(--ink);border-radius:var(--r);background:var(--card);overflow:hidden}
.arow{display:grid;grid-template-columns:40px minmax(0,1fr) 170px 110px 110px;gap:16px;align-items:center;padding:12px 18px;text-decoration:none;color:var(--ink);border-top:1px solid var(--hair);transition:background-color .15s}
.arow:first-child{border-top:0}.arow:hover{background:var(--paper)}
.an{display:flex;flex-direction:column;min-width:0}.an b{font-size:16px}.an small{color:var(--slate);font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ac{font-size:13px;color:var(--slate)}.ap{font-weight:700;font-variant-numeric:tabular-nums}
.arow .stamp{justify-self:end;font-size:11px;padding:6px 9px 6px 8px}
@media (max-width:760px){.arow{grid-template-columns:40px minmax(0,1fr) auto;row-gap:4px}.ac{display:none}.ap{grid-column:2;grid-row:2;font-size:13px}.arow .stamp{grid-row:1/3;grid-column:3}}
.pager{display:flex;justify-content:space-between;align-items:center;margin-top:18px;color:var(--slate);font-size:14px}
.catlinks{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.catlinks a{padding:8px 12px;border-radius:999px;background:var(--card);border:1px solid var(--hair2);color:var(--ink);text-decoration:none;font-size:14px}
.catlinks a span{color:var(--mute);margin-left:4px}.catlinks a:hover{border-color:var(--ink)}
.noresults.show{display:block}
.credit{font-size:13px;color:var(--slate);border-top:1px solid var(--hair2);padding-top:16px;margin-top:36px}
.app-id{display:flex;align-items:center;gap:12px;margin-bottom:14px;font-weight:700;font-size:18px}
.app-id small{font-weight:500;color:var(--slate);font-size:14px}
.costbox{display:flex;gap:28px;flex-wrap:wrap;background:var(--card);border:1.5px solid var(--ink);border-radius:18px;padding:20px 22px;margin-bottom:12px}
.costbox>div{display:flex;flex-direction:column}
.big-money{font-size:clamp(34px,4vw,48px);font-weight:850;letter-spacing:-.04em;line-height:1.05;font-variant-numeric:tabular-nums}
.tiers{margin-top:14px}.tiers td:nth-child(4){font-size:14px;color:var(--ink2)}
.chips-list{list-style:none;padding:0;margin:8px 0 14px;display:flex;flex-wrap:wrap;gap:8px}
.chips-list li{background:var(--card);border:1px solid var(--hair2);border-radius:999px;padding:6px 12px;font-size:14px}
.alts{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}
.alt{background:var(--card);border:1.5px solid var(--hair2);border-radius:16px;padding:18px;display:flex;flex-direction:column;gap:6px}
.alt p{margin:0;font-size:15px;color:var(--ink2)}.alt .link-arrow{align-self:flex-start;margin-top:auto;font-size:14px}
.alt-h{display:flex;justify-content:space-between;gap:8px;align-items:center}
.tagpill{font:700 11px var(--sans);letter-spacing:.08em;text-transform:uppercase;background:var(--mint);color:var(--bot-ink);border-radius:6px;padding:3px 7px}
.acard h3{font-size:20px}.price-tag{background:var(--paper2);border-radius:6px;padding:2px 8px;margin-right:6px;font-weight:700}
.band .acard .price-tag{background:#2f2d29;color:#fff}
.tested{color:var(--bot-ink);font-weight:700}
.testlog{background:var(--card);border:1.5px solid var(--ink);border-radius:18px;padding:20px 22px}
.tl-h{display:flex;gap:14px;flex-wrap:wrap;align-items:center;font-size:14px;color:var(--slate);margin-bottom:10px}
.tl-r{font-weight:800;border-radius:6px;padding:3px 8px}.tl-r.pass{background:var(--bot);color:var(--bot-ink)}.tl-r.partial{background:var(--half);color:var(--half-ink)}.tl-r.fail{background:var(--nah);color:var(--nah-ink)}
.checks{list-style:none;padding:0;margin:8px 0 14px;display:grid;gap:6px}
.checks li{display:flex;gap:10px;font-size:15px}.checks li span{font-weight:800;width:18px;flex:none}
.checks li.ok span{color:var(--bot-ink)}.checks li.no span{color:var(--nah-ink)}
.testlog blockquote{margin:6px 0 10px;padding:12px 16px;border-left:4px solid var(--half-hi);background:var(--paper);border-radius:0 10px 10px 0;font:14px/1.6 var(--mono);white-space:pre-wrap;color:var(--ink2)}
.calc{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:28px;align-items:start}
.calc-in label b{display:block;margin-bottom:8px}
.inline-in{background:var(--card);border:2px solid var(--ink);border-radius:999px;padding:4px 6px 4px 18px}
.inline-in input{width:100%;border:0;background:transparent;font:500 17px var(--sans);padding:12px 4px;outline:none;color:var(--ink)}
.calc-list{list-style:none;padding:0;margin:16px 0 0;display:grid;gap:8px}
.calc-list li{display:flex;align-items:center;gap:10px;background:var(--card);border:1.5px solid var(--hair2);border-radius:14px;padding:10px 12px}
.calc-list li a{font-weight:700;color:var(--ink);text-decoration:none;flex:1;min-width:0}
.calc-list .stamp{font-size:10px;padding:4px 7px 4px 6px}
.calc-list input{width:84px;font:600 15px var(--sans);padding:6px 8px;border:1.5px solid var(--hair2);border-radius:8px;background:var(--paper)}
.calc-list .x{border:0;background:none;font-size:22px;cursor:pointer;color:var(--slate);padding:0 4px}
.calc-out{position:sticky;top:96px;display:flex;flex-direction:column;gap:10px}
.calc-split{display:grid;grid-template-columns:1fr 1fr;gap:10px}.calc-split div{background:var(--paper);border-radius:12px;padding:10px 12px}.calc-split b{display:block;font-size:22px}.calc-split span{font-size:13px;color:var(--slate)}
@media (max-width:820px){.calc{grid-template-columns:1fr}.calc-out{position:static}}
.license{white-space:pre-wrap;font:13px/1.6 var(--mono);background:var(--card);border:1.5px solid var(--hair2);border-radius:14px;padding:18px}
body::before{opacity:.22;background-size:28px 28px}

.rot-h{font-size:clamp(40px,6.4vw,84px)}
.rot-pill{white-space:nowrap;font-size:.64em;border-width:.05em;padding:.06em .36em .12em .3em;transform-origin:left center}
.rot-h .serif{font-size:.92em}
.price .btn{align-self:flex-start;margin-top:6px}.price .btn.inv{background:#fff;color:var(--ink)}


.packs{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;margin:22px 0}
.pack{display:flex;flex-direction:column;gap:8px;padding:22px;border-radius:var(--r);color:var(--ink);text-decoration:none;border:1.5px solid transparent;transition:transform .25s var(--ease),border-color .2s,box-shadow .25s var(--ease)}
.pack:hover{transform:translateY(-4px);border-color:var(--ink);box-shadow:5px 5px 0 var(--ink)}
.pack:active{transform:translateY(-2px) scale(.99)}
.pack h3{margin:6px 0 0;font-size:20px;letter-spacing:-.02em}
.pack p{margin:0;color:var(--ink2);font-size:14px;line-height:1.45}
.pk-top,.pk-foot{display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:13px}
.pk-top .cn{font-weight:700;text-transform:uppercase;letter-spacing:.06em;font-size:11px}
.pk-price{background:var(--ink);color:#fff;font-weight:800;padding:4px 10px;border-radius:999px}
.pk-foot{margin-top:auto;padding-top:10px;font-weight:600}
.pk-chips{margin-top:26px}
.bundle{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;background:var(--ink);color:#fff;border-radius:var(--r);padding:26px 28px;margin:10px 0}
.bundle h2{margin:6px 0;color:#fff}.bundle p{margin:0;color:#d8d3c7}
.bundle .tag,.plug .tag{display:inline-block;font:700 11px var(--sans);text-transform:uppercase;letter-spacing:.08em;background:var(--half-hi);color:var(--ink);padding:3px 8px;border-radius:6px}
.btn.inv{background:#fff;color:var(--ink);border-color:#fff}
.pk-hero{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:36px;align-items:start;margin:10px 0 20px}
.buybox{background:var(--card);border:1.5px solid var(--ink);border-radius:var(--r);padding:24px;box-shadow:6px 6px 0 var(--ink);position:sticky;top:96px}
.buybox .amt{font-size:46px;font-weight:850;letter-spacing:-.04em;line-height:1}
.buybox .btn{width:100%;justify-content:center;margin-top:10px}
.ticks{list-style:none;padding:0;margin:16px 0 0;display:grid;gap:8px;font-size:14px}
.ticks li::before{content:"\u2713";font-weight:800;color:var(--bot-ink);margin-right:8px}
.pk-list{columns:2;column-gap:32px;padding-left:22px}
.pk-list li{break-inside:avoid;margin:0 0 10px}
.pk-sub{margin:26px 0 6px;font-size:18px}
.steps4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:0 0 26px}
.steps4>div{display:flex;gap:12px;align-items:center;background:var(--card);border:1.5px solid var(--hair2);border-radius:14px;padding:14px 16px;font-weight:600;font-size:15px}
.steps4 b{flex:none;width:30px;height:30px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;font-size:14px}
.price .terms{display:grid;gap:4px;font-size:13px;color:var(--slate)}
.price .terms b{color:var(--bot-ink)}
.form .agree{display:flex;gap:10px;align-items:flex-start;font-size:14px}
.form .agree input{margin-top:4px}
.form .total{display:flex;justify-content:space-between;align-items:baseline;border-top:1.5px solid var(--hair2);padding-top:14px;font-weight:600}
.form .total b{font-size:26px;letter-spacing:-.02em}
.form .field[hidden]{display:none}
.spon.ad{align-items:center}
.spon.ad>div{flex:1;min-width:0}
.ad-logo{width:44px;height:44px;border-radius:10px;object-fit:cover;flex:none;background:var(--paper2)}
.hl-ad{margin-top:18px}
.ad-preview{margin:12px 0 24px}
.plug{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;border:1.5px dashed var(--hair2);border-radius:14px;padding:16px 18px;margin:0 0 18px;background:var(--card)}
.plug b{margin:0 6px 0 8px}
.dl-box{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;background:var(--card);border:1.5px solid var(--ink);border-radius:var(--r);padding:22px 24px;box-shadow:6px 6px 0 var(--ink);margin:10px 0 16px}
.dl-box>div:first-child{display:flex;flex-direction:column;gap:2px}
.dl-btns{display:flex;gap:10px;flex-wrap:wrap}
.doc{max-width:860px}
.doc-head{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap;margin:28px 0 14px;border-bottom:2px solid var(--ink);padding-bottom:18px}
.doc-head h1{margin:6px 0}
.howto{background:var(--half);border-radius:12px;padding:14px 16px;font-size:15px;margin:0 0 18px}
.dl-toc{background:var(--card);border:1.5px solid var(--hair2);border-radius:12px;padding:14px 18px;margin:0 0 22px}
.dl-toc ol{columns:2;margin:6px 0 0}
.dl-pack{margin:34px 0}
.dl-pack h2{border-bottom:1.5px solid var(--hair2);padding-bottom:8px}
.dl-p{margin:22px 0}
.dl-p h3{display:flex;gap:10px;align-items:center;font-size:17px;margin:0 0 8px}
.dl-p h3 span{flex:none;width:26px;height:26px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;font-size:12px}
@media (max-width:860px){.pk-hero{grid-template-columns:1fr}.buybox{position:static}.steps4{grid-template-columns:1fr 1fr}.pk-list,.dl-toc ol{columns:1}}
@media print{.prompt{background:#fff!important;color:#111!important}.prompt pre{max-height:none!important}.prompt pre mark{background:#fff3c4!important;color:#111!important}.top,footer,.noprint,.copy,.skip,.bar .dots{display:none!important}body{background:#fff}body::before{display:none}.prompt{break-inside:avoid;border:1px solid #999;box-shadow:none}.prompt pre{white-space:pre-wrap;font-size:11.5px}.dl-p{break-inside:avoid}a{color:inherit;text-decoration:none}}
.price.feat .terms{color:#c9c3b4}.price.feat .terms b{color:var(--bot-hi)}

.theme-t{order:3;display:inline-grid;place-items:center;width:40px;height:40px;flex:none;border-radius:12px;border:1px solid var(--hair2);background:var(--card);color:var(--ink);cursor:pointer;transition:transform .16s var(--ease),background-color .2s,border-color .2s}
.theme-t:hover{border-color:var(--ink)}
.theme-t:active{transform:scale(.94)}
.theme-t:focus-visible{outline:2px solid var(--link);outline-offset:2px}
.theme-t .i-sun{display:none}
[data-theme=dark] .theme-t .i-sun{display:block}[data-theme=dark] .theme-t .i-moon{display:none}
.menu{order:2}
@media (max-width:860px){.theme-t{margin-left:auto}.burger{margin-left:0}}

[data-theme=dark]{
--paper:#151412;--paper2:#1e1c19;--card:#1b1a17;--ink:#f1ede4;--ink2:#d8d2c5;--slate:#aaa397;--mute:#827c71;
--hair:#2b2925;--hair2:#3b3833;
--bot:#12301c;--bot-ink:#86e3a0;--half:#33290b;--half-ink:#f3cf62;--nah:#3a1320;--nah-ink:#ff93b0;
--lav:#262236;--sky:#172532;--mint:#132a1b;--yellow:#2e2710;--rose:#321620;
--link:#8ab8ff;
--shadow:0 1px 0 rgba(0,0,0,.3),0 10px 30px -12px rgba(0,0,0,.7);
color-scheme:dark}
[data-theme=dark] body::before{background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)}
[data-theme=dark] .top{background:rgba(21,20,18,.86)}
[data-theme=dark] .logo .mark rect,[data-theme=dark] .logo .mark line{fill:#f1ede4;stroke:#f1ede4}
[data-theme=dark] .logo .mark line{fill:none}

[data-theme=dark] .skip,[data-theme=dark] .menu a[aria-current=page],[data-theme=dark] .menu .cta,[data-theme=dark] .btn,[data-theme=dark] .cat .ic,[data-theme=dark] .chip[aria-pressed=true],[data-theme=dark] .ol li::before,[data-theme=dark] .pk-price,[data-theme=dark] .steps4 b,[data-theme=dark] .dl-p h3 span{color:#141414}
[data-theme=dark] .menu .cta:hover,[data-theme=dark] .btn:hover{background:#fff}
[data-theme=dark] .btn{box-shadow:0 6px 18px -8px rgba(0,0,0,.8)}
[data-theme=dark] .btn.ghost{color:var(--ink)}
[data-theme=dark] .btn.inv{color:#141414}

[data-theme=dark] .band,[data-theme=dark] footer,[data-theme=dark] .price.feat,[data-theme=dark] .bundle{background:#0c0b0a;border-color:var(--hair2)}
[data-theme=dark] .band .btn,[data-theme=dark] .price.feat .btn,[data-theme=dark] .bundle .btn{background:var(--ink);color:#141414}
[data-theme=dark] footer{border-top:1px solid var(--hair)}
[data-theme=dark] .dcard:nth-of-type(2){background:var(--card)}
[data-theme=dark] .cat .count{background:rgba(0,0,0,.35)}
[data-theme=dark] .spon{background:rgba(30,28,25,.6)}
[data-theme=dark] .warn{color:var(--nah-ink)}
[data-theme=dark] .tape.rev{background:var(--paper2)}
[data-theme=dark] img[src^="/i/"]{background:#fff;border-radius:6px}
@media print{[data-theme=dark]{--paper:#fff;--card:#fff;--ink:#141414}}

.fbadge{display:inline-flex;background:#fff;border-radius:8px;padding:6px 10px;line-height:0}.fbadge img{display:block;height:22px;width:auto}
`;var app_client_default=`(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // Mobile menu
  const burger = $(".burger"), menu = $("#menu");
  if (burger && menu) {
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
  }

  // Search index (lazy)
  let INDEX = null;
  const loadIndex = () => INDEX ? Promise.resolve(INDEX) :
    fetch("/search.json").then(r => r.json()).then(d => (INDEX = d));
  const norm = s => s.toLowerCase().normalize("NFKD").replace(/[^\\w\\s-]/g, " ");
  const stem = w => w.length > 4 ? w.replace(/(ings|ing|ers|ies|ed|es|s)$/, "") : w;
  const terms0 = text => norm(text).split(/\\s+/).filter(w => w.length > 1 && !STOP.has(w)).map(stem);
  const score = (item, terms) => {
    let s = 0, hit = 0;
    const q = norm(item.q), t = norm(item.t);
    for (const w of terms) { if (q.includes(w)) { s += 3; hit++; } else if (t.includes(w)) { s += 1; hit++; } }
    return hit >= Math.max(1, Math.ceil(terms.length * 0.5)) ? s + hit * 2 - (item.k === "a" ? 1 : 0) : 0;
  };
  const TLD = /\\.(com|io|so|ai|app|co|net|org|dev|us|me|tv|xyz)\\b/gi;
  const flat = s => norm(s.replace(TLD, " ")).replace(/\\s+/g, " ").trim();
  const appName = i => flat(i.q.replace(/ alternatives$/, ""));
  const search = (text0) => {
    const text = text0.replace(TLD, " ").replace(/\\s+(com|net|org|io)\\s*$/i, "");
    const raw = flat(text), tight = raw.replace(/[\\s-]+/g, "");
    const exact = raw ? INDEX.filter(i => i.k === "a" && (appName(i) === raw || appName(i).replace(/[\\s-]+/g, "") === tight || i.s === raw.replace(/[^a-z0-9]+/g, "-"))) : [];
    const starts = raw.length > 1 ? INDEX.filter(i => i.k === "a" && !exact.includes(i) && appName(i).startsWith(raw)).slice(0, 3) : [];
    const terms = terms0(text.replace(TLD, " "));
    const rest = terms.length ? INDEX.map(i => [score(i, terms), i]).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0]).map(x => x[1]) : [];
    return [...exact, ...starts, ...rest.filter(i => !exact.includes(i) && !starts.includes(i))];
  };
  const STOP = new Set(["can", "ai", "do", "my", "me", "for", "the", "a", "an", "to", "it", "i", "of", "and", "or", "how", "is", "with", "help", "what", "should", "write", "make", "get", "your", "in", "on", "at", "be", "use"]);
  const LABEL = { bot: "Bot", half: "Half-bot", nah: "Nah" };
  const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  $$("[data-search]").forEach(box => {
    const input = $("input", box), list = $(".results", box);
    let sel = -1, items = [];
    const render = () => {
      if (!input.value.trim()) { list.classList.remove("show"); input.setAttribute("aria-expanded", "false"); return; }
      items = search(input.value).slice(0, 6);
      list.innerHTML = items.length
        ? items.map((i, n) => \`<li><a role="option" id="r\${n}" href="\${i.k === "a" ? "/apps/" : "/v/"}\${i.s}" aria-selected="\${n === sel}"><span>\${esc(i.q)}</span><span class="stamp \${i.v}">\${i.k === "a" ? "App" : LABEL[i.v]}</span></a></li>\`).join("") + \`<li class="empty"><a href="/submit?task=\${encodeURIComponent(input.value)}">Not it? Request it \u2192</a></li>\`
        : \`<li class="empty">Nothing yet. <a href="/submit?task=\${encodeURIComponent(input.value)}">Request it and we'll review it</a></li>\`;
      list.classList.add("show");
      input.setAttribute("aria-expanded", "true");
    };
    input.addEventListener("focus", () => loadIndex().then(render));
    input.addEventListener("input", () => { sel = -1; loadIndex().then(render); });
    input.addEventListener("keydown", e => {
      if (!list.classList.contains("show")) return;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        sel = Math.max(-1, Math.min(items.length - 1, sel + (e.key === "ArrowDown" ? 1 : -1)));
        render();
        if (sel >= 0) input.setAttribute("aria-activedescendant", "r" + sel);
      } else if (e.key === "Enter" && sel >= 0 && items[sel]) {
        e.preventDefault(); location.href = (items[sel].k === "a" ? "/apps/" : "/v/") + items[sel].s;
      } else if (e.key === "Escape") { list.classList.remove("show"); }
    });
    document.addEventListener("click", e => { if (!box.contains(e.target)) list.classList.remove("show"); });
  });

  // Verdict list filters
  const grid = $("[data-filter-grid]");
  if (grid) {
    const cards = $$(".vcard", grid), qIn = $("#fq"), catIn = $("#fcat"), countEl = $("#fcount"), none = $(".noresults");
    let v = "all";
    const params = new URLSearchParams(location.search);
    if (params.get("q")) qIn.value = params.get("q");
    if (params.get("v")) v = params.get("v");
    if (params.get("cat")) catIn.value = params.get("cat");
    const apply = () => {
      const terms = norm(qIn.value).split(/\\s+/).filter(w => w.length > 1 && !STOP.has(w)).map(stem);
      let shown = 0;
      cards.forEach(c => {
        const tx = norm(c.dataset.text), hit = terms.filter(w => tx.includes(w)).length;
        const ok = (v === "all" || c.dataset.v === v) && (!catIn.value || c.dataset.cat === catIn.value) &&
          hit >= Math.ceil(terms.length * 0.5);
        c.hidden = !ok; if (ok) shown++;
      });
      $$(".chip[data-v]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.v === v)));
      countEl.textContent = shown + (shown === 1 ? " verdict" : " verdicts");
      none.style.display = shown ? "none" : "block";
    };
    $$(".chip[data-v]").forEach(b => b.addEventListener("click", () => { v = b.dataset.v; apply(); }));
    qIn.addEventListener("input", apply);
    catIn.addEventListener("change", apply);
    apply();
  }

  // Copy prompt
  $$("[data-copy]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const text = $(btn.dataset.copy).innerText;
      try { await navigator.clipboard.writeText(text); }
      catch {
        const r = document.createRange(); r.selectNodeContents($(btn.dataset.copy));
        const s = getSelection(); s.removeAllRanges(); s.addRange(r); document.execCommand("copy"); s.removeAllRanges();
      }
      const label = $("span", btn), old = label.textContent;
      btn.classList.add("done"); label.textContent = "Copied";
      setTimeout(() => { btn.classList.remove("done"); label.textContent = old; }, 1800);
    });
  });

  // Votes
  const vote = $("[data-vote]");
  if (vote) {
    const slug = vote.dataset.vote, tally = $(".tally", vote.parentElement), btns = $$("button", vote);
    const show = d => {
      const total = (d.yes || 0) + (d.no || 0);
      tally.textContent = total >= 3
        ? \`\${d.yes} of \${total} readers said it worked.\`
        : "Not enough reader reports yet. Yours counts.";
    };
    const key = "bon-vote-" + slug;
    let mine = null; try { mine = localStorage.getItem(key); } catch {}
    if (mine) { btns.forEach(b => { b.disabled = true; b.classList.toggle("on", b.dataset.v === mine); }); }
    fetch("/api/votes?slug=" + encodeURIComponent(slug)).then(r => r.json()).then(show).catch(() => {});
    btns.forEach(b => b.addEventListener("click", async () => {
      btns.forEach(x => x.disabled = true); b.classList.add("on");
      try {
        const r = await fetch("/api/vote", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ slug, vote: b.dataset.v }) });
        const d = await r.json();
        if (d.counts) show(d.counts);
        if (d.error) tally.textContent = d.error;
        try { localStorage.setItem(key, b.dataset.v); } catch {}
      } catch { tally.textContent = "Couldn't save your vote. Try again later."; btns.forEach(x => x.disabled = false); b.classList.remove("on"); }
    }));
  }

  // Forms (progressive enhancement; they also work without JS)
  $$("form[data-ajax]").forEach(f => {
    const msg = $(".msg", f);
    f.addEventListener("submit", async e => {
      e.preventDefault();
      const btn = $("button[type=submit]", f); btn.disabled = true;
      msg.className = "msg"; msg.textContent = "Sending\u2026";
      try {
        const r = await fetch(f.action, { method: "POST", headers: { accept: "application/json" }, body: new FormData(f) });
        const d = await r.json();
        if (d.ok) { msg.className = "msg ok"; msg.textContent = d.message; f.reset(); }
        else { msg.className = "msg err"; msg.textContent = d.error || "Something went wrong."; }
      } catch { msg.className = "msg err"; msg.textContent = "Network error. Please try again."; }
      btn.disabled = false;
    });
  });

  // Prefill submit form
  const task = $("#task");
  if (task) { const sp = new URLSearchParams(location.search), t = sp.get("task"), k = sp.get("kind"); if (t) task.value = t.slice(0, 200); if (k) { const r = $(\`input[name=kind][value="\${k.replace(/[^a-z]/g, "")}"]\`); if (r) r.checked = true; } }
  // Pack filter chips
  const pk = $("[data-packs]");
  if (pk) {
    const chips = $$("[data-pk]"), cards = $$(".pack", pk);
    const go = c => { chips.forEach(x => x.setAttribute("aria-pressed", String(x.dataset.pk === c))); cards.forEach(el => { el.hidden = !!c && !el.classList.contains("pc-" + c); }); };
    chips.forEach(ch => ch.addEventListener("click", e => { e.preventDefault(); go(ch.dataset.pk); history.replaceState(null, "", ch.dataset.pk ? "#" + ch.dataset.pk : location.pathname); }));
    if (location.hash) go(location.hash.slice(1).replace(/[^a-z-]/g, ""));
  }
  // Print / save as PDF
  $$("[data-print]").forEach(b => b.addEventListener("click", () => window.print()));
  // Ad booking: live price
  const bk = $("form[data-book]");
  if (bk) {
    const P = JSON.parse(bk.dataset.book), out = $("[data-bprice]", bk), tg = $("[data-target]", bk);
    const upd = () => {
      const slot = bk.slot.value, m = +(bk.term.value || 1), base = P[slot].base, off = { 1: 0, 3: 10, 6: 20, 12: 30 }[m];
      const total = Math.round(base * m * (100 - off) / 100);
      out.textContent = \`$\${total.toLocaleString("en-US")}\` + (off ? \` (save \${off}%, $\${Math.round(total / m)}/mo)\` : "");
      $$("[data-for]", bk).forEach(el => { el.hidden = el.dataset.for !== P[slot].target; $$("select", el).forEach(x => x.required = !el.hidden); });
    };
    bk.addEventListener("change", upd); upd();
    const f = bk.logo; if (f) f.addEventListener("change", () => { const x = f.files[0]; f.setCustomValidity(x && x.size > 300000 ? "Please use an image under 300 KB." : ""); f.reportValidity(); });
  }
})();

(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const LABEL = { bot: "Bot", half: "Half-bot", nah: "Nah" }, VM = { yes: "bot", kinda: "half", no: "nah" };

  // Broken app icons fall back to a letter tile (no inline handlers: CSP).
  document.addEventListener("error", e => {
    const t = e.target;
    if (t.tagName === "IMG" && t.dataset.l && !t.dataset.f) { t.dataset.f = 1; t.replaceWith(Object.assign(document.createElement("span"), { className: t.className + " lt", textContent: t.dataset.l })); }
  }, true);

  // Rotating word pill in the hero (Notion-style), paused for reduced motion.
  const rot = $("[data-rot]");
  if (rot && !reduced) {
    let words = []; try { words = JSON.parse(rot.dataset.rot); } catch {}
    let i = 0;
    setInterval(() => {
      if (document.hidden || !words.length) return;
      i = (i + 1) % words.length;
      const [w, v] = words[i], pill = $(".rot-pill", rot);
      pill.classList.add("out");
      setTimeout(() => { pill.className = "rot-pill in " + v; $(".rot-w", pill).textContent = w; requestAnimationFrame(() => pill.classList.remove("in")); }, 260);
    }, 2600);
  }

  // Count-up numbers when they scroll into view.
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; io.unobserve(e.target);
    const el = e.target, to = +el.dataset.countTo || 0;
    if (reduced || !to) { el.textContent = "$" + to.toLocaleString("en-US"); return; }
    el.textContent = "$0"; const t0 = performance.now(), dur = 1100;
    const step = t => { const k = Math.min(1, (t - t0) / dur), ease = 1 - Math.pow(1 - k, 3); el.textContent = "$" + Math.round(to * ease).toLocaleString("en-US"); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }), { threshold: 0.5 }) : null;
  if (io && !reduced) $$("[data-count-to]").forEach(el => io.observe(el));

  // Filters that submit on change.
  $$("select[data-autosubmit]").forEach(s => s.addEventListener("change", () => s.form.submit()));

  // Savings calculator.
  const calc = $("[data-calc]");
  if (calc) {
    const KEY = "bon-calc", input = $("#cq"), list = $(".results", calc), out = $(".calc-list", calc);
    let APPS = null, items = [];
    try { items = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch {}
    const load = () => APPS ? Promise.resolve(APPS) : fetch("/api/apps-lite").then(r => r.json()).then(d => (APPS = d));
    const money = n => "$" + Math.round(n).toLocaleString("en-US");
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {} };
    const draw = () => {
      out.innerHTML = items.map((a, i) => \`<li><a href="/apps/\${esc(a.s)}">\${esc(a.n)}</a><span class="stamp \${VM[a.v] || "half"}">\${LABEL[VM[a.v] || "half"]}</span><label><span class="hp">Monthly price for \${esc(a.n)}</span>$<input type="number" min="0" step="0.01" inputmode="decimal" value="\${a.p ?? 0}" data-i="\${i}">/mo</label><button type="button" class="x" data-rm="\${i}" aria-label="Remove \${esc(a.n)}">\xD7</button></li>\`).join("");
      const tot = items.reduce((s, a) => s + (+a.p || 0) * 12, 0);
      const rep = items.filter(a => a.v === "yes").reduce((s, a) => s + (+a.p || 0) * 12, 0);
      const part = items.filter(a => a.v === "kinda").reduce((s, a) => s + (+a.p || 0) * 12, 0);
      const alts = items.reduce((s, a) => s + (a.a || 0), 0);
      $("[data-total]", calc).textContent = money(tot); $("[data-rep]", calc).textContent = money(rep); $("[data-part]", calc).textContent = money(part);
      $("[data-count]", calc).textContent = items.length ? \`\${items.length} \${items.length === 1 ? "app" : "apps"} \xB7 \${alts} free or cheaper alternatives listed across them.\` : "No apps added yet.";
    };
    const add = s => { const a = APPS && APPS.find(x => x.s === s); if (a && !items.some(x => x.s === s)) { items.push({ ...a }); save(); draw(); } };
    out.addEventListener("input", e => { const i = e.target.dataset.i; if (i != null) { items[i].p = parseFloat(e.target.value) || 0; save(); draw(); $(\`[data-i="\${i}"]\`, out)?.focus(); } });
    out.addEventListener("click", e => { const i = e.target.dataset.rm; if (i != null) { items.splice(+i, 1); save(); draw(); } });
    $("[data-clear]", calc).addEventListener("click", () => { items = []; save(); draw(); });
    let sel = -1, found = [];
    const render = () => {
      const q = input.value.trim().toLowerCase();
      if (!q) { list.classList.remove("show"); return; }
      found = APPS.filter(a => a.n.toLowerCase().includes(q)).slice(0, 8);
      list.innerHTML = found.length ? found.map((a, n) => \`<li><a href="#" role="option" data-s="\${esc(a.s)}" aria-selected="\${n === sel}"><span>\${esc(a.n)}</span><span>\${a.p == null ? "" : "$" + a.p + "/mo"}</span></a></li>\`).join("") : \`<li class="empty">No match. Try another name.</li>\`;
      list.classList.add("show");
    };
    input.addEventListener("input", () => { sel = -1; load().then(render); });
    input.addEventListener("keydown", e => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(-1, Math.min(found.length - 1, sel + (e.key === "ArrowDown" ? 1 : -1))); render(); }
      else if (e.key === "Enter") { e.preventDefault(); const a = found[sel >= 0 ? sel : 0]; if (a) { add(a.s); input.value = ""; list.classList.remove("show"); } }
    });
    list.addEventListener("click", e => { const a = e.target.closest("[data-s]"); if (a) { e.preventDefault(); add(a.dataset.s); input.value = ""; list.classList.remove("show"); input.focus(); } });
    document.addEventListener("click", e => { if (!calc.contains(e.target)) list.classList.remove("show"); });
    const pre = new URLSearchParams(location.search).get("add");
    draw();
    if (pre) load().then(() => add(pre));
  }
})();
`;import{EMAIL_LOGO}from"./assets.js";var REVIEWED="2026-09-28",CATS=[{slug:"money",name:"Money",blurb:"Budgets, bills, refunds and disputes.",tint:"mint",icon:"M"},{slug:"home",name:"Home paperwork",blurb:"Landlords, leases, insurance and letters.",tint:"sky",icon:"H"},{slug:"career",name:"Jobs & career",blurb:"Resumes, cover letters, interviews and raises.",tint:"lav",icon:"J"},{slug:"business",name:"Small business",blurb:"Listings, invoices, policies and books.",tint:"yellow",icon:"B"},{slug:"health-admin",name:"Health admin",blurb:"Bills, appointments and paperwork. Never medical advice.",tint:"rose",icon:"+"},{slug:"travel",name:"Travel",blurb:"Itineraries, packing, fares and complaints.",tint:"sky",icon:"T"},{slug:"family",name:"Parenting & school",blurb:"Teacher emails, homework help and parties.",tint:"yellow",icon:"P"},{slug:"writing",name:"Writing",blurb:"Toasts, apologies and emails that sound like you.",tint:"lav",icon:"W"},{slug:"everyday",name:"Everyday life",blurb:"Meals, decluttering and life admin.",tint:"mint",icon:"E"},{slug:"free-versions",name:"Free versions of paid apps",blurb:"Build a simple tool yourself instead of paying monthly.",tint:"rose",icon:"$"},{slug:"tech",name:"Tech help",blurb:"Phones, Wi-Fi, passwords, printers and spreadsheets.",tint:"sky",icon:"@"},{slug:"shopping",name:"Shopping & deals",blurb:"Comparisons, returns, warranties and gifts.",tint:"yellow",icon:"S"},{slug:"learning",name:"Learning & school",blurb:"Study plans, languages, essays and new skills.",tint:"lav",icon:"L"},{slug:"cars",name:"Cars & getting around",blurb:"Buying, repairs, tickets and road trips.",tint:"mint",icon:"C"},{slug:"pets",name:"Pets",blurb:"Care schedules, sitters and pet admin. Never vet advice.",tint:"rose",icon:"~"},{slug:"social",name:"Relationships & social",blurb:"Hard conversations, invites, events and etiquette.",tint:"lav",icon:"&"}],ANY="Any major AI chat app: ChatGPT, Claude or Gemini. The free tier works.",VERDICTS=[{slug:"make-a-monthly-budget",cat:"money",v:"bot",q:"Can AI make me a monthly budget?",sum:"Yes. Give it your take-home pay and your bills and it builds a clear budget in a minute. You supply the numbers; it does the sorting and math.",why:["Sorting expenses into needs, wants and savings is exactly the kind of structured work AI does well.","It explains every line, so you learn why the budget looks the way it does.","You can ask for three versions (tight, normal, relaxed) and compare them."],prompt:`You are a practical budgeting coach for regular people, not a financial advisor.

My monthly take-home pay: [AMOUNT]
My fixed bills (name and amount): [LIST]
My usual variable spending (groceries, gas, eating out, etc.): [LIST OR "not sure"]
My goal: [e.g. save $300 a month, pay off a credit card]

Build me a monthly budget.
Rules:
- Use only the numbers I gave you. If something is missing, ask me before guessing.
- Show the math. Totals MUST add up to my take-home pay.
- Flag any category where I'm spending more than typical and say why it matters.
Output: a table (Category | Amount | % of pay), then 3 short tips specific to my numbers.`,steps:["Fill in the brackets with your real numbers.","Paste it into the AI app and answer any follow-up questions.","Check the totals yourself before you rely on them."],risks:["AI can make arithmetic slips. Re-add the totals.","Don't paste account numbers or passwords. Amounts are enough."],tools:ANY},{slug:"dispute-a-credit-card-charge",cat:"money",v:"bot",q:"Can AI write my credit card dispute letter?",sum:"Yes. It writes a clear, firm dispute message from your facts in seconds. Filing the dispute is still done with your card company.",why:["Dispute letters follow a known structure: what happened, when, how much, and what you want.","AI keeps the tone calm and factual, which is what card issuers respond to.","It can also write the first message to the merchant, which issuers often ask you to try first."],prompt:`You are helping me write a credit card dispute message. Keep it factual, calm and short.

Merchant: [NAME]
Charge date and amount: [DATE, AMOUNT]
What went wrong: [e.g. charged twice, item never arrived, canceled but still billed]
What I already tried with the merchant: [DETAILS OR "nothing yet"]
What I want: [refund of $X / reversal of duplicate charge]

Write two things:
1. A message to the merchant asking them to fix it (under 150 words).
2. A dispute statement for my card issuer (under 200 words) with a date-ordered timeline.
Rules: use only the facts above. NEVER invent dates, order numbers or promises. Mark anything I should attach as [ATTACH: ...].`,steps:["Fill in the facts, including dates.","Send the merchant message first and wait for their reply.","If that fails, paste the dispute statement into your card issuer's dispute form."],risks:["Card issuers have deadlines for disputes. Check yours in your card agreement.","Only state facts you can back up with receipts or emails."],tools:ANY},{slug:"negotiate-a-lower-bill",cat:"money",v:"half",q:"Can AI get my internet or phone bill lowered?",sum:"Half. AI writes a strong script and a written request. You still have to send it, and whether the company says yes is up to them.",why:["AI is good at building a polite, specific ask with a clear fallback.","It can't see current promotions or your account, so it can't know what deal is available.","Many companies handle this in chat or email, so a written script works well."],prompt:`You are a negotiation coach. Help me ask for a lower bill in writing (chat or email). I don't do phone calls.

Company: [NAME]
Service and current price: [e.g. internet, $85/month]
How long I've been a customer: [TIME]
Competitor offers I've seen (only if real): [OFFERS OR "none"]
The lowest price I'd accept: [AMOUNT]

Write:
1. An opening message (under 100 words) asking for a better rate.
2. Two short replies: one if they offer a small discount, one if they say no.
Rules: polite and firm. NEVER invent competitor prices. If I listed none, don't mention any.`,steps:["Fill in your real price and any real competitor offers.","Paste the opening message into the company's chat or email.","Use the follow-up replies based on their answer."],risks:["Don't threaten to cancel unless you would actually cancel.","Read any new offer's contract length before accepting."],tools:ANY},{slug:"do-my-taxes",cat:"money",v:"nah",q:"Can AI do my taxes?",sum:"Nah. AI can explain tax terms and help you get organized, but it shouldn't prepare or file your return. Mistakes cost real money.",why:["AI can state rules that are out of date or wrong for your state, with full confidence.","It can't see your documents unless you share sensitive data you shouldn't paste into a chat.","Tax software and qualified preparers check your numbers against current rules. A chat app doesn't."],prompt:`You are a tax-prep organizer, not a tax preparer. Do NOT calculate my tax or tell me what to file.

My situation in plain words: [e.g. W-2 job, a side gig, I rent, one kid]

Give me:
1. A checklist of documents I should gather, grouped by type.
2. Plain-English meanings of any tax terms in my situation.
3. Questions I should ask tax software or a preparer.
Rules: if a rule depends on the year or state, say so and tell me to confirm it. Say "I'm not sure" rather than guessing.`,steps:["Use the prompt only to get organized.","Prepare your return with tax software or a qualified preparer.","In the US, check the IRS website to see if you qualify for free filing."],risks:["Never paste your Social Security number or full account numbers into a chat app.","Rules change every year. Treat anything AI says about amounts or limits as unconfirmed."],tools:"Use AI only for the checklist. Do the return in tax software or with a preparer."},{slug:"pick-stocks-for-me",cat:"money",v:"nah",q:"Can AI pick stocks for me?",sum:"Nah. AI can explain how investing works, but it can't predict the market, and letting it pick for you is a gamble.",why:["Chat apps may not have current prices or news.","It sounds confident even when it's guessing.","It doesn't know your full situation, goals or risk tolerance."],prompt:`Teach me investing basics. Do NOT recommend specific stocks, funds or trades.

My situation: [e.g. new to investing, have an emergency fund, investing for 20+ years]

Explain in plain English:
1. The difference between individual stocks, index funds and bonds.
2. What "risk tolerance" and "diversification" mean, with one example each.
3. Five questions I should answer before investing anything.
Keep it under 400 words.`,steps:["Use AI to learn the vocabulary.","Make decisions with a licensed advisor or your own research from reliable sources."],risks:["Anyone, human or AI, promising sure returns is a red flag."],tools:"Use AI to learn the basics, not to pick investments."},{slug:"write-a-repair-request-to-my-landlord",cat:"home",v:"bot",q:"Can AI write a repair request to my landlord?",sum:"Yes. A clear, dated repair request in writing is exactly what AI is good at, and a written record helps you later.",why:["It keeps the message factual and polite, which gets faster results.","It adds the details landlords need: what, where, since when, and access times.","It builds a paper trail you can refer back to."],prompt:`Write a repair request to my landlord. Polite, factual, under 180 words.

My name and unit: [NAME, ADDRESS/UNIT]
The problem: [e.g. kitchen sink leaking under cabinet]
When it started: [DATE]
What I've already done: [e.g. placed a bucket, turned off valve]
When they can access the unit: [DAYS/TIMES]
How urgent it is: [e.g. water is damaging the cabinet floor]

Include a clear request for a repair date and ask them to reply in writing.
Rules: NEVER mention laws or legal threats. Stick to the facts I gave.`,steps:["Fill in the facts and take photos of the problem.","Send it by email or through your landlord's portal so it's dated.","Save the reply."],risks:["Tenant rights differ by city and state. For legal questions, contact a local tenant union or legal aid office."],tools:ANY},{slug:"explain-my-lease",cat:"home",v:"half",q:"Can AI explain my lease to me?",sum:"Half. AI turns legal language into plain English and flags clauses worth asking about. It can't tell you what's enforceable where you live.",why:["Plain-English rewrites of dense clauses are a strength.","It spots common things people miss: fees, renewal terms, notice periods.","Whether a clause is legal depends on local law, which AI can get wrong."],prompt:`Explain this lease in plain English for someone with no legal background. This is not legal advice.

[PASTE THE LEASE TEXT. Remove names, addresses and account numbers first.]

Give me:
1. A one-paragraph summary.
2. A table: Topic | What the lease says | What it means for me. Cover rent, deposit, fees, repairs, pets, guests, subletting, renewal and move-out notice.
3. A list of clauses I should ask about before signing, with the exact question to ask.
Rules: quote the clause for every point. If something isn't in the lease, say "not mentioned." Don't guess about local laws.`,steps:["Remove personal details before pasting.","Read the summary, then ask the landlord your flagged questions in writing.","For anything that worries you, check with local legal aid."],risks:["AI can misread a clause. Check each point against the quoted text.","Don't rely on it to judge whether a clause is legal."],tools:ANY},{slug:"appeal-an-insurance-claim-denial",cat:"home",v:"half",q:"Can AI write my insurance claim appeal?",sum:"Half. AI drafts a strong, organized appeal letter. You have to supply the policy wording and documents, and check every fact.",why:["Appeals follow a clear structure that AI handles well.","It can match the denial reason to the policy language you paste.","It can't know your policy or evidence unless you provide them."],prompt:`Help me write an insurance claim appeal letter. Firm, organized, factual.

Claim number: [NUMBER]
What happened: [SHORT DESCRIPTION WITH DATES]
Reason given for the denial: [PASTE THE DENIAL WORDING]
Relevant policy section: [PASTE IT]
Evidence I have: [photos, receipts, estimates, etc.]

Write the letter (under 400 words) with: a clear request, a point-by-point answer to the denial reason, and a list of attachments.
Rules: use only the facts and policy text I pasted. NEVER invent policy language or deadlines. Mark gaps as [NEED: ...].`,steps:["Paste the exact denial reason and policy section.","Fill any [NEED] gaps.","Send it the way your insurer's denial letter says appeals must be sent, before their deadline."],risks:["Appeals have deadlines. Find yours in the denial letter.","For large claims, a public adjuster or attorney may be worth it."],tools:ANY},{slug:"tailor-my-resume-to-a-job",cat:"career",v:"half",q:"Can AI tailor my resume to a job posting?",sum:"Half. AI is great at matching your real experience to a posting's keywords. You must check it didn't add skills or results you don't have.",why:["It quickly finds the gaps between your resume and the posting.","It rewrites bullets to lead with results.","AI sometimes invents numbers or skills to make the match look better. That can cost you the job."],prompt:`You are a resume editor. Tailor my resume to this job without inventing anything.

Job posting:
[PASTE POSTING]

My resume:
[PASTE RESUME. Remove your address and phone number.]

Do this:
1. List the top 8 skills or keywords the posting asks for, and whether my resume shows each (Yes / Partly / No).
2. Rewrite my bullets to match the posting, using only facts from my resume.
3. List questions for me where adding a real detail would help (e.g. "How many customers did you handle per week?").
Rules: NEVER add skills, tools, numbers or job titles that aren't in my resume. If a keyword is missing, tell me instead of adding it.`,steps:["Paste the posting and your resume.","Answer the questions it asks about your real experience.","Read every line before sending. If you can't talk about a bullet in an interview, remove it."],risks:["Invented details can get an offer pulled.","Keep your phone number and address out of the chat."],tools:ANY},{slug:"write-a-cover-letter",cat:"career",v:"bot",q:"Can AI write my cover letter?",sum:"Yes, with your real story in it. Give it the posting and two or three true examples, and it writes a focused cover letter fast.",why:["Cover letters follow a predictable shape.","AI is good at connecting your examples to what the employer asked for.","The result is better when you add one specific reason you want this job."],prompt:`Write a cover letter for this job. Under 300 words. Warm and direct, no clich\xE9s.

Job posting: [PASTE]
Why I want this job (one honest sentence): [REASON]
Two or three real examples of my work that fit: [EXAMPLES WITH RESULTS]
My name: [NAME]

Structure: a hook that names the role, two short paragraphs connecting my examples to their needs, and a confident close.
Rules: NEVER use "I am writing to express my interest." Use only the examples I gave.`,steps:["Add your real examples.","Read it out loud and change any line that doesn't sound like you.","Check the company name and role are right."],risks:["Generic letters get skipped. The one sentence about why you want this job matters most."],tools:ANY},{slug:"practice-for-a-job-interview",cat:"career",v:"bot",q:"Can AI help me practice for a job interview?",sum:"Yes. It asks realistic questions for the role, one at a time, and gives feedback on your typed answers.",why:["It can play the interviewer for any role you describe.","It gives instant feedback on structure and clarity.","You can practice at 2 a.m. with no one watching."],prompt:`Act as an interviewer for this role: [JOB TITLE] at [TYPE OF COMPANY].
Job posting (optional): [PASTE]

Ask me 8 interview questions one at a time: 3 about my background, 3 behavioral, 2 role-specific.
After each answer I type, give feedback in 3 bullets: what worked, what was missing, and a stronger version of one sentence.
Wait for my answer before asking the next question. At the end, list my 3 biggest improvements.`,steps:["Paste the prompt and answer each question as if it were real.","Redo your weakest answer using the feedback.","Prepare two questions of your own to ask the interviewer."],risks:["AI can't predict the exact questions a company will ask."],tools:ANY},{slug:"ask-for-a-raise",cat:"career",v:"half",q:"Can AI help me ask for a raise?",sum:"Half. AI builds a strong written case from your results. Knowing what the role pays in your area takes real salary data from you.",why:["It turns your wins into a clear, confident case.","It can suggest how to answer common pushback.","It doesn't know current pay in your area. Invented salary numbers weaken your case."],prompt:`Help me prepare a written request for a raise. Confident, specific, not pushy.

My role and time in role: [ROLE, TIME]
My results in the last 12 months (with numbers if I have them): [LIST]
New responsibilities I've taken on: [LIST]
Salary data I found (source + range): [DATA OR "none yet"]
The raise I want: [AMOUNT OR %]

Write:
1. A short email to my manager (under 200 words).
2. Three likely objections and a one-sentence reply to each.
Rules: NEVER invent market salary figures. If I gave none, tell me where to look instead.`,steps:["Gather your results and real salary data first.","Send the email or bring it to your review.","Get any agreed raise confirmed in writing."],risks:["Made-up market numbers can backfire. Use sources you can name."],tools:ANY},{slug:"write-product-descriptions",cat:"business",v:"bot",q:"Can AI write my product descriptions?",sum:"Yes. Give it the real specs and who it's for, and it writes clear descriptions fast. You check every claim.",why:["Turning specs into benefits is a writing task AI handles well.","It can match the tone of your brand from one example.","It will invent features if you don't give it facts, so give it facts."],prompt:`Write a product description for my online store.

Product: [NAME]
Real specs (size, material, what's included): [LIST]
Who it's for: [CUSTOMER]
Tone: [e.g. friendly, premium, playful]
Example of a description I like (optional): [PASTE]

Output: a one-line hook, a 60 to 90 word description, and 5 benefit bullets.
Rules: use ONLY the specs I gave. NEVER add features, certifications or claims (like "eco-friendly" or "best-selling") that aren't in my list.`,steps:["List the real specs.","Paste the prompt and pick the best version.","Check every claim against the actual product."],risks:["False claims in listings can break marketplace rules and consumer protection laws."],tools:ANY},{slug:"write-an-overdue-invoice-reminder",cat:"business",v:"bot",q:"Can AI write my overdue invoice reminders?",sum:"Yes. It writes polite first, second and final reminders that get you paid without burning the relationship.",why:["Reminder emails follow a clear escalation pattern.","AI keeps the tone professional even when you're frustrated.","You get all three reminders written at once."],prompt:`Write three payment reminder emails for an overdue invoice.

Client: [NAME]
Invoice number, amount, due date: [DETAILS]
Work delivered: [SHORT DESCRIPTION]
How they can pay: [PAYMENT LINK OR METHOD]
My late-fee terms (only if in my contract): [TERMS OR "none"]

Write: 1) a friendly reminder (3 days late), 2) a firmer follow-up (14 days late), 3) a final notice (30 days late).
Each under 120 words, with a clear subject line.
Rules: NEVER mention late fees or collections unless I listed terms.`,steps:["Fill in the invoice details.","Save the three emails as templates.","Send each one on schedule."],risks:["Only mention fees your contract actually includes."],tools:ANY},{slug:"write-a-privacy-policy-for-my-website",cat:"business",v:"half",q:"Can AI write a privacy policy for my website?",sum:"Half. AI drafts a readable first version from what your site actually does. Legal requirements vary, so it needs a check before you rely on it.",why:["It's good at plain-language drafts that match your real data practices.","It can't know every law that applies to your customers.","A policy that describes things you don't do is worse than a short honest one."],prompt:`Draft a plain-English privacy policy for my small business website. This is a draft for review, not legal advice.

Business name and location: [NAME, STATE/COUNTRY]
What data I collect and how: [e.g. email for newsletter, payments through a processor]
Services that handle data for me: [e.g. email provider, payment processor, web host]
Do I use cookies or analytics? [YES/NO, WHICH]
Contact email for privacy requests: [EMAIL]

Write sections: what we collect, how we use it, who we share it with, cookies, your choices, contact, changes.
Rules: describe ONLY what I listed. Mark anything uncertain as [CHECK].`,steps:["List exactly what your site collects.","Resolve every [CHECK] item.","Have it reviewed if you sell to people in regions with strict privacy laws."],risks:["Requirements differ by country and state."],tools:ANY},{slug:"do-my-bookkeeping",cat:"business",v:"half",q:"Can AI do my bookkeeping?",sum:"Half. AI helps sort a transaction list into categories and explains what it means. The real books belong in accounting software, checked by you.",why:["Categorizing a pasted list of transactions is fast and useful.","It can't connect to your bank or keep records over time in a chat.","Tax-related categories need a human check."],prompt:`Help me categorize business transactions. You are an organizer, not my accountant.

My business type: [e.g. freelance designer]
Categories I use: [LIST OR "suggest standard small-business categories"]
Transactions (date, description, amount):
[PASTE. Remove card and account numbers.]

Output a table: Date | Description | Amount | Suggested category | Confidence (High/Low).
Rules: mark anything unclear as Low and ask me about it. NEVER guess whether something is tax-deductible.`,steps:["Export transactions and remove account numbers.","Review every Low-confidence line.","Enter the final categories in your accounting software."],risks:["Wrong categories can cause tax problems. Have an accountant review year-end books."],tools:ANY},{slug:"understand-my-medical-bill",cat:"health-admin",v:"half",q:"Can AI explain my medical bill?",sum:"Half. AI explains the terms and codes on a bill and writes questions to ask the billing office. It can't tell you whether the charge is correct.",why:["Billing terms like 'allowed amount' and 'patient responsibility' are confusing, and AI explains them well.","It helps you spot things to ask about, like duplicate lines.","Only your insurer and provider can confirm what you owe."],prompt:`Explain this medical bill in plain English. This is billing help only, not medical advice.

[PASTE THE BILL LINES AND YOUR INSURER'S EXPLANATION OF BENEFITS. Remove your name, member ID and account numbers.]

Give me:
1. What each line and term means.
2. Anything that looks worth asking about (possible duplicates, charges not on the insurer's statement).
3. A short, polite message to the billing office asking for an itemized bill and answers to my questions.
Rules: don't guess what a code means if you're unsure. Say "confirm with billing."`,steps:["Remove personal and insurance ID numbers first.","Request an itemized bill if you don't have one.","Send your questions to the billing office in writing."],risks:["Never share your member ID or Social Security number in a chat app."],tools:ANY},{slug:"diagnose-my-symptoms",cat:"health-admin",v:"nah",q:"Can AI diagnose my symptoms?",sum:"Nah. AI can't examine you and can be confidently wrong. Use it to prepare questions for a clinician, not to replace one.",why:["Symptoms overlap across many conditions. Diagnosis needs an exam and tests.","AI answers can sound certain when they're guesses.","Delaying real care because of a chat answer is a real risk."],prompt:`I have an upcoming appointment. Help me prepare. Do NOT diagnose me or suggest treatments.

What I'm experiencing, in my own words: [DESCRIPTION, WHEN IT STARTED, WHAT MAKES IT BETTER OR WORSE]

Give me:
1. A clear, short summary I can read to the clinician.
2. A list of details they'll likely ask about that I should note beforehand.
3. Five questions to ask during the visit.`,steps:["If symptoms are severe or sudden, contact emergency services or a clinician now.","Use the summary and questions at your appointment."],risks:["Never use AI instead of emergency care."],tools:"Use AI only to organize your notes for a clinician."},{slug:"prepare-questions-for-a-doctor-visit",cat:"health-admin",v:"bot",q:"Can AI help me prepare for a doctor's appointment?",sum:"Yes. It turns your notes into a short summary and a question list, so you don't forget anything in a rushed visit.",why:["Organizing notes into a clear list is a strength.","It helps you ask about costs, next steps and follow-up.","It doesn't give medical advice when you tell it not to."],prompt:`Help me prepare for a medical appointment. Organize only. Do NOT give medical advice.

Reason for visit: [REASON]
My notes (symptoms, medications I take, questions on my mind): [NOTES]

Output:
1. A 4 to 6 line summary to read at the start of the visit.
2. My questions, most important first (max 8).
3. A checklist of what to bring.`,steps:["Write your notes.","Print or save the list on your phone.","Take notes on the answers during the visit."],risks:["Keep personal ID numbers out of the chat."],tools:ANY},{slug:"plan-a-trip-itinerary",cat:"travel",v:"bot",q:"Can AI plan my trip itinerary?",sum:"Yes. It builds a realistic day-by-day plan around your pace and budget. Check opening hours and prices before you go.",why:["Grouping sights by neighborhood and pacing the days is something AI does well.","It adapts instantly: rainy day, tired kids, lower budget.","Hours, prices and closures change, and AI may not know."],prompt:`Plan a day-by-day itinerary.

Destination: [CITY/REGION]
Dates and number of days: [DATES]
Who's going: [e.g. 2 adults, kids ages 6 and 9]
Pace: [relaxed / normal / packed]
Budget level: [low / medium / high]
Must-dos and hard no's: [LIST]

Output: for each day, morning / afternoon / evening, grouped by area to limit travel time, with one rainy-day backup.
Rules: mark anything with changing hours or prices as [CHECK HOURS]. Don't invent specific restaurant names you aren't sure exist.`,steps:["Fill in your trip details.","Check every [CHECK HOURS] item on the official website.","Book anything that needs reservations."],risks:["AI may suggest places that have closed. Verify before you go."],tools:ANY},{slug:"find-the-cheapest-flight",cat:"travel",v:"half",q:"Can AI find me the cheapest flight?",sum:"Half. AI can explain smart search strategies and compare options you paste in. For live prices, use a flight search site.",why:["Fares change constantly, and AI chat answers may be out of date.","It's useful for strategy: flexible dates, nearby airports, one-way combinations.","Paste real options in and it compares the true total cost, including bags."],prompt:`Help me compare flights. Use only the options I paste. Don't invent fares.

Trip: [FROM] to [TO], dates [DATES], flexibility [e.g. +/- 2 days]
Bags I need: [e.g. 1 carry-on, 1 checked]
Options I found (airline, times, price, fare type):
[PASTE OPTIONS]

Give me:
1. A comparison table with the estimated total cost including bags and seat selection. Mark fees you aren't sure of as [CHECK].
2. My best pick and why, in 2 sentences.
3. Three search tips for my route I haven't tried yet.`,steps:["Search a flight comparison site first.","Paste the top options into the prompt.","Confirm the final price on the airline's site before booking."],risks:["Baggage and seat fees vary by fare type. Confirm them before you pay."],tools:"An AI chat app plus any flight search site."},{slug:"write-a-flight-delay-complaint",cat:"travel",v:"bot",q:"Can AI write my flight delay or cancellation complaint?",sum:"Yes. It writes a clear, firm complaint with your timeline and the exact outcome you want.",why:["Complaint letters follow a simple structure.","AI keeps it factual and polite, which gets better results.","Your rights depend on the country and the airline's own policy, so check those yourself."],prompt:`Write a complaint to an airline about a delayed or canceled flight. Firm, factual, under 250 words.

Airline and flight number: [DETAILS]
Date and route: [DETAILS]
What happened (timeline): [e.g. delayed 5 hours, missed connection]
Costs I had because of it: [e.g. hotel $140, meals $32. I have receipts.]
What I want: [refund / reimbursement of $X / travel credit]

Rules: NEVER cite specific laws or compensation amounts unless I include them. Ask for a written reply.`,steps:["Gather receipts and your booking confirmation.","Check the airline's customer service policy and your country's travel rules.","Send the complaint through the airline's official web form."],risks:["Don't claim compensation amounts you haven't confirmed apply to your flight."],tools:ANY},{slug:"make-a-packing-list",cat:"travel",v:"bot",q:"Can AI make my packing list?",sum:"Yes. Tell it where, when and what you're doing, and it builds a checklist you can reuse.",why:["Packing lists are pure organization, a strong fit for AI.","It remembers the easy-to-forget items: chargers, meds, adapters.","It adapts to carry-on-only trips."],prompt:`Make a packing checklist.

Destination and typical weather for my dates: [PLACE, MONTH]
Length of trip: [DAYS]
Activities: [e.g. hiking, one nice dinner, beach]
Luggage: [e.g. carry-on only]
Traveling with: [e.g. toddler, none]

Output: a checklist grouped by Clothes, Toiletries, Tech, Documents, Health, and Kids (if relevant), with quantities.
Keep it realistic for my luggage size.`,steps:["Fill in your trip.","Check the weather forecast a few days before you leave.","Save the list for your next trip."],risks:["Check your airline's liquid and battery rules."],tools:ANY},{slug:"email-my-kids-teacher",cat:"family",v:"bot",q:"Can AI write an email to my kid's teacher?",sum:"Yes. It writes a short, respectful email that gets to the point and asks for what you need.",why:["Teachers get lots of email. Short and clear gets read.","AI keeps the tone collaborative, even about a problem.","It helps you ask for a specific next step."],prompt:`Write a short email to my child's teacher. Friendly, respectful, under 150 words.

Teacher's name: [NAME]
My child's name and class: [NAME, CLASS]
What it's about: [e.g. struggling with math homework, upcoming absence, a concern]
What I'd like: [e.g. suggestions, a written update, extra practice materials]

End with one clear question. Don't be defensive or overly apologetic.`,steps:["Fill in the details.","Read it once as if you were the teacher.","Send it through the school's usual channel."],risks:["Keep private family details to what the teacher needs to know."],tools:ANY},{slug:"help-my-kid-with-homework",cat:"family",v:"half",q:"Can AI help my kid with homework?",sum:"Half. AI is a patient tutor when it explains and asks questions. If it just gives answers, your kid learns nothing.",why:["It explains the same idea five different ways without getting tired.","It can make practice problems at the right level.","Math answers can be wrong. Check them."],prompt:`Act as a patient tutor for a [GRADE]-grade student. NEVER give the final answer directly.

Subject and topic: [e.g. fractions, adding with unlike denominators]
The problem: [PASTE PROBLEM]

Guide the student step by step with questions. After each student reply, give a hint or confirm. Use simple words and short sentences. At the end, give one similar practice problem.`,steps:["Sit with your child while they use it.","Make sure they explain the answer back in their own words.","Follow the school's rules on AI use."],risks:["Some schools ban AI for assignments. Check the policy.","Double-check math answers."],tools:ANY},{slug:"plan-a-kids-birthday-party",cat:"family",v:"bot",q:"Can AI plan my kid's birthday party?",sum:"Yes. It builds the theme, schedule, games, shopping list and budget in one go.",why:["Party planning is lists and timing, a strong fit.","It adapts to age, space and budget.","It writes the invitation text too."],prompt:`Plan a birthday party.

Child's age and interests: [AGE, INTERESTS]
Number of kids: [NUMBER]
Location: [home / park / other]
Budget: [AMOUNT]
Party length: [HOURS]

Output:
1. Theme idea (pick one and commit).
2. A timed schedule.
3. Three games with rules, suited to the age.
4. A shopping list with estimated costs that stays within budget.
5. Invitation text (under 60 words).
Flag any food allergy questions to ask parents.`,steps:["Fill in the details.","Check prices at your store; AI estimates can be off.","Ask parents about allergies."],risks:["Cost estimates are rough. Price items yourself."],tools:ANY},{slug:"write-a-wedding-toast",cat:"writing",v:"half",q:"Can AI write my wedding toast?",sum:"Half. AI gives you a strong structure and smooth lines. The stories and feelings have to come from you, or it'll sound generic.",why:["Structure and timing are easy wins.","The best toasts need specific memories only you have.","Read it aloud to make sure it sounds like you."],prompt:`Help me write a wedding toast. About 2 minutes spoken (roughly 280 words).

My relationship to the couple: [e.g. best friend of the groom for 12 years]
Their names: [NAMES]
Two or three real stories or details: [STORIES]
Tone: [e.g. warm with a few light jokes]
Things to avoid: [e.g. exes, inside jokes others won't get]

Structure: short intro, one story, what makes them great together, a toast line.
Rules: use only my stories. NEVER invent memories.`,steps:["Give it real stories.","Rewrite any line that doesn't sound like you.","Practice out loud and time it."],risks:["A toast that sounds copied falls flat. Make it yours."],tools:ANY},{slug:"proofread-an-important-email",cat:"writing",v:"bot",q:"Can AI proofread an important email?",sum:"Yes. It fixes grammar and makes your message clearer and shorter, without changing what you mean.",why:["Grammar and clarity edits are among AI's most reliable skills.","It can adjust tone: more formal, friendlier, firmer.","Ask it to list the changes so nothing gets lost."],prompt:`Proofread and tighten this email. Keep my meaning and my voice.

Tone I want: [e.g. professional but warm]
Email:
[PASTE]

Output:
1. The improved email.
2. A short list of what you changed and why.
Rules: don't add new facts or promises. Keep it about the same length or shorter.`,steps:["Paste your draft.","Check the change list.","Send."],risks:["Make sure it didn't change a date, number or name."],tools:ANY},{slug:"write-an-apology",cat:"writing",v:"half",q:"Can AI write an apology for me?",sum:"Half. AI helps you find the words and avoid excuses. A real apology still needs your own honesty.",why:["It helps you say what you did without defending yourself.","It suggests a concrete way to make things right.","A clearly AI-written apology can make things worse. Make it personal."],prompt:`Help me write a sincere apology. Short, honest, no excuses.

Who it's to and our relationship: [PERSON]
What I did: [WHAT HAPPENED]
How it affected them: [IMPACT]
What I'll do differently or how I'll make it right: [ACTION]

Write it in plain, personal language (under 150 words). NEVER use "I'm sorry if you were offended." Take clear responsibility.`,steps:["Be honest in the details.","Rewrite it in your own words.","Follow through on what you promise."],risks:["An apology only works if you mean it."],tools:ANY},{slug:"make-a-weekly-meal-plan",cat:"everyday",v:"bot",q:"Can AI make my weekly meal plan and grocery list?",sum:"Yes. It plans the week around your diet, budget and schedule, and builds a grocery list sorted by store section.",why:["Meal planning is logistics, a strong fit for AI.","It reuses ingredients across meals to cut waste.","It adjusts in seconds if you dislike a meal."],prompt:`Plan my dinners for the week and write the grocery list.

People: [NUMBER, AGES]
Dietary needs and allergies: [LIST]
Weekly grocery budget: [AMOUNT]
Busy nights (need 20 minutes or less): [DAYS]
Foods we love / hate: [LIST]

Output:
1. 7 dinners with prep time.
2. One grocery list grouped by store section, with quantities.
3. Which ingredients get reused across meals.
Rules: respect every allergy. Mark prices as estimates.`,steps:["Fill in your household details.","Check your pantry and cross off what you have.","Swap any meal you don't like and ask for an updated list."],risks:["Double-check allergy-sensitive ingredients on labels."],tools:ANY},{slug:"make-a-decluttering-plan",cat:"everyday",v:"bot",q:"Can AI make me a decluttering plan?",sum:"Yes. It breaks a big mess into small daily tasks that actually get done.",why:["Breaking a big job into 15-minute tasks is a strength.","It can build the plan around your schedule and energy.","It adds a sell, donate and toss plan so things actually leave the house."],prompt:`Make me a decluttering plan I can actually finish.

Spaces to tackle: [e.g. garage, closet, kitchen]
Time I have: [e.g. 20 minutes on weeknights, 2 hours on Saturday]
What makes it hard for me: [e.g. sentimental items, no time]

Output: a 2-week plan, one small task per session, with a clear "done" for each. Add a simple rule for deciding keep / donate / sell / toss, and a list of where to drop off donations to look up locally.`,steps:["Fill in your spaces and time.","Do only today's task.","Book a donation drop-off so bags don't sit around."],risks:["None worth worrying about. Just start."],tools:ANY},{slug:"write-my-will",cat:"everyday",v:"nah",q:"Can AI write my will?",sum:"Nah. A will has to meet your state's legal rules to be valid. Use AI to get organized, then use a lawyer or a reputable will service.",why:["Small signing and witness mistakes can make a will invalid.","Rules differ by state and country.","The cost of a mistake falls on your family."],prompt:`Help me get organized before I make a will. Do NOT write the will itself.

My situation: [e.g. married, 2 kids, own a home, have a retirement account]

Give me:
1. A checklist of information to gather (assets, accounts, guardianship choices).
2. Plain-English meanings of terms like executor, beneficiary and guardian.
3. Questions to ask an estate lawyer or will service.`,steps:["Use the checklist to gather information.","Make the will with a lawyer or a reputable will service for your state.","Store it safely and tell your executor where it is."],risks:["An invalid will can mean state law decides for you."],tools:"Use AI only to prepare. Make the will with a lawyer or a reputable service."},{slug:"build-a-free-link-in-bio-page",cat:"free-versions",v:"bot",q:"Can AI build me a free link-in-bio page instead of paying for one?",sum:"Yes. AI writes a single-page site with your links, and you can host it for free. Takes about an evening the first time.",why:["A page of links is simple HTML, which AI writes reliably.","Free static hosting services exist for this kind of page.","You own the page and never pay a monthly fee."],prompt:`Write a single-file HTML page for my link-in-bio. No frameworks, no external scripts.

My name or brand: [NAME]
Short bio (1 line): [BIO]
Links (label + URL): [LIST]
Colors or style I like: [e.g. black and white, bold]

Requirements:
- One index.html file with CSS inside it.
- Works well on phones first.
- Large tap targets, readable text, good contrast.
Then give me step-by-step, non-technical instructions to publish it for free using a free static hosting service, assuming I've never done it before.`,steps:["Paste the prompt with your links.","Save the code as index.html and open it in your browser to check it.","Follow the hosting steps it gives you."],risks:["Double-check every link works before sharing.","Built-in analytics from paid tools won't be included."],tools:ANY},{slug:"build-a-free-budget-tracker",cat:"free-versions",v:"bot",q:"Can AI build me a free budget tracker instead of a budgeting app?",sum:"Yes. AI can set up a Google Sheets or Excel budget tracker with formulas, so you stop paying for an app.",why:["Spreadsheet formulas are a reliable AI strength.","You control your data; no bank login needed.","It won't auto-import transactions the way paid apps do."],prompt:`Design a monthly budget tracker for [Google Sheets / Excel].

Categories I want: [LIST OR "suggest common ones"]
Income sources: [LIST]

Give me:
1. The exact sheet layout (tab names, column headers, which cell goes where).
2. Every formula I need, with the cell it goes in: category totals, remaining budget, % spent, monthly summary.
3. Conditional formatting rules to turn a category red when it's over budget.
Explain each step for a beginner. Use only standard built-in functions.`,steps:["Create a blank spreadsheet.","Follow the layout and paste in each formula.","Enter a week of spending to check the totals work."],risks:["Test formulas with sample numbers before trusting them."],tools:ANY},{slug:"build-a-free-habit-tracker",cat:"free-versions",v:"bot",q:"Can AI build me a free habit tracker?",sum:"Yes. A simple habit tracker page or spreadsheet is well within what AI builds reliably, and it saves the subscription.",why:["Habit trackers are simple: a list, checkboxes and a streak count.","AI can make it save your progress in your own browser.","No account, no ads, no fees."],prompt:`Build a habit tracker as a single HTML file I can open in my browser.

Habits to track: [LIST]
Features I want: daily checkboxes, current streak per habit, a 30-day grid view.

Requirements:
- One index.html file, no external libraries.
- Save progress in the browser's local storage so it stays after I close the tab.
- Clean, phone-friendly design with large tap targets.
Explain how to open it and how to back up my data.`,steps:["Paste the prompt with your habits.","Save the file and open it in your browser.","Bookmark it."],risks:["Browser storage can be erased if you clear your browsing data. Back it up."],tools:ANY},{slug:"build-a-free-invoice-template",cat:"free-versions",v:"half",q:"Can AI replace my paid invoicing app?",sum:"Half. AI builds a clean invoice template that calculates totals. Paid apps still win on online payments, reminders and tax reports.",why:["A template with automatic totals is easy for AI.","Accepting card payments and tracking who paid needs real software.","For a few invoices a month, a template can be enough."],prompt:`Create an invoice template for [Google Sheets / Excel / Google Docs].

My business name and contact email: [DETAILS]
What I bill for: [e.g. hourly design work, fixed-price projects]
Payment terms: [e.g. due in 14 days]

Include: invoice number, dates, client block, line items (description, quantity, rate, amount), subtotal, tax line (leave the rate as a blank cell I fill in), total, and payment instructions.
Give me the exact layout and every formula. Explain for a beginner.`,steps:["Build the template once.","Duplicate it for each new invoice and update the invoice number.","Export to PDF to send."],risks:["Check your local sales tax rules. Don't let AI guess your tax rate."],tools:ANY},{slug:"replace-my-password-manager",cat:"free-versions",v:"nah",q:"Can AI build me a free password manager?",sum:"Nah. Security software needs expert review. A homemade password manager puts every account you have at risk. Use an established one; some have free plans.",why:["Encryption is easy to get subtly wrong.","A single bug can expose every password.","Established password managers are audited by security experts."],prompt:`I want to improve my password security without paying much. Do NOT write password manager code for me.

My situation: [e.g. I reuse passwords, I use an iPhone and a Windows laptop]

Explain:
1. What to look for in a password manager (encryption, audits, device support).
2. How to move to one in 5 steps.
3. How to turn on two-factor authentication for my most important accounts, starting with email.`,steps:["Pick an established password manager.","Start with your email and bank accounts.","Turn on two-factor authentication."],risks:["Never paste real passwords into an AI chat."],tools:"Use an established password manager. Use AI only to learn the setup."},{slug:"write-a-refund-request",cat:"money",v:"bot",q:"Can AI write my refund request?",sum:"Yes. It turns your order details into a short, polite refund request that states exactly what you want and by when.",why:["Refund requests follow a simple pattern: what you bought, what went wrong, what you want.","AI keeps the tone calm, which gets faster yeses from support teams.","It's easy to check: every fact in the message came from you."],prompt:`Write a refund request email. Polite, firm, under 150 words.

Store: [STORE NAME]
Order number and date: [ORDER #, DATE]
What I bought and paid: [ITEM, AMOUNT]
What went wrong: [e.g. arrived broken, not as described, never arrived]
What I want: [full refund / replacement / partial refund of $X]
Photos or proof I have: [LIST OR "none"]

Include a clear subject line and ask for a reply by a specific date 7 days from today.
Rules: use only the facts above. NEVER mention laws, reviews or chargebacks as threats.`,steps:["Fill in your order details.","Attach your photos or receipt.","Send it through the store's support email or form, and save the reply."],risks:["Check the store's return window before you send.","If the store refuses and you paid by card, your card issuer may have a separate dispute process."],tools:ANY},{slug:"understand-my-credit-report",cat:"money",v:"half",q:"Can AI explain my credit report?",sum:"Half. AI explains the sections and terms and helps you spot entries to question. It can't confirm whether an entry is accurate; only the credit bureau and the lender can.",why:["Credit report language is dense, and plain-English explanations are a strength.","It can sort entries into 'looks fine' and 'worth asking about.'","It can't see the lender's records, so it can't tell you an entry is wrong."],prompt:`Explain my credit report in plain English. This is education, not financial advice.

[PASTE THE REPORT SECTIONS. Remove your name, address, Social Security number and full account numbers first.]

Give me:
1. What each section means, in one or two sentences each.
2. A table: Entry | What it says | Looks fine or Worth asking about | Why.
3. For anything worth asking about, the exact question to send the credit bureau or lender.
Rules: never guess my credit score. If a term depends on the bureau or country, say so.`,steps:["Get your free report from the official source in your country.","Remove personal numbers before pasting.","Send disputes directly to the credit bureau, in writing, with documents."],risks:["Never paste your Social Security number or full account numbers into a chat.","Paid 'credit repair' services can't remove accurate information."],tools:ANY},{slug:"make-a-debt-payoff-plan",cat:"money",v:"half",q:"Can AI make me a debt payoff plan?",sum:"Half. AI explains the snowball and avalanche methods and lays out an order to pay your debts. Month-by-month interest math is where it slips, so check the numbers in a calculator.",why:["Choosing an order to pay debts is simple logic AI handles well.","Interest compounding over many months is easy for a chat app to get wrong.","A spreadsheet or payoff calculator checks the math for free."],prompt:`Help me plan how to pay off my debts. You are a coach, not a financial advisor.

My debts (name, balance, interest rate, minimum payment): [LIST]
Total I can pay each month: [AMOUNT]

Give me:
1. The payoff order using the avalanche method (highest rate first) and the snowball method (smallest balance first), side by side.
2. How much extra goes to the first debt each month after all minimums are paid.
3. Which method saves more interest, and which gives faster early wins.
Rules: do NOT give exact payoff dates or total interest unless you show the full month-by-month math. Tell me to confirm numbers in a payoff calculator.`,steps:["List every debt with its rate and minimum.","Pick a method.","Check the timeline in a free payoff calculator or spreadsheet before you commit."],risks:["Wrong interest math can make a plan look faster than it is.","If debt feels unmanageable, a nonprofit credit counselor can help."],tools:"An AI chat app for the plan, plus a spreadsheet or payoff calculator for the math."},{slug:"write-a-complaint-to-my-neighbor",cat:"home",v:"bot",q:"Can AI write a note to my neighbor about noise?",sum:"Yes. It writes a friendly, specific note that asks for one change without starting a feud.",why:["Tone is the whole job, and AI is good at friendly but clear.","It keeps the note to facts: when, what, and one request.","A calm first note often solves it without the landlord or HOA."],prompt:`Write a short, friendly note to my neighbor. Under 120 words.

The issue: [e.g. loud music after 11 pm]
When it happens: [DAYS/TIMES]
How it affects me: [e.g. I start work at 6 am]
What I'm asking for: [ONE specific change]
How they can reach me: [e.g. knock on 3B, or a note under my door]

Rules: assume good intent. No threats, no mentions of landlords, police or rules. Sign it with my first name only.`,steps:["Fill in the facts and one clear request.","Read it once as if you were the neighbor.","Deliver it in person or under their door, and keep a copy."],risks:["If there's any safety concern, skip the note and contact your landlord or local authorities."],tools:ANY},{slug:"compare-moving-quotes",cat:"home",v:"bot",q:"Can AI compare my moving company quotes?",sum:"Yes. Paste the quotes and it lines them up side by side, finds the hidden fees, and lists what to ask each company.",why:["Turning messy quotes into one table is organizing work AI does well.","It spots differences people miss: stairs fees, packing, insurance, minimum hours.","It only uses what's in the quotes, so you can check every line."],prompt:`Compare these moving quotes. Use only what the quotes say.

[PASTE EACH QUOTE, labeled Quote A, Quote B, etc.]
My move: [FROM, TO, DATE, HOME SIZE, STAIRS/ELEVATOR]

Output:
1. A table: Company | Price type (flat or hourly) | Estimated total | Included | Extra fees | Insurance/valuation | Deposit.
2. Anything missing from a quote, marked [NOT STATED].
3. Five questions to ask each company before booking.
Rules: never estimate a price a quote doesn't give. Flag hourly quotes where the total could run higher.`,steps:["Get at least three written quotes.","Paste them in and review the table.","Send your questions in writing and book the one with the clearest total."],risks:["Check that the mover is licensed for your type of move where you live.","Be wary of very large deposits."],tools:ANY},{slug:"write-my-linkedin-summary",cat:"career",v:"bot",q:"Can AI write my LinkedIn summary?",sum:"Yes. Give it your real experience and what you want next, and it writes a clear About section in your voice.",why:["Summaries follow a known shape: who you help, how, and proof.","AI is good at turning a list of jobs into a short story.","You can check every line because the facts come from you."],prompt:`Write my LinkedIn About section. 120 to 180 words, first person, plain and warm.

What I do now: [ROLE, INDUSTRY]
Past experience worth mentioning: [2-4 ITEMS WITH REAL RESULTS]
What I want next: [e.g. roles in customer success]
Something personal (optional): [e.g. I coach youth soccer]

Structure: one-line hook, what I do and for whom, 2 or 3 proof points, what I'm looking for.
Rules: NEVER invent results, numbers, titles or skills. No buzzwords like "passionate," "results-driven" or "synergy."`,steps:["Add real results with numbers you can back up.","Read it aloud and change anything that doesn't sound like you.","Paste it into the About section on your profile."],risks:["Recruiters check claims in interviews. Keep every number true."],tools:ANY},{slug:"negotiate-a-job-offer",cat:"career",v:"half",q:"Can AI help me negotiate a job offer?",sum:"Half. AI writes a confident, polite counteroffer and prepares you for the replies. What to ask for depends on real pay data and your situation, which you have to bring.",why:["A written counteroffer is a strong fit for AI.","It can prepare replies for common pushback.","It doesn't know what this role pays where you live."],prompt:`Help me respond to a job offer in writing. Confident, grateful, specific.

The offer: [TITLE, BASE PAY, BONUS, START DATE, BENEFITS]
What I want to change: [e.g. base pay to $X, start date, remote days]
Why it's reasonable: [REAL REASONS: other offers, experience, pay data with source]
My walk-away point: [PRIVATE, NOT FOR THE EMAIL]

Write:
1. A counteroffer email under 180 words.
2. Replies for: "This is our best offer," "We can't move on salary," and "We need an answer by tomorrow."
Rules: NEVER invent competing offers or market data. Never reveal my walk-away point.`,steps:["Gather real pay data and name your sources.","Send the counteroffer in writing.","Get the final offer in writing before you accept."],risks:["Bluffing about other offers can backfire.","Rescinded offers are rare but possible; stay polite."],tools:ANY},{slug:"reply-to-a-bad-review",cat:"business",v:"bot",q:"Can AI reply to a bad review of my business?",sum:"Yes. It writes a calm, public reply that owns what went wrong, doesn't argue, and moves the conversation private.",why:["Review replies need calm, and AI doesn't get defensive.","It follows a proven shape: thank, acknowledge, fix, move offline.","Future customers read the reply more than the review."],prompt:`Write a public reply to this review of my business. Under 100 words.

The review: [PASTE]
What actually happened (facts only): [YOUR SIDE]
What I can offer: [e.g. a redo, a refund, nothing]
How they can reach us: [EMAIL OR PHONE FOR THE BUSINESS]

Rules: thank them, acknowledge the problem, say what we'll do, invite them to contact us privately. NEVER argue, blame, share private details about the customer, or offer something I didn't list.`,steps:["Wait until you're calm.","Paste the review and your facts.","Post the reply, then follow up privately if they reach out."],risks:["Never share customer details publicly.","Don't offer incentives in exchange for changing a review; many platforms ban it."],tools:ANY},{slug:"write-a-client-contract",cat:"business",v:"nah",q:"Can AI write a contract for my clients?",sum:"Nah. A contract that misses a clause or doesn't fit your state's law can cost you far more than a lawyer or a reputable template. Use AI to organize your terms, then use a vetted template or a lawyer.",why:["Contracts depend on local law, and AI can get it confidently wrong.","Missing terms (payment, ownership, cancellations) cause the most disputes.","Vetted templates exist for most freelance and service work."],prompt:`Help me prepare the terms for a client contract. Do NOT write the contract itself.

My business: [WHAT I DO]
Typical project: [SCOPE, TIMELINE, PRICE]
Things that have gone wrong before: [e.g. late payment, endless revisions]

Give me:
1. A checklist of terms to decide: scope, deliverables, revisions, payment schedule, late payment, ownership of work, cancellation, confidentiality.
2. For each, the questions I need to answer.
3. Questions to ask a lawyer or when choosing a template.`,steps:["Use the checklist to decide your terms.","Start from a vetted template for your field or have a lawyer draft it.","Have a lawyer review anything high-value."],risks:["An unenforceable clause can leave you unprotected.","Laws differ by state and country."],tools:"Use AI to organize your terms. Use a vetted template or a lawyer for the contract."},{slug:"understand-my-lab-results",cat:"health-admin",v:"nah",q:"Can AI tell me what my lab results mean?",sum:"Nah. Lab results depend on your history, medications and the lab's own ranges, so a chat answer can scare or reassure you wrongly. Use AI to prepare questions for your clinician.",why:["Normal ranges differ by lab, age and sex.","A single value means little without your history.","Only your clinician can say what a result means for you."],prompt:`I have lab results to discuss with my clinician. Help me prepare. Do NOT interpret my results or tell me whether anything is normal or abnormal.

The tests listed on my report (names only): [e.g. CBC, lipid panel, A1C]

Give me:
1. A one-line plain-English description of what each test generally measures.
2. Questions to ask my clinician about my results.
3. What to bring or note before the appointment.`,steps:["Read the report's own notes and ranges.","Use the questions at your appointment or through your patient portal.","If a result is flagged as urgent, contact your clinician right away."],risks:["Never use AI instead of your clinician for results.","Don't paste your name, date of birth or member ID into a chat."],tools:"Use AI only to prepare questions for your clinician."},{slug:"write-a-eulogy",cat:"writing",v:"half",q:"Can AI help me write a eulogy?",sum:"Half. AI gives you a gentle structure and helps with wording when grief makes writing hard. The memories have to come from you, or it will sound generic.",why:["Structure is the hard part when you're grieving, and AI helps there.","It can smooth wording and keep it to the right length.","Only you know the stories that make it theirs."],prompt:`Help me write a eulogy. About 3 minutes spoken (roughly 400 words).

Their name and my relationship to them: [NAME, RELATIONSHIP]
Three things they loved or were known for: [LIST]
Two or three real stories or memories: [STORIES]
Tone: [e.g. warm with a little light humor]

Structure: opening, who they were, the stories, what they gave us, a closing line.
Rules: use ONLY my stories and details. NEVER invent memories, quotes or facts about their life.`,steps:["Give it your real memories.","Rewrite any line in your own words.","Read it aloud once and time it."],risks:["Invented details can hurt family members who knew them. Check every line."],tools:ANY},{slug:"cancel-a-subscription",cat:"everyday",v:"bot",q:"Can AI help me cancel a subscription?",sum:"Yes. It writes a clear cancellation request that states the date, asks for confirmation, and heads off the retention runaround.",why:["Cancellation messages are short and formulaic.","Asking for written confirmation protects you later.","It saves time when a company makes canceling hard."],prompt:`Write a subscription cancellation request. Under 100 words, polite and final.

Company and service: [NAME]
Account email or number: [DETAILS]
Cancel effective: [immediately / end of billing period]
Refund request (optional): [e.g. refund of this month's $X charge, or none]

Rules: state that I want to cancel, not pause or downgrade. Ask for written confirmation with the cancellation date and that no further charges will be made.`,steps:["Check the company's cancellation page first; many have a button.","Send the request in writing and save the confirmation.","Watch your next statement for charges."],risks:["Some contracts have notice periods. Check yours.","If you keep being charged, your card issuer can help."],tools:ANY},{slug:"build-a-free-wedding-website",cat:"free-versions",v:"bot",q:"Can AI build me a free wedding website?",sum:"Yes. AI writes a one-page wedding site with your details, schedule, travel info and an RSVP link, and you can host it free.",why:["A wedding site is mostly text and a few sections, simple for AI.","Free static hosting works for one page.","No ads and no monthly upgrade prompts."],prompt:`Write a single-file HTML wedding website. No frameworks, no external scripts.

Couple: [NAMES]
Date, time and venue: [DETAILS]
Schedule: [e.g. ceremony 4 pm, reception 5:30 pm]
Travel and hotel info: [DETAILS]
RSVP: [LINK TO A FREE FORM, e.g. a Google Form]
Style: [e.g. simple, sage green and white]

Requirements: one index.html with CSS inside, mobile-first, readable fonts, sections for Details, Schedule, Travel, RSVP, FAQ. Then give me beginner steps to publish it free on a static host.`,steps:["Create a free RSVP form first and copy its link.","Paste the prompt and save the file as index.html.","Open it on your phone to check it, then publish."],risks:["Don't publish your home address.","Double-check dates and times with your venue."],tools:ANY}],T=(input,checks,excerpt,result="pass",note="")=>({model:"Claude",date:"2026-09-28",input,checks,excerpt,result,note}),TESTS={"make-a-monthly-budget":T("Take-home pay $3,200; rent $1,250, car $310, insurance $120, phone $65, internet $60; groceries $450, gas $140, eating out $200; goal: save $300.",[["Used only the numbers given",1],["Totals add up to $3,200 (we re-added them)",1],["Percentages correct",1],["Flagged the biggest category and why",1],["Table, then 3 tips",1]],"Flag: rent is 39% of take-home pay. A common guideline keeps housing near 30%, so rent is the category squeezing everything else."),"dispute-a-credit-card-charge":T("Charged twice for $89.99 on June 3; emailed the store June 5, no reply; want the duplicate reversed.",[["Merchant message under 150 words",1],["Dispute statement under 200 words, in date order",1],["No invented order numbers or dates",1],["Attachments marked [ATTACH]",1]],"I am requesting reversal of the duplicate $89.99 charge. The original $89.99 charge is valid."),"negotiate-a-lower-bill":T("Internet at $85/month, customer for 4 years, no competitor offers, lowest acceptable $65.",[["Opening message under 100 words",1],["No invented competitor prices",1],["Replies for a small discount and for a no",1]],"Thanks for looking. That helps, but I was hoping to get closer to $65 a month. Is there any plan or loyalty offer that gets me nearer that number?"),"do-my-taxes":T("W-2 job, a side gig selling crafts online, renting, one kid.",[["Did not calculate tax or say what to file",1],["Flagged rules that change by year",1],["Said it wasn't sure instead of guessing",1],["Said to keep the Social Security number out of the chat",1]],"I'm not sure of this year's exact thresholds and amounts, so check them in your tax software or with a preparer.","pass","The prompt works because it stops AI from doing the return. The verdict stays Nah."),"pick-stocks-for-me":T("New to investing, emergency fund in place, 20+ year horizon.",[["No specific stocks or funds recommended",1],["Under 400 words",1],["One example each for risk tolerance and diversification",1]],"Diversification is spreading money across many investments so no single one sinks you. Example: owning a fund of 500 companies instead of 3 stocks."),"write-a-repair-request-to-my-landlord":T("Unit 4B, kitchen sink leaking since Sept 20, bucket placed and valve off, access weekday evenings and Saturdays, cabinet floor warping.",[["Under 180 words",1],["Problem, date, steps taken, access times and urgency included",1],["Asks for a repair date in writing",1],["No legal threats",1]],"Access works weekdays after 5 pm and anytime Saturday. Could you reply in writing with the date a repair person will come?"),"explain-my-lease":T("An invented lease excerpt covering rent, late fee, deposit, repairs, pets and auto-renewal.",[["Quoted the clause for every point",1],["Marked missing topics \u201Cnot mentioned\u201D",1],["No claims about local law",1]],"Renewal: \u201Crenews automatically month-to-month unless either party gives 60 days' written notice.\u201D Give written notice 60 days before you want to leave."),"appeal-an-insurance-claim-denial":T("Burst basement pipe; denied as \u201Cgradual leakage\u201D; policy covers \u201Csudden and accidental discharge\u201D; plumber's invoice and photos.",[["Clear request and point-by-point answer",1],["Quoted only the policy text supplied",1],["No invented deadlines",1],["Marked a real gap as [NEED]",1]],"The denial states the damage 'resulted from gradual leakage.' The evidence shows a sudden pipe burst."),"tailor-my-resume-to-a-job":T("Customer Success Associate posting vs. a retail shift-lead resume.",[["Listed 8 skills as Yes / Partly / No",1],["Rewrote bullets using only resume facts",1],["Did not add Salesforce, SQL or numbers",1],["Asked questions to find real details",1]],"Missing keywords (CRM, Salesforce, SQL): I did not add these because they aren't on your resume."),"write-a-cover-letter":T("Junior marketing coordinator at a bakery chain; grew a club Instagram from 300 to 1,100; writes a nonprofit newsletter (about 800 subscribers).",[["Under 300 words",1],["Didn't use \u201CI am writing to express my interest\u201D",1],["Used only the examples given, numbers unchanged",0]],"At college I ran our club's Instagram and grew it from 300 to 1,100 followers in one semester by posting on a steady schedule.","partial","Corrected Sep 29, 2026: the numbers stayed the same, but the letter added details we never gave it (college, \u201Cone semester\u201D, \u201Ca steady schedule\u201D). Check every sentence against your real story before you send it."),"practice-for-a-job-interview":T("Dental office receptionist; one weak practice answer typed in.",[["One question at a time",1],["Feedback in 3 bullets",1],["The \u201Cstronger sentence\u201D example used made-up numbers",0]],"Stronger sentence: \u201COn Saturday mornings I handled about 40 calls while checking in a full waiting room...\u201D","partial","Use the example sentences as a pattern and put in your own real numbers."),"ask-for-a-raise":T("Operations coordinator, 2 years; invoice errors roughly halved; took over scheduling for 12; wants 8%; no salary data yet.",[["Email under 200 words",1],["Three objections with one-line replies",1],["No invented market salary figures",1]],"You didn't give market figures, so I haven't used any. Check your country's official wage statistics, recent postings for your role in your area, and any salary data your employer publishes."),"write-product-descriptions":T("Linen kitchen towel set: 100% linen, set of 3, 18 x 28 in, machine washable, sage/oat/charcoal.",[["60 to 90 word description (78)",1],["Only listed specs used",1],["No invented claims like \u201Cabsorbent\u201D or \u201Ceco-friendly\u201D",1]],"Three linen towels that work hard and look good doing it."),"write-an-overdue-invoice-reminder":T("Invoice #1042, $1,250, due Aug 30, website refresh, no late-fee terms.",[["Three emails with subject lines",1],["Each under 120 words",1],["No late fees or collections mentioned",1]],"Invoice #1042 for $1,250 is now 30 days overdue. Please send payment within 7 days."),"write-a-privacy-policy-for-my-website":T("Small Ohio shop: newsletter emails, a payment processor, a web host, no analytics.",[["Described only what was listed",1],["Uncertain items marked [CHECK]",1],["Labeled as a draft, not legal advice",1]],"We don't use analytics or advertising cookies. [CHECK: your web host or payment processor may set their own cookies.]"),"do-my-bookkeeping":T("Five freelance-designer transactions (Adobe, Staples, Uber, Amazon, a client payment).",[["Table in the requested format",1],["Unclear items marked Low with questions",1],["Never said anything was tax-deductible",1]],"I haven't said whether anything is tax-deductible; ask your accountant."),"understand-my-medical-bill":T("An office visit plus a lab code listed twice; the insurer's statement shows the lab once.",[["Explained terms, hedging code meanings",1],["Spotted the duplicate line",1],["Spotted that insurance wasn't applied",1],["No medical advice",1]],"The 85025 lab appears twice on your bill but once on your insurer's statement. The second line may be a duplicate."),"diagnose-my-symptoms":T("Afternoon headaches for 3 weeks, worse after long screen days.",[["Did not diagnose or suggest treatment",1],["Summary, details to note, 5 questions",1]],"Which symptoms would mean I should seek care right away?","pass","The prompt prepares you for a clinician. Diagnosis itself stays Nah."),"prepare-questions-for-a-doctor-visit":T("Annual checkup; daily allergy pill; questions about sleep, vaccines and bloodwork cost.",[["4 to 6 line summary",1],["Up to 8 questions, most important first",1],["What-to-bring list",1],["No medical advice",1]],"I'd like to know whether I need bloodwork and what it costs."),"plan-a-trip-itinerary":T("Chicago, 3 days, 2 adults, normal pace, medium budget; must-dos: architecture, deep-dish; no nightclubs.",[["Morning / afternoon / evening, grouped by area",1],["Rainy-day backup each day",1],["Hours marked [CHECK HOURS]",1],["No invented restaurant names",1]],"Morning: architecture river cruise from the downtown riverwalk [CHECK HOURS]."),"find-the-cheapest-flight":T("Three pasted options, Minneapolis to Denver, carry-on plus a checked bag.",[["Used only the pasted options",1],["Unknown fees marked [CHECK]",1],["Can't see live prices (why this is Half-bot)",0]],"B could end up cheapest once a carry-on and a checked bag are added, because it already includes the carry-on.","partial","Useful for comparing, but it can't see live fares or fees."),"write-a-flight-delay-complaint":T("5-hour crew delay, missed connection, hotel $140 and meals $32.",[["Under 250 words",1],["$172 total correct",1],["No laws or compensation amounts cited",1]],"I'm requesting reimbursement of $172. Please reply in writing with your decision and next steps."),"make-a-packing-list":T("Seattle in November, 4 days, carry-on only.",[["Grouped with quantities",1],["Realistic for a carry-on",1]],"Clothes: rain jacket (1), warm layer or sweater (2), pants or jeans (2), tops (4), dinner outfit (1)..."),"email-my-kids-teacher":T("3rd grader struggling with multiplication; asking for practice ideas.",[["Under 150 words",1],["Ends with one clear question",1],["Added a detail we never gave (\u201CHe knows his 2s and 5s\u201D)",0]],"Are there one or two practice activities or resources you'd recommend for him?","partial","Read it and delete any detail you didn't give it."),"help-my-kid-with-homework":T("Grade 4, 1/3 + 1/4; the tester typed the student's replies.",[["Never gave the answer directly",1],["Guided with questions",1],["Math correct (7/12)",1],["Ended with a practice problem",1]],"Count by 3s: 3, 6, 9, 12. Now count by 4s: 4, 8, 12. What number shows up in both?"),"plan-a-kids-birthday-party":T("Age 7, dinosaurs, 12 kids, home, $200, 2 hours.",[["One theme",1],["Shopping list within budget ($186, re-added)",1],["Invitation under 60 words",1],["Allergy question included",1]],"Fossil dig: bury 12 toy dinosaurs in sand; kids use paintbrushes and spoons to dig one out each."),"write-a-wedding-toast":T("Best friend of the groom for 12 years; two real stories.",[["Used both stories",1],["Invented details (\u201Cthree flights of stairs\u201D, \u201Cterrible puns\u201D)",0],["Ran short: about 180 words, not 2 minutes",0]],"Sam doesn't do long phone calls. That night we talked for an hour, and about fifty minutes of it was Sam telling me about Alex.","partial","Delete anything that isn't true and ask for the length you need."),"proofread-an-important-email":T("A messy follow-up email to a client.",[["Fixed grammar",1],["Listed the changes",1],["Changed the sender's offer (\u201Cjump on a call\u201D became \u201Cin writing\u201D)",0]],"I'm following up on the proposal I sent last week. Have you had a chance to look it over?","partial","Check the change list for anything that alters what you offered."),"write-an-apology":T("Missed a sister's birthday dinner without calling.",[["Under 150 words",1],["Clear responsibility, no excuses",1],["No \u201Csorry if you were offended\u201D",1]],"You waited 40 minutes for me, and I understand why it felt like I didn't care. That's on me, and there's no good excuse."),"make-a-weekly-meal-plan":T("Family of 3, tree-nut allergy, $120, busy Mon and Wed.",[["Busy nights 20 minutes or less",1],["Grocery list and reused ingredients",1],["Used jarred pesto, which often contains nuts",0]],"Wed (busy): pesto pasta with chicken and spinach, 20 min","partial","A real allergy miss. Check every ingredient label yourself."),"make-a-decluttering-plan":T("Garage and closet; 20 minutes on weeknights, 2 hours Saturdays; sentimental items are hard.",[["One small task per session",1],["Clear \u201Cdone\u201D for each",1],["No invented local businesses",1]],"Sentimental items: keep what fits in one memory box and photograph the rest."),"write-my-will":T("Married, 2 kids, own a home, retirement account.",[["Did not write the will",1],["Checklist, terms and lawyer questions",1]],"What does my state require for signing and witnesses?","pass","Writing the will itself stays Nah."),"build-a-free-link-in-bio-page":T("An illustrator with 4 links, black and white style.",[["Single HTML file, no external scripts",1],["Opened in a real browser at phone width: 4 working links, 63px tall",1],["No sideways scrolling",1]],'<a href="https://example.com/portfolio">Portfolio</a>'),"build-a-free-budget-tracker":T("Google Sheets; Rent, Groceries, Gas, Fun, Savings.",[["Every formula with its cell",1],["Recalculated with sample rows in a spreadsheet: totals correct",1],["Over-budget category flagged",1]],"=SUMIF(Transactions!C:C, A2, Transactions!D:D)"),"build-a-free-habit-tracker":T("Three habits: read, walk, drink water.",[["Single file, no libraries",1],["Opened in a real browser: a checked habit stayed checked after reload",1],["Small text bug: \u201CStreak: 1 days\u201D",0]],"Backup: tap \u201CExport backup\u201D once a week and keep the file.","partial","Works; fix the wording or ask the AI to."),"build-a-free-invoice-template":T("Hourly design work, due in 14 days.",[["Every formula given, tax rate left blank",1],["Recalculated in a spreadsheet: due date and totals correct",1]],"Due date = invoice date + 14 (Sept 28 became Oct 12 in our check)."),"replace-my-password-manager":T("Reuses passwords; iPhone and a Windows laptop.",[["No password manager code written",1],["Email first for two-factor authentication",1]],"Start with your email account, since it can reset everything else.","pass","Building your own stays Nah."),"write-a-refund-request":T("Cracked camping lantern, Order #48213, $39.95, photos attached.",[["Under 150 words",1],["Reply-by date 7 days out",1],["No laws or chargeback threats",1]],"I'd like a full refund of $39.95 to my original payment method. Could you reply by October 5 with the next steps?"),"understand-my-credit-report":T("An invented report: two cards, an auto loan with one late mark, an unrecognized hard inquiry.",[["Explained each section",1],["Table in the requested format (utilization math correct)",1],["Didn't guess a credit score",1]],"An inquiry you don't recognize can signal an error or fraud."),"make-a-debt-payoff-plan":T("Card A $2,400 at 24%, Card B $900 at 18%, car loan $6,000 at 6%; $500 a month.",[["Both payoff orders correct",1],["Extra-payment math correct ($235)",1],["Still gave a rough timeline (\u201Cabout 4 months\u201D) the prompt said to verify",0]],"Minimums: $60 + $25 + $180 = $265. Extra each month: $500 \u2212 $265 = $235.","partial","Confirm any timeline in a payoff calculator."),"write-a-complaint-to-my-neighbor":T("Loud music after 11 pm on Fridays; I start work at 6 am Saturdays.",[["Under 120 words",1],["One specific request",1],["Assumed a detail we never gave (\u201Cjust below you\u201D)",0]],"Would you be open to turning it down after 11 on Fridays? I'd really appreciate it.","partial","Delete any detail you didn't give it."),"compare-moving-quotes":T("Three quotes: flat, hourly with a minimum, and a range.",[["Table in the requested columns",1],["Hourly minimum math correct ($660)",1],["Missing info marked [NOT STATED]",1],["No invented prices",1]],"B is hourly, so a longer move raises the total."),"write-my-linkedin-summary":T("Operations coordinator moving toward analyst roles.",[["No invented numbers or titles",1],["No buzzwords",1],["Slightly short, and hinted at a data skill we didn't list",0]],"I make operations run smoother, one fixed process at a time.","partial","Remove any phrase that claims a skill you don't have."),"negotiate-a-job-offer":T("$78,000 offer; asking $86,000 and 2 remote days; survey range $82,000 to $92,000; private walk-away $80,000.",[["Under 180 words",1],["Used only the pay data given",1],["Never revealed the walk-away number",1]],"Based on my six years of experience and published salary surveys for this title in our city, which list a range of $82,000 to $92,000, I'm asking for a base salary of $86,000."),"reply-to-a-bad-review":T("45-minute wait despite a reservation; offer: a free dessert.",[["Under 100 words",1],["Thanked, owned it, moved it private",1],["Promised a new policy we never gave",0]],"You had a reservation and waited 45 minutes, and we didn't keep you updated. That's on us.","partial","Delete any promise you haven't actually made."),"write-a-client-contract":T("Freelance wedding photographer; late payments and raw-file requests in the past.",[["Did not write contract language",1],["Covered every term to decide",1],["Sent legal questions to a lawyer",1]],"How should I word the retainer so it's enforceable?","pass","Writing the contract itself stays Nah."),"understand-my-lab-results":T("Tests listed: CBC, lipid panel, A1C (names only).",[["Did not interpret results",1],["General descriptions only",1],["Questions for the clinician",1]],"A1C: your average blood sugar over roughly the past two to three months.","pass","Interpreting your results stays Nah."),"write-a-eulogy":T("A grandmother who loved her garden, crosswords and Sunday pancakes; three real stories.",[["Used all three stories",1],["Added small invented details",0],["Ran short: about 180 of 400 words",0]],"And every Sunday for thirty years, she made pancakes for the whole family. Whoever showed up, there was a plate for them.","partial","Read every line and cut anything that didn't happen."),"cancel-a-subscription":T("A streaming service, cancel at the end of the billing period.",[["Under 100 words",1],["Said cancel, not pause or downgrade",1],["Asked for written confirmation",1]],"Please confirm in writing the cancellation date and that no further charges will be made to my account."),"build-a-free-wedding-website":T("Couple, date, venue, schedule, hotel block and an RSVP link.",[["Single file with all five sections",1],["Opened in a real browser at phone width: renders, RSVP link works",1],["Wrote FAQ answers we never gave",0]],"We've held a block of rooms at the Lakeside Inn. Please book by May 1 to get the group rate.","partial","Replace the FAQ answers with your own.")};for(let v of VERDICTS)v.test=TESTS[v.slug];var S={ads:[],packs:[],loaded:0,subs:0},SLOTS={headline:{name:"Headline sponsor",base:499,cap:1,where:"A slim banner near the top of the home page and every verdict page. One sponsor at a time.",target:""},category:{name:"Category takeover",base:299,cap:1,where:"Your card on the category page and on every verdict in that category.",target:"category"},sidebar:{name:"Verdict card",base:199,cap:4,where:"A labeled card on verdict pages that don't have a featured or category sponsor. Up to four sponsors rotate.",target:""},featured:{name:"Featured tool",base:97,cap:1,where:"A labeled card inside one verdict page of your choice.",target:"verdict"},directory:{name:"Paid-apps directory card",base:149,cap:2,where:"A labeled card on the paid-apps directory and on app pages, where people are actively comparing tools.",target:""},savings:{name:"Savings calculator sponsor",base:149,cap:1,where:"One labeled card on the savings calculator, seen by people deciding what to cancel.",target:""},shop:{name:"Shop pages sponsor",base:149,cap:1,where:"One labeled card on the prompt packs and ready-made tools pages, seen by people who are about to buy.",target:""},newsletter:{name:"Newsletter sponsor",base:99,cap:1,where:"One labeled sponsor block at the top of every weekly issue while your booking runs. The current list size is shown below; it is small today and we will not overstate it.",target:""}},TERMS=[{m:1,off:0,label:"1 month"},{m:3,off:10,label:"3 months"},{m:6,off:20,label:"6 months"},{m:12,off:30,label:"12 months"}],termPrice=(slot,m)=>{let t=TERMS.find(x=>x.m===m);return Math.round(SLOTS[slot].base*m*(100-t.off)/100)};function pickAd(pairs){for(let[slot,target]of pairs){let list=S.ads.filter(a=>a.slot===slot&&(!SLOTS[slot].target||a.target===target));if(list.length)return list[Math.floor(Math.random()*list.length)]}return null}var TOOLS=[{slug:"budget-planner",name:"Ultimate Budget Planner",price:19.99,cat:"money",fmt:"Excel + Google Sheets",tag:"Every month, every year, in one file (2026 to 2035).",blurb:"A full budget you fill in once: set categories, plan the month, log spending, and the dashboard does the math for any month or year.",inside:[["Dashboard","Pick a year and month; every figure and chart updates to that month."],["Transactions","Every payment in one list, 3,000 rows."],["Budget","What you plan to spend, per category, per month, per year."],["Bills","Recurring bills and subscriptions and what they cost per year."],["Debt Payoff","Snowball or avalanche order, months to payoff, interest cost."],["Savings Goals","Goals and sinking funds with progress bars."],["Paychecks","Budget by payday instead of by calendar month."],["Annual","Twelve months side by side, six charts."],["Net Worth","Monthly balances, assets vs liabilities."]],good:["People who want one file for years, not a new template every January","Budgeting by paycheck, week or month","Anyone paying for a budgeting app just for the spreadsheet part"],verdicts:["make-a-monthly-budget","build-a-free-budget-tracker","build-an-emergency-fund"],files:[["1-Start-Here.pdf",7636],["2-Ultimate-Budget-Planner-4-Colors-Excel-and-Google-Sheets.zip",539506]],gs:[["Ultimate Budget Planner (Forest color)","https://docs.google.com/spreadsheets/d/1ryfCPuT1J8uhpJV87b-qkJ85uJK-DRPNTQTnHs0ei-I/copy"]],gsKind:"Google Sheets"},{slug:"debt-payoff-planner",name:"Debt Payoff Planner",price:12.99,cat:"money",fmt:"Excel + Google Sheets",tag:"See your debt-free date, and what every extra dollar buys.",blurb:"List your debts once, pick snowball, avalanche or your own order, and get a month-by-month payoff schedule you can log against.",inside:[["Debts","Each debt with balance, rate, minimum and its payoff date."],["Plan","Your strategy, extra payment and lump sums, with the answer."],["Payoff Schedule","What to pay on each debt, every month, up to 30 years."],["Payment Log","What you really paid, against the plan."],["Dashboard","Where you stand, when you finish, interest saved."]],good:["Tracking a plan month after month, which a chat answer can't do","Comparing snowball and avalanche side by side","Seeing what a tax refund or extra $50 does"],verdicts:["make-a-debt-payoff-plan"],files:[["1-Start-Here.pdf",7795],["2-Debt-Payoff-Planner-4-Colors.zip",1425223],["3-Debt-Payoff-Planner-BLANK-Forest.xlsx",563383],["4-Debt-Payoff-Planner-SAMPLE-Forest.xlsx",564976]],gs:[["Blank copy to fill in (Forest color)","https://docs.google.com/spreadsheets/d/1FDViPPjf-J089t3XKli6HksBzpxqkkcxjDiR3Nlq70Q/copy"],["Sample copy with example data (Forest color)","https://docs.google.com/spreadsheets/d/17oh56JUSUVSPQ7t6dYk3PTcIHKy2llH3tRmjNYspKEs/copy"]],gsKind:"Google Sheets"},{slug:"subscription-bill-tracker",name:"Subscription and Bill Tracker",price:12.99,cat:"money",fmt:"Excel + Google Sheets",tag:"Every bill and subscription, on one calendar.",blurb:"The true monthly and yearly cost of every bill and subscription, what's due soon, and a payment log that catches quiet price rises.",inside:[["Bills & Subscriptions","The master list; one date per item runs the calendar."],["Calendar","Every charge on its day, with daily totals."],["Payment Log","What really left your account."],["Dashboard","True monthly and yearly cost, due soon, 12-month outlook."]],good:["Finding what to cancel before you write the cancellation email","Spotting price increases","Knowing what's due this week"],verdicts:["cancel-a-subscription"],files:[["1-Start-Here.pdf",7715],["2-Subscription-and-Bill-Tracker-4-Colors.zip",1294267],["3-Subscription-and-Bill-Tracker-BLANK-Forest.xlsx",389423],["4-Subscription-and-Bill-Tracker-SAMPLE-Forest.xlsx",392102]],gs:[["Blank copy to fill in (Forest color)","https://docs.google.com/spreadsheets/d/1uSe9OJWD7ho420c6HiMP3srcCgejeQc_0ujUOcZq0Bs/copy"],["Sample copy with example data (Forest color)","https://docs.google.com/spreadsheets/d/14ZYw8EXRDLGlSBjC4YuHafP84LfMERXALGvwopYbv84/copy"]],gsKind:"Google Sheets"},{slug:"job-application-tracker",name:"Job Application Tracker",price:12.99,cat:"career",fmt:"Excel + Google Sheets + PDF planner",tag:"Every application, follow-up and interview in one place.",blurb:"Track each application's stage, when to follow up, every interview round and the people you met, with a weekly goal on the dashboard.",inside:[["Applications","Stage, follow-up date and salary range for each one."],["Interviews","Every round: when, with whom, prep and the thank-you note."],["Contacts","Recruiters, referrals and people you met."],["Dashboard","This week vs your goal, response rate, follow-ups due."],["PDF planner","A fillable and a printable job-search planner."]],good:["Knowing exactly when to send the follow-up AI writes for you","Keeping a busy search organized","Seeing your response rate by source"],verdicts:["follow-up-on-a-job-application","apply-to-jobs-for-me"],files:[["1-Start-Here.pdf",7582],["2-Job-Application-Tracker-4-Colors.zip",497917],["3-Job-Search-Planner-FILLABLE.pdf",296377],["4-Job-Search-Planner-PRINTABLE.pdf",49154]],gs:[["Blank copy to fill in (Forest color)","https://docs.google.com/spreadsheets/d/1L8OVHSDqc3nIUuGFkTJSMi4tqb_lNqZmdZYjfptjc5c/copy"],["Sample copy with example data (Forest color)","https://docs.google.com/spreadsheets/d/1FVsFe3eDcILQEe8TF39dCAQj33mSKXEO39U7yPkC0J0/copy"]],gsKind:"Google Sheets"},{slug:"interview-prep-workbook",name:"Job Interview Prep Workbook",price:12.99,cat:"career",fmt:"Word + Google Docs + PDF",tag:"Ten documents that take you from research to the thank-you email.",blurb:"Company research, role match, a STAR story bank, 60 common questions, salary research and follow-up templates, editable or printable.",inside:[["Company Research","2 pages"],["Role Match","2 pages"],["STAR Story Bank","6 pages"],["60 Common Interview Questions","7 pages"],["Questions to Ask Them","2 pages"],["Salary Research and Negotiation","2 pages"],["Day-Before Checklist","1 page"],["Post-Interview Notes","2 pages"],["Thank-You and Follow-Up Email Templates","3 pages"]],good:["Writing your STAR stories once and reusing them","Pairing with AI mock interviews","Printing and writing by hand"],verdicts:["practice-for-a-job-interview","write-an-interview-thank-you"],files:[["1-Start-Here.pdf",7962],["2-Interview-Prep-Workbook-Word-Files.zip",372708],["3-Interview-Prep-Workbook-Print-and-Fillable-PDFs.zip",5255840],["4-Interview-Prep-Workbook-Forest-Letter-FILLABLE.pdf",550613]],gs:[["1. Company Research","https://docs.google.com/document/d/1RY9Th5mPUkrqHiCHRaEtJOZzpUjK4kqZBLYqqUAtgFI/copy"],["2. Role Match","https://docs.google.com/document/d/1krvwWTf6VZqW9AyuyhYhaQ2UwR0VCpLaMGE-rFIdG5s/copy"],["3. STAR Story Bank","https://docs.google.com/document/d/1x7Alf1ayCTGyv7g4IRmHZ_n-G8T3qRwilskIRvByA_c/copy"],["4. 60 Interview Questions","https://docs.google.com/document/d/1NXnWX36Ynw_LsvK6mSzTVsMTxTBnrRaftgLSXN7FYcs/copy"],["5. Questions to Ask","https://docs.google.com/document/d/1FaCLnxw7gOUi7uZEAAnywzXyeRwr9NWB-8DvGVRxDt0/copy"],["6. Salary and Negotiation","https://docs.google.com/document/d/1d08mG4ckfthjoulGSKuQGVCMCd8hTAqe___O4lLEaW4/copy"],["7. Day Before Checklist","https://docs.google.com/document/d/1hUEQrZGzu0nRZAhfj_mn1wrfRUzIrZo6Yvx1EGxrHvk/copy"],["8. Post Interview Notes","https://docs.google.com/document/d/1bqbF2l9TyAL-ay4hc4jJC0zQ5D6tKS_qeu5hjmcD2eg/copy"],["9. Thank You Emails","https://docs.google.com/document/d/1LTPfdTwmcyHUk7eRTKr2nbcLp5W8TevVygudSxpzzss/copy"],["10. Follow Up Emails","https://docs.google.com/document/d/11S8LVnXk4-PR5qvj9d6n83hPh_QkBeTn7anq60gLN_A/copy"]],gsKind:"Google Docs"},{slug:"home-inventory-for-insurance",name:"Home Inventory for Insurance",price:9.49,cat:"home",fmt:"Excel + Google Sheets",tag:"Know what you own before you ever need to file a claim.",blurb:"Record every item room by room with values, photos and receipts, see it against your coverage limits, and turn lost items into a claim list.",inside:[["Inventory","Room, brand, model, serial, cost, replacement value, photo and receipt links."],["Dashboard","Total value vs your coverage, special-limit warnings, missing photos."],["Claim","Mark lost or damaged items and get a claim list with totals."],["Walkthrough","Room-by-room list of what people forget to record."]],good:["Having the list ready before a fire, flood or break-in","Checking if your coverage is high enough","Feeding real numbers into an AI-written claim letter"],verdicts:["file-a-home-insurance-claim","appeal-an-insurance-claim-denial","compare-home-insurance"],files:[["1-Start-Here.pdf",7343],["2-Home-Inventory-Insurance-4-Colors.zip",587141],["3-Home-Inventory-Insurance-BLANK-Forest.xlsx",150377],["4-Home-Inventory-Insurance-SAMPLE-Forest.xlsx",152243]],gs:[["Blank copy to fill in (Forest color)","https://docs.google.com/spreadsheets/d/1yBHOFOn3V_UksQN4U9LWhI4c2zimU4EohMxVlVflt1Y/copy"],["Sample copy with example data (Forest color)","https://docs.google.com/spreadsheets/d/1KBS07yuoB9XjT_lwQuDyFSZ0mNsweDoZV4izD6wst8c/copy"]],gsKind:"Google Sheets"},{slug:"hsa-medical-expense-tracker",name:"HSA and Medical Expense Tracker",price:9.99,cat:"health-admin",fmt:"Excel + Google Sheets",tag:"Every medical bill, and what your HSA still owes you.",blurb:"Log medical bills and purchases once, track HSA deposits by tax year, and see what you can still reimburse yourself for.",inside:[["Expenses","One row per bill or purchase."],["Contributions","Every HSA deposit, by tax year."],["Dashboard","Spent, how it was paid, what the HSA still owes you, limit progress."],["Yearly Summary","Ten years side by side, with the 7.5% deduction check."]],good:["Keeping receipts organized for later reimbursement","Checking a bill against what you already paid","Not losing track across years"],verdicts:["understand-my-medical-bill","negotiate-a-medical-bill"],files:[["1-Start-Here.pdf",7766],["2-HSA-and-Medical-Expense-Tracker-4-Colors.zip",744873],["3-HSA-and-Medical-Expense-Tracker-BLANK-Forest.xlsx",290569],["4-HSA-and-Medical-Expense-Tracker-SAMPLE-Forest.xlsx",294678]],gs:[["Blank copy to fill in (Forest color)","https://docs.google.com/spreadsheets/d/1evgXtQWt2r-lkvQEvZK3MKFEGxfg_9pa1Aorf_b7Bhk/copy"],["Sample copy with example data (Forest color)","https://docs.google.com/spreadsheets/d/1QakaCZQ6o1dpG9-EGfm2rjwsiNAt-wZN3fUoNoQt7xI/copy"]],gsKind:"Google Sheets"},{slug:"freelance-client-invoice-tracker",name:"Freelancer Client and Invoice Tracker",price:16.99,cat:"business",fmt:"Excel + Google Sheets + PDF planner",tag:"Who owes you, how late, and which reminder to send next.",blurb:"Clients, projects, quotes and invoices in one workbook, with days late and the next reminder to send worked out for you.",inside:[["Clients","What each client has paid and still owes."],["Projects","Every project with its quote and status."],["Invoices","Due date, days late and the reminder to send next."],["Dashboard","Earned, outstanding, overdue, days to pay, best clients."],["PDF planner","Fillable and printable client planner."]],good:["Knowing when to send the overdue reminder AI writes","Freelancers who don't want another monthly app","Seeing who pays late"],verdicts:["build-a-free-invoice-template","write-an-overdue-invoice-reminder"],files:[["1-Start-Here.pdf",7616],["2-Freelancer-Client-and-Invoice-Tracker-4-Colors.zip",1008732],["3-Freelancer-Client-and-Invoice-Planner-FILLABLE.pdf",374572],["4-Freelancer-Client-and-Invoice-Planner-PRINTABLE.pdf",49021]],gs:[["Blank copy to fill in (Forest color)","https://docs.google.com/spreadsheets/d/1Cndb1vcv3CqSNh-igZmroytlyUjVzXZnd2qPCUVhbn8/copy"],["Sample copy with example data (Forest color)","https://docs.google.com/spreadsheets/d/1OuF0IJnqxvmWQ3_3zQs23srTRiVf2Lb3lgrLZ4N9XG8/copy"]],gsKind:"Google Sheets"},{slug:"moving-planner",name:"Moving Planner and Box Inventory",price:12.99,cat:"home",fmt:"Excel + Google Sheets + PDF planner",tag:"Every task dated back from moving day, and every box labeled.",blurb:"A timeline built from your moving date, a box inventory that says what's in each box and where it goes, address changes and the budget.",inside:[["Timeline","Every moving task, dated from your moving day."],["Boxes","Every box, what's in it and where it goes."],["Address Changes","Everyone who needs your new address."],["Budget","Quotes and costs for the move."],["Dashboard","Days to go, tasks, boxes and budget."]],good:["Tracking the move after AI helps you compare quotes","Families packing dozens of boxes","Not forgetting an address change"],verdicts:["compare-moving-quotes","plan-a-move"],files:[["1-Start-Here.pdf",7507],["2-Moving-Planner-and-Box-Inventory-4-Colors.zip",312130],["3-Moving-Planner-FILLABLE.pdf",255820],["4-Moving-Planner-PRINTABLE.pdf",45914]],gs:[["Blank copy to fill in (Forest color)","https://docs.google.com/spreadsheets/d/166CvwAQVNwviRkcZ0ID--GgoPKurs9vZhF_mHUplZF8/copy"],["Sample copy with example data (Forest color)","https://docs.google.com/spreadsheets/d/1BXs-JVGWD0GWuI2UUd1arOllaE9lTQaLe8IUqEYHqSU/copy"]],gsKind:"Google Sheets"},{slug:"travel-planner",name:"Travel Planner",price:22.99,cat:"travel",fmt:"Excel + Google Sheets",tag:"Bookings in, itinerary out, costs split at the end.",blurb:"Add bookings and ideas and the day-by-day itinerary builds itself, with budget vs spent in any currency, packing, and who-owes-whom.",inside:[["Bookings","Times, confirmation numbers and cost in any currency."],["Itinerary","Built and sorted automatically from bookings and dated ideas."],["Budget","Planned vs booked vs spent by category."],["Split Costs","Each traveler's share, with settle-up lines."],["Packing & Checklist","Packing by traveler and pre-trip tasks dated from departure."],["Points","Cash price vs points, in cents per point."]],good:["Keeping the AI's itinerary and your real bookings in one place","Group trips that split costs","Trips in more than one currency"],verdicts:["plan-a-trip-itinerary","plan-a-travel-budget","plan-a-road-trip","book-my-whole-trip"],files:[["1-Start-Here.pdf",7863],["2-Travel-Planner-4-Colors.zip",678522],["3-Travel-Planner-BLANK-Forest.xlsx",135728],["4-Travel-Planner-SAMPLE-Forest.xlsx",137705]],gs:[["Blank copy to fill in (Forest color)","https://docs.google.com/spreadsheets/d/1meSzI-nIh-yWixsMLltvCmZYlV6dUEr8fDsKa8WCKy4/copy"],["Sample copy with example data (Forest color)","https://docs.google.com/spreadsheets/d/1m2pxxRF_xwgBRSxmVX46S5E0H96uaQ2lnBv-TKch62U/copy"]],gsKind:"Google Sheets"},{slug:"home-project-quote-comparison",name:"Home Project Quote Comparison",price:12.99,cat:"home",fmt:"Excel + Google Sheets + PDF planner",tag:"Score contractor quotes side by side, not just on price.",blurb:"Enter each quote, weight what matters to you, and see every project's best quote, the price spread and anything that looks off.",inside:[["Projects","Every project with its budget and quotes."],["Quotes","Every quote, scored and ranked within its project."],["Setup","How much each factor counts to you."],["Dashboard","Best quote per project, price spread and flags."],["PDF planner","Fillable and printable home project planner."]],good:["Comparing three or more contractors fairly","Keeping a renovation on budget","Having the numbers in front of you when you negotiate"],verdicts:["plan-a-renovation-budget"],files:[["1-Start-Here.pdf",7474],["2-Home-Project-Quote-Comparison-4-Colors.zip",496253],["3-Home-Project-Planner-FILLABLE.pdf",235005],["4-Home-Project-Planner-PRINTABLE.pdf",45270]],gs:[["Blank copy to fill in (Forest color)","https://docs.google.com/spreadsheets/d/1z-Q3LcDt_U_S6RoMOSwkMviEZDLve7sn9pNEG8hSCQA/copy"],["Sample copy with example data (Forest color)","https://docs.google.com/spreadsheets/d/1W0m5gsyB2v0x9vg7XyZv4gj310OGvvOq5mrkjdxfvAQ/copy"]],gsKind:"Google Sheets"},{slug:"family-emergency-binder",name:"Family Emergency Binder",price:16.99,cat:"everyday",fmt:"Printable + fillable PDF + workbook",tag:"The binder your family needs if something happens to you.",blurb:"A 23-page binder (print or type) for contacts, accounts, insurance, bills and documents, plus a workbook that tracks bills and renewals.",inside:[["Binder","23 pages: Open This First, 20 organized sections, wallet emergency cards."],["Two versions","PRINT to fill by hand, FILLABLE to type in, in US Letter and A4."],["Four colors","Forest, Ocean, Plum and Midnight."],["Workbook","Bills and autopay, accounts, debts, insurance renewals, contacts, documents checklist."]],good:["Getting organized before you see a lawyer about a will","Caring for an aging parent","Anyone whose family doesn't know where things are"],verdicts:["write-my-will","plan-care-for-an-aging-parent"],files:[["1-Start-Here.pdf",5753],["2-Emergency-Binder-PRINT-4-Colors-Letter-A4.zip",450529],["3-Emergency-Binder-FILLABLE-4-Colors-Letter-A4.zip",1038800],["4-Emergency-Binder-Workbook-Excel-and-Google-Sheets.zip",329053]],gs:[["Blank copy to fill in (Forest color)","https://docs.google.com/spreadsheets/d/1BjoCiJ2caeynYfbin5c8xZGSolSt6mUxBeK8HfDk7lM/copy"],["Sample copy with example data (Forest color)","https://docs.google.com/spreadsheets/d/1tiyy8oU7Fp5DqmIDDI60oPAqLXdqkYgv2AxePKHdbJg/copy"]],gsKind:"Google Sheets"}],TOOL=Object.fromEntries(TOOLS.map(t=>[t.slug,t])),TOOL_FOR={};for(let t of TOOLS)for(let v of t.verdicts)TOOL_FOR[v]||(TOOL_FOR[v]=t);var money=n=>"$"+Number(n).toFixed(2),kb=n=>n>=1e6?(n/1e6).toFixed(1)+" MB":Math.max(1,Math.round(n/1e3))+" KB",head=(eyebrow,h1,lede)=>`<div class="page-head"><span class="eyebrow">${eyebrow}</span><h1>${h1}</h1><p class="lede">${lede}</p></div>`,img=(t,n)=>`/tool-img/${t.slug}-${n}.webp`,TOOLS_CSS=`.tl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:22px;margin:26px 0}
.tl-card{display:flex;flex-direction:column;background:var(--card);border:1.5px solid var(--ink);border-radius:var(--r);overflow:hidden;color:inherit;text-decoration:none;transition:transform .18s cubic-bezier(.23,1,.32,1),box-shadow .18s cubic-bezier(.23,1,.32,1)}
.tl-card:hover{transform:translateY(-3px);box-shadow:6px 6px 0 var(--ink)}
.tl-card:active{transform:scale(.99)}
.tl-card img{display:block;width:100%;height:auto;aspect-ratio:1/1;object-fit:contain;background:#eaecef;border-bottom:1.5px solid var(--ink)}
.tl-card .tl-b{padding:16px 18px 18px;display:flex;flex-direction:column;gap:8px;flex:1}
.tl-card h3{margin:0;font-size:19px;letter-spacing:-.01em}
.tl-card p{margin:0;color:var(--ink2,#2b2925);font-size:14.5px;line-height:1.5}
.tl-top{display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--slate)}
.tl-price{font-size:15px;letter-spacing:0;color:var(--ink);text-transform:none}
.tl-foot{margin-top:auto;display:flex;justify-content:space-between;font-size:13px;color:var(--slate);padding-top:6px}
.tl-foot .go{color:var(--ink);font-weight:700}
.tl-hero{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:34px;align-items:start;margin:14px 0 10px}
.tl-gal{display:grid;gap:14px}
.tl-gal img{width:100%;height:auto;border:1.5px solid var(--ink);border-radius:var(--r);background:#eaecef;display:block}
.tl-list{list-style:none;padding:0;margin:10px 0;display:grid;gap:10px}
.tl-list li{background:var(--card);border:1.5px solid var(--hair);border-radius:12px;padding:12px 14px}
.tl-list li b{display:block;margin-bottom:2px}
.tl-plug{display:grid;grid-template-columns:96px 1fr auto;gap:16px;align-items:center;background:var(--card);border:1.5px solid var(--ink);border-radius:var(--r);padding:14px 16px;margin:26px 0}
.tl-plug img{width:96px;height:96px;object-fit:cover;border-radius:10px;border:1.5px solid var(--hair)}
.tl-plug .tag{display:inline-block;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--slate);margin-bottom:4px}
.tl-plug b{display:block;font-size:17px}
.tl-plug p{margin:4px 0 0;font-size:14px;color:var(--slate)}
.dl-files{list-style:none;padding:0;margin:14px 0;display:grid;gap:10px}
.dl-files li{display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;background:var(--card);border:1.5px solid var(--hair);border-radius:12px;padding:12px 16px}
.dl-files li span{color:var(--slate);font-size:13px}
@media (max-width:860px){.tl-hero{grid-template-columns:1fr}.tl-plug{grid-template-columns:64px 1fr}.tl-plug img{width:64px;height:64px}.tl-plug .btn{grid-column:1/-1}}`,toolCard=t=>`<a class="tl-card" href="/tools/${t.slug}"><img src="${img(t,1)}" alt="${esc(t.name)} preview" width="600" height="600" loading="lazy"><div class="tl-b"><div class="tl-top"><span>${esc(t.fmt)}</span><span class="tl-price">${money(t.price)}</span></div><h3>${esc(t.name)}</h3><p>${esc(t.tag)}</p><div class="tl-foot"><span>${t.files.length} files \xB7 instant download</span><span class="go">See inside \u2192</span></div></div></a>`;function toolPlug(vslug){let t=TOOL_FOR[vslug];return t?`<link rel="stylesheet" href="/t.css?v=@@V@@"><div class="tl-plug"><img src="${img(t,1)}" alt="" width="96" height="96" loading="lazy"><div><span class="tag">Ready-made version</span><b>${esc(t.name)}</b><p>${esc(t.tag)} ${esc(t.fmt)}, ${money(t.price)}.</p></div><a class="btn small" href="/tools/${t.slug}">See inside \u2192</a></div>`:""}function toolsPage(){let body=`<link rel="stylesheet" href="/t.css?v=@@V@@"><div class="wrap">${head("Ready-made tools",'Skip the setup. <span class="serif">Open it and go.</span>',"AI can write the email or build a quick table. These are for the jobs you keep coming back to: finished spreadsheets and workbooks that track things month after month, with the formulas, charts and dashboards already built.")}
<div class="spon-top" style="margin:0 0 28px">${sponsorSlot("Sponsor the shop pages.","One labeled card on the tools and prompt pack pages.",[["shop",""]])}</div>
<div class="tl-grid">${TOOLS.map(toolCard).join("")}</div>${PARTNER_ETSY}
<section class="cards3"><div class="box"><h3>Works where you work</h3><p>Excel 2016 or newer, Google Sheets (free) or Numbers. Printable and fillable PDFs where noted.</p></div><div class="box"><h3>Instant download</h3><p>Pay with Stripe and your download page opens right away. The link is emailed to you to keep.</p></div><div class="box"><h3>Honest scope</h3><p>These help you organize and see your numbers. They aren't financial, legal or medical advice.</p></div></section>
<div class="note">Files can be copied the moment you get them, so <b>all sales are final</b>. If a download doesn't work, email <a href="mailto:${EMAIL}">${EMAIL}</a> and we'll fix it or refund you. See the <a href="/refunds">refund policy</a>.</div></div>`;return layout({title:"Ready-made spreadsheets and workbooks",desc:`${TOOLS.length} ready-made spreadsheets and workbooks for budgets, debt, bills, job searches, moves and travel. Excel and Google Sheets, instant download.`,path:"/tools",body})}function toolPage(slug){let t=TOOL[slug];if(!t)return null;let vs=t.verdicts.map(s=>BY_SLUG[s]).filter(Boolean),body=`<link rel="stylesheet" href="/t.css?v=@@V@@"><div class="wrap"><div class="crumbs"><a href="/">Home</a><span>/</span><a href="/tools">Ready-made tools</a><span>/</span><span>${esc(t.name)}</span></div>
<div class="tl-hero"><div class="tl-gal"><img src="${img(t,1)}" alt="${esc(t.name)}" width="1000" height="1000"><img src="${img(t,2)}" alt="${esc(t.name)} inside view" width="1000" height="${t.slug==="budget-planner"?750:1e3}" loading="lazy"></div>
<div><span class="eyebrow">${esc(CAT[t.cat]?.name||"")} \xB7 ${esc(t.fmt)}</span><h1>${esc(t.name)}</h1><p class="lede">${esc(t.blurb)}</p>
<div class="buybox"><div class="amt">${money(t.price)}</div><p class="small muted">One-time payment. Instant download.</p><a class="btn" href="/buy/tool/${t.slug}">Buy now \u2192</a><p class="small muted">Secure checkout by Stripe. Card, Apple Pay and Google Pay.</p><ul class="ticks"><li>Download page plus a copy emailed to you</li><li>${t.files.length} files, ${kb(t.files.reduce((s,f)=>s+f[1],0))} total</li><li>Start Here guide included</li>${t.gs&&t.gs.length?`<li>One-click Make a copy links for ${esc(t.gsKind)}</li>`:""}</ul></div>
<h2>Good for</h2><ul class="ticks">${t.good.map(g=>`<li>${esc(g)}</li>`).join("")}</ul></div></div>
<section><h2>What's inside</h2><ul class="tl-list">${t.inside.map(([a,b])=>`<li><b>${esc(a)}</b>${esc(b)}</li>`).join("")}</ul></section>
<section><h2>The files</h2><ul class="dl-files">${t.files.map(([n,s])=>`<li><b>${esc(n)}</b><span>${kb(s)}</span></li>`).join("")}</ul></section>
${vs.length?`<section><h2>Pairs with these <span class="serif">verdicts</span></h2><ul class="ticks">${vs.map(v=>`<li><a href="/v/${v.slug}">${esc(v.q)}</a></li>`).join("")}</ul></section>`:""}
<div class="note">All sales are final because files can be copied once delivered. If your download doesn't work, we fix it or refund you. <a href="/refunds">Refund policy</a>.</div>
<section><h2>More ready-made tools</h2><div class="tl-grid">${TOOLS.filter(x=>x.slug!==slug).slice(0,3).map(toolCard).join("")}</div></section></div>`,ld=`<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"Product",name:t.name,description:t.blurb,image:SITE+img(t,1),brand:PBRAND,offers:{"@type":"Offer",price:t.price,priceCurrency:"USD",availability:"https://schema.org/InStock",url:`${SITE}/tools/${t.slug}`,...OFFX}}).replace(/</g,"\\u003c")}<\/script>`;return layout({title:t.name,desc:`${t.blurb} ${t.fmt}. ${money(t.price)}, instant download.`,path:"/tools/"+slug,body,jsonld:ld})}var PBRAND={"@type":"Brand",name:"Bot or Nah"},OFFX={shippingDetails:{"@type":"OfferShippingDetails",shippingRate:{"@type":"MonetaryAmount",value:0,currency:"USD"},shippingDestination:{"@type":"DefinedRegion",addressCountry:"US"},deliveryTime:{"@type":"ShippingDeliveryTime",handlingTime:{"@type":"QuantitativeValue",minValue:0,maxValue:0,unitCode:"DAY"},transitTime:{"@type":"QuantitativeValue",minValue:0,maxValue:0,unitCode:"DAY"}}},hasMerchantReturnPolicy:{"@type":"MerchantReturnPolicy",applicableCountry:"US",returnPolicyCategory:"https://schema.org/MerchantReturnNotPermitted",merchantReturnLink:"https://botornah.com/refunds"}};function toolDownload(o,token){let t=TOOL[o.ref];return t?`<div class="wrap doc"><div class="doc-head"><div><span class="eyebrow">Bot or Nah ready-made tools</span><h1>${esc(t.name)}</h1><p class="muted">Licensed to ${esc(o.email)} \xB7 order ${esc(o.id.slice(-8))}</p></div></div>
<div class="howto"><b>Start with 1-Start-Here.pdf.</b> It says what each file is and how to open it in Excel, Google Sheets or a PDF app. Zip files open with a double-click on a Mac, or right-click and Extract All on Windows.</div>
<ul class="dl-files">${t.files.map(([n,s])=>`<li><b>${esc(n)}</b><span>${kb(s)}</span><a class="btn small" href="/dl/${token}/f/${encodeURIComponent(n)}" download>Download</a></li>`).join("")}</ul>
${t.gs&&t.gs.length?`<h2>Prefer ${esc(t.gsKind)}?</h2><p class="muted">Click a link while signed in to Google and choose <b>Make a copy</b>. Google saves your own editable copy to your Drive, and it works on a phone.</p><ul class="dl-files">${t.gs.map(([l,u])=>`<li><b>${esc(l)}</b><a class="btn small ghost" href="${esc(u)}" target="_blank" rel="noopener">Make a copy in ${esc(t.gsKind)} \u2197</a></li>`).join("")}</ul>`:""}
<p class="small muted">Licensed for personal use or use in one business. Please don't resell or share the files. Questions: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p></div>`:null}var hex=b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("");async function adminUpload(req,env,url){if(req.method==="POST"){let f=await req.formData(),done2=[];for(let[,v]of f.entries()){if(typeof v!="object"||!v.size||v.size>2e7)continue;let buf=await v.arrayBuffer(),h=hex(await crypto.subtle.digest("SHA-256",buf)),job=await env.DB.get("upl:"+h,{type:"json"});if(!job||!/^(tf:|timg:)[A-Za-z0-9._/-]+$/.test(job.key||"")){done2.push({name:v.name,ok:!1});continue}await env.DB.put(job.key,buf,{metadata:{type:job.type||"application/octet-stream",size:buf.byteLength}}),await env.DB.delete("upl:"+h),done2.push({name:v.name,ok:!0,key:job.key})}return new Response(JSON.stringify({done:done2}),{headers:{"content-type":"application/json","cache-control":"no-store"}})}return new Response('<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>upload</title><form id="up" method="post" enctype="multipart/form-data"><input type="file" name="f" multiple id="files"><button>Upload</button></form>',{headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store","x-robots-tag":"noindex"}})}async function toolFile(env,o,name){let t=TOOL[o.ref];if(!t||!t.files.some(f=>f[0]===name))return null;let r=await env.DB.get(`tf:${t.slug}/${name}`,{type:"arrayBuffer"});if(!r)return null;let type=name.endsWith(".pdf")?"application/pdf":name.endsWith(".zip")?"application/zip":name.endsWith(".xlsx")?"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":"application/octet-stream";return new Response(r,{headers:{"content-type":type,"content-disposition":`attachment; filename="${name}"`,"cache-control":"private, no-store","x-robots-tag":"noindex"}})}var EMAIL="hello@botornah.com",SITE="https://botornah.com",UPDATED="September 28, 2026",CAT=Object.fromEntries(CATS.map(c=>[c.slug,c])),BY_SLUG=Object.fromEntries(VERDICTS.map(v=>[v.slug,v])),LABEL={bot:"Bot",half:"Half-bot",nah:"Nah"},MEANS={bot:"AI does it well",half:"AI helps, you finish",nah:"Do it yourself"},fmtDate=d=>new Date(d+"T12:00:00Z").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric",timeZone:"UTC"}),REVIEWED_H=fmtDate(REVIEWED),esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),MARK=(cls="mark",head4="#141414")=>`<svg class="${cls}" viewBox="40 22 432 438" aria-hidden="true"><line x1="256" y1="150" x2="256" y2="92" stroke="${head4}" stroke-width="30" stroke-linecap="round"/><circle cx="256" cy="66" r="38" fill="#ffc83d"/><rect x="56" y="136" width="400" height="320" rx="104" fill="${head4}"/><polyline points="132,290 178,334 250,252" fill="none" stroke="#22c55e" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/><path d="M306 252 L386 332 M386 252 L306 332" stroke="#ff4f7b" stroke-width="40" stroke-linecap="round"/></svg>`,SEARCH_ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',stamp=(v,cls="")=>`<span class="stamp ${v} ${cls}">${LABEL[v]}</span>`,count=cat=>VERDICTS.filter(v=>v.cat===cat).length,NAV=[["/verdicts","Everyday tasks"],["/savings","Savings calculator"],["/apps","Paid apps"],["/reverse","Reverse a site"],["/packs","Prompt packs"],["/sponsor","Sponsor"]],THEME_JS=`(function(){var d=document.documentElement,k="bon-theme",t=null;try{t=localStorage.getItem(k)}catch(e){}
var m=window.matchMedia?matchMedia("(prefers-color-scheme: dark)"):null;
function cur(){return t==="dark"||t==="light"?t:(m&&m.matches?"dark":"light")}
function apply(){var c=cur();d.setAttribute("data-theme",c);d.style.colorScheme=c;var mt=document.querySelector('meta[name="theme-color"]');if(mt)mt.setAttribute("content",c==="dark"?"#151412":"#f6f2e9");var b=document.querySelectorAll(".theme-t");for(var i=0;i<b.length;i++){b[i].setAttribute("aria-pressed",c==="dark"?"true":"false");b[i].setAttribute("aria-label",c==="dark"?"Switch to light mode":"Switch to dark mode");b[i].title=c==="dark"?"Light mode":"Dark mode"}}
apply();
if(m){var f=function(){if(t!=="dark"&&t!=="light")apply()};m.addEventListener?m.addEventListener("change",f):m.addListener&&m.addListener(f)}
document.addEventListener("click",function(e){var b=e.target&&e.target.closest?e.target.closest(".theme-t"):null;if(!b)return;t=cur()==="dark"?"light":"dark";try{localStorage.setItem(k,t)}catch(x){}apply()});
document.addEventListener("DOMContentLoaded",apply)})();`;function capDesc(d){d=String(d==null?"":d);if(d.length<=155)return d;var c=d.slice(0,155),p=c.lastIndexOf(". ");if(p>=90)return c.slice(0,p+1);c=d.slice(0,154);var i=c.lastIndexOf(" ");if(i>100)c=c.slice(0,i);return c.replace(/[\s,;:(\-]+$/,"")+"…"}function capFull(t,p){if(t==="Bot or Nah")return"Bot or Nah: Can AI do it for you?";var S=" | Bot or Nah",f=t+S;if(!(p&&p.indexOf("/compare/")===0&&f.length>60))return f;var b=t.split(": price")[0],c=[b+": price and free plans",b+": prices and plans",b];for(var j=0;j<c.length;j++)if((c[j]+S).length<=60)return c[j]+S;return b.slice(0,47).replace(/\s+\S*$/,"")+S}function layout({title,desc,path,body,jsonld="",ogType="website",canonical,noindex=!1,og="/og.png"}){desc=capDesc(desc);{let n=0;body=String(body).replace(/<span class="num">\d\d<\/span>/g,()=>`<span class="num">${String(++n).padStart(2,"0")}</span>`)}let links=NAV.map(([h,t])=>`<a href="${h}"${h===path?' aria-current="page"':""}>${t}</a>`).join(""),full=capFull(title,path),url=SITE+(canonical||(path==="/"?"/":path));return`<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${ogType}"><meta property="og:site_name" content="Bot or Nah">
<meta property="og:title" content="${esc(full)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${SITE}${og}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Bot or Nah: can AI do it for you?">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${SITE}${og}">${noindex?'<meta name="robots" content="noindex, follow">':""}
<meta name="theme-color" content="#f6f2e9">
<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400..900&family=Instrument+Serif:ital@1&family=JetBrains+Mono:wght@400;500&display=swap">
<script src="/theme.js?v=@@V@@"><\/script>
<link rel="stylesheet" href="/styles.css?v=@@V@@">
<script src="/app.js?v=@@V@@" defer><\/script>${jsonld}
</head><body>
<a class="skip" href="#main">Skip to content</a>
<header class="top"><div class="wrap nav">
<a class="logo" href="/" aria-label="Bot or Nah home">${MARK()}<b>Bot</b> <i>or</i> <b>Nah</b></a>
<button class="theme-t" type="button" aria-label="Switch to dark mode" aria-pressed="false" title="Dark mode"><svg class="i-moon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg><svg class="i-sun" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
<button class="burger" aria-expanded="false" aria-controls="menu">Menu</button>
<nav id="menu" class="menu" aria-label="Main">${links}<a class="cta" href="/submit">Suggest a task</a></nav>
</div></header>
<main id="main">${body}</main>
<footer><div class="wrap">
<div class="fgrid">
<div><div class="flogo">${MARK("","#fffdf8")}<b>Bot</b> <i>or</i> <b>Nah</b></div>
<p>Plain answers on whether AI can handle everyday tasks, with the exact prompt to copy and a warning about what can go wrong.</p>
<p>Questions? <a href="mailto:${EMAIL}">${EMAIL}</a><br>We reply in writing within 1 business day.</p></div>
<div><h4>Verdicts</h4><ul><li><a href="/verdicts">All verdicts</a></li>${CATS.slice(0,8).map(c=>`<li><a href="/c/${c.slug}">${esc(c.name)}</a></li>`).join("")}</ul></div>
<div><h4>More</h4><ul>${CATS.slice(8).map(c=>`<li><a href="/c/${c.slug}">${esc(c.name)}</a></li>`).join("")}</ul></div>
<div><h4>Company</h4><ul><li><a href="/apps">Paid apps directory</a></li><li><a href="/savings">Savings calculator</a></li><li><a href="/how-it-works">How it works</a></li><li><a href="/reverse">Reverse a site</a></li><li><a href="/newsletter">Newsletter</a></li><li><a href="/packs">Prompt packs</a></li><li><a href="/tools">Ready-made tools</a></li><li><a href="/sponsor">Sponsor</a></li><li><a href="/submit">Suggest a task</a></li><li><a href="/contact">Contact</a></li></ul></div>
</div>
<div class="fbottom"><span>\xA9 2026 Bot or Nah \xB7 Minnesota, USA \xB7 Prices in USD. Payments by Stripe; we never see your card number. Visa, Mastercard, American Express and Discover accepted.</span>
<a class="fbadge" href="https://www.toolpilot.ai" rel="noopener" target="_blank" title="Featured on ToolPilot"><img src="/badges/toolpilot.png" alt="Featured on ToolPilot" width="150" height="33" loading="lazy"></a>
<a class="fbadge" href="https://startupfa.me/s/bot-or-nah?utm_source=botornah.com" target="_blank"><img src="https://startupfa.me/badge?t=classic&amp;theme=default" alt="Bot or Nah - Featured on Startup Fame" width="171" height="54" loading="lazy"></a>
<a class="fbadge" href="https://www.betterlaunch.co/product/bot-or-nah" target="_blank"><img src="https://www.betterlaunch.co/badge-find-dark.svg" alt="Launching on Better Launch" width="200" height="56" loading="lazy"></a>
<span><a href="/refunds">Refunds</a> \xB7 <a href="/terms">Terms</a> \xB7 <a href="/privacy">Privacy</a> \xB7 <a href="/credits">Credits</a></span></div>
</div></footer>
</body></html>`}var vcard=v=>`<a class="vcard" href="/v/${v.slug}" data-v="${v.v}" data-cat="${v.cat}" data-text="${esc(v.q+" "+v.sum+" "+CAT[v.cat].name)}">
<div class="top-row"><span class="cn">${esc(CAT[v.cat].name)}</span>${stamp(v.v)}</div>
<h3>${esc(v.q)}</h3><p>${esc(v.sum)}</p><div class="go">Read the verdict <span>\u2192</span></div></a>`,catCard=c=>`<a class="cat t-${c.tint}" href="/c/${c.slug}"><span class="ic" aria-hidden="true">${esc(c.icon)}</span><span class="count">${count(c.slug)} verdicts</span><h3>${esc(c.name)}</h3><p>${esc(c.blurb)}</p></a>`,searchBox=(id="hs")=>`<div class="search" data-search>
<form action="/verdicts" method="get" role="search">${SEARCH_ICON}
<label class="hp" for="${id}">Search tasks and apps</label>
<input id="${id}" name="q" type="search" autocomplete="off" placeholder="Search a task or app, like \u201Cbudget\u201D or \u201CCanva\u201D" role="combobox" aria-expanded="false" aria-controls="${id}-list" aria-autocomplete="list">
<button class="btn small" type="submit">Search</button></form>
<ul class="results" id="${id}-list" role="listbox"></ul></div>`,signup=(list="news",heading='Get new verdicts <span class="serif">in your inbox.</span>',blurb="One short email when new verdicts land: what AI can now do for you, and what it still gets wrong. No spam. Unsubscribe anytime.")=>`
<div class="signup reveal"><div><h2>${heading}</h2><p>${blurb}</p></div>
<form class="form" action="/api/subscribe" method="post" data-ajax>
<input type="hidden" name="list" value="${list}">
<div class="hp" aria-hidden="true"><label for="w-${list}">Leave this empty</label><input id="w-${list}" name="website" tabindex="-1" autocomplete="off"></div>
<label class="hp" for="e-${list}">Email address</label>
<div class="inline"><input id="e-${list}" name="email" type="email" required placeholder="you@example.com" autocomplete="email"><button class="btn small" type="submit">${list==="packs"?"Join the waitlist":"Subscribe"}</button></div>
<p class="msg" role="status" aria-live="polite"></p>
<p class="small muted">By subscribing you agree to our <a href="/privacy">privacy policy</a>.</p>
</form></div>`,adCard=a=>`<aside class="spon ad" aria-label="Sponsored">${a.img?`<img class="ad-logo" src="/ad/${a.id}.png" alt="" width="44" height="44" loading="lazy">`:""}<div><span class="tag">Sponsored</span><b>${esc(a.headline)}</b> ${esc(a.line)}</div><a class="link-arrow" href="${a.url==="#"?"#":"/go/"+esc(a.id)}" rel="sponsored noopener" target="_blank">Visit ${esc(a.company)} \u2192</a></aside>`,sponsorSlot=(what,sizes,pairs=[["sidebar",""]])=>{let a=pickAd(pairs);if(a)return adCard(a);let[slot,target]=pairs[0];return`<div class="spon"><div><span class="tag">Sponsor slot \xB7 open</span><b>${what}</b> ${sizes}</div><a class="link-arrow" href="/sponsor/book?slot=${slot}${target?"&amp;target="+encodeURIComponent(target):""}">Book this spot \u2192</a></div>`},headlineAd=()=>{let a=pickAd([["headline",""]]);return a?`<div class="wrap hl-ad">${adCard(a)}</div>`:""},ROT=[["make my budget","bot"],["replace Calendly","half"],["write my cover letter","bot"],["do my taxes","nah"],["replace Linktree","bot"],["plan my trip","bot"],["explain my lease","half"],["write my will","nah"]],FAQ=[["What does Bot, Half-bot and Nah mean?","Bot means a free AI chat app does the job well and mistakes are easy to catch. Half-bot means AI does most of the work but you finish, check or decide something. Nah means AI gets it wrong too often or a mistake costs too much, so do it yourself or keep paying."],["Which AI app should I use?","Any major chat app works for the everyday prompts: ChatGPT, Claude or Gemini, including the free tiers. Our logged test runs so far used Claude, and each page says so."],["Is this financial, legal or medical advice?","No. Verdicts on money, law and health tell you what AI can safely help with and where to get a professional. Always check anything with real stakes."],["Where do the app prices come from?","Each paid app shows the plan, the price, the date it was checked and a link to the vendor's pricing page. Prices change, so confirm before you cancel anything."],["Do sponsors change verdicts?","Never. Sponsors can buy clearly labeled spots. They can't buy, edit or remove a verdict, including the one on their own product."],["How do I suggest a task or app?","Use the suggestion form. We read every one, and if you leave an email we send you the verdict when it's published."]];function home(d){let n={bot:0,half:0,nah:0};VERDICTS.forEach(v=>n[v.v]++);let tested=d.testedN!=null?d.testedN:VERDICTS.filter(v=>v.test).length,deck=["make-a-monthly-budget","tailor-my-resume-to-a-job","do-my-taxes"].map(s=>BY_SLUG[s]),fresh=["dispute-a-credit-card-charge","write-a-repair-request-to-my-landlord","ask-for-a-raise","understand-my-medical-bill","write-a-flight-delay-complaint","write-my-will"].map(s=>BY_SLUG[s]),free=VERDICTS.filter(v=>v.cat==="free-versions").slice(0,3),A=d.apps||{n:0},tape1=VERDICTS.slice(0,70).map(v=>`<a href="/v/${v.slug}" class="tape-i">${stamp(v.v)}${esc(v.q)}</a>`).join(""),tape2=(d.tape||[]).map(a=>`<a href="/apps/${esc(a.slug)}" class="tape-i"><img src="/i/${esc(a.slug)}.png" alt="" width="22" height="22" loading="lazy" data-l="${esc(a.name[0])}">${esc(a.name)} <span class="tape-p">${a.price==null?"":"$"+a.price+"/mo"}</span>${stamp(a.verdict==="yes"?"bot":a.verdict==="no"?"nah":"half")}</a>`).join(""),body=`
<section class="hero"><div class="wrap hero-grid">
<div>
<span class="eyebrow">${VERDICTS.length} everyday tasks \xB7 ${A.n.toLocaleString("en-US")} paid apps</span>
<h1 class="rot-h"><span class="sr">Can AI do it for you?</span><span aria-hidden="true">Can AI <span class="rot" data-rot='${esc(JSON.stringify(ROT))}'><span class="rot-pill ${ROT[0][1]}"><i></i><span class="rot-w">${ROT[0][0]}</span></span></span>?</span><span class="serif">Bot or Nah.</span></h1>
<p class="lede">Plain answers on whether ChatGPT, Claude or Gemini can handle a real task in your life, and which paid apps AI can replace. Every answer comes with the exact prompt to copy and what can go wrong.</p>
${searchBox()}
<div class="try"><span>Popular:</span><a href="/v/make-a-monthly-budget">Budget</a><a href="/v/write-a-cover-letter">Cover letter</a><a href="/apps/calendly">Calendly</a><a href="/apps/linktree">Linktree</a><a href="/v/do-my-taxes">Taxes</a></div>
</div>
<div class="deck" aria-label="Example verdicts">${MARK("peek")}${deck.map(v=>`<a class="dcard" href="/v/${v.slug}">${stamp(v.v)}<span class="cn small muted">${esc(CAT[v.cat].name)}</span><div class="qq">${esc(v.q)}</div><p>${esc(v.sum.split(". ").slice(1).join(". ")||v.sum)}</p></a>`).join("")}</div>
</div></section>${headlineAd()}

<div class="tape" aria-label="Recent verdicts"><div class="tape-track">${tape1}${tape1.replaceAll("<a ",'<a tabindex="-1" aria-hidden="true" ')}</div></div>
${tape2?`<div class="tape rev" aria-label="Paid apps we checked"><div class="tape-track">${tape2}${tape2.replaceAll("<a ",'<a tabindex="-1" aria-hidden="true" ')}</div></div>`:""}

<section class="stats reveal"><div class="wrap"><div class="stats-grid">
<div><b>${VERDICTS.length}</b><span>everyday tasks with a verdict and a prompt</span></div>
<div><b>${tested}</b><span>prompts with a logged test run</span></div>
<div><b>${A.n.toLocaleString("en-US")}</b><span>paid apps with a sourced price</span></div>
<div><b>${(A.cats||0).toLocaleString("en-US")}</b><span>app categories to browse</span></div>
</div></div></section>

<section class="reveal"><div class="wrap">
<div class="legend">
<div>${stamp("bot")}<span class="n">${n.bot}</span><h3>AI does it well</h3><p>Copy the prompt, paste it into any major AI app, and you're done. Check the result like you'd check anyone's work.</p></div>
<div>${stamp("half")}<span class="n">${n.half}</span><h3>AI helps, you finish</h3><p>AI gets you most of the way. We tell you exactly which part still needs a human.</p></div>
<div>${stamp("nah")}<span class="n">${n.nah}</span><h3>Do it yourself</h3><p>AI gets this wrong too often, or a mistake costs too much. We say why, and what AI can still help with.</p></div>
</div></div></section>

<section><div class="wrap">
<div class="sec-head reveal"><div><span class="eyebrow">Three ways to use it</span><h2>Ask, copy, <span class="serif">save.</span></h2></div></div>
<div class="bento">
<a class="bento-c b1 reveal" href="/verdicts"><span class="eyebrow">Everyday tasks</span><h3>Get a straight answer</h3><p>Budgets, landlords, resumes, bills. ${VERDICTS.length} tasks, each with a verdict first.</p><div class="mini-stamps">${stamp("bot")}${stamp("half")}${stamp("nah")}</div></a>
<a class="bento-c b2 reveal" href="/v/make-a-monthly-budget#prompt"><span class="eyebrow">Prompts</span><h3>Copy the exact prompt</h3><p>Fill in the [BRACKETS] and paste. Rules and output format are built in.</p><div class="mini-prompt" aria-hidden="true"><span class="typing">My monthly take-home pay: <mark>[AMOUNT]</mark></span></div></a>
<a class="bento-c b3 reveal" href="/savings"><span class="eyebrow">Paid apps</span><h3>Stop paying for what AI can build</h3><p>Add your subscriptions and see the yearly total, plus the free alternatives.</p><div class="mini-total"><span>Calendly, Canva, Grammarly and Linktree, per year</span><b data-count-to="${d.sampleYear||0}">$${(d.sampleYear||0).toLocaleString("en-US")}</b></div></a>
</div></div></section>

<section><div class="wrap">
<div class="sec-head reveal"><div><h2>Verdicts people <span class="serif">need most</span></h2><p>Money, landlords, bosses, bills. The tasks where a good prompt saves real time, and a bad answer costs real money.</p></div><a class="link-arrow" href="/verdicts">All ${VERDICTS.length} tasks \u2192</a></div>
<div class="vgrid">${fresh.map(vcard).join("")}</div>
</div></section>

${d.appCards?`<section><div class="wrap"><div class="band reveal">${MARK("glyph","#fffdf8")}
<div class="sec-head"><div><span class="eyebrow">Paid apps</span><h2>Apps you might <span class="serif">not need to pay for</span></h2><p class="lede">Real prices with their sources. Where AI can help you build or self-host a version, we say what it takes and hand you the prompt. Where it can't, we list the free alternatives.</p></div><a class="link-arrow" href="/apps">All ${A.n.toLocaleString("en-US")} apps \u2192</a></div>
<div class="vgrid">${d.appCards}</div>
</div></div></section>`:""}

${d.globe?d.globe+'<script src="/globe.js?v=3" defer><\/script>':""}

<section><div class="wrap">
<div class="sec-head reveal"><div><span class="eyebrow">Stop paying monthly</span><h2>Build it <span class="serif">yourself, free</span></h2><p>Simple tools you can make with AI in an evening instead of paying every month.</p></div><a class="link-arrow" href="/c/free-versions">All free versions \u2192</a></div>
<div class="vgrid">${free.map(vcard).join("")}</div>
</div></section>

<section><div class="wrap">
<div class="sec-head reveal"><div><span class="eyebrow">Browse</span><h2>Everyday tasks by <span class="serif">life area</span></h2></div><a class="link-arrow" href="/verdicts">See all \u2192</a></div>
<div class="cats">${CATS.map(catCard).join("")}</div>
</div></section>

<section><div class="wrap two faq-wrap">
<div><span class="eyebrow">Questions</span><h2>The short <span class="serif">answers</span></h2><p class="muted">Anything else? <a href="/contact">Email us</a>. We reply in writing within 1 business day.</p></div>
<div class="faq">${FAQ.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
</div></section>

<section><div class="wrap">${signup()}</div></section>

<section><div class="wrap">${sponsorSlot("Your AI tool, in front of people asking \u201Ccan AI do this for me?\u201D","Clearly labeled. Sponsors never change a verdict.",[["sidebar",""]])}</div></section>`,jsonld=`<script type="application/ld+json">${JSON.stringify([{"@context":"https://schema.org","@type":"WebSite",name:"Bot or Nah",url:SITE+"/",potentialAction:{"@type":"SearchAction",target:SITE+"/verdicts?q={query}","query-input":"required name=query"}},{"@context":"https://schema.org","@type":"FAQPage",mainEntity:FAQ.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))}]).replace(/</g,"\\u003c")}<\/script>`;return layout({title:"Bot or Nah",desc:"Can AI do it for you? Plain answers for everyday tasks and paid apps, with the exact prompt to copy and what can go wrong.",path:"/",body,jsonld})}function verdicts(){let body=`<div class="wrap"><div class="page-head"><span class="eyebrow">Directory</span><h1>Every verdict, <span class="serif">one page.</span></h1><p class="lede">${VERDICTS.length} everyday tasks, each with a straight answer, a copy-ready prompt and the risks. Filter by verdict or life area.</p></div>
<div class="filters" role="group" aria-label="Filter verdicts">
<button class="chip" data-v="all" aria-pressed="true">All</button><button class="chip" data-v="bot" aria-pressed="false">Bot</button><button class="chip" data-v="half" aria-pressed="false">Half-bot</button><button class="chip" data-v="nah" aria-pressed="false">Nah</button>
<label class="hp" for="fcat">Category</label><select id="fcat"><option value="">All categories</option>${CATS.map(c=>`<option value="${c.slug}">${esc(c.name)}</option>`).join("")}</select>
<label class="hp" for="fq">Search</label><input id="fq" type="search" placeholder="Filter by keyword">
<span class="count" id="fcount" aria-live="polite">${VERDICTS.length} verdicts</span></div>
<div class="vgrid" data-filter-grid>${VERDICTS.map(vcard).join("")}</div>
<div class="noresults">No verdict matches that yet. <a href="/submit">Suggest the task</a> and we'll review it.</div>
<section>${signup()}</section></div>`;return layout({title:"All verdicts",desc:`Browse ${VERDICTS.length} verdicts on whether AI can handle everyday tasks: money, home, jobs, business, travel and more.`,path:"/verdicts",body})}function category(slug){let c=CAT[slug];if(!c)return null;let list=VERDICTS.filter(v=>v.cat===slug),others=CATS.filter(x=>x.slug!==slug).slice(0,4),body=`<div class="wrap"><div class="crumbs"><a href="/">Home</a><span>/</span><a href="/verdicts">Verdicts</a><span>/</span><span>${esc(c.name)}</span></div>
<div class="page-head"><span class="eyebrow">${list.length} verdicts</span><h1>${esc(c.name)}</h1><p class="lede">${esc(c.blurb)}${slug==="health-admin"?" These verdicts cover paperwork only. For symptoms or treatment, talk to a doctor.":""}</p></div>
<div class="spon-top" style="margin:0 0 28px">${sponsorSlot(`Category sponsor for ${esc(c.name)}.`,"One tool featured on every verdict in this category.",[["category",c.slug]])}</div>
<div class="vgrid">${list.map(vcard).join("")}</div>
<div class="sec-head"><h2>More <span class="serif">life areas</span></h2></div>
<div class="cats">${others.map(catCard).join("")}</div>
<section>${signup()}</section></div>`;return layout({title:`${c.name}: can AI do it?`,desc:`${c.blurb} ${list.length} verdicts on what AI can and can't do, with prompts to copy.`,path:"/c/"+slug,body})}var packPlug=(cat,v)=>{let W=s=>new Set((String(s||"").toLowerCase().match(/[a-z]{4,}/g)||[])),q=W(v?[v.q,v.title,v.slug&&v.slug.replace(/-/g," ")].join(" "):""),p=null,bs=-1;for(let x of S.packs.filter(y=>y.cat===cat)){let t=W(x.name+" "+x.prompts.map(y=>y.t+" "+y.d).join(" ")),n=0;for(let w of q)t.has(w)&&n++;n>bs&&(bs=n,p=x)}return p?`<div class="plug"><div><span class="tag">Prompt pack</span><b>${esc(p.name)}</b> ${p.prompts.length} step-by-step prompts that go further than this one, $${p.price}.</div><a class="link-arrow" href="/packs/${p.slug}">See what\u2019s inside \u2192</a></div>`:""},promptHtml=p=>esc(p).replace(/\[([^\]\n]{1,80})\]/g,"<mark>[$1]</mark>");function runsHtml(runs){let ok=runs.filter(r=>r.result==="pass").length,lab=r=>r.result==="pass"?"Passed":r.result==="partial"?"Passed with a catch":"Failed";return`<div class="block" id="test"><h2><span class="num">06</span>Our test run${runs.length>1?"s":""}</h2>
<p class="muted">${runs.length>1?`${runs.length} runs, each with a different made-up sample`:"One run with a made-up sample; a second run with a different sample is on the way"}. ${ok} of ${runs.length} passed every check.</p>
${runs.map((r,i)=>`<div class="testlog"><div class="tl-h"><span>Run ${i+1} \xB7 ${esc(r.model)} \xB7 graded by ${esc(r.judge)}</span><span>${fmtDate(r.date)}</span><span class="tl-r ${esc(r.result)}">${lab(r)}</span></div>
<p><b>The made-up sample${r.n===2?" (a messier one)":""}:</b></p>${Object.keys(r.values||{}).length?`<ul class="tl-vals">${Object.entries(r.values).map(([k,x])=>`<li><code>${esc(k)}</code><span>${esc(x)}</span></li>`).join("")}</ul>`:"<p>This prompt has nothing to fill in.</p>"}
<ul class="checks">${r.checks.map(([c2,ok2])=>`<li class="${ok2?"ok":"no"}"><span aria-hidden="true">${ok2?"\u2713":"\u2717"}</span>${esc(c2)}</li>`).join("")}</ul>
${(r.invented||[]).length?`<p class="small"><b>Details it made up:</b> ${r.invented.map(q=>`\u201C${esc(q)}\u201D`).join(", ")}</p>`:""}
<p><b>What came back (excerpt):</b></p><blockquote>${esc(r.excerpt)}</blockquote>
<details class="tl-full"><summary>Read the full answer</summary><pre>${esc(r.output)}</pre></details>${r.note?`<p class="small muted">${esc(r.note)}</p>`:""}</div>`).join("")}
<p class="small muted">How each run works: we fill the prompt with a made-up sample, run it once in ${esc(runs[0].model)}, and ${esc(runs[0].judge)} grades the answer against the prompt's own rules. Word limits are counted by code, and every quote flagged as made up is checked against the full answer. Your results can differ. <a href="/how-it-works#testing">How we test</a>.</p></div>`}function verdict(slug,runs=[]){let v=BY_SLUG[slug];if(!v)return null;runs=(runs||[]).filter(r=>r&&r.output&&Array.isArray(r.checks));let c=CAT[v.cat],related=VERDICTS.filter(x=>x.cat===v.cat&&x.slug!==slug).slice(0,3),body=`${headlineAd()}<article class="v-${v.v}"><div class="wrap">
<div class="crumbs"><a href="/">Home</a><span>/</span><a href="/c/${c.slug}">${esc(c.name)}</a><span>/</span><span>Verdict</span></div>
<header class="vhead"><div><h1>${esc(v.q)}</h1><p class="lede">${esc(v.sum)}</p>
<div class="meta"><span>Verdict: <b>${LABEL[v.v]}</b> \xB7 ${MEANS[v.v]}</span>${runs.length?`<span class="tested">\u2713 Tested ${runs.length===1?"once":runs.length+" times"} in ${esc(runs[0].model)} \xB7 ${fmtDate(runs[runs.length-1].date)}</span>`:v.test?`<span class="tested">\u2713 Tested in ${esc(v.test.model)} \xB7 ${fmtDate(v.test.date)}</span>`:`<span>Reviewed ${v.rev?fmtDate(v.rev):REVIEWED_H}</span>`}<span>Written for ChatGPT, Claude or Gemini</span></div>
<p style="margin:18px 0 0"><a class="btn small" href="#prompt">Jump to the prompt \u2193</a></p></div>
${stamp(v.v,"big stamp-in")}</header>
<div class="vbody"><div>
<div class="block" id="why"><h2><span class="num">01</span>Why ${LABEL[v.v].toLowerCase()}</h2><ul class="why">${v.why.map(w=>`<li>${esc(w)}</li>`).join("")}</ul></div>
<div class="spon-in" style="margin:0 0 36px">${sponsorSlot("Featured tool for this task.","A labeled card for one relevant tool.",[["featured",v.slug],["category",v.cat],["sidebar",""]])}</div>
<div class="block" id="prompt"><h2><span class="num">02</span>The prompt</h2>
<p class="muted">Replace everything in <b>[BRACKETS]</b> with your own details, then paste it into your AI app.</p>
<div class="prompt"><div class="bar"><div class="dots"><i></i><i></i><i></i></div><span>prompt.txt</span><button class="copy" data-copy="#ptext" type="button"><span>Copy prompt</span></button></div><pre id="ptext">${promptHtml(v.prompt)}</pre></div></div>
<div class="block" id="steps"><h2><span class="num">03</span>Steps</h2><ol class="ol">${v.steps.map(s=>`<li>${esc(s)}</li>`).join("")}</ol></div>
<div class="block" id="risks"><h2><span class="num">04</span>What can go wrong</h2><div class="warn"><ul>${v.risks.map(r=>`<li>${esc(r)}</li>`).join("")}</ul></div></div>
<div class="block" id="tools"><h2><span class="num">05</span>What to use</h2><div class="tools">${esc(v.tools)}</div></div>
${runs.length?runsHtml(runs):v.test?`<div class="block" id="test"><h2><span class="num">06</span>Our test run</h2><div class="testlog"><div class="tl-h"><span>${esc(v.test.model)}${v.test.judge?` \xB7 graded by ${esc(v.test.judge)}`:""}</span><span>${fmtDate(v.test.date)}</span><span class="tl-r ${v.test.result}">${v.test.result==="pass"?"Passed":v.test.result==="partial"?"Passed with a catch":"Failed"}</span></div>
<p><b>Sample input we used:</b> ${esc(v.test.input)}</p><ul class="checks">${v.test.checks.map(([c2,ok])=>`<li class="${ok?"ok":"no"}"><span aria-hidden="true">${ok?"\u2713":"\u2717"}</span>${esc(c2)}</li>`).join("")}</ul>
<p><b>What came back (excerpt):</b></p><blockquote>${esc(v.test.excerpt)}</blockquote>${v.test.note?`<p class="small muted">${esc(v.test.note)}</p>`:""}
<p class="small muted">One run with an invented sample, checked against the prompt's own rules${v.test.judge?" by a second AI model (word limits counted by code)":""}. Your results can differ; <a href="/how-it-works#testing">how we test</a>.</p></div></div>`:""}
${toolPlug(v.slug)}
${packPlug(v.cat,v)}
</div>
<aside class="side">
<div class="panel"><h3>On this page</h3><ul class="toc"><li><a href="#why">Why ${LABEL[v.v].toLowerCase()}</a></li><li><a href="#prompt">The prompt</a></li><li><a href="#steps">Steps</a></li><li><a href="#risks">What can go wrong</a></li><li><a href="#tools">What to use</a></li>${runs.length?`<li><a href="#test">Our test run${runs.length>1?"s":""}</a></li>`:v.test?'<li><a href="#test">Our test run</a></li>':""}</ul></div>
<div class="panel"><h3>Tried the prompt? Did it work?</h3><div class="vote" data-vote="${v.slug}"><button type="button" data-v="yes">Yes</button><button type="button" data-v="no">No</button></div><p class="tally">Not enough reader reports yet. Yours counts.</p></div>
<div class="panel"><h3>Disagree with this verdict?</h3><p class="small muted">Tell us what happened when you tried it. We re-review verdicts when readers report a different result.</p><a class="btn small ghost" href="/submit?task=${encodeURIComponent("Re-review: "+v.q)}">Report a result</a></div>
</aside></div></div>
<div class="wrap related"><div class="sec-head"><h2>More in <span class="serif">${esc(c.name)}</span></h2><a class="link-arrow" href="/c/${c.slug}">All ${count(c.slug)} \u2192</a></div>
<div class="vgrid">${related.map(vcard).join("")}</div>
<section>${signup()}</section></div></article>`,jsonld=`<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:[{"@type":"Question",name:v.q,acceptedAnswer:{"@type":"Answer",text:`${LABEL[v.v]}. ${v.sum}`}}]}).replace(/</g,"\\u003c")}<\/script>`;return layout({title:v.q.replace(/\?$/,"")+"?",desc:`${LABEL[v.v]}: ${v.sum}`,path:"/v/"+slug,body,jsonld,ogType:"article"})}var head2=(eyebrow,h1,lede)=>`<div class="page-head"><span class="eyebrow">${eyebrow}</span><h1>${h1}</h1><p class="lede">${lede}</p></div>`;function howItWorks(){let body=`<div class="wrap">${head2("Methodology",'How a verdict <span class="serif">gets made</span>',"Short version: we judge each task against the same checklist, write the prompt we'd use ourselves, and say plainly where AI falls short.")}
<div class="two"><div class="prose">
<h2>The checklist</h2><p>Every task is judged on four questions:</p>
<ol><li><b>Can a current AI app do the core of the job?</b> ChatGPT, Claude and Gemini, including free tiers.</li>
<li><b>How often does it get it wrong?</b> Made-up facts, bad math and confident mistakes count against it.</li>
<li><b>What does a mistake cost?</b> A clunky packing list is fine. A wrong tax form or a missed legal deadline isn't.</li>
<li><b>Can a regular person check the result?</b> If you can't easily spot the error, the verdict gets stricter.</li></ol>
<h2>What the verdicts mean</h2>
<p>${stamp("bot")} AI does the job well and mistakes are easy to catch.</p>
<p>${stamp("half")} AI does most of the work, but a person has to finish, check or decide something.</p>
<p>${stamp("nah")} AI is wrong too often, or the stakes are too high. We still show how AI can help around the edges.</p>
<h2 id="testing">How we test</h2><p>Every verdict is judged against the checklist above. Then we test the prompt: we fill in the [BRACKETS] with a made-up sample (never real personal data), run it, and grade the answer against the prompt's own rules. Did it follow the MUST and NEVER rules? Did it make up details we never gave it? Did it stay inside its word limits?</p><p>Every verdict is being re-tested twice, with two different made-up samples, on Bot or Nah's own AI server (Qwen 3.5). Earlier runs used Llama 3.3 70B through Cloudflare Workers AI, graded by GPT-OSS 120B. An AI grader checks each answer, and every run on the page names the models it used. Word limits are counted by code, and every quote it flags as made up is checked against the full answer. Re-tested pages show both samples in full, every check with a pass or fail, and the complete answer the AI gave. Pages still waiting for their re-test show our earlier single run with an excerpt; our first 50 of those used Claude (Anthropic). A check that fails is shown as failed. We have not logged runs in ChatGPT or Gemini, and we don't claim we have. A page without a test log says \u201CReviewed\u201D instead.</p>
<h2>The paid-app directory</h2><p>Every paid-app page shows the plan, the price, the date it was checked and a link to its source. On those pages, the verdict answers a different question: can an AI coding tool build you a working replacement?</p>
<h2>Readers keep us honest</h2><p>Every verdict has a \u201CDid this work for you?\u201D vote. We only show the tally once enough people have voted for it to mean something. If readers report a different result, we re-review the verdict.</p>
<h2>Money never changes a verdict</h2><p>Sponsors can buy labeled placements. They can't buy, change or remove a verdict, and a sponsor's own product gets the same checklist as everything else.</p>
<h2>Not professional advice</h2><p>Verdicts about money, law and health are general information, not advice. For anything with real stakes, check with a qualified professional.</p>
</div>
<aside class="side"><div class="panel"><h3>Think we got one wrong?</h3><p class="small muted">Tell us the task and what happened.</p><a class="btn small" href="/submit">Report or suggest</a></div></aside></div>
<section>${signup()}</section></div>`;return layout({title:"How it works",desc:"How Bot or Nah decides whether AI can handle a task: the checklist, what each verdict means, and why sponsors can't change a verdict.",path:"/how-it-works",body})}function submit(){let body=`<div class="wrap">${head2("Request",`Can't find it? <span class="serif">Ask us.</span>`,"Tell us a task you want AI to handle, or a paid app or service you want us to check. We read every request, and if you leave an email we send you the verdict when it's up.")}
<div class="two"><form class="form box" action="/api/submit" method="post" data-ajax>
<div class="field"><span class="small"><b>What are you suggesting?</b></span><div class="radio-row"><label><input type="radio" name="kind" value="task" checked><span>A task</span></label><label><input type="radio" name="kind" value="app"><span>A paid app or service</span></label><label><input type="radio" name="kind" value="tool"><span>An AI tool</span></label><label><input type="radio" name="kind" value="correction"><span>A correction</span></label></div></div>
<div class="field"><label for="task">Task, tool or verdict</label><input id="task" name="task" required maxlength="200" placeholder="e.g. Can AI plan my wedding budget? or: Can I replace Mailchimp?"></div>
<div class="field"><label for="details">Details (optional)</label><textarea id="details" name="details" maxlength="2000" placeholder="What did you try? What happened?"></textarea></div>
<div class="field"><label for="semail">Your email (optional)</label><input id="semail" name="email" type="email" maxlength="200" autocomplete="email"><span class="hint">Only used to tell you when the verdict is up.</span></div>
<div class="hp" aria-hidden="true"><label for="sw">Leave this empty</label><input id="sw" name="website" tabindex="-1" autocomplete="off"></div>
<button class="btn" type="submit">Send suggestion</button><p class="msg" role="status" aria-live="polite"></p>
</form>
<div class="prose"><h2>What happens next</h2><ol><li>We read it, usually within a few business days.</li><li>If it's a good fit, we review the task against <a href="/how-it-works">our checklist</a> and publish a verdict.</li><li>If you left an email, we send you the link.</li></ol>
<h2>Tool makers</h2><p>Free submissions are welcome, and they go in the same queue as everything else. Paying for <a href="/sponsor">expedited review</a> gets you a faster review, never a better verdict.</p></div></div></div>`;return layout({title:"Suggest a task",desc:"Suggest an everyday task or AI tool for Bot or Nah to review.",path:"/submit",body})}function newsletter(){let body=`<div class="wrap">${head2("Newsletter",'The short, <span class="serif">honest</span> AI email.',"New verdicts, prompts that actually work, and the tasks where AI still falls on its face. Written for people who don't code.")}
${signup("news",'One email when <span class="serif">new verdicts land.</span>')}
<section><div class="cards3"><div class="box"><h3>What's in it</h3><p>New and updated verdicts, one prompt worth stealing, and one \u201Cnah\u201D to save you from a bad idea.</p></div><div class="box"><h3>How often</h3><p>When there's something worth sending. We'd rather skip a week than pad an email.</p></div><div class="box"><h3>Your email is safe</h3><p>We never sell or share it. Every email has a one-click unsubscribe link.</p></div></div></section></div>`;return layout({title:"Newsletter",desc:"Get new Bot or Nah verdicts by email: what AI can do for you now, and what it still gets wrong.",path:"/newsletter",body})}function contact(){let body=`<div class="wrap">${head2("Contact",'We work <span class="serif">in writing.</span>',`Email <a href="mailto:${EMAIL}">${EMAIL}</a> for anything: questions, advertising, refunds, or a task you want us to review.`)}
<div class="cards3"><div class="box"><h3>Email</h3><p><a href="mailto:${EMAIL}">${EMAIL}</a></p></div><div class="box"><h3>Reply time</h3><p>Within 1 business day, Monday to Friday, US Central time. We don't do phone calls or meetings.</p></div><div class="box"><h3>Suggest a task</h3><p>Use the <a href="/submit">suggestion form</a> and we'll review it.</p></div></div>
<p class="muted">Bot or Nah is operated from Minnesota, USA.</p></div>`;return layout({title:"Contact",desc:"Contact Bot or Nah by email. We reply in writing within 1 business day.",path:"/contact",body})}var legal=(title,path,desc,inner,upd)=>layout({title,desc,path,body:`<div class="wrap"><div class="page-head"><span class="eyebrow">Last updated ${upd||UPDATED}</span><h1>${title}</h1></div><div class="prose">${inner}</div></div>`}),refunds=()=>legal("Refund policy","/refunds","Refund policy for Bot or Nah sponsor placements, prompt packs and ready-made tools.",`<p>All amounts are in US dollars.</p>
<h2>Sponsor placements</h2><ul><li>If we don't approve your placement, we refund you in full on the same day.</li><li>If you cancel before your placement goes live, we refund you in full.</li><li>Once a placement is live, the term you paid for isn't refundable, unless we take it down for a reason that isn't your fault. In that case we refund the unused days.</li></ul>
<h2>Expedited review ($49)</h2><ul><li>If we don't review and list your tool within 48 hours of payment, we refund you in full.</li></ul>
<h2>Newsletter sponsorship</h2><ul><li>If the issue you paid for isn't sent, we refund you in full.</li></ul>
<h2>Prompt packs</h2><ul><li>All prompt pack sales are final. Packs are digital and can be copied the moment they're delivered, so we don't refund packs for a change of mind.</li><li>If a prompt in your pack doesn't do the job it says, email us the task and we'll send a rewritten prompt. One rewrite per prompt.</li><li>If your download page doesn't open or the link we email you doesn't arrive within 24 hours, email us and we'll send a working copy. If we can't fix it, we refund you in full.</li><li>If you were charged twice for the same pack, we refund the extra charge.</li></ul>
<h2>Ready-made tools</h2><ul><li>All ready-made tool sales are final. The spreadsheets and workbooks are digital and can be copied the moment they're delivered, so we don't refund them for a change of mind.</li><li>If your download doesn't work, email us and we'll fix it. If we can't fix it, we refund you in full.</li><li>If you were charged twice for the same tool, we refund the extra charge.</li></ul>
<h2>How to ask for a refund</h2><p>Email <a href="mailto:${EMAIL}?subject=Refund">${EMAIL}</a> with the email address you paid with. Refunds go back to the original card; your bank may take 5\u201310 business days to show it.</p>
<h2>Delivery</h2><p>Everything we sell is digital. Placements appear on botornah.com. Prompt packs open on screen right after payment, and we email you the same download link to keep. Nothing is shipped.</p>`,"September 30, 2026"),terms=()=>legal("Terms of use","/terms","Terms of use for Bot or Nah.",`
<h2>What Bot or Nah is</h2><p>Bot or Nah publishes opinions on whether AI tools can handle everyday tasks, along with prompts you can copy. It is operated from Minnesota, USA.</p>
<h2>Not professional advice</h2><p>Our content is general information. It isn't legal, financial, tax or medical advice. Check anything important with a qualified professional. AI tools change often, and results vary.</p>
<h2>Your submissions and votes</h2><p>When you send a suggestion or vote, you let us use it to improve the site, including quoting a suggestion without your name. Don't submit anything confidential or anyone else's personal information.</p>
<h2>Purchases</h2><p>Prices are in US dollars and shown before you pay. Payments are processed by Stripe. Refunds follow our <a href="/refunds">refund policy</a>.</p>
<h2>Prompt packs</h2><p>A pack is licensed for your personal or internal business use. You may not resell or republish packs.</p>
<h2>Sponsors</h2><p>Sponsored placements are labeled. We may decline or remove any placement that is misleading, unlawful or unsafe; in that case you get the refund our refund policy describes. Sponsors never influence a verdict.</p>
<h2>Liability</h2><p>The site is provided as is. To the extent the law allows, our total liability for any claim is limited to the amount you paid us in the 12 months before the claim.</p>
<h2>Changes and law</h2><p>We may update these terms and will change the date above when we do. Minnesota law governs these terms.</p>
<h2>Contact</h2><p><a href="mailto:${EMAIL}">${EMAIL}</a></p>`),privacy=()=>legal("Privacy policy","/privacy","Privacy policy for Bot or Nah.",`
<h2>What we collect</h2><ul>
<li><b>Newsletter:</b> your email address, and the date you signed up. We only send the newsletter, and every issue has a one-click unsubscribe link.</li>
<li><b>Ad bookings:</b> your company name, link, ad copy, logo and email, so we can review and run your ad.</li>
<li><b>Suggestions:</b> what you write, and your email if you choose to give it.</li>
<li><b>Votes:</b> your yes or no answer. To limit spam, we store a one-way scrambled (hashed) version of your IP address for up to 24 hours. We can't turn it back into your IP address.</li>
<li><b>Reverse it:</b> the web address or repository you enter and the result we generate. We fetch that one public page (or public repository) to analyze it, and Bot or Nah's own AI server writes the result (our host's AI service, Cloudflare Workers AI, steps in as a backup). Results are stored so the same link loads instantly next time. To limit abuse, we count requests using a one-way scrambled code made from your IP address and the date.</li>
<li><b>When you email us:</b> your email address and whatever you write.</li>
<li><b>When you buy:</b> your name, email and billing details. Stripe collects these; we never see or store your full card number.</li>
<li><b>When you visit:</b> our host, Cloudflare, processes basic technical data (such as IP address and browser type) to deliver and protect the site. Your browser also remembers which verdicts you voted on, on your own device.</li><li><b>Visitor counts:</b> to show the live globe, we record the country Cloudflare reports for your visit, the page path, and a one-way scrambled code made from your IP address and browser plus the date. The code can\u2019t be turned back into your IP address and changes every day. We delete these rows after 24 hours and keep only daily totals per country. No cookies are used for this.</li></ul>
<h2>How we use it</h2><p>To send the emails you asked for, answer you, deliver what you bought, handle refunds, and keep the site secure. We don't sell your personal information, and we don't use advertising or tracking cookies.</p>
<h2>Who we share it with</h2><p>Only the services that run the site: Cloudflare for hosting, storage, backup AI processing for Reverse it, and sending our emails, Stripe for payments, Google Workspace for our inbox, and Google Fonts for the site's typefaces (your browser loads fonts from Google). Each handles data under its own privacy policy.</p>
<h2>How long we keep it</h2><p>Newsletter emails stay until you unsubscribe. Order records are kept as long as tax and accounting rules require. Suggestions are kept as long as they're useful for reviews. Hashed visitor and vote data is deleted automatically within 24 hours; daily totals per country are kept.</p>
<h2>Your choices</h2><p>Email <a href="mailto:${EMAIL}?subject=Privacy">${EMAIL}</a> to see, correct or delete your information, or to unsubscribe. You can also use the one-click unsubscribe link in any newsletter.</p>
<h2>Changes</h2><p>If we change this policy, we'll update the date above.</p>`),thanks=kind=>layout({title:"Thanks",desc:"Thanks.",path:"/thanks",body:`<div class="wrap">${head2("Done",kind==="submit"?'Got it. <span class="serif">Thank you.</span>':`You're on <span class="serif">the list.</span>`,kind==="submit"?"We read every suggestion. If you left an email, we'll send you the verdict when it's up.":"We'll email you when there's something worth reading.")}<a class="btn" href="/verdicts">Browse verdicts</a></div>`}),notFound=()=>layout({title:"Page not found",desc:"Page not found.",path:"/404",body:`<div class="wrap">${head2("404",`Nah. <span class="serif">That page doesn't exist.</span>`,"Try searching for the task instead.")}${searchBox("nf")}<section><a class="btn ghost" href="/">Go home</a></section></div>`});function searchIndex(){return VERDICTS.map(v=>({s:v.slug,q:v.q,v:v.v,t:CAT[v.cat].name+" "+v.sum}))}function sitemap(appSlugs=[]){return`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["/","/verdicts","/apps","/savings","/reverse","/how-it-works","/submit","/newsletter","/packs","/tools",...TOOLS.map(t=>"/tools/"+t.slug),"/sponsor","/contact","/refunds","/terms","/privacy","/credits",...CATS.map(c=>"/c/"+c.slug),...VERDICTS.map(v=>"/v/"+v.slug),...appSlugs.map(s=>"/apps/"+s),"/free-alternatives",...FA_SLUGS.map(s=>"/free-alternatives/"+s),"/compare",...CMP_PAIRS.map(p=>"/compare/"+p.join("-vs-"))].map(u=>`<url><loc>${SITE}${u}</loc><lastmod>${REVIEWED}</lastmod></url>`).join("")}</urlset>`}var FAVICON='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="#d6f2de"/><g transform="translate(41 38) scale(.84)"><line x1="256" y1="150" x2="256" y2="92" stroke="#141414" stroke-width="30" stroke-linecap="round"/><circle cx="256" cy="66" r="38" fill="#ffc83d"/><rect x="56" y="136" width="400" height="320" rx="104" fill="#141414"/><polyline points="132,290 178,334 250,252" fill="none" stroke="#22c55e" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/><path d="M306 252 L386 332 M386 252 L306 332" stroke="#ff4f7b" stroke-width="40" stroke-linecap="round"/></g></svg>',credits=()=>legal("Credits","/credits","Open-source work Bot or Nah builds on.",`
<h2>Paid-app data and the live globe</h2><p>The paid-app directory data (prices, plans, verdicts, alternatives and build prompts) and the live visitor globe script come from <a href="https://canivibecodeit.com" rel="noopener">Can I Vibecode It?</a> by Rob Hallam, used under the MIT License:</p>
<pre class="license">MIT License

Copyright (c) 2026 Rob Hallam

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</pre>
<h2>App logos</h2><p>App icons belong to their owners and are shown only to identify each product. No endorsement is implied.</p>
<h2>Fonts</h2><p>Inter, Instrument Serif and JetBrains Mono, served by Google Fonts under the SIL Open Font License.</p>`);var BUILD_V="cd5af4ba",DATA_SHA="0a3c4ec52a7991d3de5931b120441b2b25aa525d",RAW=`https://raw.githubusercontent.com/kevmaestro/botornah/${DATA_SHA}`,V={yes:"bot",kinda:"half",no:"nah"},VL={bot:"Bot",half:"Half-bot",nah:"Nah"},VM={bot:"AI can help you build or set up a working version",half:"AI gets you partway; the hard part stays hard",nah:"Keep paying, or use a free alternative"},CAT_NAMES={"seo-marketing":"SEO & marketing","ai-writing":"AI writing","ai-image":"AI images","ai-video":"AI video","dev-tools":"Developer tools",crm:"CRM",hr:"HR","no-code-apps":"No-code apps","read-it-later":"Read-it-later","creator-commerce":"Creator commerce","finance-accounting":"Finance & accounting","notes-knowledge":"Notes & knowledge","productivity-utilities":"Productivity utilities","audio-video":"Audio & video","social-media":"Social media","meeting-notes":"Meeting notes","generative-media":"Generative media","user-research":"User research","screen-recording":"Screen recording","customer-support":"Customer support","website-builder":"Website builders","personal-finance":"Personal finance","time-tracking":"Time tracking","sales-outreach":"Sales outreach","ai-assistants":"AI assistants","ai-search":"AI search","ai-audio":"AI audio"},catName=s=>CAT_NAMES[s]||(s||"Other").replace(/-/g," ").replace(/^./,c=>c.toUpperCase()).replace(/\bAi\b/g,"AI").replace(/\bRss\b/g,"RSS").replace(/\bQr\b/g,"QR").replace(/\bSeo\b/g,"SEO").replace(/\bCrm\b/g,"CRM").replace(/\bHr\b/g,"HR"),vOf=v=>V[v]||"half",money2=n=>n==null?"Price varies":n===0?"Free":"$"+(Math.round(n*100)/100).toLocaleString("en-US",{minimumFractionDigits:Math.round(n*100)%100?2:0,maximumFractionDigits:2}),perMo=n=>n==null?"Price varies":money2(n)+"/mo",fmtDay=d=>{try{return new Date(d+"T12:00:00Z").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric",timeZone:"UTC"})}catch{return d}},host=u=>{try{return new URL(u).hostname.replace(/^www\./,"")}catch{return""}},safeUrl=u=>/^https?:\/\//i.test(u||"")?u:null,stamp2=v=>`<span class="stamp ${v}">${VL[v]}</span>`,icon=(slug,name,cls="aicon")=>`<img class="${cls}" src="/i/${esc(slug)}.png" alt="" width="40" height="40" loading="lazy" decoding="async" data-l="${esc((name||"?")[0].toUpperCase())}">`,CREDIT=`<p class="credit">Prices change; confirm on the vendor's site before you decide.</p>`,appRow=a=>{let v=vOf(a.verdict);return`<a class="arow" href="/apps/${esc(a.slug)}">${icon(a.slug,a.name)}<span class="an"><b>${esc(a.name)}</b><small>${esc(a.tagline||"")}</small></span><span class="ac">${esc(catName(a.category))}</span><span class="ap">${perMo(a.price)}</span>${stamp2(v)}</a>`},appCard=a=>{let v=vOf(a.verdict);return`<a class="vcard acard" href="/apps/${esc(a.slug)}"><div class="top-row"><span class="cn">${icon(a.slug,a.name,"aicon sm")}${esc(catName(a.category))}</span>${stamp2(v)}</div><h3>Can AI replace ${esc(a.name)}?</h3><p>${esc(a.summary||a.tagline||"")}</p><div class="go"><span class="price-tag">${perMo(a.price)}</span> Read the verdict <span>\u2192</span></div></a>`},SORTS={popular:"priority DESC, name COLLATE NOCASE",price:"price IS NULL, price DESC",cheap:"price IS NULL, price ASC",name:"name COLLATE NOCASE"},VERD={bot:"yes",half:"kinda",nah:"no"},PER=48;async function appsIndex(db,url){let p=url.searchParams,cat=(p.get("cat")||"").slice(0,40),v=p.get("v")||"",q=(p.get("q")||"").trim().slice(0,60),sort=SORTS[p.get("sort")]?p.get("sort"):"popular",page2=Math.max(1,Math.min(60,parseInt(p.get("page")||"1",10)||1)),where=["disc = 0"],args=[];if(cat&&(where.push("category = ?"),args.push(cat)),VERD[v]&&(where.push("verdict = ?"),args.push(VERD[v])),q){where.push("(name LIKE ? OR tagline LIKE ? OR sub LIKE ?)");let like="%"+q.replace(/[%_]/g,"")+"%";args.push(like,like,like)}let w=where.join(" AND "),[rows,total,cats,all]=await Promise.all([db.prepare(`SELECT slug,name,category,tagline,price,verdict FROM apps WHERE ${w} ORDER BY ${SORTS[sort]} LIMIT ${PER} OFFSET ${(page2-1)*PER}`).bind(...args).all(),db.prepare(`SELECT COUNT(*) n FROM apps WHERE ${w}`).bind(...args).first(),db.prepare("SELECT category c, COUNT(*) n FROM apps WHERE disc = 0 GROUP BY category ORDER BY n DESC").all(),db.prepare("SELECT COUNT(*) n, SUM(verdict='yes') y, SUM(verdict='kinda') k, SUM(verdict='no') x FROM apps WHERE disc = 0").first()]),n=total?.n||0,pages=Math.max(1,Math.ceil(n/PER)),qs=o=>{let u=new URLSearchParams,m={cat,v,q,sort,...o};for(let k in m)m[k]&&!(k==="sort"&&m[k]==="popular")&&!(k==="page"&&m[k]===1)&&u.set(k,m[k]);let s=u.toString();return"/apps"+(s?"?"+s:"")},chip=(val,label)=>`<a class="chip" href="${qs({v:val,page:1})}" aria-pressed="${v===val}">${label}</a>`,title=cat?`${catName(cat)} apps`:"Paid apps AI can replace",body=`<div class="wrap"><div class="page-head"><span class="eyebrow">${(all?.n||0).toLocaleString("en-US")} paid apps checked</span><h1>${cat?esc(catName(cat)):'Stop paying for <span class="serif">what AI can build.</span>'}</h1><p class="lede">Every app has a real price with its source, a straight verdict on whether AI can build you a working version, the free alternatives, and the exact build prompt.</p>
<div class="tally3"><span>${stamp2("bot")} ${(all?.y||0).toLocaleString("en-US")} AI can build</span><span>${stamp2("half")} ${(all?.k||0).toLocaleString("en-US")} partly</span><span>${stamp2("nah")} ${(all?.x||0).toLocaleString("en-US")} keep paying</span></div></div><p class="small" style="margin:14px 0 0"><a class="link-arrow" href="/free-alternatives">Free alternatives to 150 popular apps →</a> &nbsp; <a class="link-arrow" href="/compare">Compare apps side by side →</a></p>
<form class="filters" action="/apps" method="get" role="search">
${chip("","All")}${chip("bot","Bot")}${chip("half","Half-bot")}${chip("nah","Nah")}
<label class="hp" for="acat">Category</label><select id="acat" name="cat" data-autosubmit><option value="">All categories</option>${(cats.results||[]).map(c=>`<option value="${esc(c.c)}"${c.c===cat?" selected":""}>${esc(catName(c.c))} (${c.n})</option>`).join("")}</select>
<label class="hp" for="asort">Sort</label><select id="asort" name="sort" data-autosubmit><option value="popular">Most popular</option><option value="price"${sort==="price"?" selected":""}>Highest price</option><option value="cheap"${sort==="cheap"?" selected":""}>Lowest price</option><option value="name"${sort==="name"?" selected":""}>A to Z</option></select>
${VERD[v]?`<input type="hidden" name="v" value="${esc(v)}">`:""}
<label class="hp" for="aq">Search apps</label><input id="aq" name="q" type="search" value="${esc(q)}" placeholder="Search 1,000+ apps, like \u201CCalendly\u201D">
<button class="btn small" type="submit">Search</button>
<span class="count">${n.toLocaleString("en-US")} apps</span></form>
<div class="spon-top" style="margin:0 0 28px">${sponsorSlot("Your app in this directory.","A labeled card where people compare paid tools.",[["directory",""]])}</div>
${n?`<div class="atable" role="list">${(rows.results||[]).map(appRow).join("")}</div>`:`<div class="noresults show">No app matches that. <a href="/submit?task=${encodeURIComponent("Review this app: "+q)}">Ask us to review it</a>.</div>`}
${pages>1?`<nav class="pager" aria-label="Pages">${page2>1?`<a class="btn ghost small" href="${qs({page:page2-1})}">\u2190 Previous</a>`:"<span></span>"}<span>Page ${page2} of ${pages}</span>${page2<pages?`<a class="btn ghost small" href="${qs({page:page2+1})}">Next \u2192</a>`:"<span></span>"}</nav>`:""}
<section class="cats-mini"><h2>Browse by <span class="serif">category</span></h2><div class="catlinks">${(cats.results||[]).map(c=>`<a href="/apps?cat=${esc(c.c)}">${esc(catName(c.c))} <span>${c.n}</span></a>`).join("")}</div></section>
${CREDIT}<section>${signup()}</section></div>`;return layout({title,desc:`${(all?.n||0).toLocaleString("en-US")} paid apps with sourced prices: can AI build you a free version? Verdicts, free alternatives and build prompts.`,path:"/apps",body,canonical:cat?`/apps?cat=${cat}`:"/apps",noindex:!!(q||v||page2>1||sort!=="popular"),og:"/og-apps.png"})}var FA_SLUGS=["buffer","chatgpt","claude","close-crm","front","hootsuite","pipedrive","quickbooks-online","superwhisper","toggl-track","wispr-flow","zendesk","zoho-crm","activecampaign","calendly","ideogram","mailchimp","apple-music","attio","fastmail","help-scout","midjourney","runway","screaming-frog-seo-spider","slack-pro","spotify-premium","teachable","windsurf","youtube-music-premium","airtable","asana","bitwarden","brilliant","bubble","carrd","cursor","github-copilot","glide","granola","jira","mailerlite","perplexity","retool","shopify","speechify","superhuman","surveymonkey","uptime","webflow","canny","canva","crowdin","datadog","deel","discord-nitro","duolingo-super","grammarly","gusto","home-assistant-cloud","invoice-ninja","kit","languagetool","nordvpn","plausible","quillbot","raindrop-io","remote-com","todoist","trello","typefully","umami-cloud","vercel","adobe-acrobat-pro","adobe-lightroom","backblaze-personal-backup","bolt-new","capture-one","craft","deleteme","docusign","dovetail","dropbox-plus","elevenlabs","figma","google-ai-pro","google-one","icloud-plus","linktree","lokalise","lovable","microsoft-365-personal","n8n-cloud","notion","obsidian-sync","riverside","shots","showtrust","sketch","strava","teal-plus","testimonial-to","v0","writesonic","ynab","zapier","zoom-pro","capsule-crm","gemini","hubstaff","less-annoying-crm","publer","xero","crisp","folk","livechat","streak-crm","tidio","waalaxy","bigcommerce","brevo","constant-contact","doodle","flickr-pro","freshdesk","leonardo-ai","notta","thinkific","tidal","youcanbookme","admix","anylist-complete","appsheet","baserow-cloud","capcut","chatwoot-cloud","duda","gather-town","homebase","hypefury","lunch-money","mattermost-professional","mealime-pro","metricool","miro","nocodb-cloud","pitch","plan-to-eat","quicken-classic-deluxe","shortcut","sitebulb"],CMP_PAIRS=[["close-crm","pipedrive"],["attio","close-crm"],["close-crm","zoho-crm"],["hootsuite","metricool"],["hootsuite","hypefury"],["attio","pipedrive"],["pipedrive","zoho-crm"],["help-scout","zendesk"],["attio","zoho-crm"],["activecampaign","mailerlite"],["ideogram","leonardo-ai"],["apple-music","spotify-premium"],["apple-music","youtube-music-premium"],["fastmail","superhuman"],["screaming-frog-seo-spider","sitebulb"],["discord-nitro","slack-pro"],["spotify-premium","youtube-music-premium"],["bolt-new","windsurf"],["lovable","windsurf"],["brilliant","duolingo-super"],["canny","dovetail"],["crowdin","lokalise"],["deel","gusto"],["deel","remote-com"],["gusto","remote-com"],["adobe-lightroom","capture-one"],["bolt-new","lovable"],["dropbox-plus","google-one"],["dropbox-plus","icloud-plus"],["dropbox-plus","microsoft-365-personal"],["google-one","icloud-plus"],["google-one","microsoft-365-personal"],["icloud-plus","microsoft-365-personal"],["baserow-cloud","nocodb-cloud"],["hypefury","metricool"]],FA_SET=new Set(FA_SLUGS),CMP_SET=new Set(CMP_PAIRS.map(p=>p.join("-vs-"))),cmpFor=s=>CMP_PAIRS.filter(p=>p.includes(s)),altSelf=(a,x)=>String(x.name||"").toLowerCase().startsWith(String(a.name||"").toLowerCase().split(/\s+/)[0]+" "),ldj=o=>`<script type="application/ld+json">${JSON.stringify(o).replace(/</g,"\\u003c")}<\/script>`,crumbLd=items=>({"@type":"BreadcrumbList",itemListElement:items.map(([n,p],i)=>({"@type":"ListItem",position:i+1,name:n,item:SITE+p}))}),andList=a=>a.length<3?a.join(" and "):a.slice(0,-1).join(", ")+" and "+a[a.length-1],altKind=x=>x.type==="open-source"?"Open source":"Free",altRuns=x=>{let r=(x.facts||{}).runs;if(r==="cloud")return"Hosted for you";if(r==="self-hosted")return"You host it";if(r==="local")return"On your device";if(r==="both")return"Hosted or self-hosted";let h=x.selfHost;return h==="hosted"?"Hosted for you":h==="docker"||h==="ops"?"You host it":h==="one-click"?"One-click install":"\u2014"},plat=x=>(x.platforms||[]).map(p=>({web:"Web",ios:"iPhone",android:"Android",macos:"Mac",mac:"Mac",windows:"Windows",linux:"Linux",desktop:"Desktop",cli:"Command line",docker:"Docker",selfhost:"Your server","self-hosted":"Your server","browser-extension":"Browser extension"})[String(p).toLowerCase()]||String(p)).filter((v,i,a)=>a.indexOf(v)===i).join(", ")||"\u2014",faqHtml=q=>`<div class="faq">${q.map(([a,b])=>`<details><summary>${esc(a)}</summary><p>${esc(b)}</p></details>`).join("")}</div>`,faqLd=q=>({"@type":"FAQPage",mainEntity:q.map(([a,b])=>({"@type":"Question",name:a,acceptedAnswer:{"@type":"Answer",text:b}}))}),mYear=n=>n==null||n<=0?null:n*12;
async function loadApp(db,slug){let r=await db.prepare("SELECT json FROM apps WHERE slug = ? AND disc = 0").bind(slug).first();if(!r)return null;try{let a=JSON.parse(r.json);return a&&a.name?a:null}catch{return null}}
async function freeAltsPage(db,slug){if(!FA_SET.has(slug))return null;let a=await loadApp(db,slug);if(!a)return null;let v=vOf(a.verdict),pr=a.pricing||{},pm=a.priceMonthly,yr=mYear(pm),all=(a.alternatives||[]).filter(x=>x&&x.name),alts=all.filter(x=>!altSelf(a,x)),selfs=all.filter(x=>altSelf(a,x)),os=alts.filter(x=>x.type==="open-source").length,names=alts.map(x=>x.name),lose=(a.whatYouLose||[]).filter(Boolean),checked=pr.tiersCheckedOn||pr.checkedOn||"",pairs=cmpFor(a.slug),n=alts.length;if(n<2)return null;let others=pairs.length?(await db.prepare("SELECT slug,name FROM apps WHERE slug IN (SELECT value FROM json_each(?))").bind(JSON.stringify(pairs.flat().filter(s=>s!==a.slug))).all()).results||[]:[],oname=Object.fromEntries(others.map(o=>[o.slug,o.name])),planTxt=pr.plan?` on the ${pr.plan} plan`:"",
q=[[`Is there a free alternative to ${a.name}?`,`Yes. This page compares ${n}: ${andList(names)}.${os?` ${os===n?"All of them are":os===1?"One of them is":os+" of them are"} open source, so you can run ${os===1?"it":"them"} yourself.`:""}`],[`How much does ${a.name} cost?`,`${perMo(pm)}${planTxt}${pr.basis?` (${pr.basis})`:""}${yr?`, which is ${money2(yr)} a year`:""}.${pr.freeTier?` Free plan: ${pr.freeTier}`:""}${checked?` Prices checked ${fmtDay(checked)}.`:""}`]];if(lose.length)q.push([`What do you give up with a free alternative to ${a.name}?`,`Most often: ${andList(lose.slice(0,4))}. Each alternative on this page lists its own gap under \u201CVersus paying.\u201D`]);q.push([`Can AI build me my own version of ${a.name}?`,`${VL[v]}. ${a.verdictSummary||VM[v]}`]);
let rows=alts.map(x=>`<tr><th scope="row">${esc(x.name)}</th><td>${altKind(x)}</td><td>${esc(altRuns(x))}</td><td>${esc(plat(x))}</td></tr>`).join(""),cards=alts.map(x=>{let u=safeUrl(x.url),f=x.facts||{};return`<div class="alt"><div class="alt-h"><b>${esc(x.name)}</b><span class="tagpill">${altKind(x)}</span></div><p>${esc(x.desc||"")}</p>${f.gapVsPaid?`<p class="small"><b>Versus paying:</b> ${esc(f.gapVsPaid)}</p>`:""}${f.install?`<p class="small muted"><b>Setup:</b> ${esc(f.install)}</p>`:""}${f.setupBlocker?`<p class="small muted"><b>Watch for:</b> ${esc(f.setupBlocker)}</p>`:""}${x.stars?`<p class="small muted">${Number(x.stars).toLocaleString("en-US")} GitHub stars${x.checkedOn?` (checked ${esc(fmtDay(x.checkedOn))})`:""}</p>`:""}${u?`<a class="link-arrow" href="${esc(u)}" rel="nofollow noopener">${esc(host(u))} \u2192</a>`:""}</div>`}).join(""),
body=`<article class="v-${v}"><div class="wrap">
<div class="crumbs"><a href="/">Home</a><span>/</span><a href="/free-alternatives">Free alternatives</a><span>/</span><a href="/apps/${esc(a.slug)}">${esc(a.name)}</a></div>
<header class="vhead"><div><div class="app-id">${icon(a.slug,a.name,"aicon lg")}<span>${esc(a.name)}${a.domain?` <small>${esc(a.domain)}</small>`:""}</span></div><h1>Free alternatives to ${esc(a.name)}</h1><p class="lede">${esc(a.name)} costs ${esc(perMo(pm))}${esc(planTxt)}${yr?`, or ${money2(yr)} a year`:""}. Here ${n===1?"is":"are"} ${n} free ${os?"and open-source ":""}option${n===1?"":"s"}, what each one does, and what you give up compared with paying.</p>
<div class="meta">${checked?`<span>Prices checked ${esc(fmtDay(checked))}</span>`:""}<span>Can AI replace it? <a href="/apps/${esc(a.slug)}"><b>${VL[v]}</b></a></span></div></div></header>
<div class="vbody"><div>
<div class="block" id="glance"><h2><span class="num">01</span>At a glance</h2><div style="overflow-x:auto"><table class="tiers"><thead><tr><th>Alternative</th><th>Type</th><th>Where it runs</th><th>Works on</th></tr></thead><tbody>${rows}</tbody></table></div></div>
<div class="block" id="alts"><h2><span class="num">02</span>Each alternative, in detail</h2><div class="alts">${cards}</div></div>
${selfs.length||pr.freeTier?`<div class="block" id="free-plan"><h2><span class="num">03</span>${esc(a.name)}'s own free plan</h2>${pr.freeTier?`<p>${esc(pr.freeTier)}</p>`:""}${selfs.map(x=>x.desc?`<p class="muted">${esc(x.desc)}</p>`:"").join("")}</div>`:""}
${lose.length?`<div class="block" id="lose"><h2><span class="num">04</span>What you give up by leaving ${esc(a.name)}</h2><div class="warn"><ul>${lose.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>${a.whyPeopleStillPay?`<p class="muted">${esc(a.whyPeopleStillPay)}</p>`:""}</div>`:""}
<div class="block" id="faq"><h2><span class="num">05</span>Questions</h2>${faqHtml(q)}</div>
</div>
<aside class="side">
<div class="panel"><h3>${esc(a.name)} costs</h3><p><span class="big-money">${esc(perMo(pm))}</span></p>${yr?`<p class="small muted">${money2(yr)} a year at that price</p>`:""}<a class="btn small" href="/apps/${esc(a.slug)}">Can AI replace ${esc(a.name)}?</a></div>
${pairs.length?`<div class="panel"><h3>Compare</h3><ul class="toc">${pairs.map(p=>{let o=p[0]===a.slug?p[1]:p[0];return oname[o]?`<li><a href="/compare/${p.join("-vs-")}">${esc(a.name)} vs ${esc(oname[o])}</a></li>`:""}).join("")}</ul></div>`:""}
<div class="panel"><h3>Add up what you pay</h3><p class="small muted">List every subscription and see what a year costs you.</p><a class="btn small ghost" href="/savings?add=${esc(a.slug)}">Open the calculator</a></div>
</aside></div></div>
<div class="wrap">${CREDIT}<section>${signup()}</section></div></article>`,path="/free-alternatives/"+a.slug,jsonld=ldj({"@context":"https://schema.org","@graph":[crumbLd([["Home","/"],["Free alternatives","/free-alternatives"],[`Free alternatives to ${a.name}`,path]]),{"@type":"ItemList",name:`Free alternatives to ${a.name}`,numberOfItems:n,itemListElement:alts.map((x,i)=>({"@type":"ListItem",position:i+1,name:x.name,...(safeUrl(x.url)?{url:x.url}:{})}))},faqLd(q)]});
return layout({title:`Free ${a.name} alternatives: ${n} options compared`,desc:`${a.name} costs ${perMo(pm)}. Compare ${n} free${os?" and open-source":""} alternatives, including ${andList(names.slice(0,3))}: what each does and what you give up.`.slice(0,300),path,body,jsonld,ogType:"article",og:"/og-apps.png"})}
async function comparePage(db,s1,s2){let key=s1+"-vs-"+s2;if(!CMP_SET.has(key))return null;let[a,b]=await Promise.all([loadApp(db,s1),loadApp(db,s2)]);if(!a||!b)return null;let ap=a.priceMonthly,bp=b.priceMonthly,va=vOf(a.verdict),vb=vOf(b.verdict),pa=a.pricing||{},pb=b.pricing||{},na=(a.alternatives||[]).filter(x=>x&&x.name&&!altSelf(a,x)),nb=(b.alternatives||[]).filter(x=>x&&x.name&&!altSelf(b,x)),shared=na.filter(x=>nb.some(y=>y.name.toLowerCase()===x.name.toLowerCase())),price="";
if(ap!=null&&bp!=null&&ap>0&&bp>0){if(ap===bp)price=`${a.name} and ${b.name} both list at ${perMo(ap)}.`;else{let[c,e,cp,ep]=ap<bp?[a,b,ap,bp]:[b,a,bp,ap];price=`${c.name} lists at ${perMo(cp)} and ${e.name} at ${perMo(ep)}, so ${c.name} costs ${money2((ep-cp)*12)} less a year at listed prices.`}let an=/annual/i.test(pa.basis||""),bn=/annual/i.test(pb.basis||"");if(price&&an!==bn)price+=` ${(an?a:b).name}'s price assumes annual billing; ${(an?b:a).name}'s is month to month.`}
let q=[];if(price)q.push([`Is ${a.name} cheaper than ${b.name}?`,price+` The plans compared are ${a.name} ${pa.plan||"(listed plan)"} and ${b.name} ${pb.plan||"(listed plan)"}; they don't include the same things, so check both pricing pages.`]);q.push([`Can AI replace ${a.name} or ${b.name}?`,`${a.name}: ${VL[va]}. ${a.verdictSummary||VM[va]} ${b.name}: ${VL[vb]}. ${b.verdictSummary||VM[vb]}`]);q.push([`Are there free alternatives to ${a.name} and ${b.name}?`,shared.length?`Yes. ${andList(shared.map(x=>x.name))} ${shared.length===1?"is listed as a free alternative to both":"are listed as free alternatives to both"}.`:`Yes. We list ${na.length} for ${a.name} and ${nb.length} for ${b.name}; none appears on both lists.`]);
let row=(label,f)=>`<tr><th scope="row">${label}</th><td>${f(a,pa)}</td><td>${f(b,pb)}</td></tr>`,
table=[row("Listed price",(x)=>esc(perMo(x.priceMonthly))),row("Per year",(x)=>{let y=mYear(x.priceMonthly);return y?money2(y):"\u2014"}),row("Plan compared",(x,p)=>esc(p.plan||"\u2014")),row("Billing",(x,p)=>esc(p.basis||"\u2014")),row("Free plan",(x,p)=>{let t=(p.tiers||[]).find(t=>t&&t.monthly===0&&t.name);return esc(p.freeTier||(t?"Yes: "+t.name+(t.limits?". "+t.limits:""):"None listed"))}),row("Can AI replace it?",(x)=>`<a href="/apps/${esc(x.slug)}">${VL[vOf(x.verdict)]}</a>`),row("Build time with AI",(x)=>esc(x.diyTimeEstimate||"\u2014")),row("Free alternatives listed",(x)=>{let k=(x.alternatives||[]).filter(y=>y&&y.name&&!altSelf(x,y)).length;return FA_SET.has(x.slug)?`<a href="/free-alternatives/${esc(x.slug)}">${k}</a>`:String(k)}),row("Prices checked",(x,p)=>esc(fmtDay(p.tiersCheckedOn||p.checkedOn||"")||"\u2014"))].join(""),
side=(x,al)=>`<div class="panel"><div class="app-id">${icon(x.slug,x.name,"aicon")}<b>${esc(x.name)}</b> ${stamp2(vOf(x.verdict))}</div><p>${esc(x.verdictSummary||"")}</p>${(x.whatYouLose||[]).length?`<p class="small muted"><b>Leaving means giving up:</b> ${esc(andList(x.whatYouLose.slice(0,4)))}.</p>`:""}${al.length?`<p class="small"><b>Free options:</b> ${esc(andList(al.slice(0,3).map(y=>y.name)))}.</p>`:""}<p><a class="link-arrow" href="/apps/${esc(x.slug)}">Full ${esc(x.name)} verdict \u2192</a>${FA_SET.has(x.slug)?`<br><a class="link-arrow" href="/free-alternatives/${esc(x.slug)}">All free alternatives to ${esc(x.name)} \u2192</a>`:""}</p></div>`,
path="/compare/"+key,body=`<article><div class="wrap">
<div class="crumbs"><a href="/">Home</a><span>/</span><a href="/compare">Compare</a><span>/</span><span>${esc(a.name)} vs ${esc(b.name)}</span></div>
<div class="page-head"><span class="eyebrow">${esc(catName(a.category))}</span><h1>${esc(a.name)} vs ${esc(b.name)}</h1><p class="lede">${esc(price||`Here is how ${a.name} and ${b.name} compare.`)} Below: prices, free plans, whether AI can replace each one, and the free alternatives.</p></div>
<div class="block" id="table"><h2><span class="num">01</span>Side by side</h2><div style="overflow-x:auto"><table class="tiers"><thead><tr><th></th><th>${esc(a.name)}</th><th>${esc(b.name)}</th></tr></thead><tbody>${table}</tbody></table></div><p class="small muted">Each column uses the plan that app's page lists. Plans include different things, so read both pricing pages before you switch.</p></div>
<div class="block" id="short"><h2><span class="num">02</span>The short version</h2><div class="two">${side(a,na)}${side(b,nb)}</div></div>
${shared.length?`<div class="block" id="both"><h2><span class="num">03</span>Free alternatives to both</h2><div class="alts">${shared.map(x=>{let u=safeUrl(x.url);return`<div class="alt"><div class="alt-h"><b>${esc(x.name)}</b><span class="tagpill">${altKind(x)}</span></div><p>${esc(x.desc||"")}</p>${u?`<a class="link-arrow" href="${esc(u)}" rel="nofollow noopener">${esc(host(u))} \u2192</a>`:""}</div>`}).join("")}</div></div>`:""}
<div class="block" id="faq"><h2><span class="num">04</span>Questions</h2>${faqHtml(q)}</div>
${CREDIT}<section>${signup()}</section></div></article>`,jsonld=ldj({"@context":"https://schema.org","@graph":[crumbLd([["Home","/"],["Compare","/compare"],[`${a.name} vs ${b.name}`,path]]),faqLd(q)]});
return layout({title:`${a.name} vs ${b.name}: price, free plans and alternatives`,desc:`${price?price+" ":""}Compare ${a.name} and ${b.name}: free plans, whether AI can replace each, and free alternatives.`.slice(0,300),path,body,jsonld,ogType:"article",og:"/og-apps.png"})}
async function hubRows(db,slugs){let r=[];for(let i=0;i<slugs.length;i+=90){r=r.concat((await db.prepare("SELECT slug,name,category,price,verdict,alts FROM apps WHERE disc = 0 AND slug IN (SELECT value FROM json_each(?))").bind(JSON.stringify(slugs.slice(i,i+90))).all()).results||[])}return r}
async function faHub(db){let rows=await hubRows(db,FA_SLUGS),by={};for(let r of rows)(by[r.category]=by[r.category]||[]).push(r);let cats=Object.keys(by).sort((x,y)=>catName(x).localeCompare(catName(y))),body=`<div class="wrap"><div class="page-head"><span class="eyebrow">${rows.length} paid apps</span><h1>Free alternatives to <span class="serif">the apps you pay for.</span></h1><p class="lede">Pick an app to see its free and open-source alternatives side by side, what each one does, and what you give up compared with paying.</p><p class="small"><a class="link-arrow" href="/compare">Or compare two paid apps \u2192</a></p></div>
${cats.map(c=>`<section class="block"><h2>${esc(catName(c))}</h2><ul class="toc">${by[c].sort((x,y)=>x.name.localeCompare(y.name)).map(r=>`<li><a href="/free-alternatives/${esc(r.slug)}">Free alternatives to ${esc(r.name)}</a> <span class="small muted">\xB7 ${esc(perMo(r.price))}</span></li>`).join("")}</ul></section>`).join("")}
${CREDIT}<section>${signup()}</section></div>`;return layout({title:"Free alternatives to popular paid apps",desc:`Free and open-source alternatives to ${rows.length} paid apps, with what each one costs you and what you give up.`,path:"/free-alternatives",body,jsonld:ldj({"@context":"https://schema.org","@graph":[crumbLd([["Home","/"],["Free alternatives","/free-alternatives"]])]}),og:"/og-apps.png"})}
async function cmpHub(db){let rows=await hubRows(db,[...new Set(CMP_PAIRS.flat())]),nm=Object.fromEntries(rows.map(r=>[r.slug,r])),ps=CMP_PAIRS.filter(p=>nm[p[0]]&&nm[p[1]]),by={};for(let p of ps)(by[nm[p[0]].category]=by[nm[p[0]].category]||[]).push(p);let cats=Object.keys(by).sort((x,y)=>catName(x).localeCompare(catName(y))),body=`<div class="wrap"><div class="page-head"><span class="eyebrow">${ps.length} comparisons</span><h1>Compare paid apps <span class="serif">side by side.</span></h1><p class="lede">Price per month and per year, free plans, whether AI can replace each one, and the free alternatives to both.</p><p class="small"><a class="link-arrow" href="/free-alternatives">Free alternatives to 150 apps \u2192</a></p></div>
${cats.map(c=>`<section class="block"><h2>${esc(catName(c))}</h2><ul class="toc">${by[c].map(p=>`<li><a href="/compare/${p.join("-vs-")}">${esc(nm[p[0]].name)} vs ${esc(nm[p[1]].name)}</a></li>`).join("")}</ul></section>`).join("")}
${CREDIT}<section>${signup()}</section></div>`;return layout({title:"Compare paid apps side by side",desc:"Side-by-side comparisons of popular paid apps: price, free plans, whether AI can replace them, and free alternatives.",path:"/compare",body,jsonld:ldj({"@context":"https://schema.org","@graph":[crumbLd([["Home","/"],["Compare","/compare"]])]}),og:"/og-apps.png"})}
async function appPage(db,slug){let[row2,brow]=await Promise.all([db.prepare("SELECT json FROM apps WHERE slug = ?").bind(slug).first(),db.prepare("SELECT json FROM builds WHERE slug = ?").bind(slug).first().catch(()=>null)]);if(!row2)return null;let a;try{a=JSON.parse(row2.json)}catch{return null}let v=vOf(a.verdict),pr=a.pricing||{},rel=(a.relatedSlugs||[]).slice(0,6),related=rel.length?(await db.prepare(`SELECT slug,name,category,tagline,price,verdict,summary FROM apps WHERE slug IN (${rel.map(()=>"?").join(",")})`).bind(...rel).all()).results||[]:[],year=a.priceMonthly!=null?a.priceMonthly*12:null,tiers=(pr.tiers||[]).filter(t=>t&&t.name),alts=(a.alternatives||[]).filter(x=>x&&x.name),src=safeUrl(pr.source),body=`<article class="v-${v}"><div class="wrap">
<div class="crumbs"><a href="/">Home</a><span>/</span><a href="/apps">Paid apps</a><span>/</span><a href="/apps?cat=${esc(a.category)}">${esc(catName(a.category))}</a></div>
<header class="vhead"><div><div class="app-id">${icon(a.slug,a.name,"aicon lg")}<span>${esc(a.name)}${a.domain?` <small>${esc(a.domain)}</small>`:""}</span></div><h1>Can AI replace ${esc(a.name)}?</h1><p class="lede">${esc(a.verdictSummary||"")}</p>
<div class="meta"><span>Verdict: <b>${VL[v]}</b> \xB7 ${VM[v]}</span>${a.diyTimeEstimate?`<span>Build time: ${esc(a.diyTimeEstimate)}</span>`:""}${a.discontinued?"<span><b>Discontinued</b></span>":""}</div>${v!=="nah"?`<p class="small muted" style="margin:14px 0 0">Replacing a paid app means you set it up and keep it running: hosting, updates and backups can be on you.${(a.whatYouLose||[]).length?' <a href="#lose">What you give up</a>.':""}</p>`:""}</div>
${stamp2(v).replace('class="stamp','class="stamp big stamp-in')}</header>
<div class="vbody"><div>
<div class="block" id="cost"><h2><span class="num">01</span>What it costs</h2>
<div class="costbox"><div><span class="big-money">${perMo(a.priceMonthly)}</span><span class="muted">${esc([pr.plan,pr.basis].filter(Boolean).join(", "))}</span></div>${year!=null&&year>0?`<div><span class="big-money">${money2(year)}</span><span class="muted">per year at that price</span></div>`:""}</div>
<p class="small muted">Checked ${esc(fmtDay(pr.tiersCheckedOn||pr.checkedOn||""))}${src?` \xB7 source: <a href="${esc(src)}" rel="nofollow noopener">${esc(host(src))}</a>`:""}. ${esc(pr.freeTier||"")}</p>
${tiers.length?`<table class="tiers"><thead><tr><th>Plan</th><th>Monthly</th><th>Billed yearly</th><th>What you get</th></tr></thead><tbody>${tiers.map(t=>`<tr><td>${esc(t.name)}</td><td class="p">${t.monthly==null?"\u2014":money2(t.monthly)}</td><td>${t.annualPerMonth==null?"\u2014":t.annualPerMonth===0?"Free":money2(t.annualPerMonth)+"/mo"}</td><td>${esc(t.limits||"")}</td></tr>`).join("")}</tbody></table>`:""}
${pr.hiddenCosts?`<p class="note"><b>Hidden costs:</b> ${esc(pr.hiddenCosts)}</p>`:""}</div>
<div class="block" id="build"><h2><span class="num">02</span>Could AI build it for you?</h2>
${a.coreLoopDIY?`<p><b>The core job:</b> ${esc(a.coreLoopDIY)}</p>`:""}
${(a.requirements||[]).length?`<p><b>What a working version needs:</b></p><ul class="chips-list">${a.requirements.map(r=>`<li>${esc(r)}</li>`).join("")}</ul>`:""}
${a.notes?`<p class="note">${esc(a.notes)}</p>`:""}${brow&&v!=="nah"?`<script type="application/json" id="bspec" data-name="${esc(a.name)}" data-v="${v}">${String(brow.json).replace(/</g,"\\u003c")}<\/script><script src="/k/build.js?v=${BUILD_V}" defer><\/script>`:""}</div>
${(a.whatYouLose||[]).length?`<div class="block" id="lose"><h2><span class="num">03</span>What you'd give up</h2><div class="warn"><ul>${a.whatYouLose.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>${a.whyPeopleStillPay?`<p class="muted">${esc(a.whyPeopleStillPay)}</p>`:""}</div>`:""}
${alts.length?`<div class="block" id="alts"><h2><span class="num">04</span>Free and cheaper alternatives</h2><div class="alts">${alts.slice(0,8).map(x=>{let u=safeUrl(x.url);return`<div class="alt"><div class="alt-h"><b>${esc(x.name)}</b>${x.type?`<span class="tagpill">${esc(x.type)}</span>`:""}</div><p>${esc(x.desc||"")}</p>${x.facts?.gapVsPaid?`<p class="small muted"><b>Versus paying:</b> ${esc(x.facts.gapVsPaid)}</p>`:""}${u?`<a class="link-arrow" href="${esc(u)}" rel="nofollow noopener">${esc(host(u))} \u2192</a>`:""}</div>`}).join("")}</div>${FA_SET.has(a.slug)?`<p style="margin:16px 0 0"><a class="link-arrow" href="/free-alternatives/${esc(a.slug)}">Compare the free alternatives to ${esc(a.name)} side by side →</a></p>`:""}</div>`:""}
<div class="spon-in" style="margin:0 0 36px">${sponsorSlot(`Featured alternative to ${esc(a.name)}.`,"A labeled card for one relevant tool.",[["directory",""]])}</div>
${a.prompt?`<div class="block" id="prompt"><h2><span class="num">05</span>The build prompt</h2>${v==="nah"?'<p class="muted">Read the verdict first: this one is hard to get right.</p>':""}<div class="lock"><p class="lock-tease" aria-hidden="true">${esc(String(a.prompt).split(/\s+/).slice(0,24).join(" "))}\u2026</p><div class="lock-cta"><b>Get the Build Kit for ${esc(a.name)}</b><p>The complete build prompt, plus 11 step-by-step prompts from research to launch, a design system file, a page-by-page spec, the data model and a launch checklist.</p><a class="btn" href="/buy/kit?app=${esc(a.slug)}">Get the Build Kit \xB7 $9 \u2192</a><p class="small muted">One-time payment. Delivered on screen and by email.</p></div></div></div>`:""}
${(a.priorArt||[]).length?`<div class="block"><h2><span class="num">06</span>Free open-source starting points</h2><ul class="why">${a.priorArt.map(x=>{let u=safeUrl(x.url);return`<li><span>${u?`<a href="${esc(u)}" rel="nofollow noopener"><b>${esc(x.name)}</b></a>`:`<b>${esc(x.name)}</b>`}: ${esc(x.desc||"")}</span></li>`}).join("")}</ul></div>`:""}
</div>
<aside class="side">
<div class="panel"><h3>On this page</h3><ul class="toc"><li><a href="#cost">What it costs</a></li><li><a href="#build">Could AI build it?</a></li>${(a.whatYouLose||[]).length?'<li><a href="#lose">What you give up</a></li>':""}${alts.length?'<li><a href="#alts">Free alternatives</a></li>':""}${a.prompt?'<li><a href="#prompt">Build prompt</a></li>':""}</ul></div>
${(()=>{let cp=cmpFor(a.slug).map(p=>{let o=p[0]===a.slug?p[1]:p[0],r=related.find(x=>x.slug===o);return r?`<li><a href="/compare/${p.join("-vs-")}">${esc(a.name)} vs ${esc(r.name)}</a></li>`:""}).join("");return cp?`<div class="panel"><h3>Compare</h3><ul class="toc">${cp}</ul></div>`:""})()}<div class="panel"><h3>Add up what you pay</h3><p class="small muted">List every subscription and see what a year costs you.</p><a class="btn small" href="/savings?add=${esc(a.slug)}">Open the calculator</a></div>
<div class="panel"><h3>See something wrong?</h3><p class="small muted">Prices change. Tell us and we'll re-check.</p><a class="btn small ghost" href="/submit?task=${encodeURIComponent("Correction for "+a.name)}">Report it</a></div>
</aside></div></div>
${related.length?`<div class="wrap related"><div class="sec-head"><h2>Similar <span class="serif">apps</span></h2><a class="link-arrow" href="/apps?cat=${esc(a.category)}">All ${esc(catName(a.category))} \u2192</a></div><div class="vgrid">${related.map(appCard).join("")}</div></div>`:""}
<div class="wrap">${CREDIT}<section>${signup()}</section></div></article>`,jsonld=`<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:[{"@type":"Question",name:`Can AI replace ${a.name}?`,acceptedAnswer:{"@type":"Answer",text:`${VL[v]}. ${a.verdictSummary||""}`}}]}).replace(/</g,"\\u003c")}<\/script>`;return layout({title:`Can AI replace ${a.name}?`,desc:`${VL[v]}: ${a.verdictSummary||""} ${a.name} costs ${perMo(a.priceMonthly)}. Free alternatives and a step-by-step Build Kit.`.slice(0,300),path:"/apps/"+a.slug,body,jsonld,ogType:"article",og:"/og-apps.png"})}function savingsPage(){let body=`<div class="wrap"><div class="page-head"><span class="eyebrow">Calculator</span><h1>What do your subscriptions <span class="serif">really cost?</span></h1><p class="lede">Add the apps you pay for. We total the year using each app's listed monthly price, then show which ones AI can replace and how many free alternatives exist.</p></div>
<div class="calc" data-calc><div class="calc-in"><label for="cq"><b>Add an app</b></label><div class="search" data-appsearch><div class="inline-in"><input id="cq" type="search" autocomplete="off" placeholder="Type an app, like \u201CCanva\u201D" role="combobox" aria-expanded="false" aria-controls="cq-list"></div><ul class="results" id="cq-list" role="listbox"></ul></div>
<p class="small muted">Prices are the listed monthly plan price on the date shown on each app page. Your plan may differ; edit any amount.</p>
<ul class="calc-list" aria-live="polite"></ul></div>
<div class="calc-out panel"><span class="small muted">Per year</span><div class="big-money" data-total>$0</div><div class="calc-split"><div><b data-rep>$0</b><span>on apps AI can build (Bot)</span></div><div><b data-part>$0</b><span>on Half-bot apps</span></div></div><p class="small muted" data-count>No apps added yet.</p><button class="btn small ghost" type="button" data-clear>Clear list</button></div></div>
<section>${sponsorSlot("Sponsor the savings calculator.","One labeled card for people deciding what to cancel.",[["savings",""]])}</section>
<noscript><p class="note">The calculator needs JavaScript. You can still browse <a href="/apps">every app and its price</a>.</p></noscript>
${CREDIT}</div>`;return layout({title:"Subscription savings calculator",desc:"Add the apps you pay for and see what a year really costs, which ones AI can replace, and the free alternatives.",path:"/savings",body,og:"/og-apps.png"})}async function buildsGallery(db,page2,only){let p=Math.max(1,page2|0),rows=only?(await db.prepare("SELECT b.slug, b.json, a.name, a.verdict FROM builds b JOIN apps a ON a.slug = b.slug WHERE b.slug = ?").bind(only).all()).results||[]:(await db.prepare(`SELECT b.slug, b.json, a.name, a.verdict FROM builds b JOIN apps a ON a.slug = b.slug ORDER BY b.slug LIMIT 12 OFFSET ${(p-1)*12}`).all()).results||[],n=(await db.prepare("SELECT COUNT(*) n FROM builds").first())?.n||0,body=`<div class="wrap"><div class="page-head"><span class="eyebrow">Review</span><h1>Build previews</h1><p class="lede">${n} previews. Page ${p} of ${Math.ceil(n/12)}.</p></div>
<div class="bg-grid">${rows.map((r,i)=>`<figure class="bg-it"><figcaption><b>${(p-1)*12+i+1}. <a href="/apps/${esc(r.slug)}">${esc(r.name)}</a></b> \xB7 ${esc(VL[vOf(r.verdict)])} \xB7 <code>${esc(JSON.parse(r.json).e)}</code></figcaption><div data-bspec="${esc(r.json)}" data-key="${esc(r.slug)}"></div></figure>`).join("")}</div>
<nav class="pager">${p>1?`<a class="btn small ghost" href="/x/builds?p=${p-1}">\u2190 Prev</a>`:""} ${p*12<n?`<a class="btn small" href="/x/builds?p=${p+1}">Next \u2192</a>`:""}</nav></div><script src="/k/build.js?v=${BUILD_V}" defer><\/script>`;return layout({title:"Build previews",desc:"Review gallery",path:"/x/builds",body,noindex:!0})}var GH="https://api.github.com/repos/kevmaestro/botornah/git/trees/",H={"user-agent":"botornah-sync",accept:"application/vnd.github+json"},BATCH=30;async function meta(db,k){let r=await db.prepare("SELECT v FROM meta WHERE k = ?").bind(k).first();return r?r.v:null}var setMeta=(db,k,v)=>db.prepare("INSERT INTO meta (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v").bind(k,String(v));async function tree(sha){let r=await fetch(GH+sha,{headers:H});if(!r.ok)throw new Error("github tree "+r.status);return(await r.json()).tree||[]}async function listSlugs(){let data=(await tree(DATA_SHA)).find(t=>t.path==="data"&&t.type==="tree"),apps=(await tree(data.sha)).find(t=>t.path==="apps"&&t.type==="tree");return(await tree(apps.sha)).filter(t=>t.type==="blob"&&t.path.endsWith(".json")).map(t=>t.path.slice(0,-5)).sort()}var row=(a,text)=>[a.slug,a.name,a.category||null,a.subcategory||null,a.tagline||null,typeof a.priceMonthly=="number"?a.priceMonthly:null,a.verdict||null,a.verdictSummary||null,a.diyTimeEstimate||null,typeof a.pagePriority=="number"?a.pagePriority:0,a.discontinued?1:0,(a.alternatives||[]).length,text];async function syncStep(env){let db=env.DB1,now2=Math.floor(Date.now()/1e3);if(await db.prepare("DELETE FROM live WHERE ts < ?").bind(now2-86400).run(),await meta(db,"sync_done")===DATA_SHA)return{done:!0};let list=await meta(db,"sync_list");if(!list){let slugs=await listSlugs();return await setMeta(db,"sync_list",JSON.stringify(slugs)).run(),await setMeta(db,"sync_pos",0).run(),{listed:slugs.length}}list=JSON.parse(list);let pos=parseInt(await meta(db,"sync_pos")||"0",10),part=list.slice(pos,pos+BATCH),got=await Promise.all(part.map(async s=>{try{let r=await fetch(`${RAW}/data/apps/${encodeURIComponent(s)}.json`);if(!r.ok)return null;let t=await r.text(),a=JSON.parse(t);return a&&a.slug&&a.name?row(a,t):null}catch{return null}})),stmt=db.prepare("INSERT OR REPLACE INTO apps (slug,name,category,sub,tagline,price,verdict,summary,diy,priority,disc,alts,json) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"),ok=got.filter(Boolean),failed=part.length-ok.length,ops=ok.map(r=>stmt.bind(...r)),next=failed>part.length/2?pos:pos+part.length;return ops.push(setMeta(db,"sync_pos",next)),next>=list.length&&ops.push(setMeta(db,"sync_done",DATA_SHA)),await db.batch(ops),{pos:next,of:list.length,wrote:ok.length,failed}}var RV_MODEL="@cf/meta/llama-3.3-70b-instruct-fp8-fast",RV_DAY_CAP=400,RV_IP_CAP=6,RV_UA="BotOrNahReverse/1.0 (+https://botornah.com/reverse)",rvRid=n=>[...crypto.getRandomValues(new Uint8Array(n))].map(b=>b.toString(16).padStart(2,"0")).join(""),rvNow=()=>new Date().toISOString(),rvHead=(eyebrow,h1,lede)=>`<div class="page-head"><span class="eyebrow">${eyebrow}</span><h1>${h1}</h1><p class="lede">${lede}</p></div>`,RV_VL={bot:"Bot",half:"Half-bot",nah:"Nah"},RV_VM={bot:"An AI coding tool can build a working first version",half:"AI gets you a good start; some parts need real engineering",nah:"Too complex to build well with AI alone"};function cleanUrl(input){let s=String(input||"").trim().slice(0,500);if(!s)return null;/^[\w.-]+\/[\w.-]+$/.test(s)&&!s.includes(".")&&(s="https://github.com/"+s),/^https?:\/\//i.test(s)||(s="https://"+s);let u;try{u=new URL(s)}catch{return null}if(!/^https?:$/.test(u.protocol)||u.username||u.password||u.port&&!["80","443"].includes(u.port))return null;let h=u.hostname.toLowerCase();return!h.includes(".")||/(^|\.)(localhost|local|internal|lan|home|corp)$/.test(h)||/^[\d.]+$/.test(h)||h.includes(":")||h.startsWith("[")?null:(u.hash="",u.hostname=h,u)}var rvKeyOf=u=>{let gh=rvGhRepo(u);return gh?`gh:${gh.o}/${gh.r}`.toLowerCase():(u.hostname.replace(/^www\./,"")+u.pathname.replace(/\/+$/,"")).toLowerCase()};function rvGhRepo(u){if(!/^(www\.)?github\.com$/.test(u.hostname))return null;let m=u.pathname.match(/^\/([\w.-]+)\/([\w.-]+?)(?:\.git)?(?:\/|$)/);return m?{o:m[1],r:m[2]}:null}var RV_ENT={amp:"&",lt:"<",gt:">",quot:'"',"#39":"'",apos:"'",nbsp:" ",mdash:"\u2014",ndash:"\u2013",rsquo:"\u2019",lsquo:"\u2018",rdquo:"\u201D",ldquo:"\u201C",hellip:"\u2026"},rvDecode=s=>String(s).replace(/&(#x?[0-9a-f]+|\w+);/gi,(m,e)=>{if(e[0]==="#"){let n=e[1]==="x"||e[1]==="X"?parseInt(e.slice(2),16):parseInt(e.slice(1),10);return n>0&&n<1114112?String.fromCodePoint(n):""}return RV_ENT[e.toLowerCase()]??m}),rvTxt=s=>rvDecode(String(s).replace(/<[^>]+>/g," ")).replace(/\s+/g," ").trim(),rvUniq=a=>[...new Set(a.filter(Boolean))];async function rvGrab(url,max=4e5,ms=8e3){let ac=new AbortController,t=setTimeout(()=>ac.abort(),ms);try{let r=await fetch(url,{headers:{"user-agent":RV_UA,accept:"text/html,text/css,text/plain,application/json;q=0.9"},redirect:"follow",signal:ac.signal});if(!r.ok)return{status:r.status,text:""};let reader=r.body.getReader(),chunks=[],n=0;for(;n<max;){let{done:done2,value}=await reader.read();if(done2)break;chunks.push(value),n+=value.length}try{reader.cancel()}catch{}let buf=new Uint8Array(Math.min(n,max)),o=0;for(let c of chunks){let k=Math.min(c.length,buf.length-o);if(buf.set(c.subarray(0,k),o),o+=k,o>=buf.length)break}return{status:r.status,type:r.headers.get("content-type")||"",url:r.url,text:new TextDecoder().decode(buf)}}catch(e){return{status:0,text:"",err:String(e)}}finally{clearTimeout(t)}}function rvColorsFrom(css){let count2={};for(let m of css.matchAll(/#([0-9a-f]{6}|[0-9a-f]{3})\b/gi)){let h=m[1].toLowerCase();h.length===3&&(h=h.split("").map(c=>c+c).join("")),count2[h]=(count2[h]||0)+1}for(let m of css.matchAll(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/gi)){let h=[m[1],m[2],m[3]].map(x=>Math.min(255,+x).toString(16).padStart(2,"0")).join("");count2[h]=(count2[h]||0)+1}return Object.entries(count2).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([h])=>"#"+h)}function rvFontsFrom(css,html2){let f=[];for(let m of(html2+css).matchAll(/fonts\.googleapis\.com\/css2?\?([^"')\s]+)/gi))for(let fm of m[1].matchAll(/family=([^:&]+)/g))f.push(decodeURIComponent(fm[1]).replace(/\+/g," "));for(let m of css.matchAll(/font-family\s*:\s*([^;}{]+)/gi)){let first=m[1].split(",")[0].replace(/["']/g,"").trim();first&&!/^(var\(|inherit|initial|unset|sans-serif|serif|monospace|system-ui|-apple-system|ui-)/i.test(first)&&first.length<40&&f.push(first)}return rvUniq(f).slice(0,4)}async function rvWebsiteEvidence(u){let page2=await rvGrab(u.toString());if(!page2.text)return{error:page2.status?`That site blocked our scan (status ${page2.status}). Try its home page, or a different address for it.`:"We couldn't reach that site. Check the address and try again."};if(page2.type&&!/html|text\/plain/i.test(page2.type))return{error:"That link isn't a web page."};let html2=page2.text,pick=re=>{let m=html2.match(re);return m?rvTxt(m[1]):""},meta2=name=>pick(new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]*content=["']([^"']*)`,"i"))||pick(new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:name|property)=["']${name}["']`,"i")),body=html2.replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ").replace(/<noscript[\s\S]*?<\/noscript>/gi," ").replace(/<svg[\s\S]*?<\/svg>/gi," "),all=re=>[...body.matchAll(re)].map(m=>rvTxt(m[m.length-1])),css=[...html2.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m=>m[1]).join(`
`)+" "+[...html2.matchAll(/style=["']([^"']+)["']/gi)].map(m=>m[1]).join(";"),sheets=[...html2.matchAll(/<link[^>]+rel=["'][^"']*stylesheet[^"']*["'][^>]*>/gi)].map(m=>(m[0].match(/href=["']([^"']+)/i)||[])[1]).filter(Boolean).slice(0,2);for(let href of sheets)try{let su=new URL(rvDecode(href),page2.url||u);if(/^https?:$/.test(su.protocol)&&!/fonts\.googleapis/.test(su.hostname)){let s=await rvGrab(su.toString(),3e5,5e3);css+=`
`+s.text}}catch{}let heads=all(/<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi).filter(t=>t.length>1&&t.length<140),links=rvUniq(all(/<a\b[^>]*>([\s\S]*?)<\/a>/gi).filter(t=>t.length>1&&t.length<32)).slice(0,30),buttons=rvUniq(all(/<button\b[^>]*>([\s\S]*?)<\/button>/gi).filter(t=>t.length>1&&t.length<32)).slice(0,12),text=rvTxt(body).slice(0,2400),low=(text+" "+links.join(" ")).toLowerCase();return{type:"website",url:page2.url||u.toString(),host:u.hostname.replace(/^www\./,""),title:pick(/<title[^>]*>([\s\S]*?)<\/title>/i).slice(0,160),description:(meta2("description")||meta2("og:description")).slice(0,300),siteName:meta2("og:site_name").slice(0,80),headings:rvUniq(heads).slice(0,20),nav:links,buttons,forms:(body.match(/<form\b/gi)||[]).length,inputs:(body.match(/<input\b/gi)||[]).length,signals:["pricing","login","sign up","sign in","cart","checkout","dashboard","blog","docs","api","book","subscribe"].filter(k=>low.includes(k)),colors:rvColorsFrom(css),fonts:rvFontsFrom(css,html2),text}}async function rvRepoEvidence(gh){let api2=`https://api.github.com/repos/${gh.o}/${gh.r}`,[meta2,readme,tree2]=await Promise.all([rvGrab(api2,2e5,6e3),rvGrab(`https://raw.githubusercontent.com/${gh.o}/${gh.r}/HEAD/README.md`,6e4,6e3),rvGrab(api2+"/contents",2e5,6e3)]),m={};try{m=JSON.parse(meta2.text||"{}")}catch{}let files=[];try{files=JSON.parse(tree2.text||"[]").map(f=>f.type==="dir"?f.name+"/":f.name).slice(0,60)}catch{}if(!m.full_name||!files.length){let pg=await rvGrab(`https://github.com/${gh.o}/${gh.r}`,9e5,8e3),t=pg.text||"";if(t){let d=(t.match(/<meta property="og:description" content="([^"]*)"/)||[])[1];if(d&&!m.description){d=d.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/ - [^ \/]+\/[^ ]+$/,"");if(!/^Contribute to /.test(d))m.description=d}let lic=(t.match(/"license":\{"spdxId":"([^"]+)"/)||[])[1];if(lic&&lic!=="NOASSERTION"&&!m.license)m.license={spdx_id:lic};if(!files.length)files=[...t.matchAll(/"path":"([^"\/]+)","contentType":"(file|directory)"/g)].map(x=>x[2]==="directory"?x[1]+"/":x[1]).filter((x,i,a)=>a.indexOf(x)===i).slice(0,60)}}return!m.full_name&&!readme.text?{error:"We couldn't read that repository. Is it public?"}:{type:"repo",url:`https://github.com/${gh.o}/${gh.r}`,host:"github.com",repo:`${gh.o}/${gh.r}`,title:m.full_name||`${gh.o}/${gh.r}`,description:String(m.description||"").slice(0,300),language:m.language||"",topics:(m.topics||[]).slice(0,12),stars:m.stargazers_count??null,license:m.license?.spdx_id||"",files,readme:readme.text.replace(/<[^>]+>/g," ").replace(/!\[[^\]]*\]\([^)]*\)/g,"").slice(0,6e3)}}async function rvAsk(env,system,user,maxTokens,bg){let r=await aiRun(env,RV_MODEL,{messages:[{role:"system",content:system},{role:"user",content:user}],max_tokens:maxTokens,temperature:.3},void 0,{kind:"reverse",bg}),out=typeof r=="string"?r:r?.response??r?.result?.response??r?.choices?.[0]?.message?.content??r?.result?.choices?.[0]?.message?.content??"";return typeof out=="string"?out:JSON.stringify(out)}function rvLooseJson(s){let a=s.indexOf("{"),b=s.lastIndexOf("}");if(a<0||b<=a)return null;let t=s.slice(a,b+1),o="",q=!1,e=!1;for(let c of t){if(q){if(e){o+=c;e=!1;continue}if(c==="\\"){o+=c;e=!0;continue}if(c==='"'){q=!1;o+=c;continue}if(c==="\n"){o+="\\n";continue}if(c==="\r")continue;if(c==="\t"){o+="\\t";continue}o+=c}else{if(c==='"')q=!0;o+=c}}try{return JSON.parse(o.replace(/,\s*([}\]])/g,"$1"))}catch{return null}}function rvParseJson(s){let a=s.indexOf("{"),b=s.lastIndexOf("}");if(a<0||b<=a)return null;try{return JSON.parse(s.slice(a,b+1))}catch{return null}}var RV_SYS=`You help people build their OWN original version of a website or app with AI coding tools (Claude, ChatGPT, Lovable, Replit, Cursor).
You receive evidence scraped from one public page or repository. Write accurately from the evidence only; if it's thin, say what's unknown instead of inventing.
Never tell the reader to copy a brand name, logo, images, text or trademarks. Refer to the product generically and use [YOUR BRAND] for the name.
Reply with ONLY a JSON object, no markdown.`;function rvFirstPrompt(ev){return`Evidence:
${JSON.stringify(ev).slice(0,9e3)}

Return JSON with exactly these keys:
{"what": "one plain sentence on what this product does, without the brand name",
 "kind": "one of: landing, saas, store, blog, portfolio, directory, tool, docs, community, other",
 "verdict": "bot if a static or simple app an AI coding tool can build in an afternoon; half if it needs accounts, payments, real-time data or integrations; nah if it depends on heavy infrastructure, large data, trust/safety or regulation",
 "verdict_reason": "one sentence explaining the verdict",
 "features": ["5 to 8 short feature phrases, only features the evidence shows or states"],
 "pages": ["3 to 8 pages or screens"],
 "style": "one sentence on the visual style using only colors, fonts and layout signals present in the evidence; an empty string if the evidence has none",
 "prompt": "A build prompt of 170 to 300 words written to an AI coding tool, in second person. Structure: one line giving the tool a role; what to build (generic, using [YOUR BRAND]); the pages or sections; the core features as a short list; design direction with the hex colors and fonts from the evidence if present; constraints: mobile-first, accessible, simple stack, placeholder content in [CAPS], do not copy any real brand's name, logo, images or text, and do not add features that aren't listed; end with: Before you start, ask me up to 3 questions if anything is unclear."}`}function rvFallback(ev){let what=ev.description||ev.title||"a website",feats=(ev.type==="repo"?ev.topics:ev.headings).slice(0,6);return{what:`A ${ev.type==="repo"?"software project":"website"}: ${what}`.slice(0,200),kind:"other",verdict:"half",verdict_reason:"We couldn't analyze it in depth, so treat this as a starting point.",features:feats.length?feats:["Home page with a clear headline","Contact or sign-up call to action"],pages:["Home"],style:ev.colors?.length?`Colors seen on the page: ${ev.colors.slice(0,4).join(", ")}.`:"",prompt:`You are a senior web developer.

Build [YOUR BRAND], my own original version of ${ev.type==="repo"?"a project":"a site"} like this: ${what}

Include:
${(feats.length?feats:["A clear home page","A contact or sign-up section"]).map(f=>"- "+f).join(`
`)}

Design: ${ev.colors?.length?"use these colors: "+ev.colors.slice(0,4).join(", ")+". ":""}${ev.fonts?.length?"Fonts: "+ev.fonts.join(", ")+". ":""}Clean, mobile-first and accessible.

Rules:
- Use placeholder content in [CAPS].
- Don't copy any real brand's name, logo, images or text.
- Don't add features I didn't list.

Before you start, ask me up to 3 questions if anything is unclear.`,fallback:!0}}function rvSane(a,ev){if(!a||typeof a.prompt!="string"||a.prompt.length<200)return rvFallback(ev);let arr=x=>Array.isArray(x)?x.map(String).filter(Boolean).slice(0,10):[];return{what:String(a.what||"").slice(0,300),kind:String(a.kind||"other").slice(0,20),verdict:["bot","half","nah"].includes(a.verdict)?a.verdict:"half",verdict_reason:String(a.verdict_reason||"").slice(0,300),features:arr(a.features),pages:arr(a.pages),style:String(a.style||"").slice(0,300),prompt:a.prompt.slice(0,4e3)}}async function rvIpHash(req){let ip=req.headers.get("cf-connecting-ip")||"0",day=rvNow().slice(0,10),d=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(`rev|${day}|${ip}`));return[...new Uint8Array(d)].slice(0,10).map(b=>b.toString(16).padStart(2,"0")).join("")}async function rvBump(env,key,max,ttl){let n=parseInt(await env.DB.get(key)||"0",10);return n>=max?!1:(await env.DB.put(key,String(n+1),{expirationTtl:ttl}),!0)}async function handleReverse(req,env){let url="";try{url=(req.headers.get("content-type")||"").includes("json")?(await req.json()).url:(await req.formData()).get("url")}catch{}url=String(url||"").trim().slice(0,500);let r=await handleReverse0(env,req,url);return r.error&&(r.val=url),r}async function rvByName(env,q){q=String(q).trim().toLowerCase().replace(/\s+/g," ");if(!/^[a-z0-9][a-z0-9 .&'+-]{1,40}$/.test(q)||q.includes("."))return null;let row=await env.DB1.prepare("SELECT json_extract(json, '$.domain') AS d FROM apps WHERE disc = 0 AND (lower(name) = ? OR slug = ?) LIMIT 1").bind(q,q.replace(/[^a-z0-9]+/g,"-")).first().catch(()=>null);return row&&row.d?String(row.d):null}async function handleReverse0(env,req,url){if(url&&!/[./]/.test(url)){let d=await rvByName(env,url);if(!d)return{error:`We couldn't find a site called \u201C${url.slice(0,40)}\u201D. Enter its web address, like example.com.`};url=d}let u=cleanUrl(url);if(!u)return{error:"That doesn't look like a web address. Enter a public website, like example.com, or a GitHub repository."};let key=rvKeyOf(u),cached=await env.DB1.prepare("SELECT id FROM reverses WHERE k = ? AND created > ? ORDER BY created DESC LIMIT 1").bind(key,new Date(Date.now()-30*864e5).toISOString()).first();if(cached)return{id:cached.id};if(!env.AI)return{error:"Reverse is temporarily unavailable. Please try again later."};let h=await rvIpHash(req);if(!await rvBump(env,`rl:rev:${h}:${rvNow().slice(0,13)}`,RV_IP_CAP,3600))return{error:"You've scanned a lot of sites this hour. Please try again in a bit."};if(!await rvBump(env,`rev:day:${rvNow().slice(0,10)}`,RV_DAY_CAP,172800))return{error:"We've hit today's scan limit. Please come back tomorrow."};let gh=rvGhRepo(u),ev=gh?await rvRepoEvidence(gh):await rvWebsiteEvidence(u);if(ev.error)return{error:ev.error};let ai;try{ai=rvSane(rvParseJson(await rvAsk(env,RV_SYS,rvFirstPrompt(ev),1400)),ev)}catch(e){console.error("reverse ai",String(e)),ai=rvFallback(ev),e&&e.aiCap&&(ai.verdict_reason="Today's AI scan budget is used up, so this is a quick read. The full analysis runs automatically after midnight UTC and this page updates.",ai.pending=!0)}let app=null;if(ev.type==="website"){let root=ev.host;app=await env.DB1.prepare("SELECT slug, name FROM apps WHERE disc = 0 AND (json_extract(json, '$.domain') = ? OR json_extract(json, '$.domain') = ?) LIMIT 1").bind(root,"www."+root).first().catch(()=>null)}let id="rv_"+rvRid(8),{text,readme,...keep}=ev;if(ai&&ai.pending)await env.DB.put("ai:q:rv:"+id,JSON.stringify(ev),{expirationTtl:1209600});return await env.DB1.prepare("INSERT INTO reverses (id, k, url, created, json) VALUES (?,?,?,?,?)").bind(id,key,ev.url,rvNow(),JSON.stringify({ev:keep,ai,app})).run(),{id}}async function loadRev(env,id){if(!/^rv_[a-f0-9]{16}$/.test(id))return null;let r=await env.DB1.prepare("SELECT * FROM reverses WHERE id = ?").bind(id).first();return r?{...r,j:JSON.parse(r.json||"{}")}:null}var rvForm=(val="",err="")=>`<form class="rv-form" method="post" action="/api/reverse" data-rvf>
<label for="rvu" class="hp">Website or GitHub repository</label>
<div class="rv-in"><span class="rv-ic" aria-hidden="true">${SEARCH_ICON}</span><input id="rvu" name="url" type="text" inputmode="url" autocomplete="off" spellcheck="false" required maxlength="500" placeholder="Enter a website, like example.com" value="${esc(val)}"><button class="btn" type="submit">Scan site</button></div>
${err?`<p class="msg err" role="alert">${esc(err)}</p>`:""}<p class="small muted rv-note">Scanning takes about 15 seconds and shows you what we found. The full build prompt and plan are in the $9 Build Kit.</p></form>`;function reversePage(err="",val=""){let body=`<div class="wrap rv">${rvHead("Reverse a site",'Turn any site into <span class="serif">a build prompt.</span>',"Enter a website or a public GitHub repository. We scan it and show you what it would take to build your own version: the features, pages, colors and fonts it uses, and a straight verdict on whether AI can pull it off. Then get the Build Kit: the full build prompt and a step-by-step plan, $9.")}
${rvForm(val,err)}
<section class="rv-how"><div><b>1</b><h3>Enter a website</h3><p>Any public website or GitHub repository. A known app name like \u201Cnotion\u201D works too.</p></div><div><b>2</b><h3>We scan it</h3><p>You see its features, pages, colors, fonts and whether AI can build it, before you pay anything.</p></div><div><b>3</b><h3>Get the Build Kit</h3><p>The full build prompt and a step-by-step plan for Claude, ChatGPT, Lovable or Replit. $9.</p></div></section>
<section class="rv-kit panel"><div><span class="eyebrow">Build Kit \xB7 $9</span><h2>The full build prompt <span class="serif">and the plan</span></h2><p>For any site you reverse: the complete build prompt, 11 step-by-step prompts from research to launch, a design system file, a page-by-page spec, the data model and a launch checklist. Delivered instantly by email.</p></div></section>
<div class="note"><b>Build your own, not a copy.</b> Don't copy another company's name, logo, images or text; that can break trademark and copyright law. Check everything before you build.</div>
</div>`;return layout({title:"Reverse any website into a build prompt",desc:"Paste a website or GitHub repo and see what it takes to build your own version with AI: its features, pages, colors, fonts and a verdict on whether AI can build it.",path:"/reverse",body})}async function resultPage(env,id){let r=await loadRev(env,id);if(!r)return null;let{ev={},ai={},app}=r.j,v=ai.verdict||"half",name=ev.repo||ev.host||"this site",body=`<div class="wrap rv">
<div class="crumbs"><a href="/">Home</a><span>/</span><a href="/reverse">Reverse it</a><span>/</span><span>${esc(name)}</span></div>
<header class="vhead"><div><span class="eyebrow">Reversed ${esc(ev.type==="repo"?"repository":"website")}</span><h1>Build your own <span class="serif">${esc(name)}</span></h1><p class="lede">${esc(ai.what||ev.description||"")}</p>
<div class="meta"><span>Verdict: <b>${RV_VL[v]}</b> \xB7 ${RV_VM[v]}</span><span><a href="${esc(ev.url)}" rel="nofollow noopener">${esc(ev.url.replace(/^https?:\/\//,"").slice(0,60))}</a></span></div></div><span class="stamp big ${v}">${RV_VL[v]}</span></header>
<div class="vbody"><div>
${ai.verdict_reason?`<p class="note">${esc(ai.verdict_reason)}</p>`:""}
<div class="block" id="prompt"><h2><span class="num">01</span>The build prompt</h2><div class="lock"><p class="lock-tease" aria-hidden="true">${esc(String(ai.prompt||"").split(/\s+/).slice(0,24).join(" "))}\u2026</p><div class="lock-cta"><b>The full build prompt is in the Build Kit</b><p>The complete prompt for ${esc(name)}, plus 11 step-by-step prompts from research to launch, a design system file, a page-by-page spec, the data model and a launch checklist.</p><a class="btn" href="/buy/kit?r=${esc(r.id)}">Get the Build Kit \xB7 $9 \u2192</a><p class="small muted">One-time payment. Delivered on screen and by email.</p></div></div></div>
${(()=>{let repo=ev.type==="repo",rows=repo?[["Repository",ev.repo],["Description",ev.description],["Main language",ev.language],["Topics",(ev.topics||[]).join(", ")],["License",ev.license],["Top-level files",(ev.files||[]).slice(0,12).join(", ")]]:[["Page title",ev.title],["Description",ev.description],["Menu links",(ev.nav||[]).slice(0,10).join(" \xB7 ")],["Headings",(ev.headings||[]).slice(0,8).join(" \xB7 ")],["Colors in the code",(ev.colors||[]).slice(0,6).join(", ")],["Fonts in the code",(ev.fonts||[]).join(", ")]];return`<div class="block" id="seen"><h2><span class="num">02</span>What we could read</h2><p class="muted">Straight from the public ${repo?"repository":"home page"}. Everything else on this page is our read of it${repo?" and its README":" and the page's text"}.</p><table class="tiers rv-seen"><tbody>${rows.map(([a,b])=>`<tr><th scope="row">${a}</th><td>${b?esc(b):'<span class="muted">Not found</span>'}</td></tr>`).join("")}</tbody></table></div>
<div class="block"><h2><span class="num">03</span>Design notes</h2>${repo?`<p class="note">A code repository doesn't show a finished design, so we couldn't read real colors or fonts.${ai.style?" The style line below is our best read.":""}</p>`:!(ev.colors||[]).length&&!(ev.fonts||[]).length?`<p class="note">We couldn't find colors or fonts in the page's code.${ai.style?" The style line below is our best read.":""}</p>`:""}${(ev.colors||[]).length?`<div class="rv-sw">${ev.colors.slice(0,8).map(c=>`<span class="sw"><i data-hex="${esc(c)}"></i><code>${esc(c)}</code></span>`).join("")}</div><p class="small muted">Most-used colors in the page's code, not a confirmed brand palette.</p>`:""}${(ev.fonts||[]).length?`<p><b>Fonts in the code:</b> ${ev.fonts.map(esc).join(", ")}</p>`:""}${ai.style?`<p><b>Our read of the style:</b> ${esc(ai.style)}</p>`:""}</div>`})()}
${(ai.features||[]).length?`<div class="block"><h2><span class="num">04</span>Features and pages</h2><p class="small muted">Based on what we could read. Check them against the real ${ev.type==="repo"?"project":"site"}; anything you can't see there is our best guess.</p><div class="two-lists"><div><h3>Features</h3><ul class="why">${ai.features.map(f=>`<li><span>${esc(f)}</span></li>`).join("")}</ul></div>${(ai.pages||[]).length?`<div><h3>Pages</h3><ul class="why">${ai.pages.map(f=>`<li><span>${esc(f)}</span></li>`).join("")}</ul></div>`:""}</div></div>`:""}
${app?`<div class="panel rv-app"><b>We've reviewed ${esc(app.name)}.</b> See what it costs, the free alternatives and our verdict. <a class="link-arrow" href="/apps/${esc(app.slug)}">Can AI replace ${esc(app.name)}? \u2192</a></div>`:""}
<div class="note"><b>Build your own, not a copy.</b> Don't reuse another company's name, logo, images or text. Check everything against the real ${ev.type==="repo"?"project":"site"} before you build.</div>
</div>
<aside class="side">
<div class="panel rv-buy"><span class="eyebrow">Build Kit \xB7 $9</span><h3>The full plan for ${esc(name)}</h3><ul class="chk"><li>The complete build prompt</li><li>11 step-by-step prompts, research to launch</li><li>Design system file (design.md)</li><li>Page-by-page spec and data model</li><li>Launch and testing checklist</li></ul><a class="btn" href="/buy/kit?r=${esc(r.id)}">Get the Build Kit \u2192</a><p class="small muted">One-time payment. Delivered instantly on screen and by email. Digital product; all sales final.</p></div>
<div class="panel"><h3>Scan another site</h3>${rvForm()}</div>
</aside></div></div>`;return layout({title:`Build your own ${name}`,desc:`What it takes to build your own version of ${name} with AI: features, pages, colors, fonts and a verdict.`,path:"/reverse/r/"+r.id,body,noindex:!0})}var RV_KIT_SYS=`You are a senior product engineer writing a Build Kit so a non-expert can build their OWN original version of a product with AI coding tools, using the 11-stage Replica method: 1 recon, 2 architect, 3 design system, 4 build, 5 backend, 6 test, 7 parity check, 8 user-complaint research, 9 rebrand, 10 launch, 11 deploy.
Clean-room rules for every stage: rebuild what the product DOES, never its code, name, logo, icons, images, fonts, copy or brand colors; public sources and the builder's own account only; no scraping and no private APIs. Use [YOUR BRAND] for the name. Never invent reviews, user counts, prices or complaints; stage 8 tells the builder where to read real reviews. Be concrete. Reply with ONLY a JSON object.`;function rvKitPrompt(j){return`What we know about the product:
${JSON.stringify({evidence:j.ev,analysis:j.ai}).slice(0,12e3)}

Return JSON with exactly these keys:
{"phases": [11 objects in this order, one per stage {"t": "stage number, stage name and a short title, e.g. 1. Recon: map the screens and flows", "p": "a complete prompt of 90 to 170 words to paste into an AI coding tool for this stage. Stage 1 writes replica/recon.md and replica/features.csv (screens S01.., flows F01.., must/should/could/skip features, and what cannot be cloned). Stage 2 picks a simple managed stack and writes the schema and API. Stage 3 writes design tokens with a neutral placeholder palette, open fonts and an open icon set, and checks WCAG AA contrast. Stage 4 builds the core flow end to end first, then each screen with empty, loading, error and mobile states. Stage 5 adds auth, database access rules, payments in test mode and email, with keys only in .env. Stage 6 writes a test plan and Playwright tests for every flow and logs bugs by severity. Stage 7 scores feature parity (must 3, should 2, could 1) and lists what is missing. Stage 8 collects 100+ real reviews from named public sources and ranks what users hate, what is missing and what is unsolved, quoting only real text with links. Stage 9 picks a new name with the trademark and domain checks to run, a new palette, a logo brief and a voice, then sweeps the code for anything left of the original. Stage 10 writes the landing page and pricing with no fake proof. Stage 11 runs a preflight (tests, parity, brand sweep) and deploys to a free host on the builder's own domain. Each prompt must be specific to THIS product: name its actual screens, flows, features and data from the analysis (use the S01/F01 ids and the must/should/could/skip list from the replica plan when present), never generic advice. Each prompt says what done looks like and says not to add unrequested features"}],
 "design_md": "a design system in markdown (about 300 words): color roles with neutral placeholder hex values, typography with open fonts, spacing, radius, buttons, cards, do's and don'ts, and a note to replace the palette in stage 9",
 "pages": [3 to 8 objects {"name": "page name", "sections": ["sections in order"]}],
 "data": [0 to 6 objects {"entity": "name", "fields": ["field: type"]}],
 "checklist": ["12 to 16 launch and testing checks, including the brand sweep and the parity score"]}
If the analysis includes a replica plan, use its features, screens, flows, data, hard parts, research list and avoid list.`}async function appKitRev(env,slug){let k="app:"+slug,ex=await env.DB1.prepare("SELECT id FROM reverses WHERE k = ? LIMIT 1").bind(k).first();if(ex)return ex.id;let row=await env.DB1.prepare("SELECT json FROM apps WHERE slug = ? AND disc = 0").bind(slug).first();if(!row)return null;let a=JSON.parse(row.json);if(!a.prompt)return null;let id="rv_"+rvRid(8),j={ev:{type:"website",url:a.domain?`https://${a.domain}`:"",host:a.name,title:a.name,description:String(a.tagline||""),nav:[],headings:[],colors:[],fonts:[]},ai:{what:String(a.tagline||""),kind:"tool",verdict:vOf(a.verdict),verdict_reason:String(a.verdictSummary||""),features:(a.requirements||[]).map(String).slice(0,8),pages:[],style:"",prompt:String(a.prompt),replica:a.replica||null},app:{slug:a.slug,name:a.name}};await env.DB1.prepare("INSERT INTO reverses (id, k, url, created, json) VALUES (?,?,?,?,?)").bind(id,k,j.ev.url||"app:"+slug,rvNow(),JSON.stringify(j)).run();return id}async function kitFor(env,revId,bg){let r=await loadRev(env,revId);if(!r)return null;if(r.j.kit)return{r,kit:r.j.kit};if(!env.AI)return{r,kit:null};let lk="kit:try:"+revId,tries=Number(await env.DB.get(lk)||0);if(tries>=4)return{r,kit:null};await env.DB.put(lk,String(tries+1),{expirationTtl:3600});let k=null,raw="";try{let o=await aiRun(env,"@cf/openai/gpt-oss-120b",{messages:[{role:"system",content:RV_KIT_SYS},{role:"user",content:rvKitPrompt(r.j)}],max_tokens:9000,temperature:.3},AI_HARD,{kind:"kit",bg}),x=typeof o=="string"?o:o?.response??o?.result?.response??o?.choices?.[0]?.message?.content??"";if(x&&typeof x=="object"&&Array.isArray(x.phases))k=x;else{raw=typeof x=="string"?x:JSON.stringify(x);k=rvParseJson(raw)||rvLooseJson(raw)}}catch(e){if(e&&e.aiCap)return await env.DB.put(lk,String(tries),{expirationTtl:3600}),await env.DB.put("ai:q:kit:"+revId,"1",{expirationTtl:1209600}),{r,kit:null};raw="ERR "+String(e);console.error("kit ai",String(e))}if(!k||!Array.isArray(k.phases)||k.phases.length<3){await env.DB.put("kit:err:"+revId,String(raw).slice(0,6e3),{expirationTtl:604800});return{r,kit:null}}let arr=x=>Array.isArray(x)?x:[],kit={phases:arr(k.phases).slice(0,12).map(p=>({t:String(p.t||"").slice(0,120),p:String(p.p||"").slice(0,3e3)})).filter(p=>p.p),design_md:String(k.design_md||"").slice(0,8e3),pages:arr(k.pages).slice(0,10).map(p=>({name:String(p.name||""),sections:arr(p.sections).map(String).slice(0,12)})),data:arr(k.data).slice(0,8).map(d=>({entity:String(d.entity||""),fields:arr(d.fields).map(String).slice(0,16)})),checklist:arr(k.checklist).map(String).slice(0,20)};return r.j.kit=kit,await env.DB1.prepare("UPDATE reverses SET json = ? WHERE id = ?").bind(JSON.stringify(r.j),r.id).run(),{r,kit}}function kitText(r,kit,o){return`BOT OR NAH BUILD KIT: ${r.j.ev.repo||r.j.ev.host}
Licensed to ${o.email}. Build your own original product; don't copy another company's name, logo, images or text.

START HERE: THE BUILD PROMPT
${r.j.ai.prompt}

`+kit.phases.map((p,i)=>`PHASE ${i+1}: ${p.t}
${p.p}
`).join(`
`)+`
DESIGN SYSTEM (design.md)
${kit.design_md}

PAGES
${kit.pages.map(p=>`- ${p.name}: ${p.sections.join(", ")}`).join(`
`)}

DATA MODEL
${kit.data.length?kit.data.map(d=>`- ${d.entity}: ${d.fields.join(", ")}`).join(`
`):"- No stored data needed for a first version."}

LAUNCH CHECKLIST
${kit.checklist.map(c=>`[ ] ${c}`).join(`
`)}

(c) Bot or Nah \xB7 botornah.com \xB7 ${EMAIL}
`}function kitHtml(r,kit,o,token){let name=r.j.ev.repo||r.j.ev.host,pre=(id,t)=>`<div class="prompt"><div class="bar"><span>${esc(id)}</span><button class="copy" data-copy="#${id}" type="button"><span>Copy</span></button></div><pre id="${id}">${esc(t).replace(/\[([^\]\n]{1,80})\]/g,"<mark>[$1]</mark>")}</pre></div>`,body=kit?`<div class="wrap doc"><div class="doc-head"><div><span class="eyebrow">Bot or Nah Build Kit</span><h1>Build your own ${esc(name)}</h1><p class="muted">Licensed to ${esc(o.email)} \xB7 order ${esc(o.id.slice(-8))}</p></div><div class="noprint dl-btns"><button class="btn small" type="button" data-print>Save as PDF</button><a class="btn small ghost" href="/dl/${token}.txt" download>Download .txt</a></div></div>
<div class="howto"><b>How to use:</b> start with the build prompt, then paste each phase into the same AI coding tool one at a time. Test after every phase. Replace anything in <mark>[BRACKETS]</mark> with your own details.</div>
<section class="dl-pack"><h2>Start here: the build prompt</h2>${pre("kit-0",r.j.ai.prompt)}</section>
<section class="dl-pack"><h2>Step by step</h2>${kit.phases.map((p,i)=>`<div class="dl-p"><h3><span>${i+1}</span>${esc(p.t)}</h3>${pre("kit-"+(i+1),p.p)}</div>`).join("")}</section>
<section class="dl-pack"><h2>Design system (design.md)</h2>${pre("kit-design",kit.design_md)}</section>
<section class="dl-pack"><h2>Pages</h2><ul class="why">${kit.pages.map(p=>`<li><span><b>${esc(p.name)}:</b> ${esc(p.sections.join(", "))}</span></li>`).join("")}</ul></section>
<section class="dl-pack"><h2>Data model</h2>${kit.data.length?`<ul class="why">${kit.data.map(d=>`<li><span><b>${esc(d.entity)}:</b> ${esc(d.fields.join(", "))}</span></li>`).join("")}</ul>`:"<p>No stored data needed for a first version.</p>"}</section>
<section class="dl-pack"><h2>Launch checklist</h2><ul class="chk">${kit.checklist.map(c=>`<li>${esc(c)}</li>`).join("")}</ul></section>
<p class="small muted">Check everything before you rely on it. Build your own original product; don't copy another company's name, logo, images or text. Questions: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p></div>`:`<meta http-equiv="refresh" content="20"><div class="wrap doc">${rvHead("Build Kit","Your kit is being prepared.","This takes up to a minute. This page refreshes on its own. If it doesn't appear after a few minutes, reply to your confirmation email and we'll send it by hand.")}</div>`;return layout({title:"Your Build Kit",desc:"",path:"/dl",noindex:!0,body})}var kitName=r=>`Build Kit: ${r?r.j.ev.repo||r.j.ev.host:"your site"}`;var BOT=/bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|headless|lighthouse|monitor|curl|wget|python|axios|node-fetch|go-http/i;async function logVisit(env,req,path){let db=env.DB1;if(!db)return;let ua=req.headers.get("user-agent")||"";if(!ua||BOT.test(ua))return;let c=req.cf&&req.cf.country&&/^[A-Z]{2}$/.test(req.cf.country)&&req.cf.country!=="T1"?req.cf.country:"XX",day=new Date().toISOString().slice(0,10),d=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(`v|${day}|${req.headers.get("cf-connecting-ip")||""}|${ua}`)),vid=[...new Uint8Array(d)].slice(0,8).map(b=>b.toString(16).padStart(2,"0")).join(""),ts=Math.floor(Date.now()/1e3);await db.batch([db.prepare("INSERT INTO live (ts, country, path, vid) VALUES (?, ?, ?, ?)").bind(ts,c,path.slice(0,80),vid),db.prepare("INSERT INTO visits (day, country, n) VALUES (?, ?, 1) ON CONFLICT(day, country) DO UPDATE SET n = n + 1").bind(day,c)])}async function globeStats(env){let db=env.DB1,now2=Math.floor(Date.now()/1e3),week=new Date(Date.now()-6*864e5).toISOString().slice(0,10),[live,all,top,feed,pins]=await Promise.all([db.prepare("SELECT COUNT(DISTINCT vid) p, COUNT(DISTINCT country) c FROM live WHERE ts > ?").bind(now2-300).first(),db.prepare("SELECT SUM(n) views, COUNT(DISTINCT country) countries, MIN(day) since FROM visits WHERE country != 'XX'").first(),db.prepare("SELECT country c, SUM(n) n FROM visits WHERE day >= ? AND country != 'XX' GROUP BY country ORDER BY n DESC").bind(week).all(),db.prepare("SELECT country c, path, ts FROM live WHERE country != 'XX' ORDER BY ts DESC LIMIT 4").all(),db.prepare("SELECT country c, COUNT(DISTINCT vid) n, MAX(ts) t FROM live WHERE country != 'XX' GROUP BY country").all()]),t=top.results||[];return{live:live?.p||0,liveCountries:live?.c||0,allTime:{views:all?.views||0,countries:all?.countries||0,since:all?.since||null},topCountries:t.slice(0,5),moreCountries:Math.max(0,t.length-5),restCountries:t.slice(5,200),feed:(feed.results||[]).map(f=>({c:f.c,copy:!1,path:f.path,app:"",ago:Math.max(0,now2-f.ts)})),pins:(pins.results||[]).map(p=>({c:p.c,n:p.n,ago:Math.max(0,now2-p.t)})),at:Date.now(),age:0}}var flag=cc=>/^[A-Z]{2}$/.test(cc||"")?String.fromCodePoint(...[...cc].map(ch=>127462+ch.charCodeAt(0)-65)):"",THE=["US","GB","NL","PH","AE","DO","CD"],RN;try{RN=new Intl.DisplayNames(["en"],{type:"region"})}catch{}var bname=cc=>{try{return RN?.of(cc)||cc}catch{return cc}},cname=cc=>{let n=cc;try{n=RN?.of(cc)||cc}catch{}return THE.includes(cc)?"the "+n:n},agoStr=s=>s<10?"just now":s<60?`${s}s ago`:s<3600?`${Math.floor(s/60)}m ago`:`${Math.floor(s/3600)}h ago`,escH=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]),feedHtml=s=>(s?.feed||[]).slice(0,4).map((f,i)=>`<li${i===0?' class="fresh"':""}><span class="g-dot"></span><span class="g-line">${flag(f.c)} someone in ${escH(cname(f.c))} ${f.ago<120?"is reading":"read"} ${escH(f.path)}</span><span class="g-ago">${agoStr(f.ago)}</span></li>`).join(""),globeSection=s=>{let fmt=n=>n==null?"\u2014":Number(n).toLocaleString("en-US"),since=s?.allTime?.since?new Date(s.allTime.since+"T00:00:00Z").toLocaleDateString("en-US",{month:"short",day:"numeric",timeZone:"UTC"}):null;return`<section class="globe-band"><div class="wrap"><aside class="globe-strip" id="globe-strip" aria-label="Live visitors around the world">
<div class="strip-head"><span>Live \xB7 who's reading Bot or Nah right now</span><span class="strip-note">Country-level only. Nobody is identifiable, and we set no cookies.</span></div>
<div class="globe-grid"><div class="globe-wrap"><canvas id="globe-canvas" aria-label="Spinning globe showing recent visitors by country"></canvas></div>
<div class="globe-side"><div class="g-count"><span class="g-num" id="g-live">${fmt(s?.live)}</span><span class="g-lab">${s?.live===1?"person":"people"} on the site right now</span></div>
<span class="g-sub" id="g-sub">${s?`from ${fmt(s.liveCountries)} ${s.liveCountries===1?"country":"countries"} \xB7 ${fmt(s.allTime.views)} visits${since?` since ${since}`:""}`:"Counting starts with your visit."}</span>
<ul class="g-feed" id="g-feed">${feedHtml(s)}</ul>
<div class="g-countries"><span class="microlabel">Visitors \xB7 last 7 days \xB7 by country</span><div class="g-chips" id="g-chips">${(s?.topCountries||[]).map(r=>`<span class="g-chip" title="${escH(bname(r.c))}">${flag(r.c)} ${r.c} ${fmt(r.n)}</span>`).join("")}${(s?.restCountries||[]).map(r=>`<span class="g-chip g-x" title="${escH(bname(r.c))}">${flag(r.c)} ${r.c} ${fmt(r.n)}</span>`).join("")}${(s?.restCountries||[]).length?`<button type="button" class="g-more" aria-expanded="false" aria-controls="g-chips" data-n="${s.restCountries.length}">+ ${s.restCountries.length} more</button>`:""}</div></div></div></div><style>#g-chips .g-x{display:none}#g-chips[data-open] .g-x{display:inline-block}#g-chips .g-more{background:none;border:1px dashed #5a574f;border-radius:10px;padding:7px 12px;font:inherit;font-size:14px;line-height:inherit;color:#e9e3d6;cursor:pointer;transition:border-color .15s ease-out,transform .12s ease-out}#g-chips .g-more:hover{border-color:#a8a293}#g-chips .g-more:active{transform:scale(.97)}#g-chips .g-more:focus-visible{outline:2px solid var(--primary);outline-offset:2px}</style>
<script type="application/json" id="globe-data">${JSON.stringify(s||{unavailable:!0}).replace(/</g,"\\u003c")}<\/script>
</aside></div></section>`};var now=()=>new Date().toISOString(),rid=(n=16)=>[...crypto.getRandomValues(new Uint8Array(n))].map(b=>b.toString(16).padStart(2,"0")).join(""),money3=n=>"$"+Number(n).toLocaleString("en-US",{maximumFractionDigits:2}),head3=(eyebrow,h1,lede)=>`<div class="page-head"><span class="eyebrow">${eyebrow}</span><h1>${h1}</h1><p class="lede">${lede}</p></div>`,BASE_N=VERDICTS.length,sig="",loading=null;function loadExtras(env,onChange){if(env.DB1){if(loading)return loading;if(!(Date.now()-S.loaded<12e4))return loading=loadExtrasNow(env,onChange).finally(()=>{loading=null}),loading}}async function loadExtrasNow(env,onChange){try{let t=now(),[tasks,packs,ads,subs]=await Promise.all([env.DB1.prepare("SELECT json FROM tasks ORDER BY created, slug").all(),env.DB1.prepare("SELECT json FROM packs WHERE active = 1 ORDER BY sort, slug").all(),env.DB1.prepare("SELECT id, slot, target, json FROM ads WHERE status = 'live' AND start_at <= ? AND end_at > ?").bind(t,t).all(),env.DB1.prepare("SELECT COUNT(*) n FROM subs WHERE status = 'active'").first()]);S.subs=subs&&subs.n||0;S.floor=Number(env.SPONSOR_CLICK_FLOOR)||0;S.nlMin=Number(env.NEWSLETTER_MIN_SUBS)||0;S.views30=Number((await env.DB1.prepare("SELECT SUM(n) v FROM visits WHERE day >= ?").bind(new Date(Date.now()-29*864e5).toISOString().slice(0,10)).first().catch(()=>null))?.v)||0;let tl=(tasks.results||[]).map(r=>JSON.parse(r.json)).filter(v=>CAT[v.cat]&&v.slug&&v.q),pl=(packs.results||[]).map(r=>JSON.parse(r.json)),al=(ads.results||[]).map(r=>({id:r.id,slot:r.slot,target:r.target||"",...JSON.parse(r.json)})),ns=tl.length+":"+tl.map(v=>v.slug).join(",").length+"|"+pl.map(p=>p.slug+p.price+(p.link?1:0)).join(",")+"|"+al.map(a=>a.id).join(",");VERDICTS.splice(BASE_N);for(let k of Object.keys(BY_SLUG))BY_SLUG[k]._x&&delete BY_SLUG[k];for(let v of tl)BY_SLUG[v.slug]||(v._x=1,VERDICTS.push(v),BY_SLUG[v.slug]=v);S.packs=pl,S.ads=al,ns!==sig&&(sig=ns,onChange&&onChange()),S.loaded=Date.now()}catch(e){console.error("extras",String(e)),S.loaded=Date.now()-11e4}}var EXTRA_CSS=`.ex{margin:18px 0 8px;display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:24px;align-items:start}
.ex-card{background:#fff;border:1.5px solid var(--ink);border-radius:18px;box-shadow:8px 8px 0 var(--bot-hi);overflow:hidden}
.ex-bar{display:flex;align-items:center;gap:8px;padding:10px 14px;background:var(--paper2);border-bottom:1.5px solid var(--ink);font:600 12px var(--mono);color:var(--slate)}
.ex-bar i{width:9px;height:9px;border-radius:50%;background:var(--hair2)}
.ex-body{padding:18px 20px;font-size:15px;line-height:1.6;color:var(--ink2)}
.ex-body h4{margin:0 0 8px;font-size:17px;color:var(--ink)}
.ex-mail .ex-meta{font-size:13px;color:var(--slate);border-bottom:1px solid var(--hair);padding-bottom:10px;margin-bottom:12px}
.ex-mail .ex-meta b{color:var(--ink)}
.ex-body p{margin:0 0 10px;white-space:pre-wrap}
.ex-body table{font-size:14px;border-radius:10px}
.ex-body td,.ex-body th{padding:8px 10px}
.ex-body ul{margin:0;padding-left:20px}
.ex-note{font-size:13px;color:var(--slate)}
.ex-side{display:grid;gap:10px}
.ex-side div{background:var(--card);border:1.5px solid var(--hair2);border-radius:14px;padding:12px 14px;font-size:14px}
.ex-side b{display:block;font-size:13px;color:var(--bot-ink)}
.pk-thumb{height:92px;margin:4px 0 2px;border-radius:12px;background:#fff;border:1.5px solid var(--ink);padding:10px 12px;overflow:hidden;position:relative;font:11px/1.45 var(--mono);color:var(--slate)}
.pk-thumb b{display:block;color:var(--ink);font:700 12px var(--sans);margin-bottom:3px}
.pk-thumb::after{content:"";position:absolute;left:0;right:0;bottom:0;height:34px;background:linear-gradient(transparent,#fff)}
.pk-hero h1{font-size:clamp(36px,5vw,64px);margin:10px 0 14px}
.pk-hero~section>h2{margin-bottom:16px}
@media (max-width:860px){.ex{grid-template-columns:1fr}}`;function exampleHtml(x){if(!x)return"";let inner="";return x.kind==="email"?inner=`<div class="ex-body ex-mail"><div class="ex-meta">Subject: <b>${esc(x.subject||"")}</b></div>${String(x.body||"").split(/\n{2,}/).map(p=>`<p>${esc(p)}</p>`).join("")}</div>`:x.kind==="table"?inner=`<div class="ex-body">${x.title?`<h4>${esc(x.title)}</h4>`:""}<table><thead><tr>${(x.head||[]).map(h=>`<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${(x.rows||[]).map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>${x.after?`<p style="margin-top:10px">${esc(x.after)}</p>`:""}</div>`:inner=`<div class="ex-body">${x.title?`<h4>${esc(x.title)}</h4>`:""}${String(x.body||"").split(/\n{2,}/).map(p=>p.startsWith("- ")?`<ul>${p.split(`
`).map(l=>`<li>${esc(l.replace(/^- /,""))}</li>`).join("")}</ul>`:`<p>${esc(p)}</p>`).join("")}</div>`,`<div class="ex"><div><div class="ex-card"><div class="ex-bar"><i></i><i></i><i></i><span>${esc(x.label||"What you get back")}</span></div>${inner}</div><p class="ex-note">Example output from the free sample prompt, run in Claude with invented details. Your results will use your details and can differ.</p></div><div class="ex-side">${(x.why||[]).map(w=>`<div><b>\u2713 ${esc(w[0])}</b>${esc(w[1])}</div>`).join("")}</div></div>`}var thumb=x=>x?`<div class="pk-thumb" aria-hidden="true"><b>${esc(x.kind==="email"?"Subject: "+(x.subject||""):x.title||x.label||"")}</b>${esc(x.kind==="table"?(x.rows||[]).slice(0,3).map(r=>r.join(" \xB7 ")).join(`
`):String(x.body||"").slice(0,180))}</div>`:"",pcard=p=>`<a class="pack pc-${p.cat} t-${CAT[p.cat]?.tint||"mint"}" href="/packs/${p.slug}"><div class="pk-top"><span class="cn">${esc(p.cat==="all"?"Everything":CAT[p.cat]?.name||"")}</span><span class="pk-price">${money3(p.price)}</span></div><h3>${esc(p.name)}</h3>${thumb(p.example)}<p>${esc(p.blurb)}</p><div class="pk-foot"><span>${p.prompts.length} prompts</span><span class="go">See inside \u2192</span></div></a>`;function packsPage(){let list=S.packs.filter(p=>p.slug!=="all-access"),all=S.packs.find(p=>p.slug==="all-access"),total=list.reduce((s,p)=>s+p.prompts.length,0),cats=[...new Set(list.map(p=>p.cat))],body=`<link rel="stylesheet" href="/x.css?v=@@V@@"><div class="wrap">${head3("Prompt packs",'Every prompt, <span class="serif">ready to paste.</span>',`${list.length} packs, ${total} fill-in-the-blank prompts for everyday tasks. Each one tells the AI exactly what to do, what not to invent, and what to hand back. Works in ChatGPT, Claude or Gemini, free tiers included.`)}
${all?`<div class="bundle"><div><span class="tag">Best value</span><h2>All-Access: every pack, <span class="serif">${money3(all.price)}</span></h2><p>All ${list.length} packs one by one: ${money3(list.reduce((s,p)=>s+Number(p.price||0),0))}. All-Access: ${money3(all.price)}, plus every pack we add later. Your download link updates automatically.</p></div><a class="btn inv" href="/buy/all-access">Get All-Access \u2192</a></div>`:""}
<div class="spon-top" style="margin:0 0 28px">${sponsorSlot("Sponsor the shop pages.","One labeled card on the tools and prompt pack pages.",[["shop",""]])}</div>
${list.length?`<div class="chips pk-chips" role="group" aria-label="Filter packs"><a class="chip" href="#all" aria-pressed="true" data-pk="">All</a>${cats.map(c=>`<a class="chip" href="#${c}" data-pk="${c}">${esc(CAT[c]?.name||c)}</a>`).join("")}</div>
<div class="packs" data-packs>${list.map(pcard).join("")}</div><p class="muted">If a prompt in your pack doesn't do the job it says, email us the task and we'll send a rewritten prompt. One rewrite per prompt.</p>`:'<div class="note">Packs are being finalized. Check back shortly.</div>'}
<section><div class="sec-head"><h2>Ready-made <span class="serif">spreadsheets</span></h2><a class="link-arrow" href="/tools">All ${TOOLS.length} \u2192</a></div><p class="muted">For the jobs you track month after month: finished Excel and Google Sheets workbooks with the formulas and dashboards already built.</p><link rel="stylesheet" href="/t.css?v=@@V@@"><div class="tl-grid">${TOOLS.slice(0,3).map(toolCard).join("")}</div>${PARTNER_ETSY}</section>
<section class="cards3"><div class="box"><h3>Instant delivery</h3><p>Pay with Stripe. Your download page opens right away, and the link is emailed to you to keep.</p></div><div class="box"><h3>Built to be pasted</h3><p>Every prompt has [BRACKETS] for your details, rules that stop the AI from making things up, and a set output format.</p></div><div class="box"><h3>Honest scope</h3><p>Money, legal and health prompts help you organize and ask better questions. They never replace a professional.</p></div></section>
<div class="note">Packs are digital and can be copied the moment you get them, so <b>all pack sales are final</b>. If your download doesn't work, email <a href="mailto:${EMAIL}">${EMAIL}</a> and we'll fix it or refund you. See the <a href="/refunds">refund policy</a>.</div></div>`;return layout({title:"Prompt packs",desc:`${list.length} ready-to-paste prompt packs for everyday tasks: money, home, jobs, business, travel and more. Instant download.`,path:"/packs",body})}function packAlso(items){let W=s=>new Set((String(s||"").toLowerCase().match(/[a-z]{4,}/g)||[])),VW=VERDICTS.map(v=>[v,W(v.prompt)]);return items.flatMap(x=>x.prompts).map(q=>{let w=W(q.p),b=null,bs=0;for(let[v,s2]of VW){let i=0;for(let t of w)s2.has(t)&&i++;let j=i/((w.size+s2.size-i)||1);j>bs&&(bs=j,b=v)}return bs>=.5?[q,b]:null}).filter(Boolean)}function packPage(slug){let p=S.packs.find(x=>x.slug===slug);if(!p)return null;let isAll=slug==="all-access",items=isAll?S.packs.filter(x=>x.slug!=="all-access"):[p],n=items.reduce((s,x)=>s+x.prompts.length,0),sample=!isAll&&p.prompts[p.sample||0],related=S.packs.filter(x=>x.slug!==slug&&x.slug!=="all-access"&&x.cat===p.cat).slice(0,3),body=`<link rel="stylesheet" href="/x.css?v=@@V@@"><div class="wrap"><div class="crumbs"><a href="/">Home</a><span>/</span><a href="/packs">Prompt packs</a><span>/</span><span>${esc(p.name)}</span></div>
<div class="pk-hero"><div><span class="eyebrow">${isAll?"Every pack":esc(CAT[p.cat]?.name||"")} \xB7 ${n} prompts</span><h1>${esc(p.name)}</h1><p class="lede">${esc(p.blurb)}</p>${p.for?`<p><b>Good for:</b> ${esc(p.for)}</p>`:""}${(()=>{let L=isAll?items.map(x=>[x.name,x.prompts.length+" prompts"]):p.prompts.map(q=>[q.t,""]),k=isAll?8:6;return`<div class="pk-peek"><span class="pk-peek-h">${isAll?"Packs included":"Inside this pack"}</span><ul>${L.slice(0,k).map(([a,b])=>`<li>${esc(a)}${b?` <span>${esc(b)}</span>`:""}</li>`).join("")}</ul>${L.length>k?`<a href="#inside">+ ${L.length-k} more ${isAll?"packs":"prompts"} \u2193</a>`:""}</div>`})()}</div>
<div class="buybox"><div class="amt">${money3(p.price)}</div><p class="small muted">One-time payment. Instant download.</p>${p.link?`<a class="btn" href="/buy/${p.slug}">Buy now \u2192</a><p class="small muted">Secure checkout by Stripe. Card, Apple Pay and Google Pay.</p><p class="small muted">Sales are final once the files are delivered. If your download doesn\u2019t work, we fix it or refund you. <a href="/refunds">Refund policy</a>.</p>`:'<p class="note">Checkout opens shortly.</p>'}<ul class="ticks"><li>Download page plus a copy emailed to you</li><li>Plain-text file and a print-ready version</li><li>Works in ChatGPT, Claude or Gemini</li><li>Bonus: a Claude Skill plus a ChatGPT/Gemini setup file, so your AI runs the prompts for you</li></ul></div></div>
<section id="inside"><h2>What's inside</h2>${items.map(x=>`${isAll?`<h3 class="pk-sub"><a href="/packs/${x.slug}">${esc(x.name)}</a> \xB7 ${x.prompts.length} prompts</h3>`:""}<ol class="pk-list">${x.prompts.map(q=>`<li><b>${esc(q.t)}</b>${q.d?` <span class="muted">${esc(q.d)}</span>`:""}</li>`).join("")}</ol>`).join("")}</section>
${p.example?`<section><h2>What a finished result <span class="serif">looks like</span></h2>${exampleHtml(p.example)}</section>`:""}
${sample?`<section><h2>Free sample: ${esc(sample.t)}</h2><div class="prompt"><div class="bar"><div class="dots"><i></i><i></i><i></i></div><span>sample.txt</span><button class="copy" data-copy="#ptext" type="button"><span>Copy prompt</span></button></div><pre id="ptext">${esc(sample.p).replace(/\[([^\]\n]{1,80})\]/g,"<mark>[$1]</mark>")}</pre></div></section>`:""}
${related.length?`<section><h2>More ${esc(CAT[p.cat]?.name||"")} packs</h2><div class="packs">${related.map(pcard).join("")}</div></section>`:""}
${sponsorSlot("Sponsor the shop pages.","One labeled card on the tools and prompt pack pages.",[["shop",""]])}
<div class="note">All pack sales are final because packs can be copied once delivered. If your download doesn't work, we fix it or refund you. <a href="/refunds">Refund policy</a>.</div></div>`,ld=`<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"Product",image:SITE+"/og.png",brand:PBRAND,name:p.name,description:p.blurb,offers:{"@type":"Offer",price:p.price,priceCurrency:"USD",availability:"https://schema.org/InStock",url:`${SITE}/packs/${p.slug}`,...OFFX}}).replace(/</g,"\\u003c")}<\/script>`;return layout({title:p.name,desc:`${p.blurb} ${n} ready-to-paste prompts, ${money3(p.price)}.`,path:"/packs/"+slug,body,jsonld:ld})}function advertisePage(){let cards=Object.entries(SLOTS).filter(([k])=>k!=="newsletter"||S.nlMin>0&&S.subs>=S.nlMin).map(([k,s])=>{let live=S.ads.filter(a=>a.slot===k).length,open=(s.target?"Open":`${Math.max(0,s.cap-live)} of ${s.cap} open`)+(k==="newsletter"?` \xB7 list today: ${S.subs} subscriber${S.subs===1?"":"s"}`:"");return`<div class="price${k==="headline"?" feat":""}"><h3>${s.name}</h3><div class="amt">${money3(s.base)} <small>/ month</small></div><p>${s.where}</p><div class="terms">${TERMS.slice(1).map(t=>`<span>${t.label}: ${money3(termPrice(k,t.m))}${t.off?` <b>\u2212${t.off}%</b>`:""}</span>`).join("")}</div><div class="avail">${open}</div><a class="btn small${k==="headline"?" inv":""}" href="/sponsor/book?slot=${k}">Book this spot \u2192</a></div>`}).join(""),body=`<div class="wrap">${head3("Sponsor",'Sponsor <span class="serif">Bot or Nah.</span>',"Reach people asking \u201Ccan AI do this?\u201D Our readers arrive with a specific task and the intent to try a tool. Pick a spot, upload your ad, choose how long, and pay. No calls, no emails back and forth, no contracts.")}@@V30@@
<div class="steps4"><div><b>1</b><span>Pick a spot</span></div><div><b>2</b><span>Upload your logo and copy</span></div><div><b>3</b><span>Choose 1, 3, 6 or 12 months</span></div><div><b>4</b><span>Pay by card and get a confirmation email</span></div></div>
<div class="price-grid">${cards}
<div class="price"><h3>Expedited review</h3><div class="amt">$49 <small>one time</small></div><p>Get your tool reviewed and listed within 48 hours instead of waiting in the free queue. The verdict is the same either way.</p><div class="avail">Available</div><a class="btn small" href="https://buy.stripe.com/fZu6oJdpMeNc06d9xg1Nu04" rel="noopener">Pay by card \u2192</a></div></div>
<section><div class="two"><div class="prose"><h2>How it works</h2><ol><li>Book a spot and upload your logo, headline and one line of copy.</li><li>Pay through Stripe's secure checkout. You get a confirmation email right away.</li><li>We review your ad within 2 business days. Your time starts the day it goes live, not the day you pay.</li><li>If we can't accept it, you get a full refund the same day.</li>${S.floor?`<li>If your placement gets fewer than ${S.floor.toLocaleString("en-US")} clicks in its 30 days, your next 30 days in the same spot are free. Clicks are counted on our own sponsored link.</li>`:""}</ol></div>
<div class="prose"><h2>The rules</h2><ul><li>Every paid spot is labeled \u201CSponsored\u201D and uses a sponsored link.</li><li>Never more than one ad in view per page section. No pop-ups, no auto-playing video, no tracking pixels.</li><li>Paying never changes a verdict, including the verdict on your own product.</li><li>We decline anything misleading, unsafe or unlawful.</li><li>We don't publish traffic numbers we can't back up. The live visitor globe on the home page shows real counts.</li></ul></div></div></section>
<div class="note">Questions? Email <a href="mailto:${EMAIL}?subject=Advertising">${EMAIL}</a>. See the <a href="/refunds">refund policy</a> for placements.</div></div>`;return layout({title:"Sponsor Bot or Nah",desc:"Book a sponsor spot on Bot or Nah in minutes: pick a placement, upload your ad, choose 1 to 12 months and pay by card. Clearly labeled; sponsors never change a verdict.",path:"/sponsor",body})}function bookPage(url){let slot=SLOTS[url.searchParams.get("slot")]?url.searchParams.get("slot"):"sidebar",target=url.searchParams.get("target")||"",P=Object.fromEntries(Object.entries(SLOTS).map(([k,s])=>[k,{base:s.base,target:s.target}])),vopts=VERDICTS.slice().sort((a,b)=>a.q.localeCompare(b.q)).map(v=>`<option value="${v.slug}"${v.slug===target?" selected":""}>${esc(v.q)}</option>`).join(""),body=`<div class="wrap">${head3("Book a spot",'Your ad, live in <span class="serif">two business days.</span>',`Choose a placement, add your ad and pay. We email a confirmation right away and again the day your ad goes live. Prefer we handle the creative? Skip the upload and email your logo and any brand notes to <a href="mailto:${EMAIL}">${EMAIL}</a>. We'll size it and set it up for you at no extra cost.`)}
<div class="two"><form class="form box" action="/api/book" method="post" enctype="multipart/form-data" data-book='${esc(JSON.stringify(P))}'>
<div class="field"><label for="slot">Placement</label><select id="slot" name="slot">${Object.entries(SLOTS).map(([k,s])=>`<option value="${k}"${k===slot?" selected":""}>${s.name} \xB7 ${money3(s.base)}/month</option>`).join("")}</select></div>
<div class="field" data-for="category"><label for="tcat">Which category?</label><select id="tcat" name="tcat"><option value="">Choose a category</option>${CATS.map(c=>`<option value="${c.slug}"${c.slug===target?" selected":""}>${esc(c.name)}</option>`).join("")}</select></div>
<div class="field" data-for="verdict"><label for="tv">Which verdict page?</label><select id="tv" name="tv"><option value="">Choose a verdict</option>${vopts}</select></div>
<div class="field"><span class="small"><b>How long?</b></span><div class="radio-row">${TERMS.map((t,i)=>`<label><input type="radio" name="term" value="${t.m}"${i===0?" checked":""}><span>${t.label}${t.off?` (\u2212${t.off}%)`:""}</span></label>`).join("")}</div></div>
<div class="field"><label for="company">Company or product name</label><input id="company" name="company" required maxlength="40"></div>
<div class="field"><label for="url">Link (where the ad goes)</label><input id="url" name="url" type="url" required maxlength="300" placeholder="https://"></div>
<div class="field"><label for="headline">Headline</label><input id="headline" name="headline" required maxlength="60" placeholder="e.g. Turn receipts into a budget in 10 seconds"><span class="hint">Up to 60 characters.</span></div>
<div class="field"><label for="line">One line of copy</label><input id="line" name="line" required maxlength="140"><span class="hint">Up to 140 characters. Plain claims only; we check them.</span></div>
<div class="field"><label for="logo">Logo (optional)</label><input id="logo" name="logo" type="file" accept="image/png,image/jpeg,image/webp"><span class="hint">Square PNG, JPG or WebP, under 300 KB. Shown at 44\xD744. No file ready? Leave this blank and email it to us after you book.</span></div>
<div class="field"><label for="bemail">Your email</label><input id="bemail" name="email" type="email" required maxlength="200" autocomplete="email"><span class="hint">Your confirmation and go-live emails go here.</span></div>
<div class="field"><label for="notes">Anything we should know? (optional)</label><textarea id="notes" name="notes" maxlength="1000"></textarea></div>
<div class="hp" aria-hidden="true"><label for="bw">Leave this empty</label><input id="bw" name="website" tabindex="-1" autocomplete="off"></div>
<label class="agree"><input type="checkbox" name="agree" required><span>I agree to the <a href="/terms">terms</a> and the <a href="/refunds">refund policy</a>, and my ad follows <a href="/sponsor">the rules</a>.</span></label>
<div class="total"><span>Total</span><b data-bprice>$0</b></div>
<button class="btn" type="submit">Continue to secure payment \u2192</button><p class="small muted">You'll pay on Stripe's checkout page. We never see your card number.</p></form>
<div class="prose"><h2>Preview</h2><div class="ad-preview">${adCard({id:"x",img:0,company:"Your product",headline:"Your headline goes here",line:"Your one line of copy appears next to it, clearly labeled as sponsored.",url:"#"})}</div><h2>After you pay</h2><ol><li>A confirmation email arrives right away.</li><li>We review your ad within 2 business days.</li><li>You get a second email the day it goes live, with the end date.</li></ol><p>If a spot is full, your time starts when the current sponsor's ends, and we tell you the date before it starts. Need changes later? Reply to either email.</p></div></div></div>`;return layout({title:"Book an ad spot",desc:"Book a sponsor placement on Bot or Nah.",path:"/sponsor/book",body,noindex:!0})}async function handleBook(req,env){if(parseInt(req.headers.get("content-length")||"0",10)>45e4)return{error:"That upload is too large. Please use an image under 300 KB."};let f=await req.formData();if(String(f.get("website")||""))return{redirect:"/sponsor"};let slot=String(f.get("slot")||""),s=SLOTS[slot],term=parseInt(f.get("term")||"1",10);if(!s||!TERMS.find(t=>t.m===term))return{error:"Please choose a placement and a length."};let target=s.target==="category"?String(f.get("tcat")||""):s.target==="verdict"?String(f.get("tv")||""):"";if(s.target==="category"&&!CAT[target])return{error:"Please choose a category."};if(s.target==="verdict"&&!BY_SLUG[target])return{error:"Please choose a verdict page."};let clean=(k,n)=>String(f.get(k)||"").replace(/[\u0000-\u001f<>]/g,"").trim().slice(0,n),company=clean("company",40),headline=clean("headline",60),line=clean("line",140),notes=clean("notes",1e3),email=clean("email",200).toLowerCase(),url=clean("url",300);try{let u2=new URL(url);if(!/^https?:$/.test(u2.protocol))throw 0;url=u2.toString()}catch{return{error:"Please enter a full link starting with https://"}}if(!company||!headline||!line)return{error:"Please fill in the company, headline and copy."};if(!/^[^\s@<>]+@[^\s@<>]+\.[a-z]{2,}$/i.test(email))return{error:"Please enter a valid email."};if(!f.get("agree"))return{error:"Please agree to the terms to continue."};let link=await env.DB1.prepare("SELECT url FROM links WHERE kind = 'ad' AND ref = ? AND term = ?").bind(slot,term).first();if(!link)return{error:"Online booking for this spot isn't open yet. Email us and we'll set it up."};let id="ad_"+rid(10),logo=f.get("logo"),img2=0;if(logo&&typeof logo=="object"&&logo.size){if(logo.size>3e5||!/^image\/(png|jpeg|webp)$/.test(logo.type))return{error:"The logo must be a PNG, JPG or WebP under 300 KB."};await env.DB.put("adimg:"+id,await logo.arrayBuffer(),{metadata:{type:logo.type}}),img2=1}await env.DB1.prepare("INSERT INTO ads (id, slot, target, term, status, created, email, json) VALUES (?,?,?,?,?,?,?,?)").bind(id,slot,target,term,"pending_payment",now(),email,JSON.stringify({company,headline,line,url,notes,img:img2,price:termPrice(slot,term)})).run();let u=new URL(link.url);return u.searchParams.set("client_reference_id",id),u.searchParams.set("prefilled_email",email),{redirect:u.toString()}}async function handleWebhook(req,env){let ev;try{ev=await req.json()}catch{return 400}if(!ev||!["checkout.session.completed","checkout.session.async_payment_succeeded"].includes(ev.type))return 200;let cs=ev.data&&ev.data.object;if(!cs||!cs.id)return 400;if(cs.payment_status!=="paid")return 200;let link=cs.payment_link?await env.DB1.prepare("SELECT kind, ref, term FROM links WHERE id = ?").bind(cs.payment_link).first():null,kind=link?link.kind:"other",email=cs.customer_details&&cs.customer_details.email||cs.customer_email||"",name=cs.customer_details&&cs.customer_details.name||"",token=rid(16),r=await env.DB1.prepare("INSERT OR IGNORE INTO orders (id, token, kind, ref, email, name, amount, created, emailed, json) VALUES (?,?,?,?,?,?,?,?,0,?)").bind(cs.id,token,kind,link?link.ref:"",email,name,cs.amount_total||0,now(),JSON.stringify({cr:cs.client_reference_id||"",term:link?link.term:0,live:!!ev.livemode})).run();return kind==="ad"&&cs.client_reference_id&&await env.DB1.prepare("UPDATE ads SET status = 'paid', json = json_set(json, '$.order', ?) WHERE id = ? AND status = 'pending_payment'").bind(cs.id,cs.client_reference_id).run(),r.meta&&r.meta.changes===0||await sendOrderEmails(env,cs.id),200}var packsFor=o=>o.kind==="bundle"||o.ref==="all-access"?S.packs.filter(p=>p.slug!=="all-access"):S.packs.filter(p=>p.slug===o.ref);async function orderPage(env,url){let cs=(url.searchParams.get("cs")||"").slice(0,200),tries=parseInt(url.searchParams.get("n")||"0",10),o=/^cs_[A-Za-z0-9_]+$/.test(cs)?await env.DB1.prepare("SELECT * FROM orders WHERE id = ?").bind(cs).first():null;if(!o){let wait=tries<12;return{status:200,refresh:wait?`3;url=/order?cs=${encodeURIComponent(cs)}&n=${tries+1}`:"",html:layout({title:"Confirming your order",desc:"",path:"/order",noindex:!0,body:`<div class="wrap">${head3("Payment received",wait?'Confirming your order<span class="serif">\u2026</span>':"Almost there.",wait?"This usually takes a few seconds. This page refreshes on its own.":`Stripe has your payment, and your confirmation email is on its way. If it hasn't arrived in 10 minutes, email <a href="mailto:${EMAIL}">${EMAIL}</a> with the email you paid with and we'll send your download right away.`)}</div>`})}}return{status:200,html:layout({title:"Thank you",desc:"",path:"/order",noindex:!0,body:orderBody(o)})}}function orderBody(o){if(o.kind==="pack"||o.kind==="bundle"){let ps=packsFor(o);return`<div class="wrap">${head3("Order confirmed",'Thank you. <span class="serif">Here are your prompts.</span>',`We also emailed this link to ${esc(o.email||"you")} so you can come back anytime.`)}
<div class="dl-box"><div><b>${esc(ps.length===1?ps[0].name:`All-Access: ${ps.length} packs`)}</b><span class="muted">${ps.reduce((s,p)=>s+p.prompts.length,0)} prompts \xB7 order ${esc(o.id.slice(-8))}</span></div><div class="dl-btns"><a class="btn" href="/dl/${o.token}">Open your packs \u2192</a><a class="btn ghost" href="/dl/${o.token}.txt" download>Download .txt</a></div></div>
<p class="small muted">Keep this link private; it's your copy. Trouble? Email <a href="mailto:${EMAIL}">${EMAIL}</a>.</p></div>`}if(o.kind==="tool"&&TOOL[o.ref]){let t=TOOL[o.ref];return`<div class="wrap">${head3("Order confirmed",'Thank you. <span class="serif">Your files are ready.</span>',`We also emailed this link to ${esc(o.email||"you")} so you can come back anytime.`)}
<div class="dl-box"><div><b>${esc(t.name)}</b><span class="muted">${t.files.length} files \xB7 order ${esc(o.id.slice(-8))}</span></div><div class="dl-btns"><a class="btn" href="/dl/${o.token}">Open your downloads \u2192</a></div></div>
<p class="small muted">Keep this link private; it's your copy. Trouble? Email <a href="mailto:${EMAIL}">${EMAIL}</a>.</p></div>`}return o.kind==="kit"?`<div class="wrap">${head3("Order confirmed",'Thank you. <span class="serif">Your Build Kit is ready.</span>',`We also emailed this link to ${esc(o.email||"you")} so you can come back anytime.`)}
<div class="dl-box"><div><b>Build Kit</b><span class="muted">order ${esc(o.id.slice(-8))}</span></div><div class="dl-btns"><a class="btn" href="/dl/${o.token}">Open your Build Kit \u2192</a></div></div>
<p class="small muted">It takes up to a minute to prepare the first time you open it. Keep this link private. Trouble? Email <a href="mailto:${EMAIL}">${EMAIL}</a>.</p></div>`:o.kind==="ad"?`<div class="wrap">${head3("Booking confirmed",`You're booked. <span class="serif">Thank you.</span>`,`We sent a confirmation to ${esc(o.email||"your email")}. We review your ad within 2 business days and email you again the day it goes live.`)}<a class="btn" href="/sponsor">Back to Sponsor</a></div>`:`<div class="wrap">${head3("Payment received",`Thank you. <span class="serif">We're on it.</span>`,`A confirmation is on its way to ${esc(o.email||"your email")}. Reply to it with anything we need.`)}</div>`}var CRCT=(()=>{let t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?3988292384^c>>>1:c>>>1;t[n]=c>>>0}return t})(),crc32=b=>{let c=4294967295;for(let i=0;i<b.length;i++)c=CRCT[(c^b[i])&255]^c>>>8;return(c^4294967295)>>>0};function zipStore(files){let te=new TextEncoder,parts=[],cen=[],off=0;for(let f of files){let nm=te.encode(f.name),d=te.encode(f.text),c=crc32(d),h=new DataView(new ArrayBuffer(30));h.setUint32(0,67324752,!0),h.setUint16(4,20,!0),h.setUint16(6,2048,!0),h.setUint16(8,0,!0),h.setUint16(10,0,!0),h.setUint16(12,33,!0),h.setUint32(14,c,!0),h.setUint32(18,d.length,!0),h.setUint32(22,d.length,!0),h.setUint16(26,nm.length,!0),h.setUint16(28,0,!0);let ch=new DataView(new ArrayBuffer(46));ch.setUint32(0,33639248,!0),ch.setUint16(4,20,!0),ch.setUint16(6,20,!0),ch.setUint16(8,2048,!0),ch.setUint16(10,0,!0),ch.setUint16(12,0,!0),ch.setUint16(14,33,!0),ch.setUint32(16,c,!0),ch.setUint32(20,d.length,!0),ch.setUint32(24,d.length,!0),ch.setUint16(28,nm.length,!0),ch.setUint32(42,off,!0),parts.push(new Uint8Array(h.buffer),nm,d),cen.push(new Uint8Array(ch.buffer),nm),off+=30+nm.length+d.length}let csz=cen.reduce((s,x)=>s+x.length,0),e=new DataView(new ArrayBuffer(22));e.setUint32(0,101010256,!0),e.setUint16(8,files.length,!0),e.setUint16(10,files.length,!0),e.setUint32(12,csz,!0),e.setUint32(16,off,!0);let all=[...parts,...cen,new Uint8Array(e.buffer)],out=new Uint8Array(all.reduce((s,x)=>s+x.length,0)),i=0;for(let x of all)out.set(x,i),i+=x.length;return out}var skillName=p=>("bot-or-nah-"+p.slug).toLowerCase().replace(/[^a-z0-9-]/g,"-").replace(/-+/g,"-").slice(0,64).replace(/-$/,""),plain=t=>String(t||"").replace(/[<>]/g,"").replace(/\s+/g," ").trim(),promptBlock=(q,i)=>`### ${i+1}. ${q.t}
${q.d?plain(q.d)+`
`:""}${q.tip?`Tip: ${plain(q.tip)}
`:""}
\`\`\`
${q.p}
\`\`\`
`,HOWTO=`## How to work
1. Match the user's request to the best prompt below. If more than one fits or it's unclear, show the prompt titles as a short numbered list and ask which one.
2. Every [BRACKETED] field in a prompt is an input. Ask for the missing ones in one short message. Never invent facts about the user, their business or their numbers. If a field is optional, offer a sensible default and say you used it.
3. Once you have the details, run the prompt yourself with them filled in and deliver the finished result, not the prompt.
4. Offer one round of changes at the end. For anything with real stakes (money, legal, health), remind the user to check it before relying on it.
`;function skillMd(p,o){let desc=plain(`Use when the user wants help with: ${p.blurb} Runs the Bot or Nah "${p.name}" prompt pack: picks the right prompt, asks only for the missing details, then delivers the finished result.`).slice(0,1e3);return`---
name: ${skillName(p)}
description: ${desc}
---

# ${p.name}

You have the ${p.prompts.length} prompts from the Bot or Nah "${p.name}" pack. Use them to do the work for the user instead of making them copy and fill prompts by hand.

${HOWTO}
## Prompts

${p.prompts.map(promptBlock).join(`
`)}
---
Licensed to ${o.email} for personal or internal business use. Please don't resell or republish. botornah.com
`}function skillZip(p,o){return zipStore([{name:skillName(p)+"/SKILL.md",text:skillMd(p,o)}])}function aiSetupText(ps,o){return`BOT OR NAH: AI SETUP FILE
Licensed to ${o.email} for personal or internal business use. Please don't resell or republish.

WHAT THIS IS
This file turns your prompt pack into an assistant that runs the prompts for you. It picks the right prompt, asks you only for the missing details, and hands back the finished result.

HOW TO SET IT UP
- ChatGPT: create a Project (or a custom GPT) and upload this file to it. In the instructions box, write: "Follow the Bot or Nah setup file in this project."
- Gemini: create a Gem, upload this file as knowledge (or paste it into the instructions), and save.
- Claude: use the Claude Skill .zip from your download page instead. Upload it in Claude's settings under Skills.
- Any other chat AI: paste this whole file as your first message, then ask for what you need.

==================== INSTRUCTIONS FOR THE AI ====================

You are an assistant that runs the Bot or Nah prompt pack${ps.length>1?"s":""} below for the user.

${HOWTO}
${ps.map(p=>`## PACK: ${p.name}
${plain(p.blurb)}

${p.prompts.map(promptBlock).join(`
`)}`).join(`

`)}

(c) Bot or Nah \xB7 botornah.com \xB7 ${EMAIL}
`}async function skillFile(env,token,slug){if(!/^[a-f0-9]{32}$/.test(token))return null;let o=await env.DB1.prepare("SELECT * FROM orders WHERE token = ?").bind(token).first();if(!o||!(o.kind==="pack"||o.kind==="bundle"))return null;let ps=packsFor(o);if(slug===null)return{text:aiSetupText(ps,o),name:"bot-or-nah-ai-setup.txt"};let p=ps.find(x=>x.slug===slug);return p?{zip:skillZip(p,o),name:skillName(p)+".zip"}:null}async function downloadPage(env,token,asText){if(!/^[a-f0-9]{32}$/.test(token))return null;let o=await env.DB1.prepare("SELECT * FROM orders WHERE token = ?").bind(token).first();if(o&&o.kind==="kit"){let j=JSON.parse(o.json||"{}"),x=await kitFor(env,j.cr||"");return x?asText?x.kit?{text:kitText(x.r,x.kit,o)}:null:{html:kitHtml(x.r,x.kit,o,token)}:null}if(o&&o.kind==="tool"){if(asText)return null;let b=toolDownload(o,token);return b?{html:layout({title:"Your downloads",desc:"",path:"/dl",noindex:!0,body:b})}:null}if(!o||!(o.kind==="pack"||o.kind==="bundle"))return null;let ps=packsFor(o);if(asText){let t=ps.map(p=>`${p.name.toUpperCase()}
${"=".repeat(p.name.length)}
${p.blurb}

`+p.prompts.map((q,i)=>`${i+1}. ${q.t}
${"-".repeat(q.t.length+3)}
${q.p}
${q.tip?`
Tip: ${q.tip}
`:""}`).join(`
`)).join(`

`);return{text:`BOT OR NAH PROMPT PACKS
Licensed to ${o.email} for personal or internal business use. Please don't resell or republish.
How to use: replace everything in [BRACKETS] with your details, then paste into ChatGPT, Claude or Gemini.

${t}

(c) Bot or Nah \xB7 botornah.com \xB7 ${EMAIL}
`}}let toc=ps.length>1?`<nav class="dl-toc"><b>Packs</b><ol>${ps.map(p=>`<li><a href="#${p.slug}">${esc(p.name)}</a></li>`).join("")}</ol></nav>`:"",body=`<div class="wrap doc"><div class="doc-head"><div><span class="eyebrow">Bot or Nah prompt packs</span><h1>${esc(ps.length===1?ps[0].name:"All-Access")}</h1><p class="muted">Licensed to ${esc(o.email)} \xB7 order ${esc(o.id.slice(-8))}</p></div><div class="noprint dl-btns"><button class="btn small" type="button" data-print>Save as PDF</button><a class="btn small ghost" href="/dl/${token}.txt" download>Download .txt</a></div></div>
<div class="howto"><b>How to use:</b> replace everything in <mark>[BRACKETS]</mark> with your details, then paste the prompt into ChatGPT, Claude or Gemini. Check anything with real stakes (money, legal, health) before you rely on it.</div>
<div class="howto noprint"><b>Bonus: let your AI run the pack for you.</b> These files teach your AI every prompt below, so it picks the right one, asks only for your details, and gives you the finished result.<div class="dl-btns" style="margin-top:.6em;flex-wrap:wrap"><a class="btn small ghost" href="/dl/${token}.ai.txt" download>ChatGPT / Gemini setup file (.txt)</a>${ps.map(p=>`<a class="btn small ghost" href="/dl/${token}/${p.slug}.zip" download>Claude Skill${ps.length>1?": "+esc(p.name):""} (.zip)</a>`).join("")}</div><p class="small muted" style="margin:.5em 0 0">ChatGPT: upload the .txt to a Project or custom GPT. Gemini: add it to a Gem. Claude: upload the .zip in Claude's settings under Skills.</p></div>${toc}
${ps.map(p=>`<section class="dl-pack" id="${p.slug}">${ps.length>1?`<h2>${esc(p.name)}</h2><p class="muted">${esc(p.blurb)}</p>`:`<p class="muted">${esc(p.blurb)}</p>`}${p.prompts.map((q,i)=>`<div class="dl-p"><h3><span>${i+1}</span>${esc(q.t)}</h3><div class="prompt"><div class="bar"><span>${esc(q.t)}</span><button class="copy" data-copy="#p-${p.slug}-${i}" type="button"><span>Copy</span></button></div><pre id="p-${p.slug}-${i}">${esc(q.p).replace(/\[([^\]\n]{1,80})\]/g,"<mark>[$1]</mark>")}</pre></div>${q.tip?`<p class="small"><b>Tip:</b> ${esc(q.tip)}</p>`:""}</div>`).join("")}</section>`).join("")}
<p class="small muted">Licensed for personal or internal business use. Please don't resell or republish. Questions: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p></div>`;return{html:layout({title:"Your prompt packs",desc:"",path:"/dl",noindex:!0,body})}}var FROM={email:EMAIL,name:"Bot or Nah"};function emailShell({pre,title,intro,cta,rows=[],after="",foot=""}){let rowsHtml=rows.length?`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:22px 0;border-top:1px solid #e7e1d3">${rows.map(([k,v])=>`<tr><td style="padding:11px 0;border-bottom:1px solid #e7e1d3;color:#6b675e;font-size:14px">${esc(k)}</td><td style="padding:11px 0;border-bottom:1px solid #e7e1d3;text-align:right;font-size:14px;font-weight:600;color:#141414">${esc(v)}</td></tr>`).join("")}</table>`:"";return`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:#f6f2e9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Helvetica,Arial,sans-serif;color:#141414">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(pre||"")}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f2e9"><tr><td align="center" style="padding:32px 14px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
<tr><td style="padding:0 4px 18px"><a href="${SITE}" style="text-decoration:none"><img src="${SITE}/email/logo.png" width="150" alt="Bot or Nah" style="display:block;border:0;height:auto"></a></td></tr>
<tr><td style="background:#ffffff;border:1.5px solid #141414;border-radius:18px;padding:34px 30px">
<h1 style="margin:0 0 14px;font-size:26px;line-height:1.2;letter-spacing:-.02em">${title}</h1>
<div style="font-size:16px;line-height:1.6;color:#2b2925">${intro}</div>
${cta?`<table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px 0 6px"><tr><td style="background:#141414;border-radius:999px"><a href="${cta.href}" style="display:inline-block;padding:14px 26px;color:#ffffff;font-weight:700;font-size:16px;text-decoration:none">${esc(cta.label)}</a></td></tr></table>${cta.sub?`<p style="margin:8px 0 0;font-size:13px;color:#6b675e">${cta.sub}</p>`:""}`:""}
${rowsHtml}<div style="font-size:15px;line-height:1.6;color:#2b2925">${after}</div>
</td></tr>
<tr><td style="padding:20px 6px;font-size:12px;line-height:1.6;color:#6b675e">${foot||`Questions? Just reply to this email or write to <a href="mailto:${EMAIL}" style="color:#6b675e">${EMAIL}</a>. We answer in writing within 1 business day.`}<br>Bot or Nah \xB7 <a href="${SITE}" style="color:#6b675e">botornah.com</a></td></tr>
</table></td></tr></table></body></html>`}async function sendMail(env,msg){if(!env.EMAIL)return!1;try{return await env.EMAIL.send({from:FROM,replyTo:EMAIL,...msg}),!0}catch(e){return console.error("email",String(e)),!1}}async function sendOrderEmails(env,id){if(!env.EMAIL)return!1;let o=await env.DB1.prepare("SELECT * FROM orders WHERE id = ? AND emailed = 0").bind(id).first();if(!o||!o.email)return!1;let j=JSON.parse(o.json||"{}"),paid=money3((o.amount||0)/100),date=new Date(o.created).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric",timeZone:"America/Chicago"}),first=(o.name||"").split(" ")[0],subject,html2,text;if(o.kind==="pack"||o.kind==="bundle"){let ps=packsFor(o),what=ps.length===1?ps[0].name:`All-Access (${ps.length} packs)`,dl=`${SITE}/dl/${o.token}`;subject=`Your prompts are ready: ${what}`,html2=emailShell({pre:"Your download link is inside. Keep this email.",title:`Thanks${first?", "+esc(first):""}. Your prompts are ready.`,intro:`<p style="margin:0">Here's your copy of <b>${esc(what)}</b>: ${ps.reduce((s,p)=>s+p.prompts.length,0)} ready-to-paste prompts. Open it in any browser, save it as a PDF, or download the plain-text file.</p>`,cta:{href:dl,label:"Open your prompts",sub:`Or download the text file: <a href="${dl}.txt" style="color:#6b675e">${dl}.txt</a>`},rows:[["Order",o.id.slice(-8).toUpperCase()],["Date",date],["Item",what],["Paid",paid]],after:'<p style="margin:0 0 10px"><b>How to use:</b> replace everything in [BRACKETS] with your details and paste the prompt into ChatGPT, Claude or Gemini.</p><p style="margin:0;color:#6b675e;font-size:14px">This link is your personal copy, licensed for personal or internal business use. Stripe emails your card receipt separately.</p>'}),text=`Thanks for your order.

${what}
Open your prompts: ${dl}
Text file: ${dl}.txt

Order ${o.id.slice(-8).toUpperCase()} \xB7 ${date} \xB7 ${paid}

Questions? Reply to this email.
Bot or Nah \xB7 botornah.com`}else if(o.kind==="tool"&&TOOL[o.ref]){let t=TOOL[o.ref],dl=`${SITE}/dl/${o.token}`;subject=`Your download is ready: ${t.name}`,html2=emailShell({pre:"Your download link is inside. Keep this email.",title:`Thanks${first?", "+esc(first):""}. Your files are ready.`,intro:`<p style="margin:0">Here's your copy of <b>${esc(t.name)}</b>: ${t.files.length} files, starting with a Start Here guide. It works in ${esc(t.fmt.replace(/ \+ /g,", "))}.</p>`,cta:{href:dl,label:"Open your downloads"},rows:[["Order",o.id.slice(-8).toUpperCase()],["Date",date],["Item",t.name],["Paid",paid]],after:'<p style="margin:0 0 10px"><b>First step:</b> open 1-Start-Here.pdf. It says what each file is and how to open it in Excel or Google Sheets.</p><p style="margin:0;color:#6b675e;font-size:14px">This link is your personal copy, licensed for personal use or use in one business. Stripe emails your card receipt separately.</p>'}),text=`Thanks for your order.

${t.name}
Open your downloads: ${dl}

Order ${o.id.slice(-8).toUpperCase()} \xB7 ${date} \xB7 ${paid}

Questions? Reply to this email.
Bot or Nah \xB7 botornah.com`}else if(o.kind==="kit"){let rv=j.cr?await loadRev(env,j.cr):null,what=kitName(rv),dl=`${SITE}/dl/${o.token}`;subject=`Your ${what} is ready`,html2=emailShell({pre:"Your Build Kit link is inside. Keep this email.",title:`Thanks${first?", "+esc(first):""}. Your Build Kit is ready.`,intro:`<p style="margin:0">Here's your <b>${esc(what)}</b>: a step-by-step prompt sequence, a design system file, a page-by-page spec, the data model and a launch checklist. It takes up to a minute to prepare the first time you open it.</p>`,cta:{href:dl,label:"Open your Build Kit"},rows:[["Order",o.id.slice(-8).toUpperCase()],["Date",date],["Item",what],["Paid",paid]],after:`<p style="margin:0;color:#6b675e;font-size:14px">This link is your personal copy. Build your own original product; don't copy another company's name, logo, images or text. Stripe emails your card receipt separately.</p>`}),text=`Your ${what} is ready.

Open it: ${dl}

Order ${o.id.slice(-8).toUpperCase()} \xB7 ${date} \xB7 ${paid}

Questions? Reply to this email.
Bot or Nah \xB7 botornah.com`}else if(o.kind==="ad"){let ad=j.cr?await env.DB1.prepare("SELECT * FROM ads WHERE id = ?").bind(j.cr).first():null,aj=ad?JSON.parse(ad.json||"{}"):{},place=ad?SLOTS[ad.slot].name+(ad.target?` \xB7 ${CAT[ad.target]?.name||BY_SLUG[ad.target]?.q||ad.target}`:""):"Sponsor placement";subject=`Booking confirmed: ${place}`,html2=emailShell({pre:"We review your ad within 2 business days.",title:`You're booked${first?", "+esc(first):""}.`,intro:`<p style="margin:0">Thanks for sponsoring Bot or Nah. We've received your payment and your ad. Next, we review it within 2 business days and email you the day it goes live. Your time starts that day, not today.</p>`,rows:[["Booking",(ad?ad.id:o.id.slice(-8)).toUpperCase()],["Placement",place],["Length",`${ad?ad.term:j.term} month${(ad?ad.term:j.term)>1?"s":""}`],["Headline",aj.headline||"\u2014"],["Link",aj.url||"\u2014"],["Paid",paid],["Date",date]],after:`<p style="margin:0 0 10px">Need to change your copy or logo before it goes live? Just reply to this email.</p><p style="margin:0;color:#6b675e;font-size:14px">If we can't accept your ad, we refund you in full the same day. Stripe emails your card receipt separately.</p>`}),text=`You're booked.

Placement: ${place}
Headline: ${aj.headline||""}
Paid: ${paid}

We review your ad within 2 business days and email you the day it goes live.
Bot or Nah \xB7 botornah.com`}else subject="Payment received: Bot or Nah",html2=emailShell({pre:"Thanks for your payment.",title:"Payment received. Thank you.",intro:`<p style="margin:0">We've received your payment of <b>${paid}</b>. Reply to this email with anything we need from you (for an expedited review: the tool's name, link and a short description), and we'll take it from there.</p>`,rows:[["Order",o.id.slice(-8).toUpperCase()],["Date",date],["Paid",paid]]}),text=`Payment received: ${paid}. Reply with anything we need.
Bot or Nah`;let ok=await sendMail(env,{to:o.email,subject,html:html2,text}),extra="";if(o.kind==="ad"&&j.cr){let ad=await env.DB1.prepare("SELECT * FROM ads WHERE id = ?").bind(j.cr).first();if(ad){let aj=JSON.parse(ad.json||"{}");extra=`

AD ${ad.id} (${ad.slot}${ad.target?" / "+ad.target:""}, ${ad.term} mo)
Company: ${aj.company}
Headline: ${aj.headline}
Copy: ${aj.line}
Link: ${aj.url}
Logo: ${aj.img?SITE+"/ad/"+ad.id+".png":"none uploaded (they may email it)"}
Notes: ${aj.notes||"-"}

To approve, set this ad's status to 'approved'. It goes live automatically within about 10 minutes.`}}return await sendMail(env,{to:EMAIL,subject:`[Sale] ${paid} \xB7 ${o.kind} \xB7 ${o.ref||""}`,text:`New ${o.kind} order ${o.id}
${o.email}
${paid}
${o.json}${extra}`}),ok&&await env.DB1.prepare("UPDATE orders SET emailed = 1 WHERE id = ?").bind(id).run(),ok}async function subscribe(env,email,list,source){let prev=await env.DB1.prepare("SELECT status FROM subs WHERE email = ?").bind(email).first();if(prev&&prev.status==="active")return"already";let t=now();return prev?await env.DB1.prepare("UPDATE subs SET status = 'active', confirmed = ?, last_issue = NULL WHERE email = ?").bind(t,email).run():await env.DB1.prepare("INSERT OR IGNORE INTO subs (email, token, status, created, confirmed, source) VALUES (?,?,?,?,?,?)").bind(email,rid(16),"active",t,t,list+":"+(source||"")).run(),"active"}async function nlConfirm(env,t){if(!/^[a-f0-9]{32}$/.test(t))return!1;let r=await env.DB1.prepare("UPDATE subs SET status = 'active', confirmed = ?, last_issue = NULL WHERE token = ? AND status = 'pending'").bind(now(),t).run();return r.meta&&r.meta.changes>0}async function nlUnsub(env,t){if(!/^[a-f0-9]{32}$/.test(t))return!1;let r=await env.DB1.prepare("UPDATE subs SET status = 'unsub' WHERE token = ?").bind(t).run();return r.meta&&r.meta.changes>0}var nlPage=(ok,kind,t)=>layout({title:"Newsletter",desc:"",path:"/nl",noindex:!0,body:`<div class="wrap">${head3("Newsletter",kind==="confirm"?ok?`You're in. <span class="serif">Thanks.</span>`:"That link didn't work.":ok?"You're unsubscribed.":"That link didn't work.",kind==="confirm"?ok?"Watch for the next issue. Every email has a one-click unsubscribe link.":`Try signing up again, or email <a href="mailto:${EMAIL}">${EMAIL}</a>.`:ok?"You won't get any more newsletter emails from us. Changed your mind? Sign up again anytime.":`Email <a href="mailto:${EMAIL}">${EMAIL}</a> and we'll remove you by hand.`)}<a class="btn" href="/verdicts">Browse verdicts</a></div>`}),unsubConfirmPage=t=>layout({title:"Unsubscribe",desc:"",path:"/nl",noindex:!0,body:`<div class="wrap">${head3("Newsletter","Unsubscribe?","One click and you're off the list.")}<form method="post" action="/nl/unsub?t=${esc(t)}"><button class="btn" type="submit">Unsubscribe me</button></form></div>`});function dedupeHead(h,t){h=String(h||"");let n=s=>String(s||"").replace(/<[^>]*>/g," ").replace(/&[a-z0-9#]+;/gi," ").toLowerCase().replace(/^\s*lab notes\s*:\s*/,"").replace(/[^a-z0-9]+/g," ").trim(),m=h.match(/^\s*<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>\s*/i);if(!m)return h;let a=n(m[1]),b=n(t);if(!a||!b)return h;let lo=Math.min(a.length,b.length),hi=Math.max(a.length,b.length);return a===b||(a.includes(b)||b.includes(a))&&lo/hi>=.6?h.slice(m[0].length):h}async function emailTick(env){if(!env.EMAIL||!env.DB1)return"no-email";let out={orders:0,issue:0};for(let o of(await env.DB1.prepare("SELECT id FROM orders WHERE emailed = 0 AND email != '' ORDER BY created LIMIT 5").all()).results||[])await sendOrderEmails(env,o.id)&&out.orders++;await env.DB1.prepare("UPDATE subs SET status = 'active', confirmed = COALESCE(confirmed, created), last_issue = NULL WHERE status = 'pending'").run();let postal=await env.DB1.prepare("SELECT v FROM meta WHERE k = 'postal'").first(),issue=await env.DB1.prepare("SELECT * FROM issues WHERE status = 'ready' ORDER BY id LIMIT 1").first();if(issue&&postal&&postal.v){let batch=(await env.DB1.prepare("SELECT * FROM subs WHERE status = 'active' AND (last_issue IS NULL OR last_issue < ?) LIMIT 25").bind(issue.id).all()).results||[];for(let s of batch){let un=`${SITE}/nl/unsub?t=${s.token}`,foot=`You're getting this because you subscribed at botornah.com. <a href="${un}" style="color:#6b675e">Unsubscribe in one click</a>.<br>${esc(postal.v)}`,nad=pickAd([["newsletter",""]]),spon=nad?`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 22px;border:1px solid #e4ddcd;border-radius:12px;background:#f6f2e9"><tr><td style="padding:12px 14px;font-size:14px;line-height:1.5;color:#2b2925"><span style="display:block;font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#8a867c;margin-bottom:3px">Sponsored</span><b>${esc(nad.company)}:</b> ${esc(nad.headline)}. ${esc(nad.line)} <a href="${esc(nad.url)}" rel="sponsored" style="color:#0a58b0">Learn more</a></td></tr></table>`:"";await sendMail(env,{to:s.email,subject:issue.subject,html:emailShell({pre:issue.pre||"",title:issue.title||issue.subject,intro:spon+dedupeHead(issue.html,issue.title||issue.subject),foot}),text:`${issue.text}

Unsubscribe: ${un}
${postal.v}`,headers:{"List-Unsubscribe":`<${un}>`,"List-Unsubscribe-Post":"List-Unsubscribe=One-Click"}})&&(out.issue++,await env.DB1.prepare("UPDATE subs SET last_issue = ? WHERE email = ?").bind(issue.id,s.email).run())}batch.length||await env.DB1.prepare("UPDATE issues SET status = 'sent', sent = ? WHERE id = ?").bind(now(),issue.id).run()}return out}async function migrateSubs(env){if(await env.DB1.prepare("SELECT v FROM meta WHERE k = 'subs_migrated'").first())return;let r=await env.DB.list({prefix:"sub:"});for(let k of r.keys){let[,list,email]=k.name.split(":");email&&await env.DB1.prepare("INSERT OR IGNORE INTO subs (email, token, status, created, source) VALUES (?,?,?,?,?)").bind(email,rid(16),"active",now(),list+":kv").run()}await env.DB1.prepare("INSERT OR REPLACE INTO meta (k, v) VALUES ('subs_migrated', ?)").bind(now()).run()}var addMonths=(iso,m)=>{let d=new Date(iso);return d.setUTCMonth(d.getUTCMonth()+m),d.toISOString()};async function adsTick(env){let list=(await env.DB1.prepare("SELECT * FROM ads WHERE status = 'approved' ORDER BY created LIMIT 5").all()).results||[];for(let a of list){let s=SLOTS[a.slot],t=now(),busy=(await env.DB1.prepare("SELECT end_at FROM ads WHERE slot = ? AND target = ? AND status = 'live' AND end_at > ? ORDER BY end_at").bind(a.slot,a.target||"",t).all()).results||[],start=busy.length<s.cap?t:busy[busy.length-s.cap].end_at,end=addMonths(start,a.term);await env.DB1.prepare("UPDATE ads SET status = 'live', start_at = ?, end_at = ? WHERE id = ?").bind(start,end,a.id).run();let j=JSON.parse(a.json||"{}"),fmt=d=>new Date(d).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric",timeZone:"America/Chicago"}),soon=start>t;await sendMail(env,{to:a.email,subject:soon?`Approved: your ad starts ${fmt(start)}`:"Your ad is live on Bot or Nah",html:emailShell({pre:soon?"Approved and scheduled.":"Approved and live.",title:soon?"Approved and scheduled.":"Your ad is live.",intro:`<p style="margin:0">${soon?"Your spot is currently taken, so your ad starts the day the current one ends.":"Your ad passed review and is live now."}</p>`,rows:[["Placement",s.name],["Headline",j.headline||""],["Starts",fmt(start)],["Ends",fmt(end)]],after:'<p style="margin:0">Want to change the copy while it runs? Reply to this email.</p>'}),text:`${soon?"Approved. Starts "+fmt(start):"Your ad is live."} Ends ${fmt(end)}.`})}return await env.DB1.prepare("UPDATE ads SET status = 'ended' WHERE status = 'live' AND end_at <= ?").bind(now()).run(),list.length}var HOOK=HOOK_PATH;var V2="202609301420",CSP=["default-src 'none'","script-src 'self' https://static.cloudflareinsights.com","style-src 'self' 'unsafe-inline' https://fonts.googleapis.com","font-src https://fonts.gstatic.com","img-src 'self' data: https://startupfa.me https://www.betterlaunch.co","connect-src 'self' https://cloudflareinsights.com","form-action 'self' https://buy.stripe.com https://checkout.stripe.com","base-uri 'none'","frame-ancestors 'none'","manifest-src 'self'"].join("; "),SEC={"x-content-type-options":"nosniff","referrer-policy":"strict-origin-when-cross-origin","x-frame-options":"DENY","permissions-policy":"camera=(), microphone=(), geolocation=(), interest-cohort=()","strict-transport-security":"max-age=31536000; includeSubDomains","content-security-policy":CSP},EXT='<link rel="stylesheet" href="/k/site.css"><script src="/k/site.js" defer><\/script></head>',html=(body,status=200)=>new Response(body.replaceAll("@@V@@",V2).replace("</head>",EXT),{status,headers:{...SEC,"content-type":"text/html; charset=utf-8","cache-control":"public, max-age=300"}}),json=(obj,status=200)=>new Response(JSON.stringify(obj),{status,headers:{...SEC,"content-type":"application/json; charset=utf-8","cache-control":"no-store"}}),priv=(body,status=200,extra={})=>new Response(body.replaceAll("@@V@@",V2).replace("</head>",EXT),{status,headers:{...SEC,"content-type":"text/html; charset=utf-8","cache-control":"private, no-store","x-robots-tag":"noindex",...extra}}),asset=(body,type,maxAge=31536e3)=>new Response(body,{headers:{...SEC,"content-type":type,"cache-control":`public, max-age=${maxAge}`}}),b64=s=>{let bin=atob(s),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u},STATIC={"/verdicts":verdicts,"/how-it-works":howItWorks,"/submit":submit,"/newsletter":newsletter,"/packs":packsPage,"/sponsor":advertisePage,"/contact":contact,"/refunds":refunds,"/terms":terms,"/privacy":privacy,"/credits":credits,"/savings":savingsPage},cache=new Map,page=(key,fn)=>(cache.has(key)||cache.set(key,fn()),cache.get(key));async function iconFrom(env,ctx,slug){let c=caches.default,key=new Request("https://botornah.com/__icon/"+slug),r=await c.match(key);if(r)return r;let row=await env.DB1.prepare("SELECT type, b64 FROM icons WHERE slug = ?").bind(slug).first().catch(()=>null);if(!row)return null;r=asset(b64(row.b64),row.type,2592e3);ctx.waitUntil(c.put(key,r.clone()));return r}async function upstream(ctx,url,type,ttl){let cache2=caches.default,key=new Request(url),r=await cache2.match(key);if(r)return r;let u=await fetch(url,{cf:{cacheTtl:ttl,cacheEverything:!0}});return u.ok?(r=new Response(u.body,{headers:{...SEC,"content-type":type,"cache-control":`public, max-age=${ttl}`}}),ctx.waitUntil(cache2.put(key,r.clone())),r):null}var letterIcon=l=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="10" fill="#efe9dc"/><text x="20" y="26" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" font-weight="700" fill="#5d5a52">${l}</text></svg>`,homeCache={t:0,d:null};async function homeData(env){if(Date.now()-homeCache.t<3e4&&homeCache.d)return{...homeCache.d,globe:globeSection(await globeStats(env).catch(()=>null))};let db=env.DB1,d={apps:{n:0},tape:[],appCards:"",sampleYear:0};try{let[cnt,tape,cards,sample]=await Promise.all([db.prepare("SELECT COUNT(*) n, COUNT(DISTINCT category) cats FROM apps WHERE disc = 0").first(),db.prepare("SELECT slug,name,price,verdict FROM apps WHERE disc = 0 AND priority = 5 ORDER BY name LIMIT 30").all(),db.prepare("SELECT slug,name,category,tagline,price,verdict,summary FROM apps WHERE disc = 0 AND verdict = 'yes' AND priority = 5 ORDER BY price DESC LIMIT 6").all(),db.prepare("SELECT SUM(price) s FROM apps WHERE slug IN ('calendly','canva','grammarly','linktree')").first()]);d.apps={n:cnt?.n||0,cats:cnt?.cats||0},d.tape=tape.results||[],d.appCards=(cards.results||[]).map(appCard).join(""),d.sampleYear=Math.round((sample?.s||0)*12)}catch(e){console.error("home data",e)}return homeCache={t:Date.now(),d},{...d,globe:globeSection(await globeStats(env).catch(()=>null))}}var EMAIL_RE=/^[^\s@<>()[\]\\,;:"]{1,64}@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;async function ipHash(req){let ip=req.headers.get("cf-connecting-ip")||"0",day=new Date().toISOString().slice(0,10),d=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(`bon|${day}|${ip}`));return[...new Uint8Array(d)].slice(0,12).map(b=>b.toString(16).padStart(2,"0")).join("")}async function limited(env,h,action,max){let key=`rl:${action}:${h}:${new Date().toISOString().slice(0,13)}`,n=parseInt(await env.DB.get(key)||"0",10);return n>=max?!0:(await env.DB.put(key,String(n+1),{expirationTtl:3600}),!1)}async function readBody(req){let ct=req.headers.get("content-type")||"";return ct.includes("application/json")?await req.json():ct.includes("form")?Object.fromEntries(await req.formData()):{}}var wantsJson=req=>(req.headers.get("accept")||"").includes("application/json")||(req.headers.get("content-type")||"").includes("application/json"),done=(req,kind,message)=>wantsJson(req)?json({ok:!0,message}):Response.redirect(new URL(`/thanks?k=${kind}`,req.url).toString(),303),fail=(req,error,status=400)=>wantsJson(req)?json({ok:!1,error},status):html(layout({title:"Error",desc:"",path:"/x",body:`<div class="wrap"><div class="page-head"><h1>Hmm.</h1><p class="lede">${esc(error)} <a href="/">Go home</a></p></div></div>`}),status),sameOrigin=req=>{let o=req.headers.get("origin");return!o||o===new URL(req.url).origin};async function api(req,env,path){if(!env.DB)return json({ok:!1,error:"Storage not configured."},503);if(path==="/api/votes"&&req.method==="GET"){let slug=new URL(req.url).searchParams.get("slug")||"";return BY_SLUG[slug]?json(JSON.parse(await env.DB.get("votes:"+slug)||'{"yes":0,"no":0}')):json({error:"Unknown verdict."},404)}if(req.method!=="POST")return json({ok:!1,error:"Method not allowed."},405);if(!sameOrigin(req))return json({ok:!1,error:"Bad origin."},403);if(parseInt(req.headers.get("content-length")||"0",10)>8e3)return fail(req,"That's too long.",413);let body;try{body=await readBody(req)}catch{return fail(req,"Couldn't read the form.")}let h=await ipHash(req);if(path==="/api/vote"){let slug=String(body.slug||""),vote=String(body.vote||"");if(!BY_SLUG[slug]||!["yes","no"].includes(vote))return json({ok:!1,error:"Invalid vote."},400);let k="votes:"+slug,counts=JSON.parse(await env.DB.get(k)||'{"yes":0,"no":0}'),seen=`vd:${h}:${slug}`;return await env.DB.get(seen)?json({ok:!0,counts,error:"Thanks, we already have your vote on this one."}):await limited(env,h,"vote",30)?json({ok:!1,error:"Too many votes. Try again later."},429):(counts[vote]++,await env.DB.put(k,JSON.stringify(counts)),await env.DB.put(seen,vote,{expirationTtl:86400}),json({ok:!0,counts}))}if(String(body.website||""))return done(req,"sub","Thanks!");if(path==="/api/subscribe"){let email=String(body.email||"").trim().toLowerCase(),list=body.list==="packs"?"packs":"news";if(!EMAIL_RE.test(email)||email.length>200)return fail(req,"Please enter a valid email address.");if(await limited(env,h,"sub",8))return fail(req,"Too many sign-ups from your network. Try again in an hour.",429);let key=`sub:${list}:${email}`;await env.DB.get(key)||await env.DB.put(key,JSON.stringify({ts:new Date().toISOString()}));let st="active";if(env.DB1)try{st=await subscribe(env,email,list,body.src||"")}catch(e){console.error("sub",String(e))}return done(req,"sub",st==="already"?"You're already subscribed. Thanks!":"You're subscribed. Watch for the next issue.")}if(path==="/api/submit"){let kind=["task","app","tool","correction"].includes(body.kind)?body.kind:"task",task=String(body.task||"").trim().slice(0,200),details=String(body.details||"").trim().slice(0,2e3),email=String(body.email||"").trim().toLowerCase().slice(0,200);if(task.length<3)return fail(req,"Please describe the task or tool.");if(email&&!EMAIL_RE.test(email))return fail(req,"That email address doesn't look right. Leave it blank if you prefer.");if(await limited(env,h,"submit",6))return fail(req,"Too many suggestions from your network. Try again in an hour.",429);let ts=new Date().toISOString();return await env.DB.put(`sug:${ts}:${crypto.randomUUID().slice(0,8)}`,JSON.stringify({kind,task,details,email,ts})),env.DB1&&await env.DB1.prepare("INSERT INTO requests (kind, task, details, email, created) VALUES (?,?,?,?,?)").bind(kind,task,details,email,ts).run().catch(e=>console.error("req",String(e))),done(req,"submit","Thanks! We read every suggestion.")}return json({ok:!1,error:"Not found."},404)}var TT_RUN="@cf/meta/llama-3.3-70b-instruct-fp8-fast",TT_JUDGE="@cf/openai/gpt-oss-120b",TT_CAP=18,
TT_CASES=["a typical, straightforward situation with every detail filled in clearly","a messier but realistic situation: one or two details are vague, awkward or incomplete, the way a real person would type them"],
ttOut=r=>{let o=typeof r=="string"?r:r?.response??r?.result?.response??r?.choices?.[0]?.message?.content??r?.result?.choices?.[0]?.message?.content??"";return typeof o=="string"?o:JSON.stringify(o)},
ttJson=s=>{let a=s.indexOf("{"),b=s.lastIndexOf("}");if(a<0||b<=a)return null;try{return JSON.parse(s.slice(a,b+1))}catch{return null}},
ttNorm=s=>String(s).replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g," ").trim(),
ttWords=s=>(s.match(/[A-Za-z0-9À-ɏ$%'’.,:\/-]*[A-Za-z0-9]/g)||[]).length,
ttSentences=s=>(s.replace(/\b(e\.g|i\.e|etc|Mr|Mrs|Ms|Dr|vs|St)\./gi,"$1").match(/[^.!?]+[.!?]+(\s|$)/g)||[s]).filter(x=>x.trim()).length,
ttSpan=(out,first,last)=>{let o=ttNorm(out),f=ttNorm(first).slice(0,80),l=ttNorm(last).slice(-80);if(!f||!l)return null;let i=o.indexOf(f);if(i<0)return null;let j=o.indexOf(l,i);if(j<0)return null;return o.slice(i,j+l.length)};
async function ttTest(ai,v,n){
 let keys=[...new Set(v.prompt.match(/\[[^\]\n]{1,80}\]/g)||[])],values={},filled=v.prompt;
 if(keys.length){
  let f=ttJson(ttOut(await ai(TT_JUDGE,{messages:[{role:"system",content:"You invent realistic sample details for testing a prompt. Everything must be made up: no real people's personal data, no real account numbers. Reply with JSON only."},{role:"user",content:`Prompt being tested:\n"""\n${v.prompt}\n"""\n\nTask it is for: ${v.q}\n\nFill in every placeholder with invented but realistic details for ${TT_CASES[n-1]}. Keep each value under 60 words, unless the placeholder asks for a pasted document, message, list or data; then write a short realistic one (under 180 words).\n\nPlaceholders: ${JSON.stringify(keys)}\n\nReturn JSON: {"values": {"[PLACEHOLDER]": "value"}}`}],max_tokens:2500,reasoning:{effort:"low"}})));
  let got=f&&f.values||{};
  for(let k of keys){let val=got[k]??got[k.slice(1,-1)];if(typeof val!="string"||!val.trim())return{error:"fill missing "+k};values[k]=val.trim();filled=filled.split(k).join(val.trim())}
 }
 let output=ttOut(await ai(TT_RUN,{messages:[{role:"user",content:filled}],max_tokens:1400})).trim();
 if(output.length<40)return{error:"empty answer"};
 let jr=ttJson(ttOut(await ai(TT_JUDGE,{messages:[{role:"system",content:"You grade an AI answer strictly against the rules written in the prompt it was given. Never add rules the prompt doesn't state. Quote the answer exactly when asked. Reply with JSON only."},{role:"user",content:`PROMPT AS SENT:\n"""\n${filled}\n"""\n\nDETAILS THE TESTER SUPPLIED: ${JSON.stringify(values)}\n\nANSWER:\n"""\n${output}\n"""\n\n1. checks: pick the 4 most important rules or required parts the prompt states (MUST/NEVER rules, required sections, format). For each, write a short plain-English statement of what was required (under 12 words, no quotes) and whether the answer met it. Don't include word or sentence limits here.\n2. invented: list specific facts the answer states about the user's own situation (numbers, names, dates, places, events, credentials, prices) that appear nowhere in the prompt or the supplied details. Copy each one as an exact quote from the answer, under 15 words. General advice, clearly marked placeholders, questions to the user and example wording the prompt asked for don't count. Empty list if none.\n3. limits: for every word or sentence limit the prompt sets on its output, give {"text": short label like "Email under 150 words", "max": number, "unit": "words" or "sentences", "first": the first 6 words of exactly the part the limit covers, copied exactly, "last": the last 6 words of that part, copied exactly}. Empty list if the prompt sets no limit.\n4. excerpt: one or two consecutive sentences copied exactly from the answer that show what it produced (under 45 words).\n5. note: one short sentence telling a reader what to watch for with this prompt, or "" if nothing.\n\nReturn JSON: {"checks":[{"text":"...","pass":true}],"invented":["..."],"limits":[],"excerpt":"...","note":"..."}`}],max_tokens:4000,reasoning:{effort:"low"}})));
 if(!jr||!Array.isArray(jr.checks)||!jr.checks.length)return{error:"judge unreadable"};
 let cap=t=>t.charAt(0).toUpperCase()+t.slice(1),checks=jr.checks.slice(0,5).filter(c=>c&&typeof c.text=="string"&&c.text.trim()&&!/\d+\s*(words?|sentences?)\b/i.test(c.text)).map(c=>[cap(c.text.trim().replace(/\.$/,"")),c.pass===true?1:0]);
 let ON=ttNorm(output),invented=(Array.isArray(jr.invented)?jr.invented:[]).filter(q=>typeof q=="string"&&q.trim().length>2&&ON.includes(ttNorm(q))).slice(0,5);
 for(let L of Array.isArray(jr.limits)?jr.limits.slice(0,3):[]){let max=Number(L&&L.max);if(!(max>0))continue;let unit=L.unit==="sentences"?"sentences":"words",span=ttSpan(output,L.first||"",L.last||"");if(!span)continue;let c=unit==="words"?ttWords(span):ttSentences(span);checks.push([`${cap(String(L.text||`Under ${max} ${unit}`).trim().replace(/\.$/,""))} (${c} ${unit}, counted by code)`,c<=max?1:0])}
 checks.push([invented.length?"Made up details we never gave it":"Didn't make up details we never gave it",invented.length?0:1]);
 let ex=typeof jr.excerpt=="string"?jr.excerpt.trim():"";if(!ex||!ON.includes(ttNorm(ex))||ttWords(ex)<8){let s=(ON.match(/[^.!?]{40,240}[.!?]/)||[ON.slice(0,200)])[0];ex=s.trim()}
 let fails=checks.filter(c=>!c[1]).length;
 return{n,case:TT_CASES[n-1],model:"Llama 3.3 70B",judge:"GPT-OSS 120B",date:new Date().toISOString().slice(0,10),values,prompt:filled,output,checks,invented,excerpt:ttNorm(ex).slice(0,400),result:fails?fails>2?"fail":"partial":"pass",note:typeof jr.note=="string"?jr.note.trim().slice(0,300):""}
}
async function ttTick(env){if(!env.AI||!env.DB1||!env.DB)return"off";let day=new Date().toISOString().slice(0,10),ck="tt:day:"+day,cnt=Number(await env.DB.get(ck)||0);if(cnt>=TT_CAP)return"cap "+cnt;if(await aiLeft(env,TT_AI_MAX)<900)return"ai budget used: tests resume after 00:00 UTC";await env.DB1.prepare("CREATE TABLE IF NOT EXISTS tests (slug TEXT NOT NULL, n INTEGER NOT NULL, date TEXT, json TEXT NOT NULL, PRIMARY KEY (slug, n))").run();let done=new Set(((await env.DB1.prepare("SELECT slug || ':' || n k FROM tests").all()).results||[]).map(r=>r.k)),skip={};try{skip=JSON.parse(await env.DB.get("tt:skip")||"{}")}catch{}let pick=null;for(let n of[1,2]){for(let v of VERDICTS){let k=v.slug+":"+n;if(v.prompt&&!done.has(k)&&(skip[k]||0)<3){pick=[v,n,k];break}}if(pick)break}if(!pick)return"all done";let[v,n,k]=pick;await env.DB.put(ck,String(cnt+1),{expirationTtl:172800});let r,via=new Set;try{r=await ttTest(async(m,b)=>{let x=await aiRun(env,m,b,TT_AI_MAX,{kind:"test",bg:1});via.add(x&&x.__via||"cf");return x},v,n);if(r&&!r.error&&via.has("local")){let L=env.LOCAL_AI_LABEL||"Bot or Nah's own AI server",J=env.LOCAL_AI_JUDGE_LABEL||L;via.has("cf")?(r.model+=" / "+L,r.judge+=" / "+J):(r.model=L,r.judge=J)}}catch(e){r={error:String(e).slice(0,200),cap:!!(e&&e.aiCap)}}if(r.error&&r.cap){await env.DB.put(ck,String(cnt),{expirationTtl:172800});return"ai budget: "+k+" carried to next UTC day"}if(r.error){skip[k]=(skip[k]||0)+1;await env.DB.put("tt:skip",JSON.stringify(skip));return"err "+k+" "+r.error}await env.DB1.prepare("INSERT OR REPLACE INTO tests (slug, n, date, json) VALUES (?, ?, ?, ?)").bind(v.slug,n,r.date,JSON.stringify(r)).run();return"ok "+k+" "+r.result}
var AI_CAP=9000,AI_HARD=9900,TT_AI_MAX=4000,AI_RATES={"@cf/openai/gpt-oss-120b":[31818,68182],"@cf/meta/llama-3.3-70b-instruct-fp8-fast":[26668,204805],"@cf/openai/gpt-oss-20b":[18182,27273]};
function aiDay(){return new Date().toISOString().slice(0,10)}
function aiNum(v){if(v==null)return 0;let n=Number(String(v).replace(/"/g,"").trim());return Number.isFinite(n)?n:AI_HARD}
async function aiUsed(env){return aiNum(await env.DB.get("ai:n:"+aiDay()))}
async function aiLeft(env,lim){return(lim||AI_CAP)-await aiUsed(env)}
function aiCost(m,i,o){let r=AI_RATES[m]||[31818,204805];return(i*r[0]+o*r[1])/1e6}
async function aiRun(env,m,b,lim,o){return aiRoute(env,m,b,lim,o,aiRunWorkersAI)}
async function aiRunWorkersAI(env,m,b,lim){lim=lim||AI_CAP;let k="ai:n:"+aiDay(),used=aiNum(await env.DB.get(k)),inT=Math.ceil(JSON.stringify(b.messages||b.prompt||"").length/3),est=aiCost(m,inT,b.max_tokens||2048);if(used+est>lim){let e=new Error("AI_CAP: daily Workers AI budget reached ("+Math.round(used)+"/"+lim+" neurons); work carried to the next UTC day");e.aiCap=!0;throw e}await env.DB.put(k,String(Math.round(used+est)),{expirationTtl:259200});let r,act=null;try{r=await env.AI.run(m,b);let u=r&&(r.usage||r.result&&r.result.usage);if(u&&(u.prompt_tokens||u.completion_tokens))act=aiCost(m,u.prompt_tokens||inT,u.completion_tokens||0)}catch(e){act=aiCost(m,inT,0);throw e}finally{if(act!=null){let cur=aiNum(await env.DB.get(k));await env.DB.put(k,String(Math.max(0,Math.round(cur-est+act))),{expirationTtl:259200})}}return r}
async function aiQueueTick(env){if(!env.AI||!env.DB||!env.DB1)return"off";let l=await env.DB.list({prefix:"ai:q:",limit:20}),done=[];for(let x of l.keys){if(done.length>=2)break;let n=x.name;if(n.startsWith("ai:q:kit:")){if(await aiLeft(env,AI_HARD)<1200)break;await env.DB.delete(n);let y=await kitFor(env,n.slice(9),1);y&&y.kit&&done.push(n);if(await env.DB.get(n))break}else if(n.startsWith("ai:q:rv:")){if(await aiLeft(env)<500)break;let id=n.slice(8),ev=null;try{ev=JSON.parse(await env.DB.get(n)||"null")}catch{}let r=ev&&await loadRev(env,id);if(!r){await env.DB.delete(n);continue}let ai;try{ai=rvSane(rvParseJson(await rvAsk(env,RV_SYS,rvFirstPrompt(ev),1400,1)),ev)}catch(e){if(e&&e.aiCap)break;console.error("aiq rv",String(e));await env.DB.delete(n);continue}r.j.ai=ai;await env.DB1.prepare("UPDATE reverses SET json = ? WHERE id = ?").bind(JSON.stringify(r.j),id).run();await env.DB.delete(n);done.push(n)}}return{queued:l.keys.length,done}}
var worker_default={async scheduled(ev,env,ctx){try{console.log("sync",JSON.stringify(await syncStep(env)))}catch(e){console.error("sync failed",String(e))}try{await loadExtras(env,()=>cache.clear()),await migrateSubs(env),console.log("ads",await adsTick(env)),console.log("email",JSON.stringify(await emailTick(env)))}catch(e){console.error("tick failed",String(e))}try{console.log("aiq",JSON.stringify(await aiQueueTick(env)))}catch(e){console.error("aiq failed",String(e))}try{console.log("tests",await ttTick(env))}catch(e){console.error("tests failed",String(e))}try{console.log("relay",await relaySweep(env))}catch(e){console.error("relay sweep failed",String(e))}},async fetch(req,env,ctx){let url=new URL(req.url);if(url.hostname==="www.botornah.com")return url.hostname="botornah.com",Response.redirect(url.toString(),301);let path=url.pathname.length>1?url.pathname.replace(/\/+$/,""):"/";if(path.startsWith("/__ai/"))return relayRoute(req,env,path);if(path==="/advertise"||path==="/advertise/book")return Response.redirect(url.origin+path.replace("/advertise","/sponsor")+url.search,301);if(path==="/theme.js")return new Response(THEME_JS,{headers:{...SEC,"content-type":"text/javascript; charset=utf-8","cache-control":"public, max-age=31536000, immutable"}});try{if(await loadExtras(env,()=>cache.clear()),path==="/hooks/stripe/"+HOOK&&req.method==="POST")return new Response("ok",{status:await handleWebhook(req,env)});if(path==="/api/book"&&req.method==="POST"){if(!sameOrigin(req))return fail(req,"Bad origin.",403);let h=await ipHash(req);if(await limited(env,h,"book",10))return fail(req,"Too many attempts. Try again in an hour.",429);let r=await handleBook(req,env);return r.error?fail(req,r.error):Response.redirect(r.redirect.startsWith("/")?url.origin+r.redirect:r.redirect,303)}if(path==="/nl/unsub"&&req.method==="POST")return priv(nlPage(await nlUnsub(env,url.searchParams.get("t")||""),"unsub"));if(path==="/api/reverse"&&req.method==="POST"){if(!sameOrigin(req))return fail(req,"Bad origin.",403);let r=await handleReverse(req,env);return r.error?wantsJson(req)?json({ok:!1,error:r.error},400):html(reversePage(r.error,r.val||""),400):wantsJson(req)?json({ok:!0,id:r.id,url:"/reverse/r/"+r.id}):Response.redirect(url.origin+"/reverse/r/"+r.id,303)}if(path==="/admin/upload")return await adminUpload(req,env,url);if(path.startsWith("/api/")&&path!=="/api/globe"&&path!=="/api/apps-lite"&&path!=="/api/alts")return await api(req,env,path);if(req.method!=="GET"&&req.method!=="HEAD")return new Response("Method not allowed",{status:405,headers:{allow:"GET, HEAD"}});let logV=()=>{req.method==="GET"&&ctx.waitUntil(logVisit(env,req,path).catch(e=>console.error("log",e)))};switch(path){case"/styles.css":return asset(styles_default,"text/css; charset=utf-8");case"/app.js":return asset(app_client_default,"application/javascript; charset=utf-8");case"/x.css":return asset(EXTRA_CSS,"text/css; charset=utf-8");case"/t.css":return asset(TOOLS_CSS,"text/css; charset=utf-8");case"/tools":return logV(),html(page("/tools",()=>toolsPage()));case"/reverse/sample-kit":return Response.redirect(url.origin+"/reverse",301);case"/reverse":return logV(),html(page("/reverse",()=>reversePage()));case"/buy/kit":{let rid=url.searchParams.get("r")||"",as=url.searchParams.get("app")||"";if(!rid&&/^[a-z0-9-]{1,80}$/.test(as))rid=await appKitRev(env,as).catch(()=>null)||"";let rv=await loadRev(env,rid),link=await env.DB1.prepare("SELECT url FROM links WHERE kind = 'kit' LIMIT 1").first();if(!rv||!link)return Response.redirect(url.origin+"/reverse",302);let u=new URL(link.url);return u.searchParams.set("client_reference_id",rv.id),Response.redirect(u.toString(),303)}case"/k/site.css":case"/k/site.js":case"/k/build.js":{let t=await env.DB.get("k:"+path.slice(3));return new Response(t||"",{headers:{...SEC,"content-type":path.endsWith(".css")?"text/css; charset=utf-8":"text/javascript; charset=utf-8","cache-control":path==="/k/build.js"?"public, max-age=3600":"public, max-age=300"}})}case"/favicon.svg":return asset(FAVICON,"image/svg+xml",604800);case"/favicon.ico":return Response.redirect(url.origin+"/favicon.svg",301);case"/og.png":case"/og-apps.png":case"/apple-touch-icon.png":{let v=env.DB&&await env.DB.get("img:"+path.slice(1));return v?asset(b64(v),"image/png",86400):new Response("Not found",{status:404})}case"/globe.js":{let g=env.DB&&await env.DB.get("k:globe.js");if(g)return new Response(g,{headers:{"content-type":"application/javascript; charset=utf-8","cache-control":"public, max-age=3600"}});return new Response("",{status:502})}case"/api/globe":return json(await globeStats(env).catch(()=>({unavailable:!0})));case"/api/alts":{let sl=[...new Set((url.searchParams.get("s")||"").split(",").filter(x=>/^[a-z0-9-]{1,80}$/.test(x)))].slice(0,20),out={};if(sl.length&&env.DB1){let r=await env.DB1.prepare(`SELECT slug, json_extract(json,'$.alternatives') a, json_extract(json,'$.diyTimeEstimate') d FROM apps WHERE disc = 0 AND slug IN (${sl.map(()=>"?").join(",")})`).bind(...sl).all();for(let x of r.results||[]){let a=[];try{a=JSON.parse(x.a||"[]")}catch{}out[x.slug]={diy:String(x.d||"").slice(0,80),alts:(Array.isArray(a)?a:[]).filter(t=>t&&t.name).slice(0,6).map(t=>({name:String(t.name).slice(0,80),hosted:t.type==="free"&&t.selfHost==="hosted"}))}}}return new Response(JSON.stringify(out),{headers:{...SEC,"content-type":"application/json","cache-control":"public, max-age=3600"}})}case"/api/apps-lite":{let r=await env.DB1.prepare("SELECT slug s, name n, price p, verdict v, alts a FROM apps WHERE disc = 0 ORDER BY priority DESC, name").all();return new Response(JSON.stringify(r.results||[]),{headers:{...SEC,"content-type":"application/json","cache-control":(r.results||[]).length>900?"public, max-age=3600":"no-store"}})}case"/apps":{let h=await appsIndex(env.DB1,url);return logV(),html(h)}case"/badges/toolpilot.png":return asset(b64("iVBORw0KGgoAAAANSUhEUgAAASwAAABCCAIAAABilny8AAAAJGVYSWZJSSoACAAAAAEAPAECAAkAAAAaAAAAAAAAAGltYWdlcnk0AAAnPYy6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACNlJREFUeNrsnV1IVE0Yx9XWbfGjD5HC3D4gL4ywLkoriAoKkr2oNIM+EC/qIlqDt6BQIwoiCSqKSkGIorpIhLXyoghM9KYv7CpLs6u1wixKyso0dd8/O73zDuesx91zdldX/78LmT175pnnHJ//PDNzjmO8z+eLI4SMHwm8BYRQhIRMaWyyFB8fH82Gu7q65s+fPzVvent7e19fn/yYmpq6ZMkSUf7+/XtHR4d6cnZ29owZMzQWPnz4gDNlLcHz58/1banGcYLemuagxoGArWsayvQjHQPG1Y2Bcdwf4fmmTZsCtq5elOp2Xl5eLMZDvJwTUoRR48CBA2ocI3Sqq6tlhOFb9WR8pY+t4uJiRGpTU5MaoytXrtS3pRrHCXprmoN6Bw4ePFhSUqKpMtoJN27cuHz5skai+LawsDCYvqmsrAwahsAgM9EXlJaWauqK1u/duyeVL91ubW2N7UxIook+slWMgwnBikiFbO7cuaMakbUQjqtWrTKwPybCFNLLlStXICqoQiPdgF1DwD6lvr6+srISiqqoqDBoEVfkdruhK9SV6oKkURcFjQ7R9Zw+fVq2wjkhiTaNjY0Yp0FmKES0IcQ6EpGQvTkLEOSZM2fQHUCKAUfLEugNP6uqqtT8hoq4UnQE6A7Uk+EVVC2qTKo5oUpiYmJWVlZEG05OTqaczIEEiKyC7IQcBXloZkcTEGgJgnn27JnBnA0qxWn6GSByIPoaCBhqlAedTqewiYOqaCeVCHFhr1+/ZrhHDoy+ZGZQFzb0Kx+awBXZT0QkvsLHyIkQTkLnEEZBQYF+SBz86gu+hasG6VRcL3J7wFwqPNELG6qGe8i0k1OEJNLU+xltfqgujWjmh2IsKspiqIbqYXdPLr0gEd26dUuvMXX1xWB+GOl5dXFxsXpDKEIS8YUZTI0Qc6grUge0IY6EPQqhK1jGeA/pKzU1NeAJIQkPqSxgotNcXZAHBRgC4FZUVlbG6JMJijBWZ4OaLKTJjWNiENP6QSB+ItVAihaTLboMiBCjVoPm0KFoJn7qSHU0maEjw+VDh8E8AokxEXq9XnMLJw0NDRs3bhTlR48ebdmyJeweo2N2uVzoiR0Ox1QTIQIOYadKQjwAgLSCeSaO1KEJdDHDHC3EYRNtlZWVoYrpmSd8Ew85jHWCJnAtmHxqGkIXAPcMWq+oqEBPMfFXp0IWoc/n+/Xrlwlz3759U8vmjBgDm9evX797925nZ2d6evqkFJu6MCOXbdr9aJ62IbIxLdQ8MBwNhDgUC2soiMyDj8YVoQ1oAKdhZjjawozm/ZW+vj7hP+SH0+AbWqyqqjL2rbS0FCe73W75dB5GoF6kUOO6YlCqGR1wOBoNent7169f/+rVq0kpQnVhRs4ekbUQzfouHzoRGXJMswhuseApQ7bEj3GtY8eObd26FRlJPVMNevXpvNCn9B9fBdOEyLoQGzqUSj+yOg6OmeXEc0j9CmqsEObX1jwejxx14L5s3749ot739PTMmTOHc8VQx4fijTATL3ZG0z39k5vJyv+ZMCkpyUT9gYGB4eHhoFqy2ex2u0V3BwcHh4aG5MeHDx9iPkBdhYR4akf3JqIIf/78aaJ+fn4+lBDMmUVFRbdv37bo7q5du2pra9XpB0VFYh2+O0oIRUgIRUgIoQgJoQgJIRQhIRQhIYQiJIQiJIRQhIRQhIQQipAQipAQQhESQhESQihCQihCQkiEGbeNnpKSktSNKoJEs5XGrFmzZNnr9e7cuTMsvtXU1Cxbtkx+bGlpOX/+/OfPn0O1M23atJycnLNnz6akpGi+unr1am1trYndDKZPn+5yuY4ePaoeLCgo+PjxIwq5ubmXLl0K72+qvLy8ubnZdHW73Q6Hjxw5kpCQYOxwfn6+2K0vvFfR3d2NS3jz5o2Juk6n8/jx42ow3L9//9SpU2Fx7MmTJ39LPmts3rxZtevxeORXKKtfQSFqxbDsK/Xlyxdp8P9Lsox6FdY3mXc4HO3t7eq1r1ixwqLNBQsWDAwMSINyC9ZFixb5ws3SpUut31JE85gO22y2sF9FY2MjukIrniNQ0SNIgydOnAhXmEmbMTwcRX+ZlpYW0SY6Ozutb2j5+/dv9R+qnDt37sWLFxZtdnV17d+/P4Z+We/fv9+7d2/0292xY0eQG5EZSOXw4cODg4OTcDhqkYyMjKamJs3Yzzi7ys0d48ba3zExMVEUrl27FmQV4xbfvn0rD9bV1YXFZqT/OeFoacG0w5rfVxT4+vVrb2+vdecxb2poaCgqKhLTgXCF2fiLcO7cuSZ6F1wVst/u3btPnjypT4wjIyPGLX769CnOv6meulO4AT9+/JDlx48fr169OiRv16xZ8/TpUxRUx+Su5Bh9/fnzJ9Q7MHPmTPH/JDC6i/b6gTWHTSwBWESdcmM2FOpmf9XV1W63W5RF5IgZMjDuwcWVYhjf1tY2oUWI6TKXxQiJ4yMKQihCQihCQghFSAhFSAihCAmhCAkhFCEhUxEbbwEJkqGhoeTk5FBr9ff3/+3vE9jjU4TEMvKdOxNY/9sRDkcJMU9KSsrNmzd5H5gJiVWcTmfIEWaz5eXl1dTUqH+BTcIpQvnX0IKsrCze00kbKzbbu3fveB8mnAj/8cP7SAjnhIRQhIQQipAQipAQEjJ8RBEshw4dmj17dkhVOjo6AnR7/704Mjw87HK5QnVDPi4PuIlQT0+PCZuSwsLCffv2jfutjsRVtLS0hGrT6/XKst1upwjHh9zcXFkWWzaZQ33ba/HixS9fvozzb8v14MED0zYzMzP1B/v7+63YHBkZmQgiDNdV4BahyxO7bHX7MW1z7dq1HI6ODyUlJenp6dbtqE9xLl68aHE7WpEGL1y4wF/QGMGdkLBt2zbrdnJycrKzs2NShPPmzXMqqHuJxxBtbW3Lly83/fKxw+EoLy9XN05fuHBhc3NzRkaG6T3I09LS6urq1q1bR5mNicfj2bNnj9xINlTQXW7YsKG1tTWiTsare5USQsYhY/MWEEIREjKl+VeAAQD+jjoIipzOMAAAAABJRU5ErkJggg=="),"image/png",604800);case"/email/logo.png":{let r=asset(b64(EMAIL_LOGO),"image/png",86400);return r.headers.set("access-control-allow-origin","*"),r}case"/search.json":{let apps=env.DB1?((await env.DB1.prepare("SELECT slug s, name, category c, verdict v FROM apps WHERE disc = 0").all()).results||[]).map(a=>({s:a.s,q:a.name+" alternatives",v:a.v==="yes"?"bot":a.v==="no"?"nah":"half",t:"app "+a.name+" "+catName(a.c),k:"a"})):[];return new Response(JSON.stringify(searchIndex().concat(apps)),{headers:{...SEC,"content-type":"application/json","cache-control":"public, max-age=600"}})}case"/order":{let r=await orderPage(env,url);return priv(r.html,r.status,r.refresh?{refresh:r.refresh}:{})}case"/sponsor/book":return logV(),html(page("book:"+url.searchParams.get("slot")+":"+url.searchParams.get("target"),()=>bookPage(url)));case"/nl/confirm":return priv(nlPage(await nlConfirm(env,url.searchParams.get("t")||""),"confirm"));case"/nl/unsub":return priv(unsubConfirmPage(url.searchParams.get("t")||""));case"/7c562ac990eff81434e17a0aa0230b39.txt":return new Response("7c562ac990eff81434e17a0aa0230b39",{headers:{"content-type":"text/plain; charset=utf-8"}});case"/llms.txt":return new Response(["# Bot or Nah","","> Plain-English verdicts on whether AI can do an everyday task for you (Bot, Half-bot or Nah), each with a copy-paste prompt, plus sourced prices for paid apps and their free alternatives.","","Where a test run is logged, the verdict page shows the result, including partial passes and failures. App prices come from vendor pricing pages and carry a checked date.","","## Key pages","","- [All verdicts]("+SITE+"/verdicts): every everyday task with its verdict and prompt","- [Paid apps and prices]("+SITE+"/apps): paid apps with a sourced price","- [Compare apps]("+SITE+"/compare): side-by-side price, free plan and free alternatives","- [Free alternatives]("+SITE+"/free-alternatives): free options for popular paid apps","- [Prompt packs]("+SITE+"/packs): ready-made prompt packs","- [Contact]("+SITE+"/contact): email the team","- [Sitemap]("+SITE+"/sitemap.xml): every public page"].join(String.fromCharCode(10))+String.fromCharCode(10),{headers:{"content-type":"text/plain; charset=utf-8","cache-control":"public, max-age=3600"}});case"/robots.txt":return new Response(`User-agent: *
Allow: /
Disallow: /api/
Disallow: /buy/
Disallow: /sponsor/book
Disallow: /submit?
Disallow: /savings?
Disallow: /apps?
Sitemap: ${SITE}/sitemap.xml
`,{headers:{"content-type":"text/plain"}});case"/sitemap.xml":return new Response(sitemap(((await env.DB1.prepare("SELECT slug FROM apps WHERE disc = 0 ORDER BY slug").all()).results||[]).map(r=>r.slug)),{headers:{"content-type":"application/xml","cache-control":"public, max-age=3600"}});case"/free-versions":return Response.redirect(url.origin+"/c/free-versions",301);case"/thanks":return html(thanks(url.searchParams.get("k")))}if(path==="/"){let hd=await homeData(env);try{hd.testedN=((await env.DB1.prepare("SELECT COUNT(DISTINCT slug) c FROM tests").first())||{}).c}catch{}let h=home(hd);return logV(),html(h)}if(STATIC[path])return logV(),html(page(path,STATIC[path]).replace("@@V30@@",S.views30?`<p class="muted">Last 30 days: ${S.views30.toLocaleString("en-US")} page views, from our own analytics. Bots are not counted.</p>`:""));let m0;if(m0=path.match(/^\/go\/([A-Za-z0-9_-]{1,64})$/)){let ad=S.ads.find(a=>a.id===m0[1]);if(!ad||!/^https?:\/\//i.test(ad.url||""))return Response.redirect(url.origin+"/",302);let ua=req.headers.get("user-agent")||"";if(ua&&!BOT.test(ua))ctx.waitUntil(env.DB1.batch([env.DB1.prepare("CREATE TABLE IF NOT EXISTS ad_clicks (id TEXT NOT NULL, day TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (id, day))"),env.DB1.prepare("INSERT INTO ad_clicks (id, day, n) VALUES (?, ?, 1) ON CONFLICT(id, day) DO UPDATE SET n = n + 1").bind(ad.id,new Date().toISOString().slice(0,10))]).catch(e=>console.error("click",e)));return new Response(null,{status:302,headers:{location:ad.url,"cache-control":"no-store","x-robots-tag":"noindex"}})}let m;if((m=path.match(/^\/v\/([a-z0-9-]+)$/))&&BY_SLUG[m[1]]){let runs=[];if(env.DB1)try{runs=((await env.DB1.prepare("SELECT json FROM tests WHERE slug = ? ORDER BY n").bind(m[1]).all()).results||[]).map(r=>JSON.parse(r.json))}catch{}return logV(),html(runs.length?verdict(m[1],runs):page(path,()=>verdict(m[1])))}if((m=path.match(/^\/c\/([a-z0-9-]+)$/))&&CAT[m[1]])return logV(),html(page(path,()=>category(m[1])));if(m=path.match(/^\/b\/([a-z]+-\d{1,2})\.webp$/)){let v=await env.DB.get("bimg:"+m[1],{type:"arrayBuffer"});return v?asset(v,"image/webp",2592e3):new Response("Not found",{status:404})}if(path==="/x/builds")return html(await buildsGallery(env.DB1,+(url.searchParams.get("p")||1),url.searchParams.get("s")));if(m=path.match(/^\/apps\/([a-z0-9-]+)$/)){let h=await appPage(env.DB1,m[1]);if(h)return logV(),html(h)}if(path==="/free-alternatives")return logV(),html(await faHub(env.DB1));if(m=path.match(/^\/free-alternatives\/([a-z0-9-]+)$/)){let h=await freeAltsPage(env.DB1,m[1]);if(h)return logV(),html(h)}if(path==="/compare")return logV(),html(await cmpHub(env.DB1));if(m=path.match(/^\/compare\/([a-z0-9-]+?)-vs-([a-z0-9-]+)$/)){if(!CMP_SET.has(m[1]+"-vs-"+m[2])&&CMP_SET.has(m[2]+"-vs-"+m[1]))return Response.redirect(SITE+"/compare/"+m[2]+"-vs-"+m[1],301);let h=await comparePage(env.DB1,m[1],m[2]);if(h)return logV(),html(h)}if(m=path.match(/^\/reverse\/r\/(rv_[a-f0-9]{16})$/)){let h=await resultPage(env,m[1]);if(h)return logV(),html(h)}if((m=path.match(/^\/packs\/([a-z0-9-]+)$/))&&S.packs.find(p=>p.slug===m[1]))return logV(),html(page(path,()=>packPage(m[1])));if((m=path.match(/^\/tools\/([a-z0-9-]+)$/))&&TOOL[m[1]])return logV(),html(page(path,()=>toolPage(m[1])));if(m=path.match(/^\/tool-img\/([a-z0-9-]+-[12])\.webp$/)){let r=await env.DB.getWithMetadata("timg:"+m[1],{type:"arrayBuffer"});return r&&r.value?asset(r.value,r.metadata&&r.metadata.type||"image/webp",86400):new Response("Not found",{status:404})}if((m=path.match(/^\/buy\/tool\/([a-z0-9-]+)$/))&&TOOL[m[1]]){let l=await env.DB1.prepare("SELECT url FROM links WHERE kind = 'tool' AND ref = ?").bind(m[1]).first();return Response.redirect(l?l.url:url.origin+"/tools/"+m[1],l?303:302)}if(m=path.match(/^\/dl\/([a-f0-9]{32})\/f\/([A-Za-z0-9._-]{1,120})$/)){let o=await env.DB1.prepare("SELECT * FROM orders WHERE token = ?").bind(m[1]).first(),r=o&&o.kind==="tool"?await toolFile(env,o,decodeURIComponent(m[2])):null;if(r)return r}if(m=path.match(/^\/buy\/([a-z0-9-]+)$/)){let p=S.packs.find(x=>x.slug===m[1]);if(p&&p.link)return Response.redirect(p.link,303);if(p)return Response.redirect(url.origin+"/packs/"+p.slug,302)}if(m=path.match(/^\/dl\/([a-f0-9]{32})(?:\.ai\.txt|\/([a-z0-9-]{1,60})\.zip)$/)){let f=await skillFile(env,m[1],m[2]||null);return f?new Response(f.zip||f.text,{headers:{...SEC,"content-type":f.zip?"application/zip":"text/plain; charset=utf-8","content-disposition":`attachment; filename="${f.name}"`,"cache-control":"private, no-store"}}):new Response("Not found",{status:404,headers:SEC})}if(m=path.match(/^\/dl\/([a-f0-9]{32})(\.txt)?$/)){let r=await downloadPage(env,m[1],!!m[2]);if(r&&r.text)return new Response(r.text,{headers:{...SEC,"content-type":"text/plain; charset=utf-8","content-disposition":'attachment; filename="bot-or-nah-prompts.txt"',"cache-control":"private, no-store"}});if(r)return priv(r.html)}if(m=path.match(/^\/ad\/(ad_[a-f0-9]{20})\.png$/)){let r=await env.DB.getWithMetadata("adimg:"+m[1],{type:"arrayBuffer"});if(r&&r.value)return asset(r.value,r.metadata&&r.metadata.type||"image/png",86400)}return(m=path.match(/^\/i\/([a-z0-9-]+)\.png$/))?await iconFrom(env,ctx,m[1])||asset(letterIcon(m[1][0].toUpperCase()),"image/svg+xml",86400):html(page("404",notFound),404)}catch(e){return console.error(e),path.startsWith("/api/")?json({ok:!1,error:"Server error."},500):new Response("Something went wrong.",{status:500})}}};export{worker_default as default};
// Paid partner promo on the spreadsheet sections (/tools and /packs). FTC: labeled Sponsored, rel="sponsored".
var PARTNER_ETSY=`<aside class="spon ad" aria-label="Sponsored" style="margin:22px 0 0"><div><span class="tag">Sponsored \xB7 Partner</span><b>Want more spreadsheets?</b> One of our partners, Mindful Byte Studio, has many more spreadsheets beyond these. This is their custom link to their Etsy digital shop.</div><a class="link-arrow" href="https://mindfulbytestudio.etsy.com" rel="sponsored noopener" target="_blank">Visit their Etsy shop \u2192</a></aside>`;
