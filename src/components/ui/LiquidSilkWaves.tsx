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
      "rgba(99, 102, 241, 0.30)", // Electric Indigo
      "rgba(147, 51, 234, 0.16)", // Deep Violet
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
      "rgba(37, 99, 235, 0.35)", // Royal Cobalt
      "rgba(30, 58, 138, 0.20)", // Midnight Navy
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
      "rgba(56, 189, 248, 0.42)", // Luminous Cyan
      "rgba(14, 165, 233, 0.22)", // Sky Blue
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
      "rgba(224, 242, 254, 0.50)", // Ice White Apex
      "rgba(56, 189, 248, 0.25)", // Cyan Glow
      "rgba(6, 8, 15, 0)",
    ],
  },
];

export function LiquidSilkWaves({ className = "" }: LiquidSilkWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let rafId = 0;
    let isVisible = document.visibilityState === "visible";
    let inView = true;
    let time = 0;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let cachedGradients: CanvasGradient[] = [];
    let lastRenderTime = 0;
    const targetFpsInterval = 1000 / 45; // 45 FPS saves CPU while maintaining fluid motion
    const pointsY = new Float32Array(300); // Reusable coordinate cache to eliminate duplicate trigonometry math

    // Mouse target with lerping
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    let containerRect: DOMRect | null = null;
    const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

    const updateContainerRect = () => {
      if (container) {
        containerRect = container.getBoundingClientRect();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!inView) return;
      if (!containerRect) updateContainerRect();
      if (!containerRect) return;
      mouse.targetX = e.clientX - containerRect.left;
      mouse.targetY = e.clientY - containerRect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    if (!isTouch) {
      container.addEventListener("mousemove", handleMouseMove, { passive: true });
      container.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      window.addEventListener("scroll", updateContainerRect, { passive: true });
    }

    const buildGradients = () => {
      if (!ctx || canvasHeight <= 0) return;
      cachedGradients = WAVES.map((wave) => {
        const baseY = canvasHeight * wave.yOffsetRatio;
        const grad = ctx.createLinearGradient(0, baseY - wave.amplitude, 0, canvasHeight);
        grad.addColorStop(0, wave.gradientColors[0]);
        grad.addColorStop(0.35, wave.gradientColors[1]);
        grad.addColorStop(1, wave.gradientColors[2]);
        return grad;
      });
    };

    const resize = () => {
      updateContainerRect();
      const rect = containerRect || container.getBoundingClientRect();
      canvasWidth = rect.width;
      canvasHeight = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, isTouch ? 1.0 : 1.25);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGradients();
    };

    resize();
    window.addEventListener("resize", resize);

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true;
      if (inView && isVisible) startLoop();
      else stopLoop();
    });
    observer.observe(container);

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

    function render(now: number) {
      rafId = 0;
      if (!ctx || !canvas || !inView || !isVisible) return;

      const elapsed = now - lastRenderTime;
      if (elapsed < targetFpsInterval) {
        startLoop();
        return;
      }
      lastRenderTime = now - (elapsed % targetFpsInterval);

      const width = canvasWidth;
      const height = canvasHeight;

      if (width <= 0 || height <= 0) {
        startLoop();
        return;
      }

      // Mouse lerp damping (only when active)
      if (mouse.x > -500 || mouse.targetX > -500) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "screen";

      time += 0.015 * timeMultiplier;

      const step = isTouch ? 30 : width < 640 ? 26 : 20;
      const waveCount = WAVES.length;

      for (let idx = 0; idx < waveCount; idx++) {
        const wave = WAVES[idx];
        const baseY = height * wave.yOffsetRatio;
        ctx.beginPath();
        ctx.moveTo(0, height);

        let firstX = 0;
        let firstY = baseY;
        let pointCount = 0;

        for (let x = 0; x <= width + step; x += step) {
          const primary = Math.sin(x * wave.frequency + time * wave.speed * 60 + idx) * wave.amplitude;
          const harmonic = Math.cos(x * wave.harmonicFreq - time * wave.speed * 40) * wave.harmonicAmp;

          let mousePerturb = 0;
          if (mouse.x > -500) {
            const dist = Math.abs(x - mouse.x);
            if (dist < 260) {
              const falloff = Math.cos((dist / 260) * (Math.PI / 2));
              mousePerturb = Math.sin(time * 3 + idx) * 28 * falloff;
            }
          }

          const y = baseY + primary + harmonic + mousePerturb;
          if (pointCount < 300) {
            pointsY[pointCount] = y;
          }

          if (pointCount === 0) {
            firstX = x;
            firstY = y;
            ctx.lineTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          pointCount++;
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        // Use cached gradient (zero GC allocation per frame)
        if (cachedGradients[idx]) {
          ctx.fillStyle = cachedGradients[idx];
          ctx.fill();
        }

        // Draw luminous crest line reusing cached Y coordinates (eliminates 50% duplicate trigonometry)
        ctx.beginPath();
        ctx.moveTo(firstX, firstY);
        for (let i = 1, x = step; i < pointCount; i++, x += step) {
          ctx.lineTo(x, pointsY[i]);
        }

        ctx.lineWidth = idx === 3 ? 1.5 : 1.0;
        ctx.strokeStyle = wave.gradientColors[0];
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";
      startLoop();
    }

    startLoop();

    return () => {
      stopLoop();
      if (!isTouch) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("scroll", updateContainerRect);
      }
      window.removeEventListener("resize", resize);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none select-none z-0",
        className
      )}
    >
      {/* ── 1. Delicate Precision Drafting Grid Overlay (Architectural Rigor) ── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_30%,transparent_90%)] opacity-60" />

      {/* ── 2. Fluid Silk Waves Canvas (Optimized 45fps Canvas 2D) ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto cursor-default opacity-85"
      />

      {/* ── 3. Atmospheric Stage Bleed to Sections Below ── */}
      <div className="absolute inset-x-0 bottom-0 h-44 sm:h-64 pointer-events-none z-[5] bg-gradient-to-t from-[rgb(var(--bg-base))] via-[rgb(var(--bg-base))]/80 to-transparent" />
    </div>
  );
}
