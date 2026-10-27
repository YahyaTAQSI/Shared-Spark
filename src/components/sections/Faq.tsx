"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Plus } from "lucide-react";
import type { Faq as FaqItem } from "@/content/site";
import { Container, Section, SectionHeading } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";

export function Faq({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <Section aria-labelledby="faq-title">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading id="faq-title" title={title} className="lg:sticky lg:top-28 lg:self-start" />
        <Reveal>
          <Accordion.Root className="flex flex-col gap-3">
            {items.map((item) => (
              <Accordion.Item
                key={item.question}
                className="rounded-2xl border border-border bg-surface transition-colors data-open:border-accent/40"
              >
                <Accordion.Header className="m-0">
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left font-display text-lg font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    {item.question}
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform duration-200 group-data-panel-open:rotate-45">
                      <Plus className="size-4" aria-hidden="true" />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Panel
                  hiddenUntilFound
                  className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0"
                >
                  <p className="px-6 pb-6 leading-relaxed text-muted-foreground">{item.answer}</p>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </Container>
    </Section>
  );
}
