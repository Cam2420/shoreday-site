"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function WelcomeVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  function playDemo() {
    const video = videoRef.current;
    if (!video) return;
    setShowPlayer(true);
    // Start within the tap gesture so mobile browsers allow sound.
    void video.play().catch(() => video.focus());
  }

  return (
    <div className="chat-photo-crop welcome-crop">
      <video
        ref={videoRef}
        src="/videos/shoreday-whatsapp-demo.mp4"
        aria-label="ShoreDay WhatsApp demo"
        controls={showPlayer}
        playsInline
        preload="none"
      />
      {!showPlayer && (
        <button type="button" onClick={playDemo} aria-label="Play the ShoreDay WhatsApp demo">
          <Image
            src="/images/shoreday/chat/welcome-source.webp"
            width={942}
            height={2048}
            sizes="(max-width: 600px) 90vw, 420px"
            alt=""
          />
        </button>
      )}
    </div>
  );
}
