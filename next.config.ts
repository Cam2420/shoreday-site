import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dynamic-media.tacdn.com",
      },
      {
        protocol: "https",
        hostname: "media.tacdn.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/privacy.html",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/terms.html",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/nassau-cheat-sheet.html",
        destination: "/nassau-cheat-sheet",
        permanent: true,
      },
      {
        source: "/nassau-survival-card.html",
        destination: "/nassau-survival-card",
        permanent: true,
      },
      // Short social bio links → the Nassau planner, pre-tagged with UTM
      // attribution so TikTok vs Instagram is separable and top-of-funnel
      // arrivals are measurable. `permanent: false` (307): never cached by the
      // browser, so campaign params can be retargeted later without stale hops.
      {
        source: "/tiktok",
        destination:
          "/nassau/plan?utm_source=tiktok&utm_medium=social&utm_campaign=nassau_planner_bio",
        permanent: false,
      },
      {
        source: "/ig",
        destination:
          "/nassau/plan?utm_source=instagram&utm_medium=social&utm_campaign=nassau_planner_bio",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        // Apple App Site Association must be served as JSON without a file
        // extension. This sets the correct Content-Type for the static file
        // located at public/.well-known/apple-app-site-association.
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
};

export default nextConfig;
