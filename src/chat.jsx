import React, { useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Database,
  Leaf,
  MessageSquare,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { streamDeepSeekReply } from "./lib/deepseek";
import "./react.css";

const motionEase = [0.23, 1, 0.32, 1];

const examplePrompts = [
  "What is SDG 13?",
  "How can education reduce inequality?",
  "What datasets can I use for climate research?",
  "How can students take SDG action?",
];

const capabilityCards = [
  {
    title: "Explain",
    copy: "Break down SDG ideas into clear learning notes.",
    icon: BookOpen,
  },
  {
    title: "Research",
    copy: "Suggest dataset directions for academic inquiry.",
    icon: Database,
  },
  {
    title: "Act",
    copy: "Turn awareness into practical sustainability steps.",
    icon: Leaf,
  },
];

function StarfieldBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-[-5vh] z-0 overflow-hidden">
      <div className="hero-starfield hero-starfield-far absolute inset-0 opacity-45" />
      <div className="hero-starfield hero-starfield-near absolute inset-0 opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(37,99,235,0.2)_0%,rgba(14,165,233,0.09)_25%,transparent_52%),radial-gradient(circle_at_18%_78%,rgba(20,184,166,0.11)_0%,transparent_42%),radial-gradient(circle_at_center,rgba(2,5,11,0.18)_0%,rgba(2,5,11,0.94)_76%)]" />
      <div className="noise-overlay absolute inset-0 opacity-[0.08] mix-blend-screen" />
    </div>
  );
}

