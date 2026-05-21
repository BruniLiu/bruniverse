import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BookOpen, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext";
import { createActivityEntry } from "../data/storage";

export default function NoteEditor({ note }) {
  const { state, dispatch } = useWorkspace();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [showMenu, setShowMenu] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note.id]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
    dispatch({
      type: "UPDATE_NOTE",
      payload: { id: note.id, updates: { title: e.target.value } },
    });
  }

  function handleContentChange(e) {
    setContent(e.target.value);
    dispatch({
      type: "UPDATE_NOTE",
      payload: { id: note.id, updates: { content: e.target.value } },
    });
  }

  function handleDelete() {
    dispatch({ type: "DELETE_NOTE", payload: note.id });
    dispatch({
      type: "ADD_ACTIVITY",
      payload: createActivityEntry({
        type: "deleted_note",
        description: `Deleted "${note.title || "Untitled"}"`,
      }),
    });
  }

  function handleAddPaper() {
    dispatch({ type: "OPEN_MODAL", payload: { modal: "noteLinkPicker", meta: { noteLinkPickerNoteId: note.id } } });
  }

  const linkedPapers = (note.linkedLiteratureIds || [])
    .map((id) => state.literature.find((l) => l.id === id))
    .filter(Boolean);

  const updatedDate = new Date(note.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col py-8">
      {/* Top bar: breadcrumb + meta */}
      <div className="mb-1 flex items-center gap-2 text-xs text-white/28">
        <button
          type="button"
          onClick={() => dispatch({ type: "SELECT_NOTE", payload: null })}
          className="transition hover:text-white/55"
        >
          Notes
        </button>
        <span>/</span>
        <span className="text-white/40">Edited {updatedDate}</span>
      </div>

      {/* Linked papers - shown as subtle backlinks */}
      {linkedPapers.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-white/25">
            Linked papers
          </span>
          {linkedPapers.map((paper) => (
            <button
              key={paper.id}
              type="button"
              onClick={() => {
                dispatch({ type: "SELECT_LITERATURE", payload: paper.id });
                dispatch({ type: "SET_ACTIVE_VIEW", payload: "literature" });
              }}
              className="inline-flex items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 text-[11px] text-white/50 transition hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-white/80"
            >
              <BookOpen size={10} />
              {paper.title.slice(0, 45)}
            </button>
          ))}
        </div>
      )}

      {/* Title area - Notion style: big, clean */}
      <textarea
        ref={titleRef}
        value={title}
        onChange={handleTitleChange}
        placeholder="Untitled"
        rows={1}
        className="w-full resize-none bg-transparent text-4xl font-bold leading-tight text-white/92 outline-none placeholder:text-white/14 sm:text-5xl"
        style={{ fontFamily: "var(--font-display), Inter, sans-serif" }}
      />

      {/* Toolbar row - subtle, below title */}
      <div className="mt-4 flex items-center gap-1 border-b border-white/[0.06] pb-3">
        <button
          type="button"
          onClick={handleAddPaper}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-white/35 transition hover:bg-white/[0.04] hover:text-white/65"
        >
          <Plus size={13} />
          Link paper
        </button>

        <div className="relative ml-auto">
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="rounded-md p-1 text-white/25 transition hover:bg-white/[0.04] hover:text-white/55"
          >
            <MoreHorizontal size={15} />
          </button>
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-full z-20 mt-1 w-40 rounded-lg border border-white/[0.08] bg-[#1a1a2e] py-1 shadow-[0_16px_48px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                <button
                  type="button"
                  onClick={() => {
                    handleDelete();
                    setShowMenu(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-red-300/80 transition hover:bg-white/[0.04]"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content area - clean, spacious */}
      <div className="mt-5 flex-1">
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder={`Type '/' for commands, or just start writing...\n\n## Research notes\n\nYour ideas, observations, and findings go here.\n\n- Use **bold** for emphasis\n- Create lists for key points\n- Link papers from the toolbar above`}
          className="h-full min-h-[320px] w-full resize-none bg-transparent text-base leading-[1.8] text-white/72 outline-none placeholder:text-white/16"
        />
      </div>

      {/* Bottom status bar */}
      <div className="mt-4 border-t border-white/[0.05] pt-3 text-[11px] text-white/20">
        {content.length} characters &middot; Markdown supported &middot;{" "}
        {linkedPapers.length} linked paper{linkedPapers.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
