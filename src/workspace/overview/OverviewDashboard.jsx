import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Database,
  FileText,
  GitBranch,
  Leaf,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext";

const motionEase = [0.23, 1, 0.32, 1];

// ── Landing page data ──

const platformFeatures = [
  {
    title: "Learn SDGs",
    copy: "Introduce the 17 Sustainable Development Goals and explain their global importance.",
    accent: "from-sky-400/20 to-blue-500/6",
    icon: BookOpen,
    href: "./sdg-goals.html",
  },
  {
    title: "Asking",
    copy: "Ask educational AI characters inspired by public SDG advocacy themes.",
    accent: "from-indigo-400/20 to-indigo-600/6",
    icon: MessageSquare,
    action: "chat",
  },
  {
    title: "Dataset Hub",
    copy: "Access curated datasets for education, climate, health, inequality, and sustainability research.",
    accent: "from-teal-400/20 to-teal-600/6",
    icon: Database,
    action: "datasets",
  },
  {
    title: "SDG Act Now",
    copy: "Calculate carbon footprint and explore practical actions to reduce emissions.",
    accent: "from-emerald-400/20 to-emerald-600/6",
    icon: Leaf,
    action: "actions",
  },
];

const selectedGoals = [
  {
    number: "SDG 4",
    title: "Quality Education",
    copy: "Advance inclusive learning opportunities that help communities build long-term resilience.",
    color: "border-l-red-400/40",
    href: "./sdg-4.html",
  },
  {
    number: "SDG 13",
    title: "Climate Action",
    copy: "Understand climate risks, mitigation choices, and adaptation pathways for a warming planet.",
    color: "border-l-emerald-400/40",
    href: "./sdg-13.html",
  },
  {
    number: "SDG 2",
    title: "Zero Hunger",
    copy: "Study food security, sustainable agriculture, and how reducing waste protects shared resources.",
    color: "border-l-amber-400/40",
    href: "./sdg-2.html",
  },
  {
    number: "SDG 16",
    title: "Peace, Justice and Strong Institutions",
    copy: "Connect justice, accountable institutions, and peacebuilding to sustainable development.",
    color: "border-l-amber-400/40",
    href: "./sdg-16.html",
  },
];

const aiVoices = [
  {
    title: "Education Advocate AI",
    sdg: "SDG 4",
    question: "How can schools reduce inequality while improving learning outcomes?",
    accent: "from-red-400/16 to-red-600/4",
  },
  {
    title: "Climate Action AI",
    sdg: "SDG 13",
    question: "What climate actions are realistic for a university community?",
    accent: "from-emerald-400/16 to-emerald-600/4",
  },
  {
    title: "Food Security AI",
    sdg: "SDG 2",
    question: "How can students reduce food waste while supporting food security?",
    accent: "from-amber-400/16 to-amber-600/4",
  },
  {
    title: "Peace and Justice AI",
    sdg: "SDG 16",
    question: "Why do strong institutions matter for sustainable development?",
    accent: "from-amber-400/16 to-amber-600/4",
  },
];

const datasetCategories = [
  {
    title: "Education Data",
    copy: "Indicators for access, attainment, digital learning, literacy, and educational equity.",
  },
  {
    title: "Climate Data",
    copy: "Emissions, temperature, energy, disaster risk, and adaptation datasets.",
  },
  {
    title: "Food Security Data",
    copy: "Hunger, nutrition, food waste, agriculture, and food-system resilience indicators.",
  },
  {
    title: "Inequality and Justice Data",
    copy: "Data sources on poverty, gender equity, governance, and social outcomes.",
  },
  {
    title: "General SDG Data Portals",
    copy: "Cross-goal portals for comparing indicators across regions, themes, and timelines.",
  },
];

const actNowActions = [
  "Save energy",
  "Use public transport",
  "Eat more vegetables",
  "Reduce waste",
  "Recycle",
  "Speak up",
  "Conserve water",
  "Choose sustainable products",
  "Repair and reuse",
  "Share SDG knowledge",
];

// ── Heatmap ──

