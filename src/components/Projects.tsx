"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  FolderGit2,
  Sparkles,
  Terminal,
  Activity,
  X,
  ExternalLink,
  Code2,
  Shield,
  Layers,
} from "lucide-react";
import { portfolioData, type ProjectEntry } from "@/data/portfolioData";
import { EditorialImage } from "@/components/EditorialImage";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { TiltCard } from "@/components/ui/TiltCard";

export function Projects() {
  const { projects } = portfolioData;
  const [inspectedProject, setInspectedProject] = useState<ProjectEntry | null>(null);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (inspectedProject) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setInspectedProject(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.body.classList.remove("modal-open");
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    }
  }, [inspectedProject]);

  const p1 = projects.find((p) => p.id === "csc-ctf-2026") || projects[0];
  const p2 = projects.find((p) => p.id === "poisoned-aur") || projects[1];
  const p3 = projects.find((p) => p.id === "pulmoai") || projects[2];

  return (
    <section
      id="projects"
      className="py-28 sm:py-36 bg-temp-projects text-studio-text border-b border-studio-border relative overflow-hidden"
    >
      {/* Ambient Cool Cyan Glow */}
      <div
        className="absolute top-1/3 left-1/4 w-[550px] h-[380px] bg-studio-cyan/5 blur-[160px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* ── Section Header with Reveal ── */}
        <Reveal className="mb-14 sm:mb-20">
          <div className="pb-4 border-b border-studio-border mb-8">
            <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-studio-cyan-light">
              [ 03 // SELECTED WORK &amp; CASE STUDIES ]
            </p>
          </div>

          <div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-[0.98] text-studio-text">
              ENGINEERED DEFENSE
              <span className="block font-display font-extrabold uppercase tracking-tight text-studio-accent-light text-2xl sm:text-4xl md:text-5xl mt-1">
                &amp; FORENSIC ARTIFACTS
              </span>
            </h2>
          </div>
        </Reveal>

        {/* ── Asymmetric Bento Grid (7 + 5 + 12 Full Display, Zero Fake Buttons) ── */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8" stagger={0.08}>
          {/* ── Tile 01: Featured Dominant Infrastructure (7-Col) — CSC CTF 2026 ── */}
          {p1 && (
            <StaggerItem className="md:col-span-7">
              <TiltCard
                maxTilt={3.5}
                spotlightColor="rgba(37, 99, 235, 0.22)"
                className="border border-white/[0.08] hover:border-studio-accent-light/40 bg-studio-surface/60 backdrop-blur-md h-full"
              >
                <article className="p-6 sm:p-8 flex flex-col justify-between h-full group [transform-style:preserve-3d]">
                  <div className="space-y-6">
                    {/* Top Meta Bar */}
                    <div className="flex items-baseline justify-between [transform:translateZ(20px)]">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-studio-accent/10 border border-studio-accent/25 text-xs font-sans font-bold text-studio-accent-light shadow-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                        FLAGSHIP INFRASTRUCTURE
                      </span>
                      <span className="text-xs font-mono font-medium text-studio-muted uppercase">
                        {p1.category} · {p1.year}
                      </span>
                    </div>

                    {/* Image Plate */}
                    <div
                      onClick={() => setInspectedProject(p1)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setInspectedProject(p1);
                      }}
                      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent rounded-xl overflow-hidden cursor-pointer [transform:translateZ(14px)]"
                      aria-label={`${p1.title} — inspect technical architecture`}
                    >
                      <ImageReveal duration={1.0} className="rounded-xl">
                        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl bg-[#0b1324] border border-white/5">
                          <EditorialImage
                            src={p1.image}
                            alt={p1.title}
                            aspectRatio="aspect-auto h-full w-full"
                            rounded="rounded-xl"
                            monogram="C"
                            fallbackType="project"
                            fallbackLabel={p1.title}
                            fallbackSub={`${p1.category} · ${p1.year}`}
                            theme="dark"
                          />
                        </div>
                      </ImageReveal>
                    </div>

                    {/* Progressive Disclosure: Scannable 3-Point Breakdown */}
                    <div className="space-y-3 [transform:translateZ(18px)]">
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight font-display text-studio-text group-hover:text-studio-accent-light transition-colors duration-300">
                        {p1.title}{" "}
                        {p1.serifAccent && (
                          <span className="font-display font-bold text-studio-accent-light block sm:inline">
                            · {p1.serifAccent}
                          </span>
                        )}
                      </h3>

                      <p className="text-xs sm:text-sm text-studio-muted font-sans leading-relaxed">
                        {p1.tagline}
                      </p>

                      {/* Real Verified Production Metric */}
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-3 text-xs font-sans">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-studio-accent-light shrink-0" />
                          <span className="text-studio-muted">
                            <strong className="text-white font-semibold">Production Telemetry:</strong> 79 merged PRs across dynamic sandboxing.
                          </span>
                        </div>
                        <span className="font-mono text-studio-accent-light text-[11px] font-bold shrink-0">
                          79 COMMITS
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-5 mt-6 border-t border-white/[0.06] flex items-center justify-between gap-3 [transform:translateZ(14px)]">
                    <div className="flex flex-wrap gap-1.5">
                      {p1.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full px-2.5 py-0.5 bg-white/[0.04] border border-white/[0.08] text-[10px] font-sans font-medium text-studio-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setInspectedProject(p1)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 hover:border-studio-accent-light/50 bg-white/[0.04] text-xs font-sans font-bold text-studio-text hover:text-white transition-colors"
                      >
                        <Terminal className="w-3 h-3 text-studio-accent-light" />
                        <span>INSPECT</span>
                      </button>

                      {p1.repoUrl && (
                        <a
                          href={p1.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 hover:border-studio-accent-light/40 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-sans uppercase tracking-wider text-studio-text hover:text-studio-accent-light transition-all font-bold"
                        >
                          <span>REPO</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </TiltCard>
            </StaggerItem>
          )}

          {/* ── Tile 02: Forensic Investigation (5-Col) — The Poisoned AUR ── */}
          {p2 && (
            <StaggerItem className="md:col-span-5">
              <TiltCard
                maxTilt={3.5}
                spotlightColor="rgba(6, 182, 212, 0.22)"
                className="border border-white/[0.08] hover:border-studio-cyan-light/40 bg-studio-surface/60 backdrop-blur-md h-full"
              >
                <article className="p-6 sm:p-8 flex flex-col justify-between h-full group [transform-style:preserve-3d]">
                  <div className="space-y-4">
                    {/* Top Meta Bar */}
                    <div className="flex items-center justify-between gap-3 [transform:translateZ(20px)]">
                      <span className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-studio-cyan/10 border border-studio-cyan/25 text-xs font-sans font-bold text-studio-cyan-light">
                        <Terminal className="w-3.5 h-3.5" />
                        DIGITAL FORENSICS
                      </span>
                      <span className="text-xs font-mono font-medium text-studio-muted uppercase shrink-0">
                        BEECTF · {p2.year}
                      </span>
                    </div>

                    {/* Image */}
                    <div
                      onClick={() => setInspectedProject(p2)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setInspectedProject(p2);
                      }}
                      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent rounded-xl overflow-hidden cursor-pointer [transform:translateZ(14px)]"
                      aria-label={`${p2.title} — inspect technical architecture`}
                    >
                      <ImageReveal duration={0.95} className="rounded-xl">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#080D1A] border border-white/5">
                          <EditorialImage
                            src={p2.image}
                            alt={p2.title}
                            aspectRatio="aspect-auto h-full w-full"
                            rounded="rounded-xl"
                            monogram={p2.title.charAt(0)}
                            fallbackType="project"
                            fallbackLabel={p2.title}
                            fallbackSub={`${p2.category} · ${p2.year}`}
                            theme="dark"
                            objectFit="contain"
                          />
                        </div>
                      </ImageReveal>
                    </div>

                    {/* Scannable Narrative */}
                    <div className="space-y-2 pt-1 [transform:translateZ(18px)]">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-display text-studio-text group-hover:text-studio-cyan-light transition-colors duration-300">
                        {p2.title}{" "}
                        {p2.serifAccent && (
                          <span className="font-display font-bold text-studio-cyan-light">
                            · {p2.serifAccent}
                          </span>
                        )}
                      </h3>

                      <p className="text-xs sm:text-sm text-studio-muted font-sans leading-relaxed line-clamp-3">
                        {p2.tagline}
                      </p>

                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2.5 text-xs font-sans text-studio-muted">
                        <Terminal className="w-3.5 h-3.5 text-studio-cyan-light shrink-0" />
                        <span className="leading-snug">
                          <strong className="text-white font-medium">Artifact Trail:</strong> ALPM logs, systemd timers, ELF headers &amp; xattr flag.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between gap-3 [transform:translateZ(14px)]">
                    <div className="flex flex-wrap gap-1">
                      {p2.technologies.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full px-2.5 py-0.5 bg-white/[0.04] border border-white/[0.08] text-[10px] font-sans font-medium text-studio-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setInspectedProject(p2)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 hover:border-studio-cyan-light/50 bg-white/[0.04] text-xs font-sans font-bold text-studio-text hover:text-white transition-colors"
                      >
                        <Terminal className="w-3 h-3 text-studio-cyan-light" />
                        <span>INSPECT</span>
                      </button>

                      {p2.repoUrl && (
                        <a
                          href={p2.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 hover:border-studio-cyan-light/40 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-sans uppercase tracking-wider text-studio-text hover:text-studio-cyan-light transition-all font-bold"
                        >
                          <span>REPO</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </TiltCard>
            </StaggerItem>
          )}

          {/* ── Tile 03: Full-Span Medical Privacy System (12-Col) — PulmoAI ── */}
          {p3 && (
            <StaggerItem className="md:col-span-12">
              <TiltCard
                maxTilt={2.5}
                spotlightColor="rgba(212, 160, 23, 0.18)"
                className="border border-white/[0.08] hover:border-studio-amber-light/40 bg-studio-surface/60 backdrop-blur-md"
              >
                <article className="p-6 sm:p-8 md:p-10 group [transform-style:preserve-3d]">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    {/* Left: 7-Col Image */}
                    <div
                      onClick={() => setInspectedProject(p3)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setInspectedProject(p3);
                      }}
                      className="md:col-span-7 block focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent rounded-xl overflow-hidden cursor-pointer [transform:translateZ(14px)]"
                      aria-label={`${p3.title} — inspect technical architecture`}
                    >
                      <ImageReveal duration={1.0} className="rounded-xl">
                        <div className="relative aspect-[16/10] md:aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#04060C] border border-white/5">
                          <EditorialImage
                            src={p3.image}
                            alt={p3.title}
                            aspectRatio="aspect-auto h-full w-full"
                            rounded="rounded-xl"
                            monogram="P"
                            fallbackType="project"
                            fallbackLabel={p3.title}
                            fallbackSub={`${p3.category} · ${p3.year}`}
                            theme="dark"
                            objectFit="contain"
                          />
                        </div>
                      </ImageReveal>
                    </div>

                    {/* Right: 5-Col Narrative */}
                    <div className="md:col-span-5 space-y-4 [transform:translateZ(18px)]">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-studio-amber/10 border border-studio-amber/25 text-xs font-sans font-bold text-studio-amber-light">
                          <Activity className="w-3.5 h-3.5" />
                          HEALTHCARE DATA INTEGRITY
                        </span>
                        <span className="text-xs font-mono font-medium text-studio-muted uppercase">
                          {p3.year}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-studio-text group-hover:text-studio-amber-light transition-colors duration-300">
                        {p3.title}{" "}
                        {p3.serifAccent && (
                          <span className="font-display font-bold text-studio-amber-light block sm:inline">
                            · {p3.serifAccent}
                          </span>
                        )}
                      </h3>

                      <p className="text-xs sm:text-sm text-studio-muted font-sans leading-relaxed">
                        {p3.tagline}
                      </p>

                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-sans text-studio-muted space-y-1">
                        <div className="text-white font-medium flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-studio-amber-light" />
                          <span>Audit &amp; Privacy Compliance</span>
                        </div>
                        <p className="text-[11px] leading-relaxed">
                          Role-based session access, tamper-evident audit logs, and anonymized radiological telemetry.
                        </p>
                      </div>

                      <div className="pt-3 flex flex-wrap gap-1.5">
                        {p3.technologies.map((t) => (
                          <span
                            key={t}
                            className="rounded-full px-2.5 py-0.5 bg-white/[0.04] border border-white/[0.08] text-[10px] font-sans font-medium text-studio-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setInspectedProject(p3)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 hover:border-studio-amber-light/50 bg-white/[0.04] text-xs font-sans font-bold text-studio-text hover:text-white transition-colors"
                        >
                          <Terminal className="w-3 h-3 text-studio-amber-light" />
                          <span>INSPECT ARCHITECTURE</span>
                        </button>

                        {p3.repoUrl && (
                          <a
                            href={p3.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 hover:border-studio-amber-light/40 bg-white/[0.03] text-xs font-sans uppercase tracking-wider text-studio-text hover:text-studio-amber-light transition-all font-bold"
                          >
                            <span>SOURCE REPO</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </StaggerItem>
          )}
        </StaggerContainer>
      </div>

      {/* ── Technical Architecture & Evidence Inspector Modal ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {inspectedProject && (
              <div
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 animate-in fade-in duration-150"
                role="dialog"
                aria-modal="true"
                aria-labelledby="inspect-modal-title"
              >
                <div
                  className="absolute inset-0"
                  onClick={() => setInspectedProject(null)}
                  aria-hidden="true"
                />

                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#060810] border border-white/15 border-t-white/35 shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-6 sm:p-8 z-10 space-y-6"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-bold text-studio-cyan-light uppercase">
                        {inspectedProject.category}
                      </span>
                      <span className="text-xs font-mono text-studio-muted">
                        {inspectedProject.year}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setInspectedProject(null)}
                      className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-studio-muted hover:text-white transition-colors focus:outline-none"
                      aria-label="Close modal"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-2">
                    <h3 id="inspect-modal-title" className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                      {inspectedProject.title}{" "}
                      {inspectedProject.serifAccent && (
                        <span className="text-studio-cyan-light block sm:inline font-sans font-semibold text-lg sm:text-xl">
                          · {inspectedProject.serifAccent}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-studio-muted font-sans leading-relaxed">
                      {inspectedProject.tagline}
                    </p>
                  </div>

                  {/* Deep Technical Architecture & Implementation Truth */}
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-studio-cyan-light uppercase tracking-wider">
                      <Terminal className="w-4 h-4" />
                      <span>FORENSIC BLUEPRINT &amp; OPERATIONAL SPECIFICATION</span>
                    </div>
                    <p className="text-xs sm:text-sm text-studio-text font-sans leading-relaxed">
                      {inspectedProject.sellingPoint}
                    </p>
                  </div>

                  {/* Full Stack Badges */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-studio-muted uppercase tracking-wider block">
                      TECHNOLOGY &amp; TOOLING STACK
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {inspectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-studio-surface border border-white/10 text-xs font-sans font-medium text-studio-text flex items-center gap-1.5"
                        >
                          <Code2 className="w-3.5 h-3.5 text-studio-cyan-light" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                    {inspectedProject.repoUrl ? (
                      <a
                        href={inspectedProject.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-studio-accent text-white font-sans text-xs uppercase tracking-wider font-bold shadow-lg hover:bg-studio-accent/90 transition-all"
                      >
                        <FolderGit2 className="w-4 h-4" />
                        <span>OPEN REPOSITORY</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs font-mono text-studio-muted font-medium">
                        INTERNAL REPOSITORY (PROTECTED CHALLENGE INFRASTRUCTURE)
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => setInspectedProject(null)}
                      className="px-5 py-2 rounded-full border border-white/10 hover:border-white/25 bg-white/[0.03] text-xs font-sans font-bold text-studio-muted hover:text-white transition-colors"
                    >
                      CLOSE
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
