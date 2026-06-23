"use client";

import { useEffect, useRef } from "react";

// Renders the "ShoreDay Nassau Port Playbook" Kit form (public UID 140b41e206)
// by injecting Kit's public embed script into this container. Kit inserts the
// generated form immediately after its own script element, so the form renders
// in place here. Only the public form UID is used — no API key or secret.
export default function KitForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.querySelector("script")) return;

    const script = document.createElement("script");
    script.src = "https://shoreday.kit.com/140b41e206/index.js";
    script.async = true;
    script.setAttribute("data-uid", "140b41e206");
    container.appendChild(script);
  }, []);

  return <div ref={containerRef} />;
}
