"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "landing" | "playing" | "blending" | "done";

const PLAYBACK_RATE = 1.5;

export default function EnvelopeCover() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [phase, setPhase] = useState<Phase>("landing");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduced) {
      // Honor reduced-motion: skip the intro entirely
      return;
    }
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Schedule a safety fallback once the video starts playing, in case
  // `ended` doesn't fire (the file's metadata reports the wrong duration).
  useEffect(() => {
    if (phase !== "playing") return;
    const v = videoRef.current;
    if (!v) return;

    const total =
      Number.isFinite(v.duration) && v.duration > 0.5 ? v.duration : 11;
    // Account for playback rate when scheduling the safety net
    const id = setTimeout(handleEnded, Math.ceil((total / PLAYBACK_RATE) * 1000) + 400);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const handleEnter = () => {
    if (phase !== "landing") return;
    setPhase("playing");
    // play() must be called inside a user gesture; this is one
    requestAnimationFrame(() => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = true;
      v.playbackRate = PLAYBACK_RATE;
      v.play().catch(() => {
        // If play still fails, just blend straight to the page
        handleEnded();
      });
    });
  };

  const handleEnded = () => {
    setPhase((p) => {
      if (p !== "playing") return p;
      // Signal the hero to start its entrance animations in sync
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("intro-blend-start"));
      }
      return "blending";
    });
    setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 1600);
  };

  if (!mounted || phase === "done") return null;

  return (
    <div
      data-envelope-cover
      className="fixed inset-0 z-50 select-none"
      style={{
        background: "#1a1410",
        opacity: phase === "blending" ? 0 : 1,
        transition: "opacity 1500ms cubic-bezier(.4,0,.2,1)",
        pointerEvents: phase === "blending" ? "none" : "auto",
      }}
    >
      {/* === LANDING === */}
      {phase === "landing" && (
        <button
          type="button"
          onClick={handleEnter}
          aria-label="Click to enter"
          className="absolute inset-0 flex w-full flex-col items-center justify-center text-center cursor-pointer overflow-hidden"
          style={{
            backgroundImage: "url('/video/intro-poster.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "none",
            color: "rgba(255,235,210,0.92)",
            padding: "0 24px",
          }}
        >
          {/* Dark scrim for text readability over the cream poster */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(26,20,16,0.55) 0%, rgba(26,20,16,0.78) 35%, rgba(26,20,16,0.85) 65%, rgba(26,20,16,0.55) 100%)",
            }}
          />
          {/* Slight vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)",
            }}
          />
          {/* Inner wrapper so content sits above the scrim */}
          <div className="relative z-10 flex w-full flex-col items-center">
          {/* Decorative top ornament */}
          <div
            className="flex items-center gap-4 mb-10"
            style={{
              opacity: 0,
              animation: "fadeUp 1.2s ease 0.2s forwards",
            }}
          >
            <span
              className="block h-px w-12"
              style={{ background: "rgba(184,148,90,0.5)" }}
            />
            <span
              className="text-[var(--color-gold)]"
              style={{ fontFamily: "var(--font-display)", fontSize: "32px", lineHeight: 1 }}
            >
              T&amp;A
            </span>
            <span
              className="block h-px w-12"
              style={{ background: "rgba(184,148,90,0.5)" }}
            />
          </div>

          {/* Kicker */}
          <div
            className="uppercase mb-4"
            style={{
              fontFamily: "var(--font-meta)",
              fontSize: "11px",
              letterSpacing: "0.45em",
              color: "var(--color-gold)",
              opacity: 0,
              animation: "fadeUp 1.2s ease 0.5s forwards",
            }}
          >
            together with our families
          </div>

          {/* You're invited */}
          <h1
            className="leading-none"
            style={{
              fontFamily: "var(--font-display)",
              color: "#f4ebd9",
              fontSize: "clamp(72px, 13vw, 160px)",
              margin: "0 0 18px",
              fontWeight: 400,
              opacity: 0,
              animation: "fadeUp 1.6s cubic-bezier(.16,1,.3,1) 0.7s forwards",
              textShadow: "0 4px 30px rgba(0,0,0,0.4)",
            }}
          >
            you&rsquo;re invited
          </h1>

          {/* Gold rule */}
          <div
            className="mx-auto h-px w-16 mb-5"
            style={{
              background: "var(--color-gold)",
              opacity: 0,
              animation: "fadeIn 1.2s ease 1.1s forwards",
            }}
          />

          {/* Couple names */}
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(20px, 2.4vw, 26px)",
              color: "rgba(244,235,217,0.92)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              opacity: 0,
              animation: "fadeUp 1.2s ease 1.3s forwards",
            }}
          >
            Tettemqe &amp; Abigiya
          </div>

          {/* Date */}
          <div
            className="uppercase mt-3"
            style={{
              fontFamily: "var(--font-meta)",
              fontSize: "11px",
              letterSpacing: "0.4em",
              color: "rgba(244,235,217,0.7)",
              opacity: 0,
              animation: "fadeUp 1.2s ease 1.5s forwards",
            }}
          >
            26 &middot; may &middot; 2026
          </div>

          </div>

          {/* Click to enter — pulsing CTA at bottom */}
          <div
            className="absolute left-1/2 -translate-x-1/2 z-10"
            style={{
              bottom: "11vh",
              opacity: 0,
              animation: "fadeUp 1.4s ease 1.9s forwards",
            }}
          >
            <div
              className="flex items-center gap-3 rounded-full px-7 py-3.5"
              style={{
                border: "1px solid rgba(184,148,90,0.6)",
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(6px)",
              }}
            >
              <span
                className="uppercase"
                style={{
                  fontFamily: "var(--font-meta)",
                  fontSize: "11px",
                  letterSpacing: "0.4em",
                  color: "var(--color-gold)",
                }}
              >
                click to enter
              </span>
              <span
                style={{
                  color: "var(--color-gold)",
                  fontSize: "13px",
                  animation: "arrowPulse 1.8s ease-in-out infinite",
                  display: "inline-block",
                }}
              >
                →
              </span>
            </div>
          </div>

          <style jsx>{`
            @keyframes arrowPulse {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(6px); }
            }
            @keyframes washBloom {
              0% { opacity: 0; transform: scale(0.92); }
              45% { opacity: 1; transform: scale(1); }
              100% { opacity: 0; transform: scale(1.06); }
            }
          `}</style>
        </button>
      )}

      {/* === VIDEO === */}
      {(phase === "playing" || phase === "blending") && (
        <>
          <video
            ref={videoRef}
            src="/video/intro.mp4"
            poster="/video/intro-poster.jpg"
            className="absolute inset-0 h-full w-full"
            style={{
              objectFit: "cover",
              transform: phase === "blending" ? "scale(1.18)" : "scale(1)",
              filter: phase === "blending" ? "blur(8px) brightness(1.15)" : "blur(0) brightness(1)",
              transition:
                "transform 1700ms cubic-bezier(.22,.61,.36,1), filter 1500ms cubic-bezier(.4,0,.2,1)",
            }}
            muted
            playsInline
            preload="auto"
            onEnded={handleEnded}
          />

          {/* Warm vignette to blend video edges (faded during blend) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 55%, rgba(26,20,16,0.55) 100%)",
              opacity: phase === "blending" ? 0 : 1,
              transition: "opacity 900ms ease",
            }}
          />

          {/* Cream "light wash" — blooms during the blend so it feels like
              the envelope opens into a doorway of light */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 55%, rgba(244,235,217,0.55) 0%, rgba(244,235,217,0.25) 35%, transparent 70%)",
              opacity: phase === "blending" ? 1 : 0,
              transition: "opacity 1300ms cubic-bezier(.4,0,.2,1)",
              mixBlendMode: "screen",
              animation: phase === "blending" ? "washBloom 1500ms ease-out" : "none",
            }}
          />

          {/* Skip while video plays */}
          <button
            type="button"
            onClick={handleEnded}
            className="absolute top-5 right-5 z-20 rounded-full px-4 py-2 backdrop-blur-sm transition-opacity"
            style={{
              fontFamily: "var(--font-meta)",
              fontSize: "10px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,235,210,0.85)",
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,235,210,0.25)",
              opacity: phase === "playing" ? 1 : 0,
            }}
            aria-label="Skip intro"
          >
            skip
          </button>
        </>
      )}
    </div>
  );
}
