import "server-only";
import { and, asc, count, desc, eq, like } from "drizzle-orm";
import { db } from "@/db";
import { reviews, submissions, trackingTags, videos, type ReviewStatus, type TagScope, type TrackingTag } from "@/db/schema";

export async function getTagsForScope(scope: TagScope) {
  const rows = await db
    .select()
    .from(trackingTags)
    .where(and(eq(trackingTags.enabled, true), eq(trackingTags.scope, scope)))
    .orderBy(asc(trackingTags.id));
  return {
    head: rows.filter((t) => t.placement === "head"),
    bodyStart: rows.filter((t) => t.placement === "body_start"),
    bodyEnd: rows.filter((t) => t.placement === "body_end"),
  } satisfies Record<string, TrackingTag[]>;
}

export async function getVideosForService(slug: string) {
  return db.select().from(videos).where(eq(videos.serviceSlug, slug)).orderBy(asc(videos.id));
}

export async function getAllVideos() {
  return db.select().from(videos).orderBy(asc(videos.id));
}

export async function getAllTags() {
  return db.select().from(trackingTags).orderBy(asc(trackingTags.id));
}

export async function getSubmissions() {
  return db.select().from(submissions).orderBy(desc(submissions.createdAt), desc(submissions.id));
}

export async function getApprovedReviews(limit = 8) {
  return db
    .select()
    .from(reviews)
    .where(eq(reviews.status, "approved"))
    .orderBy(desc(reviews.featured), desc(reviews.reviewedAt), desc(reviews.id))
    .limit(limit);
}

export async function getApprovedReviewsForService(slug: string, limit = 8) {
  const tagged = await db
    .select()
    .from(reviews)
    .where(and(eq(reviews.status, "approved"), like(reviews.serviceSlugs, `%,${slug},%`)))
    .orderBy(desc(reviews.featured), desc(reviews.reviewedAt), desc(reviews.id))
    .limit(limit);
  return tagged.length > 0 ? tagged : getApprovedReviews(limit);
}

export async function getReviewsByStatus(status: ReviewStatus) {
  return db.select().from(reviews).where(eq(reviews.status, status)).orderBy(desc(reviews.createdAt), desc(reviews.id));
}

export async function getReviewCounts() {
  const rows = await db.select({ status: reviews.status, n: count() }).from(reviews).groupBy(reviews.status);
  const counts: Record<ReviewStatus, number> = { pending: 0, approved: 0, hidden: 0 };
  for (const row of rows) counts[row.status] = row.n;
  return counts;
}
