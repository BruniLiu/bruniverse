import React, { createContext, useContext } from "react";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const MessageContext = createContext({ from: "assistant" });

export function Message({ from = "assistant", className, children, ...props }) {
  const isUser = from === "user";

  return (
    <MessageContext.Provider value={{ from }}>
      <div
        className={cn(
          "flex w-full items-start gap-4",
          isUser ? "justify-end" : "justify-start",
          className,
        )}
        {...props}
      >
        {!isUser && (
          <span className="mt-1 hidden h-8 w-8 shrink-0 place-items-center rounded-full bg-white/8 text-sky-200 sm:grid">
            <Bot size={16} />
          </span>
        )}
        {children}
      </div>
    </MessageContext.Provider>
  );
}

export function MessageContent({ className, children, ...props }) {
  const { from } = useContext(MessageContext);
  const isUser = from === "user";

  return (
    <div
      className={cn(
        "max-w-[92%] rounded-3xl px-4 py-3 text-[15px] leading-7 md:max-w-[78%]",
        isUser ? "bg-[#303030] text-white" : "text-white/88",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
