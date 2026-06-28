"use client";

import { useEffect, useState } from "react";
import type { PlacePhotoResponse, PlacePhotoResult } from "@/lib/google-place-photo-types";
import type { NassauPlaceAssetKey } from "@/lib/nassau-place-assets";

interface GooglePlacePhotoProps {
  assetKey: NassauPlaceAssetKey;
  alt: string;
  maxWidthPx?: number;
  maxHeightPx?: number;
}

/**
 * Only treat an attribution URI as a link when it is an absolute http(s) URL or
 * protocol-relative (`//…`). Anything else (e.g. `javascript:`, `data:`, a bare
 * relative path) is rendered as plain text instead, never as an href.
 */
function safeAttributionHref(uri?: string): string | null {
  if (!uri) return null;
  return /^(https?:)?\/\//i.test(uri) ? uri : null;
}

/**
 * Client overlay that, AFTER mount, asks the server route for a real Google
 * Places photo and — only on success — renders it (with required attribution)
 * on top of whatever the card already shows. It is mounted ONLY by the unlocked,
 * post-email itinerary path; it never fetches in preview/locked states.
 *
 * Failure is silent by design: if the request is unavailable, errors, or the
 * image fails to load, this renders nothing and the card keeps its existing
 * static image / "Photo coming soon" placeholder underneath. Render is never
 * blocked on the network. The Google API key stays server-side — this component
 * only ever receives a resolved, short-lived `photoUri` and attribution text.
 */
export default function GooglePlacePhoto({
  assetKey,
  alt,
  maxWidthPx = 400,
  maxHeightPx = 320,
}: GooglePlacePhotoProps) {
  const [photo, setPhoto] = useState<PlacePhotoResult | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      assetKey,
      maxWidthPx: String(maxWidthPx),
      maxHeightPx: String(maxHeightPx),
    });

    fetch(`/api/places/photo?${params.toString()}`, { signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<PlacePhotoResponse>) : null))
      .then((data) => {
        if (data && data.kind === "photo") setPhoto(data);
      })
      .catch(() => {
        // Network/abort — keep the underlying fallback, surface nothing.
      });

    return () => controller.abort();
  }, [assetKey, maxWidthPx, maxHeightPx]);

  // Nothing usable yet (or image failed) → render nothing; fallback shows through.
  if (!photo || imgError) return null;

  return (
    <div className="np-stop-gphoto">
      {/* Plain <img>: the photoUri is short-lived and must not be persisted or
          run through the image optimizer / remote-host allowlist. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.photoUri}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setImgError(true)}
      />
      {photo.attributions.length > 0 ? (
        // Render EVERY attribution Google returns — required by the Places photo
        // license. Each one links out only when its URI is a safe http(s)/
        // protocol-relative URL; otherwise it shows as plain text.
        <span className="np-stop-gphoto-credit">
          {photo.attributions.map((credit, i) => {
            const href = safeAttributionHref(credit.uri);
            return (
              <span key={`${credit.displayName}-${i}`} className="np-stop-gphoto-credit-item">
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {credit.displayName}
                  </a>
                ) : (
                  credit.displayName
                )}
              </span>
            );
          })}
        </span>
      ) : null}
    </div>
  );
}
