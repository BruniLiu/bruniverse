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
import { teamMembers } from "./pages/siteData";

function PortraitPlaceholder({ member }) {
  return (
    <div className="relative aspect-square w-full max-w-[260px] overflow-hidden rounded-lg border border-white/12 bg-[radial-gradient(circle_at_30%_24%,rgba(186,230,253,0.24),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.86),rgba(30,41,59,0.44))]">
      <div className="absolute inset-0 bg-noise opacity-[0.08]" />
      <div className="absolute inset-x-8 top-12 h-20 rounded-full bg-white/[0.08] blur-2xl" />
      <div className="relative grid h-full place-items-center">
        <div className="grid place-items-center gap-4">
          <div className="grid h-28 w-28 place-items-center rounded-full border border-sky-100/22 bg-white/[0.07] text-3xl font-extrabold text-sky-100/80 shadow-[0_20px_60px_rgba(14,165,233,0.16)]">
            {member.initials}
          </div>
          <p className="max-w-[180px] text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-white/34">
            Head shot required
          </p>
        </div>
      </div>
    </div>
  );
}

function AboutUsPage() {
  return (
    <StaticPageShell transitionKey="about-us" activeHref="./about-us.html">
      {(shouldReduceMotion) => (
        <>
          <HeroSection
            eyebrow="Instruction 2"
            title="About Us"
            copy="A focused member profile page that presents design contribution, academic background, and future vocation aspirations for the SDG website assessment."
            shouldReduceMotion={shouldReduceMotion}
          >
            <motion.div variants={fadeUp(shouldReduceMotion)} className="flex flex-wrap gap-3">
              <PillLink href="./sdg-goals.html">View SDG 17 Goals</PillLink>
              <PillLink href="./reference-list.html" variant="dark">
                Reference List
              </PillLink>
            </motion.div>
          </HeroSection>

          <PageSection shouldReduceMotion={shouldReduceMotion} className="border-y border-white/10 bg-[#0a0a1a]/66">
            <SectionHeader
              eyebrow="Team profile"
              title="Member identity, background, and vocation direction."
              copy="The information below is drawn from the project document and arranged as a clean website profile."
              shouldReduceMotion={shouldReduceMotion}
            />

            <div className="grid gap-5">
              {teamMembers.map((member) => (
                <GlassPanel
                  key={member.name}
                  variants={fadeUp(shouldReduceMotion)}
                  shouldReduceMotion={shouldReduceMotion}
                  className="p-6 sm:p-8"
                >
                  <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
                    <div className="grid justify-items-start gap-4">
                      <PortraitPlaceholder member={member} />
                      <p className="max-w-[280px] text-xs font-medium leading-5 text-white/32">
                        {member.photoStatus}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-100/62">
                        {member.role}
                      </p>
                      <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
                        {member.name}
                      </h2>
                      <p className="mt-2 text-base font-semibold text-white/50">
                        English name: {member.englishName}
                      </p>

                      <div className="mt-8 grid gap-6 md:grid-cols-2">
                        <div className="border-t border-white/10 pt-5">
                          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/30">
                            Background
                          </p>
                          <p className="mt-3 text-sm font-medium leading-6 text-white/64">
                            {member.background}
                          </p>
                        </div>
                        <div className="border-t border-white/10 pt-5">
                          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/30">
                            Future vocation aspirations
                          </p>
                          <p className="mt-3 text-sm font-medium leading-6 text-white/64">
                            {member.aspiration}
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 border-t border-white/10 pt-5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/30">
                          Selected research focus
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {[...member.selectedSdgs, ...member.selectedActions].map((item) => (
                            <span
                              key={item}
                              className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-white/62"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassPanel>
              ))}
            </div>
          </PageSection>

          <PageSection shouldReduceMotion={shouldReduceMotion}>
            <SectionHeader
              eyebrow="Contribution map"
              title="How the member contributes to the project."
              copy="This section makes the group-design requirement visible by connecting research, design, action evidence, and references."
              shouldReduceMotion={shouldReduceMotion}
            />

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {teamMembers[0].contributions.map((contribution, index) => (
                <GlassPanel
                  key={contribution}
                  variants={fadeUp(shouldReduceMotion)}
                  shouldReduceMotion={shouldReduceMotion}
                  className="min-h-[210px]"
                >
                  <p className="font-mono text-xs font-bold tabular-nums text-white/28">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-8 text-sm font-medium leading-6 text-white/64">
                    {contribution}
                  </p>
                </GlassPanel>
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
    <AboutUsPage />
  </React.StrictMode>,
);
