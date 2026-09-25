export interface SiteInfo {
  name: string;
  shortName: string;
  initials: string;
  role: string;
  institution: string;
  location: string;
  status: string;
  resumeUrl: string;
}

export interface HeroData {
  eyebrow: string;
  titleLine1: string;
  titleLine2Serif: string;
  titleLine3: string;
  punchline: string;
  badges: string[];
}

export interface PhotoPlate {
  src: string;
  alt: string;
  letter: string;
  label: string;
  meta: string;
}

export interface WhoAmIData {
  title: string;
  headingLine1: string;
  headingLine2Serif: string;
  statement: string;
  highlightParagraph: string;
  stats: {
    value: string;
    label: string;
  }[];
  portraits: PhotoPlate[];
}

export interface SkillCategory {
  num: string;
  name: string;
  serifAccent?: string;
  description: string;
  tags: string[];
}

export interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
}

export interface ExperienceLink {
  label: string;
  href: string;
}

export interface ExperienceEntry {
  id: string;
  period: string;
  role: string;
  organization: string;
  orgHighlight?: string;
  location: string;
  summary: string;
  impactPoints: string[];
  photos: GalleryPhoto[];
  tags: string[];
  link?: string;
  links?: ExperienceLink[];
  logo?: string;
}

export interface ProjectEntry {
  id: string;
  num: string;
  title: string;
  serifAccent?: string;
  category: string;
  year: string;
  tagline: string;
  sellingPoint: string;
  accentColor: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface CertificationEntry {
  title: string;
  issuer: string;
  date: string;
  status: "Verified" | "Active Pursuit" | "Target Milestone";
  summary: string;
  badgeLetter: string;
  image?: string;
  credentialUrl?: string;
  actionLabel?: string;
}

export interface CTFWriteupEntry {
  id: string;
  competition: string;
  organizer: string;
  year: string;
  challengeTitle?: string;
  summary: string;
  tags: string[];
  docUrl: string;
  downloadFilename: string;
  fileSize: string;
  badgeAccent?: string;
}

export interface SocialLinks {
  email: string;
  github: string;
  linkedin: string;
  tryhackme: string;
  hackthebox: string;
}

export const portfolioData = {
  siteInfo: {
    name: "Ahmad Rafi Sutanto",
    shortName: "Rafi Sutanto",
    initials: "ARS",
    role: "Blue Team & Digital Forensics",
    institution: "BINUS University",
    location: "Tangerang & Jakarta, Indonesia",
    status: "Open to Blue Team, SOC & DFIR Opportunities",
    resumeUrl: "/Resume_Ahmad_Rafi_Sutanto.pdf",
  } as SiteInfo,

  hero: {
    eyebrow: "BLUE TEAM · DIGITAL FORENSICS · INCIDENT RESPONSE",
    titleLine1: "DECONSTRUCTING",
    titleLine2Serif: "THE UNSEEN",
    titleLine3: "SYSTEMS",
    punchline:
      "Undergraduate researcher and defensive security engineer focused on digital forensics, proactive threat detection, and resilient system infrastructure.",
    badges: [
      "Digital Forensics & DFIR",
      "Blue Team Operations",
      "PETIR Cyber Security",
      "CSC BINUS Deputy Coordinator R&D",
      "CI/CD & DevOps Automation",
    ],
  } as HeroData,

  whoAmI: {
    title: "WHOAMI",
    headingLine1: "Breaking systems to defend them,",
    headingLine2Serif: "Tracing forensic anomalies to reveal ground truth",
    statement:
      "I'm Ahmad Rafi Sutanto, a Cybersecurity undergraduate at BINUS University specializing in Blue Team operations, Digital Forensics, and Threat Detection.",
    highlightParagraph:
      "Currently serving as Deputy Coordinator of R&D at Cyber Security Community (CSC) and Apprentice at PETIR Cyber Security, where I architect automated CI/CD security infrastructure, orchestrate competition problem sets, and dissect low-level kernel and memory telemetry.",
    stats: [
      { value: "3.23", label: "Cumulative GPA / 4.00" },
      { value: "30", label: "CTF Challenges Orchestrated" },
      { value: "20+", label: "Challenge Authors Led" },
    ],
    portraits: [
      {
        src: "/images/profile/profile.jpg",
        letter: "A",
        alt: "Ahmad Rafi Sutanto — Portrait",
        label: "Ahmad Rafi Sutanto",
        meta: "Blue Team & DFIR",
      },
      {
        src: "/images/profile/workspace.jpg",
        letter: "R",
        alt: "Forensic Investigation Workstation",
        label: "DFIR Laboratory",
        meta: "Volatility3 & Autopsy",
      },
      {
        src: "/images/profile/ctf-team.jpg",
        letter: "S",
        alt: "CSC BINUS R&D and PETIR CTF Sessions",
        label: "PETIR & CSC R&D",
        meta: "Technical Leadership",
      },
    ],
  } as WhoAmIData,

  skills: [
    {
      num: "01",
      name: "Digital Forensics",
      serifAccent: "DFIR & Reverse Engineering",
      description: "Dead-box & volatile memory triage, filesystem artifact parsing, timeline reconstruction, and evidence correlation.",
      tags: ["Volatility 3", "Autopsy", "FTK Imager", "Eric Zimmerman Tools", "Ghidra", "x64dbg", "JADX", "APKTool", "Wireshark", "Linux Forensics (xattr / systemd)"],
    },
    {
      num: "02",
      name: "Blue Team",
      serifAccent: "Threat Detection & Defensive Ops",
      description: "Security operations, log telemetry analysis, threat hunting, application proxying, and containerized defense.",
      tags: ["Splunk SIEM", "Windows Event Logs (EVTX)", "Sysmon Telemetry", "Burp Suite", "YARA Rules", "Sigma Rules", "Linux Systems", "Docker", "CI/CD (GitHub Actions)", "Git"],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "csc-ctf-2026",
      num: "01",
      title: "CSC CTF Contest 2026",
      serifAccent: "Automated CI/CD Platform",
      category: "DevOps · Competition Infrastructure",
      year: "2026",
      tagline: "End-to-end automated deployment pipeline and competition architecture for 30 challenges across 6 categories.",
      sellingPoint:
        "Architected an end-to-end CI/CD system using GitHub Actions: push to repo auto-syncs challenge metadata to CTFd via ctfcli and auto-deploys Docker containers to VPS via SSH with zero manual deployment on competition day. Coordinated 20+ authors, reviewed 79 PRs, and authored 128 of 285 total commits (45%).",
      accentColor: "#DC2626",
      technologies: ["GitHub Actions", "Docker", "ctfcli", "Python", "SSH", "Bash"],
      image: "/images/projects/project-ctf-infra.png",
      repoUrl: "https://github.com/csc-research-binus/csc-ctf-contest-2026",
    },
    {
      id: "poisoned-aur",
      num: "02",
      title: "The Poisoned AUR",
      serifAccent: "BeeCTF Forensics Challenge",
      category: "Digital Forensics · Threat Simulation",
      year: "2026",
      tagline: "Simulated real-world Arch Linux compromise via malicious AUR package with multi-layer forensic trails.",
      sellingPoint:
        "Designed a multi-layered forensic trail requiring players to correlate evidence across package manager logs, shell history, systemd journal, ELF binary analysis, and extended file attributes (xattr) to reconstruct the full attack timeline and recover the encrypted flag. Authored comprehensive writeup covering both Linux CLI and FTK Imager.",
      accentColor: "#22D3EE",
      technologies: ["Linux Forensics", "systemd Journal", "ELF Analysis", "xattr", "FTK Imager", "WSL2"],
      image: "/images/projects/project-dfir-labs.jpg",
      repoUrl: "https://github.com/PETIRsec/beefest-2026-qual/tree/main/Forensic/BTW%20I%20Use%20Arch",
    },
    {
      id: "pulmoai",
      num: "03",
      title: "PulmoAI",
      serifAccent: "TB Chest X-Ray Detection",
      category: "Applied AI · Full-Stack Web App",
      year: "2025",
      tagline: "Full-stack web application for early Tuberculosis detection from chest X-rays with 99.65% validation accuracy.",
      sellingPoint:
        "Led AI model optimization: replaced legacy VGG-style CNN with MobileNetV2 via transfer learning + GlobalAveragePooling2D, slashing model size by 90% (from ~100MB to ~9MB). Implemented EarlyStopping and ModelCheckpoint callbacks, raising validation accuracy to 99.65%. Managed backend version-pinning across 50+ packages under MIT License.",
      accentColor: "#D4A017",
      technologies: ["TensorFlow/Keras", "Python", "Flask", "React", "TypeScript", "MobileNetV2"],
      image: "/images/projects/project-pulmoai.png",
      repoUrl: "https://github.com/darflashxd/pulmoai",
    },
  ] as ProjectEntry[],

  experiences: {
    categories: ["PETIR Cyber Security", "Cyber Security Community (CSC)"],
    items: [
      {
        id: "petir-ifest-author",
        period: "Aug 2026 · 1 mo",
        role: "Challenge Author (Digital Forensics)",
        organization: "PETIR Cyber Security",
        orgHighlight: "IFEST 2026 (Universitas Padjadjaran)",
        location: "Sumedang & Bandung, Jawa Barat · Remote",
        summary:
          "Commissioned as external Digital Forensics challenge author for IFEST 2026 (HIMATIF Universitas Padjadjaran) via PETIR Cyber Security consultancy.",
        impactPoints: [
          "Developed 'Dead Box' forensics challenge simulating LUKS volume encryption, ext4 unallocated artifact carving, and hidden keyfile extraction.",
          "Synthesized multi-stage attack scenarios across Linux PAM logs, Git object zlib streams, and binary reversing triage.",
          "Delivered official reference writeup and automated validation solver harness to guarantee competition integrity.",
        ],
        photos: [
          {
            src: "/images/experience/exp-ifest-ctf.jpg",
            alt: "IFEST 2026 — Universitas Padjadjaran CTF Competition",
            caption: "IFEST 2026 CTF Competition — HIMATIF Universitas Padjadjaran",
          },
        ],
        tags: ["Challenge Author", "Digital Forensics", "IFEST UNPAD", "PETIR Consultancy", "LUKS Forensics"],
        links: [
          {
            label: "IFEST UNPAD PORTAL",
            href: "https://ifestunpad.com/home",
          },
          {
            label: "CTF COMPETITION",
            href: "https://ifestunpad.com/competitions",
          },
        ],
        logo: "/images/organizations/ifest.png",
      },
      {
        id: "petir-author",
        period: "Aug 2026 · 1 mo",
        role: "Challenge Author (Digital Forensics)",
        organization: "PETIR Cyber Security",
        orgHighlight: "BeeCTF 2026 (Beefest)",
        location: "West Jakarta, Jakarta, Indonesia",
        summary:
          "Authored 'The Poisoned AUR' digital forensics challenge simulating an Arch Linux package compromise.",
        impactPoints: [
          "Synthesized multi-layered evidence across package logs, shell history, systemd, ELF, and xattr.",
          "Authored official writeup covering command-line (WSL2) and GUI (FTK Imager) investigation paths.",
        ],
        photos: [
          {
            src: "/images/experience/beectf-socs-banner.png",
            alt: "BEE Capture The Flag — Official Competition Banner",
            caption: "BeeFest BeeCTF Competition — School of Computer Science BINUS University",
          },
          {
            src: "/images/experience/exp-aur-safety.jpg",
            alt: "The Poisoned AUR — Forensic Challenge Scenario",
            caption: "The Poisoned AUR — Arch Linux package compromise scenario & forensic artifacts",
          },
        ],
        tags: ["Digital Forensics", "Challenge Author", "BeeCTF", "Linux Forensics"],
        link: "https://socs.binus.ac.id/2017/06/20/bee-capture-the-flag/",
        logo: "/images/organizations/petir.png",
      },
      {
        id: "petir-apprentice",
        period: "Mar 2026 — Present · 7 mos",
        role: "Apprentice",
        organization: "PETIR Cyber Security",
        orgHighlight: "BINUS University · Hybrid",
        location: "West Jakarta, Jakarta, Indonesia",
        summary:
          "Undergoing technical apprenticeship with senior researchers on advanced threat detection and CTF problem sets.",
        impactPoints: [
          "Executed intensive Blue Team defensive drills, threat detection, and network security exercises.",
          "Collaborated with senior members on vulnerability exploitation and forensic triage methodologies.",
        ],
        photos: [
          {
            src: "/images/experience/exp-petir-crest.jpg",
            alt: "PETIR Cyber Security Research Division",
            caption: "PETIR Cyber Security — Digital Forensics & CTF Research Division Crest",
          },
          {
            src: "/images/experience/exp-ctf-2.jpg",
            alt: "PETIR Cyber Security Workshop",
            caption: "Technical mentoring session and hands-on exercises",
          },
        ],
        tags: ["Cybersecurity", "Network Security", "Apprenticeship", "PETIR"],
        link: "https://www.linkedin.com/in/rafisutanto/",
        logo: "/images/organizations/petir.png",
      },
      {
        id: "csc-rd-deputy",
        period: "Oct 2025 — Present · 1 yr",
        role: "Deputy Coordinator of Research & Development (R&D)",
        organization: "Cyber Security Community (CSC)",
        orgHighlight: "BINUS University · Hybrid",
        location: "West Jakarta, Jakarta, Indonesia",
        summary:
          "Directing technical R&D operations, research initiatives, and competition infrastructure.",
        impactPoints: [
          "Orchestrated automated CI/CD challenge deployment for CSC CTF 2026, eliminating manual operations.",
          "Directed 20+ authors across 6 categories and reviewed 79 PRs to enforce challenge integrity.",
          "Delivered hands-on community workshops on volatile memory forensics and Windows log triage.",
        ],
        photos: [
          {
            src: "/images/projects/project-ctf-infra.png",
            alt: "CSC CTF Contest 2026 — GitHub CI/CD Repository & PR Pipeline",
            caption: "Automated GitHub Actions CI/CD pipeline & 79 PRs review",
          },
          {
            src: "/images/experience/exp-csc-rd-1.jpg",
            alt: "CSC BINUS R&D Author Coordination",
            caption: "Author coordination and challenge syllabus review",
          },
        ],
        tags: ["Team Leadership", "R&D", "Cybersecurity", "CI/CD"],
        links: [
          {
            label: "GITHUB REPOSITORY",
            href: "https://github.com/csc-research-binus/csc-ctf-contest-2026",
          },
          {
            label: "CSC CTF ARTICLE",
            href: "https://student-activity.binus.ac.id/csc/2026/05/csc-ctf-contest-2026/",
          },
        ],
        logo: "/images/organizations/csc.png",
      },
      {
        id: "csc-ncw-pic",
        period: "Oct 2025 — Dec 2025 · 3 mos",
        role: "Project Officer (PIC) — National Cyber Week 2025",
        organization: "Cyber Security Community (CSC)",
        orgHighlight: "National Flagship Event · BINUS University",
        location: "West Jakarta, Jakarta, Indonesia",
        summary:
          "Led National Cyber Week 2025 as Project Officer / PIC, orchestrating Indonesia's first national CTF competition featuring an on-site IoT Hacking final stage alongside specialized security workshops.",
        impactPoints: [
          "Directed end-to-end competition operations, timeline, and steering committee coordination for national university participants across Indonesia.",
          "Pioneered Indonesia's first on-site IoT Hacking CTF final challenge at BINUS Anggrek, preceded by an online CTFd Jeopardy qualifier.",
          "Curated educational workshops on Web Penetration Testing (OWASP/WSTG/OSINT) and Offensive Adversarial AI / ML Red Teaming.",
        ],
        photos: [
          {
            src: "/images/experience/exp-ncw.jpg",
            alt: "National Cyber Week 2025 — Workshop & IoT Hacking CTF",
            caption: "National Cyber Week 2025 — National IoT Hacking CTF & Security Workshops at BINUS University",
          },
        ],
        tags: ["Project Lead", "Event PIC", "IoT Hacking", "CTF", "Cybersecurity", "CSC BINUS"],
        links: [
          {
            label: "NCW EVENT PORTAL",
            href: "https://ncw.cscbinus.org/",
          },
          {
            label: "BINUS SCDC COVERAGE",
            href: "https://student-activity.binus.ac.id/csc/2025/12/national-cyber-week-2025/",
          },
        ],
        logo: "/images/organizations/csc.png",
      },
      {
        id: "csc-rd-activist",
        period: "Feb 2025 — Sep 2025 · 8 mos",
        role: "Research and Development Activist",
        organization: "Cyber Security Community (CSC)",
        orgHighlight: "BINUS University · Hybrid",
        location: "West Jakarta, Jakarta, Indonesia",
        summary:
          "Conducted cybersecurity research and authored forensic problems for community events.",
        impactPoints: [
          "Authored digital forensics challenges for CSC CTF 2025 analyzing raw disk and network artifacts.",
          "Mentored junior members on Volatility and Wireshark investigation toolchains.",
        ],
        photos: [
          {
            src: "/images/experience/exp-ctf-1.jpg",
            alt: "CSC CTF Problem Setting Session",
            caption: "Challenge authoring and artifact validation test harness",
          },
        ],
        tags: ["Digital Forensics", "Problem Setter", "CTF", "R&D"],
        link: "https://www.linkedin.com/in/rafisutanto/",
        logo: "/images/organizations/csc.png",
      },
      {
        id: "csc-member",
        period: "Sep 2024 — Feb 2025 · 6 mos",
        role: "Community Member",
        organization: "Cyber Security Community (CSC)",
        orgHighlight: "BINUS University · Hybrid",
        location: "West Jakarta, Jakarta, Indonesia",
        summary:
          "Completed structured training in defensive security, network analysis, and incident response.",
        impactPoints: [
          "Completed hands-on labs in packet inspection, Linux security, and dead-box file triage.",
        ],
        photos: [],
        tags: ["Cybersecurity", "Community", "Study Group"],
        link: "https://www.linkedin.com/in/rafisutanto/",
        logo: "/images/organizations/csc.png",
      },
    ] as ExperienceEntry[],
  },

  certifications: [
    {
      title: "Wreck-IT 7.0 — Finalis General Capture The Flag",
      issuer: "Politeknik Siber dan Sandi Negara (Poltek SSN / BSSN)",
      date: "05 Agustus 2026",
      status: "Verified",
      summary: "National cyber competition finalist credential awarded to Tim HM Plenger (Ahmad Rafi Sutanto) for outstanding defense operations and incident triage problem solving.",
      badgeLetter: "W",
      credentialUrl: "/certificates/cert-wreckit-finalist.pdf",
      actionLabel: "View Official Certificate PDF",
    },
    {
      title: "Security Blue Team — Blue Team Level 1 (BTL1)",
      issuer: "Security Blue Team",
      date: "Currently Preparing",
      status: "Active Pursuit",
      summary: "24-hour practical incident response exam: network PCAP triage, digital forensics, SIEM threat hunting, and malware analysis.",
      badgeLetter: "B",
      image: "/images/certifications/cert-btl1.jpg",
      credentialUrl: "https://securityblue.team/what-is-btl1/",
      actionLabel: "Curriculum & Exam Blueprint",
    },
  ] as CertificationEntry[],

  ctfWriteups: {
    title: "CTF WRITEUPS & FIELD ARCHIVES",
    subtitle: "Curated competition field reports, digital forensics investigations, and security challenge walkthroughs from national tournaments.",
    items: [
      {
        id: "gemastik-ctf",
        competition: "GEMASTIK CTF",
        organizer: "Kemendikbudristek · Host: UNNES",
        year: "2025",
        challengeTitle: "National ICT Competition — Cybersecurity Division",
        summary: "National tournament field report with Team PETIR Stand by Me: solutions across web exploitation, cryptography, and digital forensics triage.",
        tags: ["GEMASTIK", "Puspresnas", "UNNES", "Forensics", "Web Security"],
        docUrl: "/writeups/gemastik-ctf.pdf",
        downloadFilename: "gemastik-ctf.pdf",
        fileSize: "3.4 MB",
      },
      {
        id: "findit-ctf",
        competition: "FindIT! CTF",
        organizer: "Universitas Gadjah Mada (UGM)",
        year: "2025",
        challengeTitle: "National Cybersecurity Competition",
        summary: "National competition field report covering digital forensics triage, web exploitation, and reverse engineering problem sets.",
        tags: ["UGM", "FindIT!", "Digital Forensics", "Web Security"],
        docUrl: "/writeups/findit-ctf.pdf",
        downloadFilename: "findit-ctf.pdf",
        fileSize: "5.2 MB",
      },
      {
        id: "wreckit-ctf",
        competition: "Wreck-IT CTF",
        organizer: "Politeknik Siber dan Sandi Negara (Poltek SSN / BSSN)",
        year: "2025",
        challengeTitle: "National Cyber Defense Competition",
        summary: "Defense operations and incident triage report with Team HM Plenger: packet inspection, vulnerability dissection, and host forensics.",
        tags: ["Poltek SSN", "BSSN", "Defense Triage", "Packet Analysis"],
        docUrl: "/writeups/wreckit-ctf.pdf",
        downloadFilename: "wreckit-ctf.pdf",
        fileSize: "1.0 MB",
      },
      {
        id: "petir-regen-2026",
        competition: "PETIR REGEN26",
        organizer: "PETIR Cyber Security · BINUS University",
        year: "2026",
        challengeTitle: "Internal Qualification Tournament",
        summary: "Internal candidate qualification report for PETIR BINUS covering disk forensics, network packet dissection, and binary exploitation.",
        tags: ["Internal Qualification", "PETIR BINUS", "Digital Forensics", "Pwn"],
        docUrl: "/writeups/petir-regen26.pdf",
        downloadFilename: "darflashxd_REGEN26.pdf",
        fileSize: "8.1 MB",
      },
      {
        id: "gundar-ctf",
        competition: "Gundar CTF (GCW)",
        organizer: "Universitas Gunadarma",
        year: "2025",
        challengeTitle: "Gunadarma Cyber Weekend CTF",
        summary: "Forensics investigation writeup with Team Grace Rocky Save Star: Volatility memory dump analysis, PCAP packet carving, and steganography.",
        tags: ["Univ. Gunadarma", "Volatility", "Memory Forensics", "Network"],
        docUrl: "/writeups/gundar-ctf.pdf",
        downloadFilename: "gundar-ctf.pdf",
        fileSize: "2.3 MB",
      },
      {
        id: "polri-ctf",
        competition: "Polri Cyber CTF",
        organizer: "Kepolisian Negara Republik Indonesia (Polri)",
        year: "2026",
        challengeTitle: "National Police Cybersecurity Competition",
        summary: "Law enforcement competition writeup: disk image reconstruction, evidence timeline correlation, and artifact extraction.",
        tags: ["Polri", "Disk Forensics", "Timeline Analysis", "Evidence Carving"],
        docUrl: "/writeups/polri-ctf.pdf",
        downloadFilename: "polri.pdf",
        fileSize: "1.2 MB",
      },
    ] as CTFWriteupEntry[],
  },

  socials: {
    email: "rafisutanto@gmail.com",
    github: "https://github.com/darflashxd",
    linkedin: "https://www.linkedin.com/in/rafisutanto/",
    tryhackme: "https://tryhackme.com/p/YOUR_THM_HANDLE",
    hackthebox: "https://app.hackthebox.com/profile/YOUR_HTB_HANDLE",
  } as SocialLinks,
};
