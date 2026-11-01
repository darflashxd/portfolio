export interface WorkScreenshot {
  src: string;
  width: number;
  height: number;
  title: string;
  alt: string;
  caption: string;
}

export interface WorkWriting {
  title: string;
  description: string;
  href: string;
}

export interface WorkLink {
  label: string;
  href: string;
}

export interface WorkEntry {
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string;
  imageAlt: string;
  screenshots?: WorkScreenshot[];
  summary: string;
  contribution: string;
  tools: string[];
  links: WorkLink[];
  status?: string;
  writing?: WorkWriting;
  nextSteps?: string;
  context: string;
  approach: { title: string; text: string }[];
  outcome: string;
  limitations: string;
  repo?: string;
}

export const work: WorkEntry[] = [
  {
    slug: "pomicat",
    title: "PomiCat",
    category: "Privacy engineering · AI & documents",
    year: "2026",
    image: "/images/projects/pomicat-chat-review.webp",
    imageAlt: "PomiCat review dialog comparing a fictional AI chat with its redacted copy",
    screenshots: [
      { src: "/images/projects/pomicat-chat-review.webp", width: 1800, height: 1428, title: "AI conversation review", alt: "PomiCat share dialog showing original and redacted fictional AI conversation with derived amounts hidden", caption: "PomiCat 3.x: review the original and the copy others will see. The salary and the figures derived from it are hidden. Fictional data." },
      { src: "/images/projects/pomicat-word-review.webp", width: 1800, height: 1250, title: "Document review", alt: "PomiCat document review showing a fictional separation agreement before and after redaction", caption: "PomiCat 3.x: review a sanitized DOCX copy with tables preserved. Fictional data; names were marked manually in this capture." },
    ],
    summary: "A browser extension that reviews AI chats and documents, redacts sensitive details and the numbers that reveal them, then shares an encrypted, crawler-resistant copy.",
    contribution: "Built around local detection, arithmetic inference checks, client-side AES-256-GCM encryption, and a relay that stores ciphertext. Supports ChatGPT, Claude, Gemini, DeepSeek, Word Online, and Google Docs.",
    tools: ["JavaScript", "WebCrypto", "Cloudflare Workers", "D1", "BERT-small INT8"],
    links: [
      { label: "GitHub", href: "https://github.com/darflashxd/pomicat" },
      { label: "Releases", href: "https://github.com/darflashxd/pomicat/releases" },
      { label: "Docs", href: "https://darflashxd.github.io/pomicat/" },
      { label: "Blog", href: "https://darflashxd.github.io/pomicat/blog/" },
    ],
    status: "Open source · Chrome & Firefox builds",
    writing: {
      title: "Hiding a number is not enough",
      description: "Why redacting the salary still leaves it recoverable, what three LLMs did with 40 fictional chats, and why the link key stays after the #.",
      href: "https://darflashxd.github.io/pomicat/blog/hiding-a-number-is-not-enough.html",
    },
    nextSteps: "Ongoing work focuses on detection coverage, document workflows, and release hardening.",
    context: "Shared AI chats have appeared in search results, and a share link is an ordinary web page. Hiding one value is not enough: salaries, dates, and other details can be reconstructed from the numbers around them. Documents carry the same risk.",
    approach: [
      { title: "Find private details", text: "Combine pattern-based rules and contextual checks with a local BERT-small INT8 model. Rules cover credentials, IDs, bank accounts, phone numbers, and Indonesian formats such as NIK and Rupiah amounts." },
      { title: "Check derived numbers", text: "Look for ratios, monthly and yearly versions, projections, sums, and differences that reveal a hidden amount across messages. Run the same attack against the reviewed copy before sharing." },
      { title: "Review documents", text: "Review a separate DOCX copy from Word Online or Google Docs. Remove tracked changes, comments, and document properties; image pixels are marked manually, and the original document is not changed." },
      { title: "Encrypt and share", text: "Encrypt the reviewed copy in the browser with AES-256-GCM. The key stays after the URL fragment, the relay stores ciphertext, and links support expiry, burn-after-reading, and revocation with a noindex response." },
    ],
    outcome: "PomiCat 3.0.2 is available as Chrome and Firefox builds through GitHub releases, with an Apache-2.0 codebase and a docs site. In the documented evaluation — 40 fictional chats, four runs, three LLMs — no hidden salary was recovered after PomiCat redaction (0 of 160), compared with 100% after naive redaction. Googlebot tests check that chat and document links return ciphertext and no key.",
    limitations: "The local model is English-focused; other languages rely mostly on rules. Unsupported arithmetic, combinations of details, text in images, and attachments remain out of scope. Links are bearer links: anyone with the full link can read and save the copy. The relay sees IP addresses, timing, and sizes; the hosted fallback viewer must be trusted. Screenshots cannot be prevented. Detection is best-effort; review the copy before sharing.",
  },
  {
    slug: "the-poisoned-aur",
    title: "The Poisoned AUR",
    category: "Digital forensics · BeeCTF",
    year: "2026",
    image: "/images/projects/project-dfir-labs.jpg",
    imageAlt: "Reference material for the Arch Linux package compromise scenario",
    summary: "A forensic challenge built around a compromised Arch Linux package. Players reconstruct what happened from evidence left across the system.",
    contribution: "Authored the scenario, forensic evidence trail, and reference writeup for BeeCTF.",
    tools: ["Linux forensics", "systemd", "ELF", "xattr"],
    links: [{ label: "BeeCTF background (2017)", href: "https://socs.binus.ac.id/2017/06/20/bee-capture-the-flag/" }],
    context: "The challenge models a malicious AUR package and asks players to connect artifacts rather than recover a flag from a single file. It was written as a simulated investigation for BeeCTF 2026.",
    approach: [
      { title: "Build a connected evidence trail", text: "Distribute clues across package-manager logs, shell history, and the systemd journal. These sources establish the sequence of events around the package installation." },
      { title: "Follow the binary artifacts", text: "Use ELF analysis and extended file attributes to continue the investigation beyond the logs and recover the encrypted flag." },
      { title: "Document the investigation", text: "Write a reference solution covering both a command-line investigation using WSL2 and an alternative GUI workflow using FTK Imager." },
    ],
    outcome: "Delivered a digital forensics challenge and its reference writeup for BeeCTF. The scenario is a simulation, not a report of an incident on a production system.",
    limitations: "A CTF scenario has a deliberately constructed evidence trail and a known answer. Real investigations may have missing logs, uncertain timelines, and incomplete evidence.",
  },
  {
    slug: "csc-ctf-infrastructure",
    title: "CSC CTF infrastructure",
    category: "Competition infrastructure",
    year: "2026",
    image: "/images/projects/project-ctf-infra.png",
    imageAlt: "CSC CTF repository and challenge deployment workflow",
    summary: "A GitHub Actions workflow that keeps CTFd challenge metadata and Docker deployments in sync with the competition repository.",
    contribution: "Built deployment automation and coordinated challenge contributions as part of CSC’s R&D team.",
    tools: ["GitHub Actions", "Docker", "ctfcli", "Python"],
    links: [
      { label: "GitHub", href: "https://github.com/csc-research-binus/csc-ctf-contest-2026" },
      { label: "Event article", href: "https://student-activity.binus.ac.id/csc/2026/05/csc-ctf-contest-2026/" },
    ],
    context: "Running a multi-category CTF means keeping challenge content, platform metadata, and hosted services consistent while multiple authors contribute changes. The workflow moves that coordination into version control.",
    approach: [
      { title: "Keep metadata in version control", text: "Use ctfcli to synchronize challenge metadata from the repository to CTFd through GitHub Actions." },
      { title: "Automate service deployment", text: "Deploy containerized challenges to a VPS over SSH. Repository changes drive the deployment workflow instead of requiring each update to be applied manually." },
      { title: "Review team contributions", text: "Coordinate challenge authors across categories and review pull requests alongside the technical deployment work. Contributions are part of a team effort, not a solo competition build." },
    ],
    outcome: "The repository brings challenge configuration and deployment workflows together. Source code is available publicly for a closer look at the implementation.",
    limitations: "Automation still depends on correct challenge configuration, secured deployment credentials, and a working host. A successful workflow run is not a substitute for testing each challenge from a player’s perspective.",
  },
];
