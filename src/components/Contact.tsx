"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { cn } from "@/lib/utils";

function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Contact() {
  const { socials } = portfolioData;
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const profiles = [
    {
      label: "GITHUB",
      href: socials.github,
      handle: "github.com/darflashxd",
      icon: GithubIcon,
    },
    {
      label: "LINKEDIN",
      href: socials.linkedin,
      handle: "linkedin.com/in/rafisutanto",
      icon: LinkedinIcon,
    },
  ];

  return (
    <section
      id="contact"
      className="py-28 sm:py-44 bg-temp-contact text-studio-text border-b border-studio-border relative overflow-hidden"
    >
      {/* Subtle Blue Team ambient oceanic glow */}
      <div
        className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-studio-cyan/5 blur-[160px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 sm:mb-24 pb-4 border-b border-studio-border"
        >
          <h2 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-studio-muted">
            GET IN TOUCH &amp; DISPATCH
          </h2>
        </motion.div>

        {/* Monumental Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 sm:mb-24 max-w-5xl"
        >
          <h3 className="text-4xl sm:text-6xl md:text-7xl lg:text-[104px] font-extrabold uppercase tracking-monumental leading-[0.92] bg-gradient-to-b from-white via-white/95 to-white/75 bg-clip-text text-transparent font-display">
            <div>LET&apos;S UNCOVER</div>
            <div className="font-display font-extrabold uppercase tracking-monumental bg-gradient-to-r from-sky-300 via-studio-cyan-light to-blue-400 bg-clip-text text-transparent">
              WHAT&apos;S HIDDEN
            </div>
          </h3>
          <p className="mt-8 text-base sm:text-xl font-sans text-studio-muted max-w-2xl font-normal leading-relaxed">
            Research collaborations, forensic tooling, CTF challenge authoring: my inbox is open.
          </p>
        </motion.div>

        {/* Big Magnetic Email Action & Click-to-Copy Pill */}
        <Reveal delay={0.15} className="pb-16 sm:pb-24 border-b border-studio-border flex flex-col sm:flex-row sm:items-baseline justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-studio-faint block mb-3 font-medium">
              DIRECT EMAIL
            </span>
            <a
              href={`mailto:${socials.email}`}
              className="group inline-flex items-baseline gap-2 sm:gap-4 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-studio-text hover:text-studio-accent-light transition-colors break-all"
            >
              <span>{socials.email}</span>
              <ArrowUpRight className="w-6 h-6 sm:w-10 sm:h-10 text-studio-faint group-hover:text-studio-accent-light transition-transform group-hover:translate-x-1.5 group-hover:-translate-y-1.5" />
            </a>
          </div>

          <div className="pt-2 sm:pt-0">
            <Magnetic intensity={0.25} range={70}>
              <button
                type="button"
                onClick={copyEmail}
                className={cn(
                  "glass-btn-secondary inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-sans uppercase tracking-wider font-bold transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent",
                  copied
                    ? "text-emerald-400 !border-emerald-500/50 shadow-[0_0_24px_rgba(52,211,153,0.3)]"
                    : "text-studio-text hover:text-studio-accent-light"
                )}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-studio-accent-light" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </Magnetic>
          </div>
        </Reveal>

        {/* Verified directory links — clean minimalist profile cards centered & balanced */}
        <StaggerContainer className="pt-10 sm:pt-14 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-2xl mx-auto" stagger={0.08}>
          {profiles.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-studio-accent-light/40 transition-all duration-300 shadow-sm hover:shadow-[0_0_28px_rgba(37,99,235,0.14)]"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-studio-text group-hover:text-studio-accent-light transition-colors shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-sans text-sm sm:text-base font-bold text-studio-text group-hover:text-studio-accent-light transition-colors tracking-wide block truncate">
                        {item.label}
                      </span>
                      <span className="font-mono text-xs text-studio-faint tracking-wide block truncate mt-0.5">
                        {item.handle}
                      </span>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-studio-faint group-hover:text-studio-accent-light group-hover:border-studio-accent-light/30 transition-all shrink-0 ml-3">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </a>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
