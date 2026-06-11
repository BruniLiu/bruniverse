import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { motion } from "framer-motion";
import { BadgeCheck, BriefcaseBusiness, GraduationCap, UserRound } from "lucide-react";
import {
  fadeUp,
  motionEase,
  PillLink,
  StaticPageShell,
  stagger,
} from "./pages/AssessmentLayout";
import { teamMembers } from "./pages/siteData";

function ProfilePhoto({ member, featured = false }) {
  const [failed, setFailed] = useState(false);
  const sizeClass = featured ? "max-w-[240px]" : "max-w-[200px]";

  if (member.photoPath && !failed) {
    return (
      <div className={`relative aspect-square w-full ${sizeClass} overflow-hidden rounded-lg border border-white/12 bg-white/[0.04]`}>
        <img
          src={member.photoPath}
          alt={`${member.name} head shot`}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className={`relative aspect-square w-full ${sizeClass} overflow-hidden rounded-lg border border-white/16 bg-[#141417]`}>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_42%),radial-gradient(circle_at_50%_35%,rgba(125,211,252,0.24),transparent_42%)]" />
      <div className="relative flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="grid h-24 w-24 place-items-center rounded-full border border-white/18 bg-white/[0.08] text-3xl font-semibold text-white">
          {member.initials}
        </div>
        <div>
          <p className="text-xs font-semibold text-white/72">Portrait pending</p>
          <p className="mt-1 text-xs leading-5 text-white/48">A professional photo will be added.</p>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ icon: Icon, title, children }) {
  return (
    <div className="min-w-0 border-t border-white/10 pt-4">
      <div className="flex items-center gap-2 text-white/62">
        <Icon size={15} strokeWidth={1.9} aria-hidden="true" />
        <p className="text-xs font-semibold">{title}</p>
      </div>
      <p className="mt-3 break-words text-sm leading-6 text-white/76">{children}</p>
    </div>
  );
}

