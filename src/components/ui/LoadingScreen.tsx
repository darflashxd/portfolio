"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { portfolioData } from "@/data/portfolioData";

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const reduced = useReducedMotion();
  const { siteInfo } = portfolioData;

  useEffect(() => {
    if (reduced) {
      setIsDismissed(true);
      onComplete?.();
      return;
    }

    document.body.style.overflow = "hidden";

    let animFrame: number;
    let startTime: number | null = null;
    const DURATION = 950; // Precise 950ms fill duration
    let isFinished = false;

    const finish = () => {
      if (isFinished) return;
      isFinished = true;
      setProgress(100);

      // Brief micro-pause (100ms) on 100% for visual satisfaction
      setTimeout(() => {
        setIsExiting(true);
        // Start curtain lift and trigger Hero/Navbar stagger simultaneously!
        setTimeout(() => {
          setIsDone(true);
          onComplete?.();
        }, 120);

        // Complete full curtain lift (850ms)
        setTimeout(() => {
          setIsDismissed(true);
          document.body.style.overflow = "";
        }, 850);
      }, 100);
    };

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / DURATION, 1);

      // Silky cubic ease-out curve: fast initial acceleration, smooth landing
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(eased * 100);
      setProgress(current);

      if (t < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        finish();
      }
    };

    animFrame = requestAnimationFrame(step);

    // Instant silent skip on user tap / keypress
    const handleSkip = () => {
      cancelAnimationFrame(animFrame);
      setIsDismissed(true);
      document.body.style.overflow = "";
      onComplete?.();
    };

    window.addEventListener("keydown", handleSkip, { once: true });
    window.addEventListener("pointerdown", handleSkip, { once: true });

    return () => {
      cancelAnimationFrame(animFrame);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleSkip);
      window.removeEventListener("pointerdown", handleSkip);
    };
  }, [reduced, onComplete]);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {!isDone ? (
        <motion.div
          key="curtain-preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.65,
            ease: [0.76, 0, 0.24, 1], // Cinematic theatrical curtain ease
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center p-8 bg-[#06080F] text-studio-text select-none cursor-pointer will-change-transform"
        >
          {/* Subtle film grain texture */}
          <div className="grain" aria-hidden="true" />

          {/* Center Monumental Brand & Progress Anchor (Pure Minimalist Focus) */}
          <motion.div
            animate={isExiting ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center justify-center space-y-5"
          >
            <div className="space-y-1.5 text-center">
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-wider text-white">
                {siteInfo.name}
              </h2>
              <p className="font-sans text-xs sm:text-sm font-semibold text-studio-cyan-light tracking-wider uppercase">
                {siteInfo.role}
              </p>
            </div>

            {/* Hardware-Accelerated Progress Track & Tabular Percentage */}
            <div className="flex items-center gap-4 pt-3">
              <div className="relative h-[2px] w-48 sm:w-64 bg-white/[0.08] rounded-full overflow-hidden">
                <div
                  className="h-full w-full bg-gradient-to-r from-blue-500 via-studio-cyan to-sky-300 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.8)] origin-left will-change-transform"
                  style={{
                    transform: `scaleX(${progress / 100})`,
                    transition: "transform 0.05s linear",
                  }}
                />
              </div>

              <span className="font-mono text-xs text-studio-faint font-semibold w-9 tabular-nums text-right">
                {String(progress).padStart(2, "0")}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
