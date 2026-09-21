import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* ── Semantic studio palette (Blue Team Luminous Defense) ── */
        studio: {
          bg: "rgb(var(--bg-base) / <alpha-value>)",
          surface: "rgb(var(--bg-surface) / <alpha-value>)",
          card: "rgb(var(--bg-elevated) / <alpha-value>)",
          elevated: "rgb(var(--bg-elevated) / <alpha-value>)",
          border: "rgba(255, 255, 255, 0.08)",
          "border-hover": "rgba(56, 189, 248, 0.25)",
          text: "rgb(var(--text-primary) / <alpha-value>)",
          muted: "rgb(var(--text-muted) / <alpha-value>)",
          faint: "rgb(var(--text-faint) / <alpha-value>)",
          /* Primary Blue Team Accent — Electric Cobalt & Luminous Ice Blue */
          accent: "rgb(var(--accent-cobalt) / <alpha-value>)",
          "accent-light": "#38bdf8", // Luminous Ice Blue (> 7:1 contrast on dark canvas)
          /* Technical Accent — Cyber Cyan */
          cyan: "rgb(var(--accent-cyan) / <alpha-value>)",
          "cyan-light": "#38bdf8",
          /* SOC Status Accent — Amber Gold */
          amber: "rgb(var(--accent-amber) / <alpha-value>)",
          "amber-light": "#f59e0b",
          /* Direct Color Primitives */
          blue: "#2563eb",
          "blue-light": "#60a5fa",
          ice: "#bae6fd",
        },
        /* ── Section temperature undertones (same system, subtle shift) ── */
        temp: {
          hero: "rgb(var(--tone-hero) / <alpha-value>)",
          about: "rgb(var(--tone-about) / <alpha-value>)",
          skills: "rgb(var(--tone-skills) / <alpha-value>)",
          projects: "rgb(var(--tone-projects) / <alpha-value>)",
          experience: "rgb(var(--tone-experience) / <alpha-value>)",
          contact: "rgb(var(--tone-contact) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        monumental: "-0.045em",
        tighter: "-0.025em",
        tight: "-0.015em",
        wide: "0.08em",
        widest: "0.22em",
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "marquee-reverse": "marquee-reverse 28s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
