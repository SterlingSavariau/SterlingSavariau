import Link from "next/link";
import { SectionLabel } from "./SectionLabel";
import { RichTextBlock } from "./blocks/RichTextBlock";
import { getWork } from "@/data/loaders";
import type { StrapiWorkContent } from "@/components/types/work";

function formatDateLabel(item: StrapiWorkContent): string {
  if (item.Position === "Contract") return "Contract";
  if (item.Position === "Internship") return "Internship";
  const startYear = item.StartDate ? new Date(item.StartDate).getFullYear() : null;
  const endYear = item.EndDate ? new Date(item.EndDate).getFullYear() : null;
  if (!startYear) return "";
  if (!endYear) return `${startYear} — Now`;
  return `${startYear} — ${endYear}`;
}

export async function ExperienceSection({ data: _ }: { data: unknown }) {
  const strapiWork = await getWork();
  const work: StrapiWorkContent[] = strapiWork?.Work.filter((w) => w.Featured) ?? [];
  if (work.length === 0) return null;

  return (
    <section id="experience" className="mb-16" aria-label="Work experience">
      <SectionLabel>Experience</SectionLabel>

      <div className="flex flex-col gap-10">
        {work.map((item) => (
          <div key={item.id} className="grid grid-cols-[80px_1fr] gap-x-8 gap-y-1">
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground/60 pt-0.5 leading-5">
              {formatDateLabel(item)}
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">
                {item.Description && `${item.Description} at `}
                <Link
                  href={item.Link?.Url ?? "#"}
                  target={item.Link?.isExternal ? "_blank" : undefined}
                  rel={item.Link?.isExternal ? "noopener noreferrer" : undefined}
                  className="underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-foreground transition-colors duration-200"
                >
                  {item.Title}
                </Link>
              </p>
              <div className="work-richtext">
                {item.RichText?.map((rt) => (
                  <RichTextBlock key={rt.id} data={rt} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
