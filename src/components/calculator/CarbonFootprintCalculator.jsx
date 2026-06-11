import { useCallback, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const motionEase = [0.23, 1, 0.32, 1];

const fadeUp = (shouldReduceMotion, delay = 0) => ({
  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: shouldReduceMotion ? 0.1 : 0.6, ease: motionEase, delay },
  },
});

const CAR_PER_KM_PER_YEAR = 365 * 0.0002;
const FLIGHT_PER_TRIP = 0.6;
const DIET_FACTORS = { "meat-heavy": 3.5, average: 2.0, vegetarian: 1.0, vegan: 0.3 };
const HOME_FACTORS = { "low-efficiency": 4.0, average: 2.2, "well-insulated": 1.1, "well+renewable": 0.4 };
const BASELINE_PER_PERSON = 1.5;
const UN_TARGET = 2.0;

const DIET_OPTIONS = [
  { key: "meat-heavy", label: "Meat-heavy" },
  { key: "average", label: "Average" },
  { key: "vegetarian", label: "Vegetarian" },
  { key: "vegan", label: "Vegan" },
];

const HOME_OPTIONS = [
  { key: "low-efficiency", label: "Low efficiency" },
  { key: "average", label: "Average" },
  { key: "well-insulated", label: "Well insulated" },
  { key: "well+renewable", label: "+ Renewable" },
];

function calculateFootprint(inputs) {
  const perCapitaCar = (inputs.carDailyKm * CAR_PER_KM_PER_YEAR) / inputs.householdSize;
  const perCapitaFlight = inputs.annualFlights * FLIGHT_PER_TRIP;
  const perCapitaDiet = DIET_FACTORS[inputs.dietType];
  const perCapitaHome = HOME_FACTORS[inputs.homeEnergy] / inputs.householdSize;
  const perCapitaBaseline = BASELINE_PER_PERSON;
  const totalPerCapita =
    perCapitaCar + perCapitaFlight + perCapitaDiet + perCapitaHome + perCapitaBaseline;

  return {
    totalPerCapita,
    totalHousehold: totalPerCapita * inputs.householdSize,
    perCapitaCar,
    perCapitaFlight,
    perCapitaDiet,
    perCapitaHome,
    perCapitaBaseline,
    pctOfTarget: (totalPerCapita / UN_TARGET) * 100,
    vsTarget: totalPerCapita - UN_TARGET,
  };
}

function buildBreakdown(r) {
  return [
    { label: "Car travel", value: r.perCapitaCar },
    { label: "Flights", value: r.perCapitaFlight },
    { label: "Diet", value: r.perCapitaDiet },
    { label: "Home energy", value: r.perCapitaHome },
    { label: "Goods and services", value: r.perCapitaBaseline },
  ];
}

