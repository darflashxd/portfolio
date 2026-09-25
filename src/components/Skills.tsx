"use client";

import { Terminal, Shield, Wrench, Cpu, Search, FileCode2, Binary, Network, Layers } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { TiltCard } from "@/components/ui/TiltCard";

export function Skills() {
  const { skills } = portfolioData;

  const forensicsArsenal = [
    {
      name: "Volatility 3",
      category: "Memory Forensics",
      icon: Terminal,
      color: "text-studio-cyan-light",
      cmd: "vol.py -f mem.raw windows.malfind",
    },
    {
      name: "Autopsy",
      category: "Dead-Box Triage",
      icon: Search,
      color: "text-studio-cyan-light",
      cmd: "Keyword Search & Hash Lookup",
    },
    {
      name: "Wireshark",
      category: "Packet Inspection",
      icon: Network,
      color: "text-studio-accent-light",
      cmd: "tcp.flags.syn==1 && tcp.flags.ack==0",
    },
    {
      name: "FTK Imager",
      category: "Raw E01 Carving",
      icon: Wrench,
      color: "text-studio-amber-light",
      cmd: "Image Mount & SHA-256 Hash",
    },
    {
      name: "Ghidra",
      category: "Static Disassembly",
      icon: Cpu,
      color: "text-studio-cyan-light",
      cmd: "Decompile Function & Strings X-Ref",
    },
    {
      name: "x64dbg",
      category: "Dynamic Debugging",
      icon: Binary,
      color: "text-studio-cyan-light",
      cmd: "Set Hardware Breakpoint on EntryPoint",
    },
    {
      name: "systemd Journal",
      category: "Linux Artifacts",
      icon: Terminal,
      color: "text-studio-cyan-light",
      cmd: "journalctl -u service --since today",
    },
    {
      name: "ELF & xattr",
      category: "Binary Forensics",
      icon: FileCode2,
      color: "text-studio-cyan-light",
      cmd: "readelf -h binary && getfattr -d",
    },
  ];

  const blueTeamArsenal = [
    {
      name: "Splunk SIEM",
      category: "Threat Hunting",
      icon: Shield,
      color: "text-studio-accent-light",
      cmd: "index=sysmon EventCode=1 Image=\"*cmd.exe*\"",
    },
    {
      name: "Sysmon Telemetry",
      category: "Host Telemetry",
      icon: Shield,
      color: "text-studio-cyan-light",
      cmd: "Sysmon Event ID 3: Network Connection",
    },
    {
      name: "Windows Event Logs",
      category: "Audit Forensics",
      icon: Terminal,
      color: "text-studio-cyan-light",
      cmd: "Security.evtx ID 4624 (Logon Type 10)",
    },
    {
      name: "YARA Rules",
      category: "Signature Detection",
      icon: Shield,
      color: "text-studio-accent-light",
      cmd: "yara -r rule.yar /target/filesystem",
    },
    {
      name: "Sigma Rules",
      category: "Detection as Code",
      icon: Layers,
      color: "text-studio-accent-light",
      cmd: "detection: CommandLine|contains: '-enc'",
    },
    {
      name: "Linux Hardening",
      category: "Systems Defense",
      icon: Terminal,
      color: "text-studio-cyan-light",
      cmd: "chmod 700 /root && ufw status verbose",
    },
    {
      name: "Python 3 DFIR",
      category: "Parser Scripting",
      icon: Terminal,
      color: "text-studio-amber-light",
      cmd: "struct.unpack('<I', pe_header[0x3c:0x40])",
    },
    {
      name: "Network Defense",
      category: "Packet Triage",
      icon: Network,
      color: "text-studio-accent-light",
      cmd: "tshark -r capture.pcap -Y http.request",
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

        {/* 2 Core Specialization Bento Panels — Instantly visible without waiting for marquee */}
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
                    01 / {skills[0]?.name ?? "DIGITAL FORENSICS"}
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

              {/* Tools Roster Grid */}
              <div className="pt-2 space-y-3">
                <div className="text-[11px] font-mono uppercase tracking-wider text-studio-faint font-semibold">
                  ACTIVE DFIR WORKBENCH (8 TOOLS)
                </div>
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3" stagger={0.04}>
                  {forensicsArsenal.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <StaggerItem key={tool.name}>
                        <div className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.07] hover:border-studio-cyan-light/40 transition-all duration-200 group flex flex-col justify-between space-y-2.5 h-full">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-xl bg-studio-bg flex items-center justify-center border border-white/10 group-hover:border-studio-cyan-light/40 transition-colors shrink-0">
                                <Icon className={`w-4 h-4 ${tool.color}`} />
                              </div>
                              <span className="text-xs font-sans font-bold text-studio-text group-hover:text-studio-cyan-light transition-colors truncate">
                                {tool.name}
                              </span>
                            </div>
                            <span className="text-[10px] font-sans font-medium text-studio-faint px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] shrink-0 whitespace-nowrap">
                              {tool.category}
                            </span>
                          </div>

                          {/* Technical Telemetry Snippet */}
                          <div className="p-1.5 px-2.5 rounded-lg bg-black/40 border border-white/[0.04] font-mono text-[10px] text-studio-faint truncate flex items-center gap-1.5 group-hover:text-studio-muted transition-colors">
                            <span className="text-studio-cyan-light font-bold">$</span>
                            <span className="truncate">{tool.cmd}</span>
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
                    02 / {skills[1]?.name ?? "BLUE TEAM"}
                  </span>
                  <span className="text-xs font-mono text-studio-faint uppercase">
                    THREAT DETECTION &amp; SOC
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-studio-text tracking-tight">
                  {skills[1]?.serifAccent ?? "Threat Detection & Incident Response"}
                </h3>
                <p className="text-xs sm:text-sm text-studio-muted font-sans leading-relaxed">
                  {skills[1]?.description ?? "Security operations, log telemetry analysis, threat hunting, and incident response containment."}
                </p>
              </div>

              {/* Tools Roster Grid */}
              <div className="pt-2 space-y-3">
                <div className="text-[11px] font-mono uppercase tracking-wider text-studio-faint font-semibold">
                  ACTIVE BLUE TEAM ARSENAL (8 TOOLS)
                </div>
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3" stagger={0.04}>
                  {blueTeamArsenal.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <StaggerItem key={tool.name}>
                        <div className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.07] hover:border-studio-accent-light/40 transition-all duration-200 group flex flex-col justify-between space-y-2.5 h-full">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-xl bg-studio-bg flex items-center justify-center border border-white/10 group-hover:border-studio-accent-light/40 transition-colors shrink-0">
                                <Icon className={`w-4 h-4 ${tool.color}`} />
                              </div>
                              <span className="text-xs font-sans font-bold text-studio-text group-hover:text-studio-accent-light transition-colors truncate">
                                {tool.name}
                              </span>
                            </div>
                            <span className="text-[10px] font-sans font-medium text-studio-faint px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] shrink-0 whitespace-nowrap">
                              {tool.category}
                            </span>
                          </div>

                          {/* Technical Telemetry Snippet */}
                          <div className="p-1.5 px-2.5 rounded-lg bg-black/40 border border-white/[0.04] font-mono text-[10px] text-studio-faint truncate flex items-center gap-1.5 group-hover:text-studio-muted transition-colors">
                            <span className="text-studio-accent-light font-bold">$</span>
                            <span className="truncate">{tool.cmd}</span>
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
