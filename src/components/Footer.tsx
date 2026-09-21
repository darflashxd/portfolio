"use client";

import { ArrowUp, FileText } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { Magnetic } from "@/components/ui/Magnetic";
import { openResumeModal } from "@/components/ui/ResumeModal";

export function Footer() {
  const { siteInfo, socials } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-14 sm:py-20 bg-studio-surface text-studio-text font-sans text-xs border-t border-studio-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-studio-border">
          <div className="flex items-center gap-3.5">
            <span className="w-9 h-9 rounded-full bg-studio-card border border-studio-border flex items-center justify-center font-display text-studio-accent-light font-extrabold text-sm shadow-sm">
              {siteInfo.initials}
            </span>
            <div>
              <span className="font-display font-bold uppercase text-sm tracking-tight text-studio-text block">
                {siteInfo.name}
              </span>
              <span className="text-[11px] text-studio-muted tracking-wider uppercase block font-medium">
                {siteInfo.role} · {siteInfo.institution}
              </span>
            </div>
          </div>

          <nav className="flex flex-wrap gap-4 sm:gap-6 uppercase tracking-wider text-xs font-semibold text-studio-muted" aria-label="Footer navigation">
            <a href="#hero" className="hover:text-studio-text transition-colors py-2">Hero</a>
            <a href="#about" className="hover:text-studio-text transition-colors py-2">About</a>
            <a href="#skills" className="hover:text-studio-text transition-colors py-2">Skills</a>
            <a href="#projects" className="hover:text-studio-text transition-colors py-2">Projects</a>
            <a href="#experience" className="hover:text-studio-text transition-colors py-2">Experiences</a>
            <a href="#writeups" className="hover:text-studio-text transition-colors py-2">Writeups</a>
            <a href="#contact" className="hover:text-studio-text transition-colors py-2">Contact</a>
            <button
              type="button"
              onClick={openResumeModal}
              className="hover:text-studio-accent-light transition-colors py-2 text-studio-accent-light flex items-center gap-1 font-bold"
            >
              <FileText className="w-3 h-3" />
              <span>Resume</span>
            </button>
          </nav>

          <Magnetic intensity={0.2} range={60}>
            <button
              type="button"
              onClick={scrollToTop}
              className="self-start md:self-auto min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-studio-accent-light/40 uppercase tracking-wider text-[11px] font-bold text-studio-text hover:text-studio-accent-light transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 text-studio-accent-light" />
            </button>
          </Magnetic>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-baseline justify-between gap-4 text-studio-muted text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span className="text-studio-muted">{siteInfo.status} · {siteInfo.location}</span>
          </div>

          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} {siteInfo.name}</span>
            <span>/</span>
            <a href={socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-studio-text transition-colors">
              GitHub
            </a>
            <span>/</span>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-studio-text transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
