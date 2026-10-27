"use client";

import { ArrowRight, Play, TrendingUp, Users, Eye } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Section";
import { Media } from "@/components/shared/Media";
import { ButtonLink } from "@/components/ui/button";

const badgeIcons = { views: Eye, leads: TrendingUp, brands: Users } as const;

const badgePositions = {
  top: "-top-4 -left-6 sm:-left-14 lg:-left-20",
  right: "top-1/2 -right-6 sm:-right-16 lg:-right-24",
  "bottom-left": "bottom-10 -left-8 sm:-left-20 lg:-left-28",
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { headline, highlight, subtext, cta, media, badges } = site.hero;
  const reduce = useReducedMotion();
  const [before] = headline.split(highlight);

  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-10 pb-20 sm:pt-16 lg:pt-20 lg:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 left-[-15%] size-[30rem] rounded-full bg-accent-soft blur-3xl" />
      </div>

      <Container className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="max-w-2xl">
          <motion.h1
            id="hero-title"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="text-5xl leading-[1.02] font-bold sm:text-6xl lg:text-7xl"
          >
            {before}
            <span className="relative inline-block text-accent sm:whitespace-nowrap">
              {highlight}
              <svg aria-hidden="true" viewBox="0 0 300 12" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full text-accent/40">
                <path d="M2 9C60 3 140 2 298 6" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {subtext}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-10"
          >
            <ButtonLink href={cta.href} size="lg">
              {cta.label}
              <ArrowRight className="transition-transform group-hover/button:translate-x-1" aria-hidden="true" />
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="relative mx-auto w-full max-w-[18rem] sm:max-w-[19rem]"
        >
          <div className="relative aspect-[9/19] rounded-[2.75rem] bg-primary p-2.5 shadow-[0_40px_80px_-30px] shadow-primary/50">
            <div className="absolute top-4 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-primary" aria-hidden="true" />
            <Media {...media} priority sizes="300px" showLabel={false} className="size-full rounded-[2.25rem]" />
            <div className="absolute inset-2.5 flex items-center justify-center rounded-[2.25rem]">
              <span className="flex size-16 items-center justify-center rounded-full bg-white/25 text-white ring-1 ring-white/40 backdrop-blur-md">
                <Play className="size-6 translate-x-0.5 fill-current" aria-hidden="true" />
              </span>
            </div>
          </div>

          {badges.map((badge, i) => {
            const Icon = badgeIcons[badge.id];
            return (
              <motion.div
                key={badge.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.15, ease }}
                className={cn("absolute z-20", badgePositions[badge.position])}
              >
                <motion.div
                  animate={reduce ? undefined : { y: [0, -10, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                  className="flex items-center gap-3 rounded-2xl border border-white/60 bg-surface/90 py-2.5 pr-4 pl-2.5 shadow-xl shadow-primary/10 backdrop-blur-md"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="leading-tight">
                    <span className="block font-display text-xl font-bold">{badge.value}</span>
                    <span className="block text-xs text-muted-foreground">{badge.label}</span>
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
