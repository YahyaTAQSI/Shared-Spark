import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const createdAt = () =>
  integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`);

export const videos = sqliteTable(
  "videos",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    serviceSlug: text("service_slug").notNull(),
    youtubeId: text("youtube_id").notNull(),
    title: text("title").notNull().default(""),
    isShort: integer("is_short", { mode: "boolean" }).notNull().default(false),
    createdAt: createdAt(),
  },
  (t) => [index("videos_service_idx").on(t.serviceSlug)],
);

export const submissions = sqliteTable(
  "submissions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull().default(""),
    company: text("company").notNull().default(""),
    service: text("service").notNull(),
    message: text("message").notNull(),
    createdAt: createdAt(),
  },
  (t) => [index("submissions_created_idx").on(t.createdAt)],
);

export const tagPlacements = ["head", "body_start", "body_end"] as const;
export const tagScopes = ["all", "thank_you"] as const;

export const trackingTags = sqliteTable("tracking_tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  code: text("code").notNull(),
  placement: text("placement", { enum: tagPlacements }).notNull().default("head"),
  scope: text("scope", { enum: tagScopes }).notNull().default("all"),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
  createdAt: createdAt(),
});

export const reviewStatuses = ["pending", "approved", "hidden"] as const;
export const reviewSources = ["manual", "google"] as const;

export const reviews = sqliteTable(
  "reviews",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    source: text("source", { enum: reviewSources }).notNull().default("manual"),
    externalId: text("external_id").unique(),
    authorName: text("author_name").notNull(),
    authorPhotoUrl: text("author_photo_url").notNull().default(""),
    rating: integer("rating").notNull(),
    text: text("text").notNull(),
    reviewUrl: text("review_url").notNull().default(""),
    reviewedAt: integer("reviewed_at", { mode: "timestamp" }),
    status: text("status", { enum: reviewStatuses }).notNull().default("pending"),
    featured: integer("featured", { mode: "boolean" }).notNull().default(false),
    serviceSlugs: text("service_slugs").notNull().default(""),
    createdAt: createdAt(),
  },
  (t) => [index("reviews_status_idx").on(t.status)],
);

export type Review = typeof reviews.$inferSelect;
export type ReviewStatus = (typeof reviewStatuses)[number];
export type TrackingTag = typeof trackingTags.$inferSelect;
export type TagPlacement = (typeof tagPlacements)[number];
export type TagScope = (typeof tagScopes)[number];
export type Video = typeof videos.$inferSelect;
export type Submission = typeof submissions.$inferSelect;
