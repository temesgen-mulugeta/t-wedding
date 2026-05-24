"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useParallax } from "../lib/useParallax";
import { dayTimeline } from "../lib/timeline";
import { photos } from "../lib/photos";

export default function TheDay() {
  const bgRef = useParallax<HTMLDivElement>(0.25);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    rowRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden px-6 py-40 text-[var(--color-paper)]"
      style={{ background: "var(--color-forest)" }}
    >
      <div
        ref={bgRef}
        className="absolute inset-[-15%] will-change-transform"
        style={{ transform: "translate3d(0, var(--parallax, 0), 0)" }}
      >
        <Image
          src={photos.dayBackdrop}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, var(--color-forest) 0%, rgba(42,58,37,0.7) 30%, rgba(42,58,37,0.7) 70%, var(--color-forest) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <div
            className="uppercase"
            style={{
              fontFamily: "var(--font-meta)",
              color: "var(--color-gold)",
              fontSize: "11px",
              letterSpacing: "0.4em",
            }}
          >
            programme
          </div>
          <h2
            className="leading-none mt-2"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(58px, 9vw, 110px)",
              fontWeight: 400,
            }}
          >
            the day
          </h2>
          <div className="mx-auto mt-5 h-px w-16 bg-[var(--color-gold)]" />
        </div>

        <div className="ml-4 flex flex-col border-l border-[var(--color-gold)]/40 pl-7">
          {dayTimeline.map((row, i) => (
            <div
              key={row.time + row.title}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="day-row relative flex items-center gap-5 py-5"
              style={{
                opacity: 0,
                transform: "translateX(30px)",
                transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(.16,1,.3,1)",
                transitionDelay: `${i * 0.08}s`,
              }}
            >
              <span
                className="absolute -left-[34px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[var(--color-gold)]"
                style={{
                  boxShadow:
                    "0 0 0 4px var(--color-forest), 0 0 14px rgba(184,148,90,0.65)",
                }}
              />
              <div
                className="leading-none shrink-0"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-gold)",
                  fontSize: "clamp(22px, 3vw, 30px)",
                  fontWeight: 500,
                  width: 96,
                }}
              >
                {row.time}
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--color-paper)",
                    fontSize: "clamp(18px, 2.2vw, 24px)",
                    fontWeight: 500,
                  }}
                >
                  {row.title}
                </h4>
                <p className="italic text-[var(--color-paper)]/65" style={{ fontSize: "14px" }}>
                  {row.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .day-row.in {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>
    </section>
  );
}
