import { SectionLabel } from "./SectionLabel";
import { getStrapiMedia } from "@/lib/strapi";
import type { StrapiStackBlock } from "@/components/types/homepage";

export function StackSection({ data }: { data: StrapiStackBlock | null }) {
  const images = data?.Image ?? [];

  return (
    <section id="stack" aria-label="Technology stack">
      <SectionLabel>{data?.Title ?? "Stack"}</SectionLabel>
      {data?.Description && (
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {data.Description}
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        {images.map((entry) =>
          entry.Image.map((img) => {
            const src = getStrapiMedia(img.url);
            return (
              <div
                key={img.url}
                className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-white/5 dark:bg-white hover:opacity-80 transition-opacity"
              >
                {src ? (
                  <img
                    src={src}
                    alt={img.alternativeText ?? ""}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  img.alternativeText && (
                    <span className="text-[9px] text-muted-foreground text-center leading-tight px-1">
                      {img.alternativeText}
                    </span>
                  )
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
