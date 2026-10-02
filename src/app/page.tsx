"use client";

import dynamic from "next/dynamic";
import { useScroll, motion } from "motion/react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CandidateStrip } from "@/components/ui/CandidateStrip";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { CTFArchive } from "@/components/CTFArchive";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

// Lazy-load off-screen and desktop-only interactive components for fast First Contentful Paint
const ResumeModal = dynamic(
  () => import("@/components/ui/ResumeModal").then((mod) => mod.ResumeModal),
  { ssr: false }
);

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="relative min-h-screen bg-studio-bg text-studio-text selection:bg-studio-accent/30 selection:text-white">
      {/* Film grain texture */}
      <div className="grain" aria-hidden="true" />

      {/* Cyber Dot-Matrix Grid Blueprint layer (scrolls naturally with canvas) */}
      <div
        className="absolute inset-0 min-h-full cyber-grid cyber-grid-mask opacity-60 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Smooth GPU-composited reading progress hairline */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress, width: "100%" }}
        aria-hidden="true"
      />

      {/* Floating Liquid Glass Island Capsule Header */}
      <Navbar isLoaded={true} />

      <main id="main-content" tabIndex={-1} className="focus:outline-none relative z-10">
        <Hero isLoaded={true} />
        <CandidateStrip />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <CTFArchive />
        <Contact />
      </main>

      <Footer />

      {/* Quick-Preview Candidate Dossier & Embedded Live PDF Viewer Modal */}
      <ResumeModal />
    </div>
  );
}
