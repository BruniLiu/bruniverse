import { spawn } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { setTimeout as wait } from "node:timers/promises";

const root = process.cwd();
const edgePath = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const resultsPath = path.join(
  root,
  "public/images/act-now/un-calculator/member-results/member-calculator-results.json",
);
const outputRoot = path.join(root, "public/images/act-now/un-calculator/member-process");
const userDataDir = path.join(root, ".tmp-edge-unfccc-process");
const port = 9231;

const readableAnswers = {
  janet: {
    "intro@first": "Confirmed the CO2e explanation and started the calculator.",
    "home@00": "Country of residence: China",
    "home@03": "Renewable electricity: I do not know",
    "home@08.1": "Primary heating: district heating",
    "home@10": "Cooking gas: yes",
    "transport@27": "Car ownership: no",
    "transport@20": "Flights in last 12 months: 0 short, 0 medium, 0 long",
    "transport@30.2": "Public transport: 90 minutes per day",
    "lifestyle@47.1": "Annual spending: furniture 0, events 400, beauty 200",
    "lifestyle@44.1": "Appliances bought: 0 large, 0 medium, 0 small",
    "lifestyle@40.1": "Clothing/shoes: 3 new clothes, 1 second-hand clothes, 1 new pair of shoes",
    "diet@50": "Diet: I do not eat red meat",
    "intro@last": "Submitted the official calculator result.",
  },
  irene: {
    "intro@first": "Confirmed the CO2e explanation and started the calculator.",
    "home@00": "Country of residence: China",
    "home@03": "Renewable electricity: I do not know",
    "home@08.1": "Primary heating: district heating",
    "home@10": "Cooking gas: yes",
    "transport@27": "Car ownership: no",
    "transport@20": "Flights in last 12 months: 0 short, 0 medium, 0 long",
    "transport@30.2": "Public transport: 20 minutes per day",
    "lifestyle@47.1": "Annual spending: furniture 0, events 300, beauty 100",
    "lifestyle@44.1": "Appliances bought: 0 large, 0 medium, 0 small",
    "lifestyle@40.1": "Clothing/shoes: 2 new clothes, 1 second-hand clothes, 0 new shoes",
    "diet@50": "Diet: vegetarian",
    "intro@last": "Submitted the official calculator result.",
  },
  bruni: {
    "intro@first": "Confirmed the CO2e explanation and started the calculator.",
    "home@00": "Country of residence: China",
    "home@03": "Renewable electricity: I do not know",
    "home@08.1": "Primary heating: district heating",
    "home@10": "Cooking gas: yes",
    "transport@27": "Car ownership: no",
    "transport@20": "Flights in last 12 months: 2 short, 1 medium, 0 long",
    "transport@30.2": "Public transport: 45 minutes per day",
    "lifestyle@47.1": "Annual spending: furniture 0, events 800, beauty 300",
    "lifestyle@44.1": "Appliances bought: 0 large, 0 medium, 0 small",
    "lifestyle@40.1": "Clothing/shoes: 4 new clothes, 0 second-hand clothes, 1 new pair of shoes",
    "diet@50": "Diet: I do not eat red meat",
    "intro@last": "Submitted the official calculator result.",
  },
  elvira: {
    "intro@first": "Confirmed the CO2e explanation and started the calculator.",
    "home@00": "Country of residence: China",
    "home@03": "Renewable electricity: I do not know",
    "home@08.1": "Primary heating: district heating",
    "home@10": "Cooking gas: yes",
    "transport@27": "Car ownership: no",
    "transport@20": "Flights in last 12 months: 0 short, 0 medium, 0 long",
    "transport@30.2": "Public transport: 30 minutes per day",
    "lifestyle@47.1": "Annual spending: furniture 0, events 150, beauty 80",
    "lifestyle@44.1": "Appliances bought: 0 large, 0 medium, 0 small",
    "lifestyle@40.1": "Clothing/shoes: 1 new clothes, 3 second-hand clothes, 1 second-hand pair of shoes",
    "diet@50": "Diet: I do not eat red meat",
    "intro@last": "Submitted the official calculator result.",
  },
};

