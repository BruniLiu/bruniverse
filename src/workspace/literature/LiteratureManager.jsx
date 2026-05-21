import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext";
import LiteratureCard from "./LiteratureCard";
import LiteratureDetail from "./LiteratureDetail";

export default function LiteratureManager() {
  const { state, dispatch } = useWorkspace();
  const [query, setQuery] = useState("");
  const selected = state.literature.find(
    (item) => item.id === state.selectedLiteratureId,
  );

  const filtered = state.literature.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.authors.some((a) => a.toLowerCase().includes(q)) ||
      item.tags.some((t) => t.toLowerCase().includes(q)) ||
      (item.abstract && item.abstract.toLowerCase().includes(q))
    );
  });

  return (
    <div className="mx-auto flex h-full max-w-5xl gap-6 px-4 py-6 sm:px-6">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/32"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search papers by title, author, or tag..."
              className="w-full rounded-lg border border-white/12 bg-white/[0.05] py-2.5 pl-9 pr-4 text-sm font-medium text-white outline-none transition placeholder:text-white/32 focus:border-indigo-200/40 focus:bg-white/[0.07]"
            />
          </div>
          <button
            type="button"
            onClick={() =>
              dispatch({ type: "OPEN_MODAL", payload: { modal: "addLiterature" } })
            }
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-white/14 bg-white/[0.06] px-4 py-2.5 text-sm font-bold text-white/72 transition hover:border-indigo-200/30 hover:bg-white/[0.09] hover:text-white"
          >
            <Plus size={16} />
            Add
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium text-white/46">
                {query ? "No papers match your search." : "No papers yet."}
              </p>
              <p className="mt-1 text-xs text-white/30">
                {query
                  ? "Try a different keyword."
                  : "Add your first research paper to get started."}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-3 min-h-0 overflow-y-auto sm:grid-cols-2">
            {filtered.map((item) => (
              <LiteratureCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="hidden w-80 shrink-0 xl:block">
          <LiteratureDetail item={selected} />
        </div>
      )}
    </div>
  );
}
