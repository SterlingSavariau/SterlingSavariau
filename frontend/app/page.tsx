import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { StuffIDoSection } from "../components/StuffIDoSection";
import { StackSection } from "../components/StackSection";
import { WritingSection } from "../components/WritingSection";
import { PersonalSection } from "../components/PersonalSection";
import { Footer } from "../components/Footer";
import { getHomepage } from "@/data/loaders";

const BlockComponents = {
  "layouts.about": HeroSection,
  "layouts.experience": ExperienceSection,
  "layouts.project": StuffIDoSection,
  "layouts.stack": StackSection,
  "layouts.writing": WritingSection,
  "layouts.personal": PersonalSection,
} as const;

type BlockKey = keyof typeof BlockComponents;
type HomeBlock = { __component: BlockKey; id: number } & Record<string, unknown>;

function BlockRenderer({ block }: { block: HomeBlock }) {
  const Component = BlockComponents[block.__component];
  return Component ? <Component data={block as never} /> : null;
}

export default async function Home() {
  const homepage = await getHomepage();
  const blocks = (homepage?.Blocks ?? []) as unknown as HomeBlock[];

  return (
    <div className="w-full max-w-[680px] mx-auto px-5">
      <Navbar />
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
      {/* <ContactSection /> */}
      <Footer />
    </div>
  );
}
