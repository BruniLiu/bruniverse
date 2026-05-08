import React, { Children, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = "Previous",
  nextButtonText = "Next",
  completeButtonText = "Complete",
  disableStepIndicators = false,
  canProceed = () => true,
  ...rest
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) onFinalStepCompleted();
    else onStepChange(newStep);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!canProceed(currentStep)) return;

    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    if (!canProceed(currentStep)) return;

    setDirection(1);
    updateStep(totalSteps + 1);
  };

  return (
    <div className="w-full" {...rest}>
      <div className="w-full">
        <div className="flex w-full items-center px-0 pb-4 pt-0.5">
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;

            return (
              <React.Fragment key={stepNumber}>
                <StepIndicator
                  step={stepNumber}
                  disableStepIndicators={disableStepIndicators}
                  currentStep={currentStep}
                  onClickStep={(clicked) => {
                    setDirection(clicked > currentStep ? 1 : -1);
                    updateStep(clicked);
                  }}
                />
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
              </React.Fragment>
            );
          })}
        </div>

        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className="px-0"
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {!isCompleted && (
          <div className="pt-4">
            <div className={`flex items-center ${currentStep !== 1 ? "justify-between" : "justify-end"}`}>
              {currentStep !== 1 && (
                <button
                  onClick={handleBack}
                  className="rounded-md px-1 py-1 text-sm font-semibold text-white/54 transition hover:text-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200"
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}
              <button
                onClick={isLastStep ? handleComplete : handleNext}
                className="h-11 min-w-[120px] rounded-lg bg-white px-5 text-sm font-bold text-black shadow-[0_14px_38px_rgba(255,255,255,0.12)] transition hover:bg-sky-100 hover:shadow-[0_16px_44px_rgba(186,230,253,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200 active:scale-[0.99]"
                {...nextButtonProps}
              >
                {isLastStep ? completeButtonText : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepContentWrapper({ isCompleted, currentStep, direction, children, className }) {
  const [parentHeight, setParentHeight] = useState(0);

  return (
    <motion.div
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: "spring", duration: 0.38, bounce: 0 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={(height) => setParentHeight(height)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SlideTransition({ children, direction, onHeightReady }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current) onHeightReady(containerRef.current.offsetHeight);
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
      style={{ position: "absolute", left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants = {
  enter: (direction) => ({
    x: direction >= 0 ? "12%" : "-12%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction >= 0 ? "-10%" : "10%",
    opacity: 0,
  }),
};

export function Step({ children }) {
  return <div className="px-0">{children}</div>;
}

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators }) {
  const status = currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) onClickStep(step);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className={`relative rounded-full outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200 ${
        disableStepIndicators ? "pointer-events-none" : "cursor-pointer"
      }`}
      animate={status}
      initial={false}
      aria-label={`Step ${step}`}
    >
      <motion.span
        variants={{
          inactive: {
            scale: 1,
            backgroundColor: "rgba(255,255,255,0.05)",
            borderColor: "rgba(255,255,255,0.14)",
            color: "rgba(255,255,255,0.52)",
          },
          active: {
            scale: 1,
            backgroundColor: "rgba(186,230,253,0.14)",
            borderColor: "rgba(186,230,253,0.52)",
            color: "rgba(224,242,254,0.95)",
          },
          complete: {
            scale: 1,
            backgroundColor: "rgba(45,212,191,0.18)",
            borderColor: "rgba(125,211,252,0.46)",
            color: "rgba(204,251,241,0.95)",
          },
        }}
        transition={{ duration: 0.25 }}
        className="flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold shadow-[0_0_22px_rgba(56,189,248,0.08)]"
      >
        {status === "complete" ? (
          <CheckIcon className="h-4 w-4" />
        ) : status === "active" ? (
          <span className="h-2.5 w-2.5 rounded-full bg-sky-100 shadow-[0_0_14px_rgba(186,230,253,0.7)]" />
        ) : (
          step
        )}
      </motion.span>
    </motion.button>
  );
}

function StepConnector({ isComplete }) {
  return (
    <div className="relative mx-1 h-px flex-1 overflow-hidden rounded bg-white/12 sm:mx-2">
      <motion.div
        className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-100/80 to-teal-200/54"
        initial={false}
        animate={{ width: isComplete ? "100%" : "0%" }}
        transition={{ duration: 0.32 }}
      />
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.08, type: "tween", ease: "easeOut", duration: 0.24 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
