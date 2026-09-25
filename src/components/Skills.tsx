"use client";

import {
  Terminal,
  Shield,
  Wrench,
  Cpu,
  Search,
  FileCode2,
  Binary,
  Network,
  Layers,
  Globe,
  Smartphone,
  Box,
  GitBranch,
  Workflow,
  Container,
  Server,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { TiltCard } from "@/components/ui/TiltCard";

export function Skills() {
  const { skills } = portfolioData;

  const forensicsArsenal = [
    {
      name: "Volatility 3",
      category: "Memory Forensics & Triage",
      icon: Terminal,
      color: "text-studio-cyan-light",
    },
    {
      name: "Autopsy",
      category: "Dead-Box Disk Forensics",
      icon: Search,
      color: "text-studio-cyan-light",
    },
    {
      name: "FTK Imager",
      category: "Raw E01 Evidence Carving",
      icon: Wrench,
      color: "text-studio-amber-light",
    },
    {
      name: "Eric Zimmerman Tools",
      category: "Windows Artifact Triage ($MFT)",
      icon: Wrench,
      color: "text-studio-cyan-light",
    },
    {
      name: "Ghidra",
      category: "Static Disassembly & Decompilation",
      icon: Cpu,
      color: "text-studio-cyan-light",
    },
    {
      name: "x64dbg",
      category: "Dynamic Binary Debugging",
      icon: Binary,
      color: "text-studio-cyan-light",
    },
    {
      name: "JADX",
      category: "Android DEX & APK Decompiler",
      icon: Smartphone,
      color: "text-studio-accent-light",
    },
    {
      name: "APKTool",
      category: "Mobile App Disassembly",
      icon: Box,
      color: "text-studio-amber-light",
    },
    {
      name: "Wireshark",
      category: "Packet & Protocol Inspection",
      icon: Network,
      color: "text-studio-accent-light",
    },
    {
      name: "ELF & Extended Attributes",
      category: "Linux Binary & xattr Analysis",
      icon: FileCode2,
      color: "text-studio-cyan-light",
    },
  ];

  const blueTeamArsenal = [
    {
      name: "Splunk SIEM",
      category: "Threat Hunting & Log Search",
      icon: Shield,
      color: "text-studio-accent-light",
    },
    {
      name: "Sysmon Telemetry",
      category: "Host Activity & Network Monitor",
      icon: Shield,
      color: "text-studio-cyan-light",
    },
    {
      name: "Windows Event Logs (EVTX)",
      category: "Security & Logon Auditing",
      icon: Terminal,
      color: "text-studio-cyan-light",
    },
    {
      name: "Burp Suite",
      category: "Web Proxy & Traffic Triage",
      icon: Globe,
      color: "text-studio-amber-light",
    },
    {
      name: "YARA Rules",
      category: "Malware Signature Detection",
      icon: Shield,
      color: "text-studio-accent-light",
    },
    {
      name: "Sigma Rules",
      category: "Detection as Code & SIEM Rules",
      icon: Layers,
      color: "text-studio-accent-light",
    },
    {
      name: "Linux",
      category: "Systems Hardening & systemd",
      icon: Server,
      color: "text-studio-cyan-light",
    },
    {
      name: "Docker",
      category: "Container Isolation & Sandboxing",
      icon: Container,
      color: "text-studio-cyan-light",
    },
    {
      name: "CI/CD (GitHub Actions)",
      category: "Automated Deployment Pipelines",
      icon: Workflow,
      color: "text-studio-accent-light",
    },
    {
      name: "Git",
      category: "Version Control & Integrity Audit",
      icon: GitBranch,
      color: "text-studio-amber-light",
    },
  ];

  return (
    <section
      id="skills"
      className="py-28 sm:py-36 bg-temp-skills text-studio-text border-b border-studio-border relative overflow-hidden"
    >
      {/* Ambient Cool Cyan / Indigo Glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[350px] bg-studio-cyan/5 blur-[160px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <Reveal className="mb-14 sm:mb-20">
          <div className="pb-4 border-b border-studio-border mb-8">
            <h2 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-studio-muted">
              TECHNICAL TOOLKIT &amp; CAPABILITIES
            </h2>
          </div>
          <div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-monumental leading-[0.95] text-studio-text">
              SPECIALIST ARSENAL
              <span className="block font-display font-extrabold uppercase tracking-monumental text-studio-cyan-light text-3xl sm:text-5xl md:text-6xl mt-1">
                &amp; OPERATIONAL TOOLKIT
              </span>
            </h2>
          </div>
        </Reveal>

        {/* 2 Core Specialization Bento Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* Panel 1: Digital Forensics & Reverse Engineering */}
          <TiltCard
            maxTilt={3}
            spotlightColor="rgba(6, 182, 212, 0.16)"
            className="p-6 sm:p-8 rounded-3xl bg-studio-surface/50 border border-white/[0.08] hover:border-studio-cyan-light/40 transition-colors duration-300 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-studio-cyan/10 border border-studio-cyan/25 text-xs font-mono font-bold text-studio-cyan-light">
                    {skills[0]?.name ?? "DIGITAL FORENSICS"}
                  </span>
                  <span className="text-xs font-mono text-studio-faint uppercase">
                    DFIR &amp; REVERSING
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-studio-text tracking-tight">
                  {skills[0]?.serifAccent ?? "DFIR & Reverse Engineering"}
                </h3>
                <p className="text-xs sm:text-sm text-studio-muted font-sans leading-relaxed">
                  {skills[0]?.description ?? "Dead-box & volatile memory triage, filesystem artifact parsing, timeline reconstruction, and evidence correlation."}
                </p>
              </div>

              {/* Tools Roster Grid — 10 tools balanced 2-column grid */}
              <div className="pt-2 space-y-3">
                <div className="text-[11px] font-mono uppercase tracking-wider text-studio-faint font-semibold">
                  ACTIVE DFIR &amp; REVERSING WORKBENCH (10 TOOLS)
                </div>
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3" stagger={0.03}>
                  {forensicsArsenal.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <StaggerItem key={tool.name}>
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.025] hover:bg-white/[0.06] border border-white/[0.08] hover:border-studio-cyan-light/40 transition-all duration-200 group flex items-center gap-3.5 h-full">
                          <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center group-hover:border-studio-cyan-light/40 group-hover:bg-studio-cyan/10 transition-colors shrink-0">
                            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${tool.color}`} />
                          </div>
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <div className="text-xs sm:text-sm font-sans font-bold text-studio-text group-hover:text-studio-cyan-light transition-colors leading-snug">
                              {tool.name}
                            </div>
                            <div className="text-[11px] font-sans font-medium text-studio-faint leading-tight">
                              {tool.category}
                            </div>
                          </div>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </div>
            </div>
          </TiltCard>

          {/* Panel 2: Blue Team & Threat Detection */}
          <TiltCard
            maxTilt={3}
            spotlightColor="rgba(37, 99, 235, 0.16)"
            className="p-6 sm:p-8 rounded-3xl bg-studio-surface/50 border border-white/[0.08] hover:border-studio-accent-light/40 transition-colors duration-300 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-studio-accent/10 border border-studio-accent/25 text-xs font-mono font-bold text-studio-accent-light">
                    {skills[1]?.name ?? "BLUE TEAM"}
                  </span>
                  <span className="text-xs font-mono text-studio-faint uppercase">
                    THREAT DETECTION &amp; DEFENSE
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-studio-text tracking-tight">
                  {skills[1]?.serifAccent ?? "Threat Detection & Defensive Ops"}
                </h3>
                <p className="text-xs sm:text-sm text-studio-muted font-sans leading-relaxed">
                  {skills[1]?.description ?? "Security operations, log telemetry analysis, threat hunting, application proxying, and containerized defense."}
                </p>
              </div>

              {/* Tools Roster Grid — 10 tools balanced 2-column grid */}
              <div className="pt-2 space-y-3">
                <div className="text-[11px] font-mono uppercase tracking-wider text-studio-faint font-semibold">
                  ACTIVE BLUE TEAM &amp; INFRASTRUCTURE ARSENAL (10 TOOLS)
                </div>
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3" stagger={0.03}>
                  {blueTeamArsenal.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <StaggerItem key={tool.name}>
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.025] hover:bg-white/[0.06] border border-white/[0.08] hover:border-studio-accent-light/40 transition-all duration-200 group flex items-center gap-3.5 h-full">
                          <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center group-hover:border-studio-accent-light/40 group-hover:bg-studio-accent/10 transition-colors shrink-0">
                            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${tool.color}`} />
                          </div>
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <div className="text-xs sm:text-sm font-sans font-bold text-studio-text group-hover:text-studio-accent-light transition-colors leading-snug">
                              {tool.name}
                            </div>
                            <div className="text-[11px] font-sans font-medium text-studio-faint leading-tight">
                              {tool.category}
                            </div>
                          </div>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
