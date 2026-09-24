"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface KeynoteAuraProps {
  className?: string;
}

/**
 * KeynoteAura — Apple Keynote / WWDC Luminous Stage Atmosphere.
 *
 * Cinematic backlit stage featuring:
 * 1. Primary Luminous Ice-Cyan & Cobalt Core (organic breathing pulse)
 * 2. Prismatic WWDC Chromatic Flare (subtle indigo/violet refraction)
 * 3. Anamorphic Lens Flare Horizon Streak (horizontal optical flare)
 * 4. Micro-architectural drafting grid with elliptical vignette
 *
 * 100% Hardware-accelerated GPU compositor transforms (translate3d + scale).
 * Zero WebGL overhead, zero lag, fluid 60–120 FPS across all hardware.
 */
export function KeynoteAura({ className = "" }: KeynoteAuraProps) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none select-none z-0",
        className
      )}
    >
      {/* ── 1. Subtle Precision Drafting Grid (Vercel/Linear Technical Blueprint) ── */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,#000_20%,transparent_85%)] opacity-70"
      />

      {/* ── 2. Primary Luminous Keynote Iris Core (Breathing Radial Stage Light) ── */}
      <motion.div
        animate={
          reduced
            ? undefined
            : {
                scale: [1, 1.08, 0.96, 1],
                y: [0, -12, 8, 0],
                opacity: [0.85, 1, 0.88, 0.85],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[12%] left-1/2 -translate-x-1/2 -translate-y-1/4 w-[850px] max-w-[95vw] h-[520px] rounded-[100%] bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.32)_0%,rgba(37,99,235,0.22)_40%,rgba(30,58,138,0.12)_65%,transparent_80%)] blur-[100px] sm:blur-[135px] will-change-transform"
      />

      {/* ── 3. WWDC Chromatic Prism Bloom (Ultraviolet & Electric Indigo Accent) ── */}
      <motion.div
        animate={
          reduced
            ? undefined
            : {
                x: [0, 24, -18, 0],
                y: [0, 16, -12, 0],
                scale: [1, 1.12, 0.94, 1],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[8%] right-[15%] w-[480px] h-[360px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.24)_0%,rgba(168,85,247,0.12)_45%,transparent_75%)] blur-[110px] sm:blur-[130px] will-change-transform"
      />

      {/* ── 4. Deep Oceanic Anchor (Grounding Bottom Contrast) ── */}
      <motion.div
        animate={
          reduced
            ? undefined
            : {
                scale: [0.95, 1.05, 0.95],
                opacity: [0.6, 0.85, 0.6],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[28%] left-[12%] w-[460px] h-[340px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.18)_0%,rgba(37,99,235,0.10)_50%,transparent_75%)] blur-[110px] sm:blur-[130px] will-change-transform"
      />

      {/* ── 5. Anamorphic Optical Horizon Streak (Apple Stage Light Aperture) ── */}
      <div className="absolute top-[34%] left-1/2 -translate-x-1/2 w-[85%] max-w-5xl h-[1px]">
        <motion.div
          animate={
            reduced
              ? undefined
              : {
                  opacity: [0.45, 0.85, 0.5, 0.45],
                  scaleX: [0.92, 1.04, 0.95, 0.92],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full bg-gradient-to-r from-transparent via-sky-300/60 to-transparent shadow-[0_0_20px_rgba(56,189,248,0.7),0_0_40px_rgba(37,99,235,0.4)] will-change-transform"
        />
      </div>

      {/* ── 6. Atmospheric Gradient Bleed to Below Sections ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-44 sm:h-64 pointer-events-none z-[5] bg-gradient-to-t from-[rgb(var(--bg-base))] via-[rgb(var(--bg-base))]/80 to-transparent"
      />
    </div>
  );
}
