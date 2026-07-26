"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";
import type { FunnelEventProperties } from "@/lib/funnel-events";
import ChoiceCard from "@/components/funnel/ChoiceCard";
import EmailGateCard from "@/components/funnel/EmailGateCard";
import FunnelProgress from "@/components/funnel/FunnelProgress";
import FunnelStepShell from "@/components/funnel/FunnelStepShell";
import ItineraryTimeline from "@/components/funnel/ItineraryTimeline";
import PoweredByAiBadge from "@/components/funnel/PoweredByAiBadge";
import TimeInput from "@/components/funnel/TimeInput";
import ViatorOutboundLink from "@/components/funnel/ViatorOutboundLink";
import ShoreDayWordmark from "@/components/brand/ShoreDayWordmark";
import { NASSAU_PORT_CONFIG } from "@/data/ports/nassau";
import {
  NASSAU_MOBILE_EXCURSIONS,
  type NassauMobileExcursionRecord,
} from "@/data/excursions/nassau";
import {
  buildPartialResultView,
  formatDurationLabel,
  FUNNEL_STEP_TITLES,
  INDEPENDENCE_OPTIONS,
  initialFormState,
  isStepComplete,
  MODE_INTRO,
  validateBasicsStep,
  type BasicsError,
  type ChoiceOption,
  type FunnelStepId,
  type PlanFormState,
  type PlannerMode,
} from "@/lib/funnel-plan";
import { buildNassauWebItinerary } from "@/lib/nassau-web-itinerary";
import { emailFieldSchema } from "@/lib/funnel-validation";
import { validatePortMathInput } from "@/lib/funnel-validation";
import { computePortMath } from "@/lib/port-math";
import type {
  BudgetPreference,
  Interest,
  PortMathResult,
  TravelerGroup,
} from "@/types/funnel";

// ShoreDay's OWN paid Etsy product — NOT an affiliate link, so `rel` is
// deliberately "noopener noreferrer" WITHOUT "sponsored", and it carries no
// affiliate disclosure (unlike the Viator links).
const ETSY_PLAYBOOK_URL =
  "https://www.etsy.com/listing/4540468636/nassau-cruise-port-day-planner-pdf";
const APP_STORE_URL = "https://apps.apple.com/app/id6761083487";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.vmamanagement.shoreday";
const APPLE_BADGE = "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg";
const PLAY_BADGE = "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg";

type PlanningStatus = "booked_times" | "booked_no_times" | "still_deciding";
type GroupChoice = "couple" | "family_kids" | "friends" | "solo" | "multigenerational";
type AvoidConcern =
  | "wasting_day"
  | "overpaying"
  | "vendors"
  | "return_timing"
  | "wrong_activity";
type PacePreference = "low_stress" | "balanced" | "packed_realistic" | "safest_easiest";
type BudgetChoice = "free_cheap" | "under_100" | "mid_200" | "premium_ease";
type TimingChoice = "exact" | "starter" | "research";
type PlannerStepId = FunnelStepId | "planning_status" | "avoid" | "pace" | "timing_choice";

const PLANNING_STATUS_OPTIONS: Array<{
  value: PlanningStatus;
  label: string;
  description: string;
}> = [
  {
    value: "booked_times",
    label: "Booked + I know my times",
    description: "Use my official details.",
  },
  {
    value: "booked_no_times",
    label: "Booked, but times aren’t handy",
    description: "Start with a useful plan.",
  },
  {
    value: "still_deciding",
    label: "Still deciding",
    description: "Research Nassau first.",
  },
];

const AVOID_OPTIONS: Array<{ value: AvoidConcern; label: string; description: string }> = [
  {
    value: "wasting_day",
    label: "Wasting the port day",
    description: "Make getting off worth it.",
  },
  {
    value: "overpaying",
    label: "Getting ripped off",
    description: "Avoid markup and surprises.",
  },
  {
    value: "vendors",
    label: "Vendor pressure near the pier",
    description: "Keep the pier calmer.",
  },
  {
    value: "return_timing",
    label: "Missing the ship",
    description: "Keep return timing conservative.",
  },
  {
    value: "wrong_activity",
    label: "Picking the wrong activity",
    description: "Fit my actual group.",
  },
];

const QUIZ_GROUP_OPTIONS: Array<{
  value: GroupChoice;
  partyType: TravelerGroup;
  label: string;
  description: string;
}> = [
  {
    value: "couple",
    partyType: "couple",
    label: "Couple",
    description: "Easy for two.",
  },
  {
    value: "family_kids",
    partyType: "family",
    label: "Family with kids",
    description: "Kid-friendly, fewer surprises.",
  },
  {
    value: "friends",
    partyType: "friends",
    label: "Friends",
    description: "Different opinions, one plan.",
  },
  {
    value: "solo",
    partyType: "solo",
    label: "Solo",
    description: "Clear and low-friction.",
  },
  {
    value: "multigenerational",
    partyType: "family",
    label: "Multi-generational group",
    description: "Slower pace, more buffer.",
  },
];

const QUIZ_INTEREST_OPTIONS: ChoiceOption<Interest>[] = [
  { value: "beach", label: "Beach and easy water time", description: "Sun, water, clear return." },
  { value: "local_food", label: "Local food and culture", description: "Taste Nassau without wandering." },
  { value: "history", label: "History and walking", description: "Forts, downtown, simple route." },
  { value: "family_easy", label: "Family-safe contained activity", description: "Less chaos, fewer moves." },
  { value: "budget", label: "Cheap/free exploring", description: "Spend carefully." },
  { value: "easy_logistics", label: "Best reviewed excursion", description: "A vetted paid option." },
];

const PACE_OPTIONS: Array<{ value: PacePreference; label: string; description: string }> = [
  {
    value: "low_stress",
    label: "Low-stress and close to port",
    description: "Calm logistics first.",
  },
  {
    value: "balanced",
    label: "Balanced: one main thing + buffer",
    description: "One anchor, room to breathe.",
  },
  {
    value: "packed_realistic",
    label: "Packed but realistic",
    description: "Do more, respect the clock.",
  },
  {
    value: "safest_easiest",
    label: "I only want the safest/easiest plan",
    description: "Make it obvious.",
  },
];

const QUIZ_BUDGET_OPTIONS: Array<{
  value: BudgetChoice;
  budgetPreference: BudgetPreference;
  label: string;
  description: string;
}> = [
  {
    value: "free_cheap",
    budgetPreference: "low",
    label: "Free or very cheap",
    description: "Keep it lean.",
  },
  {
    value: "under_100",
    budgetPreference: "low",
    label: "Under $100 per person",
    description: "Low spend, clear choice.",
  },
  {
    value: "mid_200",
    budgetPreference: "mid",
    label: "$100-$200 per person",
    description: "Comfortable if it fits.",
  },
  {
    value: "premium_ease",
    budgetPreference: "premium",
    label: "Premium if it removes stress",
    description: "Worth it for easier logistics.",
  },
];

const TIMING_CHOICE_OPTIONS: Array<{ value: TimingChoice; label: string; description: string }> = [
  {
    value: "exact",
    label: "Yes, calculate my recommended return target",
    description: "I can add official times now.",
  },
  {
    value: "starter",
    label: "Not right now, show me a starter plan",
    description: "I’ll add ship times later.",
  },
  {
    value: "research",
    label: "I’m not booked yet, show me what usually fits",
    description: "Show me what to aim for.",
  },
];

const MODE_STEP_IDS: Record<PlannerMode, PlannerStepId[]> = {
  default: ["planning_status", "group", "avoid", "interests", "pace", "budget", "timing_choice"],
  times: ["basics", "group", "interests", "budget", "independence"],
  fast: ["planning_status", "group", "avoid", "interests", "pace", "budget", "timing_choice"],
};

