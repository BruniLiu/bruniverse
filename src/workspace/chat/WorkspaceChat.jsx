import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, useReducedMotion } from "framer-motion";
import { MessageSquare, Send, Sparkles } from "lucide-react";
import { streamDeepSeekReply } from "../../lib/deepseek";
import { useWorkspace } from "../context/WorkspaceContext";

const motionEase = [0.23, 1, 0.32, 1];

const examplePrompts = [
  "Audit the active case for unsupported claims.",
  "Which evidence should I collect next?",
  "Rewrite the response pathway for an NGO audience.",
  "Check whether the brief is citation-ready.",
];

function MarkdownMessage({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mb-3 mt-1 text-lg font-bold text-white">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-2 mt-3 text-base font-bold text-white">{children}</h2>
        ),
        p: ({ children }) => (
          <p className="my-2 text-sm leading-6 text-white/72">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-white">{children}</strong>
        ),
        ul: ({ children }) => (
          <ul className="my-2 list-disc space-y-1 pl-5 text-sm text-white/72">
            {children}
          </ul>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-indigo-100 underline decoration-indigo-100/30 underline-offset-4"
          >
            {children}
          </a>
        ),
        code: ({ children }) => (
          <code className="rounded-md border border-white/10 bg-white/[0.06] px-1.5 py-0.5 text-xs text-indigo-100">
            {children}
          </code>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

function MessageBubble({ message, shouldReduceMotion }) {
  const isUser = message.role === "user";
  const isThinking = !isUser && message.isStreaming && !message.content;

  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 0, y: 8, scale: 0.99 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.2, ease: motionEase }}
    >
      <div
        className={`min-w-0 max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${
          isUser
            ? "rounded-br-md bg-white text-black"
            : "rounded-bl-md border border-white/10 bg-white/[0.05] text-white/72 backdrop-blur"
        }`}
      >
        {!isUser && (
          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-indigo-100/60">
            <MessageSquare size={12} />
            Assistant
          </div>
        )}
        {isThinking ? (
          <span className="inline-flex items-center gap-2 text-white/56">
            <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-200" />
            Thinking...
          </span>
        ) : isUser ? (
          message.content
        ) : (
          <MarkdownMessage content={message.content} />
        )}
      </div>
    </motion.div>
  );
}

export default function WorkspaceChat() {
  const { state } = useWorkspace();
  const shouldReduceMotion = useReducedMotion();
  const abortRef = useRef(null);
  const scrollRef = useRef(null);

  // Check for pending question from Dashboard on mount
  const initialQuestion = useRef(
    (() => {
      const q = sessionStorage.getItem("bruniverse-pending-question");
      if (q) sessionStorage.removeItem("bruniverse-pending-question");
      return q || "";
    })(),
  );
  const [input, setInput] = useState(initialQuestion.current);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const hasMessages = messages.length > 0;
  const activeCase =
    state.cases.find((item) => item.id === state.selectedCaseId) || state.cases[0];
  const activeEvidence = useMemo(
    () => state.evidence.filter((item) => item.caseId === activeCase?.id),
    [state.evidence, activeCase?.id],
  );
  const activeClaims = useMemo(
    () => state.claims.filter((item) => item.caseId === activeCase?.id),
    [state.claims, activeCase?.id],
  );
  const activeBrief =
    state.briefs.find((item) => item.caseId === activeCase?.id) || state.briefs[0];
  const researchContext = useMemo(
    () => ({
      case: activeCase,
      evidence: activeEvidence,
      claims: activeClaims,
      brief: activeBrief,
    }),
    [activeCase, activeEvidence, activeClaims, activeBrief],
  );

  const welcomeMessages = useMemo(
    () => [
      {
        role: "assistant",
        content:
          "Welcome. I can review the active SDG case, test claims against evidence, flag citation gaps, and suggest the next research move.",
      },
    ],
    [],
  );

  async function sendMessage(rawText) {
    const text = rawText.trim();
    if (!text || isLoading) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    const aiIndex = nextMessages.length;
    const abort = new AbortController();

    abortRef.current = abort;
    setMessages([
      ...nextMessages,
      { role: "assistant", content: "", isStreaming: true },
    ]);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      await streamDeepSeekReply(nextMessages, {
        signal: abort.signal,
        context: researchContext,
        onToken: (token) => {
          setMessages((prev) =>
            prev.map((m, i) =>
              i === aiIndex ? { ...m, content: `${m.content}${token}` } : m,
            ),
          );
        },
      });

      setMessages((prev) =>
        prev.map((m, i) =>
          i === aiIndex ? { ...m, isStreaming: false } : m,
        ),
      );
    } catch (err) {
      setMessages((prev) =>
        prev.reduce((acc, m, i) => {
          if (i !== aiIndex) return [...acc, m];
          if (!m.content) return acc;
          return [...acc, { ...m, isStreaming: false }];
        }, []),
      );
      setError(
        err instanceof Error ? err.message : "Request failed. Please try again.",
      );
    } finally {
      abortRef.current = null;
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="mx-auto flex h-full max-w-4xl flex-col px-4 py-4 sm:px-6">
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
        {!hasMessages ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <div className="grid h-10 w-10 place-items-center rounded-full border border-indigo-200/18 bg-indigo-200/[0.06] text-indigo-100">
              <Sparkles size={18} />
            </div>
            <h2 className="text-xl font-bold text-white">Research Assistant</h2>
            <p className="max-w-md text-sm text-white/52">
              Reviewing {activeCase ? `${activeCase.sdg} / ${activeCase.country}` : "your active case"} with linked claims, evidence, and brief context.
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {examplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={isLoading}
                  onClick={() => sendMessage(prompt)}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-left text-sm font-medium text-white/62 transition hover:border-indigo-200/28 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-4 pb-4">
            {welcomeMessages.map((m, i) => (
              <MessageBubble
                key={`welcome-${i}`}
                message={m}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
            {messages.map((m, i) => (
              <MessageBubble
                key={`msg-${i}`}
                message={m}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        )}
      </div>

      {error && (
        <p className="mb-2 rounded-lg border border-red-300/16 bg-red-500/[0.06] px-3 py-2 text-xs text-red-200/80">
          {error}
        </p>
      )}

      <div className="shrink-0 border-t border-white/10 pt-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="rounded-xl border border-indigo-200/14 bg-[#0a0a1a]/86 p-2 shadow-[0_16px_48px_rgba(0,0,0,0.3)] backdrop-blur-md"
        >
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              rows={1}
              disabled={isLoading}
              className="max-h-28 min-h-10 flex-1 resize-none rounded-lg border border-transparent bg-transparent px-3 py-2 text-sm font-medium text-white outline-none placeholder:text-white/36 focus:border-indigo-200/16 disabled:cursor-not-allowed disabled:opacity-60"
              placeholder="Ask a research question..."
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-black transition hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-[10px] text-white/32">
          Case-aware research reviewer. Verify final claims against your original sources.
        </p>
      </div>
    </div>
  );
}
