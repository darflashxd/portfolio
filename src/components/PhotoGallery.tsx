"use client";

import { useState } from "react";
import Image from "next/image";

const photos = [
  { src: "/images/profile/profile.jpg", alt: "Ahmad Rafi Sutanto wearing a red and white BINUS jacket" },
  { src: "/images/profile/workspace.jpg", alt: "Rafi outdoors in a beige shirt against a blue evening sky" },
  { src: "/images/profile/ctf-team.jpg", alt: "Rafi in a black shirt outdoors at night" },
];

export function PhotoGallery() {
  const [active, setActive] = useState(0);
  return (
    <div className="photo-gallery">
      <button type="button" className="photo-stack" id="personal-photo" onClick={() => setActive(index => (index + 1) % photos.length)} aria-label={`Portrait ${active + 1} of ${photos.length}. Show next portrait`}>
        {photos.map((photo, index) => {
          const depth = (index - active + photos.length) % photos.length;
          return <span key={photo.src} className={`photo-card photo-depth-${depth}`} aria-hidden={index !== active}>
            <Image src={photo.src} alt={index === active ? photo.alt : ""} fill sizes="(max-width: 700px) 80vw, 360px" />
          </span>;
        })}
      </button>
      <span className="sr-only" aria-live="polite">Portrait {active + 1} of {photos.length}</span>
      <div className="photo-controls" role="group" aria-label="Choose a portrait">
        {photos.map((photo, index) => <button key={photo.src} type="button" onClick={() => setActive(index)} aria-pressed={active === index} aria-controls="personal-photo" aria-label={`Show portrait ${index + 1}`}><Image src={photo.src} alt="" width={44} height={52} /><span>0{index + 1}</span></button>)}
      </div>
    </div>
  );
}
