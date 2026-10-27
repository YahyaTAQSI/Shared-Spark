"use client";

import * as React from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";
import { Container } from "@/components/shared/Section";
import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const sectionId = (href: string) => href.split("#")[1] ?? href.replace(/^\//, "");

function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = React.useState<string | null>(enabled ? ids[0] : null);
  React.useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, enabled]);
  return enabled ? active : null;
}

export function Navbar() {
  const { links, cta, menuLabel, closeLabel } = site.nav;
  const pathname = usePathname();
  const ids = React.useMemo(() => [...links.map((l) => sectionId(l.href)), "testimonials", "process", "contact"], [links]);
  const sectionActive = useActiveSection(ids, pathname === "/");
  const active = pathname.startsWith("/services/") ? "services" : pathname === "/why-us" ? "why-us" : sectionActive;
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled ? "bg-background/80 shadow-[0_1px_0] shadow-border backdrop-blur-lg" : "bg-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => {
              const isActive = active === sectionId(link.href);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={cta.href} size="sm" className="hidden sm:inline-flex">
            {cta.label}
            <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" aria-hidden="true" />
          </ButtonLink>

          <Sheet open={open} onOpenChange={setOpen} swipeDirection="right">
            <SheetTrigger aria-label={menuLabel} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "md:hidden")}>
              <Menu className="size-5!" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent>
              <div className="flex items-center justify-between">
                <SheetTitle render={<div />}>
                  <Logo />
                </SheetTitle>
                <SheetClose aria-label={closeLabel} className={buttonVariants({ variant: "ghost", size: "icon" })}>
                  <X className="size-5!" aria-hidden="true" />
                </SheetClose>
              </div>
              <nav aria-label="Mobile" className="mt-10">
                <ul className="flex flex-col gap-1">
                  {links.map((link) => {
                    const isActive = active === sectionId(link.href);
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          onClick={() => setOpen(false)}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl font-semibold transition-colors",
                            isActive ? "bg-accent-soft text-foreground" : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                          )}
                        >
                          {link.label}
                          {isActive && <span className="size-2 rounded-full bg-accent" aria-hidden="true" />}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <ButtonLink href={cta.href} size="lg" className="mt-auto w-full" onClick={() => setOpen(false)}>
                {cta.label}
                <ArrowRight aria-hidden="true" />
              </ButtonLink>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
