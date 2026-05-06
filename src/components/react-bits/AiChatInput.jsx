"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mic, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AiChatInput({
  placeholders = [
    "Ask me anything...",
    "Describe what you need built",
    "Summarize this document for me",
    "Write a function that...",
    "Explain how this works",
  ],
  onSubmit,
  onChange,
  className,
  disabled = false,
  modeLabel = "DeepSeek",
}) {
  const canvasRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const newDataRef = React.useRef([]);
  const [value, setValue] = React.useState("");
  const [animating, setAnimating] = React.useState(false);
  const [placeholderIndex, setPlaceholderIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(id);
  }, [placeholders.length]);

  const startAnimation = React.useCallback(() => {
    const cvs = canvasRef.current;
    const input = inputRef.current;
    if (!cvs || !input) return;

    cvs.width = 800;
    cvs.height = 800;

    const ctx = cvs.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.clearRect(0, 0, 800, 800);

    const style = getComputedStyle(input);
    const fontSize = parseFloat(style.getPropertyValue("font-size"));

    ctx.font = `${fontSize * 2}px ${style.fontFamily}`;
    ctx.fillStyle = style.color;
    ctx.fillText(value, 0, fontSize * 2);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const pixels = [];

    for (let y = 0; y < 800; y += 2) {
      for (let x = 0; x < 800; x++) {
        const idx = (y * 800 + x) * 4;
        if (pixelData[idx + 3] > 128) {
          const r = pixelData[idx];
          const g = pixelData[idx + 1];
          const b = pixelData[idx + 2];
          pixels.push({
            x: x / 2,
            y: y / 2,
            r: 1,
            color: `rgba(${r}, ${g}, ${b}, ${pixelData[idx + 3] / 255})`,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -(1.5 + Math.random() * 1.5),
          });
        }
      }
    }

    newDataRef.current = pixels;
    setAnimating(true);
  }, [value]);

  React.useEffect(() => {
    if (!animating) return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    let frame;

    const draw = () => {
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      const remaining = newDataRef.current;
      let alive = 0;

      for (let i = remaining.length - 1; i >= 0; i--) {
        const p = remaining[i];
        if (p.x < 0 || p.r <= 0.1) continue;
        alive++;
        ctx.beginPath();
        ctx.rect(p.x, p.y, p.r, p.r);
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;
        ctx.stroke();

        p.x += p.vx;
        p.y += p.vy;
        p.vy *= 0.985;
        p.r *= 0.97;
      }

      if (alive > 0) {
        frame = requestAnimationFrame(draw);
      } else {
        setAnimating(false);
        setValue("");
      }
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [animating]);

  const vanishAndSubmit = () => {
    if (!value.trim() || disabled) return;
    startAnimation();
    onSubmit?.(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !animating) {
      vanishAndSubmit();
    }
  };

  const handleChange = (e) => {
    if (!animating) {
      setValue(e.target.value);
      onChange?.(e);
    }
  };

  return (
    <div
      className={cn(
        "relative mx-auto h-16 w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/8 bg-[#303030] shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        value && "border-white/14 bg-[#343434]",
        disabled && "opacity-65",
        className,
      )}
    >
      <button
        type="button"
        className="absolute left-4 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-white/88 transition hover:bg-white/8"
        aria-label="Add context"
      >
        <Plus size={24} strokeWidth={1.8} />
      </button>

      <canvas
        ref={canvasRef}
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full -translate-y-[20%] scale-50 transform object-contain opacity-0 blur-[1px] filter transition duration-200",
          animating && "opacity-100 duration-500",
        )}
      />

      <input
        ref={inputRef}
        type="text"
        value={value}
        disabled={disabled}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative z-10 h-full w-full rounded-full border-none bg-transparent pl-16 pr-44 text-[17px] tracking-normal text-white focus:outline-none disabled:cursor-not-allowed",
          animating && "text-transparent",
        )}
      />

      <div className="pointer-events-none absolute inset-0 flex items-center rounded-full pl-16 pr-44">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              key={`ph-${placeholderIndex}`}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 0.46 }}
              exit={{ y: -5, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[17px] font-medium text-white"
            >
              {placeholders[placeholderIndex]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <button
        type="button"
        className="absolute right-20 top-1/2 z-20 hidden -translate-y-1/2 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-white/62 transition hover:bg-white/8 sm:inline-flex"
        aria-label="Current model mode"
      >
        {modeLabel}
      </button>

      <button
        type="button"
        className="absolute right-12 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-white/82 transition hover:bg-white/8"
        aria-label="Voice input"
      >
        <Mic size={21} strokeWidth={1.8} />
      </button>

      <button
        type="button"
        disabled={!value.trim() || disabled}
        onClick={vanishAndSubmit}
        className={cn(
          "absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          value.trim() && !disabled
            ? "scale-100 opacity-100"
            : "scale-[0.85] opacity-[0.18]",
        )}
        aria-label="Send message"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.path
            d="M5 12l14 0"
            initial={{ strokeDasharray: "50%", strokeDashoffset: "50%" }}
            animate={{ strokeDashoffset: value ? 0 : "50%" }}
            transition={{ duration: 0.3 }}
          />
          <path d="M13 18l6 -6" />
          <path d="M13 6l6 6" />
        </motion.svg>
      </button>
    </div>
  );
}