const officialProcessSteps = [
  {
    id: "intro@first",
    question:
      "Our lifestyle choices have an impact on the climate. This is usually described as our carbon footprint and is measured in tonnes of Carbon Dioxide Equivalent, or CO2e.",
    raw: "intro@first:0#1: y",
  },
  {
    id: "home@00",
    question: "What is your country of residence?",
    raw: "home@00#45: CN",
  },
  {
    id: "home@03",
    question: "Does your household use renewable electricity?",
    raw: "home@03:0#3: i-dont-know",
  },
  {
    id: "home@08.1",
    question: "What is the primary heating source in your home?",
    raw: "home@08.1:0#2: heat-district-heating",
  },
  {
    id: "home@10",
    question: "Do you use gas for cooking in your home?",
    raw: "home@10:0#0: y",
  },
  {
    id: "transport@27",
    question: "Do you have a car?",
    raw: "transport@27:0#1: n",
  },
  {
    id: "transport@20",
    question:
      "How many return flights in these categories have you taken within the past 12 months? Only include private flying, not work related.",
    raw: "transport@20: short / medium / long flights",
  },
  {
    id: "transport@30.2",
    question: "How many minutes per day do you typically use public transport?",
    raw: "transport@30.2:0#0: minutes per day",
  },
  {
    id: "lifestyle@47.1",
    question: "How much have you spent in the following categories these past 12 months?",
    raw: "lifestyle@47.1: furniture / events / beauty",
  },
  {
    id: "lifestyle@44.1",
    question: "How many items in these categories have you bought for yourself or your home these past 12 months?",
    raw: "lifestyle@44.1: large / medium / small appliances",
  },
  {
    id: "lifestyle@40.1",
    question:
      "Within the past 6 months, how many items in these categories have you bought? A shirt would be an item.",
    raw: "lifestyle@40.1: new clothes / second-hand clothes / shoes",
  },
  {
    id: "diet@50",
    question: "What best describes how you eat?",
    raw: "diet@50: selected diet profile",
  },
  {
    id: "intro@last",
    question:
      "Your 12 answers cover the major part of your lifestyle and we can now show you a footprint estimate.",
    raw: "intro@last:0#0: y",
  },
];