function ProfileCard({ member, index, shouldReduceMotion }) {
  const isLeader = index === 0;
  const focusItems = [...(member.selectedSdgs || []), ...(member.selectedActions || [])];

  return (
    <motion.article
      variants={fadeUp(shouldReduceMotion)}
      whileHover={
        shouldReduceMotion
          ? undefined
          : { transform: "translate3d(0, -3px, 0)", transition: { duration: 0.18, ease: motionEase } }
      }
      className={`relative min-w-0 overflow-hidden rounded-lg border p-5 transition duration-300 sm:p-6 lg:p-7 ${
        isLeader
          ? "border-white/22 bg-white/[0.09] shadow-[0_28px_100px_rgba(255,255,255,0.07)]"
          : "border-white/14 bg-white/[0.055] hover:border-white/22 hover:bg-white/[0.07]"
      }`}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(180px,240px)_1fr] lg:items-start">
        <div className="grid justify-items-center gap-3 sm:justify-items-start">
          <ProfilePhoto member={member} featured={isLeader} />
          <p className="max-w-[240px] text-center text-xs leading-5 text-white/50 sm:text-left">
            {member.photoStatus}
          </p>
        </div>

        <div className="min-w-0">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {isLeader && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-100/24 bg-sky-100/[0.1] px-3 py-1 text-xs font-semibold text-sky-100/86">
                    <BadgeCheck size={14} strokeWidth={2} aria-hidden="true" />
                    Group leader
                  </span>
                )}
                <span className="rounded-full border border-white/14 bg-black/20 px-3 py-1 text-xs font-semibold text-white/66">
                  {member.englishName}
                </span>
              </div>
              <h2 className="mt-4 break-words text-2xl font-semibold leading-tight text-white sm:text-4xl">
                {member.name}
              </h2>
            </div>

            <div className="flex max-w-[360px] min-w-0 items-start gap-2 rounded-lg border border-white/14 bg-black/22 px-4 py-3 text-sm leading-5 text-white/72">
              <UserRound size={16} strokeWidth={1.9} className="mt-0.5 shrink-0 text-white/50" aria-hidden="true" />
              <p className="min-w-0 break-words">{member.role}</p>
            </div>
          </div>

          <div className="mt-7 grid gap-5 xl:grid-cols-2">
            <InfoBlock icon={GraduationCap} title="Background">
              {member.background}
            </InfoBlock>
            <InfoBlock icon={BriefcaseBusiness} title="Career direction">
              {member.aspiration}
            </InfoBlock>
          </div>

          {focusItems.length > 0 && (
            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="text-xs font-semibold text-white/58">Selected research focus</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {focusItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/14 bg-white/[0.065] px-3 py-2 text-xs font-semibold text-white/74"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function AboutUsPage() {
  return (
    <StaticPageShell transitionKey="about-us" activeHref="./about-us.html">
      {(shouldReduceMotion) => (
        <>
          <section className="relative overflow-hidden px-5 pt-12 pb-12 sm:px-8 sm:pt-18 sm:pb-16 lg:px-12 lg:pt-22">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger(shouldReduceMotion, 0.08, 0.08)}
              className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,420px)] lg:items-end"
            >
              <div className="min-w-0">
                <motion.p variants={fadeUp(shouldReduceMotion)} className="text-sm font-semibold text-sky-100/78">
                  Team Profile
                </motion.p>
                <motion.h1
                  variants={fadeUp(shouldReduceMotion)}
                  className="mt-5 max-w-4xl break-words text-[clamp(2.25rem,9vw,5.8rem)] font-semibold leading-[0.98] text-white"
                >
                  People behind Bruniverse.
                </motion.h1>
                <motion.p
                  variants={fadeUp(shouldReduceMotion)}
                  className="mt-6 max-w-2xl break-words text-base leading-7 text-white/74 sm:text-lg"
                >
                  We introduce our academic backgrounds, career directions, and contributions to the Bruniverse project.
                </motion.p>
                <motion.div variants={fadeUp(shouldReduceMotion)} className="mt-7 flex flex-wrap gap-3">
                  <PillLink href="./sdg-goals.html">View SDG Goals</PillLink>
                  <PillLink href="./reference-list.html" variant="dark">
                    Reference List
                  </PillLink>
                </motion.div>
              </div>

              <motion.div
                variants={fadeUp(shouldReduceMotion)}
                  className="min-w-0 rounded-lg border border-white/14 bg-white/[0.06] p-5 sm:p-6"
              >
                <p className="text-sm font-semibold text-white/78">Team snapshot</p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-3xl font-semibold text-white">{teamMembers.length}</p>
                    <p className="mt-1 text-xs leading-5 text-white/58">profiles</p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold text-white">1</p>
                    <p className="mt-1 text-xs leading-5 text-white/58">group leader</p>
                  </div>
                  <div>
                    <p className="text-3xl font-semibold text-white">2</p>
                    <p className="mt-1 text-xs leading-5 text-white/58">profile areas</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </section>

          <section className="relative border-y border-white/12 bg-[#0d0d10] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-18">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger(shouldReduceMotion)}
              className="mx-auto max-w-7xl"
            >
              <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-6 max-w-3xl sm:mb-8">
                <p className="text-sm font-semibold text-sky-100/78">Members</p>
                <h2 className="mt-3 break-words text-2xl font-semibold leading-tight text-white sm:text-4xl">
                  Our academic backgrounds and future directions.
                </h2>
              </motion.div>

              <div className="grid gap-4">
                {teamMembers.map((member, index) => (
                  <ProfileCard
                    key={member.name}
                    member={member}
                    index={index}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                ))}
              </div>
            </motion.div>
          </section>

          <section className="relative px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-18">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger(shouldReduceMotion)}
              className="mx-auto max-w-7xl"
            >
              <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-6 max-w-3xl">
                <p className="text-sm font-semibold text-sky-100/78">Contribution map</p>
                <h2 className="mt-3 break-words text-2xl font-semibold leading-tight text-white sm:text-4xl">
                  How we support the shared project.
                </h2>
              </motion.div>

              <div className="grid gap-4 lg:grid-cols-3">
                {teamMembers.map((member) => (
                  <motion.article
                    key={`${member.name}-contribution`}
                    variants={fadeUp(shouldReduceMotion)}
                  className="min-w-0 rounded-lg border border-white/14 bg-white/[0.055] p-5 sm:p-6"
                  >
                    <p className="text-sm font-semibold text-white">{member.englishName}</p>
                    <p className="mt-1 text-xs text-white/56">{member.name}</p>
                    <div className="mt-5 grid gap-3">
                      {(member.contributions || []).map((item, index) => (
                        <div key={item} className="grid grid-cols-[28px_1fr] gap-3 border-t border-white/10 pt-3">
                          <span className="font-mono text-xs font-semibold tabular-nums text-white/44">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <p className="min-w-0 break-words text-sm leading-6 text-white/72">{item}</p>
                        </div>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </section>
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
