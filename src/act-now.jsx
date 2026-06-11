import React from "react";
import ReactDOM from "react-dom/client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bike,
  Calculator,
  Camera,
  Carrot,
  CheckCircle2,
  ClipboardCheck,
  Footprints,
  Leaf,
  Plane,
  Recycle,
  Target,
} from "lucide-react";
import {
  fadeUp,
  motionEase,
  StaticPageShell,
  stagger,
} from "./pages/AssessmentLayout";
import { actNowContent } from "./pages/actNowData";
import { tenActNowActions } from "./pages/siteData";
import "./react.css";

const selectedActionLinks = [
  "./act-now-transport.html",
  "./act-now-vegetables.html",
  "./act-now-travel.html",
  "./act-now-4r.html",
];

function toNumber(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getActionMetrics(action) {
  const before = toNumber(action.calculator?.before?.perCapita);
  const after = toNumber(action.calculator?.after?.perCapita);
  const reduction = Math.max(before - after, 0);
  const percent = before > 0 ? (reduction / before) * 100 : 0;

  return {
    before,
    after,
    reduction,
    percent,
    screenshots: action.calculator?.screenshots?.length || 0,
  };
}

function actionIcon(action) {
  if (action.toLowerCase().includes("transport") || action.toLowerCase().includes("bike")) return Bike;
  if (action.toLowerCase().includes("vegetables")) return Carrot;
  if (action.toLowerCase().includes("travel")) return Plane;
  if (action.toLowerCase().includes("recycle") || action.toLowerCase().includes("reuse")) return Recycle;
  return Leaf;
}

function StatCard({ label, value, detail, icon: Icon, shouldReduceMotion }) {
  return (
    <motion.article
      variants={fadeUp(shouldReduceMotion)}
      whileHover={
        shouldReduceMotion
          ? undefined
          : { transform: "translate3d(0, -3px, 0)", transition: { duration: 0.18, ease: motionEase } }
      }
      className="min-w-0 max-w-full rounded-lg border border-white/14 bg-white/[0.055] p-5"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-white/62">{label}</p>
        <Icon size={18} strokeWidth={1.9} className="shrink-0 text-sky-100/68" aria-hidden="true" />
      </div>
      <p className="mt-5 break-words text-3xl font-semibold leading-none text-white">{value}</p>
      <p className="mt-3 break-words text-sm leading-6 text-white/58">{detail}</p>
    </motion.article>
  );
}

function ProofStep({ icon: Icon, title, copy, shouldReduceMotion }) {
  return (
    <motion.article
      variants={fadeUp(shouldReduceMotion)}
      className="min-w-0 rounded-lg border border-white/12 bg-white/[0.045] p-5"
    >
      <div className="grid h-10 w-10 place-items-center rounded-lg border border-white/12 bg-white/[0.06]">
        <Icon size={18} strokeWidth={1.9} className="text-white/78" aria-hidden="true" />
      </div>
      <h3 className="mt-5 break-words text-lg font-semibold leading-snug text-white">{title}</h3>
      <p className="mt-3 break-words text-sm leading-6 text-white/62">{copy}</p>
    </motion.article>
  );
}

function TenActionTile({ action, index, selected, shouldReduceMotion }) {
  const Icon = actionIcon(action);

  return (
    <motion.article
      variants={fadeUp(shouldReduceMotion)}
      className={`flex min-h-[148px] min-w-0 flex-col rounded-lg border p-4 ${
        selected
          ? "border-sky-100/28 bg-sky-100/[0.08]"
          : "border-white/10 bg-white/[0.035]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs font-semibold tabular-nums text-white/38">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Icon size={17} strokeWidth={1.9} className={selected ? "text-sky-100/84" : "text-white/42"} aria-hidden="true" />
      </div>
      <p className="mt-5 min-h-[40px] break-words text-sm font-semibold leading-5 text-white/74">{action}</p>
      {selected && (
        <p className="mt-auto inline-flex w-fit rounded-md border border-sky-100/18 bg-black/20 px-2.5 py-1 text-xs font-semibold text-sky-100/78">
          selected
        </p>
      )}
    </motion.article>
  );
}

function ActionReportCard({ action, index, shouldReduceMotion }) {
  const Icon = actionIcon(action.action);
  const metrics = getActionMetrics(action);
  const link = selectedActionLinks[index] || "./act-now.html";

  return (
    <motion.article
      variants={fadeUp(shouldReduceMotion)}
      whileHover={
        shouldReduceMotion
          ? undefined
          : { transform: "translate3d(0, -4px, 0)", transition: { duration: 0.18, ease: motionEase } }
      }
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-white/14 bg-white/[0.055] transition hover:border-sky-100/24 hover:bg-white/[0.07]"
    >
      <div className="flex h-full min-w-0 flex-col">
        <div className="relative aspect-[16/10] min-h-[210px] overflow-hidden bg-white/[0.035] sm:min-h-[240px]">
          <img src={action.image} alt={action.action} className="h-full w-full object-cover opacity-88" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="act-now-image-caption text-xs font-semibold leading-5 text-white/66">
              {action.imageCaption}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-black/22 px-3 py-1 text-xs font-semibold text-white/68">
              <Icon size={14} strokeWidth={1.9} aria-hidden="true" />
              {action.member}
            </span>
            <span className="rounded-full border border-white/14 bg-black/22 px-3 py-1 text-xs font-semibold text-white/48">
              {action.sdg}
            </span>
          </div>

          <h3 className="mt-5 break-words text-2xl font-semibold leading-tight text-white sm:text-3xl">
            {action.action}
          </h3>
          <p className="act-now-card-summary mt-4 text-sm leading-6 text-white/64">
            {action.explanation}
          </p>

          <div className="mt-6 grid min-w-0 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-black/18 p-3">
              <p className="text-xs font-semibold text-white/42">Baseline</p>
              <p className="mt-2 break-words text-xl font-semibold text-white">{metrics.before.toFixed(2)}t</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/18 p-3">
              <p className="text-xs font-semibold text-white/42">After</p>
              <p className="mt-2 break-words text-xl font-semibold text-emerald-200/90">{metrics.after.toFixed(2)}t</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/18 p-3">
              <p className="text-xs font-semibold text-white/42">Screens</p>
              <p className={`mt-2 break-words text-xl font-semibold ${metrics.screenshots ? "text-white" : "text-amber-100/86"}`}>
                {metrics.screenshots || "Needed"}
              </p>
            </div>
          </div>

          <div className="mt-5 pb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-white/42">
              <span>per-capita reduction</span>
              <span>{metrics.reduction.toFixed(2)}t / {metrics.percent.toFixed(0)}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.08]">
              <motion.div
                className="h-full rounded-full bg-emerald-200/70"
                initial={{ width: "0%" }}
                whileInView={{ width: `${Math.min(metrics.percent, 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: motionEase }}
              />
            </div>
          </div>

          <a
            href={link}
            className="mt-auto inline-flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200"
          >
            Open full report
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function ActNowHub() {
  return (
    <StaticPageShell transitionKey="act-now-hub" activeHref="./act-now.html">
      {(shouldReduceMotion) => {
        const selectedNames = new Set(actNowContent.actions.map((action) => action.action));
        const totalScreenshots = actNowContent.actions.reduce(
          (sum, action) => sum + (action.calculator?.screenshots?.length || 0),
          0,
        );
        const averageReduction =
          actNowContent.actions.reduce((sum, action) => sum + getActionMetrics(action).reduction, 0) /
          Math.max(actNowContent.actions.length, 1);

        return (
          <div className="act-now-page">
            <section className="relative min-w-0 px-5 pt-12 pb-12 sm:px-8 sm:pt-18 sm:pb-16 lg:px-12 lg:pt-22">
              <motion.div
                initial="hidden"
                animate="show"
                variants={stagger(shouldReduceMotion, 0.08, 0.08)}
                className="mx-auto grid w-full max-w-7xl min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,460px)] lg:items-end"
              >
                <div className="min-w-0">
                  <motion.p variants={fadeUp(shouldReduceMotion)} className="text-sm font-semibold text-sky-100/78">
                    SDG Act Now
                  </motion.p>
                  <motion.h1
                    variants={fadeUp(shouldReduceMotion)}
                    className="mt-5 max-w-4xl break-words text-[clamp(2.15rem,8vw,5.6rem)] font-semibold leading-[1.02] text-white [overflow-wrap:anywhere]"
                  >
                    From carbon footprint to climate action proof.
                  </motion.h1>
                  <motion.p
                    variants={fadeUp(shouldReduceMotion)}
                    className="mt-6 max-w-2xl break-words text-base leading-7 text-white/72 sm:text-lg"
                  >
                    {actNowContent.subtitle}
                  </motion.p>
                </div>

                <motion.div
                  variants={fadeUp(shouldReduceMotion)}
                  className="min-w-0 max-w-full rounded-lg border border-white/14 bg-white/[0.06] p-5 sm:p-6"
                >
                  <p className="text-sm font-semibold text-white/78">Evidence snapshot</p>
                  <div className="mt-5 grid min-w-0 gap-3 sm:grid-cols-3">
                    <div className="min-w-0">
                      <p className="break-words text-3xl font-semibold text-white">{actNowContent.actions.length}</p>
                      <p className="mt-1 break-words text-xs leading-5 text-white/58">selected actions</p>
                    </div>
                    <div className="min-w-0">
                      <p className="break-words text-3xl font-semibold text-white">{totalScreenshots}</p>
                      <p className="mt-1 break-words text-xs leading-5 text-white/58">calculator screenshots</p>
                    </div>
                    <div className="min-w-0">
                      <p className="break-words text-3xl font-semibold text-white">{averageReduction.toFixed(1)}t</p>
                      <p className="mt-1 break-words text-xs leading-5 text-white/58">avg reduction</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </section>

            <section className="relative min-w-0 border-y border-white/12 bg-[#0d0d10] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-18">
              <motion.div
                initial="hidden"
                animate="show"
                variants={stagger(shouldReduceMotion)}
                className="mx-auto w-full max-w-7xl min-w-0"
              >
                <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-6 max-w-3xl">
                  <p className="text-sm font-semibold text-sky-100/78">Carbon footprint</p>
                  <h2 className="mt-3 break-words text-2xl font-semibold leading-tight text-white [overflow-wrap:anywhere] sm:text-4xl">
                    Measure direct and indirect emissions in CO2e.
                  </h2>
                  <p className="mt-4 break-words text-sm leading-6 text-white/68 sm:text-base">
                    {actNowContent.carbonFootprint}
                  </p>
                </motion.div>

                <div className="grid min-w-0 gap-4 md:grid-cols-3">
                  <StatCard
                    label="Target"
                    value="2t CO2e"
                    detail="A practical 2030 per-person benchmark used for comparison."
                    icon={Target}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                  <StatCard
                    label="Calculator"
                    value="Full process"
                    detail="Landing page, inputs, and final result screenshots are part of the evidence."
                    icon={Calculator}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                  <StatCard
                    label="Action"
                    value="Proof needed"
                    detail="The strongest section is dated evidence showing the action was completed."
                    icon={Camera}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </div>
              </motion.div>
            </section>

            <section className="relative min-w-0 px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-18">
              <motion.div
                initial="hidden"
                animate="show"
                variants={stagger(shouldReduceMotion)}
                className="mx-auto w-full max-w-7xl min-w-0"
              >
                <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-6 max-w-3xl">
                  <p className="text-sm font-semibold text-sky-100/78">Proof workflow</p>
                  <h2 className="mt-3 break-words text-2xl font-semibold leading-tight text-white [overflow-wrap:anywhere] sm:text-4xl">
                    The page now follows an evidence-first structure.
                  </h2>
                </motion.div>

                <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <ProofStep
                    icon={Footprints}
                    title="Choose one UN action"
                    copy="Each member should use a different UN Ten Action and explain its emission-reduction mechanism."
                    shouldReduceMotion={shouldReduceMotion}
                  />
                  <ProofStep
                    icon={Calculator}
                    title="Calculate the footprint"
                    copy="Show the calculator landing page, every input step, and the final CO2e result."
                    shouldReduceMotion={shouldReduceMotion}
                  />
                  <ProofStep
                    icon={ClipboardCheck}
                    title="Compare baseline and after"
                    copy="Use numbers to show whether the action moved the member closer to the 2t CO2e target."
                    shouldReduceMotion={shouldReduceMotion}
                  />
                  <ProofStep
                    icon={CheckCircle2}
                    title="Add dated action evidence"
                    copy="Photos, app logs, tickets, repaired items, or recycling records should prove the action was completed."
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </div>
              </motion.div>
            </section>

            <section className="relative min-w-0 border-y border-white/12 bg-[#0d0d10] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-18">
              <motion.div
                initial="hidden"
                animate="show"
                variants={stagger(shouldReduceMotion)}
                className="mx-auto w-full max-w-7xl min-w-0"
              >
                <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-6 max-w-3xl">
                  <p className="text-sm font-semibold text-sky-100/78">UN Ten Actions</p>
                  <h2 className="mt-3 break-words text-2xl font-semibold leading-tight text-white [overflow-wrap:anywhere] sm:text-4xl">
                    Selected actions are highlighted for the group.
                  </h2>
                </motion.div>

                <div className="grid min-w-0 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {tenActNowActions.map((action, index) => (
                    <TenActionTile
                      key={action}
                      action={action}
                      index={index}
                      selected={selectedNames.has(action)}
                      shouldReduceMotion={shouldReduceMotion}
                    />
                  ))}
                </div>
              </motion.div>
            </section>

            <section className="relative min-w-0 px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-18">
              <motion.div
                initial="hidden"
                animate="show"
                variants={stagger(shouldReduceMotion)}
                className="mx-auto w-full max-w-7xl min-w-0"
              >
                <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-7 max-w-3xl">
                  <p className="text-sm font-semibold text-sky-100/78">Selected action reports</p>
                  <h2 className="mt-3 break-words text-2xl font-semibold leading-tight text-white [overflow-wrap:anywhere] sm:text-4xl">
                    Each report links purpose, evidence, and carbon reduction.
                  </h2>
                </motion.div>

                <div className="grid min-w-0 items-stretch gap-5 lg:grid-cols-2">
                  {actNowContent.actions.map((action, index) => (
                    <ActionReportCard
                      key={action.action}
                      action={action}
                      index={index}
                      shouldReduceMotion={shouldReduceMotion}
                    />
                  ))}
                </div>
              </motion.div>
            </section>

            <section id="references" className="relative min-w-0 border-t border-white/10 px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-18">
              <motion.div
                initial="hidden"
                animate="show"
                variants={stagger(shouldReduceMotion)}
                className="mx-auto w-full max-w-7xl min-w-0"
              >
                <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-6 max-w-3xl">
                  <p className="text-sm font-semibold text-sky-100/78">References</p>
                  <h2 className="mt-3 break-words text-2xl font-semibold leading-tight text-white [overflow-wrap:anywhere] sm:text-4xl">
                    Sources used for the Act Now section.
                  </h2>
                </motion.div>

                <ol className="max-w-4xl space-y-4 text-sm leading-6 text-white/62 [counter-reset:ref]">
                  {actNowContent.references.map((ref) => (
                    <motion.li
                      key={ref}
                      variants={fadeUp(shouldReduceMotion)}
                      className="flex min-w-0 gap-4 [counter-increment:ref] before:shrink-0 before:font-mono before:text-xs before:font-semibold before:text-white/32 before:content-[counter(ref,decimal-leading-zero)]"
                    >
                      <span className="min-w-0 break-words">{ref}</span>
                    </motion.li>
                  ))}
                </ol>
              </motion.div>
            </section>
          </div>
        );
      }}
    </StaticPageShell>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ActNowHub />
  </React.StrictMode>,
);
