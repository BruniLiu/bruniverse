import { getSessionToken } from "./auth";

function getApiError(status, data) {
  if (status === 401 || status === 403) {
    return "Please log in before using Ask Unknown.";
  }

  if (status === 429) {
    return "Ask Unknown is receiving too many messages from this account. Please wait a moment.";
  }

  return data?.error || "AI request failed. Please try again shortly.";
}

export async function streamDeepSeekReply(chatMessages, { signal, onToken, context } = {}) {
  let response;

  try {
    response = await fetch("/api/chat", {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
        "x-bruniverse-session": getSessionToken(),
      },
      body: JSON.stringify({
        messages: chatMessages,
        context,
      }),
    });
  } catch (error) {
    if (error?.name === "AbortError") return;
    throw new Error("Network error while contacting Ask Unknown. Please check the local API server.");
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(getApiError(response.status, data));
  }

  onToken(data?.reply || "I could not generate a reply.");
}
