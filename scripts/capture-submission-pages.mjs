import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const outputDir = path.join(rootDir, "submission-captures", `bruniverse-${timestamp}`);
const chunkDir = path.join(outputDir, "chunks");
const screenshotDir = path.join(outputDir, "screenshots");
const manifestPath = path.join(outputDir, "manifest.json");

const chromeCandidates = [
  process.env.CHROME_PATH,
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env.PROGRAMFILES}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env["PROGRAMFILES(X86)"]}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env.PROGRAMFILES}\\Microsoft\\Edge\\Application\\msedge.exe`,
  `${process.env["PROGRAMFILES(X86)"]}\\Microsoft\\Edge\\Application\\msedge.exe`,
].filter(Boolean);

const pages = [
  ["01-home", "Home", "/index.html"],
  ["02-sdg-17-goals", "SDG 17 Goals", "/sdg-goals.html"],
  ["03-sdg-2-zero-hunger", "SDG 2 Zero Hunger", "/sdg-2.html"],
  ["04-sdg-3-legacy", "SDG 3 Legacy Page", "/sdg-3.html"],
  ["05-sdg-4-quality-education", "SDG 4 Quality Education", "/sdg-4.html"],
  ["06-sdg-13-climate-action", "SDG 13 Climate Action", "/sdg-13.html"],
  ["07-sdg-16-peace-justice", "SDG 16 Peace Justice", "/sdg-16.html"],
  ["08-act-now-overview", "SDG Act Now Overview", "/act-now.html"],
  ["09-act-now-transport", "Act Now Transport", "/act-now-transport.html"],
  ["10-act-now-vegetables", "Act Now Vegetables", "/act-now-vegetables.html"],
  ["11-act-now-travel", "Act Now Travel", "/act-now-travel.html"],
  ["12-act-now-4r", "Act Now 4R", "/act-now-4r.html"],
  ["13-about-us", "About Us", "/about-us.html"],
  ["14-reference-list", "Reference List", "/reference-list.html"],
  ["15-chat", "Ask Unknown Chat", "/chat.html"],
  ["16-workspace-cockpit", "Workspace Research Cockpit", "/main.html"],
  ["17-workspace-cases", "Workspace Cases", "/main.html#cases"],
  ["18-workspace-evidence", "Workspace Evidence Ledger", "/main.html#evidence"],
  ["19-workspace-sources", "Workspace Source Library", "/main.html#literature"],
  ["20-workspace-briefs", "Workspace Brief Studio", "/main.html#briefs"],
  ["21-workspace-graph", "Workspace Evidence Graph", "/main.html#graph"],
  ["22-workspace-ai", "Workspace Research AI", "/main.html#chat"],
].map(([slug, title, route]) => ({ slug, title, route }));

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mkdirs() {
  await fs.mkdir(chunkDir, { recursive: true });
  await fs.mkdir(screenshotDir, { recursive: true });
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function findChrome() {
  for (const candidate of chromeCandidates) {
    if (await fileExists(candidate)) return candidate;
  }
  throw new Error("Chrome or Edge executable was not found. Set CHROME_PATH and rerun.");
}

function findFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

async function waitForHttp(url, timeoutMs = 30000) {
  const startedAt = Date.now();
  let lastError;
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch (error) {
      lastError = error;
    }
    await delay(350);
  }
  throw lastError || new Error(`Timed out waiting for ${url}`);
}

function spawnProcess(command, args, options = {}) {
  const child = spawn(command, args, {
    cwd: rootDir,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
    ...options,
  });

  child.stdout?.on("data", (data) => {
    const text = String(data).trim();
    if (text) console.log(text);
  });
  child.stderr?.on("data", (data) => {
    const text = String(data).trim();
    if (text && !text.includes("Browserslist")) console.error(text);
  });

  return child;
}

async function startVite(port) {
  const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  const child = spawnProcess(npmCommand, [
    "run",
    "dev:web",
    "--",
    "--port",
    String(port),
    "--strictPort",
  ], {
    shell: process.platform === "win32",
  });
  await waitForHttp(`http://127.0.0.1:${port}/index.html`);
  return child;
}

async function startChrome(chromePath, port) {
  const profileDir = path.join(outputDir, "chrome-profile");
  await fs.mkdir(profileDir, { recursive: true });

  const args = [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--no-first-run",
    "--no-default-browser-check",
    "--hide-scrollbars",
    "--window-size=1440,1400",
    "about:blank",
  ];

  const child = spawnProcess(chromePath, args);
  await waitForHttp(`http://127.0.0.1:${port}/json/version`);
  return child;
}

