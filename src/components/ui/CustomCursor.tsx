"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useReducedMotion } from "motion/react";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);
  const reduced = useReducedMotion();

  // Exact pointer coordinates (Zero latency for clicking accuracy & instant tracking)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktops/laptops)
    if (window.matchMedia("(pointer: coarse)").matches || reduced) {
      return;
    }

    setMounted(true);
    document.body.classList.add("custom-cursor-active");

    const updateVisibility = (visible: boolean) => {
      if (isVisibleRef.current !== visible) {
        isVisibleRef.current = visible;
        setIsVisible(visible);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (document.body.classList.contains("modal-open") || document.body.style.overflow === "hidden") {
        updateVisibility(false);
        return;
      }

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Automatically hide custom cursor when inside modals/dialogs or hovering iframes
      const insideDialog = target.closest("[role='dialog'], iframe");
      if (insideDialog) {
        updateVisibility(false);
        return;
      }

      updateVisibility(true);

      const interactive = target.closest("a, button, [role='button'], input, textarea, select, label, [tabindex='0']");
      setIsHovering(!!interactive);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseEnter = () => updateVisibility(true);
    const onMouseLeave = () => {
      updateVisibility(false);
      setIsHovering(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [cursorX, cursorY, reduced]);

  if (!mounted || reduced) return null;

  return (
    <>
      {/* 1. Precision Center Dot (Exact position, zero latency) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full mix-blend-screen custom-cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: 5,
          height: 5,
          backgroundColor: "#38bdf8",
          boxShadow: "0 0 8px 1.5px rgba(56, 189, 248, 0.95)",
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* 2. Outer Cyber Reticle Ring (Always locked 1:1 on position, spring scale on hover/click) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[99] rounded-full mix-blend-screen custom-cursor-ring"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: 26,
          height: 26,
          border: isHovering
            ? "1.5px solid rgba(56, 189, 248, 0.85)"
            : "1px solid rgba(6, 182, 212, 0.5)",
          background: isHovering
            ? "radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(37, 99, 235, 0.08) 50%, transparent 75%)"
            : "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)",
          boxShadow: isHovering
            ? "0 0 20px 2px rgba(56, 189, 248, 0.45)"
            : "0 0 10px 1px rgba(6, 182, 212, 0.18)",
        }}
        animate={{
          scale: isClicking ? 0.75 : isHovering ? 1.75 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 26,
          mass: 0.2,
        }}
      />
    </>
  );
}
