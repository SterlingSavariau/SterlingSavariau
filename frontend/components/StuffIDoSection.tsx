import { SectionLabel } from "./SectionLabel";
import { FanCards } from "./client/FanCards";
import type { StrapiProjectBlock } from "@/components/types/homepage";

export function StuffIDoSection({ data }: { data: StrapiProjectBlock | null }) {
  const projects = data?.Project ?? [];

  return (
    <section className="mb-16">
      <SectionLabel>{data?.Title ?? "Stuff I Do"}</SectionLabel>
      {data?.Description && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {data.Description}
        </p>
      )}
      <FanCards projects={projects} />
    </section>
  );
}
