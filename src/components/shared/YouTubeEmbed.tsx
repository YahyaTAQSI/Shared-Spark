"use client";

import * as React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { youTubeThumbnail } from "@/lib/youtube";

type YouTubeEmbedProps = {
  id: string;
  title: string;
  isShort: boolean;
  playLabel: string;
  className?: string;
};

export function YouTubeEmbed({ id, title, isShort, playLabel, className }: YouTubeEmbedProps) {
  const [playing, setPlaying] = React.useState(false);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-primary shadow-lg",
        isShort ? "aspect-[9/16]" : "aspect-video",
        className,
      )}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${playLabel}: ${title}`}
          className="absolute inset-0 outline-none focus-visible:ring-4 focus-visible:ring-accent focus-visible:ring-inset"
        >
          <Image
            src={youTubeThumbnail(id)}
            alt=""
            fill
            sizes={isShort ? "(min-width: 1024px) 22vw, 45vw" : "(min-width: 1024px) 45vw, 90vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" aria-hidden="true" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-white/25 text-white ring-1 ring-white/40 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
              <Play className="size-6 translate-x-0.5 fill-current" aria-hidden="true" />
            </span>
          </span>
          {title && (
            <span className="absolute inset-x-5 bottom-5 text-left font-display text-lg font-semibold text-white">{title}</span>
          )}
        </button>
      )}
    </div>
  );
}
