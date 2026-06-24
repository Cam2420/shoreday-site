"use client";

import { useState } from "react";
import ChoiceCard from "@/components/funnel/ChoiceCard";
import EmailGateCard from "@/components/funnel/EmailGateCard";
import ExcursionPreviewSkeleton from "@/components/funnel/ExcursionPreviewSkeleton";
import FunnelProgress from "@/components/funnel/FunnelProgress";
import FunnelStepShell from "@/components/funnel/FunnelStepShell";
import PartialResultCard from "@/components/funnel/PartialResultCard";
import TimeInput from "@/components/funnel/TimeInput";
import { NASSAU_PORT_CONFIG } from "@/data/ports/nassau";
import {
  BUDGET_OPTIONS,
  buildPartialResultView,
  checkEmailGateSubmit,
  EMAIL_GATE_DEV_MESSAGE,
  FUNNEL_STEP_IDS,
  FUNNEL_STEP_TITLES,
  INDEPENDENCE_OPTIONS,
  INTEREST_OPTIONS,
  initialConsentState,
  initialFormState,
  isStepComplete,
  MAX_INTERESTS,
  PLANNING_DISCLAIMER,
  toggleInterest,
  TRAVELER_GROUP_OPTIONS,
  type ConsentState,
  type PlanFormState,
} from "@/lib/funnel-plan";
import { validatePortMathInput } from "@/lib/funnel-validation";
import { computePortMath } from "@/lib/port-math";
import type { PortMathResult } from "@/types/funnel";

export default function PlanBuilder() {
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<"wizard" | "result">("wizard");
  const [form, setForm] = useState<PlanFormState>(initialFormState);
  const [result, setResult] = useState<PortMathResult | null>(null);
  const [consent, setConsent] = useState<ConsentState>(initialConsentState);
  const [submitted, setSubmitted] = useState(false);
  const [gateError, setGateError] = useState<string | undefined>(undefined);

  const stepId = FUNNEL_STEP_IDS[stepIndex];
  const stepComplete = isStepComplete(stepId, form);
  const isLastStep = stepIndex === FUNNEL_STEP_IDS.length - 1;

  function patch(p: Partial<PlanFormState>) {
    setForm((f) => ({ ...f, ...p }));
  }

  function handleContinue() {
    if (!stepComplete) return;
    if (isLastStep) {
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
      return;
    }
    setStepIndex((i) => i + 1);
  }

  function handleBack() {
    setStepIndex((i) => Math.max(0, i - 1));
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
    setSubmitted(true); // dev-only state — no network, no Kit, no Firebase.
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
    return (
      <main className="nassau-plan">
        <div className="np-shell">
          <h1 className="np-h1">Your Nassau timing</h1>
          <PartialResultCard view={view} disclaimer={PLANNING_DISCLAIMER} />

          {view.valid ? (
            <>
              <section className="np-locked" aria-label="Your full plan preview">
                <h2 className="np-locked-h">Your full plan also includes</h2>

                {/* 1 → 2: basic day structure tease (no specific times revealed yet) */}
                <ol className="np-dayshape">
                  <li>
                    <span className="np-dayshape-k">Step ashore</span> get oriented near
                    the pier
                  </li>
                  <li>
                    <span className="np-dayshape-k">One main activity</span> chosen to fit
                    your window
                  </li>
                  <li>
                    <span className="np-dayshape-k">Head back</span> with your return buffer
                    built in
                  </li>
                </ol>

                {/* 3: excursion recommendations (neutral skeleton only) */}
                <h3 className="np-locked-sub">Excursion matches</h3>
                <ExcursionPreviewSkeleton />

                {/* 4: app-download upsell — intentionally AFTER excursions */}
                <div className="np-app-upsell">
                  <p className="np-app-upsell-k">Want to go deeper on port day?</p>
                  <p>
                    The ShoreDay app builds your full day and keeps your all-aboard time
                    front and center. App options appear here after your excursion matches.
                  </p>
                </div>
              </section>

              <EmailGateCard
                email={consent.email}
                marketingConsent={consent.marketingConsent}
                onEmailChange={(email) => setConsent((c) => ({ ...c, email }))}
                onMarketingToggle={(marketingConsent) =>
                  setConsent((c) => ({ ...c, marketingConsent }))
                }
                onSubmit={handleGateSubmit}
                submitted={submitted}
                devMessage={EMAIL_GATE_DEV_MESSAGE}
                error={gateError}
              />
            </>
          ) : null}

          <button type="button" className="fn-btn fn-btn-ghost np-restart" onClick={restart}>
            Start over
          </button>
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
          continueDisabled={!stepComplete}
          showBack={stepIndex > 0}
        >
          {stepId === "basics" ? (
            <div className="fn-stack">
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
                </label>
                <input
                  id="np-date"
                  type="date"
                  className="fn-input"
                  value={form.portDate}
                  onChange={(e) => patch({ portDate: e.target.value })}
                />
              </div>
              <TimeInput
                id="np-stepoff"
                label="When do you expect to step off the ship?"
                value={form.expectedStepOffTime}
                onChange={(v) => patch({ expectedStepOffTime: v })}
                hint="Local Nassau time"
              />
              <TimeInput
                id="np-allaboard"
                label="Your all-aboard time"
                value={form.allAboardTime}
                onChange={(v) => patch({ allAboardTime: v })}
                hint="The passenger all-aboard time — not the ship's departure time"
              />
              <label className="fn-checkbox">
                <input
                  type="checkbox"
                  checked={form.allAboardConfirmed}
                  onChange={(e) => patch({ allAboardConfirmed: e.target.checked })}
                />
                <span>
                  I entered the all-aboard time from my cruise app or daily planner, not
                  the scheduled departure time.
                </span>
              </label>
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
