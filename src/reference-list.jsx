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
import { apaReferences } from "./pages/siteData";

const referenceGroups = [
  {
    label: "Home and SDG framework",
    count: 3,
    copy: "Core sources for the 2030 Agenda, the full SDG framework, and official UN action guidance.",
  },
  {
    label: "Selected SDG reports",
    count: 8,
    copy: "Sources supporting SDG 4 education equity and SDG 13 climate-action research.",
  },
  {
    label: "Carbon footprint and Act Now",
    count: 7,
    copy: "Sources supporting carbon footprint definitions, ten actions, transport, and circular economy responses.",
  },
];

function ReferenceListPage() {
  return (
    <StaticPageShell transitionKey="reference-list" activeHref="./reference-list.html">
      {(shouldReduceMotion) => (
        <>
          <HeroSection
            eyebrow="APA 7th Style"
            title="Reference List"
            copy="A separate citation page for the SDG website, collecting official UN sources, research evidence, carbon-footprint sources, and supporting project references."
            shouldReduceMotion={shouldReduceMotion}
          >
            <motion.div variants={fadeUp(shouldReduceMotion)} className="flex flex-wrap gap-3">
              <PillLink href="./sdg-goals.html">SDG 17 Goals</PillLink>
              <PillLink href="./act-now.html" variant="dark">
                Act Now Evidence
              </PillLink>
            </motion.div>
          </HeroSection>

          <PageSection shouldReduceMotion={shouldReduceMotion} className="border-y border-white/10 bg-[#0a0a1a]/66">
            <SectionHeader
              eyebrow="Citation coverage"
              title="Sources are grouped by assessment requirement."
              copy="The complete list below is formatted in APA style and can be checked against the separate SDG and Act Now pages."
              shouldReduceMotion={shouldReduceMotion}
            />

            <div className="grid gap-3 md:grid-cols-3">
              {referenceGroups.map((group) => (
                <GlassPanel
                  key={group.label}
                  variants={fadeUp(shouldReduceMotion)}
                  shouldReduceMotion={shouldReduceMotion}
                  className="min-h-[220px]"
                >
                  <p className="text-5xl font-extrabold tabular-nums text-white/16">
                    {group.count}
                  </p>
                  <h3 className="mt-7 text-2xl font-bold leading-tight text-white">
                    {group.label}
                  </h3>
                  <p className="mt-4 text-sm font-medium leading-6 text-white/56">
                    {group.copy}
                  </p>
                </GlassPanel>
              ))}
            </div>
          </PageSection>

          <PageSection shouldReduceMotion={shouldReduceMotion}>
            <SectionHeader
              eyebrow="Complete APA list"
              title="References."
              copy="Entries are ordered alphabetically by author or organization."
              shouldReduceMotion={shouldReduceMotion}
            />

            <motion.ol
              variants={fadeUp(shouldReduceMotion)}
              className="max-w-5xl space-y-5 text-sm leading-relaxed text-white/50 [counter-reset:ref]"
            >
              {apaReferences.map((reference) => (
                <li
                  key={reference}
                  className="flex gap-4 border-t border-white/[0.06] pt-5 [counter-increment:ref] before:shrink-0 before:font-mono before:text-xs before:font-bold before:text-white/20 before:content-[counter(ref,decimal-leading-zero)]"
                >
                  <span>{reference}</span>
                </li>
              ))}
            </motion.ol>
          </PageSection>
        </>
      )}
    </StaticPageShell>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReferenceListPage />
  </React.StrictMode>,
);
