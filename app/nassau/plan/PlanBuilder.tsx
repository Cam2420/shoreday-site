"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { buildBasicItinerary } from "@/lib/basic-itinerary";
import ChoiceCard from "@/components/funnel/ChoiceCard";
import EmailGateCard from "@/components/funnel/EmailGateCard";
import ExcursionPreviewSkeleton from "@/components/funnel/ExcursionPreviewSkeleton";
import FunnelProgress from "@/components/funnel/FunnelProgress";
import FunnelStepShell from "@/components/funnel/FunnelStepShell";
import PartialResultCard from "@/components/funnel/PartialResultCard";
import TimeInput from "@/components/funnel/TimeInput";
import { NASSAU_ITINERARY_SHAPE, NASSAU_PORT_CONFIG } from "@/data/ports/nassau";
import {
  BUDGET_OPTIONS,
  buildPartialResultView,
  buildPlanPayload,
  checkEmailGateSubmit,
  EMAIL_GATE_DEV_MESSAGE,
  FUNNEL_STEP_IDS,
  FUNNEL_STEP_TITLES,
  INDEPENDENCE_OPTIONS,
  INTEREST_OPTIONS,
  initialConsentState,
  initialFormState,
  isStepComplete,
  LOCKED_TEASER,
  makePlanId,
  MAX_INTERESTS,
  MODE_INTRO,
  partialResultSections,
  PLANNING_DISCLAIMER,
  savePlanPayload,
  shouldClearEmailError,
  toggleInterest,
  TRAVELER_GROUP_OPTIONS,
  validateBasicsStep,
  type BasicsError,
  type ConsentState,
  type PlanFormState,
  type PlannerMode,
} from "@/lib/funnel-plan";
import { validatePortMathInput } from "@/lib/funnel-validation";
import { computePortMath } from "@/lib/port-math";
import type { PortMathResult } from "@/types/funnel";