function ContributionHeatmap({ activityLog }) {
  const weeks = 26;
  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  const dateMap = useMemo(() => {
    const map = {};
    for (const entry of activityLog) {
      const d = entry.timestamp.slice(0, 10);
      map[d] = (map[d] || 0) + 1;
    }
    return map;
  }, [activityLog]);

  const grid = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const start = new Date(today);
    start.setDate(start.getDate() - dayOfWeek - (weeks - 1) * 7 + 1);
    const cells = [];
    for (let w = 0; w < weeks; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(start);
        date.setDate(start.getDate() + w * 7 + d);
        const key = date.toISOString().slice(0, 10);
        const count = dateMap[key] || 0;
        week.push({ key, count, isFuture: date > today });
      }
      cells.push(week);
    }
    return cells;
  }, [dateMap]);

  function colorLevel(count) {
    if (count === 0) return "bg-white/[0.04]";
    if (count === 1) return "bg-indigo-500/25";
    if (count <= 3) return "bg-indigo-500/45";
    if (count <= 6) return "bg-indigo-500/65";
    return "bg-indigo-400/85";
  }

  const monthLabels = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const start = new Date(today);
    start.setDate(start.getDate() - dayOfWeek - (weeks - 1) * 7 + 1);
    const labels = [];
    let lastMonth = -1;
    for (let w = 0; w < weeks; w++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7);
      const m = date.getMonth();
      if (m !== lastMonth) {
        labels.push({ week: w, label: date.toLocaleDateString("en-US", { month: "short" }) });
        lastMonth = m;
      }
    }
    return labels;
  }, []);

  const totalActivities = activityLog.length;

  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp size={15} className="text-indigo-100/60" />
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/50">
            Research Activity
          </span>
        </div>
        <span className="text-[11px] text-white/30">
          {totalActivities} actions in {weeks} weeks
        </span>
      </div>

      <div className="flex gap-1">
        <div className="flex flex-col gap-[3px] pr-2 pt-[18px]">
          {dayLabels.map((label, i) => (
            <div key={i} className="flex h-[11px] items-center text-[9px] text-white/20">
              {label}
            </div>
          ))}
        </div>
        <div className="min-w-0 flex-1 overflow-x-auto">
          <div className="relative mb-1 flex h-[14px] text-[9px] text-white/25">
            {monthLabels.map((m) => (
              <span key={m.week} className="absolute" style={{ left: `${(m.week / weeks) * 100}%` }}>
                {m.label}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            {grid.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((cell) => (
                  <div
                    key={cell.key}
                    title={`${cell.key}: ${cell.count} activities`}
                    className={`h-[11px] w-[11px] rounded-[2px] ${cell.isFuture ? "bg-transparent" : colorLevel(cell.count)}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-1">
        <span className="text-[9px] text-white/20">Less</span>
        {[0, 1, 3, 6, 8].map((level) => (
          <div key={level} className={`h-[10px] w-[10px] rounded-[2px] ${colorLevel(level)}`} />
        ))}
        <span className="text-[9px] text-white/20">More</span>
      </div>
    </div>
  );
}

// ── Reusable glass card ──

function GlassCard({ children, accent, href, onClick, className = "" }) {
  const shouldReduceMotion = useReducedMotion();
  const isInteractive = href || onClick;
  const cardClass = `group relative block ${isInteractive ? "cursor-pointer" : ""} overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 text-left shadow-[0_16px_48px_rgba(0,0,0,0.18)] backdrop-blur transition duration-300 hover:border-indigo-200/20 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-200 ${className}`;
  const content = (
    <>
      {accent && (
        <div className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${accent}`} />
      )}
      <div className="relative">{children}</div>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={
          shouldReduceMotion
            ? undefined
            : { transform: "translate3d(0, -3px, 0)" }
        }
        transition={{ duration: 0.2, ease: motionEase }}
        className={cardClass}
      >
        {content}
      </motion.a>
    );
  }

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={
          shouldReduceMotion
            ? undefined
            : { transform: "translate3d(0, -3px, 0)" }
        }
        transition={{ duration: 0.2, ease: motionEase }}
        className={cardClass}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.article
      whileHover={
        shouldReduceMotion
          ? undefined
          : { transform: "translate3d(0, -3px, 0)" }
      }
      transition={{ duration: 0.2, ease: motionEase }}
      className={cardClass}
    >
      {content}
    </motion.article>
  );
}

// ── Reusable section title ──

