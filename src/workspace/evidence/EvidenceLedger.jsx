import React, { useMemo, useState } from "react";
import { Database, ExternalLink, Filter, Plus, Trash2 } from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext";
import { createActivityEntry, createEvidenceItem } from "../data/storage";

const fieldClass =
  "rounded-lg border border-white/[0.1] bg-white/[0.045] px-3 py-2 text-sm font-medium text-white outline-none transition placeholder:text-white/30 focus:border-sky-100/36 focus:bg-white/[0.07]";

const evidenceTypes = ["dataset", "source", "photo", "calculator", "note"];
const reliabilityOptions = ["institutional", "peer-reviewed", "primary evidence", "needs review"];

export default function EvidenceLedger() {
  const { state, dispatch } = useWorkspace();
  const [caseFilter, setCaseFilter] = useState(state.selectedCaseId || "all");
  const [draft, setDraft] = useState({
    type: "dataset",
    title: "",
    source: "",
    year: "",
    url: "",
    path: "",
    citation: "",
    reliability: "institutional",
    summary: "",
  });

  const visibleEvidence = useMemo(() => {
    if (caseFilter === "all") return state.evidence;
    return state.evidence.filter((item) => item.caseId === caseFilter);
  }, [caseFilter, state.evidence]);

  const selectedCase = state.cases.find((item) => item.id === caseFilter) || state.cases[0];

  function updateDraft(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function addEvidence(event) {
    event.preventDefault();
    const caseId = caseFilter === "all" ? selectedCase?.id : caseFilter;
    if (!caseId) return;

    const item = createEvidenceItem({ ...draft, caseId });
    dispatch({ type: "ADD_EVIDENCE", payload: item });
    dispatch({
      type: "ADD_ACTIVITY",
      payload: createActivityEntry({
        type: "added_evidence",
        description: `Added evidence "${item.title}"`,
        relatedId: item.id,
      }),
    });
    setDraft({
      type: "dataset",
      title: "",
      source: "",
      year: "",
      url: "",
      path: "",
      citation: "",
      reliability: "institutional",
      summary: "",
    });
  }

  function caseLabel(caseId) {
    const item = state.cases.find((researchCase) => researchCase.id === caseId);
    return item ? `${item.sdg} / ${item.country}` : "Unassigned";
  }

  return (
    <div className="mx-auto grid h-full max-w-7xl gap-5 overflow-y-auto px-5 py-6 sm:px-8 xl:grid-cols-[minmax(0,1fr)_360px]">
      <main className="min-w-0 rounded-lg border border-white/[0.08] bg-white/[0.035]">
        <div className="border-b border-white/[0.08] p-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-100/62">
                Evidence ledger
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white">Traceable research evidence</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/52">
                Keep datasets, citations, calculator screenshots, and primary action evidence connected to cases and claims.
              </p>
            </div>
            <label className="flex items-center gap-2 rounded-lg border border-white/[0.1] bg-black/18 px-3 py-2 text-sm text-white/58">
              <Filter size={15} />
              <select
                value={caseFilter}
                onChange={(event) => {
                  setCaseFilter(event.target.value);
                  if (event.target.value !== "all") {
                    dispatch({ type: "SELECT_CASE", payload: event.target.value });
                  }
                }}
                className="bg-transparent font-semibold text-white outline-none"
              >
                <option value="all" className="bg-[#080812]">All cases</option>
                {state.cases.map((item) => (
                  <option key={item.id} value={item.id} className="bg-[#080812]">
                    {item.sdg} / {item.country}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/[0.08] text-[11px] uppercase tracking-[0.13em] text-white/34">
                <th className="px-5 py-3 font-bold">Evidence</th>
                <th className="px-5 py-3 font-bold">Case</th>
                <th className="px-5 py-3 font-bold">Source</th>
                <th className="px-5 py-3 font-bold">Reliability</th>
                <th className="px-5 py-3 font-bold">Citation</th>
                <th className="px-5 py-3 font-bold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {visibleEvidence.map((item) => (
                <tr key={item.id} className="align-top transition hover:bg-white/[0.025]">
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-black/20">
                        <Database size={15} className="text-sky-100/62" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-white/[0.08] px-2 py-0.5 text-[10px] font-bold uppercase text-white/38">
                            {item.type}
                          </span>
                          {item.year && <span className="text-xs text-white/30">{item.year}</span>}
                        </div>
                        <p className="mt-1 text-sm font-semibold text-white/86">{item.title}</p>
                        <p className="mt-1 line-clamp-2 max-w-md text-xs leading-5 text-white/42">{item.summary}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-white/54">{caseLabel(item.caseId)}</td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-white/62">{item.source || "Unknown"}</p>
                    {(item.url || item.path) && (
                      <a
                        href={item.url || item.path}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-sky-100/60 hover:text-sky-100"
                      >
                        Open <ExternalLink size={12} />
                      </a>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full border border-white/[0.09] bg-white/[0.035] px-2.5 py-1 text-xs font-semibold text-white/52">
                      {item.reliability}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="line-clamp-3 max-w-xs text-xs leading-5 text-white/44">
                      {item.citation || "Citation needed"}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => dispatch({ type: "DELETE_EVIDENCE", payload: item.id })}
                      className="rounded-md p-2 text-white/30 transition hover:bg-red-400/[0.08] hover:text-red-200"
                      aria-label={`Delete ${item.title}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <aside className="grid content-start gap-4">
        <form onSubmit={addEvidence} className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-4">
          <div className="mb-4 flex items-center gap-2">
            <Plus size={15} className="text-white/44" />
            <h2 className="text-sm font-semibold text-white/78">Add evidence</h2>
          </div>

          <div className="grid gap-2">
            <select className={fieldClass} value={caseFilter === "all" ? selectedCase?.id || "" : caseFilter} onChange={(e) => setCaseFilter(e.target.value)}>
              {state.cases.map((item) => (
                <option key={item.id} value={item.id} className="bg-[#080812]">
                  {item.sdg} / {item.country}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <select className={fieldClass} value={draft.type} onChange={(e) => updateDraft("type", e.target.value)}>
                {evidenceTypes.map((type) => (
                  <option key={type} value={type} className="bg-[#080812]">{type}</option>
                ))}
              </select>
              <input className={fieldClass} value={draft.year} onChange={(e) => updateDraft("year", e.target.value)} placeholder="Year" />
            </div>
            <input className={fieldClass} value={draft.title} onChange={(e) => updateDraft("title", e.target.value)} placeholder="Evidence title" required />
            <input className={fieldClass} value={draft.source} onChange={(e) => updateDraft("source", e.target.value)} placeholder="Institution / author" />
            <select className={fieldClass} value={draft.reliability} onChange={(e) => updateDraft("reliability", e.target.value)}>
              {reliabilityOptions.map((option) => (
                <option key={option} value={option} className="bg-[#080812]">{option}</option>
              ))}
            </select>
            <input className={fieldClass} value={draft.url} onChange={(e) => updateDraft("url", e.target.value)} placeholder="URL" />
            <input className={fieldClass} value={draft.path} onChange={(e) => updateDraft("path", e.target.value)} placeholder="Local image path" />
            <textarea className={fieldClass} rows={3} value={draft.summary} onChange={(e) => updateDraft("summary", e.target.value)} placeholder="Why this evidence matters" />
            <textarea className={fieldClass} rows={3} value={draft.citation} onChange={(e) => updateDraft("citation", e.target.value)} placeholder="APA reference or caption" />
            <button type="submit" className="mt-1 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-black transition hover:bg-sky-100">
              Save evidence
            </button>
          </div>
        </form>

        <section className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/34">
            Evidence health
          </p>
          <div className="mt-4 grid gap-3">
            <Health label="Institutional or peer-reviewed" value={state.evidence.filter((item) => ["institutional", "peer-reviewed"].includes(item.reliability)).length} total={state.evidence.length} />
            <Health label="With APA citation" value={state.evidence.filter((item) => item.citation?.trim()).length} total={state.evidence.length} />
            <Health label="Linked to active case" value={state.evidence.filter((item) => item.caseId === state.selectedCaseId).length} total={state.evidence.length} />
          </div>
        </section>
      </aside>
    </div>
  );
}

function Health({ label, value, total }) {
  const percent = total ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3 text-xs font-semibold">
        <span className="text-white/48">{label}</span>
        <span className="text-white/66">{percent}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
        <div className="h-full rounded-full bg-sky-100 transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
