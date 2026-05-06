import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Globe3D } from "@/components/ui/3d-globe";
import SoftAurora from "./components/react-bits/SoftAurora";
import "./react.css";

function useWholePageTilt(stageRef, options = {}) {
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const {
      rotateYAmount = 7,
      rotateXAmount = 5,
      translateXAmount = 14,
      translateYAmount = 10,
      scale = 1.035,
      smoothing = 0.04,
    } = options;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (prefersReducedMotion.matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let animationFrameId;

    const handleMouseMove = (event) => {
      target.x = event.clientX / window.innerWidth - 0.5;
      target.y = event.clientY / window.innerHeight - 0.5;
    };

    const handleMouseLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    const render = () => {
      current.x += (target.x - current.x) * smoothing;
      current.y += (target.y - current.y) * smoothing;

      const rotateY = current.x * rotateYAmount;
      const rotateX = -current.y * rotateXAmount;
      const translateX = current.x * translateXAmount;
      const translateY = current.y * translateYAmount;

      stage.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      stage.style.transform = "";
    };
  }, [stageRef, options]);
}

function App() {
  const stageRef = useRef(null);
  const contentRef = useRef(null);
  useWholePageTilt(stageRef, {
    rotateYAmount: 4.8,
    rotateXAmount: 3.2,
    translateXAmount: 8,
    translateYAmount: 6,
    scale: 1.02,
    smoothing: 0.032,
  });
  useWholePageTilt(contentRef, {
    rotateYAmount: 2.6,
    rotateXAmount: 1.8,
    translateXAmount: 4,
    translateYAmount: 3,
    scale: 1.006,
    smoothing: 0.028,
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white [perspective:1200px]">
      <div
        ref={stageRef}
        className="pointer-events-none absolute inset-[-3vh] z-0 will-change-transform [transform-style:preserve-3d]"
      >
        <div
          className="absolute inset-0"
          style={{ transform: "translateZ(-80px) scale(1.08)" }}
        >
          <SoftAurora
            speed={0.6}
            scale={1.5}
            brightness={1}
            color1="#dbeafe"
            color2="#2563eb"
            noiseFrequency={2.5}
            noiseAmplitude={1}
            bandHeight={0.5}
            bandSpread={1}
            octaveDecay={0.1}
            layerOffset={0}
            colorSpeed={1}
            enableMouseInteraction
            mouseInfluence={0.25}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.12)_38%,rgba(0,0,0,0.76)_100%)]" />
      </div>

      <div
        className="pointer-events-auto absolute bottom-[-58vh] left-1/2 z-[4] h-[118vh] min-h-[780px] w-[min(1500px,168vw)] opacity-95"
        style={{
          transform: "translateX(-50%)",
          transformOrigin: "50% 100%",
        }}
      >
        <div className="pointer-events-none absolute inset-x-[4%] top-[13%] h-[38%] rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(186,230,253,0.52)_0%,rgba(56,189,248,0.28)_28%,rgba(37,99,235,0.18)_48%,transparent_72%)] blur-3xl" />
        <div className="pointer-events-none absolute inset-x-[16%] top-[23%] h-[18%] rounded-[999px] bg-cyan-200/22 blur-2xl mix-blend-screen" />
        <Globe3D
          className="h-full w-full"
          markers={[]}
          config={{
            radius: 2.25,
            showAtmosphere: false,
            atmosphereColor: "#60a5fa",
            atmosphereIntensity: 0.35,
            atmosphereBlur: 4.2,
            bumpScale: 4,
            autoRotateSpeed: 0.22,
            showWireframe: true,
            wireframeColor: "#38bdf8",
            ambientIntensity: 0.75,
            pointLightIntensity: 2,
            enableZoom: false,
            enablePan: false,
            backgroundColor: null,
          }}
        />
      </div>

      <section
        ref={contentRef}
        className="relative z-10 grid min-h-screen place-items-center px-6 pb-[22vh] pt-[6vh] text-center will-change-transform [transform-style:preserve-3d]"
      >
        <div className="grid max-w-4xl gap-6">
          <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-sky-200">
            VBE 1014 Ethics and Sustainability
          </p>
          <h1 className="text-5xl font-extrabold leading-[0.98] tracking-normal md:text-7xl">
            Sustainable Development Goals
          </h1>
          <p className="mx-auto max-w-2xl text-base font-medium leading-8 text-white/76 md:text-lg">
            The collapse of civilization begins with the first bird hunted down.
          </p>
          <div className="pointer-events-auto flex flex-wrap justify-center gap-3">
            <a
              href="./chat.html"
              className="rounded-lg bg-white px-5 py-3 text-sm font-extrabold text-black transition hover:bg-sky-100"
            >
              Enter Chat
            </a>
            <a
              href="./chat.html"
              className="rounded-lg border border-white/35 bg-white/10 px-5 py-3 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/15"
            >
              Ask for Unknown
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
