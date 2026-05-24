"use client";

import { useScrollReveal } from "../lib/useScrollReveal";

export default function Invitation() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="px-6 pt-20 pb-10 text-center"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, var(--color-paper-warm), var(--color-paper) 70%)",
      }}
    >
      <div
        className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #b13d3d, var(--color-seal) 50%, var(--color-seal-dark) 90%)",
          boxShadow:
            "inset -6px -6px 16px rgba(0,0,0,0.35), inset 4px 4px 14px rgba(255,180,180,0.18), 0 12px 30px rgba(139,41,41,0.35)",
          color: "rgba(255,235,210,0.92)",
          fontFamily: "var(--font-display)",
          fontSize: "46px",
          lineHeight: 1,
          transform: inView ? "scale(1) rotate(-4deg)" : "scale(0.7) rotate(-8deg)",
          transition: "transform 1.2s cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        <span className="relative" style={{ paddingTop: "4px" }}>
          T&amp;A
          <span
            className="absolute inset-1 rounded-full"
            style={{ border: "1px dashed rgba(255,235,210,0.4)" }}
          />
        </span>
      </div>

      <div
        className="uppercase"
        style={{
          fontFamily: "var(--font-meta)",
          color: "var(--color-seal)",
          fontSize: "11px",
          letterSpacing: "0.4em",
        }}
      >
        together with our families
      </div>

      <h2
        className="leading-none"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-ink)",
          fontSize: "clamp(72px, 13vw, 150px)",
          margin: "8px 0 4px",
          fontWeight: 400,
        }}
      >
        you are invited
      </h2>

      <div className="mx-auto mt-4 mb-5 h-px w-14 bg-[var(--color-gold)]" />

      <div
        className="uppercase"
        style={{
          fontFamily: "var(--font-meta)",
          color: "var(--color-ink-soft)",
          fontSize: "12px",
          letterSpacing: "0.4em",
        }}
      >
        tuesday &middot; 26 may 2026
      </div>
    </section>
  );
}
