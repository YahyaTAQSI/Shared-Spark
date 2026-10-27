import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, Trash2 } from "lucide-react";
import { site } from "@/content/site";
import { requireAdmin } from "@/lib/session";
import { getAllVideos } from "@/lib/queries";
import { youTubeThumbnail, youTubeWatchUrl } from "@/lib/youtube";
import { deleteVideo } from "@/app/actions/admin";
import { AddVideoForm } from "./AddVideoForm";

export const metadata: Metadata = { title: "Service videos" };

export default async function VideosPage() {
  await requireAdmin();
  const all = await getAllVideos();
  const services = site.services.map((s) => ({ slug: s.slug, name: s.name }));

  return (
    <div className="mx-auto max-w-6xl">
      <header>
        <h1 className="text-3xl font-bold">Service videos</h1>
        <p className="mt-1 text-muted-foreground">
          Paste YouTube links for each service. Visitors see them on that service&apos;s page.
        </p>
      </header>

      <AddVideoForm services={services} />

      <div className="mt-10 flex flex-col gap-10">
        {services.map((service) => {
          const list = all.filter((v) => v.serviceSlug === service.slug);
          return (
            <section key={service.slug} aria-labelledby={`svc-${service.slug}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 id={`svc-${service.slug}`} className="text-xl font-bold">
                  {service.name} <span className="text-base font-normal text-muted-foreground">({list.length})</span>
                </h2>
                <a
                  href={`/services/${service.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
                >
                  View page
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </div>
              {list.length === 0 ? (
                <p className="mt-3 rounded-2xl border border-dashed border-border bg-surface px-5 py-6 text-sm text-muted-foreground">
                  No videos yet.
                </p>
              ) : (
                <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((video) => (
                    <li key={video.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
                      <a
                        href={youTubeWatchUrl(video.youtubeId, video.isShort)}
                        target="_blank"
                        rel="noreferrer"
                        className="relative block aspect-video bg-primary"
                      >
                        <Image src={youTubeThumbnail(video.youtubeId)} alt="" fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
                        {video.isShort && (
                          <span className="absolute top-2 left-2 rounded-full bg-black/70 px-2 py-0.5 text-xs font-medium text-white">Short</span>
                        )}
                      </a>
                      <div className="flex items-center justify-between gap-3 p-3">
                        <p className="min-w-0 truncate text-sm font-medium">{video.title || video.youtubeId}</p>
                        <form action={deleteVideo}>
                          <input type="hidden" name="id" value={video.id} />
                          <button
                            type="submit"
                            aria-label={`Remove ${video.title || "video"}`}
                            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="size-4" aria-hidden="true" />
                          </button>
                        </form>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
