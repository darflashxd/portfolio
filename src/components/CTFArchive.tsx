"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  FileText,
  ExternalLink,
  Download,
  X,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { portfolioData, type CTFWriteupEntry } from "@/data/portfolioData";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";

export function CTFArchive() {
  const { ctfWriteups } = portfolioData;
  const [activePdf, setActivePdf] = useState<CTFWriteupEntry | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activePdf) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActivePdf(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [activePdf]);

  const renderWriteupCard = (item: CTFWriteupEntry) => (
    <SpotlightCard
      key={item.id}
      spotlightColor="rgba(56, 189, 248, 0.14)"
      className="p-6 sm:p-7 rounded-3xl bg-studio-surface/60 hover:bg-studio-surface/90 border border-white/[0.08] hover:border-studio-cyan-light/40 transition-colors duration-300 h-full flex flex-col justify-between group shadow-[0_8px_30px_rgb(0,0,0,0.14)]"
    >
      <article className="space-y-4 flex flex-col justify-between h-full">
        <div className="space-y-3.5">
          {/* Top Meta Strip: File Size & Year only */}
          <div className="flex items-center justify-between gap-3">
            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-studio-cyan-light font-bold">
              {item.fileSize} PDF
            </span>
            <span className="text-xs font-mono text-studio-faint font-medium">
              {item.year}
            </span>
          </div>

          {/* Header Title */}
          <div>
            <div className="text-xs font-sans font-medium text-studio-muted uppercase tracking-wider">
              {item.organizer}
            </div>
            <h4 className="text-lg sm:text-xl font-display font-bold text-studio-text group-hover:text-studio-cyan-light transition-colors leading-snug mt-0.5">
              {item.competition}
            </h4>
            {item.challengeTitle && (
              <div className="text-xs font-sans font-semibold text-studio-accent-light mt-1 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 shrink-0" />
                <span>{item.challengeTitle}</span>
              </div>
            )}
          </div>

          {/* Summary */}
          <p className="text-xs sm:text-sm text-studio-muted font-sans leading-relaxed">
            {item.summary}
          </p>
        </div>

        {/* Footer Tags & Actions */}
        <div className="pt-4 border-t border-white/[0.06] space-y-3.5">
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-0.5 bg-white/[0.04] border border-white/[0.08] text-[10px] font-sans font-medium text-studio-faint"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Single Primary Action: In-App PDF View Modal */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setActivePdf(item)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-studio-accent/20 hover:bg-studio-accent/30 border border-studio-accent/40 text-studio-accent-light hover:text-white text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-cyan-light active:scale-[0.99]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>VIEW PDF REPORT</span>
            </button>
          </div>
        </div>
      </article>
    </SpotlightCard>
  );

  return (
    <>
      <section
        id="writeups"
        className="py-28 sm:py-40 bg-temp-skills text-studio-text border-b border-studio-border relative overflow-hidden"
      >
        {/* Ambient Cool Cyan / Indigo Glow */}
        <div
          className="absolute top-1/4 right-1/4 w-[500px] h-[350px] bg-studio-cyan/5 blur-[160px] pointer-events-none rounded-full"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Section Header */}
          <Reveal className="mb-14 sm:mb-20">
            <div className="space-y-4 max-w-4xl">
              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-monumental leading-[0.95] text-studio-text">
                CTF WRITEUPS
                <span className="block font-display font-extrabold uppercase tracking-monumental text-studio-cyan-light text-3xl sm:text-5xl md:text-6xl mt-1">
                  &amp; FIELD ARCHIVES
                </span>
              </h2>
              <p className="text-sm sm:text-base text-studio-muted font-sans leading-relaxed pt-2">
                {ctfWriteups.subtitle}
              </p>
            </div>
          </Reveal>

          {/* Writeups Roster Grid */}
          <div>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.08}>
              {ctfWriteups.items.slice(0, 4).map((item) => (
                <StaggerItem key={item.id}>
                  {renderWriteupCard(item)}
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Expandable Remaining Writeups (Gundar & Polri) */}
            <AnimatePresence>
              {showAll && ctfWriteups.items.length > 4 && (
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    {ctfWriteups.items.slice(4).map((item) => renderWriteupCard(item))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Show More Button if more than 4 writeups */}
            {ctfWriteups.items.length > 4 && (
              <div className="pt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAll(!showAll)}
                  className="glass-btn-secondary inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider text-studio-text hover:text-studio-cyan-light transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-cyan-light"
                >
                  <span>{showAll ? "SHOW FEWER REPORTS" : `SHOW ALL WRITEUPS (+${ctfWriteups.items.length - 4})`}</span>
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", showAll && "rotate-180")} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── In-App PDF Viewer Modal (Rendered via Portal to overlay Navbar & all layers) ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activePdf && (
              <div
                className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/80 animate-in fade-in duration-150"
                role="dialog"
                aria-modal="true"
                aria-labelledby="pdf-modal-title"
              >
                {/* Backdrop click to dismiss */}
                <div
                  className="absolute inset-0"
                  onClick={() => setActivePdf(null)}
                  aria-hidden="true"
                />

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="relative w-full max-w-5xl h-[92vh] max-h-[920px] rounded-3xl bg-[#060810] border border-white/15 border-t-white/35 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col z-10"
                >
                  {/* Header Strip */}
                  <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 bg-white/[0.03] border-b border-white/10 select-none gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-8 h-8 rounded-full bg-studio-surface border border-white/15 flex items-center justify-center text-studio-cyan-light font-bold text-sm shrink-0 shadow-sm">
                        <FileText className="w-4 h-4" />
                      </span>
                      <div className="min-w-0">
                        <h3
                          id="pdf-modal-title"
                          className="font-display font-bold text-xs sm:text-sm uppercase tracking-tight text-white flex items-center gap-2 truncate"
                        >
                          <span className="truncate">{activePdf.competition}</span>
                          <span className="text-[10px] font-mono text-studio-cyan-light bg-studio-cyan/15 px-2 py-0.5 rounded-full border border-studio-cyan/30 shrink-0 hidden sm:inline-block">
                            {activePdf.fileSize} PDF
                          </span>
                        </h3>
                        <span className="text-[10px] font-sans font-medium text-studio-faint tracking-wide uppercase block truncate">
                          {activePdf.organizer} · {activePdf.challengeTitle || "Report"}
                        </span>
                      </div>
                    </div>

                    {/* Right controls: Download + Open in tab + Close */}
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={activePdf.docUrl}
                        download={activePdf.downloadFilename}
                        className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-studio-accent/25 hover:bg-studio-accent/40 border border-studio-accent/40 text-studio-accent-light hover:text-white text-xs font-sans font-bold uppercase tracking-wider transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">DOWNLOAD</span>
                      </a>

                      <a
                        href={activePdf.docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-studio-muted hover:text-white text-xs font-sans font-semibold transition-colors"
                      >
                        <span>NEW TAB</span>
                        <ExternalLink className="w-3 h-3 text-studio-faint" />
                      </a>

                      <button
                        type="button"
                        onClick={() => setActivePdf(null)}
                        className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-studio-muted hover:text-white transition-colors focus:outline-none"
                        aria-label="Close PDF Viewer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* PDF Viewport */}
                  <div className="flex-1 overflow-hidden relative bg-[#04060C]">
                    <iframe
                      src={`${activePdf.docUrl}#view=FitH&toolbar=0&navpanes=0`}
                      className="w-full h-full border-0 bg-[#0E121E]"
                      title={`${activePdf.competition} PDF Report Viewer`}
                    />
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
