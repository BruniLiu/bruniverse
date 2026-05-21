import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const THEME_KEY = "sdg-theme";

function getSavedTheme() {
  if (typeof window === "undefined") return "dark";

  try {
    return window.localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function applyTheme(theme) {
  const isLight = theme === "light";
  document.documentElement.classList.toggle("light", isLight);
  document.documentElement.classList.toggle("dark", !isLight);
  document.documentElement.style.colorScheme = isLight ? "light" : "dark";
}

export default function ThemeToggle({ className = "" }) {
  const shouldReduceMotion = useReducedMotion();
  const [theme, setTheme] = useState(getSavedTheme);
  const isLight = theme === "light";
  const Icon = isLight ? Moon : Sun;

  useEffect(() => {
    applyTheme(theme);

    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Ignore storage failures; the toggle still works for the current session.
    }
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className={`theme-toggle inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200 ${className}`}
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
      title={`Switch to ${isLight ? "dark" : "light"} theme`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="inline-grid place-items-center"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, rotate: -24, scale: 0.92 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, rotate: 24, scale: 0.92 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.18, ease: [0.23, 1, 0.32, 1] }}
        >
          <Icon size={15} strokeWidth={2} />
        </motion.span>
      </AnimatePresence>
      <span className="hidden sm:inline">{isLight ? "Dark" : "Light"}</span>
    </button>
  );
}
