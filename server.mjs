import "dotenv/config";
import express from "express";
import OpenAI from "openai";

const app = express();
const port = Number(process.env.API_PORT || 8787);
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
const systemPrompt =
  "You are Unknown, a concise AI guide for a VBE 1014 Ethics and Sustainability SDG website. Help users understand SDGs, carbon footprint actions, sustainability ethics, and project writing ideas. Keep answers practical and student-friendly.";

app.use(express.json({ limit: "1mb" }));

const client = apiKey
  ? new OpenAI({ apiKey, ...(baseURL ? { baseURL } : {}) })
  : null;

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    provider: isDeepSeek ? "deepseek" : "openai",
    model,
    baseURL: baseURL || "https://api.openai.com/v1",
    hasApiKey: Boolean(client),
  });
});

app.post("/api/chat", async (request, response) => {
  try {
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

    if (isDeepSeek) {
      const result = await client.chat.completions.create({
        model,
        messages: [
          {
            role: "system",
            content: systemPrompt,
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
          content: systemPrompt,
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

app.listen(port, "127.0.0.1", () => {
  console.log(`AI API proxy running at http://127.0.0.1:${port}`);
});
