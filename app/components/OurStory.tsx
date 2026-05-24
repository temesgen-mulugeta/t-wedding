"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { story } from "../lib/story";

export default function OurStory() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [revealedIdx, setRevealedIdx] = useState<Set<number>>(new Set());

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          setRevealedIdx((prev) => {
            if (prev.has(idx)) return prev;
            const next = new Set(prev);
            next.add(idx);
            return next;
          });
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="overflow-hidden py-32"
      style={{
        background: "linear-gradient(180deg, var(--color-paper) 0%, var(--color-blush) 100%)",
      }}
    >
      <div className="mx-auto max-w-5xl px-6 text-center mb-16">
        <div
          className="uppercase"
          style={{
            fontFamily: "var(--font-meta)",
            color: "var(--color-seal)",
            fontSize: "11px",
            letterSpacing: "0.4em",
          }}
        >
          our journey
        </div>
        <h2
          className="leading-none mt-2"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-ink)",
            fontSize: "clamp(58px, 9vw, 110px)",
            fontWeight: 400,
          }}
        >
          our story
        </h2>
        <div className="mx-auto mt-5 h-px w-16 bg-[var(--color-gold)]" />
      </div>

      <div className="mx-auto max-w-3xl px-6">
        {story.map((item, i) => {
          const visible = revealedIdx.has(i);
          return (
            <article
              key={`${item.year}-${item.title}`}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              data-idx={i}
              className="relative pb-20 mb-2 last:mb-0 last:pb-0"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 1s ease, transform 1s cubic-bezier(.16,1,.3,1)",
              }}
            >
              {/* Top ornament: tiny burgundy dot + gold rule */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <span
                  className="block h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--color-seal)" }}
                />
                <span
                  className="block h-px w-10"
                  style={{ background: "rgba(184,148,90,0.5)" }}
                />
              </div>

              {/* Year */}
              <div
                className="text-center italic"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-seal)",
                  fontSize: "16px",
                  letterSpacing: "0.04em",
                }}
              >
                {item.year}
              </div>

              {/* Title */}
              <h3
                className="text-center leading-none mt-2 mb-5"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-ink)",
                  fontSize: "clamp(44px, 6vw, 64px)",
                  fontWeight: 400,
                }}
              >
                {item.title}
              </h3>

              {/* Body */}
              <p
                className="mx-auto max-w-[560px] text-center"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-ink-soft)",
                  fontSize: "18px",
                  lineHeight: 1.7,
                }}
              >
                {item.body}
              </p>

              {/* Inline photos */}
              {item.photos && item.photos.length > 0 && (
                <div
                  className={`mx-auto mt-10 grid gap-4 sm:gap-5 ${
                    item.photos.length === 1
                      ? "max-w-[440px] grid-cols-1"
                      : "max-w-[640px] grid-cols-1 sm:grid-cols-2"
                  }`}
                >
                  {item.photos.map((src, p) => (
                    <div
                      key={src}
                      className="overflow-hidden rounded-sm shadow-xl"
                      style={{
                        aspectRatio: "3/4",
                        transitionDelay: `${0.15 + p * 0.1}s`,
                        opacity: visible ? 1 : 0,
                        transform: visible
                          ? "translateY(0) scale(1)"
                          : "translateY(20px) scale(0.97)",
                        transition:
                          "opacity 1.1s ease, transform 1.1s cubic-bezier(.16,1,.3,1)",
                      }}
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, 320px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
