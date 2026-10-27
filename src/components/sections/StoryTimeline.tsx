"use client";

import { Tabs } from "@base-ui/react/tabs";
import type { Milestone } from "@/content/site";
import { Media } from "@/components/shared/Media";

export function StoryTimeline({ milestones, listLabel }: { milestones: Milestone[]; listLabel: string }) {
  return (
    <Tabs.Root defaultValue={milestones[0]?.year} className="mt-12">
      <Tabs.List aria-label={listLabel} className="relative flex justify-between border-b border-border sm:justify-start sm:gap-4">
        {milestones.map((m) => (
          <Tabs.Tab
            key={m.year}
            value={m.year}
            className="rounded-t-lg px-1 pb-3 font-display text-lg font-bold min-[380px]:px-1.5 min-[380px]:text-xl text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-active:text-foreground sm:px-4 sm:text-3xl"
          >
            {m.year}
          </Tabs.Tab>
        ))}
        <Tabs.Indicator className="absolute -bottom-px left-(--active-tab-left) z-10 h-0.5 w-(--active-tab-width) bg-accent transition-[left,width] duration-300 ease-out">
          <span
            aria-hidden="true"
            className="absolute top-[calc(100%+13px)] left-1/2 size-3.5 -translate-x-1/2 rotate-45 border-t border-l border-border bg-surface"
          />
        </Tabs.Indicator>
      </Tabs.List>
      {milestones.map((m) => (
        <Tabs.Panel
          key={m.year}
          value={m.year}
          className="mt-5 grid gap-6 rounded-3xl border border-border bg-surface p-5 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-8 md:grid-cols-[2fr_3fr] md:items-center md:gap-10"
        >
          <Media {...m.media} sizes="(min-width: 768px) 35vw, 90vw" className="aspect-4/3 rounded-2xl" />
          <div>
            <p className="font-display text-sm font-bold text-accent">{m.year}</p>
            <h3 className="mt-2 text-2xl font-bold sm:text-3xl">{m.title}</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{m.text}</p>
          </div>
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}
