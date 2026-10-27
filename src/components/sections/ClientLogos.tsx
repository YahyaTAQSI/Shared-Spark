import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";

type ClientLogo = (typeof site.clients.logos)[number];

function PlaceholderLogo({ logo }: { logo: ClientLogo }) {
  switch (logo.style) {
    case "serif":
      return (
        <span className="font-serif text-2xl italic tracking-tight">
          Kult <span className="text-sm not-italic tracking-[0.3em] uppercase">The Salon</span>
        </span>
      );
    case "circle":
      return (
        <span className="flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-full border-2 border-current">
            <span className="size-4 rounded-full bg-current" />
          </span>
          <span className="text-lg font-semibold">{logo.name}</span>
        </span>
      );
    case "block":
      return <span className="rounded-md border-2 border-current px-3 py-1 font-display text-2xl font-black tracking-widest">{logo.name}</span>;
    case "triangle":
      return (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="size-8" aria-hidden="true">
            <path d="M12 2 23 21H1L12 2Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          </svg>
          <span className="text-lg font-bold tracking-wide uppercase">{logo.name}</span>
        </span>
      );
  }
}

function LogoItem({ logo, hidden }: { logo: ClientLogo; hidden?: boolean }) {
  return (
    <li
      aria-hidden={hidden || undefined}
      className={cn(
        "flex h-16 shrink-0 items-center justify-center text-foreground/45 grayscale transition-[color,filter] duration-300 hover:text-accent hover:grayscale-0",
      )}
    >
      <span className="sr-only">{logo.name}</span>
      <span aria-hidden="true">
        <PlaceholderLogo logo={logo} />
      </span>
    </li>
  );
}

export function ClientLogos({ alwaysScroll = false, label }: { alwaysScroll?: boolean; label?: string }) {
  const { logos } = site.clients;
  const heading = label ?? site.clients.label;
  const track = Array.from({ length: alwaysScroll ? 4 : 2 }, () => logos).flat();

  return (
    <section aria-label={heading} className="border-y border-border bg-surface py-10">
      <Container>
        <Reveal>
          <p className="text-center text-sm font-medium text-muted-foreground">{heading}</p>

          {!alwaysScroll && (
            <ul className="mt-6 hidden grid-cols-4 items-center gap-8 md:grid">
              {logos.map((logo) => (
                <LogoItem key={logo.id} logo={logo} />
              ))}
            </ul>
          )}

          <div className={cn("group/marquee relative mt-6 overflow-hidden mask-x-from-85%", !alwaysScroll && "md:hidden")}>
            <ul className="flex w-max animate-marquee gap-12 pr-12 group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none md:gap-20 md:pr-20">
              {track.map((logo, i) => (
                <LogoItem key={`${logo.id}-${i}`} logo={logo} hidden={i >= logos.length} />
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
