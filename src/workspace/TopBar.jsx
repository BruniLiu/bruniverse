import React from "react";
import ThemeToggle from "../components/theme/ThemeToggle";
import { useWorkspace } from "./context/WorkspaceContext";

const labels = {
  overview: "Research Cockpit",
  cases: "Cases",
  evidence: "Evidence Ledger",
  literature: "Source Library",
  briefs: "Brief Studio",
  graph: "Evidence Graph",
  notes: "Case Notes",
  chat: "Research AI",
};

const syncTone = {
  loading: "border-white/[0.1] text-white/36",
  saving: "border-sky-100/18 text-sky-100/66",
  synced: "border-emerald-100/16 text-emerald-100/58",
  local: "border-amber-100/18 text-amber-100/62",
};

export default function TopBar() {
  const { state } = useWorkspace();

  return (
    <header className="flex shrink-0 items-center justify-between border-b border-white/[0.07] bg-[#050505]/84 px-5 py-2.5 backdrop-blur-md">
      <div className="flex min-w-0 items-center gap-1">
        <a
          href="./index.html"
          className="mr-3 shrink-0 text-[13px] font-bold uppercase tracking-[0.08em] text-white/48 transition hover:text-white/76"
        >
          Bruniverse
        </a>
        <span className="text-white/14">/</span>
        <span className="ml-2 truncate text-[13px] font-medium text-white/70">
          {labels[state.activeView] || "Workspace"}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span
          title={state.syncMessage}
          className={`hidden rounded-full border px-2.5 py-1 text-[11px] font-semibold sm:inline-flex ${
            syncTone[state.syncStatus] || syncTone.loading
          }`}
        >
          {state.syncStatus === "local" ? "Local mode" : state.syncStatus || "loading"}
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
