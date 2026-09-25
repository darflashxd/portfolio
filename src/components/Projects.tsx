"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight, FolderGit2, Sparkles, Terminal, Activity, X, ExternalLink, Code2, ChevronDown } from "lucide-react";
import { portfolioData, type ProjectEntry } from "@/data/portfolioData";
import { EditorialImage } from "@/components/EditorialImage";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

type LayoutRole = "featured" | "medium" | "wide";

const PROJECT_LAYOUT: { id: string; role: LayoutRole }[] = [
  { id: "csc-ctf-2026", role: "featured" },
  { id: "poisoned-aur", role: "medium" },
  { id: "pulmoai", role: "wide" },
];

export function Projects() {
  const { projects } = portfolioData;
  const [inspectedProject, setInspectedProject] = useState<ProjectEntry | null>(null);
  const [showAll, setShowAll] = useState(false);
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

  const ordered = PROJECT_LAYOUT.map((entry, index) => {
    const project = projects.find((p) => p.id === entry.id);
    return { project, role: entry.role, index: index + 1 };
  }).filter(
    (item): item is { project: ProjectEntry; role: LayoutRole; index: number } =>
      item.project !== undefined
  );

  return (
    <section
      id="projects"
      className="py-28 sm:py-40 bg-temp-projects text-studio-text border-b border-studio-border relative overflow-hidden"
    >
      {/* Ambient Cool Cyan Glow */}
      <div
        className="absolute top-1/3 left-1/4 w-[550px] h-[380px] bg-studio-cyan/5 blur-[160px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* ── Section Header with Reveal ── */}
        <Reveal className="mb-16 sm:mb-24">
          <div className="pb-4 border-b border-studio-border mb-10">
            <h2 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-studio-muted">
              SELECTED WORK
            </h2>
          </div>

          <div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-monumental leading-[0.95] text-studio-text">
              SELECTED
              <span className="block font-display font-extrabold uppercase tracking-monumental text-studio-accent-light text-3xl sm:text-5xl md:text-6xl mt-1">
                PROJECTS &amp; BUILDS
              </span>
            </h2>
          </div>
        </Reveal>

        {/* ── Asymmetric Bento Grid with Soft Rounded-3xl Curves & Tactile Spring Lift ── */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8" stagger={0.1}>
          {ordered.slice(0, 2).map(({ project, role }) => {
            const isFeatured = role === "featured";
            const isWide = role === "wide";

            /* ── Tile 01: Featured Dominant Tile (7-Col) — CSC CTF Contest 2026 ── */
            if (isFeatured) {
              return (
                <StaggerItem key={project.id} className="md:col-span-7">
                  <TiltCard
                    maxTilt={5}
                    spotlightColor="rgba(37, 99, 235, 0.22)"
                    className="border border-white/[0.08] hover:border-studio-accent-light/40 bg-studio-surface/60 backdrop-blur-md h-full"
                  >
                    <article className="p-6 sm:p-8 md:p-10 flex flex-col justify-between h-full group">
                      <div className="space-y-6">
                        {/* Top Meta Bar */}
                        <div className="flex items-baseline justify-between">
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-studio-accent/10 border border-studio-accent/25 text-xs font-sans font-bold text-studio-accent-light shadow-sm">
                            <Sparkles className="w-3.5 h-3.5" />
                            FEATURED INFRASTRUCTURE
                          </span>
                          <span className="text-xs font-sans font-medium text-studio-faint uppercase">
                            {project.category} · {project.year}
                          </span>
                        </div>

                        {/* Rounded Image Plate */}
                        <div
                          onClick={() => setInspectedProject(project)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") setInspectedProject(project);
                          }}
                          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent rounded-2xl overflow-hidden cursor-pointer"
                          aria-label={`${project.title} — inspect technical architecture`}
                        >
                          <ImageReveal duration={1.1} className="rounded-2xl">
                            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl bg-[#0b1324] border border-white/5">
                              <EditorialImage
                                src={project.image}
                                alt={project.title}
                                aspectRatio="aspect-auto h-full w-full"
                                rounded="rounded-2xl"
                                monogram="C"
                                fallbackType="project"
                                fallbackLabel={project.title}
                                fallbackSub={`${project.category} · ${project.year}`}
                                theme="dark"
                                priority
                              />

                            </div>
                          </ImageReveal>
                        </div>

                        {/* Content */}
                        <div className="space-y-3 pt-2">
                          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.04] font-display text-studio-text group-hover:text-studio-accent-light transition-colors duration-300">
                            {project.title}{" "}
                            {project.serifAccent && (
                              <span className="font-display font-bold text-studio-accent-light block sm:inline">
                                · {project.serifAccent}
                              </span>
                            )}
                          </h3>

                          <p className="text-sm sm:text-base text-studio-muted font-sans leading-relaxed">
                            {project.tagline}
                          </p>

                          {/* Real Metric Pill from LinkedIn */}
                          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3 text-xs font-sans text-studio-faint">
                            <Terminal className="w-4 h-4 text-studio-accent-light shrink-0" />
                            <span>
                              <strong className="text-studio-text">79 PRs Merged · 128/285 Commits (45%):</strong> End-to-end automated CI/CD pipeline via GitHub Actions, ctfcli, and Docker on VPS.
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions & Tags */}
                      <div className="pt-6 mt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="rounded-full px-3 py-1 bg-white/[0.04] border border-white/[0.08] text-[11px] font-sans font-medium text-studio-muted"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => setInspectedProject(project)}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/10 hover:border-studio-accent-light/50 bg-white/[0.04] text-xs font-sans font-bold text-studio-text hover:text-white transition-colors"
                          >
                            <Terminal className="w-3.5 h-3.5 text-studio-accent-light" />
                            <span>INSPECT</span>
                          </button>

                          {project.repoUrl ? (
                            <Magnetic intensity={0.2} range={60}>
                              <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-studio-text text-studio-bg hover:bg-studio-accent-light transition-all font-sans text-xs uppercase tracking-wider font-bold shadow-[0_0_24px_rgba(37,99,235,0.3)] hover:shadow-[0_0_36px_rgba(56,189,248,0.5)]"
                              >
                                <FolderGit2 className="w-3.5 h-3.5" />
                                <span>REPO</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </a>
                            </Magnetic>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] font-sans text-[11px] font-medium text-studio-faint">
                              <FolderGit2 className="w-3.5 h-3.5" />
                              <span>INTERNAL REPO</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  </TiltCard>
                </StaggerItem>
              );
            }

            /* ── Tile 02: Medium Stacked Tile (5-Col) — The Poisoned AUR ── */
            if (!isWide) {
              return (
                <StaggerItem key={project.id} className="md:col-span-5">
                  <TiltCard
                    maxTilt={5}
                    spotlightColor="rgba(6, 182, 212, 0.25)"
                    className="border border-white/[0.08] hover:border-studio-cyan-light/40 bg-studio-surface/60 backdrop-blur-md h-full"
                  >
                    <article className="p-6 sm:p-8 flex flex-col justify-between h-full group">
                      <div className="space-y-4">
                        {/* Top Meta Bar */}
                        <div className="flex items-center justify-between gap-3">
                          <span className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-studio-cyan/10 border border-studio-cyan/25 text-xs font-sans font-bold text-studio-cyan-light">
                            <Terminal className="w-3.5 h-3.5" />
                            DIGITAL FORENSICS
                          </span>
                          <span className="text-xs font-sans font-medium text-studio-faint uppercase shrink-0">
                            BEECTF · {project.year}
                          </span>
                        </div>

                        {/* Image */}
                        <div
                          onClick={() => setInspectedProject(project)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") setInspectedProject(project);
                          }}
                          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent rounded-2xl overflow-hidden cursor-pointer"
                          aria-label={`${project.title} — inspect technical architecture`}
                        >
                          <ImageReveal duration={0.95} className="rounded-2xl">
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#080D1A] border border-white/5">
                              <EditorialImage
                                src={project.image}
                                alt={project.title}
                                aspectRatio="aspect-auto h-full w-full"
                                rounded="rounded-2xl"
                                monogram={project.title.charAt(0)}
                                fallbackType="project"
                                fallbackLabel={project.title}
                                fallbackSub={`${project.category} · ${project.year}`}
                                theme="dark"
                                objectFit="contain"
                              />
                            </div>
                          </ImageReveal>
                        </div>

                        <div className="space-y-2 pt-1">
                          <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-display text-studio-text group-hover:text-studio-cyan-light transition-colors duration-300">
                            {project.title}{" "}
                            {project.serifAccent && (
                              <span className="font-display font-bold text-studio-cyan-light">
                                · {project.serifAccent}
                              </span>
                            )}
                          </h3>

                          <p className="text-xs sm:text-sm text-studio-muted font-sans leading-relaxed line-clamp-3">
                            {project.tagline}
                          </p>

                          {/* Forensic Trail Metric Pill */}
                          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2.5 text-xs font-sans text-studio-faint">
                            <Terminal className="w-3.5 h-3.5 text-studio-cyan-light shrink-0" />
                            <span className="leading-snug">
                              <strong className="text-studio-text">BeeCTF 2026:</strong> Multi-layer trail across ALPM logs, systemd, ELF headers &amp; xattr.
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((t) => (
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
                            onClick={() => setInspectedProject(project)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 hover:border-studio-cyan-light/50 bg-white/[0.04] text-xs font-sans font-bold text-studio-text hover:text-white transition-colors"
                          >
                            <Terminal className="w-3 h-3 text-studio-cyan-light" />
                            <span>INSPECT</span>
                          </button>

                          {project.repoUrl ? (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/10 hover:border-studio-cyan-light/40 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-sans uppercase tracking-wider text-studio-text hover:text-studio-cyan-light transition-all font-bold"
                            >
                              <span>REPO</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="text-[11px] font-sans font-medium text-studio-faint uppercase px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
                              INTERNAL
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  </TiltCard>
                </StaggerItem>
              );
            }

            return null;
          })}
        </StaggerContainer>

        {/* Expandable Remaining Projects (PulmoAI etc.) */}
        <AnimatePresence>
          {showAll && ordered.length > 2 && (
            <motion.div
              initial={reduced ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reduced ? undefined : { opacity: 0, height: 0 }}
              transition={{
                height: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.22, ease: "easeOut" },
              }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 pt-6 sm:pt-8">
                {ordered.slice(2).map(({ project }) => {
                  return (
                    <div key={project.id} className="md:col-span-12">
                      <TiltCard
                        maxTilt={4}
                        spotlightColor="rgba(212, 160, 23, 0.2)"
                        className="border border-white/[0.08] hover:border-studio-amber-light/40 bg-studio-surface/60 backdrop-blur-md"
                      >
                        <article className="p-6 sm:p-8 md:p-10 group">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                            {/* Left: 7-Col Wide Image */}
                            <div
                              onClick={() => setInspectedProject(project)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") setInspectedProject(project);
                              }}
                              className="md:col-span-7 block focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent rounded-2xl overflow-hidden cursor-pointer"
                              aria-label={`${project.title} — inspect technical architecture`}
                            >
                              <ImageReveal duration={1.0} className="rounded-2xl">
                                <div className="relative aspect-[16/10] md:aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#04060C] border border-white/5">
                                  <EditorialImage
                                    src={project.image}
                                    alt={project.title}
                                    aspectRatio="aspect-auto h-full w-full"
                                    rounded="rounded-2xl"
                                    monogram="P"
                                    fallbackType="project"
                                    fallbackLabel={project.title}
                                    fallbackSub={`${project.category} · ${project.year}`}
                                    theme="dark"
                                    objectFit="contain"
                                  />
                                </div>
                              </ImageReveal>
                            </div>

                            {/* Right: 5-Col Narrative + Stats */}
                            <div className="md:col-span-5 space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-studio-amber/10 border border-studio-amber/25 text-xs font-sans font-bold text-studio-amber-light">
                                  <Activity className="w-3.5 h-3.5" />
                                  MEDICAL AI
                                </span>
                                <span className="text-xs font-sans font-medium text-studio-faint uppercase">
                                  {project.year}
                                </span>
                              </div>

                              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-studio-text group-hover:text-studio-amber-light transition-colors duration-300">
                                {project.title}{" "}
                                {project.serifAccent && (
                                  <span className="font-display font-bold text-studio-amber-light block sm:inline">
                                    · {project.serifAccent}
                                  </span>
                                )}
                              </h3>

                              <p className="text-sm text-studio-muted font-sans leading-relaxed">
                                {project.tagline}
                              </p>

                              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between text-xs font-sans text-studio-faint font-medium">
                                <span>OPTIMIZATION (MobileNetV2)</span>
                                <span className="text-studio-amber-light font-bold font-mono">99.65% ACCURACY</span>
                              </div>

                              <div className="pt-2 flex flex-wrap gap-1.5">
                                {project.technologies.slice(0, 4).map((t) => (
                                  <span
                                    key={t}
                                    className="rounded-full px-3 py-1 bg-white/[0.04] border border-white/[0.08] text-[11px] font-sans font-medium text-studio-muted"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>

                              <div className="pt-2 flex flex-wrap items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => setInspectedProject(project)}
                                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-studio-amber-light/50 bg-white/[0.04] text-xs font-sans font-bold text-studio-text hover:text-white transition-colors"
                                >
                                  <Activity className="w-3.5 h-3.5 text-studio-amber-light" />
                                  <span>INSPECT ARCHITECTURE</span>
                                </button>

                                {project.repoUrl ? (
                                  <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-studio-amber-light/40 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-sans uppercase tracking-wider text-studio-text hover:text-studio-amber-light transition-all font-bold"
                                  >
                                    <FolderGit2 className="w-4 h-4 text-studio-muted" />
                                    <span>VIEW REPOSITORY</span>
                                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                  </a>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] font-sans text-[11px] font-medium text-studio-faint">
                                    <span>INTERNAL PRODUCTION DEMO</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </article>
                      </TiltCard>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show More Button if more than 2 projects */}
        {ordered.length > 2 && (
          <div className="pt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="glass-btn-secondary inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider text-studio-text hover:text-studio-accent-light transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent"
            >
              <span>{showAll ? "SHOW FEWER BUILDS" : `SHOW ALL BUILDS (+${ordered.length - 2})`}</span>
              <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", showAll && "rotate-180")} />
            </button>
          </div>
        )}
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
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#060810] border border-white/15 border-t-white/35 shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-6 sm:p-8 z-10 space-y-6"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-sans font-bold text-studio-cyan-light uppercase">
                        {inspectedProject.category}
                      </span>
                      <span className="text-xs font-mono text-studio-faint">
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
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                    <div className="flex items-center gap-2 text-xs font-sans font-bold text-studio-cyan-light uppercase tracking-wider">
                      <Terminal className="w-4 h-4" />
                      <span>TECHNICAL SPECIFICATION &amp; TELEMETRY</span>
                    </div>
                    <p className="text-xs sm:text-sm text-studio-text font-sans leading-relaxed">
                      {inspectedProject.sellingPoint}
                    </p>
                  </div>

                  {/* Full Stack Badges */}
                  <div className="space-y-2">
                    <span className="text-xs font-sans font-bold text-studio-faint uppercase tracking-wider block">
                      STACK ARCHITECTURE
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
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-studio-accent text-white font-sans text-xs uppercase tracking-wider font-bold shadow-lg hover:bg-studio-accent/90 transition-all"
                      >
                        <FolderGit2 className="w-4 h-4" />
                        <span>OPEN FULL REPOSITORY</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs font-sans text-studio-faint font-medium">
                        Internal Protected Infrastructure
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => setInspectedProject(null)}
                      className="px-5 py-2.5 rounded-full border border-white/10 hover:border-white/25 bg-white/[0.03] text-xs font-sans font-bold text-studio-muted hover:text-white transition-colors"
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
