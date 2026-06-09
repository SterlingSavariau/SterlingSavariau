import { SectionLabel } from "./SectionLabel";
import { getStrapiMedia } from "@/lib/strapi";
import type { StrapiStackBlock } from "@/components/types/homepage";

export function StackSection({ data }: { data: StrapiStackBlock | null }) {
  const images = data?.Image ?? [];

  return (
    <section className="mb-16">
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
                className="relative group w-10 h-10 rounded-xl overflow-visible flex items-center justify-center"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center dark:bg-white group-hover:opacity-80 transition-opacity">
                  {src && (
                    <img
                      src={src}
                      alt={img.alternativeText ?? ""}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                {img.alternativeText && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-background border border-border text-foreground text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {img.alternativeText}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