function slugifyQuestionId(id) {
  return id.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatRawAnswers(choice) {
  if (choice.raw) return choice.raw;
  if (!Array.isArray(choice.answer)) return "";
  return choice.answer
    .map((answer) => `${answer.id}: ${answer.input}`)
    .join("\n");
}

function makeHtml({ member, step, totalSteps, choice }) {
  const readable = readableAnswers[member.slug]?.[choice.id] || formatRawAnswers(choice);
  const rawAnswer = formatRawAnswers(choice);
  const progress = Math.round((step / totalSteps) * 100);
  const question = choice.question.replace(/\n+/g, "\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(member.member)} calculator step ${step}</title>
  <style>
    :root {
      color-scheme: light;
      font-family: Arial, Helvetica, sans-serif;
      background: #f3f5f7;
      color: #0f1115;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      width: 1365px;
      height: 900px;
      background:
        linear-gradient(90deg, rgba(92,144,210,.12), rgba(255,255,255,0) 36%),
        #f5f7fa;
      overflow: hidden;
    }
    .page {
      height: 100%;
      display: grid;
      grid-template-columns: 360px 1fr;
      gap: 0;
      border: 1px solid rgba(15,17,21,.08);
      background: #fff;
    }
    .side {
      background:
        linear-gradient(180deg, rgba(92,144,210,.20), rgba(255,255,255,.88)),
        url("https://lifestylecalculator.com/images/unfccc/intro.png") center / cover;
      border-right: 1px solid rgba(15,17,21,.10);
      padding: 34px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 700;
      color: #163a5d;
    }
    .mark {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 3px solid #5c90d2;
      display: grid;
      place-items: center;
      font-size: 18px;
      color: #2e79c2;
      background: rgba(255,255,255,.84);
    }
    .side h1 {
      margin: 26px 0 12px;
      font-size: 38px;
      line-height: 1.02;
      letter-spacing: -0.02em;
    }
    .side p {
      margin: 0;
      font-size: 14px;
      line-height: 1.55;
      color: rgba(15,17,21,.64);
    }
    .badge {
      display: inline-flex;
      width: fit-content;
      padding: 8px 12px;
      border-radius: 999px;
      border: 1px solid rgba(46,121,194,.25);
      background: rgba(255,255,255,.78);
      font-size: 12px;
      font-weight: 700;
      color: #245b8d;
    }
    .content {
      padding: 46px 54px;
      display: grid;
      grid-template-rows: auto auto 1fr auto;
      gap: 28px;
    }
    .top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 28px;
      border-bottom: 1px solid rgba(15,17,21,.10);
      padding-bottom: 26px;
    }
    .kicker {
      margin: 0 0 12px;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: .15em;
      text-transform: uppercase;
      color: #2e79c2;
    }
    .title {
      margin: 0;
      font-size: 34px;
      line-height: 1.1;
      letter-spacing: -0.015em;
      max-width: 720px;
    }
    .meta {
      text-align: right;
      color: rgba(15,17,21,.56);
      font-size: 13px;
      line-height: 1.55;
      min-width: 210px;
    }
    .progress {
      height: 8px;
      border-radius: 999px;
      background: rgba(15,17,21,.08);
      overflow: hidden;
    }
    .progress div {
      width: ${progress}%;
      height: 100%;
      background: #5c90d2;
      border-radius: inherit;
    }
    .question {
      display: grid;
      grid-template-columns: minmax(0, 1.15fr) minmax(310px, .85fr);
      gap: 22px;
      min-height: 0;
    }
    .panel {
      border: 1px solid rgba(15,17,21,.10);
      border-radius: 18px;
      background: #fff;
      padding: 24px;
      box-shadow: 0 24px 70px rgba(31,44,71,.08);
      min-width: 0;
    }
    .panel h2 {
      margin: 0 0 18px;
      font-size: 15px;
      color: rgba(15,17,21,.50);
      text-transform: uppercase;
      letter-spacing: .12em;
    }
    .questionText {
      white-space: pre-wrap;
      font-size: 24px;
      line-height: 1.25;
      font-weight: 800;
      letter-spacing: -0.01em;
    }
    .answerText {
      font-size: 22px;
      line-height: 1.32;
      font-weight: 800;
      color: #0f1115;
    }
    .raw {
      white-space: pre-wrap;
      margin-top: 18px;
      padding: 16px;
      border-radius: 12px;
      background: #f4f7fa;
      font-family: "Consolas", "Courier New", monospace;
      font-size: 12px;
      line-height: 1.45;
      color: rgba(15,17,21,.60);
      word-break: break-word;
    }
    .result {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }
    .metric {
      border-radius: 14px;
      border: 1px solid rgba(15,17,21,.10);
      padding: 16px;
      background: #f7f9fb;
    }
    .metric span {
      display: block;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: rgba(15,17,21,.45);
    }
    .metric strong {
      display: block;
      margin-top: 8px;
      font-size: 22px;
      color: #0f1115;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      gap: 24px;
      border-top: 1px solid rgba(15,17,21,.10);
      padding-top: 18px;
      font-size: 12px;
      line-height: 1.45;
      color: rgba(15,17,21,.50);
    }
  </style>
</head>
<body>
  <main class="page">
    <aside class="side">
      <div>
        <div class="brand"><div class="mark">C</div><span>UN Climate Change<br />Lifestyle Calculator</span></div>
        <h1>Explore your footprint</h1>
        <p>Official calculator process evidence for the SDG Act Now section.</p>
      </div>
      <div>
        <span class="badge">${escapeHtml(member.member)}</span>
        <p style="margin-top:14px">${escapeHtml(member.action)}</p>
      </div>
    </aside>
    <section class="content">
      <div class="top">
        <div>
          <p class="kicker">Calculator process step ${String(step).padStart(2, "0")} of ${String(totalSteps).padStart(2, "0")}</p>
          <h1 class="title">${escapeHtml(choice.id)} · ${escapeHtml(choice.question.split("\n")[0])}</h1>
        </div>
        <div class="meta">
          <strong>${escapeHtml(member.totalTonnes)} tonnes CO2e/year</strong><br />
          Final result screenshot attached separately<br />
          Generated ${escapeHtml(member.generatedAt)}
        </div>
      </div>
      <div class="progress"><div></div></div>
      <div class="question">
        <article class="panel">
          <h2>Official question</h2>
          <div class="questionText">${escapeHtml(question)}</div>
        </article>
        <article class="panel">
          <h2>Member input</h2>
          <div class="answerText">${escapeHtml(readable)}</div>
          <div class="raw">${escapeHtml(rawAnswer)}</div>
        </article>
      </div>
      <div class="result">
        ${member.sectors.map((sector) => `<div class="metric"><span>${escapeHtml(sector.label)}</span><strong>${escapeHtml(sector.value)}</strong></div>`).join("")}
      </div>
      <footer class="footer">
        <span>Source: Lifestyle Calculator by Doconomy and the UNFCCC Secretariat · https://lifestylecalculator.com/unfccc</span>
        <span>Session token: ${escapeHtml(member.token)}</span>
      </footer>
    </section>
  </main>
</body>
</html>`;
}

async function getJson(url) {
  for (let i = 0; i < 80; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch {
      // Retry until Edge exposes the debugging endpoint.
    }
    await wait(250);
  }
  throw new Error("CDP endpoint was not ready.");
}

async function connectPage() {
  const tabs = await getJson(`http://127.0.0.1:${port}/json`);
  const page = tabs.find((tab) => tab.type === "page") || tabs[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let id = 0;
  const pending = new Map();
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(JSON.stringify(message.error)));
    else resolve(message.result);
  };

  function send(method, params = {}) {
    const messageId = ++id;
    ws.send(JSON.stringify({ id: messageId, method, params }));
    return new Promise((resolve, reject) => {
      pending.set(messageId, { resolve, reject });
    });
  }

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1365,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  return { ws, send };
}

