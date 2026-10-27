import type { WorkflowStep } from "@/content/site";
import { Container, Section, SectionHeading } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";

type WorkflowProps = {
  eyebrow: string;
  title: string;
  steps: WorkflowStep[];
};

export function Workflow({ eyebrow, title, steps }: WorkflowProps) {
  return (
    <Section aria-labelledby="workflow-title">
      <Container>
        <SectionHeading id="workflow-title" eyebrow={eyebrow} title={title} />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.08}
              className="relative flex flex-col gap-3 rounded-3xl border border-border bg-surface p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-display font-bold text-primary-foreground">
                  {i + 1}
                </span>
                {i < steps.length - 1 && (
                  <span aria-hidden="true" className="hidden h-px flex-1 bg-linear-to-r from-accent/60 to-transparent lg:block" />
                )}
              </span>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
