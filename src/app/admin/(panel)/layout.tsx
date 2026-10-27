import { requireAdmin } from "@/lib/session";
import { getReviewCounts } from "@/lib/queries";
import { LogoMark } from "@/components/shared/Logo";
import { site } from "@/content/site";
import { logout } from "@/app/actions/auth";
import { AdminNav } from "./AdminNav";

export default async function PanelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();
  const reviewCounts = await getReviewCounts();

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="border-b border-border bg-surface lg:sticky lg:top-0 lg:h-dvh lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between gap-4 p-4 lg:h-full lg:flex-col lg:items-stretch lg:p-6">
          <div className="flex items-center gap-2.5">
            <LogoMark className="size-7" />
            <span className="font-display font-bold">{site.brand.name}</span>
          </div>
          <AdminNav pendingReviews={reviewCounts.pending} />
          <div className="hidden flex-col gap-2 lg:mt-auto lg:flex">
            <a href="/" target="_blank" rel="noreferrer" className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground">
              View website
            </a>
            <form action={logout}>
              <button type="submit" className="w-full rounded-xl px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground">
                Log out
              </button>
            </form>
          </div>
          <form action={logout} className="lg:hidden">
            <button type="submit" className="rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-surface-muted">
              Log out
            </button>
          </form>
        </div>
      </aside>
      <main className="min-w-0 p-4 sm:p-8 lg:p-10">{children}</main>
    </div>
  );
}
