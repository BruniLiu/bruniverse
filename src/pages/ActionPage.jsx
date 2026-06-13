import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calculator,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  Gauge,
  Leaf,
  Target,
} from "lucide-react";
import CarbonFootprintCalculator from "../components/calculator/CarbonFootprintCalculator";
import { fadeUp, motionEase, StaticPageShell, stagger } from "./AssessmentLayout";

function toNumber(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getMetrics(data) {
  const before = toNumber(data.calculator?.before?.perCapita);
  const after = toNumber(data.calculator?.after?.perCapita);
  const reduction = Math.max(before - after, 0);
  const percent = before > 0 ? (reduction / before) * 100 : 0;

  return {
    before,
    after,
    reduction,
    percent,
    screenshots: data.calculator?.screenshots?.length || 0,
  };
}

function EvidenceImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        className="aspect-[4/3] w-full rounded-lg border border-white/14 bg-black/30 object-cover"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className="grid aspect-[4/3] w-full place-items-center rounded-lg border border-dashed border-white/18 bg-white/[0.04] px-4 text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/38">
        Evidence pending
      </span>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, detail, shouldReduceMotion }) {
  return (
    <motion.article
      variants={fadeUp(shouldReduceMotion)}
      whileHover={
        shouldReduceMotion
          ? undefined
          : { transform: "translate3d(0, -3px, 0)", transition: { duration: 0.18, ease: motionEase } }
      }
      className="min-w-0 rounded-lg border border-white/12 bg-white/[0.055] p-5"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="min-w-0 text-sm font-semibold text-white/58">{label}</p>
        <Icon size={18} strokeWidth={1.9} className="text-sky-100/72" aria-hidden="true" />
      </div>
      <p className="mt-5 text-3xl font-semibold leading-none text-white">{value}</p>
      <p className="mt-3 min-w-0 break-words text-sm leading-6 text-white/58">{detail}</p>
    </motion.article>
  );
}

function TextBlock({ eyebrow, title, copy, shouldReduceMotion }) {
  return (
    <motion.div variants={fadeUp(shouldReduceMotion)} className="min-w-0 max-w-3xl">
      <p className="text-sm font-semibold text-sky-100/76">{eyebrow}</p>
      <h2 className="mt-3 break-words text-2xl font-semibold leading-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-5 break-words text-base leading-7 text-white/66">{copy}</p>
    </motion.div>
  );
}

function TargetComparison({ metrics, evidence, shouldReduceMotion }) {
  const target = 2;
  const calculatorResult = toNumber(evidence?.totalTonnes) || metrics.after;
  const resultGap = calculatorResult - target;
  const progress = calculatorResult > 0 ? Math.min((target / calculatorResult) * 100, 100) : 0;
  const targetMessage =
    calculatorResult <= target
      ? `The official calculator result is ${Math.abs(resultGap).toFixed(2)}t below the 2t CO2e/year benchmark.`
      : `The official calculator result is still ${resultGap.toFixed(2)}t above the 2t CO2e/year benchmark, so the selected action is treated as one step in a longer reduction pathway.`;

  return (
    <motion.div
      variants={fadeUp(shouldReduceMotion)}
      className="mt-10 grid gap-4 rounded-lg border border-white/12 bg-white/[0.045] p-5 sm:p-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <Target size={18} strokeWidth={1.9} className="text-sky-100/70" aria-hidden="true" />
          <p className="text-sm font-semibold text-sky-100/76">2030 2t benchmark</p>
        </div>
        <p className="mt-4 text-3xl font-semibold tabular-nums text-white">{calculatorResult.toFixed(2)}t</p>
        <p className="mt-2 text-sm leading-6 text-white/58">official calculator result per capita</p>
      </div>
      <div className="min-w-0">
        <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.12em] text-white/34">
          <span>share of 2t pathway reached</span>
          <span className="tabular-nums">{progress.toFixed(0)}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.08]">
          <motion.div
            className="h-full rounded-full bg-sky-100/58"
            initial={{ width: "0%" }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.7, ease: motionEase }}
          />
        </div>
        <p className="mt-4 break-words text-sm leading-6 text-white/62">{targetMessage}</p>
      </div>
    </motion.div>
  );
}

