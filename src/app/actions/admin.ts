"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import { reviewStatuses, reviews, tagPlacements, tagScopes, trackingTags, videos } from "@/db/schema";
import { site } from "@/content/site";
import { requireAdmin } from "@/lib/session";
import { parseYouTubeUrl } from "@/lib/youtube";
import { encodeServiceTags } from "@/lib/review-tags";

export type FormState = { ok?: boolean; error?: string; message?: string } | undefined;

const serviceSlugs = site.services.map((s) => s.slug) as [string, ...string[]];

const videoSchema = z.object({
  serviceSlug: z.enum(serviceSlugs, "Choose a service"),
  url: z.string().trim().min(1, "Paste a YouTube link"),
  title: z.string().trim().max(120, "Title is too long"),
});

export async function addVideo(_state: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = videoSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const video = parseYouTubeUrl(parsed.data.url);
  if (!video) return { error: "That does not look like a YouTube link" };

  await db.insert(videos).values({
    serviceSlug: parsed.data.serviceSlug,
    youtubeId: video.id,
    isShort: video.isShort,
    title: parsed.data.title,
  });
  revalidatePath(`/services/${parsed.data.serviceSlug}`);
  revalidatePath("/admin/videos");
  return { ok: true, message: "Video added" };
}

export async function deleteVideo(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  const [row] = await db.delete(videos).where(eq(videos.id, id)).returning();
  if (row) revalidatePath(`/services/${row.serviceSlug}`);
  revalidatePath("/admin/videos");
}

const tagSchema = z.object({
  name: z.string().trim().min(1, "Give the tag a name").max(80, "Name is too long"),
  code: z.string().trim().min(1, "Paste the tag code").max(20000, "Code is too long"),
  placement: z.enum(tagPlacements),
  scope: z.enum(tagScopes),
});

function revalidateSite() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/tags");
}

export async function saveTag(_state: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = tagSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const id = Number(formData.get("id"));
  if (Number.isInteger(id) && id > 0) {
    await db.update(trackingTags).set(parsed.data).where(eq(trackingTags.id, id));
  } else {
    await db.insert(trackingTags).values(parsed.data);
  }
  revalidateSite();
  return { ok: true, message: "Tag saved" };
}

export async function toggleTag(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const enabled = formData.get("enabled") === "true";
  if (!Number.isInteger(id)) return;
  await db.update(trackingTags).set({ enabled }).where(eq(trackingTags.id, id));
  revalidateSite();
}

export async function deleteTag(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  await db.delete(trackingTags).where(eq(trackingTags.id, id));
  revalidateSite();
}

const reviewSchema = z.object({
  authorName: z.string().trim().min(1, "Add the reviewer's name").max(100, "Name is too long"),
  rating: z.coerce.number().int().min(1, "Choose a star rating").max(5),
  text: z.string().trim().min(1, "Paste the review text").max(4000, "Review is too long"),
  reviewUrl: z
    .string()
    .trim()
    .max(500)
    .refine((v) => v === "" || /^https:\/\//.test(v), "Link must start with https://"),
  reviewedAt: z
    .string()
    .trim()
    .refine((v) => v === "" || !Number.isNaN(Date.parse(v)), "Invalid date"),
});

function revalidateReviews() {
  revalidatePath("/");
  revalidatePath("/services/[slug]", "page");
  revalidatePath("/admin", "layout");
}

function readServiceTags(formData: FormData) {
  return formData
    .getAll("services")
    .map(String)
    .filter((slug) => serviceSlugs.includes(slug));
}

export async function addReview(_state: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = reviewSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const { reviewedAt, ...values } = parsed.data;
  await db.insert(reviews).values({
    ...values,
    serviceSlugs: encodeServiceTags(readServiceTags(formData)),
    source: "manual",
    reviewedAt: reviewedAt ? new Date(reviewedAt) : null,
    status: "pending",
  });
  revalidateReviews();
  return { ok: true, message: "Review added to Pending" };
}

export async function setReviewStatus(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const status = z.enum(reviewStatuses).safeParse(formData.get("status"));
  if (!Number.isInteger(id) || !status.success) return;
  await db
    .update(reviews)
    .set(status.data === "approved" ? { status: status.data } : { status: status.data, featured: false })
    .where(eq(reviews.id, id));
  revalidateReviews();
}

export async function toggleReviewFeatured(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  await db.update(reviews).set({ featured: formData.get("featured") === "true" }).where(eq(reviews.id, id));
  revalidateReviews();
}

export async function deleteReview(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  await db.delete(reviews).where(eq(reviews.id, id));
  revalidateReviews();
}

export async function setReviewServices(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  await db
    .update(reviews)
    .set({ serviceSlugs: encodeServiceTags(readServiceTags(formData)) })
    .where(eq(reviews.id, id));
  revalidateReviews();
}
