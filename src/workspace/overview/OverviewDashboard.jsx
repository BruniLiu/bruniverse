import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Database,
  FileText,
  GitBranch,
  MessageSquare,
  Plus,
  ShieldCheck,
  Target,
} from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext";

const motionEase = [0.23, 1, 0.32, 1];

function fadeUp(shouldReduceMotion, delay = 0) {
  return {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.1 : 0.42, ease: motionEase, delay },
    },
  };
}

function getPercent(value, total) {
  if (!total) return 0;
  return Math.min(100, Math.round((value / total) * 100));
}

export default function OverviewDashboard() {
  const { state, dispatch } = useWorkspace();
  const shouldReduceMotion = useReducedMotion();

  const activeCase =
    state.cases.find((item) => item.id === state.selectedCaseId) || state.cases[0];
  const caseEvidence = useMemo(
    () => state.evidence.filter((item) => item.caseId === activeCase?.id),
    [state.evidence, activeCase?.id],
  );
  const caseClaims = useMemo(
    () => state.claims.filter((item) => item.caseId === activeCase?.id),
    [state.claims, activeCase?.id],
  );
  const activeBrief =
    state.briefs.find((item) => item.caseId === activeCase?.id) || state.briefs[0];

  const supportedClaims = caseClaims.filter((claim) => claim.evidenceIds.length > 0).length;
  const citationReady = caseEvidence.filter((item) => item.citation?.trim()).length;
  const briefSections = activeBrief?.sections || {};
  const filledBriefSections = ["problem", "evidence", "response"].filter(
    (key) => briefSections[key]?.trim(),
  ).length;

  const cockpitScores = [
    {
      label: "Evidence coverage",
      value: getPercent(caseEvidence.length, Math.max(caseClaims.length, 4)),
      detail: `${caseEvidence.length} evidence items linked to active case`,
    },
    {
      label: "Claim readiness",
      value: getPercent(supportedClaims, Math.max(caseClaims.length, 1)),
      detail: `${supportedClaims}/${caseClaims.length || 0} claims have evidence`,
    },
    {
      label: "Citation health",
      value: getPercent(citationReady, Math.max(caseEvidence.length, 1)),
      detail: `${citationReady}/${caseEvidence.length || 0} evidence items include citations`,
    },
    {
      label: "Brief progress",
      value: getPercent(filledBriefSections, 3),
      detail: `${filledBriefSections}/3 brief sections drafted`,
    },
  ];

  function askResearchAI(prompt) {
    sessionStorage.setItem("bruniverse-pending-question", prompt);
    dispatch({ type: "SET_ACTIVE_VIEW", payload: "chat" });
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        className="grid gap-6"
      >
        <motion.header
          variants={fadeUp(shouldReduceMotion)}
          className="grid gap-5 border-b border-white/[0.08] pb-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              Bruniverse SDG Intelligence Hub
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Turn SDG cases into evidence-ready briefs.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/58">
              A focused research cockpit for building country cases, tracing evidence, checking claims, and preparing publication-ready SDG briefs.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <button
              type="button"
              onClick={() => dispatch({ type: "SET_ACTIVE_VIEW", payload: "cases" })}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-sky-100"
            >
              <Plus size={16} />
              Open cases
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "OPEN_MODAL", payload: { modal: "addLiterature" } })}
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.14] bg-white/[0.045] px-4 py-2.5 text-sm font-semibold text-white/72 transition hover:border-white/24 hover:bg-white/[0.075]"
            >
              <BookOpen size={16} />
              Add source
            </button>
          </div>
        </motion.header>

        <motion.div variants={fadeUp(shouldReduceMotion)} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Metric icon={Target} label="Cases" value={state.cases.length} detail="Active SDG country research files" />
          <Metric icon={Database} label="Evidence" value={state.evidence.length} detail="Datasets, photos, calculators, notes" />
          <Metric icon={GitBranch} label="Claims" value={state.claims.length} detail="Arguments mapped to evidence" />
          <Metric icon={FileText} label="Briefs" value={state.briefs.length} detail="Draft or review outputs" />
        </motion.div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.75fr)]">
          <motion.section variants={fadeUp(shouldReduceMotion)} className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-5">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-sky-100/16 bg-sky-100/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-sky-100/72">
                    Active case
                  </span>
                  <span className="text-xs font-semibold text-white/34">{activeCase?.status || "draft"}</span>
                </div>
                <h2 className="mt-4 text-3xl font-semibold leading-tight text-white">
                  {activeCase ? `${activeCase.sdg}: ${activeCase.title}` : "No active case yet"}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/56">
                  {activeCase?.researchQuestion || "Create a case to start collecting evidence and building a brief."}
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <Mini label="Country" value={activeCase?.country || "Global"} />
                  <Mini label="Owner" value={activeCase?.owner || "Researcher"} />
                  <Mini label="Focus" value={activeCase?.focus || "SDG research"} />
                </div>
              </div>

              <div className="rounded-lg border border-white/[0.08] bg-black/20 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/34">
                  Suggested next actions
                </p>
                <div className="mt-4 grid gap-2">
                  <ActionButton
                    icon={Database}
                    label="Add or review evidence"
                    onClick={() => dispatch({ type: "SET_ACTIVE_VIEW", payload: "evidence" })}
                  />
                  <ActionButton
                    icon={FileText}
                    label="Draft research brief"
                    onClick={() => dispatch({ type: "SET_ACTIVE_VIEW", payload: "briefs" })}
                  />
                  <ActionButton
                    icon={MessageSquare}
                    label="Ask AI to audit this case"
                    onClick={() =>
                      askResearchAI("Audit the active SDG case. Identify unsupported claims, weak citations, and the next evidence I should collect.")
                    }
                  />
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section variants={fadeUp(shouldReduceMotion)} className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-5">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck size={16} className="text-white/42" />
              <h2 className="text-sm font-semibold text-white/78">Research integrity</h2>
            </div>
            <div className="grid gap-4">
              {cockpitScores.map((score) => (
                <Progress key={score.label} {...score} />
              ))}
            </div>
          </motion.section>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <motion.section variants={fadeUp(shouldReduceMotion)} className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/34">Case portfolio</p>
                <h2 className="mt-1 text-xl font-semibold text-white">Sample workspace cases</h2>
              </div>
              <button
                type="button"
                onClick={() => dispatch({ type: "SET_ACTIVE_VIEW", payload: "cases" })}
                className="inline-flex items-center gap-1 rounded-md border border-white/[0.12] px-3 py-2 text-xs font-semibold text-white/52 transition hover:border-white/22 hover:text-white"
              >
                Manage <ArrowRight size={13} />
              </button>
            </div>

            <div className="mt-4 grid gap-3">
              {state.cases.slice(0, 5).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    dispatch({ type: "SELECT_CASE", payload: item.id });
                    dispatch({ type: "SET_ACTIVE_VIEW", payload: "cases" });
                  }}
                  className="grid gap-3 rounded-lg border border-white/[0.07] bg-black/16 p-4 text-left transition hover:border-white/[0.16] hover:bg-white/[0.045] sm:grid-cols-[120px_minmax(0,1fr)_80px] sm:items-center"
                >
                  <div>
                    <p className="text-sm font-semibold text-white/86">{item.sdg}</p>
                    <p className="mt-1 text-xs text-white/34">{item.country}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="line-clamp-1 text-sm font-semibold text-white/72">{item.title}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-white/38">{item.focus}</p>
                  </div>
                  <p className="text-right text-sm font-semibold tabular-nums text-white/52">{item.progress || 0}%</p>
                </button>
              ))}
            </div>
          </motion.section>

          <motion.section variants={fadeUp(shouldReduceMotion)} className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/34">Brief pipeline</p>
                <h2 className="mt-1 text-xl font-semibold text-white">From claims to output</h2>
              </div>
              <button
                type="button"
                onClick={() => dispatch({ type: "SET_ACTIVE_VIEW", payload: "briefs" })}
                className="inline-flex items-center gap-1 rounded-md border border-white/[0.12] px-3 py-2 text-xs font-semibold text-white/52 transition hover:border-white/22 hover:text-white"
              >
                Open studio <ArrowRight size={13} />
              </button>
            </div>

            <div className="mt-4 grid gap-3">
              {state.briefs.slice(0, 5).map((brief) => {
                const researchCase = state.cases.find((item) => item.id === brief.caseId);
                const sectionCount = ["problem", "evidence", "response"].filter(
                  (key) => brief.sections?.[key]?.trim(),
                ).length;
                return (
                  <button
                    key={brief.id}
                    type="button"
                    onClick={() => {
                      dispatch({ type: "SELECT_BRIEF", payload: brief.id });
                      if (researchCase) dispatch({ type: "SELECT_CASE", payload: researchCase.id });
                      dispatch({ type: "SET_ACTIVE_VIEW", payload: "briefs" });
                    }}
                    className="rounded-lg border border-white/[0.07] bg-black/16 p-4 text-left transition hover:border-white/[0.16] hover:bg-white/[0.045]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="line-clamp-1 text-sm font-semibold text-white/78">{brief.title}</p>
                        <p className="mt-1 text-xs text-white/36">{researchCase?.sdg || "SDG"} / {brief.status}</p>
                      </div>
                      <span className="rounded-full border border-white/[0.09] px-2.5 py-1 text-xs font-semibold text-white/48">
                        {sectionCount}/3
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.section>
        </div>

        <motion.section variants={fadeUp(shouldReduceMotion)} className="rounded-lg border border-white/[0.08] bg-black/20 px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <ClipboardCheck size={18} className="text-emerald-100/58" />
              <p className="text-sm font-semibold text-white/66">
                Product stance: country-specific cases, transparent evidence, citation-aware claims, and research briefs that can survive review.
              </p>
            </div>
            <button
              type="button"
              onClick={() => askResearchAI("Review the active case like an SDG research editor. Give me the top five improvements.")}
              className="rounded-md border border-sky-100/16 px-3 py-2 text-xs font-semibold text-sky-100/68 transition hover:border-sky-100/28 hover:text-sky-100"
            >
              Run AI review
            </button>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}

function Metric({ icon: Icon, label, value, detail }) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/34">{label}</p>
        <Icon size={17} className="text-white/40" />
      </div>
      <p className="mt-4 text-3xl font-semibold tabular-nums text-white">{value}</p>
      <p className="mt-2 text-xs leading-5 text-white/44">{detail}</p>
    </div>
  );
}

function Mini({ label, value }) {
  return (
    <div className="rounded-lg border border-white/[0.07] bg-black/18 px-3 py-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/30">{label}</p>
      <p className="mt-2 line-clamp-2 text-sm font-semibold text-white/68">{value}</p>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.07] bg-white/[0.035] px-3 py-3 text-left text-sm font-semibold text-white/62 transition hover:border-white/[0.16] hover:bg-white/[0.065] hover:text-white"
    >
      <span className="inline-flex items-center gap-2">
        <Icon size={15} />
        {label}
      </span>
      <ArrowRight size={14} />
    </button>
  );
}

function Progress({ label, value, detail }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-white/62">{label}</p>
        <p className="text-sm font-semibold tabular-nums text-white">{value}%</p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
        <div className="h-full rounded-full bg-white transition-all" style={{ width: `${value}%` }} />
      </div>
      <p className="mt-2 text-xs leading-5 text-white/38">{detail}</p>
    </div>
  );
}
