import type { Metadata } from "next";
import { Inbox, Mail, MailX } from "lucide-react";
import { requireAdmin } from "@/lib/session";
import { getSubmissions } from "@/lib/queries";
import { isMailConfigured } from "@/lib/mail";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Submissions" };

const dateFormat = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" });

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default async function SubmissionsPage() {
  await requireAdmin();
  const rows = await getSubmissions();
  const mailOn = isMailConfigured();

  const today = startOfDay(new Date());
  const weekAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
  const stats = [
    { label: "Today", value: rows.filter((r) => r.createdAt >= today).length },
    { label: "Last 7 days", value: rows.filter((r) => r.createdAt >= weekAgo).length },
    { label: "All time", value: rows.length },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Form submissions</h1>
          <p className="mt-1 text-muted-foreground">Everyone who filled in the contact form, newest first.</p>
        </div>
        <p
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium",
            mailOn ? "bg-success/15 text-success" : "bg-surface text-muted-foreground ring-1 ring-border",
          )}
        >
          {mailOn ? <Mail className="size-4" aria-hidden="true" /> : <MailX className="size-4" aria-hidden="true" />}
          {mailOn ? "Email alerts on" : "Email alerts off (add Gmail settings to .env.local)"}
        </p>
      </header>

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-surface p-5">
            <dt className="text-sm text-muted-foreground">{stat.label}</dt>
            <dd className="mt-1 font-display text-4xl font-bold tabular-nums">{stat.value}</dd>
          </div>
        ))}
      </dl>

      {rows.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
          <Inbox className="size-8 text-muted-foreground" aria-hidden="true" />
          <p className="mt-3 text-muted-foreground">No submissions yet.</p>
        </div>
      ) : (
        <ul className="mt-8 flex flex-col gap-3">
          {rows.map((row) => (
            <li key={row.id} className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                <div>
                  <p className="font-semibold">
                    {row.firstName} {row.lastName}
                    {row.company && <span className="font-normal text-muted-foreground"> · {row.company}</span>}
                  </p>
                  <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <a href={`mailto:${row.email}`} className="text-accent hover:underline">
                      {row.email}
                    </a>
                    {row.phone && (
                      <a href={`tel:${row.phone.replace(/\s/g, "")}`} className="text-accent hover:underline">
                        {row.phone}
                      </a>
                    )}
                  </p>
                </div>
                <div className="text-right text-sm">
                  <span className="flex flex-wrap justify-end gap-1.5">
                    {row.service.split(", ").map((service) => (
                      <span key={service} className="rounded-full bg-accent-soft px-2.5 py-1 font-medium">
                        {service}
                      </span>
                    ))}
                  </span>
                  <p className="mt-1.5 text-muted-foreground tabular-nums">
                    <time dateTime={row.createdAt.toISOString()}>{dateFormat.format(row.createdAt)}</time>
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-foreground/90">{row.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
