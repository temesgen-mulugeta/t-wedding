const venue = {
  kicker: "ceremony",
  name: "International Evangelical Church",
  meta: "7:30 PM · Addis Ababa",
  mapsUrl: "https://share.google/YNn9Lp55iXtxVPuRW",
};

export default function Venues() {
  return (
    <section className="bg-[var(--color-blush)] px-6 py-32">
      <div className="mx-auto max-w-5xl text-center mb-14">
        <div
          className="uppercase"
          style={{
            fontFamily: "var(--font-meta)",
            color: "var(--color-seal)",
            fontSize: "11px",
            letterSpacing: "0.4em",
          }}
        >
          where to find us
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
          the venue
        </h2>
        <div className="mx-auto mt-5 h-px w-16 bg-[var(--color-gold)]" />
      </div>

      <div className="mx-auto max-w-xl">
        <div className="overflow-hidden rounded-md bg-[var(--color-paper)] shadow-xl">
          <div
            className="relative h-52 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #c9d4b8 0%, #a8baa0 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent 0 28px, rgba(255,255,255,0.18) 28px 29px), repeating-linear-gradient(-45deg, transparent 0 28px, rgba(255,255,255,0.18) 28px 29px)",
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-[var(--color-seal)]"
              style={{
                fontSize: "40px",
                filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
              }}
            >
              ●
            </div>
          </div>
          <div className="px-7 py-8 text-center">
            <div
              className="uppercase mb-2"
              style={{
                fontFamily: "var(--font-meta)",
                color: "var(--color-gold-deep)",
                fontSize: "10px",
                letterSpacing: "0.35em",
              }}
            >
              {venue.kicker}
            </div>
            <h3
              className="mb-2"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--color-ink)",
                fontSize: "28px",
                fontWeight: 500,
              }}
            >
              {venue.name}
            </h3>
            <p className="text-[var(--color-ink-soft)] mb-5" style={{ fontSize: "16px" }}>
              {venue.meta}
            </p>
            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-sm border border-[var(--color-seal)] px-6 py-3 uppercase text-[var(--color-seal)] transition-colors hover:bg-[var(--color-seal)] hover:text-[var(--color-paper)]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                letterSpacing: "0.25em",
              }}
            >
              Open in Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
