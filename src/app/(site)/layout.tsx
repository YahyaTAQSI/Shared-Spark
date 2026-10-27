import type { Metadata, Viewport } from "next";
import { site } from "@/content/site";
import { getTagsForScope } from "@/lib/queries";
import { allowIndexing, siteUrl } from "@/lib/site-url";
import { TrackingTags } from "@/components/shared/TrackingTags";
import { fontVariables } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: `${site.brand.name} | ${site.hero.headline}`, template: `%s | ${site.brand.name}` },
  description: site.hero.subtext,
  openGraph: {
    type: "website",
    siteName: site.brand.name,
    title: `${site.brand.name} | ${site.hero.headline}`,
    description: site.hero.subtext,
  },
  twitter: { card: "summary_large_image" },
  robots: allowIndexing ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#faf8fd",
};

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const tags = await getTagsForScope("all");
  return (
    <html lang="en" className={fontVariables}>
      <head>
        <TrackingTags tags={tags.head} />
      </head>
      <body className="min-h-dvh font-sans">
        <TrackingTags tags={tags.bodyStart} />
        {children}
        <TrackingTags tags={tags.bodyEnd} />
      </body>
    </html>
  );
}
