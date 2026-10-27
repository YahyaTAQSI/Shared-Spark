import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site, type Service } from "@/content/site";
import { cn } from "@/lib/utils";
import { Container, Section, SectionHeading } from "@/components/shared/Section";
import { Media } from "@/components/shared/Media";
import { Reveal } from "@/components/shared/Reveal";
import { ButtonLink } from "@/components/ui/button";

function ServiceBlock({ service, index, ctaLabel }: { service: Service; index: number; ctaLabel: string }) {
  const reversed = index % 2 === 1;
  const [front, back] = service.images;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      aria-labelledby={`service-${service.slug}`}
      className="grid items-center gap-12 rounded-3xl border border-border bg-surface p-6 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14"
    >
      <Reveal className={cn("relative pr-[18%] pb-[14%]", reversed && "lg:order-2")}>
        <Media
          {...back}
          sizes="(min-width: 1024px) 40vw, 80vw"
          className="aspect-[4/3] rounded-2xl shadow-lg transition-transform duration-500 hover:-rotate-1"
        />
        <Media
          {...front}
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="absolute right-0 bottom-0 aspect-square w-[48%] rounded-2xl shadow-2xl ring-8 ring-surface transition-transform duration-500 hover:rotate-2"
        />
      </Reveal>

      <Reveal delay={0.1} className={cn(reversed && "lg:order-1")}>
        <span className="font-display text-sm font-bold text-accent">{number}</span>
        <h3 id={`service-${service.slug}`} className="mt-3 text-3xl font-bold sm:text-4xl">
          {service.title}
        </h3>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">{service.description}</p>
        <ButtonLink href={`/services/${service.slug}`} variant="outline" className="mt-8">
          {ctaLabel}
          <ArrowRight className="transition-transform group-hover/button:translate-x-1" aria-hidden="true" />
        </ButtonLink>
      </Reveal>
    </article>
  );
}

export function Services() {
  const { whyUs, services } = site;
  return (
    <Section aria-labelledby="why-us-title" className="pb-0 sm:pb-0 lg:pb-0">
      <Container>
        <div id="why-us" className="scroll-mt-24">
          <SectionHeading id="why-us-title" eyebrow={whyUs.eyebrow} title={whyUs.title} subtitle={whyUs.subtitle} />
          <Reveal delay={0.05}>
            <Link
              href={whyUs.moreHref}
              className="group mt-6 inline-flex items-center gap-2 font-semibold text-accent hover:underline"
            >
              {whyUs.moreLabel}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
        <div id="services" className="mt-14 flex scroll-mt-24 flex-col gap-8 lg:mt-20">
          {services.map((service, i) => (
            <ServiceBlock key={service.slug} service={service} index={i} ctaLabel={whyUs.serviceCta} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
