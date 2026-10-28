import { faq } from "@/content/landing";
import { Section, SectionTitle } from "@/components/ui/Section";
import { FaqList } from "./Faq";

export function FaqSection() {
  return (
    <Section id={faq.id} labelledBy="faq-title" className="pt-0!">
      <div className="mx-auto max-w-3xl">
        <div data-reveal>
          <SectionTitle id="faq-title">{faq.title}</SectionTitle>
        </div>
        <div data-reveal className="mt-10">
          <FaqList />
        </div>
      </div>
    </Section>
  );
}
