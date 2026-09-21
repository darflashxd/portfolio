"use client";

import { FileText, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { openResumeModal } from "@/components/ui/ResumeModal";

export function CandidateStrip() {
  const { siteInfo } = portfolioData;

  return (
    <section
      aria-label="Candidate Status Strip"
      className="relative z-20 py-3.5 select-none bg-gradient-to-r from-transparent via-white/[0.04] to-transparent backdrop-blur-2xl border-y border-white/[0.08] shadow-[0_12px_32px_-10px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.18)]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-sans">
        {/* Left: Active Status Beacon */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-studio-muted font-medium tracking-wide">
            STATUS: <strong className="text-white font-bold">{siteInfo.status}</strong>
          </span>
          <span className="text-studio-faint hidden sm:inline">/</span>
          <span className="text-studio-faint hidden sm:inline tracking-wide">
            {siteInfo.location}
          </span>
        </div>

        {/* Right: Technical Focus Pill + Dossier Quick Action */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-studio-faint text-[11px] font-sans font-medium tracking-wider uppercase hidden lg:inline-flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-studio-cyan-light" />
            BLUE TEAM · DFIR · SECURITY CI/CD
          </span>

          <button
            type="button"
            onClick={openResumeModal}
            className="glass-btn-secondary inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-studio-text hover:text-studio-accent-light text-[11px] font-sans font-bold tracking-wider uppercase transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent"
          >
            <FileText className="w-3.5 h-3.5 text-studio-accent-light" />
            <span>OPEN CANDIDATE DOSSIER</span>
          </button>
        </div>
      </div>
    </section>
  );
}
