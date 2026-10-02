"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  FileText,
  X,
  Download,
  ExternalLink,
  Copy,
  Check,
  Mail,
  ShieldCheck,
  Sparkles,
  Award,
  Terminal,
  Eye,
  Briefcase,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

export const RESUME_MODAL_EVENT = "open-resume-modal";

export function openResumeModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(RESUME_MODAL_EVENT));
  }
}

export function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"pdf" | "dossier">("pdf");
  const [copied, setCopied] = useState(false);
  const { siteInfo, socials, certifications } = portfolioData;
  const reduced = useReducedMotion();

  useEffect(() => {
    const handleOpen = () => {
      setActiveTab("pdf");
      setIsOpen(true);
    };
    window.addEventListener(RESUME_MODAL_EVENT, handleOpen);
    return () => window.removeEventListener(RESUME_MODAL_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
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
  }, [isOpen]);

  const recruiterPitch = `Ahmad Rafi Sutanto — Cybersecurity Student at BINUS University & Deputy Coordinator of R&D at Cyber Security Community (CSC). Specialization: Blue Team, DFIR, and Threat Detection. Experience: 30 CTF challenges, 20+ authors led, BeeCTF forensics author, BTL1 (Expected 2026), GPA 3.23 / 4.00. Portfolio: https://darflashxd.my.id | Resume: https://darflashxd.my.id/Resume_Ahmad_Rafi_Sutanto.pdf | Contact: ${socials.email} | Tel: ${socials.phone ?? "+62 895-3831-57017"}`;

  const copyPitch = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(recruiterPitch);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/80 animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dossier-title"
        >
          {/* Backdrop click to dismiss */}
          <div
            className="absolute inset-0"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-5xl h-[90vh] max-h-[880px] rounded-3xl bg-[#060810] border border-white/15 border-t-white/35 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col z-10"
            >
              {/* Header Strip */}
              <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 bg-white/[0.03] border-b border-white/10 select-none">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-studio-surface border border-white/15 flex items-center justify-center font-display text-studio-accent-light font-extrabold text-sm shadow-sm">
                  {siteInfo.initials}
                </span>
                <div>
                  <h3 id="dossier-title" className="font-display font-bold text-xs sm:text-sm uppercase tracking-tight text-white flex items-center gap-2">
                    <span>{siteInfo.name}</span>
                  </h3>
                  <span className="text-[10px] font-mono text-studio-muted tracking-wider uppercase block">
                    {siteInfo.role} · {siteInfo.institution}
                  </span>
                </div>
              </div>

              {/* View Switcher Tabs (PDF Live vs Executive Summary) */}
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/40 border border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab("pdf")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-sans font-bold transition-all",
                    activeTab === "pdf"
                      ? "bg-studio-accent text-white shadow-sm"
                      : "text-studio-muted hover:text-white"
                  )}
                >
                  <Eye className="w-3 h-3" />
                  <span>PDF DOCUMENT</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("dossier")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-sans font-bold transition-all",
                    activeTab === "dossier"
                      ? "bg-studio-accent text-white shadow-sm"
                      : "text-studio-muted hover:text-white"
                  )}
                >
                  <Briefcase className="w-3 h-3" />
                  <span>TECHNICAL OVERVIEW</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-studio-muted hover:text-white transition-colors focus:outline-none"
                aria-label="Close Curriculum Vitae"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body Viewport */}
            <div className="flex-1 overflow-hidden relative bg-[#04060C]">
              {activeTab === "pdf" ? (
                <>
                  {/* ── Mobile Direct Launch Viewport (Eliminates iOS Safari iframe crash) ── */}
                  <div className="flex-1 flex md:hidden flex-col items-center justify-center p-6 text-center space-y-4 bg-[#070A12] h-full">
                    <div className="w-14 h-14 rounded-2xl bg-studio-accent/10 border border-studio-accent/30 flex items-center justify-center text-studio-accent-light shadow-inner">
                      <FileText className="w-7 h-7" />
                    </div>
                    <div className="space-y-1.5 max-w-sm">
                      <h4 className="font-display font-bold text-white text-base leading-snug">
                        Ahmad Rafi Sutanto — Curriculum Vitae
                      </h4>
                      <p className="text-xs text-studio-muted leading-relaxed">
                        Blue Team, SOC Operations &amp; Digital Forensics specialist. Verified PDF document.
                      </p>
                    </div>
                    <div className="flex flex-col w-full max-w-xs gap-2.5 pt-2">
                      <a
                        href={siteInfo.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 rounded-full bg-studio-accent text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>OPEN FULLSCREEN PDF</span>
                      </a>
                      <a
                        href={siteInfo.resumeUrl}
                        download="Resume_Ahmad_Rafi_Sutanto.pdf"
                        className="w-full py-3 rounded-full bg-white/[0.06] border border-white/10 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>DOWNLOAD PDF</span>
                      </a>
                    </div>
                  </div>

                  {/* ── Desktop Embedded Live PDF Viewer ── */}
                  <div className="hidden md:flex w-full h-full flex-col justify-between relative">
                    <iframe
                      src={`${siteInfo.resumeUrl}#view=FitH&toolbar=0&navpanes=0`}
                      className="w-full h-full border-0 bg-[#0E121E]"
                      title="Ahmad Rafi Sutanto Curriculum Vitae PDF Preview"
                    />
                  </div>
                </>
              ) : (
                /* ── Technical Profile View ── */
                <div className="h-full p-6 sm:p-8 overflow-y-auto space-y-6 text-studio-text">
                  {/* Status Banner */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-cyan-950/30 border border-studio-accent/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="relative flex h-2.5 w-2.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                      </span>
                      <div className="min-w-0">
                        <span className="text-xs font-sans font-bold text-white uppercase tracking-wider block">
                          CANDIDATE AVAILABILITY STATUS
                        </span>
                        <span className="text-xs text-studio-muted block truncate font-sans">
                          {siteInfo.status} · {siteInfo.location}
                        </span>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-sans font-bold text-emerald-400 whitespace-nowrap self-start sm:self-auto">
                      INTERNSHIP &amp; SOC READY
                    </span>
                  </div>

                  {/* Recruiter Quick Pitch Tool */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-sans font-bold text-studio-accent-light uppercase">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>EXECUTIVE SUMMARY &amp; VALUE PROPOSITION</span>
                      </div>
                      <button
                        type="button"
                        onClick={copyPitch}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-studio-accent/20 hover:bg-studio-accent/30 border border-studio-accent/40 text-studio-accent-light text-[11px] font-sans font-bold transition-all focus:outline-none"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">COPIED TO CLIPBOARD</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>COPY SUMMARY</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs font-mono text-studio-muted bg-black/40 p-3 rounded-lg border border-white/[0.04] leading-relaxed select-text">
                      {recruiterPitch}
                    </p>
                  </div>

                  {/* Three Executive Pillars */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                      <div className="flex items-center gap-2 text-studio-cyan-light">
                        <Terminal className="w-4 h-4" />
                        <span className="font-sans text-xs font-bold uppercase">TARGET ROLES</span>
                      </div>
                      <p className="text-xs text-studio-muted font-sans leading-relaxed">
                        DFIR Specialist · Threat Analyst · SOC Operations · Blue Team Specialist
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                      <div className="flex items-center gap-2 text-studio-accent-light">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="font-sans text-xs font-bold uppercase">CORE TELEMETRY</span>
                      </div>
                      <p className="text-xs text-studio-muted font-sans leading-relaxed">
                        MITRE ATT&amp;CK, Splunk SIEM, Volatility 3, Sysmon, Wireshark, Autopsy, CI/CD
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                      <div className="flex items-center gap-2 text-studio-amber-light">
                        <Award className="w-4 h-4" />
                        <span className="font-sans text-xs font-bold uppercase">CREDENTIALS</span>
                      </div>
                      <p className="text-xs text-studio-muted font-sans leading-relaxed">
                        {certifications[0]?.title} ({certifications[0]?.status})
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Action Footer */}
            <div className="p-3.5 sm:p-4 bg-white/[0.02] backdrop-blur-xl border-t border-white/10 flex flex-wrap items-center justify-between gap-3 select-none">
              <div className="text-xs font-mono text-studio-faint flex items-center gap-2">
                <FileText className="w-4 h-4 text-studio-accent-light" />
                <span>Resume_Ahmad_Rafi_Sutanto.pdf</span>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href={siteInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 hover:border-white/30 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-sans uppercase tracking-wider text-studio-text transition-colors font-bold"
                >
                  <span>OPEN IN TAB</span>
                  <ExternalLink className="w-3.5 h-3.5 text-studio-faint" />
                </a>

                <a
                  href={siteInfo.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-studio-text text-studio-bg hover:bg-studio-accent-light transition-all text-xs font-sans uppercase tracking-wider font-bold shadow-[0_0_24px_rgba(37,99,235,0.3)] hover:shadow-[0_0_36px_rgba(56,189,248,0.5)]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DOWNLOAD PDF</span>
                </a>

                {siteInfo.resumeDocxUrl && (
                  <a
                    href={siteInfo.resumeDocxUrl}
                    download
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/15 hover:border-white/30 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-sans uppercase tracking-wider text-studio-text transition-colors font-bold"
                    title="Download Word Document (.docx)"
                  >
                    <Download className="w-3.5 h-3.5 text-studio-faint" />
                    <span>DOCX</span>
                  </a>
                )}

                <a
                  href={`mailto:${socials.email}`}
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 hover:border-studio-cyan-light/40 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-sans uppercase tracking-wider text-studio-text hover:text-studio-cyan-light transition-colors font-bold"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>EMAIL</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
