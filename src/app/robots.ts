import type { MetadataRoute } from "next";
import { allowIndexing } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return allowIndexing
    ? { rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/thank-you"] } }
    : { rules: { userAgent: "*", disallow: "/" } };
}
