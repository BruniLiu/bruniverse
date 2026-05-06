import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  Bot,
  Boxes,
  FlaskConical,
  FolderPlus,
  LayoutGrid,
  Loader2,
  MessageSquare,
  MoreHorizontal,
  PanelLeft,
  Plus,
  Search,
  SquarePen,
  UserCircle,
} from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "./components/ai/conversation";
import { Message, MessageContent } from "./components/ai/message";
import AiChatInput from "./components/react-bits/AiChatInput";
import "./react.css";

const starterMessages = [];

const suggestions = [
  "Explain the 17 SDGs in simple language.",
  "Help me write an SDG 13 case study.",
  "Give me 3 carbon footprint reduction ideas.",
  "How should I cite sources in APA 7?",
];

const gpts = ["SDG Researcher", "APA 7 Helper", "Carbon Footprint Coach"];
const recents = [
  "SDG website hero",
  "Carbon footprint notes",
  "APA reference help",
];

const navItems = [
  { icon: SquarePen, label: "New chat" },
  { icon: Search, label: "Search chats" },
  { icon: Bot, label: "Unknown" },
  { icon: MoreHorizontal, label: "More" },
];

const projects = [
  { icon: FolderPlus, label: "New project" },
  { icon: FlaskConical, label: "Chatbox" },
  { icon: Boxes, label: "SDG structure" },
  { icon: LayoutGrid, label: "Project website" },
];

