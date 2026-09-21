"use client";

import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
  variant?: "field" | "inline";
  showGrid?: boolean;
}

/**
 * LiquidAurora — CSS-only organic gradient field + subtle cyber dot-matrix.
 *
 * Three independently animated radial-gradient blobs driven by the
 * accent tokens (crimson / cyan / amber) with a subtle cyber dot-matrix texture.
 * Heavy blur (100px), low opacity (0.12–0.22), slow 19–27s drift loops.
 *
 * Purely decorative: pointer-events none, aria-hidden, behind content.
 */
export function AuroraBackground({
  className = "",
  variant = "field",
  showGrid = true,
}: AuroraBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        variant === "field"
          ? "aurora-field"
          : "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      {/* Subtle cyber dot-matrix overlay */}
      {showGrid && (
        <div className="absolute inset-0 cyber-grid cyber-grid-mask opacity-60 pointer-events-none" />
      )}

      {/* Atmospheric gradient blobs */}
      <div className="aurora-blob aurora-blob--crimson" />
      <div className="aurora-blob aurora-blob--cyan" />
      <div className="aurora-blob aurora-blob--amber" />
    </div>
  );
}
