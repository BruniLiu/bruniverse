import React from "react";
import ReactDOM from "react-dom/client";
import { motion } from "framer-motion";
import {
  fadeUp,
  GlassPanel,
  HeroSection,
  PageSection,
  PillLink,
  SectionHeader,
  StaticPageShell,
} from "./pages/AssessmentLayout";
import { allSdgGoals, sdgAgenda } from "./pages/siteData";

const selectedReports = [
  {
    number: "04",
    title: "Quality Education",
    href: "./sdg-4.html",
    focus: "Education inequality, rural access, digital divides, and lifelong learning in China.",
  },
  {
    number: "13",
    title: "Climate Action",
    href: "./sdg-13.html",
    focus: "Coal dependence, industrialization, agriculture, and climate variability in China.",
  },
  {
    number: "03",
    title: "Good Health and Well-being",
    href: "./sdg-3.html",
    focus: "Public health, prevention, health equity, and system resilience.",
  },
  {
    number: "16",
    title: "Peace, Justice and Strong Institutions",
    href: "./sdg-16.html",
    focus: "Justice, accountable institutions, violence reduction, and civic trust.",
  },
];

const guidanceReasons = [
  {
    title: "Shared direction",
    copy: "The SDGs convert broad global problems into 17 named priorities and measurable targets, helping countries and communities move toward common outcomes.",
  },
  {
    title: "Cross-sector thinking",
    copy: "Education, climate, health, justice, poverty, and equality affect each other. The SDGs make those connections visible rather than treating each issue as separate.",
  },
  {
    title: "Accountability",
    copy: "The goals create a framework for tracking progress, comparing evidence, and asking whether policies are improving real lives.",
  },
  {
    title: "Local action",
    copy: "A global agenda becomes practical when students, households, schools, businesses, and city governments connect it to their own decisions.",
  },
];

function SDGGoalsPage() {
  return (
    <StaticPageShell transitionKey="sdg-goals" activeHref="./sdg-goals.html">
      {(shouldReduceMotion) => (
        <>
          <HeroSection
            eyebrow="Instruction 1 and 3"
            title="SDG 17 Goals"
            copy={sdgAgenda.summary}
            shouldReduceMotion={shouldReduceMotion}
          >
            <motion.div variants={fadeUp(shouldReduceMotion)} className="flex flex-wrap gap-3">
              <PillLink href="#all-goals">View All 17 Goals</PillLink>
              <PillLink href="./act-now.html" variant="dark">
                Go to Act Now
              </PillLink>
            </motion.div>
          </HeroSection>

          <PageSection shouldReduceMotion={shouldReduceMotion} className="border-y border-white/10 bg-[#0a0a1a]/66">
            <SectionHeader
              eyebrow="Why guidance matters"
              title="The SDGs turn global uncertainty into coordinated action."
              copy={sdgAgenda.whyGuidanceMatters}
              shouldReduceMotion={shouldReduceMotion}
            />

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {guidanceReasons.map((reason, index) => (
                <GlassPanel
                  key={reason.title}
                  variants={fadeUp(shouldReduceMotion)}
                  shouldReduceMotion={shouldReduceMotion}
                  className="min-h-[230px]"
                >
                  <p className="font-mono text-xs font-bold tabular-nums text-white/28">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-7 text-2xl font-bold leading-tight text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-4 text-sm font-medium leading-6 text-white/58">
                    {reason.copy}
                  </p>
                </GlassPanel>
              ))}
            </div>
          </PageSection>

          <PageSection id="all-goals" shouldReduceMotion={shouldReduceMotion}>
            <SectionHeader
              eyebrow="The complete framework"
              title="The 17 Sustainable Development Goals."
              copy="This page lists the complete UN SDG framework, then links to the selected goal reports prepared for this website."
              shouldReduceMotion={shouldReduceMotion}
            />

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allSdgGoals.map((goal) => (
                <GlassPanel
                  key={goal.number}
                  variants={fadeUp(shouldReduceMotion)}
                  shouldReduceMotion={shouldReduceMotion}
                  className="min-h-[210px]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-mono text-3xl font-extrabold tabular-nums text-white/18">
                      {goal.number}
                    </p>
                    <span className="h-2 w-2 rounded-full bg-sky-100/56 shadow-[0_0_18px_rgba(125,211,252,0.62)]" />
                  </div>
                  <h3 className="mt-7 text-xl font-bold leading-tight text-white">
                    {goal.title}
                  </h3>
                  <p className="mt-4 text-sm font-medium leading-6 text-white/54">
                    {goal.summary}
                  </p>
                </GlassPanel>
              ))}
            </div>
          </PageSection>

          <PageSection shouldReduceMotion={shouldReduceMotion} className="bg-[#0a0a1a]/50">
            <SectionHeader
              eyebrow="Selected reports"
              title="Individual SDG research pages."
              copy="Each selected goal page explains the purpose of the goal, identifies an adverse national impact, and provides a personal response."
              shouldReduceMotion={shouldReduceMotion}
            />

            <div className="grid gap-4 md:grid-cols-2">
              {selectedReports.map((report) => (
                <motion.a
                  key={report.number}
                  variants={fadeUp(shouldReduceMotion)}
                  href={report.href}
                  className="group rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur transition hover:border-sky-100/24 hover:bg-white/[0.065] sm:p-8"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-100/62">
                    SDG {report.number}
                  </p>
                  <h3 className="mt-5 text-2xl font-bold leading-tight text-white group-hover:text-sky-100">
                    {report.title}
                  </h3>
                  <p className="mt-4 text-sm font-medium leading-6 text-white/58">
                    {report.focus}
                  </p>
                  <span className="mt-7 inline-flex text-xs font-bold uppercase tracking-[0.12em] text-white/36 group-hover:text-sky-100/76">
                    Open research page
                  </span>
                </motion.a>
              ))}
            </div>
          </PageSection>
        </>
      )}
    </StaticPageShell>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SDGGoalsPage />
  </React.StrictMode>,
);
