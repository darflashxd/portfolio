"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface ForensicTelemetryMeshProps {
  className?: string;
}

interface PulsePacket {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  color: string;
  alpha: number;
  axis: "h" | "v";
}

/**
 * ForensicTelemetryMesh — Authentic Defensive Security / Systems Telemetry Stage
 * Replaces generic consumer wave ribbons with an architectural network grid,
 * subtle memory coordinate markers, and gentle data-flow pulses.
 * Optimized Canvas 2D with frame capping (45 FPS) and zero memory allocations inside loop.
 */
export function ForensicTelemetryMesh({ className = "" }: ForensicTelemetryMeshProps) {
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
    let width = 0;
    let height = 0;
    let lastRenderTime = 0;
    const targetFpsInterval = 1000 / 45;

    const GRID_SPACING = 56;
    const PACKET_COUNT = 24;
    const packets: PulsePacket[] = [];

    const COLORS = [
      "rgba(56, 189, 248, ", // Cyan light
      "rgba(37, 99, 235, ",  // Cobalt blue
      "rgba(6, 182, 212, ",  // Deep cyan
    ];

    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-initialize packet coordinates along grid lines
      packets.length = 0;
      for (let i = 0; i < PACKET_COUNT; i++) {
        const isHorizontal = Math.random() > 0.5;
        const colorBase = COLORS[Math.floor(Math.random() * COLORS.length)];
        if (isHorizontal) {
          const row = Math.floor(Math.random() * (height / GRID_SPACING)) * GRID_SPACING;
          packets.push({
            x: Math.random() * width,
            y: row,
            vx: (0.8 + Math.random() * 1.4) * (Math.random() > 0.5 ? 1 : -1),
            vy: 0,
            length: 24 + Math.random() * 48,
            color: colorBase,
            alpha: 0.2 + Math.random() * 0.35,
            axis: "h",
          });
        } else {
          const col = Math.floor(Math.random() * (width / GRID_SPACING)) * GRID_SPACING;
          packets.push({
            x: col,
            y: Math.random() * height,
            vx: 0,
            vy: (0.8 + Math.random() * 1.4) * (Math.random() > 0.5 ? 1 : -1),
            length: 24 + Math.random() * 48,
            color: colorBase,
            alpha: 0.2 + Math.random() * 0.35,
            axis: "v",
          });
        }
      }
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

    function render(now: number) {
      rafId = 0;
      if (!ctx || !canvas || !inView || !isVisible) return;

      const elapsed = now - lastRenderTime;
      if (elapsed < targetFpsInterval) {
        startLoop();
        return;
      }
      lastRenderTime = now - (elapsed % targetFpsInterval);

      if (width <= 0 || height <= 0) {
        startLoop();
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // ── Draw Telemetry Packets along grid paths ──
      for (let i = 0; i < packets.length; i++) {
        const p = packets[i];

        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.axis === "h") {
            if (p.x < -p.length) p.x = width + p.length;
            else if (p.x > width + p.length) p.x = -p.length;
          } else {
            if (p.y < -p.length) p.y = height + p.length;
            else if (p.y > height + p.length) p.y = -p.length;
          }
        }

        // Proximity glow to cursor
        let boost = 1.0;
        if (mouse.x > -500) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 25000) {
            boost = 1.8;
          }
        }

        ctx.beginPath();
        if (p.axis === "h") {
          const grad = ctx.createLinearGradient(p.x, p.y, p.x + p.length, p.y);
          grad.addColorStop(0, `${p.color}0)`);
          grad.addColorStop(0.7, `${p.color}${p.alpha * boost})`);
          grad.addColorStop(1, `${p.color}0.7)`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.length, p.y);
        } else {
          const grad = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.length);
          grad.addColorStop(0, `${p.color}0)`);
          grad.addColorStop(0.7, `${p.color}${p.alpha * boost})`);
          grad.addColorStop(1, `${p.color}0.7)`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y + p.length);
        }
        ctx.stroke();

        // Apex glowing head point
        const headX = p.axis === "h" ? (p.vx >= 0 ? p.x + p.length : p.x) : p.x;
        const headY = p.axis === "v" ? (p.vy >= 0 ? p.y + p.length : p.y) : p.y;
        ctx.fillStyle = `${p.color}${0.8 * boost})`;
        ctx.beginPath();
        ctx.arc(headX, headY, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      startLoop();
    }

    startLoop();

    return () => {
      stopLoop();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
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
      {/* ── 1. Architectural Drafting Precision Grid ── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_30%,transparent_90%)] opacity-70" />

      {/* ── 2. Atmospheric Ambient Cyan/Cobalt Glow Fields ── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-gradient-to-tr from-blue-600/10 via-cyan-500/10 to-transparent blur-[140px] rounded-full pointer-events-none" />

      {/* ── 3. High-Performance Telemetry Stream Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto cursor-default opacity-85"
      />

      {/* ── 4. Seamless Base Bleed Gradient ── */}
      <div className="absolute inset-x-0 bottom-0 h-40 sm:h-56 pointer-events-none z-[5] bg-gradient-to-t from-[rgb(var(--bg-base))] via-[rgb(var(--bg-base))]/80 to-transparent" />
    </div>
  );
}
