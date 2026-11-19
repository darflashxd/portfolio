"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { CatMark } from "@/components/Cat";
import { portfolioData } from "@/data/portfolioData";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const sections = ["work", "credentials", "experience", "writing", "contact"];
    const update = () => {
      setActive(sections.filter(id => {
        const node = document.getElementById(id);
        return node && node.getBoundingClientRect().top <= 180;
      }).at(-1) || "");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header className="site-header" onKeyDown={event => { if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); } }}>
      <div className="shell header-inner">
        <Link className="brand" href="/" style={{ display: "inline-flex", alignItems: "center", gap: 9 }}><CatMark />darflashxd</Link>
        <button ref={toggle} className="nav-toggle" type="button" aria-expanded={open} aria-controls="main-nav" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />} Menu</button>
        <nav id="main-nav" data-open={open} aria-label="Main navigation" onClick={() => setOpen(false)}>
          {[["work", "Work"], ["credentials", "Credentials"], ["experience", "Experience"], ["writing", "Writeups"], ["contact", "Contact"]].map(([id, label]) => <Link key={id} href={`/#${id}`} aria-current={active === id ? "location" : undefined}>{label}</Link>)}
          <a className="nav-cv" href={portfolioData.siteInfo.resumeUrl} target="_blank" rel="noopener noreferrer">CV <ArrowUpRight size={14} /><span className="sr-only"> (PDF, opens in new tab)</span></a>
        </nav>
      </div>
    </header>
  );
}
