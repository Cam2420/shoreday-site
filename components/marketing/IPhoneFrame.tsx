import type { ReactNode } from "react";
import {
  WhatsAppHeader,
  WhatsAppWallpaper,
  WhatsAppComposer,
} from "./WhatsAppChrome";

/** Reuses the original site’s iPhone hardware and light WhatsApp chrome. */
export default function IPhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="wa-phone">
      <span aria-hidden="true" className="wa-hw wa-hw-action" />
      <span aria-hidden="true" className="wa-hw wa-hw-vol-up" />
      <span aria-hidden="true" className="wa-hw wa-hw-vol-down" />
      <span aria-hidden="true" className="wa-hw wa-hw-power" />

      <div className="wa-screen">
        <span aria-hidden="true" className="wa-island" />

        <div className="wa-status" aria-hidden="true">
          <span className="wa-status-time">9:41</span>
          <span className="wa-status-icons">
            <svg className="wa-i-signal" viewBox="0 0 18 12">
              <rect
                x="0"
                y="7.5"
                width="3"
                height="4.5"
                rx="1"
                fill="currentColor"
              />
              <rect
                x="5"
                y="5"
                width="3"
                height="7"
                rx="1"
                fill="currentColor"
              />
              <rect
                x="10"
                y="2.5"
                width="3"
                height="9.5"
                rx="1"
                fill="currentColor"
              />
              <rect
                x="15"
                y="0"
                width="3"
                height="12"
                rx="1"
                fill="currentColor"
              />
            </svg>
            <svg className="wa-i-wifi" viewBox="0 0 16 12">
              <path
                d="M1.3 4.4a9.6 9.6 0 0 1 13.4 0M3.8 6.9a6 6 0 0 1 8.4 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <path d="M8 11.3 5.9 9.2a3 3 0 0 1 4.2 0Z" fill="currentColor" />
            </svg>
            <svg className="wa-i-battery" viewBox="0 0 27 13">
              <rect
                x="0.5"
                y="0.5"
                width="23"
                height="12"
                rx="3.8"
                fill="none"
                stroke="currentColor"
                opacity="0.4"
              />
              <rect
                x="2"
                y="2"
                width="16.5"
                height="9"
                rx="2.3"
                fill="currentColor"
              />
              <path
                d="M25 4.4v4.2c.8-.3 1.4-1.1 1.4-2.1s-.6-1.8-1.4-2.1Z"
                fill="currentColor"
                opacity="0.45"
              />
            </svg>
          </span>
        </div>

        <WhatsAppHeader />
        <div className="wa-chat">
          <WhatsAppWallpaper patternId="shoreday-phone-wallpaper" />
          {children}
        </div>

        <WhatsAppComposer />
        <span aria-hidden="true" className="wa-home-indicator" />
      </div>
    </div>
  );
}
