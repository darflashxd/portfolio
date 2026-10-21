import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { work } from "@/data/work";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Experience } from "@/components/Experience";
import { PhotoGallery } from "@/components/PhotoGallery";

export default function Home() {
  const { siteInfo, socials, ctfWriteups } = portfolioData;
  const recognition = portfolioData.certifications.find(item => item.status === "Verified")!;

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <section className="intro shell" aria-labelledby="intro-title">
          <div className="intro-copy">
            <p className="availability"><span /> Open to internships &amp; job opportunities</p>
            <h1 id="intro-title">Ahmad Rafi Sutanto<span className="accent">.</span></h1>
            <p className="intro-role">Digital forensics &amp; defensive security</p>
            <p className="intro-description">I’m a cybersecurity student at BINUS University. I build privacy tools, write forensic challenges, and help run CTF competitions.</p>
            <div className="actions">
              <a className="button primary" href="#work">View selected work <ArrowUpRight size={16} /></a>
              <a className="text-link" href={siteInfo.resumeUrl} target="_blank" rel="noopener noreferrer">View CV <ArrowUpRight size={16} /><span className="sr-only"> (PDF, opens in new tab)</span></a>
              <a className="text-link" href={`mailto:${socials.email}`}>Email <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>

        <section id="work" className="section shell" aria-labelledby="work-title">
          <div className="section-heading"><div><p className="eyebrow">01 / Selected work</p><h2 id="work-title">Things I’ve worked on.</h2></div><p>Privacy tools, forensic challenges,<br />and the infrastructure behind a CTF.</p></div>
          {work.map((project, index) => (
            <article className={`work-item ${index === 0 ? "featured-work" : ""}`} key={project.slug}>
              <Link href={`/work/${project.slug}`} className="work-visual" aria-label={`Read ${project.title} case study`}>
                <Image src={project.image} alt={project.imageAlt} width={1200} height={760} sizes="(max-width: 700px) 100vw, 60vw" className={project.slug === "the-poisoned-aur" ? "contain-image" : ""} />
                <span className="image-link" aria-hidden="true"><ArrowUpRight size={21} /></span>
              </Link>
              <div className="work-copy"><div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div><h3><Link href={`/work/${project.slug}`}>{project.title}</Link></h3><p>{project.summary}</p><p className="project-contribution">{project.contribution}</p><ul className="tool-list" aria-label="Technologies">{project.tools.map(tool => <li key={tool}>{tool}</li>)}</ul><div className="project-actions"><Link className="text-link" href={`/work/${project.slug}`}>Read case study <ArrowUpRight size={16} /></Link>{project.links.map(link => <a className="text-link" href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">{link.label} <ArrowUpRight size={14} /><span className="sr-only"> (opens in new tab)</span></a>)}</div>{project.slug === "safeshare" && <span className="project-status">Available for use · actively developed</span>}</div>
            </article>
          ))}
          <article className="work-item"><a className="work-visual" href="https://github.com/darflashxd/pulmoai" target="_blank" rel="noopener noreferrer" aria-label="View PulmoAI repository (opens in new tab)"><Image src="/images/projects/project-pulmoai.png" alt="PulmoAI chest X-ray classification application interface" width={1200} height={760} sizes="(max-width: 700px) 100vw, 60vw" /><span className="image-link" aria-hidden="true"><ArrowUpRight size={21} /></span></a><div className="work-copy"><div className="project-meta"><span>Applied AI · Academic project</span><span>2025</span></div><h3>PulmoAI</h3><p>A chest X-ray classification web app built with MobileNetV2, Flask, and React.</p><p className="project-contribution">Worked on model optimization using transfer learning, training callbacks, and backend dependency compatibility. An academic project, not a clinical diagnostic tool.</p><ul className="tool-list" aria-label="Technologies"><li>TensorFlow / Keras</li><li>Flask</li><li>React</li></ul><a className="text-link" href="https://github.com/darflashxd/pulmoai" target="_blank" rel="noopener noreferrer">View repository <ArrowUpRight size={16} /><span className="sr-only"> (opens in new tab)</span></a></div></article>
        </section>

        <section id="about" className="section about-section" aria-labelledby="about-title"><div className="shell about-grid">
          <div><p className="eyebrow">02 / A little context</p><h2 id="about-title">The person<br />behind the work.</h2><p className="about-lead">I like the part where scattered evidence starts to make sense.</p><p>I’m studying cybersecurity at BINUS University, with a focus on digital forensics and defensive security. I’m a member of PETIR Cyber Security and Deputy Coordinator of R&amp;D at CSC BINUS, where I contribute to projects and CTF challenges.</p><p>I’m looking for an internship where I can contribute to investigations, detection, or security tooling—and learn from people doing that work every day. I’m also open to job opportunities.</p><a className="text-link" href={siteInfo.resumeUrl} target="_blank" rel="noopener noreferrer">View my CV <Download size={16} /><span className="sr-only"> (PDF, opens in new tab)</span></a></div>
          <div><PhotoGallery /><section className="learning-note" aria-labelledby="recognition-title"><h3 id="recognition-title" className="eyebrow">Recognition</h3><p>Finalist — Wreck-IT 7.0 General CTF<br /><span>Poltek SSN · Aug 2026 · Team HM Plenger</span></p><a className="text-link" href={recognition.credentialUrl} target="_blank" rel="noopener noreferrer">View certificate <ArrowUpRight size={16} /><span className="sr-only"> (PDF, opens in new tab)</span></a></section><div className="learning-note"><span className="eyebrow">Currently learning</span><p>Preparing for Blue Team Level 1 (BTL1).<br /><span>Certification not yet earned.</span></p></div></div>
        </div></section>

        <Experience />

        <section id="writing" className="section shell" aria-labelledby="writing-title"><div className="section-heading"><div><p className="eyebrow">03 / Writing</p><h2 id="writing-title">Notes from the investigation.</h2></div><p>Competition writeups and walkthroughs.<br />Original reports, available as PDFs.</p></div><div className="writing-list">{ctfWriteups.items.map(item => <a key={item.id} href={item.docUrl} target="_blank" rel="noopener noreferrer" className="writing-row"><span className="writing-year">{item.year}</span><div><h3>{item.competition}</h3><p>{item.tags.filter(tag => !["Puspresnas", "BSSN"].includes(tag)).slice(-2).join(" / ")}</p></div><span className="pdf-label">PDF <ArrowUpRight size={17} /><span className="sr-only"> (opens in new tab)</span></span></a>)}</div></section>

        <section id="contact" className="section contact-section" aria-labelledby="contact-title"><div className="shell"><p className="eyebrow">04 / Contact</p><h2 id="contact-title">Have a role in mind?<br />Let’s talk.</h2><p>I’m open to internships and job opportunities in cybersecurity,<br className="desktop-break" /> especially digital forensics, SOC, and defensive security.</p><a className="contact-email" href={`mailto:${socials.email}`}>{socials.email} <ArrowUpRight aria-hidden="true" /></a><div className="contact-links"><a href={`mailto:${socials.email}`}><Mail size={16} /> Email</a><a href={socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16} /><span className="sr-only">(opens in new tab)</span></a><a href={socials.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16} /><span className="sr-only">(opens in new tab)</span></a></div></div></section>
      </main>
      <Footer />
    </>
  );
}
