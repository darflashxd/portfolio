"use client";

import { useEffect, useRef, useState } from "react";
import "./cat.css";

export function CatMark() {
  return <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M6 6 13 10Q16 9 19 10L26 6 25 18Q25 26 16 27 7 26 7 18Z" /><path fill="var(--background)" d="M10 16h4v3h-4zm8 0h4v3h-4z" /></svg>;
}

function CatDrawing() {
  return <svg viewBox="0 0 140 100" width="140" height="100" aria-hidden="true">
    <ellipse cx="70" cy="94" rx="43" ry="2" fill="#000" opacity=".18" />
    <g className="cat-figure" strokeLinecap="round" strokeLinejoin="round">
      <path className="cat-tail" d="M100 62C125 57 128 37 119 28C115 24 110 28 114 32" fill="none" stroke="var(--cat-edge)" strokeWidth="10" />
      <path className="cat-tail" d="M100 62C125 57 128 37 119 28C115 24 110 28 114 32" fill="none" stroke="var(--cat-coat)" strokeWidth="7" />
      <path className="cat-leg far" d="M51 66Q48 78 52 91L43 91" fill="none" stroke="var(--cat-shade)" strokeWidth="9" />
      <path className="cat-leg far back" d="M93 66Q87 81 94 91L84 91" fill="none" stroke="var(--cat-shade)" strokeWidth="10" />
      <path d="M39 56C47 46 62 49 76 49C96 46 107 57 106 69C105 80 88 81 69 77L43 75Z" fill="var(--cat-coat)" stroke="var(--cat-edge)" strokeWidth="1.5" />
      <path className="cat-leg near" d="M43 67Q40 79 43 91L34 91" fill="none" stroke="var(--cat-coat)" strokeWidth="10" />
      <path className="cat-leg near back" d="M87 68Q80 80 85 91L76 91" fill="none" stroke="var(--cat-coat)" strokeWidth="11" />
      <g className="cat-head">
        <path d="M20 45L22 20Q23 16 27 21L37 31Q43 29 48 31L58 23Q62 20 62 25L61 46Q64 63 46 67C31 69 18 61 20 45Z" fill="var(--cat-coat)" stroke="var(--cat-edge)" strokeWidth="1.5" />
        <path d="M26 26 32 33 26 36M56 29 51 35 57 36" fill="var(--cat-ear)" />
        <ellipse cx="29" cy="50" rx="7" ry="5" fill="var(--cat-muzzle)" />
        <ellipse className="cat-eye" cx="32" cy="43" rx="2.1" ry="3.1" fill="var(--cat-eye)" />
        <path d="m21 47 4 1-2 3Z" fill="var(--cat-nose)" />
        <path d="m29 53 4 1m-5 2 4 2" stroke="var(--cat-edge)" strokeWidth="1" />
        <path d="M40 64Q49 65 56 60" stroke="var(--cat-collar)" strokeWidth="3" fill="none" />
      </g>
    </g>
  </svg>;
}

export function Cat() {
  const [paused, setPaused] = useState(false);
  const [inactive, setInactive] = useState(true);
  const [reduced, setReduced] = useState(false);
  const area = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const update = () => { setReduced(media.matches); setInactive(document.hidden || !inView); };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    if (area.current) observer.observe(area.current);
    update();
    media.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); media.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, []);
  return <div ref={area} className="cat-stage" data-paused={paused || inactive || reduced}>
    <div className="cat-lane ivory" aria-hidden="true"><div className="cat-traveler"><div className="cat-facing"><CatDrawing /></div></div></div>
    <div className="cat-lane charcoal" aria-hidden="true"><div className="cat-traveler"><div className="cat-facing"><CatDrawing /></div></div></div>
    {!reduced && <button className="cat-pause" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Resume animations" : "Pause animations"}</button>}
  </div>;
}