function MarkdownMessage({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mb-3 mt-1 text-xl font-extrabold leading-tight text-white">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-2 mt-4 text-lg font-extrabold leading-tight text-white">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-2 mt-3 text-base font-extrabold text-white">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="my-2 leading-7 text-white/84">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="my-3 list-disc space-y-1 pl-5 text-white/84">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="my-3 list-decimal space-y-1 pl-5 text-white/84">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-7">{children}</li>,
        strong: ({ children }) => (
          <strong className="font-extrabold text-white">{children}</strong>
        ),
        em: ({ children }) => <em className="text-white/90">{children}</em>,
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-sky-200 underline decoration-sky-200/35 underline-offset-4"
          >
            {children}
          </a>
        ),
        code: ({ children }) => (
          <code className="rounded-md border border-white/10 bg-black/30 px-1.5 py-0.5 text-[0.92em] text-sky-100">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="my-3 overflow-x-auto rounded-xl border border-white/10 bg-black/35 p-3 text-sm">
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-3 border-l-2 border-sky-200/40 pl-4 text-white/70">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

function ChatApp() {
  const [messages, setMessages] = useState(starterMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const hasConversation = messages.length > 0;

  async function sendMessage(text) {
    const trimmedText = text.trim();
    if (!trimmedText || isLoading) return;

    const nextMessages = [...messages, { role: "user", content: trimmedText }];
    setMessages(nextMessages);
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "AI API request failed.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply },
      ]);
    } catch (apiError) {
      setError(apiError instanceof Error ? apiError.message : "Request failed.");
    } finally {
      setIsLoading(false);
    }
  }

  function resetThread() {
    setMessages(starterMessages);
    setError("");
  }

  return (
    <main className="grid h-dvh overflow-hidden bg-[#212121] text-white md:grid-cols-[292px_minmax(0,1fr)]">
      <aside className="hidden min-h-0 border-r border-white/8 bg-[#181818] px-3 py-4 md:grid md:grid-rows-[auto_minmax(0,1fr)_auto]">
        <div className="flex items-center justify-between px-2 pb-5">
          <h1 className="text-xl font-extrabold tracking-normal">Unknown</h1>
          <PanelLeft size={20} className="text-white/58" />
        </div>

        <div className="min-h-0 overflow-hidden">
          <nav className="grid gap-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={index === 0 ? resetThread : undefined}
                  className={`flex h-10 items-center gap-3 rounded-xl px-3 text-[15px] font-bold text-white/92 transition hover:bg-white/8 ${
                    index === 0 ? "bg-white/10" : ""
                  }`}
                >
                  <Icon size={19} strokeWidth={2} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-7 grid gap-2">
            <p className="px-3 text-sm font-extrabold text-white/92">GPTs</p>
            {gpts.map((item) => (
              <button
                key={item}
                type="button"
                className="flex h-10 items-center gap-3 rounded-xl px-3 text-[15px] font-semibold text-white/82 transition hover:bg-white/8"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-sky-300 to-violet-500 text-[10px] font-extrabold text-white">
                  U
                </span>
                <span className="truncate">{item}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-2">
            <p className="px-3 text-sm font-extrabold text-white/92">
              Projects
            </p>
            {projects.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  className="flex h-10 items-center gap-3 rounded-xl px-3 text-[15px] font-semibold text-white/82 transition hover:bg-white/8"
                >
                  <Icon size={18} strokeWidth={2} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-2">
            <p className="px-3 text-sm font-extrabold text-white/92">
              Recents
            </p>
            {recents.map((item) => (
              <button
                key={item}
                type="button"
                className="flex h-9 items-center rounded-xl px-3 text-left text-sm font-semibold text-white/74 transition hover:bg-white/8"
              >
                <span className="truncate">{item}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-2 border-t border-white/8 pt-3">
          <a
            href="./index.html"
            className="flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-bold text-white/78 transition hover:bg-white/8"
          >
            <ArrowLeft size={17} />
            Back to hero
          </a>
          <div className="flex items-center gap-3 rounded-xl px-3 py-2">
            <UserCircle size={28} className="text-sky-200" />
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold">Bruni Liu</p>
              <p className="text-xs font-semibold text-white/42">DeepSeek</p>
            </div>
          </div>
        </div>
      </aside>

      <section className="grid h-dvh min-h-0 grid-rows-[auto_minmax(0,1fr)] bg-[#212121]">
        <header className="flex h-14 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={resetThread}
              className="grid h-9 w-9 place-items-center rounded-xl bg-white/8 text-white/86"
              aria-label="New chat"
            >
              <Plus size={19} />
            </button>
            <h1 className="text-base font-extrabold">Unknown</h1>
          </div>
          <div className="hidden items-center gap-2 text-sm font-semibold text-white/50 md:flex">
            <MessageSquare size={16} />
            Ask for Unknown
          </div>
          <a
            href="./index.html"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-white/70 transition hover:bg-white/8"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Hero</span>
          </a>
        </header>

        <div className="relative grid min-h-0 grid-rows-[minmax(0,1fr)_auto]">
          <Conversation className="min-h-0 px-4">
            {!hasConversation ? (
              <ConversationEmptyState className="pb-[11vh]">
                <section className="grid w-full max-w-4xl gap-8">
                  <h2 className="text-center text-3xl font-semibold leading-tight tracking-normal text-white md:text-4xl">
                    Good to see you, Bruni.
                  </h2>
                  <AiChatInput
                    disabled={isLoading}
                    modeLabel="DeepSeek"
                    placeholders={[
                      "Ask anything",
                      "Ask about your SDG project",
                      "Draft an APA 7 reference",
                      "Improve my carbon footprint response",
                    ]}
                    onSubmit={sendMessage}
                  />
                  <div className="mx-auto hidden max-w-4xl grid-cols-2 gap-3 lg:grid">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => sendMessage(suggestion)}
                        className="rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-3 text-left text-sm font-semibold leading-6 text-white/56 transition hover:bg-white/[0.06] hover:text-white/82"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </section>
              </ConversationEmptyState>
            ) : (
              <>
                <ConversationContent className="mx-auto w-full max-w-4xl gap-5 px-0 py-5">
                  {messages.map((message, index) => (
                    <Message
                      key={`${message.role}-${index}`}
                      from={message.role === "user" ? "user" : "assistant"}
                    >
                      <MessageContent>
                        {message.role === "assistant" ? (
                          <MarkdownMessage content={message.content} />
                        ) : (
                          message.content
                        )}
                      </MessageContent>
                    </Message>
                  ))}
                  {isLoading && (
                    <Message from="assistant">
                      <MessageContent className="bg-[#303030] text-white/68">
                        <span className="inline-flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        Unknown is thinking...
                        </span>
                      </MessageContent>
                    </Message>
                  )}
                </ConversationContent>
                <ConversationScrollButton className="bottom-5" />
              </>
            )}
          </Conversation>

          {hasConversation && (
            <div className="px-4 pb-5 pt-2">
              <div className="mx-auto max-w-4xl">
                {error && (
                  <p className="mb-3 rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-100">
                    {error}
                  </p>
                )}
                <AiChatInput
                  disabled={isLoading}
                  modeLabel="DeepSeek"
                  placeholders={[
                    "Ask anything",
                    "Ask Unknown anything about your SDG project",
                    "Give me APA 7 citation guidance",
                  ]}
                  onSubmit={sendMessage}
                />
              </div>
            </div>
          )}
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
