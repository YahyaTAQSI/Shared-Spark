import type { Metadata } from "next";
import Link from "next/link";
import { Check, EyeOff, ExternalLink, MessageSquareQuote, Pin, PinOff, RotateCcw, Tags, Trash2 } from "lucide-react";
import { reviewStatuses, type Review, type ReviewStatus } from "@/db/schema";
import { requireAdmin } from "@/lib/session";
import { getReviewCounts, getReviewsByStatus } from "@/lib/queries";
import { deleteReview, setReviewServices, setReviewStatus, toggleReviewFeatured } from "@/app/actions/admin";
import { site } from "@/content/site";
import { decodeServiceTags } from "@/lib/review-tags";
import { cn } from "@/lib/utils";
import { Stars } from "@/components/shared/Stars";
import { AddReviewForm } from "./AddReviewForm";

export const metadata: Metadata = { title: "Reviews" };

const tabs: { status: ReviewStatus; label: string; hint: string }[] = [
  { status: "pending", label: "Pending", hint: "Waiting for your decision. Not shown on the website." },
  { status: "approved", label: "Approved", hint: "Shown on the homepage and the service pages you tag. Pinned reviews appear first." },
  { status: "hidden", label: "Hidden", hint: "Rejected reviews. Never shown on the website." },
];

const dateFormat = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" });

const serviceOptions = site.services.map((s) => ({ value: s.slug, label: s.name }));

function ServiceTags({ review }: { review: Review }) {
  const tags = decodeServiceTags(review.serviceSlugs);
  const names = serviceOptions.filter((o) => tags.includes(o.value)).map((o) => o.label);
  return (
    <details className="group mt-4 rounded-xl bg-surface-muted px-4 py-3 text-sm">
      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-2 [&::-webkit-details-marker]:hidden">
        <Tags className="size-4 text-muted-foreground" aria-hidden="true" />
        <span className="text-muted-foreground">Service pages:</span>
        {names.length > 0 ? (
          names.map((name) => (
            <span key={name} className="rounded-full bg-surface px-2 py-0.5 font-medium">
              {name}
            </span>
          ))
        ) : (
          <span className="text-muted-foreground">none (shown only as fallback)</span>
        )}
        <span className="ml-auto text-accent group-open:hidden">Edit</span>
      </summary>
      <form action={setReviewServices} className="mt-3 flex flex-wrap items-center gap-2">
        <input type="hidden" name="id" value={review.id} />
        {serviceOptions.map((option) => (
          <label
            key={option.value}
            className="inline-flex cursor-pointer items-center rounded-full border border-border bg-surface px-3 py-1.5 font-medium transition-colors select-none has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground has-focus-visible:ring-2 has-focus-visible:ring-ring"
          >
            <input type="checkbox" name="services" value={option.value} defaultChecked={tags.includes(option.value)} className="sr-only" />
            {option.label}
          </label>
        ))}
        <button type="submit" className="ml-auto rounded-lg bg-primary px-3 py-1.5 font-medium text-primary-foreground">
          Save tags
        </button>
      </form>
    </details>
  );
}

const actionButton =
  "inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors disabled:opacity-50";

