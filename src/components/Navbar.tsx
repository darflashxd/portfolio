"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X, FileText } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { openResumeModal } from "@/components/ui/ResumeModal";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "About", href: "#about", num: "01", id: "about" },
  { label: "Skills", href: "#skills", num: "02", id: "skills" },
  { label: "Projects", href: "#projects", num: "03", id: "projects" },
  { label: "Experiences", href: "#experience", num: "04", id: "experience" },
  { label: "Writeups", href: "#writeups", num: "05", id: "writeups" },
  { label: "Contact", href: "#contact", num: "06", id: "contact" },
];

export function Navbar({ isLoaded = false }: { isLoaded?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { siteInfo, socials } = portfolioData;
  const reduced = useReducedMotion();

  // Synchronized scroll listener with rAF throttle for navbar styling and active section highlighting
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 1. Bottom of page -> contact
      if (scrollY + windowHeight >= docHeight - 60) {
        setActiveSection("contact");
        return;
      }

      // 2. Near top (Hero area) -> clear active section
      if (scrollY < 180) {
        setActiveSection("");
        return;
      }

      // 3. Focal line at 35% of viewport
      const targetY = windowHeight * 0.35;
      let matched = "";

      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= targetY && rect.bottom > targetY) {
            matched = item.id;
            break;
          }
        }
      }

      if (matched) {
        setActiveSection(matched);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // initialize on mount

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileOpen(false);
      };
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.body.classList.remove("modal-open");
        document.removeEventListener("keydown", onKeyDown);
      };
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    }
  }, [mobileOpen]);

  return (
    <>
      {/* ── Floating Liquid Glass Island Capsule Header ── */}
      <motion.header
        initial={reduced ? false : { opacity: 0, y: -24 }}
        animate={reduced || isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-3 sm:top-5 inset-x-0 z-50 mx-auto w-[94%] max-w-6xl"
      >
        <div
          className={cn(
            "glass-capsule rounded-full transition-all duration-300 px-4 sm:px-6 lg:px-7 py-2.5 sm:py-3 flex items-center justify-between gap-4",
            scrolled
              ? "shadow-[0_22px_55px_-10px_rgba(0,0,0,0.9)]"
              : "shadow-[0_14px_40px_-6px_rgba(0,0,0,0.65)]"
          )}
        >
          {/* Brand Monogram Badge */}
          <a
            href="#hero"
            className="group flex items-center gap-2.5 text-studio-text focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent rounded-full shrink-0"
            aria-label={`${siteInfo.name} - Home`}
          >
            <span className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/15 flex items-center justify-center font-display text-studio-accent-light font-extrabold text-sm shadow-sm group-hover:border-studio-cyan-light/50 transition-colors">
              {siteInfo.initials}
            </span>
            <span className="font-display font-bold tracking-tight text-xs sm:text-sm uppercase hidden min-[440px]:inline-block text-white">
              {siteInfo.name}
            </span>
          </a>

          {/* Desktop Navigation with Dynamic Active Glass Pill */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-6" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "text-xs font-sans font-semibold tracking-wider uppercase transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-studio-accent relative group py-1 px-1",
                    isActive
                      ? "text-white font-bold"
                      : "text-studio-muted hover:text-white"
                  )}
                >
                  <span>{item.label}</span>
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-studio-cyan via-sky-400 to-blue-500 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-studio-accent-light/60 group-hover:w-full transition-all duration-300 rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right side: quick dossier button + email + mobile toggle with distinct divider */}
          <div className="flex items-center gap-2.5 sm:gap-3 pl-2 sm:pl-3 md:border-l md:border-white/10 shrink-0">
            <button
              type="button"
              onClick={openResumeModal}
              className="glass-btn-primary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-sans font-bold text-sky-200 tracking-wider transition-all shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-studio-accent shrink-0"
              aria-label="Open Candidate Dossier"
            >
              <FileText className="w-3 h-3 text-sky-300" />
              <span>RESUME</span>
            </button>

            <a
              href={`mailto:${socials.email}`}
              className="hidden xl:inline-flex items-center gap-1 text-xs font-sans text-studio-muted hover:text-studio-accent-light tracking-wide transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-studio-accent pl-1 font-medium shrink-0"
            >
              <span>{socials.email}</span>
              <ArrowUpRight className="w-3 h-3 text-studio-faint" />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden min-w-[38px] min-h-[38px] rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-studio-text hover:text-studio-accent-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent"
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-[#06080F]/95 backdrop-blur-xl text-studio-text flex flex-col justify-between p-8 sm:p-12 md:hidden animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <span className="font-display font-bold text-sm uppercase tracking-tight text-white">
              {siteInfo.name}
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-studio-text hover:text-studio-accent-light focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-accent"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 my-auto py-6" aria-label="Mobile navigation links">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "group flex items-baseline gap-4 text-2xl sm:text-3xl font-display font-bold transition-colors",
                    isActive
                      ? "text-studio-accent-light"
                      : "text-studio-text hover:text-studio-accent-light"
                  )}
                >
                  <span className="text-xs font-mono text-studio-accent-light font-semibold">
                    {item.num}
                  </span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openResumeModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full glass-btn-primary text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md"
            >
              <FileText className="w-4 h-4 text-sky-300" />
              <span>OPEN RESUME / CV VIEWER</span>
            </button>

            <div className="space-y-1 pt-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-studio-faint block">
                DIRECT INQUIRIES
              </span>
              <a
                href={`mailto:${socials.email}`}
                className="text-sm font-mono text-studio-text hover:text-studio-accent-light flex items-center gap-1.5"
              >
                <span>{socials.email}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
