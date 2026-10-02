"use client";

import { useRef, useState, useCallback } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
}

/**
 * SpotlightCard — GPU-accelerated cursor-follow glow via CSS Custom Properties.
 * Zero JavaScript animation frame overhead while maintaining 100% fluid visual sheen.
 */
export function SpotlightCard({
  children,
  spotlightColor = "rgb(var(--accent-crimson) / 0.15)",
  className = "",
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const reduced = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      const rect = rectRef.current || el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--spotlight-x", `${x}px`);
      el.style.setProperty("--spotlight-y", `${y}px`);
    },
    [reduced]
  );

  const handleMouseEnter = useCallback(() => {
    if (reduced) return;
    rectRef.current = ref.current?.getBoundingClientRect() ?? null;
    setIsHovered(true);
  }, [reduced]);

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
    setIsHovered(false);
  }, []);

  const handleFocus = useCallback(() => {
    if (reduced) return;
    setIsHovered(true);
  }, [reduced]);

  const handleBlur = useCallback(() => {
    setIsHovered(false);
  }, []);

  if (reduced) {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-2xl overflow-hidden bg-studio-surface border border-studio-border transition-colors duration-300",
          className
        )}
        {...props}
      >
        <div className="relative z-20 h-full">{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-2xl overflow-hidden bg-studio-surface border border-studio-border transition-colors duration-300",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(420px circle at var(--spotlight-x, -500px) var(--spotlight-y, -500px), ${spotlightColor}, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}
