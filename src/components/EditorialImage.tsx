"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  rounded?: string;
  monogram?: string;
  fallbackLabel?: string;
  fallbackSub?: string;
  fallbackType?: "profile" | "experience" | "project" | "research" | "cert";
  theme?: "light" | "dark";
  priority?: boolean;
  objectFit?: "cover" | "contain";
}

export function EditorialImage({
  src,
  alt,
  className = "",
  aspectRatio = "aspect-[4/3]",
  rounded = "rounded-2xl",
  monogram,
  fallbackLabel,
  fallbackSub,
  fallbackType = "project",
  priority = false,
  objectFit = "cover",
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  const displayMonogram =
    monogram ||
    (fallbackLabel ? fallbackLabel.charAt(0).toUpperCase() : alt ? alt.charAt(0).toUpperCase() : "A");

  return (
    <div
      className={cn(
        "relative overflow-hidden select-none group transition-all duration-500 bg-studio-surface",
        rounded,
        aspectRatio,
        className
      )}
    >
      {!hasError && src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
          className={cn(
            objectFit === "contain" ? "object-contain p-3" : "object-cover",
            "transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          )}
          onError={() => setHasError(true)}
          onLoad={(e) => {
            const img = e.currentTarget;
            if (img.naturalWidth <= 1 && img.naturalHeight <= 1) {
              setHasError(true);
            }
          }}
        />
      ) : (
        /* Fine Archival Contact Plate Artwork with softer modern corners */
        <div
          role="img"
          aria-label={alt}
          className={cn(
            "absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-8 bg-studio-card text-studio-text border border-studio-border relative overflow-hidden",
            rounded
          )}
        >
          {/* Viewfinder Crosshairs */}
          <span aria-hidden="true" className="absolute top-2.5 left-2.5 text-[9px] font-mono opacity-25 select-none">+</span>
          <span aria-hidden="true" className="absolute top-2.5 right-2.5 text-[9px] font-mono opacity-25 select-none">+</span>
          <span aria-hidden="true" className="absolute bottom-2.5 left-2.5 text-[9px] font-mono opacity-25 select-none">+</span>
          <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 text-[9px] font-mono opacity-25 select-none">+</span>

          {/* Header Strip */}
          <div className="flex items-baseline justify-between text-[10px] font-mono tracking-widest pb-2 border-b border-studio-border text-studio-faint relative z-10">
            <span className="text-studio-accent-light uppercase font-semibold">
              PLATE // {fallbackType.toUpperCase()}
            </span>
            <span className="hidden sm:inline-block truncate max-w-[120px] opacity-75">
              [ 35MM · RAW ]
            </span>
          </div>

          {/* Central Exhibition Focus */}
          <div className="my-auto py-2 flex flex-col items-center justify-center text-center relative z-10">
            {fallbackType === "profile" ? (
              <div className="space-y-1 sm:space-y-2">
                <span className="text-4xl sm:text-6xl md:text-7xl font-display font-black block text-studio-muted/25 select-none leading-none">
                  {displayMonogram}
                </span>
                <div>
                  <span className="font-display font-bold text-xs sm:text-sm tracking-wide block text-studio-text truncate max-w-[150px] sm:max-w-none">
                    {fallbackLabel || "Ahmad Rafi Sutanto"}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono block text-studio-faint truncate max-w-[150px] sm:max-w-none">
                    {fallbackSub || "Digital Forensics & Security Research"}
                  </span>
                </div>
              </div>
            ) : fallbackType === "research" ? (
              <div className="w-full text-left space-y-2 font-mono text-xs max-w-sm">
                <div className="flex items-baseline justify-between text-[10px] sm:text-[11px] pb-1 border-b border-studio-border font-semibold text-studio-accent-light">
                  <span>SECURITY ARTIFACT DOSSIER</span>
                  <span>VERIFIED</span>
                </div>
                <div className="space-y-1 text-[10px] sm:text-[11px] text-studio-muted">
                  <div>[MEMORY] Volatility 3 triage evidence</div>
                  <div>[SYSTEM] systemd Journal audit trail</div>
                  <div>[CI/CD] Automated GitHub Actions build pipeline</div>
                </div>
              </div>
            ) : (
              <div className="w-full text-left space-y-1.5 max-w-sm">
                <span className="text-3xl sm:text-5xl font-display font-black block text-studio-muted/25 leading-none">
                  {displayMonogram}
                </span>
                <div>
                  <span className="font-display font-bold text-xs sm:text-sm sm:text-base block text-studio-text truncate">
                    {fallbackLabel || alt}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono block text-studio-faint truncate">
                    {fallbackSub || "Documentation Artifact"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Footnote */}
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono pt-2 border-t border-studio-border text-studio-faint relative z-10">
            <span>FIGURE REF</span>
            <span className="truncate max-w-[140px] text-studio-muted">{alt}</span>
          </div>
        </div>
      )}
    </div>
  );
}