const MODE_PAGE_COPY: Record<PlannerMode, { kicker: string; title: string; body: string }> = {
  default: {
    kicker: "Nassau port day planner",
    title: "Build the Nassau day that actually fits your ship time",
    body: "Most cruisers plan around the brochure. ShoreDay plans around your real port window, group, budget, and all-aboard buffer.",
  },
  times: {
    kicker: "Time-first path",
    title: "Enter your cruise details",
    body: "Use this path when you already know your step-off and all-aboard time.",
  },
  fast: {
    kicker: "Nassau port day planner",
    title: "Build the Nassau day that actually fits your ship time",
    body: "Most cruisers plan around the brochure. ShoreDay plans around your real port window, group, budget, and all-aboard buffer.",
  },
};

const MODE_STEP_TITLES: Record<PlannerMode, Partial<Record<PlannerStepId, string>>> = {
  default: {
    planning_status: "Where are you in planning?",
    group: "Who are you bringing?",
    avoid: "What worries you most about Nassau?",
    interests: "What kind of Nassau day do you want?",
    pace: "What pace feels right?",
    budget: "What budget feels comfortable?",
    timing_choice: "Do you know your ship times?",
  },
  times: {
    basics: "What times did your ship give you?",
    group: "Who needs this timing plan?",
    interests: "What sounds worth your limited time?",
    budget: "What spend level feels comfortable?",
    independence: "How guided should the day feel?",
  },
  fast: {
    planning_status: "Where are you in planning?",
    group: "Who are you bringing?",
    avoid: "What worries you most about Nassau?",
    interests: "What kind of Nassau day do you want?",
    pace: "What pace feels right?",
    budget: "What budget feels comfortable?",
    timing_choice: "Do you know your ship times?",
  },
};

function isFunnelStepId(step: PlannerStepId): step is FunnelStepId {
  return (
    step === "basics" ||
    step === "group" ||
    step === "interests" ||
    step === "budget" ||
    step === "independence"
  );
}

// Respect prefers-reduced-motion for programmatic scrolling: skip the smooth
// animation for users who asked to reduce motion. (This slice adds no visual
// motion — it only makes existing JS scrolling honour the preference.)
function reducedMotionScrollBehavior(): ScrollBehavior {
  if (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return "auto";
  }
  return "smooth";
}

/** Marketing attribution captured from the planner URL (present values only). */
type UtmParams = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
};

/** Read utm_* params from the current URL, keeping only non-empty, trimmed values. */
function readUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};
  const q = new URLSearchParams(window.location.search);
  const pick = (key: string) => {
    const trimmed = q.get(key)?.trim();
    return trimmed ? trimmed : undefined;
  };
  return {
    utmSource: pick("utm_source"),
    utmMedium: pick("utm_medium"),
    utmCampaign: pick("utm_campaign"),
    utmContent: pick("utm_content"),
    utmTerm: pick("utm_term"),
  };
}

/** Map captured utm_* values to canonical Mixpanel event properties (present-only). */
function utmEventProps(utm: UtmParams): FunnelEventProperties {
  const props: FunnelEventProperties = {};
  if (utm.utmSource) props.utm_source = utm.utmSource;
  if (utm.utmMedium) props.utm_medium = utm.utmMedium;
  if (utm.utmCampaign) props.utm_campaign = utm.utmCampaign;
  if (utm.utmContent) props.utm_content = utm.utmContent;
  if (utm.utmTerm) props.utm_term = utm.utmTerm;
  return props;
}

/**
 * Hostname-only referrer (e.g. "www.tiktok.com") for the landing impression —
 * never the full referrer URL. Returns undefined when there is no referrer or it
 * cannot be parsed. Privacy-safe: hostname carries the source, not any user data.
 */
function referrerHost(): string | undefined {
  try {
    if (typeof document === "undefined" || !document.referrer) return undefined;
    return new URL(document.referrer).hostname || undefined;
  } catch {
    return undefined;
  }
}

