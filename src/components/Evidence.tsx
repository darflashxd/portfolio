"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { ArrowUpRight, X, ZoomIn } from "lucide-react";

export function ProductPreview() {
  const [document, setDocument] = useState(false);
  const src = `/images/projects/pomicat-${document ? "word" : "chat"}-review.webp`;
  return <figure className="product-preview"><div className="preview-controls" role="group" aria-label="PomiCat preview"><button type="button" aria-pressed={!document} onClick={() => setDocument(false)}>Conversation</button><button type="button" aria-pressed={document} onClick={() => setDocument(true)}>Document</button><a href={src} target="_blank" rel="noopener noreferrer">Full size <ArrowUpRight size={14} /><span className="sr-only"> (opens in new tab)</span></a></div><a key={src} className="preview-enter product-image" href={src} target="_blank" rel="noopener noreferrer" aria-label="Enlarge PomiCat screenshot (opens in new tab)"><Image src={src} alt={document ? "PomiCat review of a fictional Word agreement" : "PomiCat review of a fictional AI conversation"} width={1800} height={document ? 1250 : 1428} sizes="(max-width: 700px) 100vw, 1000px" /></a><figcaption aria-live="polite">{document ? "Document review — fictional data; names marked manually." : "Conversation review — fictional data."}</figcaption></figure>;
}

export function CertificatePreview({ src, title, original, width, height }: { src: string; title: string; original: string; width: number; height: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  return <div className="certificate-preview"><button type="button" ref={trigger} className="certificate-open" onClick={() => dialog.current?.showModal()} aria-haspopup="dialog" aria-label={`Preview ${title}`}><Image src={src} alt={`${title} certificate`} width={width} height={height} sizes="(max-width: 700px) 100vw, 260px" /><span><ZoomIn size={16} /> Preview document</span></button><dialog ref={dialog} className="certificate-dialog" aria-labelledby={id} onClose={() => trigger.current?.focus()} onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}><div className="document-toolbar"><h3 id={id}>{title}</h3><button autoFocus type="button" onClick={() => dialog.current?.close()} aria-label="Close certificate preview"><X size={22} /></button></div><div className="document-image"><Image src={src} alt={`${title} certificate`} width={width} height={height} sizes="90vw" /></div><a className="text-link" href={original} target="_blank" rel="noopener noreferrer">Open original document <ArrowUpRight size={16} /><span className="sr-only"> (opens in new tab)</span></a></dialog></div>;
}