class CDP {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 0;
    this.pending = new Map();
    this.listeners = new Map();
    this.ws = new WebSocket(wsUrl);
    this.ready = new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve, { once: true });
      this.ws.addEventListener("error", reject, { once: true });
    });
    this.ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else resolve(message.result || {});
        return;
      }
      if (message.method && this.listeners.has(message.method)) {
        for (const listener of this.listeners.get(message.method)) listener(message.params || {});
      }
    });
  }

  async send(method, params = {}) {
    await this.ready;
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  on(method, listener) {
    if (!this.listeners.has(method)) this.listeners.set(method, new Set());
    this.listeners.get(method).add(listener);
    return () => this.listeners.get(method)?.delete(listener);
  }

  waitFor(method, timeoutMs = 30000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        unsubscribe();
        reject(new Error(`Timed out waiting for ${method}`));
      }, timeoutMs);
      const unsubscribe = this.on(method, (params) => {
        clearTimeout(timer);
        unsubscribe();
        resolve(params);
      });
    });
  }

  close() {
    this.ws.close();
  }
}

async function getBrowserSession(chromePort) {
  const version = await (await fetch(`http://127.0.0.1:${chromePort}/json/version`)).json();
  return new CDP(version.webSocketDebuggerUrl);
}

async function openPageSession(browser, chromePort) {
  const { targetId } = await browser.send("Target.createTarget", { url: "about:blank" });
  for (let i = 0; i < 40; i += 1) {
    const targets = await (await fetch(`http://127.0.0.1:${chromePort}/json/list`)).json();
    const target = targets.find((item) => item.id === targetId);
    if (target?.webSocketDebuggerUrl) {
      return { targetId, page: new CDP(target.webSocketDebuggerUrl) };
    }
    await delay(150);
  }
  throw new Error("Unable to open Chrome target.");
}

async function evaluate(page, expression, awaitPromise = true) {
  return page.send("Runtime.evaluate", {
    expression,
    awaitPromise,
    returnByValue: true,
  });
}

function authScript() {
  const session = {
    id: "user-1780000000000",
    fullName: "Submission Reviewer",
    email: "submission-reviewer@example.com",
    role: "Researcher",
    interests: ["SDG research"],
  };
  return `
    try {
      localStorage.setItem("sdg-theme", "dark");
      localStorage.setItem("bruniverse-auth-session", ${JSON.stringify(JSON.stringify(session))});
    } catch {}
  `;
}

async function preparePage(page) {
  await evaluate(page, `
    (async () => {
      ${authScript()}
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      document.documentElement.style.colorScheme = "dark";
      document.querySelectorAll("details").forEach((item) => { item.open = true; });
      document.querySelectorAll("img").forEach((img) => {
        img.loading = "eager";
        img.decoding = "sync";
      });
      if (!document.getElementById("submission-capture-style")) {
        const style = document.createElement("style");
        style.id = "submission-capture-style";
        style.textContent = [
          "*{scroll-behavior:auto!important}",
          "*,*::before,*::after{animation-duration:0.001s!important;animation-delay:0s!important;transition-duration:0.001s!important;transition-delay:0s!important}",
          "html,body,#root{height:auto!important;min-height:100%!important;overflow:visible!important}",
          ".fixed.bottom-4,.fixed.right-4,[class*=translate-widget],[class*=immersive-translate]{display:none!important}",
        ].join("");
        document.head.appendChild(style);
      }
      await (document.fonts?.ready || Promise.resolve());
    })()
  `);

  await delay(900);

  await evaluate(page, `
    (async () => {
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const expandScrollableContainers = () => {
        const elements = [
          document.documentElement,
          document.body,
          document.getElementById("root"),
          ...document.querySelectorAll("*"),
        ].filter(Boolean);

        for (const element of elements) {
          const style = getComputedStyle(element);
          const isScrollable = /(auto|scroll|hidden)/.test(style.overflowY);
          const hasHiddenVerticalContent = element.scrollHeight > element.clientHeight + 24;

          if (element.id === "root" || (isScrollable && hasHiddenVerticalContent)) {
            element.style.overflow = "visible";
            element.style.overflowY = "visible";
            element.style.maxHeight = "none";
            element.style.height = "auto";
            element.style.minHeight = Math.ceil(element.scrollHeight) + "px";
          }
        }
      };

      expandScrollableContainers();
      document.querySelectorAll("details").forEach((item) => { item.open = true; });
      await wait(250);

      const total = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.getElementById("root")?.scrollHeight || 0,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
      const step = Math.max(520, Math.floor(window.innerHeight * 0.72));
      for (let y = 0; y <= total; y += step) {
        window.scrollTo(0, y);
        document.querySelectorAll("details").forEach((item) => { item.open = true; });
        expandScrollableContainers();
        await wait(70);
      }
      window.scrollTo(0, 0);
      await wait(300);
      const images = Array.from(document.images);
      await Promise.all(images.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          const done = () => resolve();
          const timer = setTimeout(done, 5000);
          img.addEventListener("load", () => { clearTimeout(timer); done(); }, { once: true });
          img.addEventListener("error", () => { clearTimeout(timer); done(); }, { once: true });
        });
      }));
      document.querySelectorAll("details").forEach((item) => { item.open = true; });
      expandScrollableContainers();
      window.scrollTo(0, 0);
    })()
  `);
}

