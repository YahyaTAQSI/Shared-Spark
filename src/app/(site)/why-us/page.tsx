import type { Metadata } from "next";
import { site } from "@/content/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container, Section, SectionHeading } from "@/components/shared/Section";
import { Media } from "@/components/shared/Media";
import { Reveal } from "@/components/shared/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { StoryTimeline } from "@/components/sections/StoryTimeline";

export const metadata: Metadata = {
  title: site.about.metaTitle,
  description: site.about.metaDescription,
};

export default function WhyUsPage() {
  const { hero, intro, work, story, formTitle, formText } = site.about;

  return (
    <>
      <Navbar />
      <main>
        <section aria-labelledby="about-title" className="relative overflow-hidden pt-16 pb-20 sm:pt-24 lg:pb-28">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-40 left-1/2 size-160 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
          </div>
          <Container>
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold tracking-wide text-accent uppercase">{hero.eyebrow}</p>
              <h1 id="about-title" className="mt-3 text-5xl leading-[1.05] font-bold sm:text-6xl lg:text-7xl">
                {hero.title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{hero.text}</p>
            </Reveal>
          </Container>
        </section>

        <Section aria-labelledby="intro-title" className="border-t border-border">
          <Container className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-20">
            <div>
              <SectionHeading id="intro-title" title={intro.title} />
              <Reveal delay={0.05} className="mt-6 flex max-w-2xl flex-col gap-5 text-lg leading-relaxed text-muted-foreground">
                {intro.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </Reveal>
            </div>
            <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {intro.metrics.map((metric, i) => (
                <Reveal
                  as="li"
                  key={metric.id}
                  delay={i * 0.08}
                  className="rounded-3xl border border-border bg-surface p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <p className="font-display text-4xl font-bold text-accent">{metric.value}</p>
                  <p className="mt-1 text-muted-foreground">{metric.label}</p>
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>

        <Section aria-labelledby="glimpse-title" className="bg-surface-muted">
          <Container>
            <SectionHeading id="glimpse-title" title={work.title} />
            <ul className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 py-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:items-start lg:overflow-visible lg:px-0">
              {work.items.map((item, i) => (
                <Reveal as="li" key={item.id} delay={i * 0.06} className="w-[62%] shrink-0 snap-start sm:w-[38%] lg:w-auto lg:even:mt-10">
                  <Media
                    alt={`${item.title}, ${item.client}`}
                    tone={item.tone}
                    showLabel={false}
                    sizes="(min-width: 1024px) 20vw, 60vw"
                    className="aspect-3/4 rounded-3xl shadow-lg transition-transform duration-500 hover:-rotate-1"
                  />
                  <p className="mt-3 font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.client}</p>
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>

        <Section aria-labelledby="story-title">
          <Container>
            <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-20">
              <SectionHeading id="story-title" eyebrow={story.eyebrow} title={story.title} />
              <Reveal delay={0.05}>
                <p className="text-lg leading-relaxed text-muted-foreground">{story.text}</p>
              </Reveal>
            </div>
            <StoryTimeline milestones={story.milestones} listLabel={story.listLabel} />
          </Container>
        </Section>

        <ContactForm title={formTitle} text={formText} />
      </main>
      <Footer />
    </>
  );
}
