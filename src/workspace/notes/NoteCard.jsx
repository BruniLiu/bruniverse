import React from "react";
import { useWorkspace } from "../context/WorkspaceContext";

export default function NoteCard({ note }) {
  const { state, dispatch } = useWorkspace();
  const isSelected = state.selectedNoteId === note.id;

  const linkedCount = note.linkedLiteratureIds?.length || 0;
  const preview = (note.content || "")
    .replace(/[#*_>`\[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);

  return (
    <button
      type="button"
      onClick={() => dispatch({ type: "SELECT_NOTE", payload: note.id })}
      className={`w-full rounded-md px-3 py-2 text-left transition ${
        isSelected
          ? "bg-white/[0.06]"
          : "hover:bg-white/[0.02]"
      }`}
    >
      <p className="text-[13px] font-medium text-white/80 truncate">
        {note.title || "Untitled"}
      </p>
      {preview && (
        <p className="mt-0.5 text-[11px] leading-5 text-white/32 truncate">
          {preview}
        </p>
      )}
      <div className="mt-1 flex items-center gap-2 text-[10px] text-white/20">
        <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
        {linkedCount > 0 && (
          <span>{linkedCount} paper{linkedCount > 1 ? "s" : ""}</span>
        )}
      </div>
    </button>
  );
}
