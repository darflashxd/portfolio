"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, FileText, ShieldCheck } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { Magnetic } from "@/components/ui/Magnetic";
import { ForensicTelemetryMesh } from "@/components/ui/ForensicTelemetryMesh";
import { openResumeModal } from "@/components/ui/ResumeModal";

/**
 * Hero — Forensic Telemetry Stage (Defensive Systems Engineering).
 * Line-level choreography: DECONSTRUCTING ANOMALIES → DEFENDING CRITICAL SYSTEMS.
 * Transform + opacity GPU composited. Editorial timing (0.8–1.0s, gentle offsets).
 * Authentic 2.5D telemetry aesthetic with Zero WebGL overhead.
 */
export function Hero({ isLoaded = false }: { isLoaded?: boolean }) {
  const { hero, siteInfo } = portfolioData;
  const reduced = useReducedMotion();

  const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const ready = reduced || isLoaded;

  return (
    <section
      id="hero"
      className="relative min-h-[96vh] flex flex-col pt-32 pb-10 sm:pt-40 sm:pb-12 bg-temp-hero text-studio-text overflow-hidden"
    >
      {/* ── High-Performance Forensic Telemetry Stream (Canvas 2D + Precision Grid) ── */}
      <ForensicTelemetryMesh />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex-1 flex flex-col justify-center relative z-10">
        {/* Eyebrow — Identity and institutional badge pill */}
        <div className="flex items-baseline justify-between mb-8 sm:mb-10">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#06080F]/90 border border-white/20 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-studio-cyan-light opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-studio-cyan" />
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.22em] text-white font-bold">
              {siteInfo.name}
            </span>
            <span className="text-xs font-mono text-studio-cyan-light/70 font-semibold">/</span>
            <span className="text-xs font-mono uppercase tracking-[0.18em] text-studio-muted hidden sm:inline-block">
              {hero.eyebrow}
            </span>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden md:inline-flex items-center px-4 py-1.5 rounded-full bg-[#06080F]/90 border border-white/20 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          >
            <span className="text-xs font-mono font-bold text-white tracking-wider uppercase">
              BINUS UNIVERSITY · R&amp;D
            </span>
          </motion.div>
        </div>

        {/* Monumental headline — 2-line balanced typography with crisp readability */}
        <h1 className="m-0 p-0 font-normal">
          <span className="block overflow-hidden">
            <motion.span
              initial={reduced ? false : { opacity: 0, y: "110%" }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: "110%" }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
              className="block text-[32px] min-[360px]:text-4xl min-[410px]:text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-extrabold uppercase tracking-tight leading-[0.94] bg-gradient-to-b from-white via-white/95 to-white/75 bg-clip-text text-transparent font-display"
            >
              {hero.titleLine1}
            </motion.span>
          </span>

          <span className="block overflow-hidden">
            <motion.span
              initial={reduced ? false : { opacity: 0, x: -24, y: "110%" }}
              animate={ready ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -24, y: "110%" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
              className="block text-[30px] min-[360px]:text-4xl min-[410px]:text-5xl sm:text-7xl md:text-8xl lg:text-[98px] font-extrabold font-display uppercase tracking-tight leading-[0.94] my-1 sm:my-2 bg-gradient-to-r from-sky-300 via-studio-cyan-light to-blue-400 bg-clip-text text-transparent"
            >
              {hero.titleLine2Serif}
            </motion.span>
          </span>

          {hero.titleLine3 && (
            <span className="block overflow-hidden">
              <motion.span
                initial={reduced ? false : { opacity: 0, y: "110%" }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: "110%" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.32 }}
                className="block text-[32px] min-[360px]:text-4xl min-[410px]:text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-extrabold uppercase tracking-tight leading-[0.94] bg-gradient-to-b from-white via-white/95 to-white/75 bg-clip-text text-transparent font-display"
              >
                {hero.titleLine3}
              </motion.span>
            </span>
          )}
        </h1>

        {/* Narrative & High-Contrast CTAs */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
          className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
        >
          <div className="lg:col-span-8 space-y-5">
            <p className="text-base sm:text-xl font-sans text-studio-muted leading-relaxed font-normal max-w-2xl">
              {hero.punchline}
            </p>

            {/* Curated high-signal operational badges */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {hero.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-3.5 py-1.5 bg-studio-surface/90 border border-studio-border hover:border-studio-cyan-light/40 text-xs font-sans font-medium text-studio-text rounded-full flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-studio-cyan-light" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Primary CTA (Explore Selected Work) + Secondary CTA (Technical CV) */}
          <div className="lg:col-span-4 flex flex-wrap items-center gap-4 sm:gap-5 lg:justify-end text-xs font-sans tracking-wider uppercase pt-4 lg:pt-0">
            <Magnetic intensity={0.18} range={65}>
              <a
                href="#projects"
                className="glass-btn-primary group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white font-bold tracking-wider uppercase transition-all duration-300"
              >
                <span>EXPLORE WORK</span>
                <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5 text-sky-300" />
              </a>
            </Magnetic>

            <Magnetic intensity={0.14} range={55}>
              <button
                type="button"
                onClick={openResumeModal}
                className="glass-btn-secondary group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-studio-text hover:text-white font-semibold tracking-wider transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent"
              >
                <FileText className="w-3.5 h-3.5 text-studio-accent-light" />
                <span>TECHNICAL CV</span>
              </button>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Quiet scroll cue */}
      <motion.a
        href="#about"
        initial={reduced ? false : { opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.65 }}
        className="relative z-10 self-center mb-2 flex flex-col items-center gap-2 text-studio-muted hover:text-studio-cyan-light transition-colors group"
        aria-label="Scroll to About section"
      >
        <span className="text-[11px] font-mono font-semibold tracking-widest uppercase">DISCOVER</span>
        <span className="block h-9 w-px bg-gradient-to-b from-studio-cyan/70 to-transparent" aria-hidden="true" />
        <ArrowDown className="w-3.5 h-3.5 -mt-3 text-studio-cyan-light transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
