import { LiveClock } from "./client/LiveClock";
import { ModeToggle } from "./client/ModeToggle";

export async function Footer() {
  return (
    <footer className="mb-12" aria-label="Footer">
      <div className="section-divider" />

      {/* Wave */}
      <svg
        viewBox="0 0 120 28"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 mb-6 text-muted-foreground/30"
        aria-hidden
      >
        <path
          d="M0 14 Q10 4 20 14 Q30 24 40 14 Q50 4 60 14 Q70 24 80 14 Q90 4 100 14 Q110 24 120 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50">
          Est. 1992
        </span>
        <div className="flex items-center gap-3">
          <LiveClock />
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
