"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  maxTilt?: number;
  spotlightColor?: string;
  className?: string;
  id?: string;
  depthElevation?: boolean;
}

/**
 * TiltCard — True 2.5D Spatial Glass Card (Igloo.inc / VisionOS grade)
 * Combines spring-damped multi-axis angular tilt, dynamic specular glare,
 * Fresnel physical rim highlight, and CSS preserve-3d Z-layer separation.
 * Zero WebGL overhead — 100% GPU compositor driven.
 */
export function TiltCard({
  children,
  maxTilt = 3.5,
  spotlightColor = "rgba(56, 189, 248, 0.16)",
  className = "",
  id,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const reduced = useReducedMotion();

  // Mouse coordinates inside card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Normalized coordinates: -1 to +1
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const springConfig = { stiffness: 280, damping: 24, mass: 0.4 };
  const sX = useSpring(mouseX, springConfig);
  const sY = useSpring(mouseY, springConfig);
  const sNormX = useSpring(normX, springConfig);
  const sNormY = useSpring(normY, springConfig);

  // 2.5D Tilt angles bounded by maxTilt
  const rotateX = useTransform(sNormY, [-1, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(sNormX, [-1, 1], [-maxTilt, maxTilt]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return;
      const rect = rectRef.current || ref.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseX.set(x);
      mouseY.set(y);

      // Range: -1 to 1
      normX.set((x / rect.width - 0.5) * 2);
      normY.set((y / rect.height - 0.5) * 2);
    },
    [mouseX, mouseY, normX, normY, reduced]
  );

  const handleMouseEnter = () => {
    if (reduced) return;
    rectRef.current = ref.current?.getBoundingClientRect() ?? null;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    setIsHovered(false);
    normX.set(0);
    normY.set(0);
  };

  const glareTemplate = useMotionTemplate`radial-gradient(480px circle at ${sX}px ${sY}px, ${spotlightColor}, transparent 65%)`;

  if (reduced) {
    return (
      <div id={id} className={cn("relative rounded-2xl overflow-hidden", className)}>
        {children}
      </div>
    );
  }

  return (
    <div className="w-full h-full [perspective:1000px]">
      <motion.div
        ref={ref}
        id={id}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: isHovered ? -6 : 0,
          scale: isHovered ? 1.01 : 1,
        }}
        transition={{
          y: { type: "spring", stiffness: 320, damping: 25 },
          scale: { type: "spring", stiffness: 320, damping: 25 },
        }}
        className={cn(
          "relative rounded-2xl transition-shadow duration-500 will-change-transform",
          isHovered
            ? "shadow-[0_24px_50px_-12px_rgba(0,0,0,0.85),0_0_35px_rgba(37,99,235,0.18),inset_0_1px_0_0_rgba(255,255,255,0.22)]"
            : "shadow-[0_8px_30px_rgb(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
          className
        )}
      >
        {/* Dynamic Specular Glare (Physical light sheen following cursor) */}
        <motion.div
          className="pointer-events-none absolute -inset-px z-30 rounded-2xl transition-opacity duration-300 overflow-hidden"
          style={{
            background: glareTemplate,
            opacity: isHovered ? 1 : 0,
          }}
          aria-hidden="true"
        />

        {/* 2.5D Content Stage with preserve-3d to enable translateZ on inner elements */}
        <div className="relative z-10 h-full [transform-style:preserve-3d]">{children}</div>
      </motion.div>
    </div>
  );
}
