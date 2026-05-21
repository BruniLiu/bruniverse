import React, { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("[Workspace Error]", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[100svh] items-center justify-center bg-[#06060f] text-white">
          <div className="rounded-xl border border-red-300/20 bg-red-500/[0.06] p-8 text-center">
            <p className="text-lg font-bold text-red-200">Workspace Error</p>
            <p className="mt-2 text-sm text-red-200/60">
              {this.state.error?.message || "Unknown error"}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-bold text-black"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
import { WorkspaceProvider, useWorkspace } from "./context/WorkspaceContext";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import OverviewDashboard from "./overview/OverviewDashboard";
import LiteratureManager from "./literature/LiteratureManager";
import LiteratureGraph from "./graph/LiteratureGraph";
import NotesManager from "./notes/NotesManager";
import WorkspaceChat from "./chat/WorkspaceChat";
import AddLiteratureModal from "./literature/AddLiteratureModal";
import NoteLinkPicker from "./notes/NoteLinkPicker";

const motionEase = [0.23, 1, 0.32, 1];

function StarfieldBackground() {
  return (
    <div className="pointer-events-none absolute inset-[-5vh] z-0">
      <div className="hero-starfield hero-starfield-far absolute inset-0 opacity-40" />
      <div className="hero-starfield hero-starfield-near absolute inset-0 opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_26%,rgba(99,102,241,0.16)_0%,rgba(56,189,248,0.08)_26%,transparent_50%),radial-gradient(circle_at_28%_70%,rgba(129,140,248,0.09)_0%,transparent_40%),radial-gradient(circle_at_center,rgba(6,6,15,0.1)_0%,rgba(6,6,15,0.94)_78%)]" />
      <div className="noise-overlay absolute inset-0 opacity-[0.08] mix-blend-screen" />
    </div>
  );
}

function ViewTransition({ children, className = "" }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 0, y: 12, scale: 0.99 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 0, y: -8, scale: 0.995 }
      }
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.22, ease: motionEase }}
    >
      {children}
    </motion.div>
  );
}

function WorkspaceContent({ onLogout }) {
  const { state, dispatch } = useWorkspace();

  // Auto-select most recent note when entering notes view with nothing selected
  useEffect(() => {
    if (state.activeView === "notes" && !state.selectedNoteId && state.notes.length > 0) {
      dispatch({ type: "SELECT_NOTE", payload: state.notes[0].id });
    }
  }, [state.activeView, state.selectedNoteId, state.notes]);

  return (
    <main className="aurora-landing relative h-[100svh] bg-[#06060f] text-white">
      <StarfieldBackground />

      <div className="relative z-10 flex h-full">
        <Sidebar onLogout={onLogout} />
        <div className="flex flex-1 flex-col min-w-0">
          <TopBar />
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait" initial={false}>
              {state.activeView === "overview" && (
                <ViewTransition key="overview">
                  <OverviewDashboard />
                </ViewTransition>
              )}
              {state.activeView === "literature" && (
                <ViewTransition key="literature">
                  <LiteratureManager />
                </ViewTransition>
              )}
              {state.activeView === "graph" && (
                <ViewTransition key="graph" className="h-full">
                  <LiteratureGraph />
                </ViewTransition>
              )}
              {state.activeView === "notes" && (
                <ViewTransition key="notes" className="h-full">
                  <NotesManager />
                </ViewTransition>
              )}
              {state.activeView === "chat" && (
                <ViewTransition key="chat" className="h-full">
                  <WorkspaceChat />
                </ViewTransition>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AddLiteratureModal />
      <NoteLinkPicker />
    </main>
  );
}

export default function ResearchWorkspace({ onLogout }) {
  return (
    <ErrorBoundary>
      <WorkspaceProvider>
        <WorkspaceContent onLogout={onLogout} />
      </WorkspaceProvider>
    </ErrorBoundary>
  );
}
