import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolioData";

export function Navbar() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/">Rafi</Link>
        <nav aria-label="Main navigation">
          <Link href="/#work">Work</Link><Link href="/#about">About</Link><Link href="/#experience">Experience</Link><Link href="/#writing">Writing</Link><Link href="/#contact">Contact</Link>
          <a className="nav-cv" href={portfolioData.siteInfo.resumeUrl} target="_blank" rel="noopener noreferrer">CV <ArrowUpRight size={14} /><span className="sr-only"> (PDF, opens in new tab)</span></a>
        </nav>
      </div>
    </header>
  );
}
