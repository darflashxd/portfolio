"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

interface KineticCounterProps {
  value: string;
  className?: string;
}

/**
 * KineticCounter — smooth spring animated numerical count-up.
 * Automatically parses prefix, target number, decimal precision, and suffix.
 */
export function KineticCounter({ value, className = "" }: KineticCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const reduced = useReducedMotion();

  // Extract number and affix, e.g. "99.65%" -> 99.65 & "%", "20+" -> 20 & "+"
  const match = value.match(/^([^0-9.]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  const prefix = match ? match[1] : "";
  const numericTarget = match ? parseFloat(match[2]) : 0;
  const suffix = match ? match[3] : "";
  const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0;

  const [current, setCurrent] = useState<number>(reduced ? numericTarget : 0);

  useEffect(() => {
    if (reduced) {
      setCurrent(numericTarget);
      return;
    }

    if (!isInView) return;

    let startTime: number | null = null;
    let animFrame: number;
    const duration = 1400; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Quintic ease out for editorial snap: 1 - pow(1 - x, 4)
      const eased = 1 - Math.pow(1 - progress, 4);
      const val = eased * numericTarget;
      setCurrent(val);

      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        setCurrent(numericTarget);
      }
    };

    animFrame = requestAnimationFrame(step);

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [isInView, numericTarget, reduced]);

  const formatted =
    decimals > 0
      ? current.toFixed(decimals)
      : Math.round(current).toString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
