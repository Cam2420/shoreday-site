import records from "./nassau-directory.json";

export const DIRECTORY_PATH = "/things-to-do-in-nassau";
export const DIRECTORY_CHECKED_ON = "2026-10-24";

export const DIRECTORY_CATEGORIES = [
  {
    slug: "beaches",
    name: "Beaches",
    short: "A little time by the water",
    description:
      "Compare Nassau and Paradise Island beaches by location, access and the journey from your cruise port.",
    intro:
      "Choose the journey as carefully as the beach. Start with how you will get there and back, then check access and conditions on the day.",
    icon: "sun",
  },
  {
    slug: "food-drink",
    name: "Food & drink",
    short: "Find your Nassau lunch",
    description:
      "Explore Nassau restaurants, Bahamian food stops and tastings with practical notes for cruise visitors.",
    intro:
      "Make room for a meal you will remember. Check the branch, service times and reservation requirements before building your day around a table.",
    icon: "cup",
  },
  {
    slug: "history-culture",
    name: "History & culture",
    short: "Look a little closer",
    description:
      "Discover Nassau museums, forts and historic landmarks, with location and access notes for your port day.",
    intro:
      "Nassau’s history is part of its streets, buildings and museums. Pick a stop that leaves you time to look, read and explore at your own pace.",
    icon: "arch",
  },
  {
    slug: "outdoor-adventure",
    name: "Outdoor & adventure",
    short: "Make a day of it",
    description:
      "Plan Nassau waterparks, wildlife visits and outdoor experiences around transfers, tickets and your ship’s all-aboard time.",
    intro:
      "A waterpark or booked activity can be the main event of your day. Include check-in and both transfers when deciding whether it fits.",
    icon: "wave",
  },
  {
    slug: "art-galleries",
    name: "Art & galleries",
    short: "Meet a creative Nassau",
    description:
      "Explore Bahamian art galleries, museums and creative workshops in Nassau, including appointments and visitor information.",
    intro:
      "Discover Bahamian artists through exhibitions, studios and hands-on workshops. Some visits need an appointment; check before setting off.",
    icon: "frame",
  },
  {
    slug: "nightlife",
    name: "Bars & evening spots",
    short: "For a later stay",
    description:
      "Explore Nassau cocktail bars and lively venues, with planning notes for evening and overnight visitors.",
    intro:
      "Evening plans need an evening port call. Check your ship’s all-aboard time first; some venues also offer daytime food or café service.",
    icon: "moon",
  },
  {
    slug: "events",
    name: "Events & festivals",
    short: "See what lines up",
    description:
      "Learn about Nassau Junkanoo, food festivals, carnival and sailing events, and find official schedules for your travel dates.",
    intro:
      "An annual tradition is not a confirmed booking for your date. Follow the organizer’s current schedule before making plans; the guides below describe the events, not live availability.",
    icon: "spark",
  },
] as const;

export type DirectoryCategorySlug =
  (typeof DIRECTORY_CATEGORIES)[number]["slug"];
export type DirectorySource = {
  title: string;
  url: string;
  checkedOn: string;
  supports: string;
};
export type DirectoryEntry = {
  slug: string;
  name: string;
  kind: "place" | "area" | "activity" | "event";
  categories: DirectoryCategorySlug[];
  area: string;
  description: string;
  gettingThere: string;
  visitSuggestion: string;
  cost: string;
  booking: string;
  access?: string;
  status: "listed" | "check-access" | "temporarily-closed" | "research";
  notice?: string;
  mapQuery?: string;
  mapsCheckedOn?: string;
  image?: string;
  featured?: boolean;
  sources: DirectorySource[];
};

export const DIRECTORY_ENTRIES = records as DirectoryEntry[];
export const PUBLISHED_ENTRIES = DIRECTORY_ENTRIES.filter(
  (entry) => entry.status !== "research",
);
export const PLACE_ENTRIES = PUBLISHED_ENTRIES.filter(
  (entry) => entry.kind === "place",
);
export function categoryBySlug(slug: string) {
  return DIRECTORY_CATEGORIES.find((category) => category.slug === slug);
}
export function entryPath(entry: DirectoryEntry) {
  return entry.kind === "place"
    ? `/nassau-places/${entry.slug}`
    : `${DIRECTORY_PATH}/${entry.categories[0]}#${entry.slug}`;
}
export function entriesInCategory(slug: DirectoryCategorySlug) {
  return PUBLISHED_ENTRIES.filter((entry) => entry.categories.includes(slug));
}
export function mapsUrl(entry: DirectoryEntry, directions = false) {
  const params = new URLSearchParams({ api: "1" });
  params.set(
    directions ? "destination" : "query",
    entry.mapQuery ?? `${entry.name}, Nassau, Bahamas`,
  );
  return `https://www.google.com/maps/${directions ? "dir" : "search"}/?${params}`;
}

export const DIRECTORY_GUIDES = [
  {
    slug: "nassau-cruise-port-walking-distance",
    title: "Walking from the cruise port",
    description: "Plan a route at your group’s pace.",
  },
  {
    slug: "nassau-cruise-with-kids",
    title: "Bringing the family?",
    description: "Leave room for breaks and shorter stops.",
  },
  {
    slug: "nassau-cash-or-card",
    title: "Cash, cards & your budget",
    description: "Separate your day’s costs before you go.",
  },
  {
    slug: "nassau-all-aboard-time",
    title: "When to head back",
    description: "Keep your ship’s all-aboard time in view.",
  },
] as const;
