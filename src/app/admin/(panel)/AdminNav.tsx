"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2, Inbox, MessageSquareQuote, PlaySquare } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Submissions", icon: Inbox },
  { href: "/admin/reviews", label: "Reviews", icon: MessageSquareQuote },
  { href: "/admin/videos", label: "Service videos", icon: PlaySquare },
  { href: "/admin/tags", label: "Tracking tags", icon: Code2 },
];

export function AdminNav({ pendingReviews }: { pendingReviews: number }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin" className="order-last w-full lg:order-none lg:mt-8">
      <ul className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto lg:mx-0 lg:flex-col">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                  active ? "bg-accent-soft text-foreground" : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                )}
              >
                <Icon className={cn("size-4", active && "text-accent")} aria-hidden="true" />
                {label}
                {href === "/admin/reviews" && pendingReviews > 0 && (
                  <span className="ml-auto rounded-full bg-accent px-1.5 text-xs text-accent-foreground tabular-nums">
                    {pendingReviews}
                    <span className="sr-only"> pending</span>
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
