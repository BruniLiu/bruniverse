import "dotenv/config";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import express from "express";
import OpenAI from "openai";
import { createSampleWorkspace } from "./src/workspace/data/sampleWorkspace.js";

const app = express();
const port = Number(process.env.PORT || process.env.API_PORT || 8787);
const host = process.env.HOST || "0.0.0.0";
const provider =
  process.env.AI_PROVIDER || (process.env.DEEPSEEK_API_KEY ? "deepseek" : "openai");
const isDeepSeek = provider.toLowerCase() === "deepseek";
const model = isDeepSeek
  ? process.env.DEEPSEEK_MODEL || "deepseek-chat"
  : process.env.OPENAI_MODEL || "gpt-4.1-mini";
const apiKey = isDeepSeek ? process.env.DEEPSEEK_API_KEY : process.env.OPENAI_API_KEY;
const baseURL = isDeepSeek
  ? process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com"
  : undefined;
const dataRoot = path.resolve(process.env.BRUNIVERSE_DATA_DIR || "data");
const distRoot = path.resolve("dist");
const usersFile = path.join(dataRoot, "users.json");
const workspacesDir = path.join(dataRoot, "workspaces");
const chatRateWindowMs = Number(process.env.CHAT_RATE_WINDOW_MS || 10 * 60 * 1000);
const chatRateLimit = Number(process.env.CHAT_RATE_LIMIT || 30);
const chatRateBuckets = new Map();

const systemPrompt =
  "You are Unknown, a concise case-aware SDG research reviewer inside Bruniverse SDG Intelligence Hub. Help researchers and NGO-style users check evidence quality, citation gaps, claim logic, adverse-impact analysis, and practical prosperity pathways. Be direct, specific, and evidence-focused.";

app.use(express.json({ limit: "4mb" }));

const client = apiKey
  ? new OpenAI({ apiKey, ...(baseURL ? { baseURL } : {}) })
  : null;

async function ensureDataStore() {
  await fs.mkdir(workspacesDir, { recursive: true });
  try {
    await fs.access(usersFile);
  } catch {
    await writeJson(usersFile, []);
  }
}

async function readJson(filePath, fallback) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function writeJson(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const tmpPath = `${filePath}.${process.pid}.tmp`;
  await fs.writeFile(tmpPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await fs.rename(tmpPath, filePath);
}

function normalizeIdentifier(value) {
  return String(value || "").trim().toLowerCase();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function toPublicUser(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    interests: Array.isArray(user.interests) ? user.interests : [],
  };
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, passwordHash) {
  const [salt, storedHash] = String(passwordHash || "").split(":");
  if (!salt || !storedHash) return false;

  const hash = crypto.scryptSync(password, salt, 64);
  const stored = Buffer.from(storedHash, "hex");
  return stored.length === hash.length && crypto.timingSafeEqual(stored, hash);
}

async function readUsers() {
  await ensureDataStore();
  const users = await readJson(usersFile, []);
  return Array.isArray(users) ? users : [];
}

async function writeUsers(users) {
  await ensureDataStore();
  await writeJson(usersFile, users);
}

async function findUserByIdentifier(identifier) {
  const normalized = normalizeIdentifier(identifier);
  const users = await readUsers();
  return users.find(
    (user) =>
      normalizeIdentifier(user.email) === normalized ||
      normalizeIdentifier(user.fullName) === normalized,
  );
}

function decodeSessionToken(request) {
  const token = String(request.get("x-bruniverse-session") || "").trim();
  if (!token) return null;

  let decoded = "";
  try {
    decoded = Buffer.from(token, "base64").toString("utf8");
  } catch {
    return null;
  }

  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex <= 0) return null;

  const id = decoded.slice(0, separatorIndex);
  const email = decoded.slice(separatorIndex + 1);

  if (!/^user-\d+$/.test(id)) return null;
  if (!isValidEmail(email)) return null;

  return { id, email };
}

async function readAuthenticatedUser(request) {
  const session = decodeSessionToken(request);
  if (!session) return null;

  const users = await readUsers();
  return users.find(
    (user) =>
      user.id === session.id &&
      normalizeIdentifier(user.email) === normalizeIdentifier(session.email),
  );
}