function SliderInput({ label, value, onChange, min, max, step, unit, shouldReduceMotion }) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <motion.div variants={fadeUp(shouldReduceMotion)} className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/65">{label}</span>
        <span className="text-sm font-semibold tabular-nums text-white/50">
          {value} {unit}
        </span>
      </div>
      <div className="relative">
        <div
          className="pointer-events-none absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/25"
          style={{ left: 0, width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="range-slider h-1 w-full cursor-pointer appearance-none rounded-full bg-white/[0.08] accent-white
            [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white
            [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10
            [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-110
            [&::-webkit-slider-thumb]:active:scale-95"
        />
      </div>
    </motion.div>
  );
}

function SegmentedControl({ label, options, value, onChange, shouldReduceMotion }) {
  return (
    <motion.div variants={fadeUp(shouldReduceMotion)} className="space-y-2.5">
      <span className="text-sm font-medium text-white/65">{label}</span>
      <div className="inline-flex w-full flex-wrap rounded-lg bg-white/[0.04] p-0.5" role="radiogroup" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            role="radio"
            aria-checked={value === option.key}
            onClick={() => onChange(option.key)}
            className={`flex-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all duration-200 sm:px-3 sm:py-2 sm:text-sm ${
              value === option.key ? "bg-white/[0.12] text-white" : "text-white/40 hover:text-white/65"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function BreakdownBar({ item, maxValue, shouldReduceMotion }) {
  const pct = maxValue > 0 ? (item.value / maxValue) * 100 : 0;

  return (
    <motion.div variants={fadeUp(shouldReduceMotion)} className="space-y-1.5">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-white/65">{item.label}</span>
        <span className="text-sm font-semibold tabular-nums text-white/45">
          {item.value.toFixed(2)} t
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full bg-white/30"
          initial={{ width: "0%" }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: motionEase, delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
}

export default function CarbonFootprintCalculator({ staticData }) {
  const shouldReduceMotion = useReducedMotion();
  const [inputs, setInputs] = useState({
    householdSize: 4,
    carDailyKm: 30,
    annualFlights: 2,
    dietType: "average",
    homeEnergy: "average",
  });

  const results = useMemo(() => calculateFootprint(inputs), [inputs]);
  const breakdown = useMemo(() => buildBreakdown(results), [results]);
  const maxBreakdown = useMemo(() => Math.max(...breakdown.map((item) => item.value)), [breakdown]);
  const update = useCallback((key) => (value) => setInputs((prev) => ({ ...prev, [key]: value })), []);
  const isBelowTarget = results.totalPerCapita <= UN_TARGET;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      className="space-y-14 sm:space-y-16"
    >
      <motion.div variants={fadeUp(shouldReduceMotion)}>
        <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
          Your lifestyle
        </p>

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-14 sm:gap-y-9">
          <SliderInput
            label="Household size"
            value={inputs.householdSize}
            onChange={update("householdSize")}
            min={1}
            max={6}
            step={1}
            unit="people"
            shouldReduceMotion={shouldReduceMotion}
          />
          <SliderInput
            label="Daily car travel"
            value={inputs.carDailyKm}
            onChange={update("carDailyKm")}
            min={0}
            max={100}
            step={5}
            unit="km"
            shouldReduceMotion={shouldReduceMotion}
          />
          <SliderInput
            label="Annual flights"
            value={inputs.annualFlights}
            onChange={update("annualFlights")}
            min={0}
            max={10}
            step={1}
            unit="trips"
            shouldReduceMotion={shouldReduceMotion}
          />
        </div>

        <div className="mt-9 grid gap-8 sm:grid-cols-2 sm:gap-x-14">
          <SegmentedControl
            label="Diet type"
            options={DIET_OPTIONS}
            value={inputs.dietType}
            onChange={update("dietType")}
            shouldReduceMotion={shouldReduceMotion}
          />
          <SegmentedControl
            label="Home energy"
            options={HOME_OPTIONS}
            value={inputs.homeEnergy}
            onChange={update("homeEnergy")}
            shouldReduceMotion={shouldReduceMotion}
          />
        </div>
      </motion.div>

      <motion.div variants={fadeUp(shouldReduceMotion)}>
        <p className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
          Your footprint
        </p>

        <div className="mb-3 flex flex-wrap items-baseline gap-3">
          <motion.span
            key={results.totalPerCapita.toFixed(1)}
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: motionEase }}
            className="text-6xl font-extrabold tabular-nums leading-none text-white sm:text-7xl"
          >
            {results.totalPerCapita.toFixed(1)}
          </motion.span>
          <span className="text-xl font-semibold text-white/24">tCO2e/yr</span>
          <span className="text-sm font-medium text-white/20">per capita</span>
        </div>
        <p className="mb-10 text-sm font-medium text-white/40">
          Total household:{" "}
          <span className="tabular-nums font-bold text-white/60">
            {results.totalHousehold.toFixed(1)} tCO2e/yr
          </span>
        </p>

        <div className="mb-10 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-white/36">
            <span>0</span>
            <span>UN 2030 target: 2t</span>
            <span>{results.totalPerCapita > 10 ? "10+" : "10"} t</span>
          </div>
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/60 via-amber-500/40 to-rose-500/60" />
            <div className="absolute top-0 h-full w-0.5 bg-white/70" style={{ left: "20%", zIndex: 2 }} />
            <motion.div
              className="absolute top-0 h-full w-1 rounded-sm bg-white"
              style={{ zIndex: 3 }}
              initial={{ left: "0%" }}
              whileInView={{ left: `${Math.min((results.totalPerCapita / 10) * 100, 100)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: motionEase, delay: 0.3 }}
            />
          </div>
          <p className="text-sm font-medium text-white/50">
            {isBelowTarget ? (
              <span className="font-semibold text-emerald-300">
                Below the UN target. That is {Math.abs(results.vsTarget).toFixed(1)} t under the 2t limit.
              </span>
            ) : (
              <span>
                <span className="tabular-nums font-bold text-rose-300">
                  {results.pctOfTarget.toFixed(0)}%
                </span>{" "}
                of the UN 2t target -{" "}
                <span className="tabular-nums font-bold text-rose-300">
                  {results.vsTarget.toFixed(1)} t
                </span>{" "}
                over. Try reducing car travel, flying less, or shifting to a plant-based diet.
              </span>
            )}
          </p>
        </div>

        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/28">
            Where your emissions come from
          </p>
          {breakdown.map((item) => (
            <BreakdownBar
              key={item.label}
              item={item}
              maxValue={maxBreakdown}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </motion.div>

      {staticData && (
        <div className="grid gap-6 md:grid-cols-3">
          <motion.div variants={fadeUp(shouldReduceMotion)}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/28">
              Reference household
            </p>
            <p className="mt-4 text-3xl font-extrabold tabular-nums text-white/56">
              {staticData.before?.perCapita}
              <span className="ml-2 text-sm font-medium text-white/22">t/capita</span>
            </p>
          </motion.div>

          <motion.div variants={fadeUp(shouldReduceMotion)}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/28">
              After action
            </p>
            <p className="mt-4 text-3xl font-extrabold tabular-nums text-emerald-200/60">
              {staticData.after?.perCapita}
              <span className="ml-2 text-sm font-medium text-white/22">t/capita</span>
            </p>
          </motion.div>

          <motion.div variants={fadeUp(shouldReduceMotion)}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/28">
              Your result
            </p>
            <p className="mt-4 text-3xl font-extrabold tabular-nums text-white/76">
              {results.totalPerCapita.toFixed(2)}
              <span className="ml-2 text-sm font-medium text-white/22">t/capita</span>
            </p>
          </motion.div>
        </div>
      )}

      <motion.p variants={fadeUp(shouldReduceMotion)} className="text-xs leading-relaxed text-white/24">
        Simplified emission factors for educational purposes. Actual footprints vary by region and energy
        mix. For formal assessments, refer to the UN Climate Neutral Now platform.
      </motion.p>
    </motion.div>
  );
}
