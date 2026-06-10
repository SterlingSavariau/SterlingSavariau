import { Navbar } from "@/components/Navbar";
import { SectionLabel } from "@/components/SectionLabel";
import { RichTextBlock } from "@/components/blocks/RichTextBlock";
import { getAbout } from "@/data/loaders";

export default async function AboutPage() {
  const about = await getAbout();

  const richTextBlocks = about?.Blocks?.filter(
    (b) => b.__component === "components.rich-text"
  ) ?? [];

  return (
    <div className="w-full max-w-[680px] mx-auto px-5">
      <Navbar />
      <section className="pt-8">
        {about?.Title && <SectionLabel>{about.Title}</SectionLabel>}
        {about?.Description && (
          <>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {about.Description}
            </p>
            <div className="section-divider" />
          </>
        )}
        <div className="space-y-0">
          {richTextBlocks.map((block) => (
            <RichTextBlock key={block.id} data={{ RichText: block.RichText }} />
          ))}
        </div>
      </section>
    </div>
  );
}
