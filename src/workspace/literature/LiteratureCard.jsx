import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext";
import { createActivityEntry } from "../data/storage";

const motionEase = [0.23, 1, 0.32, 1];

export default function LiteratureCard({ item }) {
  const shouldReduceMotion = useReducedMotion();
  const { state, dispatch } = useWorkspace();
  const isSelected = state.selectedLiteratureId === item.id;

  function handleSelect() {
    dispatch({ type: "SELECT_LITERATURE", payload: item.id });
  }

  function handleCreateNote() {
    dispatch({ type: "SET_ACTIVE_VIEW", payload: "notes" });
    const newNote = {
      id: crypto.randomUUID(),
      title: `Note: ${item.title.slice(0, 60)}`,
      content: `## About: ${item.title}\n\nAuthors: ${item.authors.join(", ")}\n\n`,
      linkedLiteratureIds: [item.id],
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_NOTE", payload: newNote });
    dispatch({
      type: "ADD_ACTIVITY",
      payload: createActivityEntry({
        type: "added_note",
        description: `Created note about "${item.title.slice(0, 80)}"`,
        relatedId: newNote.id,
      }),
    });
  }

  return (
    <motion.article
      onClick={handleSelect}
      whileHover={
        shouldReduceMotion
          ? undefined
          : { transform: "translate3d(0, -2px, 0)" }
      }
      transition={{ duration: 0.16, ease: motionEase }}
      className={`cursor-pointer rounded-lg border p-4 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur transition ${
        isSelected
          ? "border-indigo-200/32 bg-white/[0.08]"
          : "border-white/10 bg-white/[0.04] hover:border-indigo-200/24 hover:bg-white/[0.06]"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-bold leading-snug text-white">
          {item.title || "Untitled Paper"}
        </h3>
      </div>
      {item.authors.length > 0 && (
        <p className="mt-2 text-xs font-medium text-white/52">
          {item.authors.slice(0, 3).join(", ")}
          {item.authors.length > 3 ? " et al." : ""}
        </p>
      )}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {item.year && (
          <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-bold text-white/42">
            {item.year}
          </span>
        )}
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-indigo-200/14 bg-indigo-200/[0.05] px-2 py-0.5 text-[10px] font-bold text-indigo-100/70"
          >
            {tag}
          </span>
        ))}
        {item.relationships.length > 0 && (
          <span className="rounded-full border border-sky-200/14 bg-sky-200/[0.05] px-2 py-0.5 text-[10px] font-bold text-sky-100/70">
            {item.relationships.length} links
          </span>
        )}
      </div>
      {item.abstract && (
        <p className="mt-3 text-xs leading-5 text-white/48 line-clamp-3">
          {item.abstract}
        </p>
      )}
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleCreateNote();
          }}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-bold text-white/42 transition hover:bg-white/[0.06] hover:text-white/72"
        >
          <FileText size={12} />
          Note
        </button>
        {item.doi && (
          <a
            href={`https://doi.org/${item.doi}`}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-bold text-indigo-100/60 transition hover:text-indigo-100"
          >
            <ExternalLink size={12} />
            DOI
          </a>
        )}
      </div>
    </motion.article>
  );
}
