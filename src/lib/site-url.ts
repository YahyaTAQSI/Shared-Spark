const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = new URL(process.env.SITE_URL ?? (vercelHost ? `https://${vercelHost}` : "http://localhost:3000"));

export const allowIndexing = process.env.ALLOW_INDEXING === "true";
