import { to12Hour } from './funnel-plan';
import { getNassauPlaceAsset, type NassauPlaceAssetKey } from './nassau-place-assets';
import { isValidTimeString, minutesToTime, timeToMinutes } from './time';

export type WebItineraryCategory = 'Culture' | 'Beach' | 'Food' | 'Nature' | 'Shopping' | 'Return';
export type WebItineraryTravelMode = 'walk' | 'drive' | 'taxi' | 'bus';

export interface WebItineraryStop {
  id: string;
  timeLabel: string;
  title: string;
  category: WebItineraryCategory;
  imageSrc?: string;
  imageAlt?: string;
  rating?: number;
  travelMode?: WebItineraryTravelMode;
  travelMinutes?: number;
  description?: string;
  directionsUrl?: string;
  safetyNote?: string;
}

export interface NassauWebItineraryInput {
  resultType?: string | null;
  stepOffTime: string;
  allAboardTime: string;
  returnTarget?: string | null;
  groupType?: string | null;
  pace?: string | null;
  budget?: string | null;
  variant?: number;
}

interface ItineraryBlueprintStop {
  id: NassauPlaceAssetKey;
  offsetMinutes: number;
  title: string;
  category: WebItineraryCategory;
  travelMode?: WebItineraryTravelMode;
  travelMinutes?: number;
  description: string;
  safetyNote?: string;
}

const BUDGET_CULTURE_BEACH: ItineraryBlueprintStop[] = [
  {
    id: 'pirates-of-nassau',
    offsetMinutes: 0,
    title: 'Pirates of Nassau',
    category: 'Culture',
    travelMode: 'walk',
    travelMinutes: 15,
    description: "Start with a close, contained downtown anchor before the day gets noisy.",
    safetyNote: 'Keep the first move close to port until the rest of the day is anchored.',
  },
  {
    id: 'queens-staircase',
    offsetMinutes: 90,
    title: "Queen's Staircase & Fort Fincastle",
    category: 'Culture',
    travelMode: 'taxi',
    travelMinutes: 25,
    description: 'A classic Nassau history stop that pairs well with a conservative route.',
    safetyNote: 'Use a taxi if the group is hot, tired, or moving slower than expected.',
  },
  {
    id: 'junkanoo-beach',
    offsetMinutes: 185,
    title: 'Junkanoo Beach Relaxation',
    category: 'Beach',
    travelMode: 'drive',
    travelMinutes: 20,
    description: 'Keep beach time close enough that the return path stays simple.',
    safetyNote: 'Treat this as flexible time, not a reason to compress the return buffer.',
  },
  {
    id: 'bahamian-cookin',
    offsetMinutes: 290,
    title: "Authentic Bahamian Lunch at Bahamian Cookin' Restaurant & Bar",
    category: 'Food',
    travelMode: 'walk',
    travelMinutes: 15,
    description: 'A local-food anchor that keeps the day practical instead of scattered.',
    safetyNote: 'If service runs long, skip extras and protect the return target.',
  },
];

const FAMILY_LOW_STRESS: ItineraryBlueprintStop[] = [
  {
    id: 'pompey-square',
    offsetMinutes: 0,
    title: 'Pompey Square Orientation',
    category: 'Culture',
    travelMode: 'walk',
    travelMinutes: 8,
    description: 'Start with an easy meeting point and a simple first decision.',
    safetyNote: 'Good first stop when your group needs a reset after leaving the ship.',
  },
  {
    id: 'pirates-of-nassau',
    offsetMinutes: 55,
    title: 'Pirates of Nassau',
    category: 'Culture',
    travelMode: 'walk',
    travelMinutes: 12,
    description: 'A contained activity that keeps bathrooms, shade, and exits easier.',
    safetyNote: 'Do not add a distant stop until everyone still has energy.',
  },
  {
    id: 'junkanoo-beach',
    offsetMinutes: 155,
    title: 'Junkanoo Beach Easy Window',
    category: 'Beach',
    travelMode: 'taxi',
    travelMinutes: 15,
    description: 'A low-pressure beach window close enough to keep timing flexible.',
    safetyNote: 'Use this as optional flex time if the group is moving slowly.',
  },
];

