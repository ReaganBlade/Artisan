import { Accordion } from "../accordion";
import { SectionHeading } from "../section-heading";
import { faqs } from "../data";

export function FaqSection() {
  return (
    <section id="faq" className="bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          kicker="08 — Straight answers"
          title="The FAQ"
          note="No fine print, we promise"
        />

        <div className="mt-8">
          <Accordion items={faqs} />
        </div>

        <p className="mt-6 text-center font-mono text-xs uppercase tracking-widest text-ink/60">
          Still stuck? Email humans@unsigned.example — a person replies.
        </p>
      </div>
    </section>
  );
}
