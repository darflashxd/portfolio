import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

const descriptions: Record<string, { summary: string; points: string[] }> = {
  "petir-ifest-author": { summary: "Wrote a digital forensics challenge for IFEST 2026 through PETIR Cyber Security.", points: ["Built a dead-box scenario involving LUKS encryption, ext4 carving, and hidden keyfile extraction.", "Prepared a reference writeup and a solver to validate the intended solution."] },
  "petir-author": { summary: "Authored The Poisoned AUR for BeeCTF 2026, simulating a malicious Arch Linux package.", points: ["Connected evidence across package logs, shell history, systemd, ELF binaries, and extended attributes.", "Documented command-line and FTK Imager investigation paths."] },
  "petir-apprentice": { summary: "Became an official PETIR member in October 2026 after completing an apprenticeship.", points: ["Practiced threat detection, network security, and forensic triage during the apprenticeship.", "Contributed forensic challenges and investigation writeups with PETIR members."] },
  "csc-rd-deputy": { summary: "Coordinate R&D activities and challenge contributions for community competitions.", points: ["Built GitHub Actions workflows for CTFd synchronization and Docker deployment.", "Review challenge contributions and help coordinate authors across competition categories.", "Run practical sessions on memory forensics and Windows log analysis."] },
  "csc-ncw-pic": { summary: "Coordinated National Cyber Week 2025 as project officer.", points: ["Managed competition timelines and coordination with the steering committee.", "Helped run an online qualifier, an on-site IoT hacking final, and security workshops."] },
  "csc-rd-activist": { summary: "Contributed forensic challenges and learning sessions to CSC activities.", points: ["Wrote file-carving challenges for CSC CTF 2025.", "Helped junior members work with Volatility and Wireshark."] },
  "csc-member": { summary: "Joined community training in defensive security and investigation basics.", points: ["Practiced packet inspection, Linux security, and disk-forensics triage."] },
};

// ponytail: only reviewed, usable images; add new event documentation after checking its content and dimensions.
const usablePhotos = new Set(["/images/experience/exp-ifest-ctf.jpg", "/images/experience/beectf-socs-banner.png", "/images/experience/exp-aur-safety.jpg", "/images/experience/exp-petir-crest.jpg", "/images/projects/project-ctf-infra.png", "/images/experience/exp-ncw.jpg"]);
const captions: Record<string, string> = {
  "/images/experience/exp-ifest-ctf.jpg": "Event documentation supplied for IFEST 2026.",
  "/images/experience/beectf-socs-banner.png": "BeeCTF competition banner.",
  "/images/experience/exp-aur-safety.jpg": "Reference material for the malicious AUR package scenario.",
  "/images/experience/exp-petir-crest.jpg": "PETIR Cyber Security identity artwork.",
  "/images/projects/project-ctf-infra.png": "CSC CTF repository and deployment workflow.",
  "/images/experience/exp-ncw.jpg": "Group photograph supplied for National Cyber Week 2025.",
};

export function Experience() {
  const { experiences } = portfolioData;
  return <section id="experience" className="section shell" aria-labelledby="experience-title">
    <div className="section-heading"><div><p className="eyebrow">03 / Experience &amp; community</p><h2 id="experience-title">Learning by taking part.</h2></div><p>Challenge writing, technical work,<br />and the people behind the events.</p></div>
    {experiences.categories.map(organization => <div className="experience-group" key={organization}><h3>{organization}</h3>
      {experiences.items.filter(item => item.organization === organization).map(item => {
        const copy = descriptions[item.id];
        const photos = item.photos.filter(photo => usablePhotos.has(photo.src));
        const links = item.links || (item.link ? [{ label: item.id === "petir-author" ? "BeeCTF background article (2017)" : "LinkedIn profile", href: item.link }] : []);
        return <article className={`experience-entry ${photos.length ? "has-documentation" : ""}`} key={item.id} data-experience-id={item.id}>
          <div className="experience-copy"><p className="date">{item.period.split(" · ")[0]}</p><h4>{item.role}</h4>{item.orgHighlight && <p className="experience-context">{item.orgHighlight}</p>}<p>{copy.summary}</p><ul>{copy.points.map(point => <li key={point}>{point}</li>)}</ul>
            <div className="source-links">{links.map(link => <a key={link.href} className="source-card" href={link.href} target="_blank" rel="noopener noreferrer"><span><strong>{link.label.toLowerCase().replace(/\b\w/g, character => character.toUpperCase())}</strong><small>{new URL(link.href).hostname.replace(/^www\./, "")}</small></span><ArrowUpRight size={16} /><span className="sr-only"> (opens in new tab)</span></a>)}</div>
          </div>
          {photos.length > 0 && <div className="experience-photos">{photos.map(photo => <figure key={photo.src}><a href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${captions[photo.src]} (opens in new tab)`}><Image src={photo.src} alt={captions[photo.src]} width={1000} height={650} sizes="(max-width: 700px) 90vw, 440px" /></a><figcaption>{captions[photo.src]}</figcaption></figure>)}</div>}
        </article>;
      })}</div>)}
  </section>;
}
