export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] px-6 py-20 text-center text-[var(--color-paper)]/70">
      <div
        className="leading-none mb-3"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-paper)",
          fontSize: "60px",
          fontWeight: 400,
        }}
      >
        Abigiya &amp; Tetemek
      </div>
      <div
        className="uppercase mb-10"
        style={{
          fontFamily: "var(--font-meta)",
          color: "var(--color-gold)",
          fontSize: "11px",
          letterSpacing: "0.4em",
        }}
      >
        26 &middot; 05 &middot; 2026 &middot; Addis Ababa
      </div>

      <div
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-gold)",
          fontSize: "34px",
        }}
      >
        #AbigiyaAndTetemek
      </div>
    </footer>
  );
}