function EmptyState({ onPrompt, disabled }) {
  return (
    <div className="mx-auto grid w-full max-w-3xl content-center gap-5 px-3 py-4 text-center sm:gap-6 sm:px-4 sm:py-6">
      <div>
        <div className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-sky-100/20 bg-sky-100/[0.08] text-sky-100 shadow-[0_0_34px_rgba(56,189,248,0.12)] sm:h-12 sm:w-12">
          <Sparkles size={18} />
        </div>
        <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
          Ask a sustainability question.
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm font-medium leading-relaxed text-white/60">
          Unknown is an educational prototype for exploring SDG concepts,
          research paths, and practical action ideas.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {examplePrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            disabled={disabled}
            onClick={() => onPrompt(prompt)}
            className="rounded-lg border border-white/12 bg-white/[0.045] px-4 py-3 text-left text-sm font-semibold leading-6 text-white/70 backdrop-blur transition hover:border-sky-100/34 hover:bg-white/[0.075] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

function MarkdownMessage({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mb-3 mt-1 text-xl font-bold leading-tight text-white">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-2 mt-4 text-lg font-bold leading-tight text-white">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-2 mt-3 text-base font-bold leading-tight text-white">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="my-2 leading-6 text-white/78 first:mt-0 last:mb-0">
            {children}
          </p>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-white">{children}</strong>
        ),
        em: ({ children }) => <em className="text-white/86">{children}</em>,
        ul: ({ children }) => (
          <ul className="my-3 list-disc space-y-1 pl-5 text-white/78">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="my-3 list-decimal space-y-1 pl-5 text-white/78">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-6">{children}</li>,
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-sky-100 underline decoration-sky-100/30 underline-offset-4 transition hover:text-white"
          >
            {children}
          </a>
        ),
        pre: ({ children }) => (
          <pre className="my-3 max-w-full overflow-x-auto rounded-lg border border-white/10 bg-black/34 p-3 text-sm leading-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            {children}
          </pre>
        ),
        code: ({ inline, children, ...props }) => {
          const codeText = String(children);
          const isInline = inline ?? !codeText.includes("\n");

          if (isInline) {
            return (
              <code
                className="rounded-md border border-white/10 bg-white/[0.075] px-1.5 py-0.5 text-[0.92em] font-semibold text-sky-100"
                {...props}
              >
                {children}
              </code>
            );
          }

          return (
            <code
              className="block min-w-max whitespace-pre font-mono text-[0.92em] text-sky-50/86"
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const isThinking = !isUser && message.isStreaming && !message.content;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`min-w-0 max-w-[86%] rounded-2xl px-4 py-3 text-sm font-medium leading-6 sm:max-w-[74%] ${
          isUser
            ? "rounded-br-md bg-white text-black shadow-[0_14px_40px_rgba(255,255,255,0.1)]"
            : "rounded-bl-md border border-white/12 bg-white/[0.055] text-white/78 backdrop-blur"
        }`}
      >
        {!isUser && (
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-sky-100/70">
            <MessageSquare size={13} />
            Unknown
          </div>
        )}
        {isThinking ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-sky-100 shadow-[0_0_12px_rgba(186,230,253,0.7)]" />
            Thinking through the SDG context...
          </span>
        ) : isUser ? (
          message.content
        ) : (
          <MarkdownMessage content={message.content} />
        )}
      </div>
    </div>
  );
}

function ChatComposer({ value, onChange, onSend, disabled }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSend(value);
  }

  function handleKeyDown(event) {
    if (event.key !== "Enter" || event.shiftKey) return;

    event.preventDefault();
    if (disabled || !value.trim()) return;
    onSend(value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-sky-100/16 bg-[#050b16]/86 p-2 shadow-[0_22px_70px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md"
    >
      <div className="flex items-end gap-2">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={disabled}
          className="max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-transparent bg-transparent px-3 py-2.5 text-sm font-medium leading-6 text-white outline-none placeholder:text-white/40 focus:border-sky-100/18 disabled:cursor-not-allowed disabled:opacity-60"
          placeholder="Ask Unknown about SDGs, datasets, or sustainability actions..."
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-black shadow-[0_14px_38px_rgba(255,255,255,0.12)] transition hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>
    </form>
  );
}

function ChatApp() {
  const shouldReduceMotion = useReducedMotion();
  const abortControllerRef = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const hasMessages = messages.length > 0;

  const welcomeMessages = useMemo(
    () => [
      {
        role: "assistant",
        content:
          "Welcome. Ask Unknown can help frame SDG learning questions, dataset directions, and action ideas.",
      },
    ],
    [],
  );

  async function sendMessage(rawText) {
    const text = rawText.trim();
    if (!text || isLoading) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    const assistantIndex = nextMessages.length;
    const abortController = new AbortController();

    abortControllerRef.current = abortController;
    setMessages([...nextMessages, { role: "assistant", content: "", isStreaming: true }]);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      await streamDeepSeekReply(nextMessages, {
        signal: abortController.signal,
        onToken: (token) => {
          setMessages((current) =>
            current.map((message, index) =>
              index === assistantIndex
                ? { ...message, content: `${message.content}${token}` }
                : message,
            ),
          );
        },
      });

      setMessages((current) =>
        current.map((message, index) =>
          index === assistantIndex ? { ...message, isStreaming: false } : message,
        ),
      );
    } catch (deepSeekError) {
      setMessages((current) =>
        current.reduce((nextMessages, message, index) => {
          if (index !== assistantIndex) return [...nextMessages, message];
          if (!message.content) return nextMessages;
          return [...nextMessages, { ...message, isStreaming: false }];
        }, []),
      );
      setError(
        deepSeekError instanceof Error
          ? deepSeekError.message
          : "DeepSeek request failed. Please try again shortly.",
      );
    } finally {
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  }

  function stopStreaming() {
    abortControllerRef.current?.abort();
    setMessages((current) =>
      current.map((message) =>
        message.isStreaming ? { ...message, isStreaming: false } : message,
      ),
    );
    setIsLoading(false);
  }

  function resetChat() {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setMessages([]);
    setInput("");
    setError("");
    setIsLoading(false);
  }

  return (
    <main className="aurora-landing relative h-[100svh] overflow-hidden bg-[#02050b] text-white">
      <StarfieldBackdrop />

      <section className="relative z-10 grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] px-3 py-3 sm:px-5 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.16 : 0.42, ease: motionEase }}
          className="mx-auto flex w-full max-w-7xl items-center justify-between border-b border-white/10 pb-3"
        >
          <a
            href="./index.html"
            className="inline-flex items-center gap-2 rounded-lg px-1 py-2 text-sm font-bold text-white/68 transition hover:text-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200"
          >
            <ArrowLeft size={17} />
            Back to Home
          </a>
          <div className="hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-sky-100/62 sm:flex">
            <ShieldCheck size={15} />
            Educational prototype
          </div>
          <button
            type="button"
            onClick={resetChat}
            className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-3 py-2 text-sm font-bold text-white/66 transition hover:border-sky-100/30 hover:bg-white/[0.07] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New chat</span>
          </button>
        </motion.header>

        <div className="mx-auto grid h-full min-h-0 w-full max-w-7xl grid-rows-[auto_minmax(0,1fr)] gap-3 py-3 lg:grid-cols-[300px_minmax(0,1fr)] lg:grid-rows-1 lg:py-4">
          <motion.aside
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.16 : 0.5, ease: motionEase }}
            className="grid min-h-0 gap-3 lg:grid-rows-[auto_auto_minmax(0,1fr)]"
          >
            <div className="rounded-lg border border-sky-100/14 bg-[#020711]/72 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:p-5 lg:p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-100/62">
                SDG Intelligence Hub
              </p>
              <h1 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-2xl">
                Ask Unknown
              </h1>
              <p className="mt-2 text-sm font-medium leading-relaxed text-white/62">
                Explore sustainability questions through an educational AI
                assistant.
              </p>
            </div>

            <div className="hidden gap-2 rounded-lg border border-white/10 bg-white/[0.035] p-3 backdrop-blur lg:grid">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/46">
                Example prompts
              </p>
              {examplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={isLoading}
                  onClick={() => sendMessage(prompt)}
                  className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-left text-sm font-semibold leading-5 text-white/62 transition hover:border-sky-100/28 hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="hidden min-h-0 gap-2 overflow-hidden lg:grid">
              {capabilityCards.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-lg border border-white/10 bg-white/[0.035] p-3 backdrop-blur"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-100/14 bg-cyan-100/[0.07] text-sky-100">
                        <Icon size={17} />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-white">{item.title}</p>
                        <p className="mt-1 text-xs font-medium leading-5 text-white/48">
                          {item.copy}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.16 : 0.5, ease: motionEase, delay: 0.04 }}
            className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto] overflow-hidden rounded-lg border border-sky-100/14 bg-[#030812]/72 shadow-[0_28px_90px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md"
          >
            <div className="min-h-0 overflow-y-auto px-3 py-3 sm:px-5 sm:py-4">
              {!hasMessages ? (
                <EmptyState onPrompt={sendMessage} disabled={isLoading} />
              ) : (
                <div className="mx-auto grid max-w-4xl gap-4">
                  {welcomeMessages.map((message, index) => (
                    <MessageBubble key={`welcome-${index}`} message={message} />
                  ))}
                  {messages.map((message, index) => (
                    <MessageBubble key={`${message.role}-${index}`} message={message} />
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-white/10 px-3 pb-3 pt-3 sm:px-5 sm:pb-4">
              <div className="mx-auto max-w-4xl">
                {error && (
                  <p className="mb-2 rounded-lg border border-red-300/18 bg-red-500/[0.08] px-3 py-2 text-sm font-medium leading-5 text-red-100/86">
                    {error}
                  </p>
                )}
                <ChatComposer
                  value={input}
                  onChange={setInput}
                  onSend={sendMessage}
                  disabled={isLoading}
                />
                {isLoading && (
                  <div className="mt-2 flex justify-center">
                    <button
                      type="button"
                      onClick={stopStreaming}
                      className="rounded-lg border border-white/14 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-white/62 transition hover:border-sky-100/30 hover:bg-white/[0.07] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200"
                    >
                      Stop generating
                    </button>
                  </div>
                )}
                <p className="mt-2 text-center text-xs font-medium leading-5 text-white/42">
                  This assistant is a learning prototype and does not provide
                  official UN guidance.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChatApp />
  </React.StrictMode>,
);
