const DEFAULT_BASE_URL = "https://api.deepseek.com";
const DEEPSEEK_MODEL = "deepseek-chat";
const SYSTEM_MESSAGE =
  "You are Unknown, an educational SDG assistant for SDG Intelligence Hub. Explain sustainability concepts clearly and safely. Do not claim to provide official UN guidance.";

function getDeepSeekConfig() {
  const apiKey = (import.meta.env.VITE_DEEPSEEK_API_KEY || "").trim();
  const baseUrl = (import.meta.env.VITE_DEEPSEEK_BASE_URL || DEFAULT_BASE_URL)
    .trim()
    .replace(/\/+$/, "");

  if (!apiKey || apiKey === "your_key_here") {
    throw new Error("Missing DeepSeek API key. Add VITE_DEEPSEEK_API_KEY to your .env file.");
  }

  if (!baseUrl) {
    throw new Error("Missing DeepSeek base URL. Add VITE_DEEPSEEK_BASE_URL to your .env file.");
  }

  return { apiKey, baseUrl };
}

function buildMessages(chatMessages) {
  return [
    { role: "system", content: SYSTEM_MESSAGE },
    ...chatMessages.map((message) => ({
      role: message.role,
      content: message.content,
    })),
  ];
}

function getDeepSeekError(response) {
  if (response.status === 401 || response.status === 403) {
    return "DeepSeek authentication failed. Check your API key.";
  }

  if (response.status === 429) {
    return "DeepSeek rate limit reached. Please wait a moment and try again.";
  }

  return "DeepSeek request failed. Please try again shortly.";
}

export async function streamDeepSeekReply(chatMessages, { signal, onToken }) {
  const { apiKey, baseUrl } = getDeepSeekConfig();

  // Frontend API keys are not production-secure; move this request to a backend proxy before launch.
  let response;

  try {
    response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: buildMessages(chatMessages),
        temperature: 0.5,
        stream: true,
      }),
    });
  } catch (error) {
    if (error?.name === "AbortError") return;
    throw new Error("Network error while contacting DeepSeek. Please check your connection and try again.");
  }

  if (!response.ok) {
    throw new Error(getDeepSeekError(response));
  }

  if (!response.body) {
    throw new Error("DeepSeek streaming response was unavailable. Please try again.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let receivedDone = false;

  function processEvent(event) {
    const dataLines = event
      .split(/\r?\n/)
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.replace(/^data:\s*/, ""));

    for (const dataLine of dataLines) {
      if (!dataLine) continue;

      if (dataLine === "[DONE]") {
        receivedDone = true;
        return true;
      }

      let payload;
      try {
        payload = JSON.parse(dataLine);
      } catch {
        throw new Error("DeepSeek returned a malformed streaming chunk. Please try again.");
      }

      const token = payload?.choices?.[0]?.delta?.content;
      if (typeof token === "string" && token) onToken(token);
    }

    return false;
  }

  try {
    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const events = buffer.split(/\r?\n\r?\n/);
      buffer = events.pop() || "";

      for (const event of events) {
        if (processEvent(event)) return;
      }
    }

    if (buffer.trim() && processEvent(buffer)) return;
  } catch (error) {
    if (error?.name === "AbortError") return;
    throw error;
  } finally {
    reader.releaseLock();
  }

  if (!receivedDone && !signal?.aborted) {
    throw new Error("DeepSeek stream ended unexpectedly. Please try again.");
  }
}
