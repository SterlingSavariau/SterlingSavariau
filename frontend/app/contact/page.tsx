import { Navbar } from "@/components/Navbar";
import { SectionLabel } from "@/components/SectionLabel";
import { ContactForm } from "@/components/client/ContactForm";
import { getConnect } from "@/data/loaders";

export default async function ContactPage() {
  const connect = await getConnect();

  return (
    <div className="w-full max-w-[680px] mx-auto px-5">
      <Navbar />
      <section className="pt-8">
        <SectionLabel>Contact</SectionLabel>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          You can contact me using the form or via the links below.
        </p>
        <ContactForm socials={connect?.Social ?? []} />
      </section>
    </div>
  );
}