function UnfcccEvidence({ evidence, shouldReduceMotion }) {
  if (!evidence) return null;

  return (
    <motion.div
      variants={fadeUp(shouldReduceMotion)}
      className="mt-10 overflow-hidden rounded-lg border border-white/12 bg-white/[0.045]"
    >
      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-sky-100/76">UNFCCC calculator evidence</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
            {evidence.totalTonnes} tonnes CO2e per year
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/58">{evidence.note}</p>
          <p className="mt-3 rounded-lg border border-sky-100/14 bg-sky-100/[0.055] px-4 py-3 text-xs leading-5 text-sky-50/70">
            {evidence.sourceNote}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={evidence.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-sky-100"
            >
              Open calculator
              <ExternalLink size={15} strokeWidth={2} aria-hidden="true" />
            </a>
            <a
              href={evidence.methodologyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/14 px-4 py-2.5 text-sm font-semibold text-white/72 transition hover:border-white/28 hover:text-white"
            >
              Methodology PDF
              <ExternalLink size={15} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/36">Sector breakdown</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {evidence.sectors.map((sector) => (
              <div key={sector.label} className="rounded-lg border border-white/10 bg-black/18 px-4 py-3">
                <p className="text-xs font-semibold text-white/40">{sector.label}</p>
                <p className="mt-2 text-xl font-semibold text-white">{sector.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-white/36">
            Scenario generated on {evidence.generatedAt}; exact result: {evidence.totalKg} kg CO2e/year.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/36">Input assumptions</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {evidence.assumptions.map((item) => (
            <p key={item} className="rounded-lg border border-white/10 bg-black/16 px-3 py-2 text-xs leading-5 text-white/54">
              {item}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function EvidenceCard({ solution, index, shouldReduceMotion }) {
  return (
    <motion.article
      variants={fadeUp(shouldReduceMotion)}
      className="min-w-0 rounded-lg border border-white/12 bg-white/[0.045] p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-xs font-semibold tabular-nums text-white/34">
          {String(index + 1).padStart(2, "0")}
        </p>
        <Camera size={17} strokeWidth={1.9} className="text-white/42" aria-hidden="true" />
      </div>
      <h3 className="mt-5 break-words text-xl font-semibold leading-tight text-white">{solution.title}</h3>
      <div className="mt-5 overflow-hidden rounded-lg">
        <EvidenceImage src={solution.evidenceImage} alt={`${solution.title} evidence`} />
      </div>
      <p className="mt-4 break-words text-sm leading-6 text-white/58">{solution.desc}</p>
      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/32">
          Personal evidence
        </p>
        <p className="mt-2 break-words text-sm leading-6 text-white/54">{solution.evidence}</p>
      </div>
      {solution.credibility && (
        <div className="mt-5 rounded-lg border border-sky-100/12 bg-sky-100/[0.045] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sky-100/48">
            Why this counts
          </p>
          <p className="mt-2 break-words text-sm leading-6 text-white/58">{solution.credibility}</p>
        </div>
      )}
    </motion.article>
  );
}

function CalculatorScreenshotEvidence({ screenshots = [], evidence, sourceLabel, shouldReduceMotion }) {
  if (!screenshots.length) return null;

  const finalScreenshot = evidence?.resultImage || screenshots[screenshots.length - 1];
  const processScreenshots = screenshots.filter((src) => src !== finalScreenshot);
  const labels = [
    {
      title: "CO2e introduction",
      detail: "The member confirms the calculator's carbon-footprint definition.",
    },
    {
      title: "Country",
      detail: "Country of residence is selected for the individual scenario.",
    },
    {
      title: "Renewable electricity",
      detail: "Home-energy assumptions are recorded.",
    },
    {
      title: "Heating",
      detail: "Primary home heating source is selected.",
    },
    {
      title: "Cooking gas",
      detail: "Cooking-energy input is recorded.",
    },
    {
      title: "Car ownership",
      detail: "Private-car access is recorded.",
    },
    {
      title: "Flights",
      detail: "Short, medium, and long return flights are entered.",
    },
    {
      title: "Public transport",
      detail: "Daily public-transport minutes are entered.",
    },
    {
      title: "Lifestyle spending",
      detail: "Selected annual spending categories are entered.",
    },
    {
      title: "Appliances",
      detail: "New appliance purchases are entered.",
    },
    {
      title: "Clothing and shoes",
      detail: "New and second-hand clothing choices are entered.",
    },
    {
      title: "Diet",
      detail: "The member's diet profile is selected.",
    },
    {
      title: "Submit result",
      detail: "The calculator is submitted to show the footprint result.",
    },
  ];

  return (
    <motion.div variants={fadeUp(shouldReduceMotion)} className="mt-12">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <ClipboardCheck size={18} strokeWidth={1.9} className="text-white/58" aria-hidden="true" />
            <p className="text-sm font-semibold text-white/66">
              Calculator process and final result
            </p>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/46">
            The process screenshots show this member's official calculator workflow step by step. The larger final screenshot is member-specific, and the input assumptions above identify the individual scenario behind the result.
          </p>
        </div>
        <p className="rounded-full border border-white/12 px-3 py-1 text-xs font-semibold text-white/42">
          {screenshots.length} screenshots
        </p>
      </div>

      <div className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_190px] lg:items-center">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/34">Official calculator evidence</p>
          <p className="mt-3 max-w-3xl break-words text-sm leading-6 text-white/58">
            Final result and all process screenshots are attached as evidence. The visual proof is kept collapsed so the report remains readable.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-black/18 px-3 py-1.5 text-xs font-semibold text-white/50">
              {processScreenshots.length} process steps
            </span>
            <span className="rounded-full border border-white/10 bg-black/18 px-3 py-1.5 text-xs font-semibold text-white/50">
              1 final result
            </span>
            <span className="rounded-full border border-white/10 bg-black/18 px-3 py-1.5 text-xs font-semibold text-white/50">
              {sourceLabel || evidence?.sourceLabel || "UN calculator"}
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/20 p-4 text-left lg:text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/34">Result</p>
          <p className="mt-3 text-4xl font-semibold leading-none text-white">{evidence?.totalTonnes || "--"}t</p>
          <p className="mt-2 text-xs leading-5 text-white/42">tonnes CO2e/year</p>
        </div>
      </div>

      <details className="group mt-4 rounded-lg border border-white/10 bg-white/[0.035]">
        <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5">
          <div>
            <p className="text-sm font-semibold text-white/70">Open calculator screenshot evidence</p>
            <p className="mt-1 text-xs leading-5 text-white/42">
              Includes the final official result screenshot and every process step.
            </p>
          </div>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/38 transition group-open:border-sky-100/22 group-open:text-sky-100/64">
            {screenshots.length} screenshots
          </span>
        </summary>

        <div className="border-t border-white/10 p-4 sm:p-5">
          <figure className="min-w-0 overflow-hidden rounded-lg border border-white/12 bg-white">
            <div className="grid max-h-[430px] place-items-center overflow-hidden bg-white p-3">
            <img
              src={finalScreenshot}
              alt={`${evidence?.title || "Final calculator result"} screenshot`}
              className="max-h-[400px] w-full object-contain"
              loading="lazy"
            />
            </div>
            <figcaption className="border-t border-black/10 bg-white px-4 py-3 text-xs leading-5 text-black/56">
              Final result screenshot: {evidence?.totalTonnes || "--"} tonnes CO2e/year.
            </figcaption>
          </figure>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {processScreenshots.map((src, index) => {
            const label = labels[index] || {
              title: `Input evidence ${index + 1}`,
              detail: "Calculator process screenshot.",
            };
            return (
              <figure
                key={src}
                className="min-w-0 overflow-hidden rounded-lg border border-white/10 bg-black/18"
              >
                <div className="grid aspect-[16/10] place-items-center bg-white p-1.5">
                  <img
                    src={src}
                    alt={`${label.title} calculator screenshot`}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <figcaption className="min-h-[96px] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-xs font-semibold tabular-nums text-white/32">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-100/44" />
                  </div>
                  <p className="mt-2 break-words text-sm font-semibold leading-5 text-white/78">{label.title}</p>
                  <p className="mt-1 break-words text-xs leading-5 text-white/44">{label.detail}</p>
                </figcaption>
              </figure>
            );
          })}
          </div>
        </div>
      </details>

      <p className="mt-4 text-xs leading-5 text-white/34">
        Source: {sourceLabel || evidence?.sourceLabel || "United Nations carbon footprint calculator"}
      </p>
    </motion.div>
  );
}

export default function ActionPage({ data }) {
  const metrics = getMetrics(data);
  const evidenceCount = data.offsetSolutions?.length || 0;
  const evidenceGridClass =
    evidenceCount <= 1
      ? "grid min-w-0 gap-4 md:max-w-lg"
      : evidenceCount === 2
        ? "grid min-w-0 gap-4 md:grid-cols-2 lg:max-w-4xl"
        : "grid min-w-0 gap-4 md:grid-cols-3";
  const references = Array.from(
    new Set([...(data.references || []), ...(data.calculator?.unfcccEvidence?.references || [])]),
  );

  return (
    <StaticPageShell transitionKey={data.id} activeHref="./act-now.html">
      {(shouldReduceMotion) => (
        <>
          <section className="relative px-5 pt-10 pb-12 sm:px-8 sm:pt-16 sm:pb-16 lg:px-12 lg:pt-20">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger(shouldReduceMotion, 0.08, 0.08)}
              className="mx-auto grid w-full min-w-0 max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,470px)] lg:items-end"
            >
              <div className="min-w-0">
                <motion.a
                  variants={fadeUp(shouldReduceMotion)}
                  href="./act-now.html"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/54 transition hover:text-white"
                >
                  <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
                  Back to Act Now
                </motion.a>
                <motion.p variants={fadeUp(shouldReduceMotion)} className="mt-8 text-sm font-semibold text-sky-100/78">
                  {data.member} / {data.sdg}
                </motion.p>
                <motion.h1
                  variants={fadeUp(shouldReduceMotion)}
                  className="mt-5 max-w-full break-words text-4xl font-semibold leading-[1.02] text-white [overflow-wrap:anywhere] sm:text-6xl lg:max-w-4xl lg:text-[5.2rem] lg:leading-[0.98]"
                >
                  {data.action}
                </motion.h1>
                <motion.p
                  variants={fadeUp(shouldReduceMotion)}
                  className="mt-6 max-w-2xl break-words text-base leading-7 text-white/70 sm:text-lg"
                >
                  {data.explanation}
                </motion.p>
              </div>

              <motion.figure
                variants={fadeUp(shouldReduceMotion)}
                className="min-w-0 overflow-hidden rounded-lg border border-white/12 bg-white/[0.04]"
              >
                <img src={data.image} alt={data.action} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                <figcaption className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-white/42">
                  {data.imageCaption}
                </figcaption>
              </motion.figure>
            </motion.div>
          </section>

          <section className="relative border-y border-white/12 bg-[#0d0d10] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger(shouldReduceMotion)}
              className="mx-auto grid w-full min-w-0 max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4"
            >
              <SummaryCard
                icon={Gauge}
                label="Baseline"
                value={`${metrics.before.toFixed(2)}t`}
                detail="Per-capita annual emissions before the selected action."
                shouldReduceMotion={shouldReduceMotion}
              />
              <SummaryCard
                icon={Leaf}
                label="After action"
                value={`${metrics.after.toFixed(2)}t`}
                detail="Per-capita annual emissions after behaviour changes."
                shouldReduceMotion={shouldReduceMotion}
              />
              <SummaryCard
                icon={Target}
                label="Reduction"
                value={`${metrics.reduction.toFixed(2)}t`}
                detail={`${metrics.percent.toFixed(0)}% lower than the baseline result.`}
                shouldReduceMotion={shouldReduceMotion}
              />
              <SummaryCard
                icon={Calculator}
                label="Calculator proof"
                value={metrics.screenshots ? String(metrics.screenshots) : "Needed"}
                detail={
                  metrics.screenshots
                    ? "Screenshots document the official workflow, input context, and final result."
                    : "Calculator screenshots still need to be attached before submission."
                }
                shouldReduceMotion={shouldReduceMotion}
              />
            </motion.div>
          </section>

          <section id="action-detail" className="relative px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger(shouldReduceMotion)}
              className="mx-auto grid w-full min-w-0 max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]"
            >
              <TextBlock
                eyebrow="Action mechanism"
                title="How this action lowers emissions"
                copy={data.mechanism}
                shouldReduceMotion={shouldReduceMotion}
              />
              <TextBlock
                eyebrow="Implementation"
                title="How it can be practised in daily life"
                copy={data.example}
                shouldReduceMotion={shouldReduceMotion}
              />
            </motion.div>
          </section>

          <section className="relative border-y border-white/12 bg-[#0d0d10] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger(shouldReduceMotion)}
              className="mx-auto max-w-7xl"
            >
              <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-7 min-w-0 max-w-3xl">
                <p className="text-sm font-semibold text-sky-100/76">Co-benefits</p>
                <h2 className="mt-3 break-words text-2xl font-semibold leading-tight text-white sm:text-4xl">
                  The action creates environmental and social value together.
                </h2>
              </motion.div>
              <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
                {data.coBenefits.map((benefit, index) => (
                  <motion.article key={benefit.title} variants={fadeUp(shouldReduceMotion)} className="flex min-w-0 gap-4">
                    <span className="mt-1 font-mono text-sm font-semibold tabular-nums text-white/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="break-words text-base font-semibold text-white/86">{benefit.title}</h3>
                      <p className="mt-2 break-words text-sm leading-6 text-white/56">{benefit.desc}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </section>

          {data.offsetSolutions && data.offsetSolutions.length > 0 && (
            <section id="offset-solutions" className="relative px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
              <motion.div
                initial="hidden"
                animate="show"
                variants={stagger(shouldReduceMotion)}
                className="mx-auto max-w-7xl"
              >
                <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-7 min-w-0 max-w-3xl">
                  <p className="text-sm font-semibold text-sky-100/76">Action records and evidence</p>
                  <h2 className="mt-3 break-words text-2xl font-semibold leading-tight text-white sm:text-4xl">
                    Action claims need implementation records.
                  </h2>
                  <p className="mt-4 break-words text-base leading-7 text-white/62">
                    These records connect the chosen UN action with implementation details, dated evidence, and an explanation of why each behaviour reduces or avoids emissions. The aim is to show completed behaviour change rather than only a future intention.
                  </p>
                  {data.reductionPathway && (
                    <p className="mt-4 break-words rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white/58">
                      {data.reductionPathway}
                    </p>
                  )}
                </motion.div>
                <div className={evidenceGridClass}>
                  {data.offsetSolutions.map((solution, index) => (
                    <EvidenceCard
                      key={solution.title}
                      solution={solution}
                      index={index}
                      shouldReduceMotion={shouldReduceMotion}
                    />
                  ))}
                </div>
              </motion.div>
            </section>
          )}

          <section id="calculator" className="relative border-y border-white/12 bg-[#0d0d10] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger(shouldReduceMotion)}
              className="mx-auto max-w-7xl"
            >
              <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-8 max-w-3xl">
                <p className="text-sm font-semibold text-sky-100/76">Carbon Footprint Calculator</p>
                <h2 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-4xl">
                  The numerical result supports the personal response.
                </h2>
                {data.calculator.description && (
                  <p className="mt-4 text-base leading-7 text-white/62">{data.calculator.description}</p>
                )}
              </motion.div>

              {data.calculator.calculatorImage && (
                <motion.figure variants={fadeUp(shouldReduceMotion)} className="mb-10 overflow-hidden rounded-lg border border-white/12 bg-black/18 p-3">
                  <img
                    src={data.calculator.calculatorImage}
                    alt="Carbon Footprint Calculator"
                    className="max-h-[420px] w-full object-contain"
                    loading="lazy"
                  />
                  <figcaption className="mt-3 text-xs leading-5 text-white/36">
                    Source: {data.calculator.sourceLabel || "United Nations carbon footprint calculator"}
                  </figcaption>
                </motion.figure>
              )}

              <CarbonFootprintCalculator staticData={data.calculator} />

              <TargetComparison
                metrics={metrics}
                evidence={data.calculator.unfcccEvidence}
                shouldReduceMotion={shouldReduceMotion}
              />

              <UnfcccEvidence evidence={data.calculator.unfcccEvidence} shouldReduceMotion={shouldReduceMotion} />

              {data.calculator.screenshots && data.calculator.screenshots.length > 0 ? (
                <CalculatorScreenshotEvidence
                  screenshots={data.calculator.screenshots}
                  evidence={data.calculator.unfcccEvidence}
                  sourceLabel={data.calculator.sourceLabel}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ) : (
                <motion.div
                  variants={fadeUp(shouldReduceMotion)}
                  className="mt-12 rounded-lg border border-amber-200/18 bg-amber-200/[0.055] p-5"
                >
                  <div className="flex items-center gap-3">
                    <ClipboardCheck size={18} strokeWidth={1.9} className="text-amber-100/70" aria-hidden="true" />
                    <p className="text-sm font-semibold text-amber-50/82">
                      Calculator screenshots still needed
                    </p>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      "Calculator landing page",
                      "All input steps",
                      "Final CO2e result",
                    ].map((item) => (
                      <div key={item} className="rounded-lg border border-white/10 bg-black/18 px-4 py-3 text-sm font-semibold text-white/62">
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </section>

          <section id="references" className="relative px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger(shouldReduceMotion, 0.03)}
              className="mx-auto max-w-7xl"
            >
              <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-7 max-w-3xl">
                <p className="text-sm font-semibold text-sky-100/76">References</p>
                <h2 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-4xl">
                  Sources used for this action report.
                </h2>
              </motion.div>
              <ol className="max-w-4xl space-y-4 text-sm leading-6 text-white/58 [counter-reset:ref]">
                {references.map((ref) => (
                  <motion.li
                    key={ref}
                    variants={fadeUp(shouldReduceMotion)}
                    className="flex min-w-0 gap-4 [counter-increment:ref] before:shrink-0 before:font-mono before:text-xs before:font-semibold before:text-white/30 before:content-[counter(ref,decimal-leading-zero)]"
                  >
                    <CheckCircle2 size={16} strokeWidth={1.8} className="mt-1 shrink-0 text-white/24" aria-hidden="true" />
                    <span className="min-w-0 break-words">{ref}</span>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </section>
        </>
      )}
    </StaticPageShell>
  );
}
