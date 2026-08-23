import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartPageClient } from "./cart-page-client";

export const metadata: Metadata = {
  title: "Cart — Artisan",
  description: "Review your selected artworks before checkout.",
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <CartPageClient />
      </main>
      <Footer />
    </>
  );
}
