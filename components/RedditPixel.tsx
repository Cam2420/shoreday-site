"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackRedditPageVisit } from "@/lib/reddit-pixel";

export default function RedditPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) trackRedditPageVisit(pathname);
  }, [pathname]);

  return null;
}
