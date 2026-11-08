"use client";

import { useEffect, useRef, useState } from "react";

export default function MemberPerkFilm() {
  const player = useRef<HTMLVideoElement>(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    if (!player.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: "250px" });
    observer.observe(player.current);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={player}
      className="perk-film"
      aria-label="Under the Blue’s clear boat and swimming pigs tour in Nassau"
      src={nearViewport ? "/videos/under-the-blue.mp4" : undefined}
      poster={nearViewport ? "/images/shoreday/under-the-blue/film-poster.webp" : undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      controls
    />
  );
}