function SectionTitle({ icon: Icon, children }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Icon size={15} className="text-indigo-100/50" />
      <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-white/42">
        {children}
      </h2>
    </div>
  );
}

// ── Main component ──

export default function OverviewDashboard() {
  const { state, dispatch } = useWorkspace();
  const shouldReduceMotion = useReducedMotion();

  const litCount = state.literature.length;
  const notesCount = state.notes.length;
  const relCount = state.literature.reduce((sum, item) => sum + item.relationships.length, 0);

  const handleAskAI = (voice) => {
    sessionStorage.setItem("bruniverse-pending-question", voice.question);
    dispatch({ type: "SET_ACTIVE_VIEW", payload: "chat" });
  };

  const handleFeatureClick = (action) => {
    if (action === "literature") dispatch({ type: "SET_ACTIVE_VIEW", payload: "literature" });
    else if (action === "chat") dispatch({ type: "SET_ACTIVE_VIEW", payload: "chat" });
    else if (action === "datasets") {
      document.getElementById("datasets-section")?.scrollIntoView({ behavior: "smooth" });
    } else if (action === "actions") {
      document.getElementById("actions-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDatasetClick = (category) => {
    dispatch({ type: "SET_ACTIVE_VIEW", payload: "literature" });
    const newNote = {
      id: crypto.randomUUID(),
      title: `Dataset: ${category.title}`,
      content: `# ${category.title}\n\n${category.copy}\n\n## Potential Research Questions\n\n- \n\n## Data Sources\n\n- \n`,
      linkedLiteratureIds: [],
      tags: ["dataset", "research"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_NOTE", payload: newNote });
    dispatch({ type: "SELECT_NOTE", payload: newNote.id });
    dispatch({ type: "SET_ACTIVE_VIEW", payload: "notes" });
  };

  const handleActionClick = (action) => {
    const newNote = {
      id: crypto.randomUUID(),
      title: `Action: ${action}`,
      content: `# Action Plan: ${action}\n\n## Why this matters\n\n\n## How I'll implement this\n\n1. \n2. \n3. \n\n## Progress tracking\n\n- [ ] Started\n- [ ] In progress\n- [ ] Completed\n`,
      linkedLiteratureIds: [],
      tags: ["action", "sustainability"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_NOTE", payload: newNote });
    dispatch({ type: "SELECT_NOTE", payload: newNote.id });
    dispatch({ type: "SET_ACTIVE_VIEW", payload: "notes" });
  };

  const accentGradients = [
    "from-indigo-400/12 to-indigo-600/4",
    "from-sky-400/12 to-sky-600/4",
    "from-teal-400/12 to-teal-600/4",
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      {/* ── Hero header ── */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: motionEase }}
        className="mb-10"
      >
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: motionEase }}
          className="inline-flex items-center gap-3 rounded-lg border border-indigo-200/16 bg-indigo-200/[0.05] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-100/76 backdrop-blur sm:py-2 sm:text-[11px]"
        >
          <span className="h-px w-8 bg-indigo-300/48" />
          Research Workspace
        </motion.p>
        <h1 className="mt-4 text-3xl font-bold leading-[0.94] tracking-tight text-white sm:text-4xl lg:text-5xl">
          Your research,{" "}
          <span className="bg-gradient-to-r from-indigo-300 to-sky-300 bg-clip-text text-transparent">
            connected
          </span>
          .
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] font-medium leading-relaxed text-white/52">
          Track papers, visualize relationships, and build understanding through notes and AI-assisted exploration.
        </p>
      </motion.div>

      {/* ── Stats row ── */}
      <div className="mb-10 grid gap-3 sm:grid-cols-3">
        <StatCard icon={BookOpen} label="Papers" value={litCount} accent={accentGradients[0]} delay={0.08} />
        <StatCard icon={GitBranch} label="Relationships" value={relCount} accent={accentGradients[1]} delay={0.14} />
        <StatCard icon={FileText} label="Notes" value={notesCount} accent={accentGradients[2]} delay={0.2} />
      </div>

      {/* ── Platform Features ── */}
      <SectionTitle icon={Zap}>Platform</SectionTitle>
      <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {platformFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <GlassCard
              key={feature.title}
              accent={feature.accent}
              href={feature.href}
              onClick={feature.action ? () => handleFeatureClick(feature.action) : undefined}
            >
              <div className="mb-3 grid h-9 w-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.04]">
                <Icon size={17} className="text-indigo-100/60" />
              </div>
              <h3 className="text-[15px] font-bold text-white/85">{feature.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/48">{feature.copy}</p>
              <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-indigo-100/50 transition group-hover:text-indigo-100/80">
                Open <ArrowRight size={12} />
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* ── Heatmap ── */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.22, ease: motionEase }}
        className="mb-10"
      >
        <ContributionHeatmap activityLog={state.activityLog} />
      </motion.div>

      {/* ── SDG Goals + AI Voices ── */}
      <div className="mb-10 grid gap-6 lg:grid-cols-2">
        {/* SDG Goals */}
        <div>
          <SectionTitle icon={BookOpen}>Explore SDG Goals</SectionTitle>
          <div className="grid gap-3">
            {selectedGoals.map((goal) => (
              <GlassCard
                key={goal.number}
                href={goal.href}
              >
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 rounded-lg border-l-2 ${goal.color} bg-white/[0.04] px-3 py-2`}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">
                      {goal.number}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-bold text-white/85">{goal.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/48">{goal.copy}</p>
                    <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-indigo-100/50 transition group-hover:text-indigo-100/80">
                      Open goal page <ArrowRight size={12} />
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* AI Voices */}
        <div>
          <SectionTitle icon={Sparkles}>Ask AI Voices</SectionTitle>
          <div className="grid gap-3">
            {aiVoices.map((voice) => (
              <GlassCard
                key={voice.title}
                accent={voice.accent}
                onClick={() => handleAskAI(voice)}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold text-white/36">
                      {voice.sdg}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-indigo-100/50">
                      AI Character
                    </span>
                  </div>
                  <h3 className="mt-3 text-[15px] font-bold text-white/85">{voice.title}</h3>
                  <p className="mt-2 rounded-lg border border-white/[0.06] bg-black/20 px-3 py-2.5 text-[13px] italic leading-relaxed text-white/50">
                    "{voice.question}"
                  </p>
                  <p className="mt-2 text-[11px] font-medium text-indigo-100/50 transition group-hover:text-indigo-100/80">
                    Start conversation
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      {/* ── Datasets + Actions ── */}
      <div className="mb-10 grid gap-6 lg:grid-cols-2">
        {/* Dataset Categories */}
        <div id="datasets-section">
          <SectionTitle icon={Database}>Dataset Hub</SectionTitle>
          <div className="grid gap-2">
            {datasetCategories.map((cat) => (
              <GlassCard key={cat.title} onClick={() => handleDatasetClick(cat)}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white/80">{cat.title}</h3>
                    <p className="mt-1 text-[12px] leading-relaxed text-white/44">{cat.copy}</p>
                  </div>
                  <ArrowRight size={14} className="mt-0.5 shrink-0 text-white/18 transition group-hover:text-indigo-100/60" />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Act Now Actions */}
        <div id="actions-section">
          <SectionTitle icon={Leaf}>SDG Act Now</SectionTitle>
          <p className="mb-3 text-[13px] leading-relaxed text-white/40">
            Ten practical sustainability actions. Click any to create a personal action plan.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {actNowActions.map((action) => (
              <GlassCard key={action} onClick={() => handleActionClick(action)}>
                <div className="flex items-center gap-2">
                  <div className="grid h-7 w-7 place-items-center rounded-md border border-emerald-300/16 bg-emerald-300/[0.06]">
                    <Leaf size={12} className="text-emerald-300/60" />
                  </div>
                  <span className="text-[13px] font-bold text-white/72 transition group-hover:text-white/90">
                    {action}
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Stat card ──

function StatCard({ icon: Icon, label, value, accent, delay }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: motionEase }}
      whileHover={shouldReduceMotion ? undefined : { transform: "translate3d(0, -3px, 0)" }}
      className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-[0_16px_48px_rgba(0,0,0,0.2)] backdrop-blur transition duration-300 hover:border-indigo-200/20 hover:bg-white/[0.05]"
    >
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b ${accent}`} />
      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.04]">
            <Icon size={18} className="text-indigo-100/60" />
          </span>
          <div>
            <p className="text-[32px] font-bold leading-none tracking-tight text-white">{value}</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">{label}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
