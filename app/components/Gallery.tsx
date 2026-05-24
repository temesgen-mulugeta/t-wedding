"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// Every shot in this collection is portrait orientation. Using square/wide
// aspect ratios was chopping faces/feet — switching to consistent 3/4 frames
// with photo-aware object-position keeps the full subject visible.
const tiles = [
  { src: "/photos/IMG_0557.JPG", span: "col-span-12 sm:col-span-7", aspect: "aspect-[3/4]", pos: "50% 30%" }, // carry shot — heads upper third
  { src: "/photos/IMG_0543.JPG", span: "col-span-12 sm:col-span-5", aspect: "aspect-[3/4]", pos: "50% 60%" }, // umbrella walk — couple in lower half
  { src: "/photos/IMG_0577.JPG", span: "col-span-6 sm:col-span-4", aspect: "aspect-[3/4]", pos: "50% 50%" }, // porch kiss
  { src: "/photos/IMG_0554.JPG", span: "col-span-6 sm:col-span-4", aspect: "aspect-[3/4]", pos: "50% 30%" }, // close up — faces upper third
  { src: "/photos/IMG_0556.JPG", span: "col-span-12 sm:col-span-4", aspect: "aspect-[3/4]", pos: "50% 30%" }, // back-look — heads upper third
  { src: "/photos/IMG_0581.JPG", span: "col-span-12", aspect: "aspect-[16/10]", pos: "50% 80%" }, // red car — car is in lower half
];

export default function Gallery() {
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      { threshold: 0.15 }
    );
    tileRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-[var(--color-paper)] py-32">
      <div className="mx-auto max-w-5xl px-6 text-center mb-14">
        <div
          className="uppercase"
          style={{
            fontFamily: "var(--font-meta)",
            color: "var(--color-seal)",
            fontSize: "11px",
            letterSpacing: "0.4em",
          }}
        >
          moments
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
          glimpses of us
        </h2>
        <div className="mx-auto mt-5 h-px w-16 bg-[var(--color-gold)]" />
      </div>

      <div className="mx-auto grid max-w-[1300px] grid-cols-12 gap-3 px-6 sm:gap-4">
        {tiles.map((tile, i) => (
          <div
            key={tile.src + i}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            className={`gallery-tile group overflow-hidden rounded-sm shadow-lg ${tile.span} ${tile.aspect}`}
            style={{
              opacity: 0,
              transform: "translateY(50px) scale(0.96)",
              transition: "opacity 1s ease, transform 1s cubic-bezier(.16,1,.3,1)",
              transitionDelay: `${i * 0.08}s`,
            }}
          >
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={tile.src}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1300px) 50vw, 600px"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                style={{ objectPosition: tile.pos }}
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .gallery-tile.in {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }
      `}</style>
    </section>
  );
}
