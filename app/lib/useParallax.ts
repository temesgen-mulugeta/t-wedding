"use client";

import { useEffect, useRef } from "react";

/**
 * Drives a parallax offset on the element via the --parallax CSS variable.
 * Positive speed means element moves slower than scroll (recedes into the distance).
 * 0 = locked. 0.4 = subtle. 0.7 = pronounced. Negative = moves faster than scroll.
 *
 * The element is offset relative to its own viewport position so the effect
 * is centered on the section, not the page top.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.4) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let ticking = false;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // distance from viewport center to element center, in px
      const elCenter = rect.top + rect.height / 2;
      const fromCenter = elCenter - viewportH / 2;
      const offset = -fromCenter * speed;
      el.style.setProperty("--parallax", `${offset.toFixed(2)}px`);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        raf = requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return ref;
}
