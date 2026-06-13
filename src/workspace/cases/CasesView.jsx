import React, { useMemo, useState } from "react";
import { FileText, Plus, ShieldCheck, Target } from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext";
import {
  createActivityEntry,
  createBriefItem,
  createClaimItem,
  createResearchCaseItem,
} from "../data/storage";

const inputClass =
  "w-full rounded-lg border border-white/[0.1] bg-white/[0.045] px-3 py-2 text-sm font-medium text-white outline-none transition placeholder:text-white/30 focus:border-sky-100/36 focus:bg-white/[0.07]";

const statusOptions = ["active", "drafting", "review", "published"];

export default function CasesView() {
  const { state, dispatch } = useWorkspace();
  const [draft, setDraft] = useState({
    sdg: "",
    title: "",
    country: "",
    owner: "",
    focus: "",
    researchQuestion: "",
  });
  const [claimDraft, setClaimDraft] = useState("");

  const selectedCase =
    state.cases.find((item) => item.id === state.selectedCaseId) || state.cases[0];

  const caseEvidence = useMemo(
    () => state.evidence.filter((item) => item.caseId === selectedCase?.id),
    [state.evidence, selectedCase?.id],
  );
  const caseClaims = useMemo(
    () => state.claims.filter((item) => item.caseId === selectedCase?.id),
    [state.claims, selectedCase?.id],
  );

  function updateDraft(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function createCase(event) {
    event.preventDefault();
    const item = createResearchCaseItem({
      ...draft,
      sdg: draft.sdg || "SDG",
      title: draft.title || "Untitled SDG case",
      country: draft.country || "Global",
      owner: draft.owner || "Researcher",
      status: "drafting",
    });
    const brief = createBriefItem({
      caseId: item.id,
      title: `${item.sdg} ${item.country} Research Brief`,
    });

    dispatch({ type: "ADD_CASE", payload: item });
    dispatch({ type: "ADD_BRIEF", payload: brief });
    dispatch({
      type: "ADD_ACTIVITY",
      payload: createActivityEntry({
        type: "created_case",
        description: `Created ${item.sdg} case for ${item.country}`,
        relatedId: item.id,
      }),
    });
    setDraft({ sdg: "", title: "", country: "", owner: "", focus: "", researchQuestion: "" });
  }

  function updateSelectedCase(updates) {
    if (!selectedCase) return;
    dispatch({ type: "UPDATE_CASE", payload: { id: selectedCase.id, updates } });
  }

  function addClaim(event) {
    event.preventDefault();
    if (!selectedCase || !claimDraft.trim()) return;
    const claim = createClaimItem({
      caseId: selectedCase.id,
      type: "adverse",
      text: claimDraft.trim(),
      evidenceIds: [],
    });
    dispatch({ type: "ADD_CLAIM", payload: claim });
    setClaimDraft("");
  }

  return (
    <div className="mx-auto grid h-full max-w-7xl gap-5 overflow-y-auto px-5 py-6 sm:px-8 xl:grid-cols-[340px_minmax(0,1fr)]">
      <aside className="grid content-start gap-4">
        <section className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-sky-100/56">
                Case library
              </p>
              <h2 className="mt-2 text-xl font-semibold text-white">Research cases</h2>
            </div>
            <span className="rounded-full border border-white/[0.1] px-2.5 py-1 text-xs font-semibold text-white/50">
              {state.cases.length}
            </span>
          </div>

          <div className="mt-4 grid gap-2">
            {state.cases.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => dispatch({ type: "SELECT_CASE", payload: item.id })}
                className={`rounded-lg border px-3 py-3 text-left transition ${
                  selectedCase?.id === item.id
                    ? "border-sky-100/24 bg-sky-100/[0.07]"
                    : "border-white/[0.06] bg-black/16 hover:border-white/[0.14] hover:bg-white/[0.045]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-white/86">{item.sdg}</p>
                  <span className="rounded-full border border-white/[0.09] px-2 py-0.5 text-[10px] font-bold uppercase text-white/38">
                    {item.status}
                  </span>
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-white/54">{item.title}</p>
                <p className="mt-2 text-xs text-white/34">{item.country} / {item.owner}</p>
              </button>
            ))}
          </div>
        </section>

        <form onSubmit={createCase} className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-4">
          <div className="mb-4 flex items-center gap-2">
            <Plus size={15} className="text-white/44" />
            <h3 className="text-sm font-semibold text-white/78">New SDG case</h3>
          </div>
          <div className="grid gap-2">
            <input className={inputClass} value={draft.sdg} onChange={(e) => updateDraft("sdg", e.target.value)} placeholder="SDG 11" />
            <input className={inputClass} value={draft.title} onChange={(e) => updateDraft("title", e.target.value)} placeholder="Official SDG title" />
            <div className="grid grid-cols-2 gap-2">
              <input className={inputClass} value={draft.country} onChange={(e) => updateDraft("country", e.target.value)} placeholder="Country" />
              <input className={inputClass} value={draft.owner} onChange={(e) => updateDraft("owner", e.target.value)} placeholder="Owner" />
            </div>
            <textarea className={inputClass} rows={2} value={draft.focus} onChange={(e) => updateDraft("focus", e.target.value)} placeholder="Case focus" />
            <textarea className={inputClass} rows={3} value={draft.researchQuestion} onChange={(e) => updateDraft("researchQuestion", e.target.value)} placeholder="Research question" />
            <button type="submit" className="mt-1 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-black transition hover:bg-sky-100">
              Create case
            </button>
          </div>
        </form>
      </aside>

      <main className="min-w-0">
        {selectedCase ? (
          <div className="grid gap-5">
            <section className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-5">
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-100/62">
                    Active case
                  </p>
                  <input
                    value={selectedCase.title}
                    onChange={(e) => updateSelectedCase({ title: e.target.value })}
                    className="mt-3 w-full bg-transparent text-3xl font-semibold leading-tight text-white outline-none sm:text-4xl"
                  />
                  <textarea
                    value={selectedCase.researchQuestion}
                    onChange={(e) => updateSelectedCase({ researchQuestion: e.target.value })}
                    rows={3}
                    className="mt-4 w-full resize-none rounded-lg border border-white/[0.08] bg-black/18 px-4 py-3 text-sm leading-6 text-white/62 outline-none focus:border-sky-100/28"
                  />
                </div>
                <div className="grid content-start gap-3">
                  <Metric icon={Target} label="Evidence items" value={caseEvidence.length} />
                  <Metric icon={ShieldCheck} label="Supported claims" value={caseClaims.filter((claim) => claim.evidenceIds.length > 0).length} />
                  <Metric icon={FileText} label="Claims total" value={caseClaims.length} />
                </div>
              </div>

              <div className="mt-5 grid gap-3 border-t border-white/[0.07] pt-5 md:grid-cols-2">
                <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/34">
                  SDG
                  <input className={inputClass} value={selectedCase.sdg} onChange={(e) => updateSelectedCase({ sdg: e.target.value })} />
                </label>
                <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/34">
                  Country
                  <input className={inputClass} value={selectedCase.country} onChange={(e) => updateSelectedCase({ country: e.target.value })} />
                </label>
                <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/34">
                  Owner
                  <input className={inputClass} value={selectedCase.owner} onChange={(e) => updateSelectedCase({ owner: e.target.value })} />
                </label>
                <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/34">
                  Status
                  <select className={inputClass} value={selectedCase.status} onChange={(e) => updateSelectedCase({ status: e.target.value })}>
                    {statusOptions.map((status) => (
                      <option key={status} value={status} className="bg-[#080812]">
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </section>

            <section className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/34">
                    Claim map
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-white">Evidence-backed arguments</h3>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "SET_ACTIVE_VIEW", payload: "evidence" })}
                  className="rounded-lg border border-white/[0.12] px-3 py-2 text-xs font-semibold text-white/58 transition hover:border-white/22 hover:text-white"
                >
                  Open evidence ledger
                </button>
              </div>

              <div className="mt-4 grid gap-3">
                {caseClaims.map((claim) => (
                  <article key={claim.id} className="rounded-lg border border-white/[0.07] bg-black/18 p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="rounded-full border border-white/[0.09] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/38">
                        {claim.type}
                      </span>
                      <span className="text-xs font-semibold text-white/34">
                        {claim.evidenceIds.length} evidence link{claim.evidenceIds.length === 1 ? "" : "s"}
                      </span>
                    </div>
                    <textarea
                      value={claim.text}
                      onChange={(e) =>
                        dispatch({ type: "UPDATE_CLAIM", payload: { id: claim.id, updates: { text: e.target.value } } })
                      }
                      rows={2}
                      className="w-full resize-none bg-transparent text-sm leading-6 text-white/68 outline-none"
                    />
                  </article>
                ))}
              </div>

              <form onSubmit={addClaim} className="mt-4 flex flex-col gap-2 sm:flex-row">
                <input
                  className={inputClass}
                  value={claimDraft}
                  onChange={(e) => setClaimDraft(e.target.value)}
                  placeholder="Add a new claim that needs evidence..."
                />
                <button type="submit" className="shrink-0 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-black transition hover:bg-sky-100">
                  Add claim
                </button>
              </form>
            </section>
          </div>
        ) : (
          <div className="grid min-h-[60vh] place-items-center rounded-lg border border-white/[0.08] bg-white/[0.035] text-center">
            <p className="text-sm text-white/42">Create a case to start the workspace.</p>
          </div>
        )}
      </main>
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-black/18 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/34">{label}</p>
        <Icon size={16} className="text-white/36" />
      </div>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}
