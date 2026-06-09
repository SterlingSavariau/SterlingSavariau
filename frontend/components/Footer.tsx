import { LiveClock } from "./client/LiveClock";
import { getGlobal } from "@/data/loaders";

export async function Footer() {
  const global = await getGlobal();

  const title = global?.Title ?? null;
  const initials = title
    ? title.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "";

  return (
    <footer className="mb-12">
      {/* Signature — TODO: replace with <Image src="/signature.svg" /> */}
      <div className="flex justify-center mb-8">
        <svg
          width="120"
          height="60"
          viewBox="0 0 120 60"
          fill="none"
          className="text-foreground opacity-70"
        >
          <path
            d="M10 45 C20 20, 30 10, 40 25 C50 40, 55 15, 65 20 C75 25, 80 35, 90 30 C100 25, 105 40, 110 35"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Bottom bar */}
      <div className="flex justify-between items-center border-t border-white/[0.05] pt-5">
        <div className="flex items-center gap-2.5">
          {/* Avatar mini — TODO: replace with <Image src="/avatar.jpg" /> */}
          <div className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center">
            {initials && <span className="text-[8px] text-muted-foreground">{initials}</span>}
          </div>
          {title && (
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              {title}
            </span>
          )}
        </div>
        <LiveClock />
      </div>
    </footer>
  );
}
