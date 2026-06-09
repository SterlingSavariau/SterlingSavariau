import { SectionLabel } from "./SectionLabel";

// TODO: replace with your ventures/projects
const ventures = [
  {
    name: "ChronoWallet",
    description: "Your flagship project — describe what it does.",
    href: "#",
    initials: "CW",
    color: "bg-[#1a1a2e]",
  },
  {
    name: "Project Two",
    description: "Another interesting thing you built or are building.",
    href: "#",
    initials: "PT",
    color: "bg-[#1a2e1a]",
  },
  {
    name: "Project Three",
    description: "An open source project or side experiment worth mentioning.",
    href: "#",
    initials: "P3",
    color: "bg-[#2e1a1a]",
  },
];

export function VenturesSection() {
  return (
    <section className="mb-16">
      <SectionLabel>Ventures</SectionLabel>
      <div className="flex flex-col">
        {ventures.map(({ name, description, href, initials, color }, i) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 py-4 hover:bg-white/[0.02] -mx-3 px-3 rounded-lg transition-colors ${
              i < ventures.length - 1 ? "border-b border-border" : ""
            }`}
          >
            {/* Icon — TODO: replace with <Image src={`/logos/${name}.png`} width={36} height={36} /> */}
            <div
              className={`w-9 h-9 rounded-lg ${color} border border-border flex items-center justify-center flex-shrink-0`}
            >
              <span className="text-[10px] font-medium text-muted-foreground">
                {initials}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            </div>
            {/* External link arrow */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="text-muted-foreground flex-shrink-0"
            >
              <path
                d="M3 11L11 3M11 3H5M11 3V9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
}
