import { site } from "@/content/site";
import { Container, Section, SectionHeading } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";

export function Process() {
  const { title, subtitle, steps } = site.process;
  return (
    <Section id="process" aria-labelledby="process-title">
      <Container>
        <SectionHeading id="process-title" title={title} subtitle={subtitle} align="center" />

        <ol className="relative mt-16 grid gap-6 before:absolute before:top-0 before:bottom-0 before:left-7 before:w-px before:bg-linear-to-b before:from-accent before:via-border before:to-transparent md:grid-cols-3 md:gap-8 md:before:top-7 md:before:right-[16%] md:before:bottom-auto md:before:left-[16%] md:before:h-px md:before:w-auto md:before:bg-linear-to-r md:before:from-accent md:before:via-accent/50 md:before:to-border">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.id} delay={i * 0.12} className="relative flex gap-6 md:flex-col md:items-center md:gap-0 md:text-center">
              <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground ring-8 ring-background">
                {i + 1}
              </span>
              <div className="flex-1 rounded-3xl border border-border bg-surface p-6 transition-transform duration-300 hover:-translate-y-1 md:mt-8 md:w-full md:p-8">
                <span className="text-sm font-semibold tracking-wide text-accent uppercase">{step.step}</span>
                <h3 className="mt-2 text-2xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
