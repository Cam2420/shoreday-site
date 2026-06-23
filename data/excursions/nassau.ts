/**
 * Verified Nassau excursion extract from the shipped mobile app
 * (`lib/data/excursions_data.dart`, repo Cam2420/BAH-tourist-app @ 0706be1).
 *
 * ┌───────────────────────────────────────────────────────────────────────────┐
 * │  ⚠  THIS IS NOT A PRODUCTION RANKING CATALOG.                              │
 * │                                                                            │
 * │  The mobile source supplies only the fields below. The spec §8 `Excursion` │
 * │  type and the eligibility/ranking engine additionally require             │
 * │  outboundTravelMinutes, returnTravelMinutes, startTimeFlexibility,         │
 * │  partyTypes, minAge, familyFit, logisticsEase, vendorPressureFit, and      │
 * │  per-excursion minimumUsableMinutes — NONE of which exist in the mobile    │
 * │  catalog. Per spec §21.10 / Phase 9, those must be curated by the owner    │
 * │  before a production catalog exists. Until then, lib/excursion-engine.ts   │
 * │  runs against test fixtures, not this extract.                             │
 * │                                                                            │
 * │  `affiliateUrl` values are preserved VERBATIM (incl. `pid=P00293644`) and  │
 * │  must never be mutated or have PII appended.                               │
 * └───────────────────────────────────────────────────────────────────────────┘
 *
 * `durationMinutes` and `viatorProductCode` are derived deterministically from
 * the mobile `duration` string and `affiliateUrl` respectively — not invented.
 */

export interface NassauMobileExcursionRecord {
  id: string;
  port: 'nassau';
  title: string;
  /** Original mobile duration string, e.g. "4 hours". */
  durationLabel: string;
  /** Derived from `durationLabel`. */
  durationMinutes: number;
  /** Mobile `uiTabCategory`. */
  uiTabCategory: string;
  /** Mobile `aiMatchTags`. */
  aiMatchTags: string[];
  /** Mobile `priceTier` (`$`–`$$$$$`). */
  priceTier: string;
  /** Mobile `price` string. */
  price: string;
  /** Derived from `affiliateUrl`. */
  viatorProductCode: string;
  /** EXACT Viator affiliate URL — preserved verbatim. */
  affiliateUrl: string;
}

