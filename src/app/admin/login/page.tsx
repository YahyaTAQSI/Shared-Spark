import type { Metadata } from "next";
import { LogoMark } from "@/components/shared/Logo";
import { site } from "@/content/site";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-surface p-8 shadow-xl shadow-primary/5">
        <div className="flex items-center gap-2.5">
          <LogoMark />
          <span className="font-display text-lg font-bold">{site.brand.name}</span>
        </div>
        <h1 className="mt-8 text-2xl font-bold">Admin login</h1>
        <p className="mt-2 text-sm text-muted-foreground">Enter the admin password to continue.</p>
        <LoginForm />
      </div>
    </main>
  );
}
