"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { site, type WorkItem } from "@/content/site";
import { Container, Section, SectionHeading } from "@/components/shared/Section";
import { Media } from "@/components/shared/Media";
import { Reveal } from "@/components/shared/Reveal";
import { Button, ButtonLink } from "@/components/ui/button";

function ReelCard({ item, playing, onPlay, playLabel }: { item: WorkItem; playing: boolean; onPlay: () => void; playLabel: string }) {
  return (
    <li className="w-[72%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]">
      <figure className="group relative aspect-[9/16] overflow-hidden rounded-3xl bg-primary shadow-lg transition-transform duration-300 hover:-translate-y-1">
        {playing && item.video ? (
          <video src={item.video} poster={item.poster} className="size-full object-cover" autoPlay controls playsInline />
        ) : (
          <>
            <Media
              src={item.poster}
              alt={`${item.title}, ${item.client}`}
              tone={item.tone}
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 72vw"
              showLabel={false}
              className="size-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />
            <button
              type="button"
              onClick={onPlay}
              aria-label={`${playLabel}: ${item.title}`}
              className="absolute inset-0 flex items-center justify-center outline-none focus-visible:ring-4 focus-visible:ring-accent focus-visible:ring-inset"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-white/25 text-white ring-1 ring-white/40 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                <Play className="size-5 translate-x-0.5 fill-current" aria-hidden="true" />
              </span>
            </button>
            <figcaption className="pointer-events-none absolute inset-x-5 bottom-5 text-white">
              <span className="block text-xs font-medium tracking-wide text-white/70 uppercase">{item.client}</span>
              <span className="mt-1 block font-display text-lg font-semibold">{item.title}</span>
            </figcaption>
          </>
        )}
      </figure>
    </li>
  );
}

export function Work() {
  const { title, panel, items, prevLabel, nextLabel, playLabel } = site.work;
  const trackRef = React.useRef<HTMLUListElement>(null);
  const [edges, setEdges] = React.useState({ start: true, end: false });
  const [playingId, setPlayingId] = React.useState<string | null>(null);

  const updateEdges = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  React.useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const scroll = (direction: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * (card.clientWidth + gap), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <Section id="work" aria-labelledby="work-title" className="scroll-mt-16">
      <Container>
        <SectionHeading id="work-title" title={title} />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center lg:gap-14">
          <Reveal>
            <ul
              ref={trackRef}
              onScroll={updateEdges}
              aria-label={title}
              className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:scroll-px-0 sm:px-0"
            >
              {items.map((item) => (
                <ReelCard
                  key={item.id}
                  item={item}
                  playing={playingId === item.id}
                  onPlay={() => setPlayingId(item.id)}
                  playLabel={playLabel}
                />
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={() => scroll(-1)} disabled={edges.start} aria-label={prevLabel}>
                <ArrowLeft aria-hidden="true" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => scroll(1)} disabled={edges.end} aria-label={nextLabel}>
                <ArrowRight aria-hidden="true" />
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl bg-primary p-8 text-primary-foreground lg:p-10">
            <h3 className="text-2xl font-bold sm:text-3xl">{panel.title}</h3>
            <p className="mt-4 leading-relaxed text-primary-foreground/70">{panel.text}</p>
            <ButtonLink href={panel.cta.href} variant="accent" className="mt-8">
              {panel.cta.label}
              <ArrowRight className="transition-transform group-hover/button:translate-x-1" aria-hidden="true" />
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
