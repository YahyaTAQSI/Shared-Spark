import type { Metadata } from "next";
import { Code2, ShieldAlert } from "lucide-react";
import { requireAdmin } from "@/lib/session";
import { getAllTags } from "@/lib/queries";
import { TagForm } from "./TagForm";
import { TagCard } from "./TagCard";

export const metadata: Metadata = { title: "Tracking tags" };

const tips = [
  { title: "Google Ads / Analytics global tag", where: "Header, All pages" },
  { title: "Google Ads conversion event (lead)", where: "Header, Thank-you page only" },
  { title: "Meta Pixel / TikTok Pixel base code", where: "Header, All pages" },
  { title: "Meta / TikTok Lead event", where: "Footer, Thank-you page only" },
  { title: "Google Tag Manager", where: "Header + a second tag for the noscript part at Top of page" },
];

export default async function TagsPage() {
  await requireAdmin();
  const tags = await getAllTags();

  return (
    <div className="mx-auto max-w-6xl">
      <header>
        <h1 className="text-3xl font-bold">Tracking tags</h1>
        <p className="mt-1 text-muted-foreground">
          Add code from Google Ads, Analytics, Meta, TikTok and other platforms. Tags never load inside this admin area.
        </p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_20rem]">
        <section aria-labelledby="new-tag" className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <h2 id="new-tag" className="mb-5 font-semibold">
            Add a tag
          </h2>
          <TagForm />
        </section>

        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="font-semibold">Where should it go?</h2>
            <ul className="mt-3 flex flex-col gap-3 text-sm">
              {tips.map((tip) => (
                <li key={tip.title}>
                  <p className="font-medium">{tip.title}</p>
                  <p className="text-muted-foreground">{tip.where}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-3 rounded-2xl bg-accent-soft p-5 text-sm">
            <ShieldAlert className="size-5 shrink-0 text-accent" aria-hidden="true" />
            <p>Tag code runs on every visitor&apos;s browser. Only paste code copied directly from the ad platform itself.</p>
          </div>
        </aside>
      </div>

      <section aria-labelledby="tag-list" className="mt-10">
        <h2 id="tag-list" className="text-xl font-bold">
          Your tags <span className="text-base font-normal text-muted-foreground">({tags.length})</span>
        </h2>
        {tags.length === 0 ? (
          <div className="mt-4 flex flex-col items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center">
            <Code2 className="size-8 text-muted-foreground" aria-hidden="true" />
            <p className="mt-3 text-muted-foreground">No tags yet.</p>
          </div>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {tags.map((tag) => (
              <TagCard key={`${tag.id}-${tag.name}-${tag.placement}-${tag.scope}`} tag={tag} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
