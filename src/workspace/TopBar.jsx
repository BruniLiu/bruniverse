import React from "react";
import ThemeToggle from "../components/theme/ThemeToggle";
import { useWorkspace } from "./context/WorkspaceContext";

export default function TopBar() {
  const { state } = useWorkspace();

  return (
    <header className="flex shrink-0 items-center justify-between border-b border-white/[0.06] px-5 py-2.5">
      <div className="flex items-center gap-1">
        <a
          href="./index.html"
          className="mr-3 text-[13px] font-bold uppercase tracking-[0.08em] text-white/44 transition hover:text-white/72"
        >
          Bruniverse
        </a>
        <span className="text-white/12">/</span>
        <span className="ml-2 text-[13px] font-medium text-white/64">
          {state.activeView === "overview" && "Dashboard"}
          {state.activeView === "notes" && "Notes"}
          {state.activeView === "literature" && "Literature"}
          {state.activeView === "graph" && "Research Graph"}
          {state.activeView === "chat" && "AI Assistant"}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[11px] font-medium text-white/20">prototype</span>
        <ThemeToggle />
      </div>
    </header>
  );
}
