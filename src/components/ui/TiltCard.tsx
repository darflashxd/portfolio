"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  maxTilt?: number;
  spotlightColor?: string;
  className?: string;
  id?: string;
}

/**
 * TiltCard (Pop & Lift) — smooth tactile elevation card with specular glare sheen.
 * Replaces disruptive 3D angular rotation with clean Y-axis lift and subtle scale pop,
 * preserving 100% crisp text readability while providing tactile feedback.
 */
export function TiltCard({
  children,
  spotlightColor = "rgba(56, 189, 248, 0.15)",
  className = "",
  id,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const reduced = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 320, damping: 24, mass: 0.35 };
  const sX = useSpring(mouseX, springConfig);
  const sY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return;
      const rect = rectRef.current || ref.current?.getBoundingClientRect();
      if (!rect) return;

      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY, reduced]
  );

  const handleMouseEnter = () => {
    if (reduced) return;
    rectRef.current = ref.current?.getBoundingClientRect() ?? null;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    setIsHovered(false);
  };

  const glareTemplate = useMotionTemplate`radial-gradient(520px circle at ${sX}px ${sY}px, ${spotlightColor}, transparent 65%)`;

  if (reduced) {
    return (
      <div id={id} className={cn("relative rounded-3xl overflow-hidden", className)}>
        {children}
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <motion.div
        ref={ref}
        id={id}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.015 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 340,
          damping: 24,
          mass: 0.4,
        }}
        className={cn(
          "relative rounded-3xl overflow-hidden transition-shadow duration-500",
          isHovered
            ? "shadow-[0_24px_60px_-10px_rgba(0,0,0,0.75),0_0_35px_rgba(37,99,235,0.18)]"
            : "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
          className
        )}
      >
        {/* Specular Glare Glass Sheen */}
        <motion.div
          className="pointer-events-none absolute -inset-px z-20 rounded-3xl transition-opacity duration-300"
          style={{
            background: glareTemplate,
            opacity: isHovered ? 1 : 0,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 h-full">{children}</div>
      </motion.div>
    </div>
  );
}
