"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-05-26T13:10:00+03:00").getTime();

function diff(now: number) {
  const d = Math.max(0, TARGET - now);
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

const pad = (n: number, w = 2) => String(n).padStart(w, "0");

export default function Countdown() {
  const [t, setT] = useState(() => diff(Date.now()));

  useEffect(() => {
    const id = setInterval(() => setT(diff(Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="px-6 pt-6 pb-20 text-center bg-[var(--color-paper)]">
      <div
        className="uppercase mb-2"
        style={{
          fontFamily: "var(--font-meta)",
          color: "var(--color-gold-deep)",
          fontSize: "11px",
          letterSpacing: "0.4em",
        }}
      >
        the day approaches
      </div>

      <h2
        className="leading-none mb-8"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-ink)",
          fontSize: "clamp(48px, 7vw, 78px)",
          fontWeight: 400,
        }}
      >
        until we say I do
      </h2>

      <div className="mx-auto grid max-w-2xl grid-cols-4 gap-3 sm:gap-4">
        {[
          { v: pad(t.days, 3), l: "days" },
          { v: pad(t.hours), l: "hours" },
          { v: pad(t.minutes), l: "minutes" },
          { v: pad(t.seconds), l: "seconds" },
        ].map((c) => (
          <div
            key={c.l}
            className="rounded-sm border border-[var(--color-gold)]/25 bg-[var(--color-paper-warm)] px-2 pt-5 pb-4"
          >
            <div
              className="tabular leading-none"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--color-ink)",
                fontSize: "clamp(34px, 7vw, 56px)",
                fontWeight: 500,
              }}
            >
              {c.v}
            </div>
            <div
              className="mt-2 uppercase"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-gold-deep)",
                fontSize: "9px",
                letterSpacing: "0.3em",
              }}
            >
              {c.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
