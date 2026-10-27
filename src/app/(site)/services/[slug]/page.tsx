import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Film } from "lucide-react";
import { site } from "@/content/site";
import { getApprovedReviewsForService, getVideosForService } from "@/lib/queries";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container, Section } from "@/components/shared/Section";
import { Media } from "@/components/shared/Media";
import { Reveal } from "@/components/shared/Reveal";
import { YouTubeEmbed } from "@/components/shared/YouTubeEmbed";
import { ButtonLink } from "@/components/ui/button";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { ContactForm } from "@/components/sections/ContactForm";
import { Faq } from "@/components/sections/Faq";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { Workflow } from "@/components/sections/Workflow";

export const dynamicParams = false;

export function generateStaticParams() {
  return site.services.map((service) => ({ slug: service.slug }));
}

const findService = (slug: string) => site.services.find((s) => s.slug === slug);

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  return service ? { title: service.name, description: service.description } : {};
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const copy = site.servicePage;
  const [videos, reviews] = await Promise.all([getVideosForService(slug), getApprovedReviewsForService(slug, 12)]);
  const regular = videos.filter((v) => !v.isShort);
  const shorts = videos.filter((v) => v.isShort);
  const [front, back] = service.images;

  return (
    <>
      <Navbar />
      <main>
        <section aria-labelledby="service-title" className="relative overflow-hidden pt-10 pb-16 sm:pt-16 lg:pb-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-40 right-[-10%] size-[40rem] rounded-full bg-accent/15 blur-3xl" />
          </div>
          <Container className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <p className="text-sm font-semibold tracking-wide text-accent uppercase">{copy.eyebrow}</p>
              <h1 id="service-title" className="mt-3 text-5xl leading-[1.05] font-bold sm:text-6xl">
                {service.name}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{service.description}</p>
              <ButtonLink href={copy.cta.href} size="lg" className="mt-10">
                {copy.cta.label}
                <ArrowRight className="transition-transform group-hover/button:translate-x-1" aria-hidden="true" />
              </ButtonLink>
            </Reveal>
            <Reveal delay={0.1} className="relative pr-[18%] pb-[14%]">
              <Media {...back} priority sizes="(min-width: 1024px) 40vw, 80vw" className="aspect-[4/3] rounded-3xl shadow-lg" />
              <Media
                {...front}
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="absolute right-0 bottom-0 aspect-square w-[48%] rounded-3xl shadow-2xl ring-8 ring-background"
              />
            </Reveal>
          </Container>
        </section>

        <Section aria-labelledby="videos-title" className="bg-surface-muted">
          <Container>
            <Reveal>
              <h2 id="videos-title" className="text-4xl font-bold sm:text-5xl">
                {copy.videosTitle}
              </h2>
            </Reveal>

            {videos.length === 0 ? (
              <Reveal className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-border bg-surface px-6 py-16 text-center">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  <Film className="size-6" aria-hidden="true" />
                </span>
                <p className="mt-4 text-muted-foreground">{copy.videosEmpty}</p>
              </Reveal>
            ) : (
              <div className="mt-10 flex flex-col gap-10">
                {regular.length > 0 && (
                  <ul className="grid gap-6 md:grid-cols-2">
                    {regular.map((video, i) => (
                      <Reveal as="li" key={video.id} delay={(i % 2) * 0.08}>
                        <YouTubeEmbed id={video.youtubeId} title={video.title} isShort={false} playLabel={copy.playLabel} />
                      </Reveal>
                    ))}
                  </ul>
                )}
                {shorts.length > 0 && (
                  <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                    {shorts.map((video, i) => (
                      <Reveal as="li" key={video.id} delay={(i % 4) * 0.06}>
                        <YouTubeEmbed id={video.youtubeId} title={video.title} isShort playLabel={copy.playLabel} />
                      </Reveal>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </Container>
        </Section>

        <Workflow eyebrow={copy.workflowEyebrow} title={copy.workflowTitle} steps={service.workflow} />

        <ClientLogos alwaysScroll label={copy.logosLabel} />

        <ContactForm defaultServices={[service.name]} title={copy.formTitle} text={copy.formText} />

        <TestimonialsSection reviews={reviews} title={copy.reviewsTitle} />

        <Faq title={copy.faqTitle} items={service.faqs} />
      </main>
      <Footer />
    </>
  );
}
