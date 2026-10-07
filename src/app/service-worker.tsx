"use client";

import { useEffect } from "react";

/**
 * Registers `/sw.js` so the app shell loads with no connection (home-screen
 * PWA in a basement or on a plane). Production only: in dev it instead removes
 * any worker left over from a local production build, which would otherwise
 * serve stale chunks to `next dev` on the same origin.
 */
export function ServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Registration failing just means no offline support this session.
      });
    } else {
      navigator.serviceWorker.getRegistrations().then(regs => {
        regs.forEach(reg => reg.unregister());
      });
    }
  }, []);
  return null;
}
