import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { SectionLabel } from "@/components/SectionLabel";
import { RichTextBlock } from "@/components/blocks/RichTextBlock";
import { getStrapiMedia } from "@/lib/strapi";
import type { StrapiWorkContent } from "@/components/types/work";
import { getWork } from "@/data/loaders";

function formatDateLabel(item: StrapiWorkContent): string {
  if (item.Position === "Contract") return "CONTRACT";
  if (item.Position === "Internship") return "INTERNSHIP";
  const startYear = item.StartDate
    ? new Date(item.StartDate).getFullYear()
    : null;
  const endYear = item.EndDate ? new Date(item.EndDate).getFullYear() : null;
  if (!startYear) return "";
  if (!endYear) return `${startYear} — NOW`;
  return `${startYear}-${endYear}`;
}

export default async function WorkPage() {
  const work = await getWork();

  return (
    <div className="w-full max-w-[520px] mx-auto px-5">
      <Navbar />
      <section className="mb-16">
        <SectionLabel>Work</SectionLabel>
        {work?.Description && (
          <p className="text-sm text-muted-foreground mb-10 leading-relaxed">
            {work.Description}
          </p>
        )}

        <div className="flex flex-col gap-8">
          {(work?.Work ?? []).map((item) => {
            const iconUrl = getStrapiMedia(item.Icon?.url ?? null);
            const label = formatDateLabel(item);

            return (
              <div key={item.id} className="grid grid-cols-[110px_1fr] gap-4">
                <span className="text-xs text-muted-foreground pt-0.5 uppercase tracking-wide leading-relaxed">
                  {label}
                </span>
                <div>
                  <p className="text-sm text-foreground font-medium mb-2">
                    {item.Description && `${item.Description} at `}
                    <Link
                      href={item.Link?.Url ?? "#"}
                      target={item.Link?.isExternal ? "_blank" : undefined}
                      rel={item.Link?.isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 underline underline-offset-2 decoration-muted-foreground/40 hover:decoration-foreground transition-colors"
                    >
                      {iconUrl && (
                        <Image
                          src={iconUrl}
                          alt={item.Icon?.alternativeText ?? item.Title ?? ""}
                          width={16}
                          height={16}
                          className="rounded-sm"
                          style={{ objectFit: "contain" }}
                        />
                      )}
                      <span>{item.Title}</span>
                    </Link>
                  </p>
                  <div className="work-richtext">
                    {item.RichText?.map((rt) => (
                      <RichTextBlock key={rt.id} data={rt} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
