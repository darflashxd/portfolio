"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, ArrowUpRight, Shield, FileText } from "lucide-react";
import { portfolioData, type CertificationEntry } from "@/data/portfolioData";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { Magnetic } from "@/components/ui/Magnetic";
import { InteractivePhotoStack } from "@/components/ui/InteractivePhotoStack";
import { KineticCounter } from "@/components/ui/KineticCounter";
import { TiltCard } from "@/components/ui/TiltCard";
import { openResumeModal } from "@/components/ui/ResumeModal";
import { cn } from "@/lib/utils";

function CertificationCard({ cert }: { cert: CertificationEntry }) {
  const [imgError, setImgError] = useState(false);
  const isVerified = cert.status === "Verified";
  const isActive = cert.status === "Active Pursuit";

  return (
    <TiltCard
      maxTilt={3}
      spotlightColor={isVerified ? "rgba(6, 182, 212, 0.18)" : "rgba(212, 160, 23, 0.18)"}
      className={cn(
        "border border-white/[0.08] bg-studio-surface/60 hover:bg-studio-surface/90 transition-colors duration-300 h-full",
        isVerified ? "hover:border-studio-cyan-light/40" : "hover:border-studio-amber-light/40"
      )}
    >
      <div className="p-5 sm:p-6 flex flex-col justify-between h-full gap-5 group">
        <div className="space-y-4">
          {/* Top row: Badge Frame & Status Pill */}
          <div className="flex items-center justify-between gap-3">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl overflow-hidden bg-black/40 border border-white/10 group-hover:border-white/20 transition-colors flex items-center justify-center p-2 shadow-inner">
              {!imgError && cert.image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={cert.image}
                    alt={`${cert.title} Badge`}
                    fill
                    sizes="56px"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={() => setImgError(true)}
                    onLoad={(e) => {
                      const img = e.currentTarget;
                      if (img.naturalWidth <= 1 && img.naturalHeight <= 1) {
                        setImgError(true);
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center bg-gradient-to-b from-white/[0.06] to-transparent rounded-xl border border-white/10">
                  <Shield className="w-4 h-4 text-studio-cyan-light mb-0.5" />
                  <span className="font-display font-extrabold text-xs text-white">
                    {cert.badgeLetter}
                  </span>
                </div>
              )}
            </div>

            {/* Status Pill */}
            <span
              className={`text-[10px] font-mono px-3 py-1 rounded-full shrink-0 border font-bold uppercase tracking-wider ${
                isVerified
                  ? "bg-studio-cyan/10 text-studio-cyan-light border-studio-cyan/30"
                  : isActive
                  ? "bg-studio-amber/10 text-studio-amber-light border-studio-amber/30 shadow-[0_0_12px_rgba(212,160,23,0.18)]"
                  : "bg-studio-bg text-studio-faint border-studio-border"
              }`}
            >
              {cert.status}
            </span>
          </div>

          {/* Narrative & Details */}
          <div className="space-y-1.5">
            <h4 className="text-base font-display font-bold text-studio-text group-hover:text-white transition-colors leading-snug tracking-tight">
              {cert.title}
            </h4>

            <div className="text-xs font-sans text-studio-muted flex items-center gap-2 font-medium">
              <span>{cert.issuer}</span>
              <span>·</span>
              <span className={cn("font-mono", isVerified ? "text-studio-cyan-light" : "text-studio-amber-light")}>{cert.date}</span>
            </div>

            <p className="text-xs text-studio-muted font-sans leading-relaxed pt-1">
              {cert.summary}
            </p>
          </div>
        </div>

        {/* Action Button at bottom */}
        {cert.credentialUrl && (
          <div className="pt-3 border-t border-white/[0.06]">
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-studio-faint hover:text-studio-cyan-light transition-colors"
            >
              <span>{cert.actionLabel || "Curriculum & Exam Blueprint"}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </TiltCard>
  );
}

export function About() {
  const { whoAmI, certifications } = portfolioData;

  return (
    <section
      id="about"
      className="py-28 sm:py-40 bg-temp-about text-studio-text border-b border-studio-border overflow-hidden relative"
    >
      {/* Subtle ambient oceanic illumination */}
      <div
        className="absolute top-1/2 right-10 -translate-y-1/2 w-[450px] h-[450px] bg-studio-cyan/5 blur-[160px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <Reveal className="mb-16 sm:mb-24 pb-4 border-b border-studio-border">
          <h2 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-studio-muted">
            {whoAmI.title}
          </h2>
        </Reveal>

        {/* Narrative & Contact-Sheet Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal>
              <h3 className="text-3xl sm:text-5xl font-extrabold tracking-monumental text-studio-text font-display leading-[1.08]">
                <span>{whoAmI.headingLine1}</span>{" "}
                <span className="font-display font-extrabold text-studio-accent-light block sm:inline">
                  {whoAmI.headingLine2Serif}
                </span>
              </h3>
            </Reveal>

            {/* Concise 2-sentence punchy narrative */}
            <StaggerContainer className="space-y-4" stagger={0.12} delay={0.1}>
              <StaggerItem>
                <p className="text-base sm:text-xl font-sans text-studio-text font-normal leading-relaxed">
                  {whoAmI.statement}
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="text-sm sm:text-base text-studio-muted font-sans leading-relaxed font-normal max-w-xl">
                  {whoAmI.highlightParagraph}
                </p>
              </StaggerItem>
            </StaggerContainer>

            {/* High-impact numerical proof points */}
            <StaggerContainer
              className="pt-6 border-t border-studio-border grid grid-cols-1 sm:grid-cols-3 gap-6"
              stagger={0.1}
            >
              {whoAmI.stats.map((stat) => (
                <StaggerItem key={stat.label} className="space-y-1">
                  <KineticCounter
                    value={stat.value}
                    className="text-3xl sm:text-4xl font-extrabold font-display bg-gradient-to-b from-white via-white/95 to-white/75 bg-clip-text text-transparent block tracking-tight"
                  />
                  <span className="text-xs font-sans font-medium text-studio-faint block leading-tight">
                    {stat.label}
                  </span>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Resume action — pill button triggering interactive dossier modal */}
            <Reveal delay={0.2} className="pt-2">
              <Magnetic intensity={0.18} range={60}>
                <button
                  type="button"
                  onClick={openResumeModal}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-studio-accent/20 hover:border-studio-accent/40 text-xs font-sans font-bold uppercase tracking-wider text-studio-text hover:text-studio-accent-light backdrop-blur-md transition-all duration-300 group shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent"
                >
                  <FileText className="w-3.5 h-3.5 text-studio-accent-light transition-transform group-hover:scale-110" />
                  <span>OPEN CANDIDATE DOSSIER / CV</span>
                </button>
              </Magnetic>
            </Reveal>
          </div>

          {/* Right Column: Interactive Fanned-Out Photo Stack (Click/Arrows to Cycle) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <InteractivePhotoStack />
          </div>
        </div>

        {/* Integrated Certification Candidate Track with elegant ambient glow */}
        <Reveal delay={0.1} className="mt-20 pt-12 border-t border-studio-border">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
            <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-studio-muted font-bold">
              <Award className="w-4 h-4 text-studio-cyan-light" />
              <span>CERTIFICATIONS &amp; CREDENTIALS</span>
            </div>
            <span className="text-[11px] font-mono text-studio-faint">
              Verified achievements &amp; professional candidate tracks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full">
            {certifications.map((cert) => (
              <CertificationCard key={cert.title} cert={cert} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