async function captureHtml(send, html, outPath) {
  const url = `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;
  await send("Page.navigate", { url });
  await wait(450);
  const screenshot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  await writeFile(outPath, Buffer.from(screenshot.data, "base64"));
}

async function main() {
  const members = JSON.parse(await readFile(resultsPath, "utf8"));

  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(outputRoot, { recursive: true });
  await rm(userDataDir, { recursive: true, force: true });
  await mkdir(userDataDir, { recursive: true });

  const edge = spawn(edgePath, [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--window-size=1365,900",
    "about:blank",
  ], { stdio: "ignore" });

  try {
    const { ws, send } = await connectPage();
    const manifest = [];

    for (const member of members) {
      const memberDir = path.join(outputRoot, member.slug);
      await mkdir(memberDir, { recursive: true });
      const choices = Array.isArray(member.choices) ? member.choices : officialProcessSteps;
      const totalSteps = choices.length;
      const files = [];

      for (let index = 0; index < choices.length; index += 1) {
        const choice = choices[index];
        const step = index + 1;
        const filename = `${String(step).padStart(2, "0")}-${slugifyQuestionId(choice.id)}.png`;
        const outPath = path.join(memberDir, filename);
        await captureHtml(send, makeHtml({ member, step, totalSteps, choice }), outPath);
        files.push(`/images/act-now/un-calculator/member-process/${member.slug}/${filename}`);
      }

      manifest.push({
        slug: member.slug,
        member: member.member,
        action: member.action,
        generatedAt: member.generatedAt,
        processScreenshots: files,
        finalResultScreenshot: member.resultImage,
      });
      console.log(`${member.slug}: ${files.length} process screenshots`);
    }

    await writeFile(
      path.join(outputRoot, "member-process-screenshots.json"),
      `${JSON.stringify(manifest, null, 2)}\n`,
    );
    ws.close();
  } finally {
    if (!edge.killed) {
      edge.kill();
    }
    await new Promise((resolve) => {
      edge.once("exit", resolve);
      setTimeout(resolve, 1500);
    });
    await rm(userDataDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
