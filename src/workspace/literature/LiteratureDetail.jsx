import React from "react";
import { ExternalLink, Sparkles, Trash2 } from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext";
import { createActivityEntry } from "../data/storage";

export default function LiteratureDetail({ item }) {
  const { state, dispatch } = useWorkspace();

  function handleDelete() {
    dispatch({ type: "DELETE_LITERATURE", payload: item.id });
    dispatch({ type: "SELECT_LITERATURE", payload: null });
    dispatch({
      type: "ADD_ACTIVITY",
      payload: createActivityEntry({
        type: "deleted_literature",
        description: `Removed "${item.title.slice(0, 80)}"`,
      }),
    });
  }

  function handleAnalyze() {
    dispatch({ type: "SET_ACTIVE_VIEW", payload: "graph" });
  }

  return (
    <div className="rounded-lg border border-indigo-200/18 bg-white/[0.05] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur">
      <div className="mb-4 flex items-start justify-between gap-2">
        <h2 className="text-lg font-bold leading-snug text-white">
          {item.title || "Untitled Paper"}
        </h2>
        <button
          type="button"
          onClick={handleDelete}
          className="shrink-0 rounded-md p-1 text-white/32 transition hover:bg-red-500/[0.12] hover:text-red-300/70"
          title="Delete"
        >
          <Trash2 size={15} />
        </button>
      </div>

      {item.authors.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/36">
            Authors
          </p>
          <p className="mt-1 text-sm font-medium text-white/68">
            {item.authors.join(", ")}
          </p>
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-3">
        {item.year && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/36">
              Year
            </p>
            <p className="text-sm font-medium text-white/68">{item.year}</p>
          </div>
        )}
        {item.doi && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/36">
              DOI
            </p>
            <a
              href={`https://doi.org/${item.doi}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-indigo-100/70 transition hover:text-indigo-100"
            >
              {item.doi}
              <ExternalLink size={12} />
            </a>
          </div>
        )}
      </div>

      {item.abstract && (
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/36">
            Abstract
          </p>
          <p className="mt-1 text-sm leading-6 text-white/58">{item.abstract}</p>
        </div>
      )}

      {item.tags.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/36">
            Tags
          </p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-indigo-200/14 bg-indigo-200/[0.05] px-2 py-0.5 text-[10px] font-bold text-indigo-100/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {item.relationships.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/36">
            Relationships ({item.relationships.length})
          </p>
          <div className="mt-1 grid gap-1">
            {item.relationships.map((rel) => {
              const target = state.literature.find((l) => l.id === rel.targetId);
              return (
                <div
                  key={rel.targetId}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-xs"
                >
                  <span className="font-bold text-indigo-100/80">{rel.type}</span>
                  <span className="text-white/50">
                    {" "}
                    — {target ? target.title.slice(0, 60) : "Unknown paper"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleAnalyze}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-200/18 bg-indigo-200/[0.06] px-4 py-2.5 text-sm font-bold text-indigo-100/80 transition hover:bg-indigo-200/[0.1] hover:text-indigo-100"
      >
        <Sparkles size={15} />
        View in Graph
      </button>
    </div>
  );
}
