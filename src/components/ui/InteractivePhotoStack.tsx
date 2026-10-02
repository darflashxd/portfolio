"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { portfolioData, type PhotoPlate } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

interface InteractivePhotoStackProps {
  className?: string;
}

function PhotoCard({
  photo,
  position,
  onClick,
}: {
  photo: PhotoPlate;
  position: "left" | "center" | "right";
  onClick: () => void;
}) {
  const [hasError, setHasError] = useState(false);
  const isCenter = position === "center";

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Photo ${photo.label}: ${photo.meta}. Click to bring forward.`}
      className={cn(
        "w-full h-full rounded-2xl overflow-hidden cursor-pointer select-none transition-shadow duration-300 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-cyan-light",
        isCenter
          ? "border border-white/20 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] hover:border-studio-cyan-light/50"
          : "border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)] hover:border-white/30 hover:opacity-100"
      )}
    >
      {!hasError && photo.src ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 768px) 260px, 320px"
          className="object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
          onError={() => setHasError(true)}
          onLoad={(e) => {
            const img = e.currentTarget;
            if (img.naturalWidth <= 1 && img.naturalHeight <= 1) {
              setHasError(true);
            }
          }}
        />
      ) : (
        /* High-End Studio Matte Archival Plate Placeholder */
        <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 bg-gradient-to-b from-[#111726] via-[#0D121F] to-[#070A10] text-studio-text">
          {/* Top Plate Header */}
          <div className="flex items-baseline justify-between text-[10px] font-mono tracking-widest pb-2 border-b border-white/10 relative z-10">
            <span className={cn(
              "uppercase font-semibold flex items-center gap-1.5",
              isCenter ? "text-studio-cyan-light" : "text-studio-muted"
            )}>
              <Camera className="w-3 h-3" />
              ARTIFACT // {photo.letter}
            </span>
            <span className="text-studio-muted font-mono text-[10px] font-medium">
              [ EVIDENCE RECORD ]
            </span>
          </div>

          {/* Central Monogram / Visual Anchor */}
          <div className="my-auto py-4 flex flex-col items-center justify-center text-center relative z-10">
            <span className={cn(
              "text-6xl sm:text-7xl font-display font-black block transition-transform duration-500 leading-none",
              isCenter ? "text-studio-cyan-light/40 scale-105" : "text-white/15"
            )}>
              {photo.letter}
            </span>
            <div className="mt-3 space-y-0.5">
              <span className="font-display font-bold text-xs sm:text-sm tracking-wide block text-studio-text truncate max-w-[190px]">
                {photo.label}
              </span>
              <span className="text-[10px] font-mono block text-studio-muted truncate max-w-[190px]">
                {photo.meta}
              </span>
            </div>
          </div>

          {/* Bottom Footnote */}
          <div className="flex items-center justify-between text-[10px] font-mono pt-2.5 border-t border-white/10 text-studio-muted relative z-10">
            <span>AUDIT REF</span>
            <span className="text-white/80 uppercase font-semibold">{isCenter ? "PRIMARY" : "ARCHIVE"}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function InteractivePhotoStack({ className = "" }: InteractivePhotoStackProps) {
  const { whoAmI } = portfolioData;
  const portraits = whoAmI.portraits;
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useReducedMotion();

  const total = portraits.length;
  if (total === 0) return null;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  // Fluid spring configuration for buttery card glide
  const springTransition = {
    type: "spring" as const,
    stiffness: 220,
    damping: 24,
    mass: 0.75,
  };

  return (
    <div className={cn("w-full flex flex-col items-center select-none py-4", className)}>
      {/* ── Fanned-Out Interactive 3-Card Stage with Continuous Spring FLIP ── */}
      <div className="relative w-full max-w-[420px] sm:max-w-[520px] h-[380px] sm:h-[440px] flex items-center justify-center">
        {/* Ambient soft glow behind active card */}
        <div
          className="absolute inset-0 m-auto w-56 h-56 bg-studio-cyan/10 blur-[100px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        {/* Continuous mapped cards with stable keys for smooth animated transitions */}
        {portraits.map((photo, index) => {
          let offset = (index - activeIndex) % total;
          if (offset < -1) offset += total;
          if (offset > 1) offset -= total;

          const isCenter = offset === 0;
          const isRight = offset === 1;

          // Compute target transform according to relative card position
          const x = isCenter ? 0 : isRight ? 75 : -75;
          const y = isCenter ? 0 : 12;
          const rotate = isCenter ? 0 : isRight ? 7.5 : -7.5;
          const scale = isCenter ? 1 : 0.93;
          const zIndex = isCenter ? 30 : isRight ? 20 : 10;
          const opacity = isCenter ? 1 : 0.85;

          const position = isCenter ? "center" : isRight ? "right" : "left";
          const cardAction = isCenter ? handleNext : isRight ? handleNext : handlePrev;

          return (
            <motion.div
              key={photo.letter}
              className="absolute w-[215px] sm:w-[275px] aspect-[3/4] origin-bottom cursor-grab active:cursor-grabbing"
              initial={reduced ? false : { x, y, rotate, scale, opacity, zIndex }}
              animate={{
                x,
                y,
                rotate,
                scale,
                opacity,
                zIndex,
              }}
              whileHover={
                reduced
                  ? undefined
                  : isCenter
                  ? { y: -8, scale: 1.02 }
                  : isRight
                  ? { x: 92, rotate: 10, scale: 0.96, opacity: 1 }
                  : { x: -92, rotate: -10, scale: 0.96, opacity: 1 }
              }
              drag={isCenter ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -45) {
                  handleNext();
                } else if (info.offset.x > 45) {
                  handlePrev();
                }
              }}
              transition={springTransition}
            >
              <PhotoCard
                photo={photo}
                position={position}
                onClick={cardAction}
              />
            </motion.div>
          );
        })}
      </div>

      {/* ── Interactive Deck Controls & Metadata Strip ── */}
      <div className="mt-4 flex flex-col items-center gap-2.5 w-full max-w-xs sm:max-w-sm">
        {/* Minimal Accessible Pagination Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            className="min-w-[44px] min-h-[44px] rounded-full bg-studio-surface/80 hover:bg-studio-card border border-white/10 hover:border-studio-cyan-light/40 flex items-center justify-center text-studio-text hover:text-studio-cyan-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-cyan-light"
            aria-label="Previous photograph in stack"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-studio-surface/60 border border-white/10">
            {portraits.map((_, pIdx) => (
              <button
                key={pIdx}
                type="button"
                onClick={() => setActiveIndex(pIdx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all focus:outline-none",
                  activeIndex === pIdx
                    ? "bg-studio-cyan-light w-5"
                    : "bg-white/20 hover:bg-white/40"
                )}
                aria-label={`Show photo ${pIdx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="min-w-[44px] min-h-[44px] rounded-full bg-studio-surface/80 hover:bg-studio-card border border-white/10 hover:border-studio-cyan-light/40 flex items-center justify-center text-studio-text hover:text-studio-cyan-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-cyan-light"
            aria-label="Next photograph in stack"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Clean Name Only */}
        <p className="text-xs font-sans font-semibold tracking-wider uppercase text-studio-muted text-center pt-1">
          Ahmad Rafi Sutanto
        </p>
      </div>
    </div>
  );
}
