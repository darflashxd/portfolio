"use client";

import { Terminal, Shield, Wrench, Cpu } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

export function Skills() {
  const { skills } = portfolioData;

  // Flatten tool lists into curated domain tracks for marquee rows with live command snippets
  const forensicsAndReversing = [
    { name: "Volatility 3", category: "Memory Forensics", icon: Terminal, color: "text-studio-cyan-light", cmd: "python3 vol.py -f mem.raw windows.malfind" },
    { name: "Autopsy", category: "Dead-Box Triage", icon: Wrench, color: "text-studio-cyan-light", cmd: "Ingest: Keyword Search & Hash Lookup" },
    { name: "Wireshark", category: "Packet Inspection", icon: Shield, color: "text-studio-accent-light", cmd: "tcp.flags.syn==1 and tcp.flags.ack==0" },
    { name: "FTK Imager", category: "Raw E01 Carving", icon: Wrench, color: "text-studio-amber-light", cmd: "Image Mounting & SHA-256 Verification" },
    { name: "Incident Triage", category: "DFIR Workflows", icon: Shield, color: "text-studio-cyan-light", cmd: "Artifact Timeline & Host Containment" },
    { name: "Ghidra", category: "Static Disassembly", icon: Cpu, color: "text-studio-amber-light", cmd: "Decompile Function & Cross-Ref Strings" },
    { name: "x64dbg", category: "Dynamic Debugging", icon: Cpu, color: "text-studio-amber-light", cmd: "Set Hardware Breakpoint on EntryPoint" },
    { name: "YARA Rules", category: "Signature Detection", icon: Shield, color: "text-studio-accent-light", cmd: "yara -r rule.yar /target/filesystem" },
    { name: "systemd Journal", category: "Linux Artifacts", icon: Terminal, color: "text-studio-cyan-light", cmd: "journalctl -u service.slice --since today" },
    { name: "ELF & xattr", category: "Binary Analysis", icon: Terminal, color: "text-studio-cyan-light", cmd: "readelf -h binary && getfattr -d /bin/*" },
    { name: "Plaso Timelines", category: "Super Timelines", icon: Wrench, color: "text-studio-amber-light", cmd: "log2timeline.py timeline.plaso /evidence" },
  ];

  const blueTeamAndDevOps = [
    { name: "Splunk SIEM", category: "Threat Hunting", icon: Shield, color: "text-studio-accent-light", cmd: "index=sysmon EventCode=1 Image=\"*cmd.exe*\"" },
    { name: "Sysmon Telemetry", category: "Host Monitoring", icon: Shield, color: "text-studio-cyan-light", cmd: "Sysmon Event ID 3: Network Connection" },
    { name: "Windows Event Logs", category: "Security Auditing", icon: Terminal, color: "text-studio-cyan-light", cmd: "Security.evtx ID 4624 (Logon Type 10)" },
    { name: "GitHub Actions CI/CD", category: "Pipeline Automation", icon: Wrench, color: "text-studio-amber-light", cmd: "workflow_dispatch: ctfcli challenge sync" },
    { name: "Docker", category: "Container Isolation", icon: Cpu, color: "text-studio-cyan-light", cmd: "docker run --pids-limit 100 --read-only" },
    { name: "ctfcli", category: "CTFd Automation", icon: Wrench, color: "text-studio-accent-light", cmd: "ctf challenge install && ctf challenge sync" },
    { name: "Python 3.12", category: "Parser Scripting", icon: Terminal, color: "text-studio-amber-light", cmd: "struct.unpack('<I', pe_header[0x3c:0x40])" },
    { name: "Bash & Linux Security", category: "Systems Hardening", icon: Terminal, color: "text-studio-cyan-light", cmd: "chmod 700 /root && iptables -A INPUT -j DROP" },
    { name: "TensorFlow / Keras", category: "Deep Learning", icon: Cpu, color: "text-studio-amber-light", cmd: "MobileNetV2(include_top=False, weights='imagenet')" },
    { name: "MobileNetV2", category: "Model Optimization", icon: Cpu, color: "text-studio-amber-light", cmd: "EarlyStopping(patience=5, restore_best_weights=True)" },
    { name: "Sigma Rules", category: "Detection as Code", icon: Shield, color: "text-studio-accent-light", cmd: "detection: selection: CommandLine|contains: '-enc'" },
  ];

  return (
    <section
      id="skills"
      className="py-24 sm:py-32 bg-temp-skills text-studio-text border-b border-studio-border relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12 sm:mb-16">
        {/* Section Header */}
        <Reveal className="pb-4 border-b border-studio-border">
          <h2 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-wider text-studio-muted">
            TECHNICAL TOOLKIT &amp; CAPABILITIES
          </h2>
        </Reveal>

        {/* 4 Core Pillars — typographic stagger */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8" stagger={0.08}>
          {skills.map((skill) => (
            <StaggerItem key={skill.num} className="space-y-1.5">
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-mono text-studio-amber-light font-semibold">
                  0{skill.num === "01" ? "1" : skill.num === "02" ? "2" : skill.num === "03" ? "3" : "4"}
                </span>
                <h3 className="font-display font-bold text-sm sm:text-base text-studio-text">
                  {skill.name}
                </h3>
              </div>
              <p className="text-xs text-studio-muted font-sans line-clamp-2">
                {skill.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Infinite horizontal marquee stream 1 — moving left with rounded-full pill chips & cyan glow */}
      <Reveal delay={0.15} y={16}>
        <div className="relative w-full overflow-hidden marquee-container py-2.5 select-none">
          {/* Edge gradient mask */}
          <div
            className="absolute left-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-r from-temp-skills to-transparent z-10 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute right-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-l from-temp-skills to-transparent z-10 pointer-events-none"
            aria-hidden="true"
          />

          <div className="flex w-max animate-marquee marquee-content">
            {[...forensicsAndReversing, ...forensicsAndReversing].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.name}-${idx}`}
                  className="mx-2 px-4 sm:px-5 py-2.5 bg-studio-surface/90 hover:bg-studio-card border border-studio-border hover:border-studio-cyan-light/50 transition-all duration-300 flex items-center gap-3 shrink-0 rounded-full cursor-default shadow-sm hover:shadow-[0_0_20px_rgba(34,211,238,0.18)]"
                >
                  <div className="w-7 h-7 rounded-full bg-studio-bg flex items-center justify-center border border-studio-border group-hover:border-studio-cyan-light/40 transition-colors">
                    <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-sans font-bold text-studio-text group-hover:text-studio-cyan-light transition-colors whitespace-nowrap">
                      {item.name}
                    </div>
                    <div className="text-[10px] font-sans font-medium text-studio-faint tracking-wider uppercase whitespace-nowrap">
                      {item.category}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Infinite horizontal marquee stream 2 — moving right with rounded-full pill chips & amber glow */}
      <Reveal delay={0.25} y={16}>
        <div className="relative w-full overflow-hidden marquee-container py-2.5 mt-2 select-none">
          {/* Edge gradient mask */}
          <div
            className="absolute left-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-r from-temp-skills to-transparent z-10 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute right-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-l from-temp-skills to-transparent z-10 pointer-events-none"
            aria-hidden="true"
          />

          <div className="flex w-max animate-marquee-reverse marquee-content">
            {[...blueTeamAndDevOps, ...blueTeamAndDevOps].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.name}-${idx}`}
                  className="mx-2 px-4 sm:px-5 py-2.5 bg-studio-surface/90 hover:bg-studio-card border border-studio-border hover:border-studio-amber-light/50 transition-all duration-300 flex items-center gap-3 shrink-0 rounded-full cursor-default shadow-sm hover:shadow-[0_0_20px_rgba(212,160,23,0.18)]"
                >
                  <div className="w-7 h-7 rounded-full bg-studio-bg flex items-center justify-center border border-studio-border group-hover:border-studio-amber-light/40 transition-colors">
                    <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-sans font-bold text-studio-text group-hover:text-studio-amber-light transition-colors whitespace-nowrap">
                      {item.name}
                    </div>
                    <div className="text-[10px] font-sans font-medium text-studio-faint tracking-wider uppercase whitespace-nowrap">
                      {item.category}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