export default function PlanBuilder({
  initialMode = "default",
  kitConfigured = false,
}: {
  initialMode?: PlannerMode;
  kitConfigured?: boolean;
}) {
  const isQuizMode = initialMode !== "times";
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<"intro" | "wizard" | "starter" | "timing" | "result">(
    isQuizMode ? "intro" : "timing",
  );
  const [form, setForm] = useState<PlanFormState>(initialFormState);
  const [result, setResult] = useState<PortMathResult | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [basicsErrors, setBasicsErrors] = useState<BasicsError[]>([]);
  const [planningStatus, setPlanningStatus] = useState<PlanningStatus | null>(null);
  const [groupChoice, setGroupChoice] = useState<GroupChoice | null>(null);
  const [avoidConcern, setAvoidConcern] = useState<AvoidConcern | null>(null);
  const [pacePreference, setPacePreference] = useState<PacePreference | null>(null);
  const [budgetChoice, setBudgetChoice] = useState<BudgetChoice | null>(null);
  const [timingChoice, setTimingChoice] = useState<TimingChoice | null>(null);
  const [itineraryVariant, setItineraryVariant] = useState(0);
  const [email, setEmail] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [gateError, setGateError] = useState<string | undefined>(undefined);
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  // planner_start = the user actually begins a planner flow (quiz, exact-intro, or
  // direct mode=times). This guard fires it exactly once per session regardless of
  // which entry path they take, so reaching the exact-time form after the quiz does
  // not double-count.
  const plannerStartedRef = useRef(false);

  // Fires once per page load (StrictMode-safe via the ref), independent of the
  // planner_start guard: this counts EVERY arrival on /nassau/plan — including
  // visitors who never tap "Start" — so social traffic is visible and attributable.
  const landingViewFiredRef = useRef(false);

  function firePlannerStart(surface: string) {
    if (plannerStartedRef.current) return;
    plannerStartedRef.current = true;
    // Rider A2: carry the same UTM attribution as email_submitted so planner_start
    // is directly attributable to a source without a funnel join.
    track("planner_start", {
      port: "nassau",
      mode: initialMode,
      surface,
      ...utmEventProps(readUtmParams()),
    });
  }

  const steps = MODE_STEP_IDS[initialMode] ?? MODE_STEP_IDS.default;
  const stepId = steps[stepIndex] ?? steps[0];
  const stepTitle =
    MODE_STEP_TITLES[initialMode]?.[stepId] ??
    (isFunnelStepId(stepId) ? FUNNEL_STEP_TITLES[stepId] : "Your Nassau plan");
  const pageCopy = MODE_PAGE_COPY[initialMode] ?? MODE_PAGE_COPY.default;
  const stepComplete =
    stepId === "planning_status"
      ? planningStatus !== null
      : stepId === "group" && isQuizMode
        ? groupChoice !== null
      : stepId === "avoid"
        ? avoidConcern !== null
        : stepId === "pace"
          ? pacePreference !== null
          : stepId === "budget" && isQuizMode
            ? budgetChoice !== null
          : stepId === "timing_choice"
            ? timingChoice !== null
            : isFunnelStepId(stepId)
              ? isStepComplete(stepId, form)
              : false;
  const isLastStep = stepIndex === steps.length - 1;

  // --- Canonical funnel view/impression events (lib/funnel-events.ts) ---------
  // These fire on screen entry. Click/submit events are fired inline at their
  // handlers. All payloads are privacy-safe (no email, ship name, raw times/date).

  // Planner page landing impression. Fires once per page load (ref guard also
  // absorbs React StrictMode's dev double-mount), regardless of whether the user
  // ever starts. Carries UTM attribution, the pathname only, and the hostname-only
  // referrer — never a full URL — so bio/social arrivals are counted and separable.
  useEffect(() => {
    if (landingViewFiredRef.current) return;
    landingViewFiredRef.current = true;
    const host = referrerHost();
    track("landing_view", {
      port: "nassau",
      surface: "planner_page",
      mode: initialMode,
      page_path: window.location.pathname,
      ...(host ? { referrer_host: host } : {}),
      ...utmEventProps(readUtmParams()),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Each wizard question becomes visible.
  useEffect(() => {
    if (phase !== "wizard") return;
    track("planner_step_view", { port: "nassau", mode: initialMode, step: stepIndex + 1 });
  }, [phase, stepIndex, initialMode]);

  // Exact-time form screen becomes visible. This is also where the exact-time and
  // direct mode=times paths register their planner_start (the once-guard makes it
  // a no-op for quiz users who already started, so no double-count).
  useEffect(() => {
    if (phase !== "timing") return;
    firePlannerStart(isQuizMode ? "exact_intro" : "times_direct");
    track("planner_step_view", { port: "nassau", mode: initialMode, surface: "exact_timing_form" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Starter (non-exact) result screen: app card + excursion impressions.
  useEffect(() => {
    if (phase !== "starter") return;
    track("app_card_view", { port: "nassau", mode: initialMode, surface: "starter_plan" });
    starterExcursions().forEach((card, i) =>
      track("excursion_card_view", {
        port: "nassau",
        mode: initialMode,
        surface: "starter_card",
        excursion_id: card.id,
        offer_priority: String(i + 1),
      }),
    );
    // starterExcursions reads current quiz answers; intentionally keyed on phase only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // A valid return target was computed and is being shown. This is the true
  // "calculator completed" moment (planner_complete), followed by the partial
  // result impression (port_math_view) and the email gate impression.
  useEffect(() => {
    if (phase !== "result" || !result) return;
    if (!buildPartialResultView(result).valid) return;
    track("planner_complete", { port: "nassau", mode: initialMode, result_type: planStyleLabel() });
    track("port_math_view", { port: "nassau", mode: initialMode, result_type: planStyleLabel() });
    track("email_gate_view", { port: "nassau", mode: initialMode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, result]);

  // Full plan unlocked: results + app card + excursion impressions.
  useEffect(() => {
    if (!submitted) return;
    track("results_view", { port: "nassau", mode: initialMode, result_type: planStyleLabel() });
    track("playbook_card_view", playbookEventProps());
    track("app_card_view", { port: "nassau", mode: initialMode, surface: "unlocked_result" });
    starterExcursions().forEach((card, i) =>
      track("excursion_card_view", {
        port: "nassau",
        mode: initialMode,
        surface: "unlocked_result_card",
        excursion_id: card.id,
        offer_priority: String(i + 1),
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  const errFor = (field: BasicsError["field"]) =>
    basicsErrors.find((e) => e.field === field)?.message;
  const dateError = errFor("portDate");
  const stepOffError = errFor("expectedStepOffTime");
  const allAboardError = errFor("allAboardTime") ?? errFor("timeOrder");
  const confirmError = errFor("allAboardConfirmed");

  function patch(p: Partial<PlanFormState>) {
    setForm((f) => ({ ...f, ...p }));
  }

  // Edits to Step 1 fields clear stale validation errors as the user corrects them.
  function updateBasics(p: Partial<PlanFormState>) {
    patch(p);
    if (basicsErrors.length > 0) setBasicsErrors([]);
  }

  function scrollToTop() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: reducedMotionScrollBehavior() });
    }
  }

  function startQuiz() {
    firePlannerStart("planner_intro");
    setPhase("wizard");
    scrollToTop();
  }

  function advanceStep() {
    setStepIndex((i) => i + 1);
    scrollToTop();
  }

  function runCalculation() {
    const raw = {
      port: "nassau" as const,
      portDate: form.portDate,
      expectedStepOffTime: form.expectedStepOffTime,
      allAboardTime: form.allAboardTime,
    };
    const parsed = validatePortMathInput(raw);
    const pm = computePortMath(parsed.success ? parsed.data : raw, NASSAU_PORT_CONFIG);
    setResult(pm);
    setSubmitted(false);
    setGateError(undefined);
    setGateSubmitting(false);
    setItineraryVariant(0);
    setPhase("result");
    scrollToTop();
  }

  function handleContinue() {
    if (stepId === "basics") {
      const errs = validateBasicsStep(form);
      if (errs.length > 0) {
        setBasicsErrors(errs);
        // Announce + move keyboard focus to the error summary; user stays on Step 1.
        requestAnimationFrame(() => errorSummaryRef.current?.focus());
        return;
      }
      setBasicsErrors([]);
      if (isLastStep) {
        runCalculation();
        return;
      }
      advanceStep();
      return;
    }
    if (!stepComplete) return;
    if (isLastStep) {
      if (isQuizMode) {
        // planner_complete fires when the CALCULATOR completes (a valid return
        // target is computed) — see the result effect — not merely when the quiz
        // ends, since a quiz can end at the starter screen with no calculation.
        if (timingChoice === "exact") {
          startExactTiming();
          return;
        }
        setPhase("starter");
        scrollToTop();
        return;
      }
      runCalculation();
      return;
    }
    advanceStep();
  }

  function handleExactTimingSubmit() {
    const errs = validateBasicsStep(form);
    if (errs.length > 0) {
      setBasicsErrors(errs);
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }
    setBasicsErrors([]);
    runCalculation();
  }

  function handleBack() {
    if (isQuizMode && stepIndex === 0) {
      setPhase("intro");
      scrollToTop();
      return;
    }
    setStepIndex((i) => Math.max(0, i - 1));
    scrollToTop();
  }

  // Recovery from the result screen: return to Step 1 with every answer preserved.
  function editTimes() {
    setBasicsErrors([]);
    if (isQuizMode) {
      setPhase("timing");
      scrollToTop();
      return;
    }
    setStepIndex(0);
    setPhase("timing");
    scrollToTop();
  }

  function revealFullPlan() {
    setSubmitted(true);
    requestAnimationFrame(() => {
      const fullPlan = document.getElementById("np-full-plan");
      fullPlan?.scrollIntoView({
        behavior: reducedMotionScrollBehavior(),
        block: "start",
      });
      fullPlan?.focus({ preventScroll: true });
    });
  }

  function buildKitPayload(emailValue: string, utm: UtmParams) {
    const planMode: "exact-time" | "starter" = result?.recommendedTerminalReturn
      ? "exact-time"
      : "starter";
    return {
      email: emailValue,
      // Submitting the gate (with the "we'll email your plan" copy shown) is the
      // delivery consent. Sent explicitly so the server can require it. Marketing
      // consent stays the separate, optional checkbox below.
      deliveryConsent: true as const,
      marketingConsent,
      planMode,
      planType: planStyleLabel(),
      returnTarget: result?.recommendedTerminalReturn || undefined,
      stepOffTime: form.expectedStepOffTime || undefined,
      allAboardTime: form.allAboardTime || undefined,
      groupType: groupChoice ?? form.partyType ?? undefined,
      worry: avoidConcern ?? undefined,
      budget: budgetChoice ?? form.budgetPreference ?? undefined,
      portDate: form.portDate || undefined,
      source: "nassau-plan",
      currentPath: typeof window !== "undefined" ? window.location.pathname : undefined,
      ...utm,
    };
  }

  async function handleGateSubmit() {
    if (!result) return;

    // No server-side Kit key: keep the honest local-only reveal. In this mode the
    // gate UI collects no email, so nothing is sent or stored.
    if (!kitConfigured) {
      revealFullPlan();
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!emailFieldSchema.safeParse(normalizedEmail).success) {
      setGateError("Please enter a valid email address.");
      return;
    }
    setGateError(undefined);
    setGateSubmitting(true);
    const utm = readUtmParams();
    try {
      const res = await fetch("/api/kit/nassau-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildKitPayload(normalizedEmail, utm)),
      });
      const data: { ok?: boolean; error?: string; message?: string } | null = await res
        .json()
        .catch(() => null);
      if (res.ok && data?.ok) {
        track("email_submitted", { port: "nassau", mode: initialMode, ...utmEventProps(utm) });
        revealFullPlan();
      } else if (data?.error === "kit_not_configured" || data?.error === "delivery_not_configured") {
        // Email saving isn't wired up server-side. Fall back to the honest local
        // reveal: show the plan locally without claiming it was saved or emailed.
        revealFullPlan();
      } else {
        // A real save failure: do not claim the plan was saved, and do not reveal it.
        setGateError(data?.message ?? "We couldn’t save your plan just now. Please try again.");
      }
    } catch {
      setGateError("We couldn’t save your plan just now. Please try again.");
    } finally {
      setGateSubmitting(false);
    }
  }

  function restart() {
    setForm(initialFormState());
    setResult(null);
    setSubmitted(false);
    setEmail("");
    setMarketingConsent(false);
    setGateError(undefined);
    setGateSubmitting(false);
    setPlanningStatus(null);
    setGroupChoice(null);
    setAvoidConcern(null);
    setPacePreference(null);
    setBudgetChoice(null);
    setTimingChoice(null);
    setItineraryVariant(0);
    setStepIndex(0);
    setPhase(isQuizMode ? "intro" : "timing");
    scrollToTop();
  }

  function optionLabel<T extends string>(
    options: Array<{ value: T; label: string }>,
    value: T | null,
    fallback = "Not selected",
  ) {
    return options.find((o) => o.value === value)?.label ?? fallback;
  }

  function selectedInterestLabels() {
    const labels = QUIZ_INTEREST_OPTIONS.filter((o) => form.interests.includes(o.value)).map((o) => o.label);
    return labels.length > 0 ? labels.join(" + ") : "Flexible Nassau day";
  }

  function starterAnchorCopy() {
    if (form.interests.includes("beach")) return "one beach or water anchor";
    if (form.interests.includes("local_food")) return "one food or downtown anchor";
    if (form.interests.includes("history")) return "one history or old-town anchor";
    if (form.interests.includes("family_easy")) return "one contained family-safe anchor";
    if (form.interests.includes("budget")) return "one low-cost anchor near the port";
    if (form.interests.includes("easy_logistics")) return "one excursion-style anchor";
    return "one worthwhile anchor activity";
  }

  function scoreStarterExcursion(excursion: NassauMobileExcursionRecord) {
    const haystack = [
      excursion.title,
      excursion.durationLabel,
      excursion.uiTabCategory,
      excursion.priceTier,
      ...excursion.aiMatchTags,
    ]
      .join(" ")
      .toLowerCase();

    let score = 0;
    for (const interest of form.interests) {
      if (interest === "beach" && haystack.includes("beach")) score += 4;
      if (interest === "local_food" && (haystack.includes("food") || haystack.includes("rum"))) score += 4;
      if (interest === "history" && (haystack.includes("history") || haystack.includes("culture"))) score += 4;
      if (interest === "family_easy" && (haystack.includes("island tours") || excursion.durationMinutes <= 180)) {
        score += 3;
      }
      if (interest === "budget" && excursion.priceTier.length <= 3) score += 3;
      if (interest === "easy_logistics" && excursion.durationMinutes <= 180) score += 3;
    }

    if (form.budgetPreference === "low" && excursion.priceTier.length <= 3) score += 2;
    if (form.budgetPreference === "premium" && excursion.priceTier.length >= 4) score += 2;
    if (pacePreference === "low_stress" && excursion.durationMinutes <= 180) score += 2;
    if (avoidConcern === "return_timing" && excursion.durationMinutes <= 180) score += 2;

    return score;
  }

  function starterExcursions() {
    return [...NASSAU_MOBILE_EXCURSIONS]
      .sort((a, b) => {
        const scoreDiff = scoreStarterExcursion(b) - scoreStarterExcursion(a);
        if (scoreDiff !== 0) return scoreDiff;
        const durationDiff = a.durationMinutes - b.durationMinutes;
        if (durationDiff !== 0) return durationDiff;
        return a.id.localeCompare(b.id);
      })
      .slice(0, 3);
  }

  function dayTypeTitle() {
    if (form.partyType === "family") return "Your Nassau Day Type: Family-Safe Buffer Builder";
    if (form.budgetPreference === "low" || form.interests.includes("budget")) {
      return "Your Nassau Day Type: Budget-Savvy Explorer";
    }
    if (avoidConcern === "return_timing" || pacePreference === "low_stress") {
      return "Your Nassau Day Type: Low-Stress Independent Planner";
    }
    if (pacePreference === "packed_realistic") return "Your Nassau Day Type: Packed-But-Realistic Planner";
    return "Your Nassau Day Type: One Great Thing Planner";
  }

  function dayTypeBody() {
    if (form.partyType === "family") {
      return "Your best fit is fewer moves, clearer meeting points, and enough buffer for slower group pace.";
    }
    if (form.budgetPreference === "low" || form.interests.includes("budget")) {
      return "Your best fit is a clear low-cost anchor with enough structure to avoid wandering into expensive decisions.";
    }
    if (avoidConcern === "return_timing" || pacePreference === "low_stress") {
      return "Your best fit is one easy anchor, conservative return timing, and no rushed cross-island scramble.";
    }
    return "Your best fit is one strong Nassau choice, a realistic buffer, and a clean next step if you want an excursion.";
  }

  function planStyleLabel() {
    return dayTypeTitle().replace(/^Your Nassau Day Type:\s*/, "");
  }

  /**
   * Non-PII properties for the paid Playbook card events. `destination` and
   * `plan_type` are coarse categories; UTM values are copied verbatim from the
   * landing URL. Read fresh at call time — readUtmParams() is window-only, so it
   * must not be hoisted into SSR-initialized state.
   */
  function playbookEventProps(): FunnelEventProperties {
    return {
      surface: "unlocked_result",
      destination: "nassau",
      plan_type: planStyleLabel(),
      ...utmEventProps(readUtmParams()),
    };
  }

  function renderExcursionCards(recommendations: NassauMobileExcursionRecord[], surface: string) {
    return recommendations.map((card) => (
      <article key={card.id} className="np-excursion-card">
        <div className="np-excursion-image">
          <img
            src={card.imageUrls[0] ?? "/nassau-aerial-web.jpg"}
            alt={`${card.title} excursion image from ShoreDay's Nassau catalog`}
          />
        </div>
        <div className="np-excursion-body">
          <h3>{card.title}</h3>
          <p className="np-excursion-pill">
            {card.uiTabCategory} • {card.durationLabel} • {card.priceTier}
          </p>
          <ul className="np-excursion-benefits" aria-label={`${card.title} booking benefits`}>
            <li>Free cancellation up to 24 hrs before</li>
            <li>Reserve now &amp; pay later</li>
          </ul>
          <a
            className="np-book-link"
            href={card.affiliateUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={() =>
              track("excursion_click", {
                port: "nassau",
                mode: initialMode,
                surface,
                excursion_id: card.id,
              })
            }
          >
            Book Now →
          </a>
        </div>
      </article>
    ));
  }

  function selectQuizAnswer(step: PlannerStepId, label: string, action: () => void) {
    void step;
    void label;
    action();
    // Canonical step-completion event. We send the step INDEX only — never the
    // free-text answer label, which is not a canonical (allow-listed) field.
    track("planner_step_complete", { port: "nassau", mode: initialMode, step: stepIndex + 1 });
  }

  function startExactTiming() {
    setBasicsErrors([]);
    setTimingChoice("exact");
    setPhase("timing");
    scrollToTop();
  }

  if (isQuizMode && phase === "intro") {
    return (
      <main className="nassau-plan">
        <div className="np-shell np-shell-intro">
          <header className="np-topbar" aria-label="Nassau planner">
            <Link href="/" className="np-brand">
              <img src="/logo_transparent.png" alt="" aria-hidden="true" className="np-brand-icon" />
              <span className="np-brand-word"><ShoreDayWordmark /></span>
            </Link>
            <ViatorOutboundLink
              surface="planner_topbar"
              mode={initialMode}
              className="np-port-chip"
            >
              Book Excursions ↗
            </ViatorOutboundLink>
          </header>

          <h1 id="np-intro-title" className="np-intro-heading">
            Most cruisers plan around the brochure. ShoreDay plans around your
            real port window, group, budget, and all-aboard buffer.
          </h1>

          <section className="np-intro-card" aria-labelledby="np-intro-title">
            <div className="np-intro-copy">
              <button type="button" className="fn-btn fn-btn-primary np-intro-cta" onClick={startQuiz}>
                Continue to the 60-Second Quiz
              </button>
              <p className="np-intro-micro">Takes about 60 seconds. Exact timing comes after the quiz.</p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (isQuizMode && phase === "starter") {
    const canCalculateNow = timingChoice === "exact";
    const recommendations = starterExcursions();
    return (
      <main className="nassau-plan">
        <div className="np-shell np-shell-result">
          <header className="np-topbar" aria-label="Nassau planner">
            <Link href="/" className="np-brand">
              <img src="/logo_transparent.png" alt="" aria-hidden="true" className="np-brand-icon" />
              <span className="np-brand-word"><ShoreDayWordmark /></span>
            </Link>
            <span className="np-port-chip">Nassau planner</span>
          </header>

          <section className="np-result-stack" aria-labelledby="np-starter-title">
            <div className="np-starter-hero">
              <p className="np-kicker">Personal result</p>
              <h1 id="np-starter-title" className="np-h1">
                {dayTypeTitle()}
              </h1>
              <p>
                {dayTypeBody()} This is a starter plan, not an exact timing
                result. Add your official all-aboard time later for a recommended
                return target.
              </p>
            </div>

            <div className="np-starter-grid">
              <article className="np-starter-card">
                <span className="np-starter-label">Planning profile</span>
                <h2>{optionLabel(PLANNING_STATUS_OPTIONS, planningStatus)}</h2>
                <dl className="np-starter-list">
                  <div>
                    <dt>Group</dt>
                    <dd>{optionLabel(QUIZ_GROUP_OPTIONS, groupChoice)}</dd>
                  </div>
                  <div>
                    <dt>Day style</dt>
                    <dd>{selectedInterestLabels()}</dd>
                  </div>
                  <div>
                    <dt>Comfort level</dt>
                    <dd>{optionLabel(QUIZ_BUDGET_OPTIONS, budgetChoice)}</dd>
                  </div>
                </dl>
              </article>

              <article className="np-starter-card">
                <span className="np-starter-label">Best-fit Nassau plan</span>
                <h2>Keep it to {starterAnchorCopy()}.</h2>
                <p>
                  Start with a clear anchor, keep flexible time near the port, and
                  save the exact return decision until your official all-aboard time
                  is confirmed.
                </p>
              </article>

              <article className="np-starter-card">
                <span className="np-starter-label">Main risk to avoid</span>
                <h2>{optionLabel(AVOID_OPTIONS, avoidConcern)}</h2>
                <p>
                  ShoreDay should help you choose fewer, clearer decisions instead
                  of turning Nassau into a rushed checklist.
                </p>
              </article>

              <article className="np-starter-card">
                <span className="np-starter-label">Confirm next</span>
                <h2>{timingChoice === "research" ? "Your booked ship and official times." : "Your official all-aboard time."}</h2>
                <p>
                  Check your cruise app, daily planner, or ship announcement. That
                  time stays the final authority for any ShoreDay return target.
                </p>
              </article>
            </div>

            <div className="np-starter-actions np-starter-actions-primary" aria-label="Starter plan next actions">
              <button type="button" className="fn-btn fn-btn-primary" onClick={startExactTiming}>
                {canCalculateNow ? "Calculate recommended return target" : "Add ship times when ready"}
              </button>
            </div>

            <section className="np-starter-excursions" aria-labelledby="np-starter-excursions-title">
              <div className="np-section-head">
                <p className="np-kicker">ShoreDay Excursions</p>
                <h2 id="np-starter-excursions-title">Excursions that fit this starter plan</h2>
                <p>
                  These are local alternatives to cruise-line excursions. Add your
                  official ship times before booking anything far from port.
                </p>
              </div>
              <div className="np-excursion-card-grid">
                {recommendations.map((card) => (
                  <article key={card.id} className="np-excursion-card">
                    <div className="np-excursion-image">
                      <img
                        src={card.imageUrls[0] ?? "/nassau-aerial-web.jpg"}
                        alt={`${card.title} excursion image from ShoreDay's Nassau catalog`}
                      />
                    </div>
                    <div className="np-excursion-body">
                      <h3>{card.title}</h3>
                      <p className="np-excursion-pill">
                        {card.uiTabCategory} • {card.durationLabel} • {card.priceTier}
                      </p>
                      <ul className="np-excursion-benefits" aria-label={`${card.title} booking benefits`}>
                        <li>Free cancellation up to 24 hrs before</li>
                        <li>Reserve now &amp; pay later</li>
                      </ul>
                      <a
                        className="np-book-link"
                        href={card.affiliateUrl}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        onClick={() =>
                          track("excursion_click", {
                            port: "nassau",
                            mode: initialMode,
                            surface: "starter_card",
                            excursion_id: card.id,
                          })
                        }
                      >
                        Book Now →
                      </a>
                    </div>
                  </article>
                ))}
              </div>
              <div className="np-starter-actions np-browse-all">
              <ViatorOutboundLink
                surface="browse_all_starter"
                mode={initialMode}
                className="fn-btn fn-btn-ghost"
              >
                Browse all ShoreDay Excursions
              </ViatorOutboundLink>
              </div>
              <p className="fn-affiliate-disclosure">
                Disclosure: ShoreDay may earn a commission if you book through a Viator link. It doesn&rsquo;t change the price you pay.
              </p>
            </section>

            <section className="np-app-soft" aria-label="ShoreDay app">
              <h2>Your port-day companion</h2>
              <p>
                The ShoreDay app rides along in Nassau &mdash; your saved plan,
                departure reminders, map, and in-app concierge while you&rsquo;re
                ashore.
              </p>
              <div className="np-store-badges">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("app_store_click", {
                      port: "nassau",
                      mode: initialMode,
                      store: "apple",
                      surface: "starter_plan",
                    })
                  }
                >
                  <img src={APPLE_BADGE} alt="Download on the App Store" />
                </a>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("app_store_click", {
                      port: "nassau",
                      mode: initialMode,
                      store: "google",
                      surface: "starter_plan",
                    })
                  }
                >
                  <img src={PLAY_BADGE} alt="Get it on Google Play" />
                </a>
              </div>
            </section>

            <div className="np-recovery">
              <button
                type="button"
                className="fn-btn fn-btn-ghost"
                onClick={() => {
                  setPhase("wizard");
                  scrollToTop();
                }}
              >
                Edit quiz answers
              </button>
              <button type="button" className="fn-btn fn-btn-ghost" onClick={restart}>
                Start over
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (phase === "timing") {
    return (
      <main className="nassau-plan">
        <div className="np-shell np-shell-result">
          <header className="np-topbar" aria-label="Nassau planner">
            <Link href="/" className="np-brand">
              <img src="/logo_transparent.png" alt="" aria-hidden="true" className="np-brand-icon" />
              <span className="np-brand-word"><ShoreDayWordmark /></span>
            </Link>
            <ViatorOutboundLink
              surface="planner_topbar"
              mode={initialMode}
              className="np-port-chip"
            >
              Book Excursions ↗
            </ViatorOutboundLink>
          </header>

          <div className="np-planner-layout np-planner-layout-single">
            <FunnelStepShell
              header={
                <div className="np-card-intro">
                  <h1 id="np-timing-title" className="fn-sr-only">
                    Let ShoreDay calculate your recommended back-at-the-pier time
                  </h1>
                  <p>
                    Add your Nassau date and official ship times. Always verify your
                    all-aboard time with your cruise line.
                  </p>
                </div>
              }
              title="Calculate your recommended back-at-the-pier time"
              hideTitle
              onBack={() => {
                setBasicsErrors([]);
                if (planningStatus === "booked_times") {
                  setPhase("wizard");
                  setStepIndex(steps.length - 1);
                  return;
                }
                if (planningStatus || timingChoice === "starter" || timingChoice === "research") {
                  setPhase("starter");
                  return;
                }
                setPhase("intro");
              }}
              onContinue={handleExactTimingSubmit}
              continueLabel="Calculate my return time"
              showBack={isQuizMode}
            >
              <div className="fn-stack">
                {basicsErrors.length > 0 ? (
                  <div
                    ref={errorSummaryRef}
                    tabIndex={-1}
                    role="alert"
                    className="fn-error-summary"
                  >
                    <strong>Please fix the following before continuing:</strong>
                    <ul>
                      {basicsErrors.map((e) => (
                        <li key={e.field}>{e.message}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <p className="fn-required-note">
                  <span className="fn-req">Required</span> fields are marked.
                </p>

                <div className="fn-field">
                  <label htmlFor="np-fast-ship" className="fn-label">
                    Cruise ship <span className="fn-optional">(optional)</span>
                  </label>
                  <input
                    id="np-fast-ship"
                    type="text"
                    className="fn-input"
                    value={form.shipName}
                    onChange={(e) => patch({ shipName: e.target.value })}
                    placeholder="e.g. Carnival Celebration"
                  />
                </div>

                <div className="fn-time-group">
                  <div className="fn-field">
                    <label htmlFor="np-fast-date" className="fn-label">
                      Nassau port date
                      <span className="fn-req">
                        {" "}
                        Required<span className="fn-sr-only"> field</span>
                      </span>
                    </label>
                    <span className="fn-input-wrap">
                      <svg
                        className="fn-input-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
                        <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
                        <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <input
                        id="np-fast-date"
                        type="date"
                        className="fn-input fn-input-iconed"
                        value={form.portDate}
                        min={new Date().toLocaleDateString("en-CA")}
                        onChange={(e) => updateBasics({ portDate: e.target.value })}
                        required
                        aria-required="true"
                        aria-invalid={dateError ? true : undefined}
                        aria-describedby={dateError ? "np-fast-date-error" : undefined}
                      />
                    </span>
                    {dateError ? (
                      <span id="np-fast-date-error" className="fn-error">
                        {dateError}
                      </span>
                    ) : null}
                  </div>

                  <TimeInput
                    id="np-fast-stepoff"
                    label="When do you expect to step off the ship?"
                    value={form.expectedStepOffTime}
                    onChange={(v) => updateBasics({ expectedStepOffTime: v })}
                    hint="Local Nassau time"
                    required
                    error={stepOffError}
                  />
                  <TimeInput
                    id="np-fast-allaboard"
                    label="Your all-aboard time"
                    value={form.allAboardTime}
                    onChange={(v) => updateBasics({ allAboardTime: v })}
                    hint="The passenger all-aboard time — not the ship's departure time"
                    required
                    error={allAboardError}
                  />
                </div>

                <div className="fn-field">
                  <label className="fn-checkbox">
                    <input
                      type="checkbox"
                      checked={form.allAboardConfirmed}
                      onChange={(e) => updateBasics({ allAboardConfirmed: e.target.checked })}
                      aria-required="true"
                      aria-invalid={confirmError ? true : undefined}
                      aria-describedby={confirmError ? "np-fast-confirm-error" : undefined}
                    />
                    <span>
                      I&rsquo;ll use my ship&rsquo;s official all-aboard time as the final
                      word — ShoreDay&rsquo;s estimate is a planning aid only.
                      <span className="fn-req">
                        {" "}
                        Required<span className="fn-sr-only"> acknowledgement</span>
                      </span>
                    </span>
                  </label>
                  {confirmError ? (
                    <span id="np-fast-confirm-error" className="fn-error">
                      {confirmError}
                    </span>
                  ) : null}
                </div>
              </div>
            </FunnelStepShell>
          </div>
        </div>
      </main>
    );
  }

  if (phase === "result" && result) {
    const view = buildPartialResultView(result);
    const style = planStyleLabel();
    const recommendations = starterExcursions();
    const returnTargetLabel = view.recommendedTerminalReturnLabel ?? "your return target";
    const itineraryStops = buildNassauWebItinerary({
      resultType: style,
      stepOffTime: form.expectedStepOffTime,
      allAboardTime: form.allAboardTime,
      returnTarget: result.recommendedTerminalReturn,
      groupType: groupChoice ?? form.partyType,
      pace: pacePreference,
      budget: budgetChoice ?? form.budgetPreference,
      variant: itineraryVariant,
    });
    const previewTimelineStops = itineraryStops.slice(0, 2);

    if (!view.valid) {
      return (
        <main className="nassau-plan">
          <div className="np-shell np-shell-result">
            <header className="np-topbar" aria-label="Nassau planner">
              <Link href="/" className="np-brand">
                <img src="/logo_transparent.png" alt="" aria-hidden="true" className="np-brand-icon" />
                <span className="np-brand-word"><ShoreDayWordmark /></span>
              </Link>
              <ViatorOutboundLink
                surface="planner_topbar"
                mode={initialMode}
                className="np-port-chip"
              >
                Book Excursions ↗
              </ViatorOutboundLink>
            </header>

            <section className="np-result-stack" aria-label="Timing error">
              <div className="fn-result fn-result-invalid" role="alert">
                <p>{view.invalidMessage}</p>
              </div>
              <div className="np-recovery">
                <button type="button" className="fn-btn fn-btn-primary" onClick={editTimes}>
                  Edit My Times
                </button>
                <button type="button" className="fn-btn fn-btn-ghost" onClick={restart}>
                  Start over
                </button>
              </div>
            </section>
          </div>
        </main>
      );
    }

    return (
      <main className="nassau-plan">
        <div className="np-shell np-shell-result">
          <header className="np-topbar" aria-label="Nassau planner">
            <Link href="/" className="np-brand">
              <img src="/logo_transparent.png" alt="" aria-hidden="true" className="np-brand-icon" />
              <span className="np-brand-word"><ShoreDayWordmark /></span>
            </Link>
            <span className="np-port-chip">Nassau planner</span>
          </header>

          <section className="np-result-stack np-result-stack-payoff" aria-label="Timing result and plan unlock">
            <section className="np-payoff-hero" aria-labelledby="np-payoff-title">
              <h1 id="np-payoff-title" className="fn-sr-only">
                Your recommended Nassau return time
              </h1>
              <p className="np-kicker">Instant timing result</p>
              <p className="np-payoff-sub">
                Based on your ship times, ShoreDay recommends this return target
                with a planning buffer. Confirm your official all-aboard time with
                your cruise line.
              </p>

              <div className="np-return-target-card" aria-label="Recommended return target">
                <span>Back at the pier by</span>
                <strong>{returnTargetLabel}</strong>
              </div>

              <dl className="np-result-metrics" aria-label="Timing details">
                <div>
                  <dt>Scheduled window</dt>
                  <dd>{view.scheduledWindowLabel}</dd>
                </div>
                <div>
                  <dt>Usable planning time</dt>
                  <dd>{view.usableWindowLabel}</dd>
                </div>
                <div>
                  <dt>Planning buffer</dt>
                  <dd>{formatDurationLabel(result.terminalBufferMinutes)}</dd>
                </div>
                <div>
                  <dt>Plan style</dt>
                  <dd>{style}</dd>
                </div>
              </dl>

              <p className="np-plan-style-note">
                <strong>Your plan style:</strong> {style}. {dayTypeBody()}
              </p>
              {view.shortMessage ? <p className="fn-result-warn">{view.shortMessage}</p> : null}
            </section>

            {!submitted ? (
              <>
                <section className="np-preview-moves" aria-labelledby="np-preview-moves-title">
                  <p className="np-kicker">Plan preview</p>
                  <h2 id="np-preview-moves-title">Preview your Nassau timeline</h2>
                  <p className="np-preview-copy">
                    Here&rsquo;s the start of a plan that keeps you close, clear, and on time.
                  </p>
                  <ItineraryTimeline
                    stops={previewTimelineStops}
                    compact
                    lockedTeaser="Your full plan shows the rest of the timeline, return buffer, and Nassau options that fit your ship time."
                  />
                </section>

                <EmailGateCard
                  kitConfigured={kitConfigured}
                  email={email}
                  marketingConsent={marketingConsent}
                  onEmailChange={(value) => {
                    setEmail(value);
                    if (gateError) setGateError(undefined);
                  }}
                  onMarketingToggle={setMarketingConsent}
                  onSubmit={handleGateSubmit}
                  submitting={gateSubmitting}
                  error={gateError}
                />
              </>
            ) : (
              <p className="np-unlock-confirm" role="status">
                Plan unlocked.{kitConfigured ? " We also sent your Nassau Survival Card to your inbox." : ""}
              </p>
            )}

            {submitted ? (
              <section
                id="np-full-plan"
                className="np-full-plan"
                aria-labelledby="np-full-plan-title"
                tabIndex={-1}
              >
                <div className="np-section-head">
                  <p className="np-kicker">Full timeline</p>
                  <div className="np-itinerary-title-row">
                    <h2 id="np-full-plan-title">Your ShoreDay Nassau timeline</h2>
                    <PoweredByAiBadge />
                  </div>
                  <p>
                    One clear plan built around your return target — not a packed checklist.
                  </p>
                </div>

                <div className="np-itinerary-panel">
                  {/* Unlocked, post-email timeline — the only place Google Places
                      photos are enabled. The preview/locked timeline above never
                      sets this, so no place photo is fetched before email capture. */}
                  <ItineraryTimeline stops={itineraryStops} enableGooglePlacePhoto />
                </div>

                {/* Paid Nassau Port Day Playbook (Etsy) — post-gate only, so it is
                    never shown before the user has seen the free plan. This is
                    ShoreDay's OWN product: no affiliate disclosure and no
                    rel="sponsored" (unlike the Viator links below). */}
                <section className="np-playbook-card" aria-labelledby="np-playbook-title">
                  <h2 id="np-playbook-title">Want this plan in a printable backup?</h2>
                  <p>
                    Get the fillable Nassau Port Day Playbook with the timing
                    worksheet, quick reference, and phone-first backup card.
                  </p>
                  <div className="np-starter-actions">
                    <a
                      className="fn-btn fn-btn-primary"
                      href={ETSY_PLAYBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track("playbook_click", playbookEventProps())}
                    >
                      Get the $5.99 Playbook
                    </a>
                  </div>
                </section>

                <section className="np-starter-excursions np-unlocked-excursions" aria-labelledby="np-unlocked-excursions-title">
                  <div className="np-section-head">
                    <p className="np-kicker">ShoreDay Excursions</p>
                    <h2 id="np-unlocked-excursions-title">Excursions that fit this plan</h2>
                    <p>
                      These are local alternatives to cruise-line excursions. Check
                      your official all-aboard time before booking anything far from port.
                    </p>
                  </div>
                  <div className="np-excursion-card-grid">
                    {renderExcursionCards(recommendations, "unlocked_result_card")}
                  </div>
                  <div className="np-starter-actions np-browse-all">
                    <ViatorOutboundLink
                      surface="browse_all_unlocked"
                      mode={initialMode}
                      className="fn-btn fn-btn-ghost"
                    >
                      Browse all ShoreDay Excursions
                    </ViatorOutboundLink>
                  </div>
                  <p className="fn-affiliate-disclosure">
                    Disclosure: ShoreDay may earn a commission if you book through a Viator link. It doesn&rsquo;t change the price you pay.
                  </p>
                </section>

                <section className="np-app-soft" aria-label="ShoreDay app">
                  <h2>Your port-day companion</h2>
                  <p>
                    The ShoreDay app rides along in Nassau &mdash; your saved plan,
                    departure reminders, map, and in-app concierge while
                    you&rsquo;re ashore.
                  </p>
                  <div className="np-store-badges">
                    <a
                      href={APP_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        track("app_store_click", {
                          port: "nassau",
                          mode: initialMode,
                          store: "apple",
                          surface: "unlocked_result",
                        })
                      }
                    >
                      <img src={APPLE_BADGE} alt="Download on the App Store" />
                    </a>
                    <a
                      href={PLAY_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        track("app_store_click", {
                          port: "nassau",
                          mode: initialMode,
                          store: "google",
                          surface: "unlocked_result",
                        })
                      }
                    >
                      <img src={PLAY_BADGE} alt="Get it on Google Play" />
                    </a>
                  </div>
                </section>
              </section>
            ) : null}

            <div className="np-recovery">
              <button
                type="button"
                className="fn-btn fn-btn-ghost"
                onClick={editTimes}
              >
                Edit times
              </button>
              <button type="button" className="fn-btn fn-btn-ghost" onClick={restart}>
                Start over
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="nassau-plan">
      <div className="np-shell">
        <header className="np-topbar" aria-label="Nassau planner">
          <Link href="/" className="np-brand">
            <img src="/logo_transparent.png" alt="" aria-hidden="true" className="np-brand-icon" />
            <span className="np-brand-word"><ShoreDayWordmark /></span>
          </Link>
          <ViatorOutboundLink
            surface="planner_topbar"
            mode={initialMode}
            className="np-port-chip"
          >
            Book Excursions ↗
          </ViatorOutboundLink>
        </header>

        <div className="np-planner-layout np-planner-layout-single">
          <h1 id="np-page-title" className="fn-sr-only">{pageCopy.title}</h1>

          <FunnelStepShell
              header={
                <FunnelProgress
                  current={stepIndex + 1}
                  total={steps.length}
                  label={isQuizMode ? "Question" : "Step"}
                  showPercentage={isQuizMode}
                />
              }
              title={stepTitle}
              onBack={handleBack}
              onContinue={handleContinue}
              continueLabel={
                stepId === "timing_choice"
                  ? timingChoice === "exact"
                    ? "Add ship times"
                    : "See my Nassau type"
                  : isLastStep
                    ? "Calculate my window"
                    : "Continue"
              }
              continueDisabled={stepId === "basics" ? false : !stepComplete}
              showBack={isQuizMode || stepIndex > 0}
            >
          {stepId === "planning_status" ? (
            <div className="fn-choice-grid">
              {PLANNING_STATUS_OPTIONS.map((o, index) => (
                <ChoiceCard
                  key={o.value}
                  badge={String.fromCharCode(65 + index)}
                  label={o.label}
                  description={o.description}
                  selected={planningStatus === o.value}
                  onSelect={() =>
                    selectQuizAnswer("planning_status", o.label, () => {
                      setPlanningStatus(o.value);
                      if (o.value === "booked_times") setTimingChoice("exact");
                      if (o.value === "booked_no_times") setTimingChoice("starter");
                      if (o.value === "still_deciding") setTimingChoice("research");
                    })
                  }
                />
              ))}
            </div>
          ) : null}

          {stepId === "basics" ? (
            <div className="fn-stack">
              <p className="fn-mode-intro">{MODE_INTRO[initialMode]}</p>
              {basicsErrors.length > 0 ? (
                <div
                  ref={errorSummaryRef}
                  tabIndex={-1}
                  role="alert"
                  className="fn-error-summary"
                >
                  <strong>Please fix the following before continuing:</strong>
                  <ul>
                    {basicsErrors.map((e) => (
                      <li key={e.field}>{e.message}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <p className="fn-required-note">
                <span className="fn-req">Required</span> fields are marked.
              </p>

              <div className="fn-field">
                <label htmlFor="np-ship" className="fn-label">
                  Cruise ship <span className="fn-optional">(optional)</span>
                </label>
                <input
                  id="np-ship"
                  type="text"
                  className="fn-input"
                  value={form.shipName}
                  onChange={(e) => patch({ shipName: e.target.value })}
                  placeholder="e.g. Carnival Celebration"
                />
              </div>

              <div className="fn-field">
                <label htmlFor="np-date" className="fn-label">
                  Nassau port date
                  <span className="fn-req">
                    {" "}
                    Required<span className="fn-sr-only"> field</span>
                  </span>
                </label>
                <input
                  id="np-date"
                  type="date"
                  className="fn-input"
                  value={form.portDate}
                  onChange={(e) => updateBasics({ portDate: e.target.value })}
                  required
                  aria-required="true"
                  aria-invalid={dateError ? true : undefined}
                  aria-describedby={dateError ? "np-date-error" : undefined}
                />
                {dateError ? (
                  <span id="np-date-error" className="fn-error">
                    {dateError}
                  </span>
                ) : null}
              </div>

              <TimeInput
                id="np-stepoff"
                label="When do you expect to step off the ship?"
                value={form.expectedStepOffTime}
                onChange={(v) => updateBasics({ expectedStepOffTime: v })}
                hint="Local Nassau time"
                required
                error={stepOffError}
              />
              <TimeInput
                id="np-allaboard"
                label="Your all-aboard time"
                value={form.allAboardTime}
                onChange={(v) => updateBasics({ allAboardTime: v })}
                hint="The passenger all-aboard time — not the ship's departure time"
                required
                error={allAboardError}
              />

              <div className="fn-field">
                <label className="fn-checkbox">
                  <input
                    type="checkbox"
                    checked={form.allAboardConfirmed}
                    onChange={(e) => updateBasics({ allAboardConfirmed: e.target.checked })}
                    aria-required="true"
                    aria-invalid={confirmError ? true : undefined}
                    aria-describedby={confirmError ? "np-confirm-error" : undefined}
                  />
                  <span>
                    I&rsquo;ll use my ship&rsquo;s official all-aboard time as the final
                    word — ShoreDay&rsquo;s estimate is a planning aid only.
                    <span className="fn-req">
                      {" "}
                      Required<span className="fn-sr-only"> acknowledgement</span>
                    </span>
                  </span>
                </label>
                {confirmError ? (
                  <span id="np-confirm-error" className="fn-error">
                    {confirmError}
                  </span>
                ) : null}
              </div>
            </div>
          ) : null}

          {stepId === "group" ? (
            <div className="fn-choice-grid">
              {QUIZ_GROUP_OPTIONS.map((o, index) => (
                <ChoiceCard
                  key={o.value}
                  badge={String.fromCharCode(65 + index)}
                  label={o.label}
                  description={o.description}
                  selected={groupChoice === o.value}
                  onSelect={() =>
                    selectQuizAnswer("group", o.label, () => {
                      setGroupChoice(o.value);
                      patch({ partyType: o.partyType });
                    })
                  }
                />
              ))}
            </div>
          ) : null}

          {stepId === "interests" ? (
            <>
              <p className="fn-helper">Choose the answer that best describes the day you want first.</p>
              <div className="fn-choice-grid">
                {QUIZ_INTEREST_OPTIONS.map((o, index) => (
                  <ChoiceCard
                    key={o.value}
                    badge={String.fromCharCode(65 + index)}
                    label={o.label}
                    description={o.description}
                    selected={form.interests.includes(o.value)}
                    onSelect={() => selectQuizAnswer("interests", o.label, () => patch({ interests: [o.value] }))}
                  />
                ))}
              </div>
            </>
          ) : null}

          {stepId === "budget" ? (
            <div className="fn-choice-grid">
              {QUIZ_BUDGET_OPTIONS.map((o, index) => (
                <ChoiceCard
                  key={o.value}
                  badge={String.fromCharCode(65 + index)}
                  label={o.label}
                  description={o.description}
                  selected={budgetChoice === o.value}
                  onSelect={() =>
                    selectQuizAnswer("budget", o.label, () => {
                      setBudgetChoice(o.value);
                      patch({ budgetPreference: o.budgetPreference });
                    })
                  }
                />
              ))}
            </div>
          ) : null}

          {stepId === "avoid" ? (
            <div className="fn-choice-grid">
              {AVOID_OPTIONS.map((o, index) => (
                <ChoiceCard
                  key={o.value}
                  badge={String.fromCharCode(65 + index)}
                  label={o.label}
                  description={o.description}
                  selected={avoidConcern === o.value}
                  onSelect={() => selectQuizAnswer("avoid", o.label, () => setAvoidConcern(o.value))}
                />
              ))}
            </div>
          ) : null}

          {stepId === "pace" ? (
            <div className="fn-choice-grid">
              {PACE_OPTIONS.map((o, index) => (
                <ChoiceCard
                  key={o.value}
                  badge={String.fromCharCode(65 + index)}
                  label={o.label}
                  description={o.description}
                  selected={pacePreference === o.value}
                  onSelect={() =>
                    selectQuizAnswer("pace", o.label, () => {
                      setPacePreference(o.value);
                      patch({
                        independencePreference:
                          o.value === "packed_realistic"
                            ? "independent"
                            : o.value === "balanced"
                              ? "mixed"
                              : "guided",
                      });
                    })
                  }
                />
              ))}
            </div>
          ) : null}

          {stepId === "timing_choice" ? (
            <div className="fn-choice-grid">
              {TIMING_CHOICE_OPTIONS.map((o, index) => (
                <ChoiceCard
                  key={o.value}
                  badge={String.fromCharCode(65 + index)}
                  label={o.label}
                  description={o.description}
                  selected={timingChoice === o.value}
                  onSelect={() => selectQuizAnswer("timing_choice", o.label, () => setTimingChoice(o.value))}
                />
              ))}
            </div>
          ) : null}

          {stepId === "independence" ? (
            <div className="fn-choice-grid">
              {INDEPENDENCE_OPTIONS.map((o) => (
                <ChoiceCard
                  key={o.value}
                  label={o.label}
                  description={o.description}
                  selected={form.independencePreference === o.value}
                  onSelect={() => patch({ independencePreference: o.value })}
                />
              ))}
            </div>
          ) : null}
            </FunnelStepShell>
        </div>
      </div>
    </main>
  );
}
