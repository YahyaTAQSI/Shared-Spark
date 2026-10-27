import type { Metadata } from "next";
import { site } from "@/content/site";
import { fontVariables } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: { default: `Admin | ${site.brand.name}`, template: `%s | Admin | ${site.brand.name}` },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-dvh bg-surface-muted font-sans">{children}</body>
    </html>
  );
}
