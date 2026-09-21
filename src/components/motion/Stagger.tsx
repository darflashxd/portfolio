"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  y?: number;
}

/**
 * StaggerContainer / StaggerItem — coordinated child reveals.
 * Container triggers once in viewport; children inherit variants.
 * Respects prefers-reduced-motion: everything renders visible.
 */
export function StaggerContainer({
  children,
  className = "",
  stagger = 0.09,
  delay = 0,
}: StaggerContainerProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  y = 18,
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
