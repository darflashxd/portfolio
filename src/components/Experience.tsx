"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowUpRight, CheckCircle } from "lucide-react";
import { portfolioData, ExperienceEntry } from "@/data/portfolioData";
import { EditorialImage } from "@/components/EditorialImage";
import { Reveal } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";

function ExperienceSlideGallery({ item }: { item: ExperienceEntry }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const reduced = useReducedMotion();

  if (!item.photos || item.photos.length === 0) return null;

  const photo = item.photos[currentSlide];
  const hasMultiple = item.photos.length > 1;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + item.photos.length) % item.photos.length);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % item.photos.length);
  };

  return (
    <figure className="space-y-3 mt-6 lg:mt-0 w-full max-w-lg lg:ml-auto select-none">
      {/* Visual Presentation Frame - continuous GPU track */}
      <div className="relative overflow-hidden group shadow-2xl border border-studio-border rounded-2xl bg-studio-surface aspect-[16/10]">
        <motion.div
          className="flex h-full w-full"
          animate={{ x: `-${currentSlide * 100}%` }}
          transition={
            reduced
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 240,
                  damping: 26,
                  mass: 0.5,
                }
          }
        >
          {item.photos.map((p, pIdx) => (
            <div key={p.src || pIdx} className="w-full h-full shrink-0">
              <EditorialImage
                src={p.src}
                alt={p.alt}
                aspectRatio="h-full w-full"
                rounded="rounded-2xl"
                fallbackType="experience"
                fallbackLabel={p.alt}
                fallbackSub={item.organization}
                theme="dark"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* External Clean Caption Strip & Integrated Unobtrusive Controls */}
      <figcaption className="space-y-2.5 px-1 pt-1">
        {/* Navigation & Counter Bar */}
        {hasMultiple && (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-studio-amber/10 border border-studio-amber/30 text-[10px] font-mono text-studio-amber-light font-bold uppercase">
                {String(currentSlide + 1).padStart(2, "0")} / {String(item.photos.length).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-1">
                {item.photos.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(dotIdx);
                    }}
                    className={cn(
                      "h-1.5 rounded-full transition-all focus:outline-none",
                      currentSlide === dotIdx
                        ? "w-4 bg-studio-amber-light"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    )}
                    aria-label={`Slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={prev}
                className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-studio-amber-light/50 flex items-center justify-center text-studio-muted hover:text-studio-amber-light transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-amber-light active:scale-90"
                aria-label="Previous photograph"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={next}
                className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-studio-amber-light/50 flex items-center justify-center text-studio-muted hover:text-studio-amber-light transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-amber-light active:scale-90"
                aria-label="Next photograph"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Full Caption Text without Truncation */}
        <div aria-live="polite" className="space-y-0.5">
          <AnimatePresence mode="wait">
            <motion.p
              key={photo.caption}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-xs font-sans font-medium text-studio-text leading-relaxed block"
            >
              {photo.caption}
            </motion.p>
          </AnimatePresence>

          {photo.alt && photo.alt !== photo.caption && (
            <AnimatePresence mode="wait">
              <motion.span
                key={photo.alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[11px] font-sans text-studio-faint block"
              >
                {photo.alt}
              </motion.span>
            </AnimatePresence>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

export function Experience() {
  const { experiences } = portfolioData;
  const [activeTab, setActiveTab] = useState<string>(experiences.categories[0] || "PETIR Cyber Security");
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 70%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 28,
    restDelta: 0.001,
  });

  const filteredItems = experiences.items.filter((item) => {
    if (activeTab.includes("CSC") || activeTab.includes("Cyber Security Community")) {
      return item.organization.includes("Cyber Security Community") || item.id.startsWith("csc-");
    }
    return item.organization.includes("PETIR") || item.id.startsWith("petir-");
  });

  return (
    <section
      id="experience"
      className="py-28 sm:py-40 bg-temp-experience text-studio-text border-b border-studio-border relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <Reveal className="mb-12 sm:mb-16 pb-4 border-b border-studio-border">
          <h2 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-studio-muted">
            EXPERIENCES &amp; FIELD LOGS
          </h2>
        </Reveal>

        {/* Modern Sliding Pill Tab Switcher */}
        <Reveal y={12} className="flex mb-16 overflow-x-auto max-w-full pb-2">
          <div
            className="inline-flex p-1.5 rounded-full bg-studio-card border border-studio-border relative backdrop-blur-md max-w-full shrink-0"
            role="tablist"
            aria-label="Experience Categories"
          >
            {experiences.categories.map((cat, cIdx) => {
              const isActive = activeTab === cat;
              const catLogo = cat.includes("CSC") || cat.includes("Cyber Security Community")
                ? "/images/organizations/csc.png"
                : "/images/organizations/petir.png";

              return (
                <button
                  key={cat}
                  id={`tab-exp-${cIdx}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="panel-experience-items"
                  onClick={() => setActiveTab(cat)}
                  className={cn(
                    "min-h-[44px] px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wide relative z-10 transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent",
                    isActive
                      ? "text-studio-text font-bold"
                      : "text-studio-muted hover:text-studio-text"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeExpTab"
                      className="absolute inset-0 rounded-full bg-studio-surface border border-white/15 shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="relative w-4 h-4 shrink-0 rounded-full overflow-hidden bg-black/40 flex items-center justify-center p-0.5">
                      <Image
                        src={catLogo}
                        alt={`${cat} Logo`}
                        width={16}
                        height={16}
                        className="w-full h-full object-contain"
                      />
                    </span>
                    <span>{cat}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Timeline panel — elevated interactive cards with Scroll-Driven Telemetry Trace */}
        <div
          ref={timelineRef}
          id="panel-experience-items"
          role="tabpanel"
          aria-labelledby={`tab-exp-${Math.max(0, experiences.categories.indexOf(activeTab))}`}
          className="relative space-y-6 sm:space-y-8 pl-0 md:pl-10"
        >
          {/* Vertical Telemetry Laser Rail */}
          {!reduced && (
            <div
              className="hidden md:block absolute left-2 top-8 bottom-8 w-[2px] bg-white/[0.06] rounded-full overflow-hidden"
              aria-hidden="true"
            >
              <motion.div
                style={{ scaleY: smoothProgress, originY: 0 }}
                className="w-full h-full bg-gradient-to-b from-studio-amber-light via-studio-cyan-light to-blue-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
              />
            </div>
          )}

          {filteredItems.map((item, idx) => {
            const hasMedia = item.photos && item.photos.length > 0;

            return (
              <div key={item.id} className="relative group/timeline">
                {/* Timeline node beacon */}
                {!reduced && (
                  <div
                    className="hidden md:flex absolute -left-[38px] top-10 w-4 h-4 rounded-full bg-studio-bg border-2 border-white/20 group-hover/timeline:border-studio-amber-light items-center justify-center transition-colors z-20 shadow-sm"
                    aria-hidden="true"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-studio-amber-light/60 group-hover/timeline:bg-studio-amber-light group-hover/timeline:scale-125 transition-all" />
                  </div>
                )}
                <Reveal delay={Math.min(idx * 0.06, 0.2)}>
                  <SpotlightCard
                    spotlightColor="rgba(212, 160, 23, 0.16)"
                    className="p-6 sm:p-8 md:p-10 rounded-3xl bg-studio-surface/50 hover:bg-studio-surface/80 border border-white/[0.08] hover:border-studio-amber-light/40 transition-colors duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] group"
                  >
                    <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
                      {/* Period & place */}
                      <div className="lg:col-span-3 space-y-1">
                        <span className="text-xs font-mono uppercase tracking-widest text-studio-text font-bold block">
                          {item.period}
                        </span>
                        <span className="text-xs font-sans text-studio-faint block">
                          {item.location}
                        </span>
                      </div>

                      {/* Body story + impact bullets */}
                      <div className={hasMedia ? "lg:col-span-5 space-y-4" : "lg:col-span-9 space-y-4"}>
                        <div className="flex items-start gap-4">
                          {item.logo && (
                            <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-black/50 border border-white/10 p-2 flex items-center justify-center overflow-hidden shadow-inner group-hover:border-studio-amber-light/40 transition-colors">
                              <Image
                                src={item.logo}
                                alt={`${item.organization} Logo`}
                                width={48}
                                height={48}
                                className="w-full h-full object-contain filter drop-shadow"
                              />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-studio-text font-display group-hover:text-studio-amber-light transition-colors">
                              {item.role}
                            </h3>
                            <div className="text-xs sm:text-sm font-sans font-medium text-studio-muted mt-1 flex flex-wrap items-center gap-1.5">
                              <span>{item.organization}</span>
                              {item.orgHighlight && (
                                <span className="font-sans font-medium text-studio-amber-light">
                                  · {item.orgHighlight}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-studio-muted font-sans leading-relaxed">
                          {item.summary}
                        </p>

                        <ul className="space-y-1.5 pt-1 text-xs text-studio-muted font-sans">
                          {item.impactPoints.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-studio-amber-light shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{pt}</span>
                            </li>
                          ))}
                        </ul>

                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full px-3 py-0.5 bg-white/[0.04] border border-white/[0.08] text-[11px] font-sans font-medium text-studio-faint"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.link && (
                          <div className="pt-2">
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 hover:border-studio-amber-light/40 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-sans uppercase tracking-wider text-studio-text hover:text-studio-amber-light font-bold transition-all"
                            >
                              <span>VERIFY RECORD</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-studio-faint" />
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Photo documentation carousel column */}
                      {hasMedia && (
                        <div className="lg:col-span-4">
                          <ExperienceSlideGallery item={item} />
                        </div>
                      )}
                    </article>
                  </SpotlightCard>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
