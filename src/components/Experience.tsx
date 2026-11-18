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


export function Experience() {
  const { experiences } = portfolioData;
  return <section id="experience" className="section shell" aria-labelledby="experience-title">
    <div className="section-heading"><h2 id="experience-title">Experience</h2><p>Challenge development, technical leadership, and competition operations.</p></div>
    {experiences.categories.map(organization => <div className="experience-group" key={organization}><h3>{organization}</h3>
      {experiences.items.filter(item => item.organization === organization).sort((a, b) => Number(b.period.includes("Present")) - Number(a.period.includes("Present"))).map(item => {
        const copy = descriptions[item.id];
        const links = item.links || (item.link ? [{ label: item.id === "petir-author" ? "BeeCTF background article (2017)" : "LinkedIn profile", href: item.link }] : []);
        return <article className="experience-entry" key={item.id} data-experience-id={item.id}>
          <p className="date">{item.period.split(" · ")[0]}</p><div className="experience-copy"><h4>{item.role}</h4>{item.orgHighlight && <p className="experience-context">{item.orgHighlight}</p>}<p>{copy.summary}</p><ul>{copy.points.slice(0, 2).map(point => <li key={point}>{point}</li>)}</ul>
            <div className="source-links">{links.map(link => <a key={link.href} className="text-link" href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={14} /><span className="sr-only"> (opens in new tab)</span></a>)}</div>
          </div>
        </article>;
      })}</div>)}
  </section>;
}
