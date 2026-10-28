import { closing } from "@/content/landing";
import { CtaButton } from "@/components/ui/CtaButton";
import { Section } from "@/components/ui/Section";

export function Closing() {
  return (
    <Section deep labelledBy="cierre-title">
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <h2 id="cierre-title" className="font-display text-heading-1 text-balance text-ink md:text-display-l">
          {closing.title}
        </h2>
        <CtaButton className="mt-10" />
      </div>
    </Section>
  );
}
