import type { Metadata } from "next";
import { display, mono, sans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Artisan — Art by people, not platforms",
  description:
    "A marketplace where indie and unknown artists sell original art and prints directly to collectors. No galleries. No gatekeepers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[100] focus:bg-acid focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:uppercase focus:tracking-widest focus:outline-3 focus:outline-electric"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
