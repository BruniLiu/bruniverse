import React from "react";
import { motion } from "framer-motion";

const transitionEase = [0.23, 1, 0.32, 1];

export default function PageTransition({ children, transitionKey, shouldReduceMotion }) {
  return (
    <motion.div
      key={transitionKey}
      className="min-h-[100svh]"
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 0, y: 14, scale: 0.99 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 0, y: -10, scale: 0.995 }
      }
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.32,
        ease: transitionEase,
      }}
    >
      {children}
    </motion.div>
  );
}
