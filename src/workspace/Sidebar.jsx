import React, { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Plus,
  Search,
  Share2,
} from "lucide-react";
import { useWorkspace } from "./context/WorkspaceContext";

export default function Sidebar({ onLogout }) {
  const { state, dispatch } = useWorkspace();
  const [pagesOpen, setPagesOpen] = useState(true);
  const [toolsOpen, setToolsOpen] = useState(true);

  const litCount = state.literature.length;
  const notesCount = state.notes.length;

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-white/[0.06] bg-[#080812]">
      {/* Workspace header */}
      <div className="px-4 pt-5 pb-3">
        <span className="text-[15px] font-bold tracking-tight text-white/85">
          Workspace
        </span>
      </div>

      {/* Quick actions */}
      <div className="px-3 pb-1">
        <button
          type="button"
          onClick={() => {
            const newNote = {
              id: crypto.randomUUID(),
              title: "",
              content: "",
              linkedLiteratureIds: [],
              tags: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            dispatch({ type: "ADD_NOTE", payload: newNote });
            dispatch({ type: "SELECT_NOTE", payload: newNote.id });
            dispatch({ type: "SET_ACTIVE_VIEW", payload: "notes" });
          }}
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium text-white/48 transition hover:bg-white/[0.04] hover:text-white/78"
        >
          <Plus size={15} />
          New page
        </button>
        <button
          type="button"
          onClick={() =>
            dispatch({ type: "OPEN_MODAL", payload: { modal: "addLiterature" } })
          }
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium text-white/48 transition hover:bg-white/[0.04] hover:text-white/78"
        >
          <Search size={15} />
          Add paper
        </button>
      </div>

      <div className="mx-3 my-2 border-t border-white/[0.05]" />

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-2">
        {/* Overview */}
        <NavItem
          icon={LayoutDashboard}
          label="Dashboard"
          active={state.activeView === "overview"}
          onClick={() =>
            dispatch({ type: "SET_ACTIVE_VIEW", payload: "overview" })
          }
        />

        <div className="my-1" />

        {/* Pages section */}
        <button
          type="button"
          onClick={() => setPagesOpen(!pagesOpen)}
          className="flex w-full items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.06em] text-white/28 transition hover:text-white/45"
        >
          <ChevronDown
            size={12}
            className={`transition ${pagesOpen ? "" : "-rotate-90"}`}
          />
          Pages
        </button>

        {pagesOpen && (
          <div className="mt-0.5">
            <NavItem
              icon={FileText}
              label="Notes"
              count={notesCount}
              active={state.activeView === "notes"}
              onClick={() =>
                dispatch({ type: "SET_ACTIVE_VIEW", payload: "notes" })
              }
            />
            <NavItem
              icon={BookOpen}
              label="Literature"
              count={litCount}
              active={state.activeView === "literature"}
              onClick={() =>
                dispatch({ type: "SET_ACTIVE_VIEW", payload: "literature" })
              }
            />
          </div>
        )}

        <div className="my-1" />

        {/* Tools section */}
        <button
          type="button"
          onClick={() => setToolsOpen(!toolsOpen)}
          className="flex w-full items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.06em] text-white/28 transition hover:text-white/45"
        >
          <ChevronDown
            size={12}
            className={`transition ${toolsOpen ? "" : "-rotate-90"}`}
          />
          Tools
        </button>

        {toolsOpen && (
          <div className="mt-0.5">
            <NavItem
              icon={Share2}
              label="Research Graph"
              active={state.activeView === "graph"}
              onClick={() =>
                dispatch({ type: "SET_ACTIVE_VIEW", payload: "graph" })
              }
            />
            <NavItem
              icon={MessageSquare}
              label="AI Assistant"
              active={state.activeView === "chat"}
              onClick={() =>
                dispatch({ type: "SET_ACTIVE_VIEW", payload: "chat" })
              }
            />
          </div>
        )}
      </div>

      {/* Bottom */}
      <div className="border-t border-white/[0.05] px-3 py-3">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium text-white/35 transition hover:bg-white/[0.04] hover:text-white/55"
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
          ? "bg-white/[0.06] font-semibold text-white/90"
          : "font-normal text-white/48 hover:bg-white/[0.03] hover:text-white/72"
      }`}
    >
      <Icon size={16} strokeWidth={active ? 2 : 1.4} />
      <span className="flex-1 truncate text-left">{label}</span>
      {count != null && count > 0 && (
        <span className="text-[12px] tabular-nums text-white/22">{count}</span>
      )}
    </button>
  );
}
