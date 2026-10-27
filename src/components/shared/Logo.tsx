import { cn } from "@/lib/utils";
import { site } from "@/content/site";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8", className)}>
      <path d="M16 3 30 28H2L16 3Z" fill="var(--color-primary)" />
      <path d="M16 13.5 22.5 25h-13L16 13.5Z" fill="var(--color-accent)" />
    </svg>
  );
}

export function Logo({ className, href = "/#home" }: { className?: string; href?: string }) {
  return (
    <a href={href} className={cn("inline-flex items-center gap-2.5 rounded-md", className)}>
      <LogoMark />
      <span className="font-display text-lg font-bold tracking-tight">{site.brand.name}</span>
    </a>
  );
}
