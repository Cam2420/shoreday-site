import type { Faq } from "./shoreday";
export type Guide = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  keyword: string;
  eyebrow: string;
  intro: string;
  sections: { title: string; paragraphs: string[] }[];
  faq: Faq[];
  related: string[];
  timing?: boolean;
  menu?: boolean;
  app?: boolean;
};
export const GUIDES: Guide[] = [
  {
    slug: "nassau-cruise-app",
    title: "Nassau Cruise App: One WhatsApp Chat | ShoreDay",
    description:
      "Your Nassau cruise app can be a WhatsApp chat. Keep your plan, PDF, voice notes and photo answers together. $9.99 once for your whole group.",
    h1: "Your Nassau cruise app is a WhatsApp chat.",
    keyword: "nassau cruise app",
    eyebrow: "Already booked? Start here.",
    intro:
      "Looking for a Nassau cruise app? No new ShoreDay app is needed for the concierge. Your day lives in WhatsApp: your plan, offline PDF and the questions along the way.",
    sections: [
      {
        title: "What do I get in the chat?",
        paragraphs: [
          "A personal plan, a 17-page offline PDF and answers through your Nassau port day. Everything sits in one conversation.",
          "Send your ship, Nassau date and all-aboard time. Add your group, children’s ages, budget and preferred pace.",
          "Ask to change the plan when your day changes. Want a beach after lunch? Ask whether it fits before your leave-by time.",
        ],
      },
      {
        title: "Can I talk instead of typing?",
        paragraphs: [
          "Yes. Send a voice note, and ShoreDay replies in voice when you speak first or ask.",
          "You can also send photos, short videos and PDFs. Ask about a menu, a recognizable landmark or your excursion confirmation.",
          "Write in Spanish if you prefer. The assistant can answer in Spanish.",
        ],
      },
      {
        title: "What works without internet?",
        paragraphs: [
          "Your saved plan, downloaded PDF and downloaded voice notes remain available offline. New questions and replies need internet.",
          "Open the PDF and play voice notes once while connected. Check your phone plan’s Bahamas coverage before you sail.",
        ],
      },
      {
        title: "Is there a separate ShoreDay app?",
        paragraphs: [
          "Yes. The purchaser also receives ShoreDay app premium on iOS and Android. It is a bonus alongside the WhatsApp concierge.",
          "Your chat plan does not automatically transfer into the app. You can use the concierge without installing the separate app.",
        ],
      },
      {
        title: "What happens after my port day?",
        paragraphs: [
          "The chat stays on your phone unless you delete it. Included help runs through the end of your Nassau port day.",
          "The concierge engine does not store media. Your messages and media are processed to answer your questions; see the Privacy Policy.",
          "Coming back to Nassau? Open the same chat. Each new port call is a separate $9.99 for your group.",
        ],
      },
    ],
    faq: [
      {
        q: "Do I need a new account?",
        a: "No separate ShoreDay account or password is needed for the concierge. You need WhatsApp, which is free to download.",
      },
      {
        q: "Is the Nassau concierge a person?",
        a: "Both an automated assistant and a person. Type HUMAN to reach the founder, available daily 12–5 PM ET.",
      },
      {
        q: "Does the $9.99 cover everyone?",
        a: "It covers one group using one WhatsApp number for one Nassau port call. Food, rides and tours cost extra.",
      },
      {
        q: "Does WhatsApp send automatic head-back reminders?",
        a: "No. Ask for two alarm times to set yourself. The concierge does not set alarms or send automatic reminders.",
      },
    ],
    related: [
      "nassau-all-aboard-time",
      "nassau-cruise-with-kids",
      "nassau-cash-or-card",
    ],
    app: true,
  },
  {
    slug: "nassau-cruise-port-walking-distance",
    title: "Things to Do Near Nassau Cruise Port Walking Distance",
    description:
      "Plan a walk from Nassau cruise port around your group, a food or heritage stop and your return time. $9.99 once for your whole group.",
    h1: "Things to do near Nassau cruise port, within walking distance.",
    keyword: "things to do near nassau cruise port walking distance",
    eyebrow: "A day on foot, at your pace",
    intro:
      "For things to do near Nassau cruise port within walking distance, start with a downtown loop, local food or heritage. Decide how much walking your group wants before choosing stops.",
    sections: [
      {
        title: "Can you walk around Nassau from the cruise port?",
        paragraphs: [
          "A walkable downtown loop is one ShoreDay day shape. Ask for a route that fits your group and time ashore.",
          "Include the walk from your ship to the port exit when planning. Don’t treat a map’s first landmark as your starting point.",
          "Ask ShoreDay for Google Maps directions to a place. Confirm the route and allow time to get back to the pier.",
        ],
      },
      {
        title: "What should I put in a short walking plan?",
        paragraphs: [
          "Choose one focus: local food, heritage or an easy downtown loop. Add another stop only if your return window allows it.",
          "If you want beach time, ask whether it fits your walking preferences and all-aboard time. A day shape is a starting point, not a fixed itinerary.",
        ],
      },
      {
        title: "Walking off the ship with a plan",
        paragraphs: [
          "A plan helps you choose among offers with confidence. “No thanks, we’re all set” is easier when you know your next stop.",
          "See an interesting offer? Send the price board and ask whether it fits your day and budget.",
          "Bahamian food and local businesses can be part of your day. Agree any taxi fare before the ride.",
        ],
      },
      {
        title: "What about free things to do near the port?",
        paragraphs: [
          "Tell ShoreDay you want a walk with no paid attraction stops. Confirm admission charges before committing to any venue.",
          "Food, rides and tours are separate from the concierge price. Ask about costs in the chat rather than assuming a stop is free.",
        ],
      },
      {
        title: "How do I know when to turn back?",
        paragraphs: [
          "Use your leave-by time, worked backward from your back-at-pier target. Your ship’s official all-aboard time is final.",
          "Ask for your exact time left when connected. Save the plan and offline kit before leaving ship Wi-Fi.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I plan a day without a taxi?",
        a: "Ask for the walkable downtown day shape and share your walking preferences. Check the return route before adding another stop.",
      },
      {
        q: "Are walking times the same for every group?",
        a: "Build around your own group’s pace. Tell ShoreDay about children, a stroller, planned breaks and how much walking you want.",
      },
      {
        q: "Do I need a tour to use ShoreDay?",
        a: "No. Tours are optional and paid separately. ShoreDay is independent planning guidance.",
      },
    ],
    related: [
      "nassau-all-aboard-time",
      "nassau-cruise-with-kids",
      "nassau-cash-or-card",
    ],
  },
  {
    slug: "nassau-all-aboard-time",
    title: "What Time Do I Need to Be Back on the Ship in Nassau?",
    description:
      "Understand Nassau all-aboard, back-at-pier and leave-by times. Work backward from your ship’s own deadline. $9.99 once for your whole group.",
    h1: "What time do I need to be back on the ship in Nassau?",
    keyword: "what time do I need to be back on the ship in nassau",
    eyebrow: "The time that shapes your whole day",
    intro:
      "Be back on the ship by your ship’s official all-aboard time. In Nassau, plan an earlier back-at-pier target, then work backward to when you must leave your last stop.",
    sections: [
      {
        title: "Is all-aboard the same as departure?",
        paragraphs: [
          "No. All-aboard is the passenger deadline; departure is when the ship is scheduled to leave. Use the all-aboard time your ship gives you.",
          "Never substitute another ship’s time or a generic itinerary. Onboard instructions take priority over your ShoreDay plan.",
        ],
      },
      {
        title: "How does the backward timing work?",
        paragraphs: [
          "Subtract a return buffer from all-aboard to set your back-at-pier target. Then subtract your trip back to find leave-by.",
          "In the example below, a 7:00 PM all-aboard becomes a 6:00 PM pier target and a 5:30 PM leave-by.",
          "The 60-minute buffer and 30-minute ride are illustrative allowances. Use the route, conditions and instructions for your own day.",
        ],
      },
      {
        title: "Why shouldn’t I copy another ship’s schedule?",
        paragraphs: [
          "Nassau departure times vary. Your ship’s own all-aboard time decides your usable window ashore.",
          "Cam’s October 2026 port-schedule summary includes morning docking around 5:45–9:30 AM and departures as early as 2:30–3:00 PM.",
          "That summary includes many Carnival departures at 4:00 PM and most Royal Caribbean departures at 5:30 PM. Those are departure patterns, not your all-aboard deadline.",
        ],
      },
      {
        title: "Can ShoreDay tell me exactly how much time is left?",
        paragraphs: [
          "Yes. Ask “how much time do I have?” for your leave-by time, pier target and exact countdown.",
          "The timing engine calculates the clock difference. It still depends on the correct all-aboard time you provide.",
          "For a 5:30 PM leave-by, the time remaining at 11:36 AM is 5 hours and 54 minutes. This is an example.",
        ],
      },
      {
        title: "Will I get an automatic reminder?",
        paragraphs: [
          "No. The WhatsApp concierge does not send automatic reminders or set alarms. Ask for two alarm times to set yourself.",
          "Save your plan before going offline. If your ship’s times change, follow onboard instructions and send the new time when connected.",
        ],
      },
    ],
    faq: [
      {
        q: "Is back-at-pier the same as all-aboard?",
        a: "No. Your pier target is earlier, allowing a buffer before the deadline to be back on the ship.",
      },
      {
        q: "Can I use the departure time from a port schedule?",
        a: "Use your ship’s official all-aboard time instead. Published departure times do not replace onboard instructions.",
      },
      {
        q: "What if we add a beach or stop for food?",
        a: "Ask whether the extra stop fits before leave-by. Include the trip back and your return buffer.",
      },
      {
        q: "Do I need internet to see my return time?",
        a: "Your saved plan and downloaded PDF remain readable offline. A new countdown question needs an internet connection.",
      },
    ],
    related: [
      "nassau-cruise-port-walking-distance",
      "nassau-cruise-with-kids",
      "nassau-cruise-app",
    ],
    timing: true,
  },
  {
    slug: "nassau-cruise-with-kids",
    title: "Nassau Cruise Port With Kids | ShoreDay",
    description:
      "Build a Nassau cruise port day around your kids’ ages, walking preferences and ship’s return time. $9.99 once for your whole group.",
    h1: "Nassau cruise port with kids: plan for your family’s pace.",
    keyword: "nassau cruise port with kids",
    eyebrow: "Less rushing. More room for your family.",
    intro:
      "Planning Nassau cruise port with kids starts with their ages, your walking preferences and the ship’s all-aboard time. Choose one realistic day shape and leave room for breaks.",
    sections: [
      {
        title: "What kind of day should we choose?",
        paragraphs: [
          "Start with beach and water, a downtown walk, local food or heritage. Tell ShoreDay what your children enjoy and what you’d rather skip.",
          "A shorter plan can be the right plan. Ask to leave space for a meal, a change of pace and the return trip.",
        ],
      },
      {
        title: "What should I tell ShoreDay about my family?",
        paragraphs: [
          "Share children’s ages, your budget, stroller needs and how much walking you want. An adult uses the concierge for the group.",
          "Add your ship, Nassau date and all-aboard time. Mention anything that might make a long outing difficult.",
        ],
      },
      {
        title: "Can we plan around a stroller and short walks?",
        paragraphs: [
          "Yes. Describe your stroller and walking preferences when you ask for a plan. Confirm access with any venue before committing.",
          "Ask for breaks and a simpler route. A recommended day shape is not a promise about step-free access or suitability.",
        ],
      },
      {
        title: "What if the kids want to change the plan?",
        paragraphs: [
          "Ask in the same chat whether a change fits your remaining time. Keep your leave-by time as the limit.",
          "Hands full? Send a voice note. ShoreDay replies in voice when you speak first or ask for it.",
        ],
      },
      {
        title: "What if we have no data ashore?",
        paragraphs: [
          "Save your plan and download the PDF before stepping off. Play voice notes once on Wi-Fi to replay downloaded notes offline.",
          "New questions need internet. Keep your back-to-ship backup card available on your phone.",
        ],
      },
    ],
    faq: [
      {
        q: "Is the $9.99 price per child or per person?",
        a: "Neither. It covers one group, one WhatsApp number and one Nassau port call. Food, rides and tours are extra.",
      },
      {
        q: "Can my child message ShoreDay directly?",
        a: "A parent or adult should use the service to plan for the family. The site’s Privacy Policy says the service is not marketed to under-18s.",
      },
      {
        q: "Can we ask for a shorter Nassau day?",
        a: "Yes. Share your preferred pace, children’s ages and all-aboard time. Ask for one main activity with room for breaks.",
      },
      {
        q: "Does a plan confirm an activity’s age rules?",
        a: "No. Confirm age rules, access and any relevant requirements with the venue or operator before booking.",
      },
    ],
    related: [
      "nassau-all-aboard-time",
      "nassau-cruise-port-walking-distance",
      "nassau-cruise-app",
    ],
  },
  {
    slug: "is-nassau-worth-getting-off-the-ship",
    title: "Is It Worth Getting Off the Ship in Nassau? | ShoreDay",
    description:
      "First Nassau visit or repeat cruise? Choose a short day for your interests, group and ship’s clock. $9.99 once for your whole group.",
    h1: "Is it worth getting off the ship in Nassau?",
    keyword: "is it worth getting off the ship in nassau",
    eyebrow: "Make the port day yours",
    intro:
      "It can be worth getting off the ship in Nassau when one thing appeals to you and fits your time. Staying aboard is also a valid choice. Start with what your group wants.",
    sections: [
      {
        title: "What makes a first Nassau visit worthwhile?",
        paragraphs: [
          "Choose a day you actually want: beach time, a walkable downtown loop, local food or heritage. You don’t need a packed checklist.",
          "Work backward from all-aboard before adding stops. Decide what feels worth your time and budget.",
        ],
      },
      {
        title: "You’ve been to Nassau. You haven’t done Nassau with ShoreDay.",
        paragraphs: [
          "A repeat visit can fit a different ship’s clock and a different mood. Choose local food or a beach or heritage stop you skipped.",
          "Ask about a menu photo. Use voice notes while walking. Rework the day in the chat when you’re connected.",
          "There is no promise of secret places or special access. The value is fitting this visit to your group.",
        ],
      },
      {
        title: "When might staying aboard suit you better?",
        paragraphs: [
          "Stay aboard if that is the day you want. You don’t need to buy a plan to justify a port stop.",
          "If you’re undecided, consider a shorter outing with one focus. Compare it with how you’d prefer to spend those hours aboard.",
        ],
      },
      {
        title: "Why pay for a plan when generic itineraries are free?",
        paragraphs: [
          "ShoreDay adds your ship’s clock, group’s preferences and a place to ask follow-up questions. The plan stays with your PDF and chat history.",
          "Ask about a price board, send a voice note or check your exact time left. The offline kit is there when you disconnect.",
          "The $9.99 covers your group’s planning help. It does not buy transport, meals, admission or a tour.",
        ],
      },
    ],
    faq: [
      {
        q: "Do I have to book an excursion in Nassau?",
        a: "No. ShoreDay offers independent planning guidance. Tours are optional, paid separately and may generate an affiliate commission.",
      },
      {
        q: "Is ShoreDay useful if I’ve visited Nassau before?",
        a: "Yes, if you want a day fitted to this visit’s clock, group and interests. Each Nassau port call is a separate $9.99 purchase.",
      },
      {
        q: "Can I ask questions before paying?",
        a: "Yes. It is free to message first and learn how the service works.",
      },
    ],
    related: [
      "nassau-cruise-port-walking-distance",
      "nassau-cash-or-card",
      "nassau-all-aboard-time",
    ],
  },
  {
    slug: "nassau-cash-or-card",
    title: "How Much Cash Do I Need in Nassau? | ShoreDay",
    description:
      "Plan Nassau spending around food, rides and tours. Ask about payment, extra charges and menu photos. $9.99 once for your whole group.",
    h1: "How much cash do I need in Nassau?",
    keyword: "how much cash do I need in nassau",
    eyebrow: "Know your day. Plan your spending.",
    intro:
      "How much cash you need in Nassau depends on your food, rides and activities. Build the day first, then confirm which places accept cards and which costs need cash.",
    sections: [
      {
        title: "Should I use cash or a card?",
        paragraphs: [
          "Confirm payment methods with the places in your plan. Don’t assume every food stand, taxi or activity accepts your preferred card.",
          "Ask about small bills when planning cash purchases. Decide your amount from your own day rather than a blanket per-person estimate.",
        ],
      },
      {
        title: "What should I include in my budget?",
        paragraphs: [
          "Include food, rides and any optional tours or admission. These are separate from ShoreDay’s $9.99 group planning price.",
          "Ask whether a quoted amount includes extra charges. Read the price board before ordering or agreeing to a ride.",
        ],
      },
      {
        title: "Can ShoreDay help read a menu photo?",
        paragraphs: [
          "Yes. Send a clear photo and ask what it says. ShoreDay can read printed prices and point out extra charges.",
          "In Cam’s October 2026 Goldie’s example below, the assistant noticed the VAT and gratuity banner. This is a dated example, not a current menu quote.",
          "Always confirm the current bill and prices with the business.",
        ],
      },
      {
        title: "Walk off the ship with a plan for offers",
        paragraphs: [
          "A budget and a leave-by time help you decide which offers fit. You can politely decline when you already have a plan.",
          "Snap a price board and ask about it in the chat. For a taxi, agree the fare before getting in.",
          "Local food and vendors can be part of a good day. Keep your choices tied to your group’s preferences and return time.",
        ],
      },
      {
        title: "Can I ask for a nearby ATM?",
        paragraphs: [
          "Yes. Ask ShoreDay for an ATM and a Google Maps link. Check directions, hours and reviews, then confirm when you arrive.",
          "New location questions need internet. Save the plan and downloaded PDF before disconnecting.",
        ],
      },
    ],
    faq: [
      {
        q: "Does the $9.99 include food or taxis?",
        a: "No. It covers planning help and the offline kit for your group’s Nassau port call. Food, rides and tours cost extra.",
      },
      {
        q: "Are VAT and gratuity always included in menu prices?",
        a: "Check the menu and confirm with the business. The supplied Goldie’s example shows additional charges; it is not a rule for every venue.",
      },
      {
        q: "Can I send a photo of a price board before buying?",
        a: "Yes. Send a clear photo while connected and ask about the printed prices or whether the offer fits your day.",
      },
      {
        q: "Can ShoreDay quote my bank’s fees?",
        a: "Confirm card and ATM fees with your bank and the provider. Don’t treat a planning reply as your bank’s current fee schedule.",
      },
    ],
    related: [
      "nassau-cruise-port-walking-distance",
      "nassau-all-aboard-time",
      "nassau-cruise-app",
    ],
    menu: true,
  },
];
export const guideBySlug = (slug: string) =>
  GUIDES.find((g) => g.slug === slug);
