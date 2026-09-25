"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion } from "motion/react";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

    const checkModalState = () => {
      const isLocked =
        document.body.style.overflow === "hidden" ||
        document.querySelector("[role='dialog']") !== null;
      setIsModalOpen(isLocked);
      if (isLocked) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    };

    const modalObserver = new MutationObserver(checkModalState);
    modalObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["style", "class"],
      childList: true,
      subtree: true,
    });
    checkModalState();

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, label, [tabindex='0']");
      setIsHovering(!!interactive);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousemove", checkHover, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      modalObserver.disconnect();
      document.body.classList.remove("custom-cursor-active");
      document.body.classList.remove("modal-open");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [cursorX, cursorY, reduced, isVisible]);

  if (!mounted || reduced || isModalOpen) return null;

  return (
    <>
      {/* 1. Precision Center Dot (Exact position, zero latency) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[99999] rounded-full mix-blend-screen"
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
        className="pointer-events-none fixed top-0 left-0 z-[99998] rounded-full mix-blend-screen"
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
