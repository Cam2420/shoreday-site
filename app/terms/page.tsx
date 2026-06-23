import type { Metadata } from "next";
import "../legal.css";

export const metadata: Metadata = {
  title: { absolute: "ShoreDay – Terms of Service" },
  description:
    "The Terms of Service governing your use of the ShoreDay app by VMAManagement LLC.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "ShoreDay – Terms of Service",
    description:
      "The Terms of Service governing your use of the ShoreDay app by VMAManagement LLC.",
    url: "/terms",
    siteName: "ShoreDay",
    type: "website",
  },
};

export default function TermsOfService() {
  return (
    <main className="legal">
      <h1>ShoreDay Terms of Service</h1>
      <p>
        <strong>Last Updated: April 22, 2026</strong>
      </p>
      <p>
        <strong>Effective Date: April 22, 2026</strong>
      </p>

      <h2>1. Agreement to Terms</h2>
      <p>
        By downloading, installing, or using ShoreDay (&quot;the App&quot;), you
        agree to be bound by these Terms of Service (&quot;Terms&quot;). These
        Terms constitute a legally binding agreement between you and VMAManagement
        LLC, a Florida limited liability company (&quot;we,&quot; &quot;us,&quot;
        or &quot;Company&quot;). If you do not agree to these Terms, do not use the
        App.
      </p>

      <h2>2. Description of Service</h2>
      <p>
        ShoreDay is an AI-powered mobile application that generates personalized,
        single-day cruise port itineraries for tourists visiting ports in the
        Bahamas. The App uses the Google Gemini API to produce AI-generated
        itinerary recommendations and chat concierge responses, and the Google
        Maps/Places API for location-based mapping and venue data. All itinerary
        content is generated algorithmically and is provided for informational and
        entertainment purposes only.
      </p>

      <h2>3. Eligibility</h2>
      <p>
        You must be at least 18 years of age to use the App. By using the App, you
        represent and warrant that you meet this age requirement and that you have
        the legal capacity to enter into these Terms.
      </p>

      <h2>4. Purchases, Subscriptions &amp; Auto-Renewal</h2>
      <p>
        <strong>4.1 Purchases Required</strong>
        <br />
        Access to ShoreDay&apos;s premium features, including AI-generated
        itineraries, offline maps, and the AI concierge, requires a paid purchase.
        While limited browsing features may be available for free, a purchase is
        required to unlock the App&apos;s full functionality.
      </p>
      <p>
        <strong>4.2 Pricing</strong>
        <br />
        The App offers two purchase options: a single-use Port Pass for $9.99 USD,
        and a Premium Yearly Subscription for $19.99 USD per year (the
        &quot;Subscription Fee&quot;). Prices are subject to change with advance
        notice.
      </p>
      <p>
        <strong>
          4.3 Auto-Renewal — Required Apple App Store &amp; Google Play Disclosure
        </strong>
        <br />
        IMPORTANT — PLEASE READ CAREFULLY:
        <br />
        The Port Pass is a one-time, non-renewing purchase. However, if you choose
        the Premium Yearly Subscription, your subscription automatically renews at
        the end of each annual billing period unless you cancel at least 24 hours
        before the end of the current period. Your Apple ID or Google Play account
        will be charged the Subscription Fee within 24 hours prior to the end of
        the current billing period. Subscriptions are managed by and billed through
        your Apple App Store or Google Play account, not directly by VMAManagement
        LLC. You may manage and cancel your subscription at any time by going to
        your Account Settings in the App Store or Google Play Store. No refunds will
        be provided for the unused portion of a subscription period, except where
        required by applicable law.
      </p>
      <p>
        <strong>4.4 Cancellation</strong>
        <br />
        Cancellation of the Premium Yearly Subscription takes effect at the end of
        the current annual billing period. You will retain access to the App until
        the end of the period for which you have already paid.
      </p>
      <p>
        <strong>4.5 Price Changes</strong>
        <br />
        We reserve the right to change the Subscription Fee. We will provide
        reasonable advance notice of any price change. Your continued use of the App
        after the price change takes effect constitutes acceptance of the new price.
      </p>

      <h2>5. Travel Liability Waiver — PLEASE READ CAREFULLY</h2>
      <p>
        <strong>5.1 Assumption of Risk</strong>
        <br />
        USE OF SHOREDAY FOR TRAVEL PLANNING IS ENTIRELY AT YOUR OWN RISK. Travel in
        foreign countries involves inherent risks including, but not limited to,
        personal injury, illness, property loss, and financial loss.
      </p>
      <p>
        <strong>5.2 Cruise Ship Departure — Critical Disclaimer</strong>
        <br />
        VMAMANAGEMENT LLC ASSUMES ABSOLUTELY ZERO LIABILITY FOR MISSED CRUISE SHIPS,
        MISSED DEPARTURE TIMES, OR ANY CONSEQUENCES THEREOF. You are solely and
        exclusively responsible for:
      </p>
      <ul>
        <li>Knowing and monitoring your cruise ship&apos;s departure time</li>
        <li>Managing your own time while ashore</li>
        <li>Returning to your ship before the posted all-aboard time</li>
        <li>
          Accounting for transportation time from any venue back to the cruise port
        </li>
        <li>
          Any and all costs, losses, or consequences resulting from failing to
          reboard your ship
        </li>
      </ul>
      <p>
        Departure times, all-aboard times, and port schedules displayed or
        referenced in the App are provided for general informational purposes only
        and may not reflect real-time changes made by cruise lines or port
        authorities. Always confirm your ship&apos;s departure time directly with
        your cruise line.
      </p>
      <p>
        <strong>5.3 Venue and Excursion Responsibility</strong>
        <br />
        You are solely responsible for independently verifying all details of any
        venue, activity, or excursion recommended by the App, including but not
        limited to: operating hours, current pricing, safety conditions, age
        restrictions, physical requirements, booking requirements, and legal status.
        VMAManagement LLC does not endorse, book, operate, or guarantee any venue,
        business, tour operator, or activity referenced in the App.
      </p>
      <p>
        <strong>5.4 Limitation of Liability</strong>
        <br />
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, VMAMANAGEMENT LLC, ITS
        OFFICERS, MEMBERS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY DIRECT,
        INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING
        FROM YOUR USE OF THE APP OR RELIANCE ON ITS CONTENT, INCLUDING WITHOUT
        LIMITATION: MISSED SHIPS, TRAVEL DELAYS, PERSONAL INJURY, PROPERTY DAMAGE,
        FINANCIAL LOSS, OR ANY OTHER DAMAGES, EVEN IF VMAMANAGEMENT LLC HAS BEEN
        ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
      </p>

      <h2>6. AI-Generated Content Disclaimer</h2>
      <p>
        <strong>6.1 Nature of AI Content</strong>
        <br />
        The itineraries, recommendations, chat responses, and other content
        generated by the App are produced by artificial intelligence models,
        specifically Google&apos;s Gemini API. AI-generated content is inherently
        subject to errors, inaccuracies, omissions, and &quot;hallucinations&quot;
        (plausible-sounding but factually incorrect outputs).
      </p>
      <p>
        <strong>6.2 No Guarantees</strong>
        <br />
        VMAMANAGEMENT LLC MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND
        regarding the accuracy, completeness, reliability, currentness, or fitness
        for any particular purpose of any AI-generated content, including but not
        limited to: Venue operating hours, Admission prices or costs, Physical safety
        of routes or activities, Availability of services, Legal status of activities
        in the Bahamas, Travel times or distances.
      </p>
      <p>
        <strong>6.3 Independent Verification Required</strong>
        <br />
        You should independently verify all AI-generated recommendations before
        acting on them. The App is a planning aid only — not a substitute for your
        own judgment, official tourism resources, or advice from qualified travel
        professionals.
      </p>

      <h2>7. Third-Party Services</h2>
      <p>
        <strong>7.1 Acknowledgment</strong>
        <br />
        The App relies on third-party services to function, including: Google Gemini
        API (AI itinerary and chat generation), Google Maps / Places API (Mapping and
        location data), Adapty (Subscription and payment management), Firebase
        (Authentication, data storage, analytics, and feature configuration), and
        Viator (a TripAdvisor company, for excursion listings and bookings).
      </p>
      <p>
        <strong>7.2 No Liability for Third-Party Services</strong>
        <br />
        VMAManagement LLC is not responsible for the availability, accuracy,
        security, or performance of any third-party service. Downtime, errors, or
        failures of any third-party API may affect your ability to use the App. You
        agree that VMAManagement LLC shall have no liability for any interruption,
        loss of data, or damage arising from third-party service failures.
      </p>
      <p>
        <strong>7.3 Third-Party Terms</strong>
        <br />
        Your use of third-party services through the App is also subject to those
        third parties&apos; own terms of service and privacy policies. We encourage
        you to review them:
        <br />
        Google Terms of Service:{" "}
        <a href="https://policies.google.com/terms">https://policies.google.com/terms</a>
        <br />
        Adapty Terms: <a href="https://adapty.io/terms/">https://adapty.io/terms/</a>
        <br />
        Viator Terms:{" "}
        <a href="https://www.viator.com/support/legal">
          https://www.viator.com/support/legal
        </a>
      </p>
      <p>
        <strong>7.4 Cloud Data Liability</strong>
        <br />
        IMPORTANT — PLEASE READ CAREFULLY: Although the App allows you to save
        itineraries, favorite spots, and other user content using third-party cloud
        services (specifically Cloud Firestore), VMAManagement LLC does not guarantee
        the continuous availability, integrity, or permanent security of this saved
        data. VMAManagement LLC is not liable for any data loss, corruption, downtime,
        or inability to access your saved information resulting from technical
        failures, database outages, or issues stemming from Firebase, Cloud Firestore,
        or any other third-party service failures. YOU AGREE THAT VMAMANAGEMENT LLC IS
        NOT RESPONSIBLE FOR ANY LOST VACATION PLANS, ITINERARIES, OR DATA STORED IN THE
        APP.
      </p>
      <p>
        <strong>7.5 Excursion Bookings and Affiliate Relationships</strong>
        <br />
        The App displays excursion options supplied by third-party travel providers,
        including Viator (a TripAdvisor company). When you tap an excursion card, the
        App opens Viator&apos;s website inside an in-app browser, where you may
        complete a booking directly with Viator. Any booking, payment, cancellation,
        refund, complaint, or dispute relating to an excursion is exclusively between
        you and Viator (or the underlying tour operator), and is governed by
        Viator&apos;s own terms of service. VMAManagement LLC does not process
        excursion payments, does not operate any excursions, and makes no
        representations or warranties regarding the quality, safety, accuracy of
        description, availability, or fulfillment of any third-party excursion.
        VMAManagement LLC participates in Viator&apos;s affiliate program and may earn
        a commission when you book an excursion through a link in the App. This
        commission is paid by Viator and does not increase the price you pay.
      </p>

      <h2>8. User Accounts &amp; Security</h2>
      <p>
        <strong>8.1 Account Registration</strong>
        <br />
        To access certain features of the App, including the ability to save
        personalized itineraries and favorite spots to the cloud, you must register
        for a user account using Firebase Authentication. You agree to provide
        accurate, current, and complete information during the registration process,
        including a valid email address.
      </p>
      <p>
        <strong>8.2 Confidentiality and Responsibility</strong>
        <br />
        You are solely responsible for maintaining the confidentiality of your
        account password and are responsible for all activities that occur under your
        account, whether or not you authorized such activities. You agree to notify
        VMAManagement LLC immediately of any unauthorized use of your password or
        account or any other breach of security. VMAManagement LLC is not liable for
        any loss or damage arising from your failure to comply with this security
        obligation.
      </p>
      <p>
        <strong>8.3 Suspension and Termination</strong>
        <br />
        VMAManagement LLC reserves the right, in its sole discretion and without prior
        notice, to suspend or terminate your account and refuse any and all current or
        future use of the App or any portion thereof if we believe you have violated
        these Terms, including but not limited to any provisions regarding prohibited
        conduct or account security.
      </p>

      <h2>9. Intellectual Property</h2>
      <p>
        All content, design, code, branding, and materials in the App are the
        exclusive property of VMAManagement LLC or its licensors. You may not copy,
        reproduce, distribute, or create derivative works from any App content without
        our express written permission.
      </p>

      <h2>10. Prohibited Conduct</h2>
      <p>
        You agree not to: Use the App for any unlawful purpose; Attempt to
        reverse-engineer, decompile, or disassemble the App; Circumvent any
        subscription access controls or paywalls; Use the App to collect data on other
        users; Transmit any malicious code, viruses, or harmful content through the
        App.
      </p>

      <h2>11. Disclaimer of Warranties</h2>
      <p>
        THE APP IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT
        WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
        IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
        NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE APP WILL BE UNINTERRUPTED,
        ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
      </p>

      <h2>12. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless VMAManagement LLC, its
        officers, members, employees, and agents from any claims, damages, losses,
        liabilities, costs, and expenses (including reasonable attorneys&apos; fees)
        arising from: (a) your use of the App; (b) your violation of these Terms; (c)
        your violation of any third-party rights; or (d) any travel decisions you make
        based on App content.
      </p>

      <h2>13. Governing Law &amp; Dispute Resolution</h2>
      <p>
        These Terms are governed by and construed in accordance with the laws of the
        State of Florida, USA, without regard to its conflict of law principles. Any
        dispute arising from these Terms or your use of the App shall be resolved
        exclusively in the state or federal courts located in Florida. You consent to
        the personal jurisdiction of such courts.
      </p>

      <h2>14. Changes to These Terms</h2>
      <p>
        We reserve the right to update these Terms at any time. We will notify you of
        material changes by updating the &quot;Last Updated&quot; date above or by
        in-app notification. Your continued use of the App after changes take effect
        constitutes acceptance of the revised Terms.
      </p>

      <h2>15. Contact</h2>
      <p>
        For questions about these Terms, contact:
        <br />
        VMAManagement LLC
        <br />
        Email: support@shoredayapp.com
      </p>
    </main>
  );
}
