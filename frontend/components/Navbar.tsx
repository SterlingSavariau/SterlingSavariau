import Link from "next/link";
import { getGlobal } from "@/data/loaders";
import { LiveClock } from "./client/LiveClock";
import { ModeToggle } from "./client/ModeToggle";

export async function Navbar() {
  const global = await getGlobal();

  const navLinks =
    global?.NavBar?.Navigation?.Link?.map((item) => ({
      label: (item.Text ?? "").toUpperCase(),
      href: item.Url ?? "#",
    })) ?? [];

  return (
    <header className="w-full flex items-center justify-between py-5">
      <Link href="/" className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200">
        Est. 1992
      </Link>
      <nav className="flex items-center gap-6" aria-label="Primary navigation">
        {navLinks.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="hidden md:flex items-center gap-3">
        <LiveClock />
        <ModeToggle />
      </div>
    </header>
  );
}
