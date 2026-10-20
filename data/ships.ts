import type { Guide } from "./guides";
export type ShipGuide = Guide & {
  ship: string;
  line: string;
  sourceUrl: string;
  sourceLabel: string;
  sourceNote: string;
};
export const SHIP_GUIDES: ShipGuide[] = [
  {
    ship: "Wonder of the Seas",
    line: "Royal Caribbean",
    slug: "wonder-of-the-seas-nassau",
    title: "Wonder of the Seas Nassau Itinerary | ShoreDay",
    description:
      "Plan your Wonder of the Seas Nassau itinerary around your ship’s all-aboard time, group and budget. $15 once for your whole group.",
    keyword: "wonder of the seas nassau itinerary",
    h1: "Your Wonder of the Seas Nassau itinerary, at your pace.",
    eyebrow: "For Wonder of the Seas passengers",
    intro:
      "Build your Wonder of the Seas Nassau itinerary from the all-aboard time for your sailing. Share your Nassau date, group and interests, then choose a day that fits.",
    sourceUrl:
      "https://www.royalcaribbean.com/cruises?country=USA&search=ship%3AWN&shipCode_WN=true",
    sourceLabel: "Royal Caribbean’s Wonder of the Seas itineraries",
    sourceNote:
      "Royal Caribbean lists short round trips from Miami that pair Nassau with Perfect Day at CocoCay. Itineraries vary by sailing.",
    sections: [
      {
        title: "How should Nassau fit beside your CocoCay day?",
        paragraphs: [
          "If your booking includes CocoCay, decide whether Nassau should feel different. Local food or a heritage stop may suit you better than another beach-focused day.",
          "Royal Caribbean’s published Wonder itineraries include Nassau and CocoCay on short Miami sailings. Check the order in your own booking before choosing Nassau activities.",
          "ShoreDay plans Nassau only. It does not plan your CocoCay visit.",
        ],
      },
      {
        title: "Which Wonder of the Seas time should I send?",
        paragraphs: [
          "Send the all-aboard time your ship gives you for your Nassau date. A published departure time is a different deadline.",
          "Don’t carry a CocoCay return time over to Nassau. Give ShoreDay the date and all-aboard time for this specific port call.",
          "Your assigned berth and route ashore can vary. Ask onboard for your pier and follow the ship’s instructions.",
        ],
      },
      {
        title: "A Nassau day that complements this sailing",
        paragraphs: [
          "Choose local food and heritage if your group wants a change from beach time. Choose beach and water if that is what you enjoy.",
          "Share whether you want a shorter outing or more time ashore. The plan works backward from all-aboard and includes a leave-by time.",
          "Send a menu photo while connected. Or ask for a voice reply when you’d rather talk than type.",
        ],
      },
    ],
    faq: [
      {
        q: "Is ShoreDay included with my Royal Caribbean cruise?",
        a: "No. ShoreDay is an independent $15 planning service for your group and is not affiliated with Royal Caribbean.",
      },
      {
        q: "Does every Wonder Nassau call have the same all-aboard time?",
        a: "Use your own sailing’s onboard instructions. Don’t infer all-aboard from a different date or a published departure time.",
      },
      {
        q: "Can ShoreDay plan CocoCay too?",
        a: "No. This service covers one Nassau port call. Your separate island day is outside that scope.",
      },
    ],
    related: [
      "nassau-all-aboard-time",
      "is-nassau-worth-getting-off-the-ship",
      "nassau-cash-or-card",
    ],
  },
  {
    ship: "Disney Wish",
    line: "Disney Cruise Line",
    slug: "disney-wish-nassau",
    title: "Disney Wish Nassau Itinerary | ShoreDay",
    description:
      "Plan your Disney Wish Nassau itinerary with children’s ages, walking preferences and return time in mind. $15 once for your whole group.",
    keyword: "disney wish nassau itinerary",
    h1: "Your Disney Wish Nassau itinerary, built for your group.",
    eyebrow: "For Disney Wish passengers",
    intro:
      "Start your Disney Wish Nassau itinerary with your family’s pace and the ship’s all-aboard time. Share children’s ages, stroller needs and your preferred amount of walking.",
    sourceUrl:
      "https://disneycruise.disney.go.com/en-gb/featured/3-vacations-in-1/",
    sourceLabel: "Disney Cruise Line’s Disney Wish sailings",
    sourceNote:
      "Disney describes three- and four-night Wish sailings from Port Canaveral, visiting Nassau and Castaway Cay on most sailings.",
    sections: [
      {
        title: "Should we do another beach day in Nassau?",
        paragraphs: [
          "If Castaway Cay is on your booking, decide whether you want another beach or a different Nassau day. Either choice can work for your group.",
          "Disney describes Nassau and Castaway Cay on most three- and four-night Wish sailings from Port Canaveral. Your own booking controls which ports you visit.",
          "A local-food or heritage focus offers a different day shape. ShoreDay’s planning help covers Nassau, not Castaway Cay.",
        ],
      },
      {
        title: "How can we leave room for younger children?",
        paragraphs: [
          "Ask for one main activity with room for breaks. Tell ShoreDay your children’s ages and how much walking you want.",
          "For a stroller, ask venues about access before committing. A plan is not confirmation that every stop is step-free.",
          "An adult uses the chat for the group. You can send a voice note when your hands are full.",
        ],
      },
      {
        title: "Which time matters on Disney Wish?",
        paragraphs: [
          "Use the Nassau all-aboard time from your ship’s instructions. Share it with ShoreDay alongside your Nassau date.",
          "Pick a back-at-pier target first, then subtract the return trip to find leave-by. Don’t use your Castaway Cay schedule for Nassau.",
          "Save your plan and download the PDF while connected. New questions ashore need internet.",
        ],
      },
    ],
    faq: [
      {
        q: "Is this a Disney Port Adventure?",
        a: "No. ShoreDay is independent planning guidance and is not affiliated with Disney Cruise Line. Tours are optional and paid separately.",
      },
      {
        q: "Can we plan for children of different ages?",
        a: "Share each child’s age, your budget, stroller needs and walking preferences. A parent or adult plans through one WhatsApp number.",
      },
      {
        q: "Can we leave Nassau early and return to the ship?",
        a: "Ask for a shorter outing based on the day you want. Follow your ship’s access and all-aboard instructions.",
      },
    ],
    related: [
      "nassau-cruise-with-kids",
      "nassau-all-aboard-time",
      "nassau-cruise-port-walking-distance",
    ],
  },
  {
    ship: "MSC Seaside",
    line: "MSC Cruises",
    slug: "msc-seaside-nassau",
    title: "MSC Seaside Nassau Itinerary | ShoreDay",
    description:
      "Shape your MSC Seaside Nassau itinerary around local food, a walk or a beach and your ship’s return time. $15 once for your whole group.",
    keyword: "msc seaside nassau itinerary",
    h1: "Your MSC Seaside Nassau itinerary, in one chat.",
    eyebrow: "For MSC Seaside passengers",
    intro:
      "Build your MSC Seaside Nassau itinerary from the ship’s all-aboard time, your budget and what you enjoy. Keep your Nassau plan separate from any Ocean Cay day on your booking.",
    sourceUrl: "https://www.msccruisesusa.com/cruise/weekend-cruises",
    sourceLabel: "MSC Cruises’ short cruise options",
    sourceNote:
      "MSC lists Seaside among its short-cruise ships sailing from Miami. Check your booking for Nassau and any Ocean Cay stop.",
    sections: [
      {
        title: "How is Nassau different from an Ocean Cay stop?",
        paragraphs: [
          "Treat Nassau as its own port day with its own return deadline. If Ocean Cay is on your booking, use Nassau for the day shape you prefer.",
          "MSC lists Seaside among its short-cruise options from Miami. Routes and port order depend on the sailing you booked.",
          "Choose local food, heritage, a downtown loop or beach time. ShoreDay covers Nassau only, not Ocean Cay.",
        ],
      },
      {
        title: "What should we send before our Seaside visit?",
        paragraphs: [
          "Send your Nassau date and the all-aboard time supplied by your ship. Include your group, budget and walking preferences.",
          "If your booking changes, send the updated Nassau details. A departure time on a general itinerary is not your all-aboard time.",
          "Your berth is not assumed. Follow your ship’s instructions for leaving and returning to the pier.",
        ],
      },
      {
        title: "How do we keep the whole day together?",
        paragraphs: [
          "Use one WhatsApp conversation for the plan, offline kit and questions. Ask about a menu or nearby place when connected.",
          "Prefer Spanish? Write in Spanish. Prefer speaking? Send a voice note or ask ShoreDay to reply in voice.",
          "Download the PDF and play voice notes once while connected. Keep the chat to look back after your visit.",
        ],
      },
    ],
    faq: [
      {
        q: "Is ShoreDay an MSC service?",
        a: "No. It is independent and is not affiliated with MSC Cruises or Nassau Cruise Port.",
      },
      {
        q: "Does the price include everyone in our cabin?",
        a: "The $15 covers your planning group using one WhatsApp number for one Nassau port call. It is not a per-person price.",
      },
      {
        q: "Can I use the Nassau plan on Ocean Cay?",
        a: "No. The plan and return timing are specific to Nassau. Use the ship’s separate instructions for Ocean Cay.",
      },
    ],
    related: [
      "nassau-all-aboard-time",
      "nassau-cash-or-card",
      "nassau-cruise-app",
    ],
  },
];