export default function PlanBuilder({ initialMode = "default" }: { initialMode?: PlannerMode }) {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<"wizard" | "result">("wizard");
  const [form, setForm] = useState<PlanFormState>(initialFormState);
  const [result, setResult] = useState<PortMathResult | null>(null);
  const [consent, setConsent] = useState<ConsentState>(initialConsentState);
  const [submitted, setSubmitted] = useState(false);
  const [gateError, setGateError] = useState<string | undefined>(undefined);
  const [basicsErrors, setBasicsErrors] = useState<BasicsError[]>([]);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const stepId = FUNNEL_STEP_IDS[stepIndex];
  const stepComplete = isStepComplete(stepId, form);
  const isLastStep = stepIndex === FUNNEL_STEP_IDS.length - 1;

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
    setPhase("result");
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
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
      setStepIndex((i) => i + 1);
      return;
    }
    if (!stepComplete) return;
    if (isLastStep) {
      runCalculation();
      return;
    }
    setStepIndex((i) => i + 1);
  }

  function handleBack() {
    setStepIndex((i) => Math.max(0, i - 1));
  }

  // Recovery from the result screen: return to Step 1 with every answer preserved.
  function editTimes() {
    setBasicsErrors([]);
    setStepIndex(0);
    setPhase("wizard");
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }

  function handleGateSubmit() {
    const next: ConsentState = { ...consent, deliveryConsent: true };
    setConsent(next);
    const check = checkEmailGateSubmit(next);
    if (!check.ok) {
      setGateError(
        check.reason === "invalid_email"
          ? "Please enter a valid email address."
          : "Please confirm you'd like your plan emailed.",
      );
      return;
    }
    setGateError(undefined);
    if (!result) return;
    // Local-only prototype unlock: build + store a display-ready payload (no email
    // stored, no network, no Kit, no Firebase, no account), then navigate to the
    // local results route.
    const planId = makePlanId();
    const itinerary = buildBasicItinerary(
      { portMath: result, terminalName: NASSAU_PORT_CONFIG.terminalName },
      NASSAU_ITINERARY_SHAPE,
    );
    savePlanPayload(buildPlanPayload({ planId, mode: initialMode, form, portMath: result, itinerary }));
    router.push(`/nassau/results/${planId}`);
  }

  function restart() {
    setForm(initialFormState());
    setConsent(initialConsentState());
    setResult(null);
    setSubmitted(false);
    setGateError(undefined);
    setStepIndex(0);
    setPhase("wizard");
  }

  if (phase === "result" && result) {
    const view = buildPartialResultView(result);
    const sections = partialResultSections(view);
    return (
      <main className="nassau-plan">
        <div className="np-shell">
          {sections.map((id) => {
            switch (id) {
              case "timing_result":
                return (
                  <div key={id}>
                    <h1 className="np-h1">Your Nassau timing</h1>
                    <PartialResultCard view={view} disclaimer={PLANNING_DISCLAIMER} />
                  </div>
                );
              case "locked_teaser":
                return (
                  <section key={id} className="np-locked" aria-label="Locked plan preview">
                    <span className="np-lock-badge">🔒 Locked preview</span>
                    <h2 className="np-locked-h">{LOCKED_TEASER.heading}</h2>
                    <p className="np-locked-body">{LOCKED_TEASER.body}</p>
                  </section>
                );
              case "excursion_skeleton":
                return <ExcursionPreviewSkeleton key={id} />;
              case "email_gate":
                return (
                  <EmailGateCard
                    key={id}
                    email={consent.email}
                    marketingConsent={consent.marketingConsent}
                    onEmailChange={(email) => {
                      setConsent((c) => ({ ...c, email }));
                      // P1 fix: clear stale error as soon as the value is valid.
                      if (shouldClearEmailError(gateError !== undefined, email)) {
                        setGateError(undefined);
                      }
                    }}
                    onMarketingToggle={(marketingConsent) =>
                      setConsent((c) => ({ ...c, marketingConsent }))
                    }
                    onSubmit={handleGateSubmit}
                    submitted={submitted}
                    devMessage={EMAIL_GATE_DEV_MESSAGE}
                    error={gateError}
                  />
                );
              default:
                return null;
            }
          })}

          <div className="np-recovery">
            <button
              type="button"
              className={`fn-btn ${view.valid ? "fn-btn-ghost" : "fn-btn-primary"}`}
              onClick={editTimes}
            >
              Edit My Times
            </button>
            <button type="button" className="fn-btn fn-btn-ghost" onClick={restart}>
              Start over
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="nassau-plan">
      <div className="np-shell">
        <FunnelProgress current={stepIndex + 1} total={FUNNEL_STEP_IDS.length} />

        <FunnelStepShell
          title={FUNNEL_STEP_TITLES[stepId]}
          onBack={handleBack}
          onContinue={handleContinue}
          continueLabel={isLastStep ? "Calculate my window" : "Continue"}
          continueDisabled={stepId === "basics" ? false : !stepComplete}
          showBack={stepIndex > 0}
        >
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
              {TRAVELER_GROUP_OPTIONS.map((o) => (
                <ChoiceCard
                  key={o.value}
                  label={o.label}
                  description={o.description}
                  selected={form.partyType === o.value}
                  onSelect={() => patch({ partyType: o.value })}
                />
              ))}
            </div>
          ) : null}

          {stepId === "interests" ? (
            <>
              <p className="fn-helper">Choose up to {MAX_INTERESTS}.</p>
              <div className="fn-choice-grid">
                {INTEREST_OPTIONS.map((o) => (
                  <ChoiceCard
                    key={o.value}
                    label={o.label}
                    description={o.description}
                    selected={form.interests.includes(o.value)}
                    onSelect={() => patch({ interests: toggleInterest(form.interests, o.value) })}
                  />
                ))}
              </div>
            </>
          ) : null}

          {stepId === "budget" ? (
            <div className="fn-choice-grid">
              {BUDGET_OPTIONS.map((o) => (
                <ChoiceCard
                  key={o.value}
                  label={o.label}
                  description={o.description}
                  selected={form.budgetPreference === o.value}
                  onSelect={() => patch({ budgetPreference: o.value })}
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
    </main>
  );
}
