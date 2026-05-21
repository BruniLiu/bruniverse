import React from "react";
import { X } from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext";
import RelationshipBadge from "../literature/RelationshipBadge";

export default function GraphDetailPanel() {
  const { state, dispatch } = useWorkspace();
  const nodeId = state.graphSelectedNodeId;
  const item = nodeId
    ? state.literature.find((l) => l.id === nodeId)
    : null;

  if (!item) return null;

  return (
    <div className="absolute right-3 top-3 z-10 w-72 rounded-xl border border-indigo-200/18 bg-[#0a0a1c]/94 p-4 shadow-[0_28px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-sm font-bold leading-snug text-white">
          {item.title || "Untitled"}
        </h3>
        <button
          type="button"
          onClick={() =>
            dispatch({ type: "SET_GRAPH_SELECTED_NODE", payload: null })
          }
          className="shrink-0 rounded-md p-0.5 text-white/38 transition hover:bg-white/[0.06] hover:text-white"
        >
          <X size={15} />
        </button>
      </div>

      {item.authors.length > 0 && (
        <p className="text-xs font-medium text-white/54">
          {item.authors.slice(0, 2).join(", ")}
          {item.authors.length > 2 ? " et al." : ""}
          {item.year ? ` (${item.year})` : ""}
        </p>
      )}

      {item.abstract && (
        <p className="mt-2 text-xs leading-5 text-white/46 line-clamp-3">
          {item.abstract}
        </p>
      )}

      {item.relationships.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.relationships.map((rel, i) => (
            <RelationshipBadge key={i} type={rel.type} />
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          dispatch({ type: "SELECT_LITERATURE", payload: item.id });
          dispatch({ type: "SET_ACTIVE_VIEW", payload: "literature" });
        }}
        className="mt-3 w-full rounded-lg border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-bold text-white/66 transition hover:border-indigo-200/28 hover:bg-white/[0.07] hover:text-white"
      >
        View Details
      </button>
    </div>
  );
}
