"use client";

import { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "motion/react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
}

/**
 * SpotlightCard — subtle cursor-follow glow with spring physics.
 * Position + opacity are Motion values (no React re-render per mousemove).
 * Stiffness ~150 / damping ~20 gives a calm, trailing response — never a
 * laser-chasing effect. Glow is low-opacity and radial.
 */
export function SpotlightCard({
  children,
  spotlightColor = "rgb(var(--accent-crimson) / 0.15)",
  className = "",
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glow = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 150, damping: 22, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 150, damping: 22, mass: 0.4 });
  const sGlow = useSpring(glow, { stiffness: 120, damping: 26 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mx.set(e.clientX - rect.left);
      my.set(e.clientY - rect.top);
    },
    [mx, my]
  );

  const handleMouseEnter = useCallback(() => {
    glow.set(0.85);
  }, [glow]);

  const handleMouseLeave = useCallback(() => {
    glow.set(0);
  }, [glow]);

  const handleFocus = useCallback(() => {
    glow.set(0.5);
  }, [glow]);

  const handleBlur = useCallback(() => {
    glow.set(0);
  }, [glow]);

  const spotlightTemplate = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, ${spotlightColor}, transparent 70%)`;

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
      <motion.div
        className="pointer-events-none absolute -inset-px z-10"
        style={{ opacity: sGlow, background: spotlightTemplate }}
        aria-hidden="true"
      />
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}
