import { site } from "@/content/site";
import type { Review } from "@/db/schema";
import { getApprovedReviews } from "@/lib/queries";
import { Container, Section, SectionHeading } from "@/components/shared/Section";
import { ReviewCarousel } from "./ReviewCarousel";

export async function Testimonials() {
  const reviews = await getApprovedReviews(12);
  return <TestimonialsSection reviews={reviews} title={site.testimonials.title} />;
}

export function TestimonialsSection({ reviews, title }: { reviews: Review[]; title: string }) {
  if (reviews.length === 0) return null;
  const { googleBadge, readMore, prevLabel, nextLabel } = site.testimonials;

  return (
    <Section id="testimonials" aria-labelledby="testimonials-title" className="bg-surface-muted">
      <Container>
        <SectionHeading id="testimonials-title" title={title} />
        <ReviewCarousel
          reviews={reviews}
          titleId="testimonials-title"
          labels={{ googleBadge, readMore, prev: prevLabel, next: nextLabel }}
        />
      </Container>
    </Section>
  );
}
