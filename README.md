# Shared Spark

Agency website for Shared Spark, with a small admin area for form submissions, service videos, tracking tags and reviews.

## Stack

- Next.js 16 (App Router), React 19, Tailwind CSS 4, Base UI
- Drizzle ORM with libSQL (local SQLite file in development, Turso in production)
- Gmail SMTP alerts with nodemailer

## Getting started

```bash
npm install
cp .env.example .env.local
npm run db:push
npm run dev
```

Open http://localhost:3000. The admin area is at http://localhost:3000/admin.

## Environment variables

| Name | Purpose |
| --- | --- |
| `DATABASE_URL` | `file:local.db` locally, `libsql://...` for Turso |
| `DATABASE_AUTH_TOKEN` | Turso token, empty locally |
| `ADMIN_PASSWORD` | Password for the admin area |
| `SESSION_SECRET` | Long random string used to sign the admin session |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Gmail SMTP with an app password (optional) |
| `NOTIFY_EMAIL` | Where form alerts are sent (optional) |
| `SITE_URL` | Public address used in link previews (optional, Vercel fills it automatically) |
| `ALLOW_INDEXING` | Set to `true` at launch so search engines can index the site. Anything else hides the site from search engines |

## Scripts

- `npm run dev`: development server
- `npm run build` / `npm start`: production build and server
- `npm run lint`: ESLint
- `npm run db:push`: apply the database schema
- `npm run db:studio`: browse the database
