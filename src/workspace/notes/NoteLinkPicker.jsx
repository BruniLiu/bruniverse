import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link, X } from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext";

const motionEase = [0.23, 1, 0.32, 1];

export default function NoteLinkPicker() {
  const shouldReduceMotion = useReducedMotion();
  const { state, dispatch } = useWorkspace();
  const isOpen = state.modals.noteLinkPicker;
  const noteId = state.modals.noteLinkPickerNoteId;
  const note = noteId ? state.notes.find((n) => n.id === noteId) : null;

  if (!isOpen || !note) return null;

  const linkedIds = note.linkedLiteratureIds || [];

  function close() {
    dispatch({ type: "CLOSE_MODAL", payload: "noteLinkPicker" });
  }

  function toggleLink(litId) {
    const next = linkedIds.includes(litId)
      ? linkedIds.filter((id) => id !== litId)
      : [...linkedIds, litId];

    dispatch({
      type: "UPDATE_NOTE",
      payload: { id: note.id, updates: { linkedLiteratureIds: next } },
    });
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={close}
    >
      <motion.div
        className="w-full max-w-md rounded-xl border border-indigo-200/16 bg-[#0a0a1c]/94 p-5 shadow-[0_28px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        initial={
          shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 0, y: 12, scale: 0.98 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: motionEase }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">
            Link Papers to "{note.title.slice(0, 40)}"
          </h3>
          <button
            type="button"
            onClick={close}
            className="rounded-md p-1 text-white/42 transition hover:bg-white/[0.06] hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {state.literature.length === 0 ? (
          <p className="text-sm text-white/42">
            No papers yet. Add papers first to link them.
          </p>
        ) : (
          <div className="grid max-h-64 gap-1.5 overflow-y-auto">
            {state.literature.map((item) => {
              const isLinked = linkedIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleLink(item.id)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                    isLinked
                      ? "border border-indigo-200/24 bg-indigo-200/[0.08]"
                      : "border border-transparent bg-white/[0.03] hover:bg-white/[0.05]"
                  }`}
                >
                  <Link
                    size={13}
                    className={
                      isLinked ? "text-indigo-100" : "text-white/28"
                    }
                  />
                  <span
                    className={
                      isLinked
                        ? "font-bold text-indigo-100/90"
                        : "text-white/58"
                    }
                  >
                    {item.title.slice(0, 60) || "Untitled Paper"}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
