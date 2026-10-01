"use client";

import { useState, useSyncExternalStore } from "react";
import { WHATSAPP_SHARE_TEXT, WHATSAPP_SHARE_TITLE, WHATSAPP_SHARE_URL } from "@/lib/whatsapp";

const subscribeNoop = () => () => {};

/**
 * Whether the browser has the native share sheet. The server can't know, so it
 * renders the share wording and the client corrects it on hydration.
 */
function useCanShare() {
  return useSyncExternalStore(
    subscribeNoop,
    () => typeof navigator.share === "function",
    () => true,
  );
}

function isAbort(err: unknown) {
  return typeof err === "object" && err !== null && (err as { name?: unknown }).name === "AbortError";
}

/**
 * "Send to a cruise buddy" button for the mobile share card. Opens the native
 * share sheet where there is one; otherwise copies the share text and link.
 * Tracked as `whatsapp_share_click` through HomeAnalytics' data attributes.
 */
export default function WhatsAppShare() {
  const canShare = useCanShare();
  const [status, setStatus] = useState("");

  async function share() {
    setStatus("");

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: WHATSAPP_SHARE_TITLE,
          text: WHATSAPP_SHARE_TEXT,
          url: WHATSAPP_SHARE_URL,
        });
        return;
      } catch (err) {
        // Closing the share sheet is not an error. Anything else falls back to
        // copying the link.
        if (isAbort(err)) return;
      }
    }

    try {
      await navigator.clipboard.writeText(`${WHATSAPP_SHARE_TEXT} ${WHATSAPP_SHARE_URL}`);
      setStatus("Link copied");
    } catch {
      // Clipboard unavailable or blocked: nothing to confirm.
    }
  }

  return (
    <>
      <button
        type="button"
        className="wa-share-button"
        onClick={share}
        data-analytics-event="whatsapp_share_click"
        data-analytics-surface="home_whatsapp_share"
      >
        {canShare ? "Send to a cruise buddy" : "Copy link"}
      </button>
      <p className="wa-share-status" aria-live="polite">
        {status}
      </p>
    </>
  );
}