const FOOD_CULTURE_BALANCED: ItineraryBlueprintStop[] = [
  {
    id: 'john-watlings',
    offsetMinutes: 0,
    title: "John Watling's Distillery",
    category: 'Culture',
    travelMode: 'taxi',
    travelMinutes: 12,
    description: 'A compact culture stop that works best when the route stays intentional.',
    safetyNote: 'Confirm hours before making this the anchor stop.',
  },
  {
    id: 'bahamian-cookin',
    offsetMinutes: 95,
    title: "Bahamian Cookin' Restaurant & Bar",
    category: 'Food',
    travelMode: 'walk',
    travelMinutes: 15,
    description: 'Make lunch the anchor instead of chasing too many small wins.',
    safetyNote: 'Leave early if service time starts eating into the buffer.',
  },
  {
    id: 'straw-market',
    offsetMinutes: 205,
    title: 'Straw Market Controlled Browse',
    category: 'Shopping',
    travelMode: 'walk',
    travelMinutes: 7,
    description: 'A short, near-port browse works better than a late cross-island add-on.',
    safetyNote: 'Set a firm leave time before entering.',
  },
];

const VARIANTS = [BUDGET_CULTURE_BEACH, FAMILY_LOW_STRESS, FOOD_CULTURE_BALANCED] as const;

function mapsSearchUrl(title: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${title} Nassau Bahamas`)}`;
}

function clampToDay(minutes: number) {
  return Math.min(1439, Math.max(0, Math.round(minutes)));
}

function safeTimeLabel(minutes: number) {
  return to12Hour(minutesToTime(clampToDay(minutes)));
}

function selectVariantIndex(input: NassauWebItineraryInput) {
  const requestedVariant = Number.isInteger(input.variant) ? Math.max(0, input.variant ?? 0) : 0;
  const resultType = (input.resultType ?? '').toLowerCase();
  const budget = (input.budget ?? '').toLowerCase();
  const pace = (input.pace ?? '').toLowerCase();
  const groupType = (input.groupType ?? '').toLowerCase();

  let base = 0;
  if (resultType.includes('family') || groupType.includes('family')) base = 1;
  if (resultType.includes('low-stress') || pace.includes('low_stress') || pace.includes('safest')) base = 1;
  if (budget.includes('mid') || budget.includes('premium')) base = 2;

  return (base + requestedVariant) % VARIANTS.length;
}

export function buildNassauWebItinerary(input: NassauWebItineraryInput): WebItineraryStop[] {
  if (!isValidTimeString(input.stepOffTime) || !input.returnTarget || !isValidTimeString(input.returnTarget)) {
    return [];
  }

  const startMinutes = timeToMinutes(input.stepOffTime);
  const returnMinutes = timeToMinutes(input.returnTarget);
  const usableMinutes = returnMinutes - startMinutes;
  if (usableMinutes <= 0) return [];

  const blueprint = VARIANTS[selectVariantIndex(input)];
  const lastActivityStart = returnMinutes - 65;
  const stops = blueprint
    .filter((stop, index) => index < 2 || startMinutes + stop.offsetMinutes <= lastActivityStart)
    .map((stop) => {
      const asset = getNassauPlaceAsset(stop.id);
      return {
        id: `${stop.id}-${stop.offsetMinutes}`,
        timeLabel: safeTimeLabel(startMinutes + stop.offsetMinutes),
        title: stop.title,
        category: stop.category,
        imageSrc: asset.src,
        imageAlt: asset.alt,
        travelMode: stop.travelMode,
        travelMinutes: stop.travelMinutes,
        description: stop.description,
        safetyNote: stop.safetyNote,
        directionsUrl: mapsSearchUrl(stop.title),
      };
    });

  const returnAsset = getNassauPlaceAsset('return-buffer');

  return [
    ...stops,
    {
      id: 'return-buffer',
      timeLabel: safeTimeLabel(returnMinutes),
      title: 'Start return buffer',
      category: 'Return',
      imageSrc: returnAsset.src,
      imageAlt: returnAsset.alt,
      travelMode: 'walk',
      travelMinutes: 15,
      description: 'Head back toward the pier before the day feels rushed.',
      safetyNote: 'Verify your official all-aboard time with your cruise line.',
      directionsUrl: mapsSearchUrl('Prince George Wharf'),
    },
  ];
}
