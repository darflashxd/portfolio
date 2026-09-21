"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

/**
 * ImageReveal — editorial photography transition.
 * Container clips overflow; the inner layer settles from a gentle
 * scale 1.05 → 1.0 with a soft opacity rise. Slow, calm, print-like.
 * Respects prefers-reduced-motion: renders static.
 */
export function ImageReveal({
  children,
  className = "",
  delay = 0,
  duration = 1.0,
}: ImageRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn("overflow-hidden", className)}>{children}</div>;
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.05, opacity: 0.6 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