async function getPageDimensions(page) {
  const result = await evaluate(page, `
    JSON.stringify({
      width: Math.ceil(Math.max(
        document.documentElement.clientWidth,
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.getElementById("root")?.scrollWidth || 0,
        1440
      )),
      height: Math.ceil(Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.getElementById("root")?.scrollHeight || 0,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        ...Array.from(document.querySelectorAll("main, section, article, footer, #root")).map((element) => {
          const rect = element.getBoundingClientRect();
          return rect.bottom + window.scrollY;
        }),
        1400
      ))
    })
  `);
  return JSON.parse(result.result.value);
}

async function captureChunks(page, entryDir, dimensions) {
  const maxChunkHeight = 9000;
  const chunks = [];
  const width = Math.min(Math.max(dimensions.width, 1440), 2200);
  const totalHeight = Math.max(dimensions.height, 1400);

  for (let y = 0, index = 1; y < totalHeight; y += maxChunkHeight, index += 1) {
    const height = Math.min(maxChunkHeight, totalHeight - y);
    const { data } = await page.send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      captureBeyondViewport: true,
      clip: {
        x: 0,
        y,
        width,
        height,
        scale: 1,
      },
    });
    const chunkPath = path.join(entryDir, `${String(index).padStart(3, "0")}.png`);
    await fs.writeFile(chunkPath, Buffer.from(data, "base64"));
    chunks.push(path.relative(outputDir, chunkPath).replaceAll("\\", "/"));
  }

  return chunks;
}

async function captureOne(browser, chromePort, baseUrl, pageSpec) {
  const { targetId, page } = await openPageSession(browser, chromePort);
  const url = `${baseUrl}${pageSpec.route}`;
  const entryDir = path.join(chunkDir, pageSpec.slug);
  await fs.mkdir(entryDir, { recursive: true });

  try {
    await page.send("Page.enable");
    await page.send("Runtime.enable");
    await page.send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 1400,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await page.send("Page.addScriptToEvaluateOnNewDocument", { source: authScript() });

    const loadPromise = page.waitFor("Page.loadEventFired", 45000).catch(() => null);
    await page.send("Page.navigate", { url });
    await loadPromise;
    await delay(1200);
    await preparePage(page);
    const dimensions = await getPageDimensions(page);
    const chunks = await captureChunks(page, entryDir, dimensions);

    console.log(`Captured ${pageSpec.slug}: ${dimensions.width}x${dimensions.height}, ${chunks.length} chunk(s)`);

    return {
      ...pageSpec,
      url,
      dimensions,
      chunks,
      screenshot: `screenshots/${pageSpec.slug}.png`,
    };
  } finally {
    page.close();
    await browser.send("Target.closeTarget", { targetId }).catch(() => {});
  }
}

async function runPythonCompiler() {
  const python = process.platform === "win32" ? "python" : "python3";
  await new Promise((resolve, reject) => {
    const child = spawn(python, [
      path.join(rootDir, "scripts", "compile-captures-pdf.py"),
      manifestPath,
    ], {
      cwd: rootDir,
      stdio: "inherit",
      windowsHide: true,
    });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`PDF compiler exited with code ${code}`));
    });
  });
}

async function main() {
  await mkdirs();
  const vitePort = await findFreePort();
  const chromePort = await findFreePort();
  const chromePath = await findChrome();
  const baseUrl = `http://127.0.0.1:${vitePort}`;

  console.log(`Output: ${outputDir}`);
  console.log(`Starting Vite on ${vitePort}`);
  const vite = await startVite(vitePort);
  console.log(`Starting Chrome on ${chromePort}`);
  const chrome = await startChrome(chromePath, chromePort);

  const manifest = {
    createdAt: new Date().toISOString(),
    baseUrl,
    outputDir,
    pages: [],
  };

  try {
    const browser = await getBrowserSession(chromePort);
    for (const pageSpec of pages) {
      const captured = await captureOne(browser, chromePort, baseUrl, pageSpec);
      manifest.pages.push(captured);
      await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
    }
    browser.close();
    await runPythonCompiler();
  } finally {
    chrome.kill();
    vite.kill();
  }

  console.log(`Done: ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
