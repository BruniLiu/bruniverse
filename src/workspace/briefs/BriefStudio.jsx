import React, { useMemo } from "react";
import { ClipboardCheck, FileText, Wand2 } from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext";
import { createActivityEntry, createBriefItem } from "../data/storage";

const textareaClass =
  "min-h-36 w-full resize-y rounded-lg border border-white/[0.1] bg-white/[0.045] px-4 py-3 text-sm leading-6 text-white/72 outline-none transition placeholder:text-white/28 focus:border-sky-100/36 focus:bg-white/[0.07]";

export default function BriefStudio() {
  const { state, dispatch } = useWorkspace();
  const selectedBrief =
    state.briefs.find((item) => item.id === state.selectedBriefId) || state.briefs[0];
  const selectedCase = state.cases.find((item) => item.id === selectedBrief?.caseId) || state.cases[0];

  const caseEvidence = useMemo(
    () => state.evidence.filter((item) => item.caseId === selectedCase?.id),
    [state.evidence, selectedCase?.id],
  );
  const caseClaims = useMemo(
    () => state.claims.filter((item) => item.caseId === selectedCase?.id),
    [state.claims, selectedCase?.id],
  );

  function updateBrief(updates) {
    if (!selectedBrief) return;
    dispatch({ type: "UPDATE_BRIEF", payload: { id: selectedBrief.id, updates } });
  }

  function updateSection(section, value) {
    updateBrief({
      sections: {
        ...selectedBrief.sections,
        [section]: value,
      },
    });
  }

  function createBriefForActiveCase() {
    const researchCase = state.cases.find((item) => item.id === state.selectedCaseId) || state.cases[0];
    if (!researchCase) return;

    const brief = createBriefItem({
      caseId: researchCase.id,
      title: `${researchCase.sdg} ${researchCase.country} Research Brief`,
    });
    dispatch({ type: "ADD_BRIEF", payload: brief });
    dispatch({
      type: "ADD_ACTIVITY",
      payload: createActivityEntry({
        type: "created_brief",
        description: `Created brief for ${researchCase.sdg}`,
        relatedId: brief.id,
      }),
    });
  }

  function composeFromEvidence() {
    if (!selectedBrief || !selectedCase) return;
    const adverseClaims = caseClaims.filter((claim) => claim.type === "adverse");
    const responseClaims = caseClaims.filter((claim) => claim.type === "response");
    const evidenceList = caseEvidence
      .map((item) => `- ${item.title} (${item.source || "source needed"}, ${item.year || "n.d."}): ${item.summary || item.citation || "Add summary."}`)
      .join("\n");

    updateBrief({
      status: "draft",
      citationStatus: caseEvidence.every((item) => item.citation?.trim())
        ? "citation-ready"
        : "needs review",
      sections: {
        problem: `${selectedCase.sdg}: ${selectedCase.title}\n\nCountry focus: ${selectedCase.country}\n\nResearch question: ${selectedCase.researchQuestion}\n\nAdverse-impact claims:\n${adverseClaims.map((claim) => `- ${claim.text}`).join("\n") || "- Add the central adverse-impact claim."}`,
        evidence: `Evidence trail:\n${evidenceList || "- Add at least one institutional source and one action/primary evidence item."}`,
        response: `Prosperity pathway:\n${responseClaims.map((claim) => `- ${claim.text}`).join("\n") || "- Add a concrete response claim with stakeholders, implementation steps, and expected impact."}`,
      },
    });
  }

  const supportedClaims = caseClaims.filter((claim) => claim.evidenceIds.length > 0).length;
  const citationReady = caseEvidence.filter((item) => item.citation?.trim()).length;

  return (
    <div className="mx-auto grid h-full max-w-7xl gap-5 overflow-y-auto px-5 py-6 sm:px-8 xl:grid-cols-[300px_minmax(0,1fr)_300px]">
      <aside className="grid content-start gap-4">
        <section className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-sky-100/56">
                Brief studio
              </p>
              <h2 className="mt-2 text-xl font-semibold text-white">Research briefs</h2>
            </div>
            <button
              type="button"
              onClick={createBriefForActiveCase}
              className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-black transition hover:bg-sky-100"
            >
              New
            </button>
          </div>

          <div className="mt-4 grid gap-2">
            {state.briefs.map((brief) => {
              const researchCase = state.cases.find((item) => item.id === brief.caseId);
              return (
                <button
                  key={brief.id}
                  type="button"
                  onClick={() => {
                    dispatch({ type: "SELECT_BRIEF", payload: brief.id });
                    if (researchCase) dispatch({ type: "SELECT_CASE", payload: researchCase.id });
                  }}
                  className={`rounded-lg border px-3 py-3 text-left transition ${
                    selectedBrief?.id === brief.id
                      ? "border-sky-100/24 bg-sky-100/[0.07]"
                      : "border-white/[0.06] bg-black/16 hover:border-white/[0.14] hover:bg-white/[0.045]"
                  }`}
                >
                  <p className="line-clamp-2 text-sm font-semibold text-white/82">{brief.title}</p>
                  <p className="mt-2 text-xs text-white/34">{researchCase?.sdg || "SDG"} / {brief.status}</p>
                </button>
              );
            })}
          </div>
        </section>
      </aside>

      <main className="min-w-0 rounded-lg border border-white/[0.08] bg-white/[0.035]">
        {selectedBrief && selectedCase ? (
          <>
            <div className="border-b border-white/[0.08] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-100/62">
                Publication-ready output
              </p>
              <input
                value={selectedBrief.title}
                onChange={(e) => updateBrief({ title: e.target.value })}
                className="mt-2 w-full bg-transparent text-3xl font-semibold text-white outline-none"
              />
              <p className="mt-2 text-sm leading-6 text-white/52">
                {selectedCase.sdg} / {selectedCase.country} / {selectedCase.owner}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={composeFromEvidence}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-black transition hover:bg-sky-100"
                >
                  <Wand2 size={16} />
                  Compose from evidence
                </button>
                <select
                  value={selectedBrief.status}
                  onChange={(e) => updateBrief({ status: e.target.value })}
                  className="rounded-lg border border-white/[0.12] bg-black/18 px-3 py-2.5 text-sm font-semibold text-white/62 outline-none"
                >
                  {["draft", "review", "publication-ready"].map((status) => (
                    <option key={status} value={status} className="bg-[#080812]">{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-5 p-5">
              <BriefSection
                title="Problem and country context"
                value={selectedBrief.sections?.problem || ""}
                onChange={(value) => updateSection("problem", value)}
                placeholder="Define the SDG, country case, root causes, mechanisms, and affected communities."
              />
              <BriefSection
                title="Evidence trail"
                value={selectedBrief.sections?.evidence || ""}
                onChange={(value) => updateSection("evidence", value)}
                placeholder="List dated indicators, institutional sources, peer-reviewed evidence, action photos, and calculator results."
              />
              <BriefSection
                title="Prosperity response"
                value={selectedBrief.sections?.response || ""}
                onChange={(value) => updateSection("response", value)}
                placeholder="Explain stakeholders, implementation steps, expected impact, and how adversity turns into prosperity."
              />
            </div>
          </>
        ) : (
          <div className="grid min-h-[60vh] place-items-center text-center">
            <p className="text-sm text-white/42">Create a case and brief to start writing.</p>
          </div>
        )}
      </main>

      <aside className="grid content-start gap-4">
        <section className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-4">
          <div className="mb-4 flex items-center gap-2">
            <ClipboardCheck size={15} className="text-white/40" />
            <h2 className="text-sm font-semibold text-white/78">Research integrity</h2>
          </div>
          <div className="grid gap-3">
            <Score label="Evidence coverage" value={caseEvidence.length} total={Math.max(caseClaims.length, 1)} />
            <Score label="Claim support" value={supportedClaims} total={Math.max(caseClaims.length, 1)} />
            <Score label="Citation health" value={citationReady} total={Math.max(caseEvidence.length, 1)} />
          </div>
        </section>

        <section className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-4">
          <div className="mb-3 flex items-center gap-2">
            <FileText size={15} className="text-white/40" />
            <h2 className="text-sm font-semibold text-white/78">Evidence to mention</h2>
          </div>
          <div className="grid gap-2">
            {caseEvidence.slice(0, 5).map((item) => (
              <div key={item.id} className="rounded-lg border border-white/[0.06] bg-black/16 p-3">
                <p className="text-sm font-semibold text-white/74">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-white/38">{item.source || "Source needed"} / {item.year || "n.d."}</p>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}

function BriefSection({ title, value, onChange, placeholder }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/38">{title}</span>
      <textarea
        className={textareaClass}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function Score({ label, value, total }) {
  const percent = Math.min(100, Math.round((value / total) * 100));

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
