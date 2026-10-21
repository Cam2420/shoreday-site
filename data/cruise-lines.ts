/** Cam's Nassau Cruise Port schedule, Oct 3–Nov 3, 2026. Refresh monthly. */
export const CRUISE_LINES = [
  "Royal Caribbean",
  "Carnival",
  "MSC",
  "Disney",
  "Norwegian",
  "Margaritaville at Sea",
  "Celebrity",
  "Princess",
  "Virgin Voyages",
  "Scenic",
  "TUI",
] as const;
export const CRUISE_LINE_COPY = `For passengers on ${CRUISE_LINES.join(", ")} and any ship stopping in Nassau.`;
export const INDEPENDENCE =
  "Independent. Not affiliated with any cruise line or Nassau Cruise Port.";
