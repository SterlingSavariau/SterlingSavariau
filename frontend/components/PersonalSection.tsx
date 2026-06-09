import { SectionLabel } from "./SectionLabel";
import type { StrapiPersonalBlock } from "@/components/types/homepage";

export function PersonalSection({ data }: { data: StrapiPersonalBlock | null }) {
  const embeds = data?.Personal.flatMap((p) =>
    p.Embed.map((e) => e.Text).filter(Boolean)
  ) ?? [];

  if (embeds.length === 0) return null;

  return (
    <section className="mb-16">
      <SectionLabel>{data?.Title ?? "Personal"}</SectionLabel>
      {data?.Description && (
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {data.Description}
        </p>
      )}
      <div className="flex flex-col gap-4">
        {embeds.map((src, i) => (
          <iframe
            key={i}
            src={src!}
            style={{ borderRadius: "12px" }}
            width="100%"
            height="352"
            frameBorder={0}
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