function StatusButton({ id, status, label, icon: Icon, className }: { id: number; status: ReviewStatus; label: string; icon: typeof Check; className: string }) {
  return (
    <form action={setReviewStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button type="submit" className={cn(actionButton, className)}>
        <Icon className="size-4" aria-hidden="true" />
        {label}
      </button>
    </form>
  );
}

function ReviewItem({ review }: { review: Review }) {
  return (
    <li className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="flex flex-wrap items-center gap-2 font-semibold">
            {review.authorName}
            {review.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium">
                <Pin className="size-3" aria-hidden="true" />
                Pinned
              </span>
            )}
            <span className="rounded-full bg-surface-muted px-2 py-0.5 text-xs font-normal text-muted-foreground">
              {review.source === "google" ? "Imported from Google" : "Added manually"}
            </span>
          </p>
          <p className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <Stars rating={review.rating} />
            {review.reviewedAt && <time dateTime={review.reviewedAt.toISOString()}>{dateFormat.format(review.reviewedAt)}</time>}
            {review.reviewUrl && (
              <a href={review.reviewUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline">
                Source
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            )}
          </p>
        </div>
      </div>
      <p className="mt-4 leading-relaxed whitespace-pre-line">{review.text}</p>
      <ServiceTags review={review} />
      <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
        {review.status !== "approved" && (
          <StatusButton id={review.id} status="approved" label="Approve" icon={Check} className="bg-success/15 text-success hover:bg-success/25" />
        )}
        {review.status !== "hidden" && (
          <StatusButton id={review.id} status="hidden" label="Hide" icon={EyeOff} className="bg-surface-muted hover:bg-foreground/10" />
        )}
        {review.status === "approved" && (
          <form action={toggleReviewFeatured}>
            <input type="hidden" name="id" value={review.id} />
            <input type="hidden" name="featured" value={String(!review.featured)} />
            <button type="submit" className={cn(actionButton, "bg-accent-soft hover:bg-accent/20")}>
              {review.featured ? <PinOff className="size-4" aria-hidden="true" /> : <Pin className="size-4" aria-hidden="true" />}
              {review.featured ? "Unpin" : "Pin first"}
            </button>
          </form>
        )}
        {review.status === "hidden" && (
          <>
            <StatusButton id={review.id} status="pending" label="Back to pending" icon={RotateCcw} className="bg-surface-muted hover:bg-foreground/10" />
            <form action={deleteReview} className="ml-auto">
              <input type="hidden" name="id" value={review.id} />
              <button type="submit" className={cn(actionButton, "text-destructive hover:bg-destructive/10")}>
                <Trash2 className="size-4" aria-hidden="true" />
                Delete forever
              </button>
            </form>
          </>
        )}
      </div>
    </li>
  );
}

export default async function ReviewsPage({ searchParams }: PageProps<"/admin/reviews">) {
  await requireAdmin();
  const params = await searchParams;
  const requested = typeof params.status === "string" ? params.status : "pending";
  const status = (reviewStatuses as readonly string[]).includes(requested) ? (requested as ReviewStatus) : "pending";
  const [list, counts] = await Promise.all([getReviewsByStatus(status), getReviewCounts()]);
  const current = tabs.find((t) => t.status === status)!;

  return (
    <div className="mx-auto max-w-6xl">
      <header>
        <h1 className="text-3xl font-bold">Reviews</h1>
        <p className="mt-1 text-muted-foreground">
          Every review starts in Pending. Only reviews you approve appear in the &quot;What Our Clients Say&quot; section.
        </p>
      </header>

      <section aria-labelledby="add-review" className="mt-8 rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <h2 id="add-review" className="font-semibold">
          Add a review
        </h2>
        <p className="mt-1 mb-5 text-sm text-muted-foreground">Copy a review from your Google listing. It goes to Pending first.</p>
        <AddReviewForm services={serviceOptions} />
      </section>

      <nav aria-label="Review status" className="mt-10 flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.status}
            href={`/admin/reviews?status=${tab.status}`}
            aria-current={tab.status === status ? "page" : undefined}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
              tab.status === status ? "bg-primary text-primary-foreground" : "bg-surface text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
            <span
              className={cn(
                "rounded-full px-1.5 text-xs tabular-nums",
                tab.status === status ? "bg-primary-foreground/20" : tab.status === "pending" && counts.pending > 0 ? "bg-accent text-accent-foreground" : "bg-surface-muted",
              )}
            >
              {counts[tab.status]}
            </span>
          </Link>
        ))}
      </nav>
      <p className="mt-3 text-sm text-muted-foreground">{current.hint}</p>

      {list.length === 0 ? (
        <div className="mt-4 flex flex-col items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center">
          <MessageSquareQuote className="size-8 text-muted-foreground" aria-hidden="true" />
          <p className="mt-3 text-muted-foreground">No {current.label.toLowerCase()} reviews.</p>
        </div>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {list.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ul>
      )}
    </div>
  );
}