function getWorkspacePath(userId) {
  return path.join(workspacesDir, `${userId}.json`);
}

function normalizeWorkspace(input) {
  const workspace = input && typeof input === "object" ? input : {};
  return {
    version: 1,
    cases: Array.isArray(workspace.cases) ? workspace.cases : [],
    evidence: Array.isArray(workspace.evidence) ? workspace.evidence : [],
    claims: Array.isArray(workspace.claims) ? workspace.claims : [],
    briefs: Array.isArray(workspace.briefs) ? workspace.briefs : [],
    literature: Array.isArray(workspace.literature) ? workspace.literature : [],
    notes: Array.isArray(workspace.notes) ? workspace.notes : [],
    activityLog: Array.isArray(workspace.activityLog) ? workspace.activityLog : [],
    updatedAt: new Date().toISOString(),
  };
}

async function readWorkspace(user) {
  await ensureDataStore();
  const filePath = getWorkspacePath(user.id);
  const saved = await readJson(filePath, null);

  if (saved) return normalizeWorkspace(saved);

  const workspace = normalizeWorkspace(createSampleWorkspace());
  workspace.activityLog = [
    {
      id: `activity-${Date.now()}`,
      type: "workspace_created",
      description: `Created sample workspace for ${user.fullName}`,
      timestamp: new Date().toISOString(),
    },
    ...workspace.activityLog,
  ];
  await writeJson(filePath, workspace);
  return workspace;
}

async function writeWorkspace(user, workspace) {
  const normalized = normalizeWorkspace(workspace);
  await writeJson(getWorkspacePath(user.id), normalized);
  return normalized;
}

function checkChatRateLimit(user) {
  const now = Date.now();
  const key = user.id;
  const current = chatRateBuckets.get(key);

  if (!current || now - current.startedAt > chatRateWindowMs) {
    chatRateBuckets.set(key, { startedAt: now, count: 1 });
    return true;
  }

  if (current.count >= chatRateLimit) return false;

  current.count += 1;
  chatRateBuckets.set(key, current);
  return true;
}

function formatResearchContext(context) {
  if (!context || typeof context !== "object") return "";

  const caseBlock = context.case
    ? [
        `Active case: ${context.case.sdg || "SDG"} ${context.case.title || ""}`,
        `Country: ${context.case.country || "unspecified"}`,
        `Research question: ${context.case.researchQuestion || context.case.focus || "unspecified"}`,
      ].join("\n")
    : "Active case: none selected";

  const evidenceBlock = Array.isArray(context.evidence)
    ? context.evidence
        .slice(0, 12)
        .map(
          (item) =>
            `- ${item.title || "Untitled evidence"} (${item.year || "n.d."}; ${item.source || "unknown source"}): ${item.summary || item.citation || "no summary"}`,
        )
        .join("\n")
    : "";

  const claimsBlock = Array.isArray(context.claims)
    ? context.claims
        .slice(0, 12)
        .map(
          (item) =>
            `- [${item.type || "claim"}] ${item.text || ""} Evidence IDs: ${(item.evidenceIds || []).join(", ") || "none"}`,
        )
        .join("\n")
    : "";

  const briefBlock = context.brief
    ? `Current brief: ${context.brief.title || "Untitled"}\nStatus: ${context.brief.status || "draft"}\nCitation status: ${context.brief.citationStatus || "unknown"}`
    : "Current brief: none";

  return [
    "Research workspace context:",
    caseBlock,
    evidenceBlock ? `Evidence:\n${evidenceBlock}` : "Evidence: none linked",
    claimsBlock ? `Claims:\n${claimsBlock}` : "Claims: none linked",
    briefBlock,
  ].join("\n\n");
}

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    provider: isDeepSeek ? "deepseek" : "openai",
    model,
    baseURL: baseURL || "https://api.openai.com/v1",
    hasApiKey: Boolean(client),
  });
});

