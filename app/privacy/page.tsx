import type { Metadata } from "next";
import "../legal.css";

export const metadata: Metadata = {
  title: { absolute: "ShoreDay – Privacy Policy" },
  description:
    "How VMAManagement LLC (ShoreDay) collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "ShoreDay – Privacy Policy",
    description:
      "How VMAManagement LLC (ShoreDay) collects, uses, and protects your personal information.",
    url: "/privacy",
    siteName: "ShoreDay",
    type: "website",
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="legal">
      <h1>ShoreDay Privacy Policy</h1>
      <p>
        <strong>Last Updated: April 22, 2026</strong>
      </p>
      <p>
        This Privacy Notice for VMAManagement LLC (doing business as ShoreDay)
        (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), describes how and
        why we might access, collect, store, use, and/or share
        (&quot;process&quot;) your personal information when you use our services
        (&quot;Services&quot;), including when you:
      </p>
      <ul>
        <li>
          Download and use our mobile application (ShoreDay), or any other
          application of ours that links to this Privacy Notice
        </li>
        <li>
          Use ShoreDay. ShoreDay is an AI-powered cruise day planning app for
          Bahamas port visitors. It generates personalized itineraries, provides
          a map of local venues, and includes an AI chat concierge.
        </li>
        <li>
          Engage with us in other related ways, including any marketing or events
        </li>
      </ul>
      <p>
        Questions or concerns? Reading this Privacy Notice will help you
        understand your privacy rights and choices. We are responsible for making
        decisions about how your personal information is processed. If you do not
        agree with our policies and practices, please do not use our Services. If
        you still have any questions or concerns, please contact us at
        admin242@vmamgmt.com.
      </p>

      <h2>SUMMARY OF KEY POINTS</h2>
      <p>
        <strong>What personal information do we process?</strong> When you visit,
        use, or navigate our Services, we may process personal information
        depending on how you interact with us and the Services, the choices you
        make, and the products and features you use.
      </p>
      <p>
        <strong>Do we process any sensitive personal information?</strong> We do
        not process sensitive personal information.
      </p>
      <p>
        <strong>Do we collect any information from third parties?</strong> We do
        not collect any information from third parties.
      </p>
      <p>
        <strong>How do we process your information?</strong> We process your
        information to provide, improve, and administer our Services, communicate
        with you, for security and fraud prevention, and to comply with law.
      </p>
      <p>
        <strong>
          In what situations and with which parties do we share personal
          information?
        </strong>{" "}
        We may share information in specific situations and with specific third
        parties.
      </p>
      <p>
        <strong>How do we keep your information safe?</strong> We have adequate
        organizational and technical processes and procedures in place to protect
        your personal information.
      </p>

      <h2>1. WHAT INFORMATION DO WE COLLECT?</h2>
      <p>
        <strong>Personal information you disclose to us</strong>
        <br />
        <em>In Short: We collect personal information that you provide to us.</em>
      </p>
      <ul>
        <li>
          <strong>Account and Profile Data.</strong> When you create a free user
          account, we collect Account Credentials (such as your email address and
          securely hashed password), as well as User Content (including favorite
          locations and generated itineraries saved to your profile).
        </li>
        <li>
          <strong>Payment Data.</strong> If you choose to make in-app purchases or
          subscribe to our premium services, your payment is processed directly by
          the Apple App Store or Google Play Store. We use a third-party
          subscription management service, <strong>Adapty</strong>, to validate
          your purchases and unlock features. We do not directly collect or store
          your credit card information. You may find Adapty&apos;s privacy notice
          here: <a href="https://adapty.io/privacy/">https://adapty.io/privacy/</a>.
        </li>
        <li>
          <strong>Application Data.</strong> We automatically collect device
          information (such as your mobile device ID, model, and manufacturer),
          operating system, and IP address.
        </li>
        <li>
          <strong>Location Data.</strong> We collect location data such as
          information about your device&apos;s location to provide mapping
          services. You can opt out by disabling your Location settings on your
          device.
        </li>
      </ul>
      <p>
        <strong>Google API:</strong> Our use of information received from Google
        APIs will adhere to the Google API Services User Data Policy, including the
        Limited Use requirements.
      </p>

      <h2>2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
      <p>
        <em>
          In Short: We process your information to provide, improve, and
          administer our Services, communicate with you, for security and fraud
          prevention, and to comply with law.
        </em>
      </p>
      <ul>
        <li>To deliver and facilitate delivery of services to the user.</li>
        <li>To respond to user inquiries/offer support to users.</li>
        <li>To send administrative information to you.</li>
        <li>To protect our Services (fraud monitoring and prevention).</li>
        <li>To identify usage trends and improve the app.</li>
        <li>
          To send you marketing and promotional communications (if you explicitly
          opt-in).
        </li>
      </ul>

      <h2>3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2>
      <p>
        <em>
          In Short: We only process your personal information when we believe it
          is necessary and we have a valid legal reason to do so under applicable
          law.
        </em>
      </p>
      <p>
        If you are located in the EU, UK, or Canada, we process your information
        based on Consent, Performance of a Contract, Legitimate Interests, or
        Legal Obligations as outlined in the GDPR and PIPEDA.
      </p>

      <h2>4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
      <p>
        We may share your data with third-party vendors who perform services for
        us. The third parties we may share personal information with are as
        follows:
      </p>
      <ul>
        <li>
          <strong>AI Service Providers:</strong> Google Cloud AI (Gemini)
        </li>
        <li>
          <strong>Cloud Computing Services:</strong> Google Cloud Platform
        </li>
        <li>
          <strong>Communicate and Chat with Users:</strong> Firebase Cloud
          Messaging
        </li>
        <li>
          <strong>Functionality and Infrastructure:</strong> Cloud Firestore
        </li>
        <li>
          <strong>Feature Configuration:</strong> Firebase Remote Config
        </li>
        <li>
          <strong>Subscription Management and In-App Purchases:</strong> Adapty,
          Apple App Store, Google Play Store
        </li>
        <li>
          <strong>Usage Analytics:</strong> Firebase Analytics
        </li>
        <li>
          <strong>User Account Registration:</strong> Firebase Authentication
        </li>
        <li>
          <strong>Website Performance Monitoring:</strong> Firebase Crashlytics and
          Firebase Performance Monitoring
        </li>
        <li>
          <strong>Mapping Services:</strong> Google Maps
        </li>
        <li>
          <strong>Travel Bookings and Affiliate Partners:</strong> Viator (a
          TripAdvisor company). When you tap an excursion, we open Viator&apos;s
          website inside our app for booking. Viator operates under its own privacy
          policy, available at{" "}
          <a href="https://www.viator.com/privacy">https://www.viator.com/privacy</a>.
        </li>
      </ul>

      <h2>5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
      <p>
        We may use cookies and similar tracking technologies (like web beacons and
        pixels) to gather information when you interact with our Services, maintain
        security, prevent crashes, and fix bugs.
      </p>

      <h2>6. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</h2>
      <p>
        We offer products powered by artificial intelligence. We use Google Gemini,
        a third-party AI service provided by Google LLC, to generate personalized
        itinerary recommendations. Your trip preferences (port, interests,
        departure time, and companion type) are transmitted to Google&apos;s
        servers to produce this content. All personal information processed using
        our AI Products is handled in line with our Privacy Notice and safeguards
        your personal information.
      </p>

      <h2>7. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</h2>
      <p>
        Our servers are located in the United States. Please be aware that your
        information may be transferred to, stored by, and processed by us in our
        facilities and by third parties in the United States and other countries.
      </p>

      <h2>8. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
      <p>
        We keep your information for as long as necessary to fulfill the purposes
        outlined in this Privacy Notice unless otherwise required by law. When we
        have no ongoing legitimate business need to process your personal
        information, we will either delete or anonymize such information.
      </p>

      <h2>9. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
      <p>
        We have implemented appropriate and reasonable technical and organizational
        security measures designed to protect the security of any personal
        information we process. However, no electronic transmission over the
        Internet can be guaranteed to be 100% secure.
      </p>

      <h2>10. DO WE COLLECT INFORMATION FROM MINORS?</h2>
      <p>
        We do not knowingly collect data from or market to children under 18 years
        of age. If we learn that personal information from users less than 18 years
        of age has been collected, we will deactivate the account and promptly
        delete such data.
      </p>

      <h2>11. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
      <p>
        Depending on your state or country of residence, you have rights that allow
        you greater access to and control over your personal information. You may
        review, change, or terminate your account at any time. If you have
        questions or comments about your privacy rights, you may email us at
        admin242@vmamgmt.com.
      </p>

      <h2>12. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
      <p>
        We do not currently respond to DNT browser signals or any other mechanism
        that automatically communicates your choice not to be tracked online.
      </p>

      <h2>13. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
      <p>
        If you are a resident of California, Colorado, Connecticut, Delaware,
        Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska,
        New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or
        Virginia, you may have the right to request access to and receive details
        about the personal information we maintain about you, correct inaccuracies,
        or delete your personal information.
      </p>

      <h2>14. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
      <p>
        Yes, we will update this notice as necessary to stay compliant with relevant
        laws. The updated version will be indicated by an updated &quot;Revised&quot;
        date at the top of this Privacy Notice.
      </p>

      <h2>15. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
      <p>
        If you have questions or comments about this notice, you may email us at
        admin242@vmamgmt.com or contact us by post at:
        <br />
        VMAManagement LLC
        <br />
        1110 Brickell Ave, Suite 200k-438
        <br />
        Miami, FL 33131
        <br />
        United States
      </p>

      <h2>16. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
      <p>
        Based on the applicable laws of your country or state of residence, you have
        the right to request access to the personal information we collect from you,
        correct inaccuracies, or delete your personal information.{" "}
      </p>
      <p>
        <strong>Account and Data Deletion:</strong> Users have the right to request
        full account and associated data deletion at any time. To request to review,
        update, or delete your personal information, or to initiate full account
        deletion, you may:
      </p>
      <ol>
        <li>
          Use the in-app &quot;Delete Account&quot; feature located in the ShoreDay
          app&apos;s Profile Settings menu, which will automatically and immediately
          delete your account and all associated Firestore data; or
        </li>
        <li>
          Email us directly at <strong>support@shoredayapp.com</strong> with the
          subject line &quot;Account Deletion Request.&quot;
        </li>
      </ol>
    </main>
  );
}
