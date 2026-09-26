"use client";

import { useEffect } from "react";
import { PAYMENT_LINK_URL } from "@/lib/checkout";

// Fallback only: bots don't run JavaScript, so this never affects previews.
export default function CheckoutRedirect() {
  useEffect(() => {
    window.location.replace(PAYMENT_LINK_URL);
  }, []);
  return null;
}
