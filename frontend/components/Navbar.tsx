import Link from "next/link";
import { getGlobal } from "@/data/loaders";
import { ModeToggle } from "./client/ModeToggle";

export async function Navbar() {
  const global = await getGlobal();

  const title = global?.Title ?? null;
  const navLinks =
    global?.NavBar?.Navigation?.Link?.map((item) => ({
      label: (item.Text ?? "").toUpperCase(),
      href: item.Url ?? "#",
    })) ?? [];

  return (
    <nav className="flex justify-between items-center pt-8 pb-12">
      {title && (
        <Link href="/" className="text-xs text-muted-foreground tracking-widest font-medium hover:text-foreground transition-colors">
          {title.toUpperCase()}
        </Link>
      )}
      <div className="flex items-center gap-6">
        {navLinks.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide"
          >
            {label}
          </Link>
        ))}
        <ModeToggle />
      </div>
    </nav>
  );
}
