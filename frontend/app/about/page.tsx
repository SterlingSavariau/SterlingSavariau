import { Navbar } from "@/components/Navbar";
import { RichTextBlock } from "@/components/blocks/RichTextBlock";
import { getAbout } from "@/data/loaders";

export default async function AboutPage() {
  const about = await getAbout();

  const richTextBlocks = about?.Blocks?.filter(
    (b) => b.__component === "components.rich-text"
  ) ?? [];

  return (
    <div className="w-full max-w-[520px] mx-auto px-5">
      <Navbar />
      <section>
        {about?.Title && (
          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4">
            {about.Title}
          </p>
        )}
        {about?.Description && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-10">
            {about.Description}
          </p>
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
