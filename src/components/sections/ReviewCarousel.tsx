"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { Review } from "@/db/schema";
import { Stars } from "@/components/shared/Stars";
import { Button } from "@/components/ui/button";

type Labels = { googleBadge: string; readMore: string; prev: string; next: string };

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function ReviewCard({ review, labels }: { review: Review; labels: Labels }) {
  return (
    <figure className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-surface p-6 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between gap-3">
        <Stars rating={review.rating} className="text-foreground" />
        <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
          {labels.googleBadge}
        </span>
      </div>
      <blockquote className="flex-1">
        <p className="line-clamp-5 leading-relaxed">{review.text}</p>
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-soft font-display text-sm font-bold">
          {review.authorPhotoUrl ? (
            <Image src={review.authorPhotoUrl} alt="" fill sizes="40px" className="object-cover" unoptimized />
          ) : (
            <span aria-hidden="true">{initials(review.authorName)}</span>
          )}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold">{review.authorName}</span>
          {review.reviewUrl && (
            <a
              href={review.reviewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-accent hover:underline"
            >
              {labels.readMore}
              <ExternalLink className="size-3" aria-hidden="true" />
            </a>
          )}
        </span>
      </figcaption>
    </figure>
  );
}

export function ReviewCarousel({ reviews, labels, titleId }: { reviews: Review[]; labels: Labels; titleId: string }) {
  const trackRef = React.useRef<HTMLUListElement>(null);
  const [edges, setEdges] = React.useState({ start: true, end: true });

  const updateEdges = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateEdges]);

  const scroll = (direction: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * (card.clientWidth + gap), behavior: reduce ? "auto" : "smooth" });
  };

  const scrollable = !(edges.start && edges.end);

  return (
    <div className="mt-8">
      <ul
        ref={trackRef}
        onScroll={updateEdges}
        aria-labelledby={titleId}
        className="no-scrollbar relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 py-2 sm:mx-0 sm:scroll-px-0 sm:px-0"
      >
        {reviews.map((review) => (
          <li
            key={review.id}
            className="w-[82%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
          >
            <ReviewCard review={review} labels={labels} />
          </li>
        ))}
      </ul>
      {scrollable && (
        <div className="mt-6 hidden items-center gap-3 sm:flex">
          <Button variant="outline" size="icon" onClick={() => scroll(-1)} disabled={edges.start} aria-label={labels.prev}>
            <ArrowLeft aria-hidden="true" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => scroll(1)} disabled={edges.end} aria-label={labels.next}>
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  );
}
