import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext";
import { createActivityEntry } from "../data/storage";
import NoteEditor from "./NoteEditor";

export default function NotesManager() {
  const { state, dispatch } = useWorkspace();
  const [query, setQuery] = useState("");
  const selected = state.notes.find((n) => n.id === state.selectedNoteId);

  const filtered = state.notes.filter((note) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      note.title.toLowerCase().includes(q) ||
      note.content.toLowerCase().includes(q)
    );
  });

  function handleCreate() {
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
    dispatch({
      type: "ADD_ACTIVITY",
      payload: createActivityEntry({
        type: "added_note",
        description: "Created a new page",
        relatedId: newNote.id,
      }),
    });
  }

  // If a note is selected, show full editor
  if (selected) {
    return (
      <div className="flex h-full flex-col px-6 py-4">
        <NoteEditor note={selected} />
      </div>
    );
  }

  // Otherwise show the notes list + a welcome state
  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col px-6 py-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-white/90">
          Notes
        </h2>
        <p className="mt-1 text-sm text-white/40">
          Your research workspace. Create pages, link papers, write freely.
        </p>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/25"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter pages..."
            className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] py-2 pl-9 pr-4 text-sm text-white/70 outline-none transition placeholder:text-white/22 focus:border-white/[0.14] focus:bg-white/[0.04]"
          />
        </div>
        <button
          type="button"
          onClick={handleCreate}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/60 transition hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-white/85"
        >
          <Plus size={15} />
          New page
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-white/30">
              {query ? "No pages match your filter." : "No pages yet."}
            </p>
            <p className="mt-1 text-xs text-white/18">
              {query
                ? "Try a different keyword."
                : 'Click "New page" to start writing.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-0.5">
          {filtered.map((note) => {
            const preview = (note.content || "")
              .replace(/[#*_>`\[\]()]/g, " ")
              .replace(/\s+/g, " ")
              .trim()
              .slice(0, 120);
            const date = new Date(note.updatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });

            return (
              <button
                key={note.id}
                type="button"
                onClick={() =>
                  dispatch({ type: "SELECT_NOTE", payload: note.id })
                }
                className="group flex items-start gap-4 rounded-lg px-3 py-2.5 text-left transition hover:bg-white/[0.03]"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-medium text-white/80 group-hover:text-white/95">
                    {note.title || "Untitled"}
                  </p>
                  {preview && (
                    <p className="mt-0.5 text-[13px] leading-relaxed text-white/32 group-hover:text-white/40 line-clamp-1">
                      {preview}
                    </p>
                  )}
                </div>
                <span className="mt-0.5 shrink-0 text-[11px] text-white/22">
                  {date}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
