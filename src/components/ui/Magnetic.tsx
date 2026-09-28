"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type SpringOptions,
} from "motion/react";

const SPRING_CONFIG: SpringOptions = { stiffness: 150, damping: 15, mass: 0.1 };

export type MagneticProps = {
  children: React.ReactNode;
  intensity?: number;
  range?: number;
  actionArea?: "self" | "parent" | "global";
  springOptions?: SpringOptions;
  className?: string;
};

export function Magnetic({
  children,
  intensity = 0.3,
  range = 100,
  actionArea = "self",
  springOptions = SPRING_CONFIG,
  className = "",
}: MagneticProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springOptions);
  const springY = useSpring(y, springOptions);

  // Attach mousemove ONLY when hovered, avoiding global document polling
  useEffect(() => {
    if (!isHovered || reduced) {
      x.set(0);
      y.set(0);
      return;
    }

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const calculateDistance = (e: MouseEvent) => {
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const absoluteDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (absoluteDistance <= range) {
        const scale = 1 - absoluteDistance / range;
        x.set(distanceX * intensity * scale);
        y.set(distanceY * intensity * scale);
      } else {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", calculateDistance, { passive: true });
    return () => {
      window.removeEventListener("mousemove", calculateDistance);
    };
  }, [isHovered, intensity, range, x, y, reduced]);

  useEffect(() => {
    if (actionArea === "parent" && ref.current?.parentElement) {
      const parent = ref.current.parentElement;

      const handleParentEnter = () => setIsHovered(true);
      const handleParentLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      };

      parent.addEventListener("mouseenter", handleParentEnter);
      parent.addEventListener("mouseleave", handleParentLeave);

      return () => {
        parent.removeEventListener("mouseenter", handleParentEnter);
        parent.removeEventListener("mouseleave", handleParentLeave);
      };
    } else if (actionArea === "global") {
      setIsHovered(true);
    }
  }, [actionArea, x, y]);

  const handleMouseEnter = () => {
    if (actionArea === "self" && !reduced) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (actionArea === "self") {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    }
  };

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseEnter={actionArea === "self" ? handleMouseEnter : undefined}
      onMouseLeave={actionArea === "self" ? handleMouseLeave : undefined}
      style={{
        x: springX,
        y: springY,
      }}
    >
      {children}
    </motion.div>
  );
}
