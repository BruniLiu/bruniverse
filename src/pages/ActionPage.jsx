import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calculator,
  Camera,
  CheckCircle2,
  ClipboardCheck,
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

function EvidenceImage({ src, alt, initials = "JH" }) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        className="h-16 w-16 shrink-0 rounded-lg border border-white/14 object-cover"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg border border-dashed border-white/18 bg-white/[0.04] px-2 text-center">
      <span className="text-[10px] font-semibold uppercase leading-4 text-white/38">
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
      className="rounded-lg border border-white/12 bg-white/[0.055] p-5"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-white/58">{label}</p>
        <Icon size={18} strokeWidth={1.9} className="text-sky-100/72" aria-hidden="true" />
      </div>
      <p className="mt-5 text-3xl font-semibold leading-none text-white">{value}</p>
      <p className="mt-3 text-sm leading-6 text-white/58">{detail}</p>
    </motion.article>
  );
}

function TextBlock({ eyebrow, title, copy, shouldReduceMotion }) {
  return (
    <motion.div variants={fadeUp(shouldReduceMotion)} className="max-w-3xl">
      <p className="text-sm font-semibold text-sky-100/76">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-5 text-base leading-7 text-white/66">{copy}</p>
    </motion.div>
  );
}

function EvidenceCard({ solution, index, shouldReduceMotion }) {
  return (
    <motion.article
      variants={fadeUp(shouldReduceMotion)}
      className="rounded-lg border border-white/12 bg-white/[0.045] p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-xs font-semibold tabular-nums text-white/34">
          {String(index + 1).padStart(2, "0")}
        </p>
        <Camera size={17} strokeWidth={1.9} className="text-white/42" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-xl font-semibold leading-tight text-white">{solution.title}</h3>
      <p className="mt-4 text-sm leading-6 text-white/58">{solution.desc}</p>
      <div className="mt-6 border-t border-white/10 pt-5">
        <div className="flex gap-4">
          <EvidenceImage src={solution.evidenceImage} alt={`${solution.title} evidence`} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/32">
              Evidence attachment
            </p>
            <p className="mt-2 text-sm leading-6 text-white/54">{solution.evidence}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ActionPage({ data }) {
  const metrics = getMetrics(data);

  return (
    <StaticPageShell transitionKey={data.id} activeHref="./act-now.html">
      {(shouldReduceMotion) => (
        <>
          <section className="relative px-5 pt-10 pb-12 sm:px-8 sm:pt-16 sm:pb-16 lg:px-12 lg:pt-20">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger(shouldReduceMotion, 0.08, 0.08)}
              className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,470px)] lg:items-end"
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
                  className="mt-5 max-w-4xl break-words text-[clamp(2.35rem,8vw,5.2rem)] font-semibold leading-[0.98] text-white"
                >
                  {data.action}
                </motion.h1>
                <motion.p
                  variants={fadeUp(shouldReduceMotion)}
                  className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg"
                >
                  {data.explanation}
                </motion.p>
              </div>

              <motion.figure
                variants={fadeUp(shouldReduceMotion)}
                className="overflow-hidden rounded-lg border border-white/12 bg-white/[0.04]"
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
              className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4"
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
                    ? "Screenshots document the calculator landing page, inputs, and final result."
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
              className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]"
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
              <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-7 max-w-3xl">
                <p className="text-sm font-semibold text-sky-100/76">Co-benefits</p>
                <h2 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-4xl">
                  The action creates environmental and social value together.
                </h2>
              </motion.div>
              <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
                {data.coBenefits.map((benefit, index) => (
                  <motion.article key={benefit.title} variants={fadeUp(shouldReduceMotion)} className="flex gap-4">
                    <span className="mt-1 font-mono text-sm font-semibold tabular-nums text-white/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white/86">{benefit.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/56">{benefit.desc}</p>
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
                <motion.div variants={fadeUp(shouldReduceMotion)} className="mb-7 max-w-3xl">
                  <p className="text-sm font-semibold text-sky-100/76">Evidence and offset plan</p>
                  <h2 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-4xl">
                    Action claims need implementation records.
                  </h2>
                  <p className="mt-4 text-base leading-7 text-white/62">
                    These records connect the chosen UN action with implementation details, supporting evidence, and a credibility explanation. Add dated photos, app logs, tickets, repair records, or recycling receipts before final submission.
                  </p>
                </motion.div>
                <div className="grid gap-4 md:grid-cols-3">
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
                    Source: United Nations online platform for voluntary cancellation of certified emission reductions (CERs)
                  </figcaption>
                </motion.figure>
              )}

              <CarbonFootprintCalculator staticData={data.calculator} />

              {data.calculator.screenshots && data.calculator.screenshots.length > 0 ? (
                <motion.div variants={fadeUp(shouldReduceMotion)} className="mt-12">
                  <div className="mb-5 flex items-center gap-3">
                    <ClipboardCheck size={18} strokeWidth={1.9} className="text-white/58" aria-hidden="true" />
                    <p className="text-sm font-semibold text-white/66">
                      Calculator screenshots: landing page, inputs, and final result
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {data.calculator.screenshots.map((src, index) => (
                      <figure key={src} className="overflow-hidden rounded-lg border border-white/10 bg-black/18">
                        <img src={src} alt={`Calculator screenshot ${index + 1}`} className="aspect-[16/10] w-full object-contain" loading="lazy" />
                      </figure>
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-5 text-white/34">
                    Source: United Nations online platform for voluntary cancellation of certified emission reductions (CERs)
                  </p>
                </motion.div>
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
                {data.references.map((ref) => (
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
