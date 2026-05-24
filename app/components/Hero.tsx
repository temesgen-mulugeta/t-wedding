"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParallax } from "../lib/useParallax";
import { photos } from "../lib/photos";

export default function Hero() {
  const bgRef = useParallax<HTMLDivElement>(0.35);
  const contentRef = useParallax<HTMLDivElement>(-0.15);
  const cueRef = useParallax<HTMLDivElement>(-0.4);
  const [revealed, setRevealed] = useState(false);

  // If the envelope cover is mounted, defer hero animations until it
  // signals the blend; otherwise reveal immediately (reduced-motion users
  // or when the cover has already finished).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const cover = document.querySelector("[data-envelope-cover]");
    if (!cover) {
      setRevealed(true);
      return;
    }
    const onBlend = () => setRevealed(true);
    window.addEventListener("intro-blend-start", onBlend, { once: true });
    // Safety net — if the event somehow never fires, reveal after a max wait
    const safety = setTimeout(() => setRevealed(true), 30_000);
    return () => {
      window.removeEventListener("intro-blend-start", onBlend);
      clearTimeout(safety);
    };
  }, []);

  // While not revealed, animations sit at their initial (hidden) state.
  // Once revealed, swap to the forwards animations.
  const animState = (delay: string, duration = "1.4s", curve = "ease") =>
    revealed
      ? { animation: `fadeUp ${duration} ${curve} ${delay} forwards` }
      : { opacity: 0, transform: "translateY(28px)" };

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden text-white bg-black">
      <div
        ref={bgRef}
        className="absolute inset-x-[-12%] -top-[18%] -bottom-[6%] will-change-transform"
        style={{
          transform: "translate3d(0, var(--parallax, 0), 0)",
          opacity: revealed ? 1 : 0,
          transition: "opacity 1400ms ease",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            animation: revealed
              ? "kenburns 22s ease-in-out infinite alternate"
              : "none",
            transform: revealed ? "scale(1.08)" : "scale(1.18)",
            transition: "transform 1800ms cubic-bezier(.22,.61,.36,1)",
          }}
        >
          <Image
            src={photos.hero}
            alt="Abigiya and Tetemek"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 20%" }}
          />
        </div>
      </div>

      {/* Soft top scrim */}
      <div
        className="absolute inset-x-0 top-0 h-1/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 100%)",
          opacity: revealed ? 1 : 0,
          transition: "opacity 1400ms ease",
        }}
      />

      {/* Heavy bottom gradient — fades to solid black so text reads cleanly */}
      <div
        className="absolute inset-x-0 bottom-0 h-[65%] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.35) 25%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.97) 78%, #000 100%)",
          opacity: revealed ? 1 : 0,
          transition: "opacity 1400ms ease",
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-end text-center px-8 sm:px-12 pb-20 sm:pb-24 will-change-transform max-w-full"
        style={{ transform: "translate3d(0, var(--parallax, 0), 0)" }}
      >
        <div
          className="uppercase text-white/90"
          style={{
            fontFamily: "var(--font-meta)",
            fontSize: "11px",
            letterSpacing: "0.45em",
            ...animState("0.3s"),
          }}
        >
          we&rsquo;re getting married
        </div>

        <h1
          className="text-white leading-[0.9] my-3 w-full max-w-[1000px]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(54px, 11vw, 150px)",
            textShadow: "0 6px 32px rgba(0,0,0,0.4)",
            wordSpacing: "0.05em",
            fontWeight: 400,
            ...animState("0.6s", "1.8s", "cubic-bezier(.16,1,.3,1)"),
          }}
        >
          <span className="inline-block sm:inline">Abigiya</span>
          <span
            className="italic text-white/85 inline-block"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "0.55em",
              verticalAlign: "0.18em",
              margin: "0 0.18em",
            }}
          >
            &amp;
          </span>
          <span className="inline-block sm:inline">Tetemek</span>
        </h1>

        <div
          className="uppercase text-white/95 mt-4"
          style={{
            fontFamily: "var(--font-meta)",
            fontSize: "13px",
            letterSpacing: "0.5em",
            ...animState("1.1s"),
          }}
        >
          may &middot; twenty-six &middot; mmxxvi
        </div>

        <div
          className="h-10 w-px mt-6 mb-4"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.65), transparent)",
            opacity: revealed ? 1 : 0,
            transition: "opacity 1400ms ease 1.6s",
          }}
        />

        <div
          className="uppercase text-white/80"
          style={{
            fontFamily: "var(--font-meta)",
            fontSize: "11px",
            letterSpacing: "0.35em",
            opacity: revealed ? 1 : 0,
            transition: "opacity 1400ms ease 1.8s",
          }}
        >
          addis ababa &middot; ethiopia
        </div>
      </div>

      <div
        ref={cueRef}
        className="absolute bottom-8 left-1/2 z-10 uppercase text-white/75 will-change-transform"
        style={{
          fontFamily: "var(--font-meta)",
          fontSize: "10px",
          letterSpacing: "0.4em",
          transform: "translate3d(-50%, var(--parallax, 0), 0)",
          animation: revealed
            ? "scrollPulse 2.4s ease 2.4s infinite"
            : "none",
          opacity: revealed ? undefined : 0,
        }}
      >
        scroll
      </div>
    </section>
  );
}
