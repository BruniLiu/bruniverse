import React, { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ClipboardList,
  Database,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Plus,
  Search,
  Share2,
} from "lucide-react";
import { useWorkspace } from "./context/WorkspaceContext";
import { createActivityEntry, createBriefItem, createResearchCaseItem } from "./data/storage";

export default function Sidebar({ onLogout }) {
  const { state, dispatch } = useWorkspace();
  const [researchOpen, setResearchOpen] = useState(true);
  const [toolsOpen, setToolsOpen] = useState(true);

  const litCount = state.literature.length;
  const notesCount = state.notes.length;

  function createBlankCase() {
    const item = createResearchCaseItem({
      sdg: "SDG",
      title: "Untitled SDG case",
      country: "Global",
      owner: "Researcher",
      focus: "",
      researchQuestion: "",
      status: "drafting",
    });
    const brief = createBriefItem({
      caseId: item.id,
      title: "Untitled Research Brief",
    });

    dispatch({ type: "ADD_CASE", payload: item });
    dispatch({ type: "ADD_BRIEF", payload: brief });
    dispatch({ type: "SET_ACTIVE_VIEW", payload: "cases" });
    dispatch({
      type: "ADD_ACTIVITY",
      payload: createActivityEntry({
        type: "created_case",
        description: "Created a new SDG research case",
        relatedId: item.id,
      }),
    });
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-white/[0.07] bg-[#050505]/96">
      <div className="px-4 pt-5 pb-3">
        <span className="text-[15px] font-bold tracking-tight text-white/90">
          Bruniverse
        </span>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/28">
          SDG Intelligence Hub
        </p>
      </div>

      <div className="px-3 pb-1">
        <button
          type="button"
          onClick={createBlankCase}
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium text-white/52 transition hover:bg-white/[0.05] hover:text-white/82"
        >
          <Plus size={15} />
          New case
        </button>
        <button
          type="button"
          onClick={() =>
            dispatch({ type: "OPEN_MODAL", payload: { modal: "addLiterature" } })
          }
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium text-white/52 transition hover:bg-white/[0.05] hover:text-white/82"
        >
          <Search size={15} />
          Add source
        </button>
      </div>

      <div className="mx-3 my-2 border-t border-white/[0.06]" />

      <div className="flex-1 overflow-y-auto px-2">
        <NavItem
          icon={LayoutDashboard}
          label="Research Cockpit"
          active={state.activeView === "overview"}
          onClick={() => dispatch({ type: "SET_ACTIVE_VIEW", payload: "overview" })}
        />

        <div className="my-1" />

        <button
          type="button"
          onClick={() => setResearchOpen(!researchOpen)}
          className="flex w-full items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.06em] text-white/28 transition hover:text-white/45"
        >
          <ChevronDown
            size={12}
            className={`transition ${researchOpen ? "" : "-rotate-90"}`}
          />
          Research workflow
        </button>

        {researchOpen && (
          <div className="mt-0.5">
            <NavItem
              icon={ClipboardList}
              label="Cases"
              count={state.cases.length}
              active={state.activeView === "cases"}
              onClick={() => dispatch({ type: "SET_ACTIVE_VIEW", payload: "cases" })}
            />
            <NavItem
              icon={Database}
              label="Evidence Ledger"
              count={state.evidence.length}
              active={state.activeView === "evidence"}
              onClick={() => dispatch({ type: "SET_ACTIVE_VIEW", payload: "evidence" })}
            />
            <NavItem
              icon={BookOpen}
              label="Source Library"
              count={litCount}
              active={state.activeView === "literature"}
              onClick={() => dispatch({ type: "SET_ACTIVE_VIEW", payload: "literature" })}
            />
            <NavItem
              icon={FileText}
              label="Brief Studio"
              count={state.briefs.length}
              active={state.activeView === "briefs"}
              onClick={() => dispatch({ type: "SET_ACTIVE_VIEW", payload: "briefs" })}
            />
          </div>
        )}

        <div className="my-1" />

        <button
          type="button"
          onClick={() => setToolsOpen(!toolsOpen)}
          className="flex w-full items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.06em] text-white/28 transition hover:text-white/45"
        >
          <ChevronDown
            size={12}
            className={`transition ${toolsOpen ? "" : "-rotate-90"}`}
          />
          Analysis tools
        </button>

        {toolsOpen && (
          <div className="mt-0.5">
            <NavItem
              icon={Share2}
              label="Evidence Graph"
              active={state.activeView === "graph"}
              onClick={() => dispatch({ type: "SET_ACTIVE_VIEW", payload: "graph" })}
            />
            <NavItem
              icon={MessageSquare}
              label="Research AI"
              active={state.activeView === "chat"}
              onClick={() => dispatch({ type: "SET_ACTIVE_VIEW", payload: "chat" })}
            />
            <NavItem
              icon={FileText}
              label="Case Notes"
              count={notesCount}
              active={state.activeView === "notes"}
              onClick={() => dispatch({ type: "SET_ACTIVE_VIEW", payload: "notes" })}
            />
          </div>
        )}
      </div>

      <div className="border-t border-white/[0.06] px-3 py-3">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium text-white/35 transition hover:bg-white/[0.05] hover:text-white/58"
        >
          <LogOut size={15} />
          Log out
        </button>
      </div>
    </aside>
  );
}

function NavItem({ icon: Icon, label, count, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[14px] transition ${
        active
          ? "bg-white/[0.08] font-semibold text-white/92"
          : "font-normal text-white/50 hover:bg-white/[0.04] hover:text-white/76"
      }`}
    >
      <Icon size={16} strokeWidth={active ? 2 : 1.5} />
      <span className="flex-1 truncate text-left">{label}</span>
      {count != null && count > 0 && (
        <span className="text-[12px] tabular-nums text-white/28">{count}</span>
      )}
    </button>
  );
}