app.post("/api/auth/signup", async (request, response) => {
  try {
    const fullName = String(request.body?.fullName || "").trim();
    const email = String(request.body?.email || "").trim();
    const password = String(request.body?.password || "");
    const role = String(request.body?.role || "Researcher").trim() || "Researcher";
    const interests = Array.isArray(request.body?.interests)
      ? request.body.interests.map((item) => String(item)).slice(0, 12)
      : [];

    if (!fullName || !isValidEmail(email) || password.length < 6) {
      response.status(400).json({
        error: "Full name, a valid email, and a password of at least 6 characters are required.",
      });
      return;
    }

    const users = await readUsers();
    if (users.some((user) => normalizeIdentifier(user.email) === normalizeIdentifier(email))) {
      response.status(409).json({ error: "This email is already registered. Please log in instead." });
      return;
    }

    const user = {
      id: `user-${Date.now()}${crypto.randomInt(100, 999)}`,
      fullName,
      email,
      role,
      interests,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };

    await writeUsers([...users, user]);
    await readWorkspace(user);
    response.json({ user: toPublicUser(user) });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Unable to create the account." });
  }
});

app.post("/api/auth/login", async (request, response) => {
  try {
    const identifier = String(request.body?.identifier || "").trim();
    const password = String(request.body?.password || "");
    const user = await findUserByIdentifier(identifier);

    if (!user || !verifyPassword(password, user.passwordHash)) {
      response.status(401).json({ error: "Invalid email/name or password." });
      return;
    }

    response.json({ user: toPublicUser(user) });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Unable to log in." });
  }
});

app.get("/api/workspace", async (request, response) => {
  try {
    const user = await readAuthenticatedUser(request);
    if (!user) {
      response.status(401).json({ error: "Please log in before opening the workspace." });
      return;
    }

    const workspace = await readWorkspace(user);
    response.json({ workspace });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Unable to load workspace." });
  }
});

app.put("/api/workspace", async (request, response) => {
  try {
    const user = await readAuthenticatedUser(request);
    if (!user) {
      response.status(401).json({ error: "Please log in before saving the workspace." });
      return;
    }

    const workspace = await writeWorkspace(user, request.body?.workspace);
    response.json({ workspace });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Unable to save workspace." });
  }
});

app.post("/api/chat", async (request, response) => {
  try {
    const user = await readAuthenticatedUser(request);

    if (!user) {
      response.status(401).json({
        error: "Please log in before using Research AI.",
      });
      return;
    }

    if (!checkChatRateLimit(user)) {
      response.status(429).json({
        error: "Too many Research AI messages from this account. Please wait before trying again.",
      });
      return;
    }

    if (!client) {
      response.status(500).json({
        error: `${isDeepSeek ? "DEEPSEEK_API_KEY" : "OPENAI_API_KEY"} is missing. Create a .env file from .env.example and add your key.`,
      });
      return;
    }

    const rawMessages = Array.isArray(request.body?.messages)
      ? request.body.messages
      : [];

    const messages = rawMessages
      .slice(-16)
      .map((message) => ({
        role: message.role === "assistant" ? "assistant" : "user",
        content: String(message.content || "").slice(0, 4000),
      }))
      .filter((message) => message.content.trim().length > 0);

    if (messages.length === 0) {
      response.status(400).json({ error: "Message is required." });
      return;
    }

    const researchContext = formatResearchContext(request.body?.context);
    const fullSystemPrompt = researchContext
      ? `${systemPrompt}\n\n${researchContext}`
      : systemPrompt;

    if (isDeepSeek) {
      const result = await client.chat.completions.create({
        model,
        messages: [
          {
            role: "system",
            content: fullSystemPrompt,
          },
          ...messages,
        ],
      });

      response.json({
        reply:
          result.choices?.[0]?.message?.content ||
          "I could not generate a reply.",
      });
      return;
    }

    const result = await client.responses.create({
      model,
      input: [
        {
          role: "developer",
          content: fullSystemPrompt,
        },
        ...messages,
      ],
    });

    response.json({ reply: result.output_text || "I could not generate a reply." });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error while calling the AI API.",
    });
  }
});

app.use(express.static(distRoot));

app.get(/^\/(?!api\/).*/, (_request, response) => {
  response.sendFile(path.join(distRoot, "index.html"));
});

app.listen(port, host, () => {
  console.log(`Bruniverse server running at http://${host}:${port}`);
});
