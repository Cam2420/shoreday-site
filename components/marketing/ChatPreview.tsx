import Image from "next/image";
import type { ReactNode } from "react";
import IPhoneFrame from "./IPhoneFrame";
import {
  WhatsAppHeader,
  WhatsAppWallpaper,
  WhatsAppComposer,
} from "./WhatsAppChrome";

/** Accessible light-mode transcriptions. Not screenshots or customer testimonials. */
export function ChatBubble({
  children,
  sent = false,
  time,
}: {
  children: ReactNode;
  sent?: boolean;
  time?: string;
}) {
  return (
    <div className={`chat-bubble ${sent ? "chat-sent" : "chat-received"}`}>
      {children}
      {(time || sent) && (
        <span className="chat-message-meta" aria-hidden="true">
          {time && <time>{time}</time>}
          {sent && (
            <svg className="chat-read-ticks" viewBox="0 0 18 12">
              <path
                d="M1 6.5 4.5 10 13 1.5M8 9l1 1 8-8.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      )}
    </div>
  );
}
export function GovernmentHousePhoto() {
  return (
    <div className="chat-photo-crop landmark-crop">
      <Image
        src="/images/shoreday/chat/government-house-source.webp"
        width={1095}
        height={2048}
        sizes="(max-width: 600px) 90vw, 400px"
        alt="Government House in Nassau, with its pink facade, front staircase and statue, from the supplied WhatsApp photo"
      />
    </div>
  );
}
export function GovernmentHouseReply() {
  return (
    <p>
      🏛️ That is <strong>Government House</strong> on Mount Fitzwilliam in
      downtown Nassau, with the statue of Christopher Columbus on the front
      steps.
    </p>
  );
}
export function MenuPhoto() {
  return (
    <div className="chat-photo-crop menu-crop">
      <Image
        src="/images/shoreday/chat/menu-source.webp"
        width={942}
        height={2048}
        sizes="(max-width: 600px) 90vw, 500px"
        alt="Goldie’s Conch House menu photographed in the supplied October 2026 WhatsApp chat"
      />
    </div>
  );
}
function WelcomePreview() {
  return (
    <>
      <div className="chat-photo-crop welcome-crop">
        <Image
          src="/images/shoreday/chat/welcome-source.webp"
          width={942}
          height={2048}
          sizes="(max-width: 600px) 90vw, 420px"
          alt="Still from the supplied ShoreDay welcome video, showing a cruise ship in Nassau"
        />
      </div>
      <span className="chat-media-caption">
        Welcome video · screenshot preview
      </span>
    </>
  );
}
function ReplyOptions({ items }: { items: string[] }) {
  return (
    <div className="chat-reply-options" aria-label="Example reply options">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
export function GoldiesReply() {
  return (
    <>
      <p>That’s Goldie’s Conch House at the Arawak Cay Fish Fry.</p>
      <p>
        Conch salad is listed at <strong>$15</strong> and a cracked conch plate
        is <strong>$16</strong>.
      </p>
      <p>
        The banner says <strong>10% VAT &amp; 15% gratuity</strong> will be
        added to your check.
      </p>
    </>
  );
}
export function VoiceWave() {
  return (
    <div
      className="voice-wave"
      aria-label="Illustration of a four-second voice note"
    >
      <span aria-hidden="true">▶</span>
      <div aria-hidden="true">
        {[
          8, 16, 24, 12, 20, 30, 24, 16, 34, 26, 16, 22, 30, 18, 12, 22, 28, 18,
          12, 8, 14, 6,
        ].map((h, i) => (
          <i key={i} style={{ height: h }} />
        ))}
      </div>
      <small>0:04</small>
    </div>
  );
}
export function ChatExcerpt({
  children,
  id,
  label,
}: {
  children: ReactNode;
  id: string;
  label: string;
}) {
  return (
    <div className="mini-chat" role="group" aria-label={label}>
      <WhatsAppHeader />
      <div className="wa-chat">
        <WhatsAppWallpaper patternId={`shoreday-${id}-wallpaper`} />
        <div className="mini-thread">{children}</div>
      </div>
      <WhatsAppComposer />
    </div>
  );
}
export function ChatCard({
  type,
}: {
  type: "photo" | "menu" | "voice" | "location" | "countdown";
}) {
  return (
    <ChatExcerpt id={type} label={`${type} chat example in light mode`}>
      {type === "photo" && (
        <>
          <ChatBubble sent time="4:17 PM">
            <GovernmentHousePhoto />
            <p>What is this?</p>
          </ChatBubble>
          <ChatBubble>
            <GovernmentHouseReply />
          </ChatBubble>
        </>
      )}
      {type === "menu" && (
        <>
          <ChatBubble sent>
            <MenuPhoto />
            <p>Is this a fair price?</p>
          </ChatBubble>
          <ChatBubble>
            <GoldiesReply />
          </ChatBubble>
        </>
      )}
      {type === "voice" && (
        <>
          <ChatBubble sent>
            <VoiceWave />
          </ChatBubble>
          <ChatBubble>
            <p>🎙️ Got your voice note, one moment…</p>
          </ChatBubble>
          <ChatBubble>
            <p>Your ship may dock further out along the pier.</p>
            <p>Allow time for the pier walk.</p>
          </ChatBubble>
        </>
      )}
      {type === "location" && (
        <>
          <ChatBubble sent>
            <p>Where’s the nearest ATM?</p>
          </ChatBubble>
          <ChatBubble>
            <p>Checking that now…</p>
          </ChatBubble>
          <ChatBubble>
            <div className="chat-map-label">
              Scotiabank · Rawson Square &amp; Bay St
            </div>
            <p>Please confirm when you arrive.</p>
            <span className="chat-link">
              Google Maps · directions, hours, reviews
            </span>
          </ChatBubble>
        </>
      )}
      {type === "countdown" && (
        <>
          <span className="chat-example-label">
            Illustrative timing example
          </span>
          <ChatBubble sent>
            <p>How much time do I have?</p>
          </ChatBubble>
          <ChatBubble>
            <p>At 11:36 AM:</p>
            <p>
              <strong>5 hours and 54 minutes</strong> until your 5:30 PM
              leave-by.
            </p>
            <div className="chat-time-rows">
              <span>
                Leave by <b>5:30 PM</b>
              </span>
              <span>
                Back at the pier <b>6:00 PM</b>
              </span>
              <span>
                All-aboard <b>7:00 PM</b>
              </span>
            </div>
            <p>Use your ship’s official all-aboard time.</p>
          </ChatBubble>
        </>
      )}
    </ChatExcerpt>
  );
}
export default function ChatPreview() {
  return (
    <figure className="chat-demo">
      <IPhoneFrame>
        <div
          className="chat-scroll"
          tabIndex={0}
          role="region"
          aria-label="Scroll through an example Nassau day in WhatsApp"
        >
          <div className="chat-day">Getting started</div>
          <ChatBubble sent>
            <p>Hi</p>
          </ChatBubble>
          <ChatBubble>
            <WelcomePreview />
            <p>
              <strong>Welcome to ShoreDay 👋</strong>
              <br />
              Less figuring it out. More enjoying Nassau 🇧🇸
            </p>
            <p>
              <strong>
                $15 once for your whole group, for one Nassau port day.
              </strong>
            </p>
            <p>
              🗺️ <strong>Your personal day plan:</strong> built around your
              interests and your ship’s confirmed all-aboard time.
            </p>
            <p>
              📘 <strong>Your Nassau Port-Day Playbook:</strong> delivered here.
              Save it for offline access.
            </p>
            <p>
              💬 <strong>Your ShoreDay Concierge:</strong> help throughout your
              port day by text, voice note or photo.
            </p>
            <p>
              🎟️ <strong>Tours &amp; excursions:</strong> optional experiences
              with booking links in this chat.
            </p>
            <p>
              🤖 Automated assistance. Type <strong>HUMAN</strong> to request
              support.
            </p>
            <p>Tours, activities, transport, food and admissions cost extra.</p>
            <span className="chat-media-caption">
              Independent · Nassau only · No subscription
            </span>
            <ReplyOptions
              items={[
                "↶ 🗺️ See a sample",
                "↶ 💬 How it works",
                "↶ ✅ Get my plan",
              ]}
            />
          </ChatBubble>
          <ChatBubble sent>
            <p>✅ Get my plan</p>
          </ChatBubble>
          <ChatBubble>
            <p>
              <strong>Your Nassau plan · $15</strong>
            </p>
            <p>
              $15 once for your whole group. One Nassau port day. No
              subscription.
            </p>
            <p>
              ✅ Your personal day plan
              <br />✅ Your Nassau Port-Day Playbook (PDF)
              <br />✅ Your ShoreDay Concierge throughout the port day
            </p>
            <p>
              <strong>Full refund any time before your plan is sent.</strong>
            </p>
            <p>Tours, activities, transport, food and admissions cost extra.</p>
            <p>
              Use this <strong>same WhatsApp number at checkout</strong> so we
              can deliver your plan and PDF here in chat.
            </p>
            <ReplyOptions items={["↗ Get my plan – $15"]} />
          </ChatBubble>
          <div className="chat-day">Your plan and offline kit</div>
          <ChatBubble sent>
            <p>We’d love local food and a beach. All-aboard is 7:00 PM.</p>
          </ChatBubble>
          <ChatBubble>
            <span className="chat-example-label">Illustrative plan</span>
            <p>
              <strong>A little beach. A little Nassau.</strong>
            </p>
            <p>
              Start with a walk, leave room for local food, then enjoy beach
              time if it fits.
            </p>
            <p>
              Leave by <strong>5:30 PM</strong>. Back at the pier by{" "}
              <strong>6:00 PM</strong>.
            </p>
          </ChatBubble>
          <ChatBubble>
            <div className="pdf-preview">
              <span>PDF</span>
              <div>
                <strong>Your Nassau Playbook</strong>
                <small>17 pages · save before stepping ashore</small>
              </div>
            </div>
            <p>
              Orientation map, timing worksheet and your back-to-ship backup
              card.
            </p>
          </ChatBubble>
          <div className="chat-day">Questions ashore</div>
          <ChatBubble sent>
            <VoiceWave />
          </ChatBubble>
          <ChatBubble>
            <p>🎙️ Got your voice note, one moment…</p>
          </ChatBubble>
          <ChatBubble sent>
            <MenuPhoto />
            <p>Is this a fair price?</p>
          </ChatBubble>
          <ChatBubble>
            <GoldiesReply />
          </ChatBubble>
          <div className="chat-day">Menu prices as of Oct 2026</div>
          <ChatBubble sent>
            <p>Where’s the nearest ATM?</p>
          </ChatBubble>
          <ChatBubble>
            <div className="chat-map-label">
              Scotiabank · Rawson Square &amp; Bay St
            </div>
            <p>Please confirm when you arrive.</p>
            <span className="chat-link">
              Google Maps · directions, hours, reviews
            </span>
          </ChatBubble>
          <ChatBubble sent>
            <p>What tours?</p>
          </ChatBubble>
          <ChatBubble>
            <p>
              <strong>🏝️ Tours that fit a port day</strong>
            </p>
            <p>
              Pick your Nassau adventure! Tap a tour to see its times, meeting
              point and booking button.
            </p>
            <p>Always check the drop-back time against your leave-by time.</p>
            <p className="chat-media-caption">
              ShoreDay may earn a commission if you book.
            </p>
            <ReplyOptions items={["☷ 🏝️ See tours"]} />
          </ChatBubble>
          <div className="chat-day">Checking your time</div>
          <ChatBubble sent>
            <p>How much time do I have?</p>
          </ChatBubble>
          <ChatBubble>
            <span className="chat-example-label">
              Illustrative countdown · 11:36 AM
            </span>
            <p>
              <strong>5 hours and 54 minutes</strong> until your 5:30 PM
              leave-by.
            </p>
            <p>
              Back at the pier: 6:00 PM.
              <br />
              All-aboard: 7:00 PM.
            </p>
          </ChatBubble>
        </div>
      </IPhoneFrame>
      <figcaption>
        Scroll to follow a sample Nassau day. Real chat excerpts, shortened and
        adapted to light mode. Plan and countdown are illustrations; media and
        reply options are previews.
      </figcaption>
    </figure>
  );
}
