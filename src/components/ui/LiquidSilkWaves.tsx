"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface LiquidSilkWavesProps {
  className?: string;
}

interface WaveConfig {
  amplitude: number;
  frequency: number;
  speed: number;
  harmonicFreq: number;
  harmonicAmp: number;
  yOffsetRatio: number;
  gradientColors: [string, string, string];
}

const WAVES: WaveConfig[] = [
  // Wave 1: Background Ambient Indigo/Violet (WWDC Prismatic Bloom)
  {
    amplitude: 75,
    frequency: 0.0018,
    speed: 0.018,
    harmonicFreq: 0.0036,
    harmonicAmp: 25,
    yOffsetRatio: 0.38,
    gradientColors: [
      "rgba(99, 102, 241, 0.32)", // Electric Indigo
      "rgba(147, 51, 234, 0.18)", // Deep Violet
      "rgba(6, 8, 15, 0)",
    ],
  },
  // Wave 2: Mid-layer Royal Cobalt Blue (Stage Depth)
  {
    amplitude: 95,
    frequency: 0.0022,
    speed: -0.022,
    harmonicFreq: 0.0044,
    harmonicAmp: 30,
    yOffsetRatio: 0.44,
    gradientColors: [
      "rgba(37, 99, 235, 0.38)", // Royal Cobalt
      "rgba(30, 58, 138, 0.22)", // Midnight Navy
      "rgba(6, 8, 15, 0)",
    ],
  },
  // Wave 3: Foreground Electric Cyan (Signature Apple Intelligence Iris)
  {
    amplitude: 65,
    frequency: 0.0026,
    speed: 0.026,
    harmonicFreq: 0.0052,
    harmonicAmp: 20,
    yOffsetRatio: 0.48,
    gradientColors: [
      "rgba(56, 189, 248, 0.45)", // Luminous Cyan
      "rgba(14, 165, 233, 0.25)", // Sky Blue
      "rgba(6, 8, 15, 0)",
    ],
  },
  // Wave 4: Surface Crest Highlight (Glowing Silk Hairline Ribbon)
  {
    amplitude: 50,
    frequency: 0.0032,
    speed: -0.030,
    harmonicFreq: 0.0064,
    harmonicAmp: 18,
    yOffsetRatio: 0.52,
    gradientColors: [
      "rgba(224, 242, 254, 0.55)", // Ice White Apex
      "rgba(56, 189, 248, 0.28)", // Cyan Glow
      "rgba(6, 8, 15, 0)",
    ],
  },
];

export function LiquidSilkWaves({ className = "" }: LiquidSilkWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let rafId = 0;
    let isVisible = document.visibilityState === "visible";
    let inView = true;
    let time = 0;

    // Mouse interactive target & lerp smoothing
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const parent = canvas.parentElement || window;
    parent.addEventListener("mousemove", handleMouseMove as EventListener);
    parent.addEventListener("mouseleave", handleMouseLeave as EventListener);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true;
      if (inView && isVisible) startLoop();
      else stopLoop();
    });
    observer.observe(canvas);

    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
      if (isVisible && inView) startLoop();
      else stopLoop();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    function startLoop() {
      if (rafId === 0) {
        rafId = requestAnimationFrame(render);
      }
    }

    function stopLoop() {
      if (rafId !== 0) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    const timeMultiplier = reduced ? 0.2 : 1.0;

    function render() {
      rafId = 0;
      if (!ctx || !canvas) return;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Mouse lerp damping
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Optical additive blending mode (WWDC Luminous Glare effect)
      ctx.globalCompositeOperation = "screen";

      time += 0.015 * timeMultiplier;

      WAVES.forEach((wave, idx) => {
        const baseY = height * wave.yOffsetRatio;
        ctx.beginPath();
        ctx.moveTo(0, height);

        const step = 12; // Segment resolution for buttery performance
        let firstX = 0;
        let firstY = baseY;

        for (let x = 0; x <= width + step; x += step) {
          // Dual harmonic sine wave calculation (folded liquid silk curve)
          const primary = Math.sin(x * wave.frequency + time * wave.speed * 60 + idx) * wave.amplitude;
          const harmonic = Math.cos(x * wave.harmonicFreq - time * wave.speed * 40) * wave.harmonicAmp;

          // Interactive magnetic crest perturbation near cursor
          let mousePerturb = 0;
          if (mouse.x > -500) {
            const dist = Math.abs(x - mouse.x);
            if (dist < 260) {
              const falloff = Math.cos((dist / 260) * (Math.PI / 2));
              mousePerturb = Math.sin(time * 3 + idx) * 32 * falloff;
            }
          }

          const y = baseY + primary + harmonic + mousePerturb;

          if (x === 0) {
            firstX = x;
            firstY = y;
            ctx.lineTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Close path down to the bottom
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        // Layered Vertical Fade Gradient
        const grad = ctx.createLinearGradient(0, baseY - wave.amplitude, 0, height);
        grad.addColorStop(0, wave.gradientColors[0]);
        grad.addColorStop(0.35, wave.gradientColors[1]);
        grad.addColorStop(1, wave.gradientColors[2]);

        ctx.fillStyle = grad;
        ctx.fill();

        // Draw crisp luminous crest line
        ctx.beginPath();
        ctx.moveTo(firstX, firstY);
        for (let x = 0; x <= width + step; x += step) {
          const primary = Math.sin(x * wave.frequency + time * wave.speed * 60 + idx) * wave.amplitude;
          const harmonic = Math.cos(x * wave.harmonicFreq - time * wave.speed * 40) * wave.harmonicAmp;

          let mousePerturb = 0;
          if (mouse.x > -500) {
            const dist = Math.abs(x - mouse.x);
            if (dist < 260) {
              const falloff = Math.cos((dist / 260) * (Math.PI / 2));
              mousePerturb = Math.sin(time * 3 + idx) * 32 * falloff;
            }
          }

          const y = baseY + primary + harmonic + mousePerturb;
          ctx.lineTo(x, y);
        }

        ctx.lineWidth = idx === 3 ? 1.5 : 1.0;
        ctx.strokeStyle = wave.gradientColors[0];
        ctx.stroke();
      });

      // Reset composite operation
      ctx.globalCompositeOperation = "source-over";

      startLoop();
    }

    startLoop();

    return () => {
      stopLoop();
      parent.removeEventListener("mousemove", handleMouseMove as EventListener);
      parent.removeEventListener("mouseleave", handleMouseLeave as EventListener);
      window.removeEventListener("resize", resize);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none select-none z-0",
        className
      )}
    >
      {/* ── 1. Delicate Precision Drafting Grid Overlay (Architectural Rigor) ── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_30%,transparent_90%)] opacity-60" />

      {/* ── 2. Fluid Silk Waves Canvas (60–120fps Canvas 2D) ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto cursor-default opacity-85"
      />

      {/* ── 3. Atmospheric Stage Bleed to Sections Below ── */}
      <div className="absolute inset-x-0 bottom-0 h-44 sm:h-64 pointer-events-none z-[5] bg-gradient-to-t from-[rgb(var(--bg-base))] via-[rgb(var(--bg-base))]/80 to-transparent" />
    </div>
  );
}
