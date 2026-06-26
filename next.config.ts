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
