import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { site } from "@/content/site";
import { getTagsForScope } from "@/lib/queries";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/shared/Section";
import { TrackingTags } from "@/components/shared/TrackingTags";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: site.thankYou.metaTitle,
  robots: { index: false, follow: false },
};

export default async function ThankYouPage() {
  const { eyebrow, title, text, primaryCta, secondaryCta } = site.thankYou;
  const tags = await getTagsForScope("thank_you");

  return (
    <>
      <TrackingTags tags={[...tags.head, ...tags.bodyStart]} />
      <Navbar />
      <main className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        </div>
        <Container className="flex min-h-[70dvh] flex-col items-center justify-center py-24 text-center">
          <span className="flex size-20 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="size-10" aria-hidden="true" />
          </span>
          <p className="mt-8 text-sm font-semibold tracking-wide text-accent uppercase">{eyebrow}</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{text}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryCta.href} size="lg">
              {primaryCta.label}
              <ArrowRight className="transition-transform group-hover/button:translate-x-1" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} size="lg" variant="outline">
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </Container>
      </main>
      <Footer />
      <TrackingTags tags={tags.bodyEnd} />
    </>
  );
}