export const NASSAU_MOBILE_EXCURSIONS: readonly NassauMobileExcursionRecord[] = [
  {
    id: 'nassau_swimming_pigs',
    port: 'nassau',
    title: 'Nassau Swimming Pigs: Snorkeling, Lunch & Private Beach Club',
    durationLabel: '4 hours',
    durationMinutes: 240,
    uiTabCategory: 'Nature',
    aiMatchTags: ['Nature & Wildlife', 'Beaches', 'Local Food'],
    priceTier: '$$$',
    price: '$140.00 per person',
    viatorProductCode: 'd420-52556P13',
    affiliateUrl:
      'https://www.viator.com/tours/Nassau/Exclusive-Swimming-Pigs-Speed-Boat-Snorkeling-Beach-Bar-and-Grill-Package/d420-52556P13?pid=P00293644',
  },
  {
    id: 'nassau_pirate_jeep',
    port: 'nassau',
    title: 'Pirate Jeep Sightseeing Adventure',
    durationLabel: '3 hours',
    durationMinutes: 180,
    uiTabCategory: 'Island Tours',
    aiMatchTags: ['Culture & History', 'Instagram Spots'],
    priceTier: '$$$',
    price: '$165.00 per person',
    viatorProductCode: 'd24115-252813P1',
    affiliateUrl:
      'https://www.viator.com/tours/New-Providence-Island/Pirate-Jeep-Tour/d24115-252813P1?pid=P00293644',
  },
  {
    id: 'nassau_atv_tour',
    port: 'nassau',
    title: 'Atv Tour of Nassau + Beach Break (Everyone Drive Their Own Atv)',
    durationLabel: '4 Hours',
    durationMinutes: 240,
    uiTabCategory: 'Adventure',
    aiMatchTags: ['Nature & Wildlife', 'Beaches'],
    priceTier: '$$$',
    price: '$99.00 per person',
    viatorProductCode: 'd420-70706P11',
    affiliateUrl:
      'https://www.viator.com/tours/Nassau/3-Hour-2-passenger-ATV-Tour-of-Nassau-and-Paradise-Island-Inclusive-of-Lunch/d420-70706P11?pid=P00293644',
  },
  {
    id: 'nassau_rum_tasting',
    port: 'nassau',
    title: 'Rum Tasting and Food Walking Tour in Nassau Bahamas',
    durationLabel: '3 Hours',
    durationMinutes: 180,
    uiTabCategory: 'Culture',
    aiMatchTags: ['Local Food', 'Culture & History'],
    priceTier: '$$$',
    price: '$98.00 per person',
    viatorProductCode: 'd420-6558RUM',
    affiliateUrl:
      'https://www.viator.com/tours/Nassau/Nassau-Rum-and-Food-Walking-Tour/d420-6558RUM?pid=P00293644',
  },
  {
    id: 'nassau_bites_walking',
    port: 'nassau',
    title: 'Bites of Nassau Food and Walking Tour',
    durationLabel: '3 Hours',
    durationMinutes: 180,
    uiTabCategory: 'Culture',
    aiMatchTags: ['Local Food', 'Culture & History'],
    priceTier: '$$$',
    price: '$99.00 per person',
    viatorProductCode: 'd420-5887SGBITES',
    affiliateUrl:
      'https://www.viator.com/tours/Nassau/Nassau-Food-Tasting-and-Cultural-Walking-Tour/d420-5887SGBITES?pid=P00293644',
  },
  {
    id: 'nassau_trike_tour',
    port: 'nassau',
    title: 'Nassau Trike Site and Beach Tour',
    durationLabel: '3 Hours',
    durationMinutes: 180,
    uiTabCategory: 'Island Tours',
    aiMatchTags: ['Culture & History', 'Beaches'],
    priceTier: '$$$$',
    price: '$100.00 per person',
    viatorProductCode: 'd24115-429802P2',
    affiliateUrl:
      'https://www.viator.com/tours/New-Providence-Island/Trykes-Sites-and-Local-Island-Bites/d24115-429802P2?pid=P00293644',
  },
  {
    id: 'nassau_segway',
    port: 'nassau',
    title: '3 Hour Smart Eco Segway Adventure in Nassau',
    durationLabel: '3 hours',
    durationMinutes: 180,
    uiTabCategory: 'Island Tours',
    aiMatchTags: ['Nature & Wildlife', 'Culture & History'],
    priceTier: '$$$',
    price: '$99.00 per person',
    viatorProductCode: 'd24115-429802P1',
    affiliateUrl:
      'https://www.viator.com/tours/New-Providence-Island/Bahamas-Eco-glide-Adventures/d24115-429802P1?pid=P00293644',
  },
  {
    id: 'nassau_atv_jetski',
    port: 'nassau',
    title: 'FUN ATV Tour+JetSki Bundle with Beach Break Truly Sensational',
    durationLabel: '4 Hours',
    durationMinutes: 240,
    uiTabCategory: 'Water Sports',
    aiMatchTags: ['Water Sports', 'Adventure', 'Beaches'],
    priceTier: '$$$$$',
    price: '$249.00 per person',
    viatorProductCode: 'd24115-70706P8',
    affiliateUrl:
      'https://www.viator.com/tours/New-Providence-Island/3-Hour-3-passenger-ATV-Tour-of-Nassau-and-Paradise-Island-Inclusive-of-Lunch/d24115-70706P8?pid=P00293644',
  },
  {
    id: 'nassau_jeep_lunch',
    port: 'nassau',
    title: 'Nassau Jeep tour with Full Bahamian Lunch and Drink',
    durationLabel: '3 hours',
    durationMinutes: 180,
    uiTabCategory: 'Island Tours',
    aiMatchTags: ['Local Food', 'Culture & History'],
    priceTier: '$$$$',
    price: '$150.00 per person',
    viatorProductCode: 'd420-6917P11',
    affiliateUrl:
      'https://www.viator.com/tours/Nassau/2-Hour-Jeep-Island-Tour/d420-6917P11?pid=P00293644',
  },
  {
    id: 'nassau_city_tour',
    port: 'nassau',
    title: 'Discover Nassau Bahamas Guided City Tour and Historic Sites',
    durationLabel: '3 Hours',
    durationMinutes: 180,
    uiTabCategory: 'Culture',
    aiMatchTags: ['Culture & History', 'Instagram Spots'],
    priceTier: '$$$$',
    price: '$120.00 per person',
    viatorProductCode: 'd24115-195623P2',
    affiliateUrl:
      'https://www.viator.com/tours/New-Providence-Island/Historical-and-Cultural-Tour/d24115-195623P2?pid=P00293644',
  },
  {
    id: 'nassau_rose_island',
    port: 'nassau',
    title: 'Rose Island Swimming Pigs & Beach Snorkeling Experience Nassau.',
    durationLabel: '3 hours',
    durationMinutes: 180,
    uiTabCategory: 'Water Sports',
    aiMatchTags: ['Nature & Wildlife', 'Beaches', 'Water Sports'],
    priceTier: '$$$',
    price: '$89.00 per person',
    viatorProductCode: 'd24115-5574459P3',
    affiliateUrl:
      'https://www.viator.com/tours/New-Providence-Island/Rose-Island-Swimming-Pigs-and-Beach-Snorkeling-Experience-Nassau/d24115-5574459P3?pid=P00293644',
  },
  {
    id: 'nassau_beach_massage',
    port: 'nassau',
    title: 'Luxury Beach Massage in Nassau Bahamas with Transportation',
    durationLabel: '1 Hour',
    durationMinutes: 60,
    uiTabCategory: 'Nature',
    aiMatchTags: ['Beaches', 'Instagram Spots'],
    priceTier: '$$$$$',
    price: '$265.00 per person',
    viatorProductCode: 'd420-465758P4',
    affiliateUrl:
      'https://www.viator.com/tours/Nassau/Beachfront-Massage-in-Nassau-Bahamas-with-Transportation-1-Hour/d420-465758P4?pid=P00293644',
  },
] as const;
