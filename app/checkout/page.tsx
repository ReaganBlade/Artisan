import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CheckoutPageClient } from "./checkout-page-client";

export const metadata: Metadata = {
  title: "Checkout — Artisan",
  description: "Complete your purchase on Artisan.",
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <CheckoutPageClient />
      </main>
      <Footer />
    </>
  );
}
