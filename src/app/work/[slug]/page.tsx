import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { work } from "@/data/work";

export function generateStaticParams() {
  return work.map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = work.find(item => item.slug === slug);
  return { title: project ? `${project.title} — Ahmad Rafi Sutanto` : "Project not found", description: project?.summary };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = work.find(item => item.slug === slug);
  if (!project) notFound();

  const additionalDetails = <>
    {project.nextSteps && <section><h2>Next steps</h2><p>{project.nextSteps}</p></section>}
    <section><h2>Project links</h2><div className="project-actions">{project.links.map(link => <a key={link.href} className="text-link" href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <ArrowUpRight size={16} /><span className="sr-only"> (opens in new tab)</span></a>)}</div></section>
  </>;

  return <><Navbar /><main id="main-content" tabIndex={-1} className="shell case-study">
    <Link className="text-link back-link" href="/#work"><ArrowLeft size={16} /> All work</Link>
    <header className="case-header"><p className="eyebrow">{project.category} / {project.year}</p><h1>{project.title}</h1><p className="case-summary">{project.summary}</p><p className="case-contribution">{project.contribution}</p><ul className="tool-list">{project.tools.map(tool => <li key={tool}>{tool}</li>)}</ul></header>
    <figure className="case-image"><Image src={project.image} alt={project.imageAlt} width={1400} height={900} priority sizes="(max-width: 1120px) 100vw, 1120px" /><figcaption>{project.imageAlt}</figcaption></figure>
    <div className="case-body">
      <section><h2>Context</h2><p>{project.context}</p></section>
      <section><h2>Approach</h2>{project.approach.map((step, index) => <article className="case-step" key={step.title}><span className="date">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</section>
      <section><h2>Current outcome</h2><p>{project.outcome}</p></section>
      <section><h2>Limitations</h2><p>{project.limitations}</p></section>
      {additionalDetails}
      <div className="case-contact"><p>Want to discuss this project?</p><a className="text-link" href="mailto:rafisutanto@gmail.com">Email me <ArrowUpRight size={16} /></a></div>
    </div>
  </main><Footer /></>;
}
