"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { BackToTop } from "@/components/back-to-top";

/** The assistant launcher is always present. Decorative cursor effects and
 * back-to-top controls remain deferred so they do not compete with first paint. */

// Keep the launcher in the initial HTML; only the decorative cursor is idle-loaded.
const AiChatWidget = dynamic(() => import("@/components/ai-chat-widget").then((m) => m.AiChatWidget));

const SiteCursor = dynamic(() => import("@/components/site-cursor").then((m) => m.SiteCursor), {
  ssr: false,
});

const INTERACTIONS = ["pointerdown", "keydown", "touchstart", "scroll", "pointermove"] as const;

function useDeferredMount(idleTimeout = 2500) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    let cancelled = false;
    const activate = () => {
      if (!cancelled) setReady(true);
    };

    for (const event of INTERACTIONS) {
      window.addEventListener(event, activate, { once: true, passive: true });
    }

    const supportsIdle = typeof window.requestIdleCallback === "function";
    const handle = supportsIdle
      ? window.requestIdleCallback(activate, { timeout: idleTimeout })
      : window.setTimeout(activate, idleTimeout);

    return () => {
      cancelled = true;
      for (const event of INTERACTIONS) window.removeEventListener(event, activate);
      if (supportsIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, [ready, idleTimeout]);

  return ready;
}

export function DeferredWidgets() {
  const ready = useDeferredMount();

  return (
    <>
      {ready ? <SiteCursor /> : null}
      <AiChatWidget />
      {ready ? <BackToTop /> : null}
    </>
  );
}
