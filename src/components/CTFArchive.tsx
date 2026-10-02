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
} from "lucide-react";
import { portfolioData, type CTFWriteupEntry } from "@/data/portfolioData";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function CTFArchive() {
  const { ctfWriteups } = portfolioData;
  const [activePdf, setActivePdf] = useState<CTFWriteupEntry | null>(null);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activePdf) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActivePdf(null);
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
  }, [activePdf]);

  const renderWriteupCard = (item: CTFWriteupEntry) => (
    <SpotlightCard
      key={item.id}
      spotlightColor="rgba(56, 189, 248, 0.14)"
      className="p-6 sm:p-7 rounded-2xl bg-studio-surface/60 hover:bg-studio-surface/90 border border-white/[0.08] hover:border-studio-cyan-light/40 transition-colors duration-300 h-full flex flex-col justify-between group shadow-[0_8px_30px_rgb(0,0,0,0.14)]"
    >
      <article className="space-y-4 flex flex-col justify-between h-full">
        <div className="space-y-3.5">
          {/* Top Meta Strip: File Size & Year */}
          <div className="flex items-center justify-between gap-3">
            <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-studio-cyan-light font-bold">
              {item.fileSize} PDF
            </span>
            <span className="text-xs font-mono text-studio-muted font-medium">
              {item.year}
            </span>
          </div>

          {/* Header Title */}
          <div>
            <div className="text-xs font-sans font-medium text-studio-muted uppercase tracking-wider">
              {item.organizer}
            </div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-studio-text group-hover:text-studio-cyan-light transition-colors leading-snug mt-0.5">
              {item.competition}
            </h3>
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
                className="rounded-full px-2.5 py-0.5 bg-white/[0.04] border border-white/[0.08] text-[10px] font-sans font-medium text-studio-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action: In-App PDF View Modal */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setActivePdf(item)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-studio-accent/20 hover:bg-studio-accent/30 border border-studio-accent/40 text-studio-accent-light hover:text-white text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-cyan-light active:scale-[0.99]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>READ WRITEUP REPORT</span>
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
        className="py-28 sm:py-36 bg-temp-projects text-studio-text border-b border-studio-border relative overflow-hidden"
      >
        {/* Ambient Cool Cyan Glow */}
        <div
          className="absolute top-1/4 right-1/4 w-[500px] h-[350px] bg-studio-cyan/5 blur-[160px] pointer-events-none rounded-full"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Section Header */}
          <Reveal className="mb-14 sm:mb-20">
            <div className="pb-4 border-b border-studio-border mb-8">
              <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-studio-cyan-light">
                [ 05 // SECURITY RESEARCH &amp; CTF WRITEUPS ]
              </p>
            </div>
            <div className="space-y-4 max-w-4xl">
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-[0.98] text-studio-text">
                SECURITY RESEARCH
                <span className="block font-display font-extrabold uppercase tracking-tight text-studio-cyan-light text-2xl sm:text-4xl md:text-5xl mt-1">
                  &amp; TECHNICAL WRITEUPS
                </span>
              </h2>
              <p className="text-sm sm:text-base text-studio-muted font-sans leading-relaxed pt-1">
                {ctfWriteups.subtitle}
              </p>
            </div>
          </Reveal>

          {/* Full Writeups Roster Grid (All 6 Reports Displayed Directly) */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.06}>
            {ctfWriteups.items.map((item) => (
              <StaggerItem key={item.id}>
                {renderWriteupCard(item)}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── In-App PDF Viewer Modal (With Responsive Mobile Fallback) ── */}
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
                  initial={reduced ? false : { opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="relative w-full max-w-5xl h-[92vh] max-h-[920px] rounded-2xl bg-[#060810] border border-white/15 border-t-white/35 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col z-10"
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
                        <span className="text-[10px] font-sans font-medium text-studio-muted tracking-wide uppercase block truncate">
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
                        <ExternalLink className="w-3 h-3 text-studio-muted" />
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

                  {/* ── Mobile Direct Launch Viewport (Eliminates iOS Safari iframe crash) ── */}
                  <div className="flex-1 flex md:hidden flex-col items-center justify-center p-6 text-center space-y-4 bg-[#070A12]">
                    <div className="w-14 h-14 rounded-2xl bg-studio-cyan/10 border border-studio-cyan/30 flex items-center justify-center text-studio-cyan-light shadow-inner">
                      <FileText className="w-7 h-7" />
                    </div>
                    <div className="space-y-1.5 max-w-sm">
                      <h4 className="font-display font-bold text-white text-base leading-snug">
                        {activePdf.competition}
                      </h4>
                      <p className="text-xs text-studio-muted leading-relaxed">
                        {activePdf.summary}
                      </p>
                    </div>
                    <div className="flex flex-col w-full max-w-xs gap-2.5 pt-2">
                      <a
                        href={activePdf.docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 rounded-full bg-studio-accent text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>OPEN FULLSCREEN PDF</span>
                      </a>
                      <a
                        href={activePdf.docUrl}
                        download={activePdf.downloadFilename}
                        className="w-full py-3 rounded-full bg-white/[0.06] border border-white/10 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>DOWNLOAD ({activePdf.fileSize})</span>
                      </a>
                    </div>
                  </div>

                  {/* ── Desktop Embedded PDF Viewport ── */}
                  <div className="hidden md:block flex-1 overflow-hidden relative bg-[#04060C]">
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
