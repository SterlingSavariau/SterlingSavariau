import { CopyEmailHint } from "./client/CopyEmailHint";
import { AvatarStack } from "./client/AvatarStack";
import { RichTextBlock } from "./blocks/RichTextBlock";
import { getStrapiMedia } from "@/lib/strapi";
import type { StrapiAboutBlock } from "@/components/types/homepage";

export function HeroSection({ data }: { data: StrapiAboutBlock | null }) {
  const title = data?.Title ?? null;
  const description = data?.Description ?? null;
  const email = data?.Email ?? null;
  const initials = title
    ? title.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "";

  const images = (data?.Image ?? []).map((img) => ({
    id: img.id,
    url: getStrapiMedia(img.url) ?? "",
    alt: img.alternativeText ?? (title ?? ""),
  }));

  return (
    <section id="about" className="mb-20">
      <AvatarStack images={images} initials={initials} />

      {title && (
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-base font-semibold text-foreground">{title}</h1>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="8" fill="#1D9BF0" />
            <path
              d="M5 8l2 2 4-4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}

      {data?.RichText?.map((block) => (
        <RichTextBlock key={block.id} data={block} />
      ))}

      {email && <CopyEmailHint email={email} />}
    </section>
  );
}
