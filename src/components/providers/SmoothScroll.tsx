"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Respect prefers-reduced-motion, Firefox (built-in native APZ compositor), or touch devices (native 120Hz momentum scroll)
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isFirefox = typeof navigator !== "undefined" && /firefox/i.test(navigator.userAgent);
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isFirefox || isTouch) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    let rafId: number = 0;
    let idleFrames = 0;

    function raf(time: number) {
      lenis.raf(time);
      if (Math.abs(lenis.velocity) < 0.05 && !lenis.isScrolling) {
        idleFrames++;
        if (idleFrames > 30) {
          rafId = 0;
          return;
        }
      } else {
        idleFrames = 0;
      }
      rafId = requestAnimationFrame(raf);
    }

    function wakeUp() {
      idleFrames = 0;
      if (rafId === 0) {
        rafId = requestAnimationFrame(raf);
      }
    }

    wakeUp();

    window.addEventListener("wheel", wakeUp, { passive: true });
    window.addEventListener("scroll", wakeUp, { passive: true });
    window.addEventListener("keydown", wakeUp, { passive: true });

    return () => {
      if (rafId !== 0) cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", wakeUp);
      window.removeEventListener("scroll", wakeUp);
      window.removeEventListener("keydown", wakeUp);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
