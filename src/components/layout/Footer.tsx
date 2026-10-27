import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { Logo } from "@/components/shared/Logo";
import { Container } from "@/components/shared/Section";

export function Footer() {
  const { brand, footer } = site;
  return (
    <footer className="bg-primary text-primary-foreground">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo className="[&_path:first-child]:fill-primary-foreground" />
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/65">{brand.tagline}</p>
          </div>

          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-sm font-semibold tracking-wide text-primary-foreground/50 uppercase">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-primary-foreground/80 transition-colors hover:text-accent-soft">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-primary-foreground/50 uppercase">{footer.contact.title}</h3>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
              <li>
                <a href={`mailto:${footer.contact.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-accent-soft">
                  <Mail className="size-4" aria-hidden="true" />
                  {footer.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${footer.contact.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 transition-colors hover:text-accent-soft">
                  <Phone className="size-4" aria-hidden="true" />
                  {footer.contact.phone}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="size-4" aria-hidden="true" />
                {footer.contact.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-primary-foreground/10 pt-8 text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} {footer.copyright}
        </div>
      </Container>
    </footer>
  );
}
