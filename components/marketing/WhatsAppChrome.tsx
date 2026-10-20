import Image from "next/image";

/** Decorative light-mode WhatsApp controls shared by every conversation preview. */
export function WhatsAppHeader() {
  return (
    <div className="wa-chat-head" aria-hidden="true">
      <span className="wa-back">
        <svg className="wa-i-back" viewBox="0 0 12 20">
          <path
            d="M10 2 2 10l8 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        3
      </span>
      <Image
        className="wa-avatar"
        src="/shoreday_icon.png"
        alt=""
        width={36}
        height={36}
      />
      <span className="wa-contact-info">
        <strong className="wa-contact">ShoreDay</strong>
        <span className="wa-contact-detail">Business account</span>
      </span>
    </div>
  );
}

export function WhatsAppWallpaper({ patternId }: { patternId: string }) {
  return (
    <svg
      aria-hidden="true"
      className="wa-wallpaper"
      viewBox="0 0 393 900"
      preserveAspectRatio="xMidYMin slice"
    >
      <defs>
        <pattern
          id={patternId}
          width="180"
          height="180"
          patternUnits="userSpaceOnUse"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* sun */}
            <circle cx="30" cy="30" r="8" />
            <path d="M30 16v-5M30 44v5M16 30h-5M44 30h5M20.1 20.1l-3.5-3.5M39.9 20.1l3.5-3.5M20.1 39.9l-3.5 3.5M39.9 39.9l3.5 3.5" />
            {/* palm tree on a little island */}
            <path d="M140 77c2-12 5-26 6-39M146 38c-6-6-16-7-22-2M146 38c-8 0-15 5-17 12M146 38c6-7 16-8 22-3M146 38c8 1 14 7 15 14M146 38c-1-7 2-13 7-16M126 79c8-4 22-4 30 0" />
            <circle cx="143.5" cy="42.5" r="2" />
            <circle cx="149" cy="42" r="2" />
            {/* curling wave */}
            <path d="M66 92c6-10 16-14 26-10 6 3 7 10 2 12-4 2-8-2-5-5M62 97c8 3 16 3 24 0s16-3 24 0" />
            {/* cruise ship */}
            <path d="M18 128h62l-8 12H26ZM28 128v-9h40v9M36 119v-7h24v7M50 112v-7h7v7M14 147c4-3 8-3 12 0s8 3 12 0 8-3 12 0 8 3 12 0 8-3 12 0 8 3 12 0" />
            <circle cx="34" cy="123.5" r="1.4" />
            <circle cx="44" cy="123.5" r="1.4" />
            <circle cx="54" cy="123.5" r="1.4" />
            <circle cx="64" cy="123.5" r="1.4" />
            {/* scallop shell */}
            <path d="M140 150 121 129q19-24 38 0ZM140 150l-12-30M140 150v-35M140 150l12-30M135 150h10v5h-10Z" />
          </g>
        </pattern>
      </defs>
      <rect width="393" height="900" fill={`url(#${patternId})`} />
    </svg>
  );
}

export function WhatsAppComposer() {
  return (
    <div className="wa-input" aria-hidden="true">
      <svg className="wa-i-input" viewBox="0 0 24 24">
        <path
          d="M12 4.5v15M4.5 12h15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span className="wa-field">
        <svg className="wa-i-sticker" viewBox="0 0 24 24">
          <path
            d="M13.5 3.5H7A3.5 3.5 0 0 0 3.5 7v10A3.5 3.5 0 0 0 7 20.5h6.5l7-7V7A3.5 3.5 0 0 0 17 3.5h-3.5M20.5 13.5H16a2.5 2.5 0 0 0-2.5 2.5v4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <svg className="wa-i-input" viewBox="0 0 24 24">
        <path
          d="M4 7.5h3.2l1.6-2.2h6.4l1.6 2.2H20a1.6 1.6 0 0 1 1.6 1.6v8.8a1.6 1.6 0 0 1-1.6 1.6H4a1.6 1.6 0 0 1-1.6-1.6V9.1A1.6 1.6 0 0 1 4 7.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="13.3"
          r="3.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
      <span className="wa-mic-control">
        <svg className="wa-i-input" viewBox="0 0 24 24">
          <path
            d="M12 3.2a3 3 0 0 0-3 3v5.6a3 3 0 0 0 6 0V6.2a3 3 0 0 0-3-3ZM6.2 11.4a5.8 5.8 0 0 0 11.6 0M12 17.2v3.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </div>
  );
}
