import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SearchPageClient } from "./search-page-client";

export const metadata: Metadata = {
  title: "Search — Artisan",
  description: "Discover art through keyword search or AI-powered vibe matching.",
};

export default function SearchPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <SearchPageClient />
      </main>
      <Footer />
    </>
  );
}
