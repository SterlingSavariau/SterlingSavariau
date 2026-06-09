import Link from "next/link";
import { SectionLabel } from "./SectionLabel";
import { RichTextBlock } from "./blocks/RichTextBlock";
import { getWork } from "@/data/loaders";
import type { StrapiWorkContent } from "@/components/types/work";

function formatDateLabel(item: StrapiWorkContent): string {
  if (item.Position === "Contract") return "CONTRACT";
  if (item.Position === "Internship") return "INTERNSHIP";
  const startYear = item.StartDate ? new Date(item.StartDate).getFullYear() : null;
  const endYear = item.EndDate ? new Date(item.EndDate).getFullYear() : null;
  if (!startYear) return "";
  if (!endYear) return `${startYear} – NOW`;
  return `${startYear} – ${endYear}`;
}

export async function ExperienceSection({ data: _ }: { data: unknown }) {
  const strapiWork = await getWork();
  const work: StrapiWorkContent[] = strapiWork?.Work.filter((w) => w.Featured) ?? [];
  if (work.length === 0) return null;

  return (
    <section id="work" className="mb-16">
      <SectionLabel>Experience</SectionLabel>

      <div className="flex flex-col gap-8">
        {work.map((item) => (
          <div key={item.id} className="grid grid-cols-[110px_1fr] gap-4">
            <span className="text-xs text-muted-foreground pt-0.5 leading-relaxed">
              {formatDateLabel(item)}
            </span>
            <div>
              <p className="text-sm text-foreground font-medium mb-1">
                {item.Description && `${item.Description} at `}
                <Link
                  href={item.Link?.Url ?? "#"}
                  target={item.Link?.isExternal ? "_blank" : undefined}
                  rel={item.Link?.isExternal ? "noopener noreferrer" : undefined}
                  className="underline underline-offset-2 decoration-muted-foreground/40 hover:decoration-foreground transition-colors"
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
