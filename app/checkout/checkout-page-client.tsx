"use client";

import { useState } from "react";
import Link from "next/link";
import { Artwork } from "@/components/artwork";
import { Button } from "@/components/button";
import { Stamp } from "@/components/stamp";
import { useCart } from "@/lib/cart/provider";
import { useSession } from "@/lib/auth";
import { commerceApi } from "@/lib/api/commerce";
import { ApiError } from "@/lib/api";

const VARIANTS = [
  "sunburst",
  "stripes",
  "checker",
  "halftone",
  "blocks",
  "bars",
  "sun",
  "grid",
  "tri",
] as const;

function hashId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function CheckoutPageClient() {
  const { items, itemCount, subtotal, clearCart } = useCart();
  const { status, user } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  const isAuthenticated = status === "authenticated" && user !== null;

  // Empty cart state
  if (items.length === 0 && !redirecting) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center sm:px-6">
        <Stamp tone="riot" rotate={-3}>
          Empty
        </Stamp>
        <h1 className="mt-6 font-display text-5xl uppercase leading-[0.85] tracking-tight sm:text-6xl">
          Nothing to check out
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed">
          Your cart is empty. Add some art first.
        </p>
        <Button href="/" variant="ink" size="lg" className="mt-8">
          Browse the wall
        </Button>
      </div>
    );
  }

  // Loading auth state
  if (status === "loading") {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center sm:px-6">
        <div className="h-8 w-48 animate-pulse bg-ink/10" />
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center sm:px-6">
        <Stamp tone="electric" rotate={-3}>
          Sign in required
        </Stamp>
        <h1 className="mt-6 font-display text-4xl uppercase leading-[0.85] tracking-tight">
          Sign in to checkout
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed">
          You need an account to complete your purchase. Your cart items are
          saved and waiting.
        </p>
        <div className="mt-8 flex gap-3">
          <Button href="/signin" variant="ink" size="lg">
            Sign in
          </Button>
          <Button href="/signup" variant="acid" size="lg">
            Create account
          </Button>
        </div>
      </div>
    );
  }

  // Redirecting after successful checkout
  if (redirecting) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center sm:px-6">
        <Stamp tone="acid" rotate={-3}>
          Redirecting
        </Stamp>
        <h1 className="mt-6 font-display text-4xl uppercase leading-[0.85] tracking-tight">
          Taking you to payment…
        </h1>
        <p className="mt-4 text-sm text-ink/70">
          You&apos;ll be redirected to our secure payment page.
        </p>
      </div>
    );
  }

  async function handleCheckout() {
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        items: items.map((item) => ({
          artwork_id: item.artwork_id,
          quantity: item.quantity,
        })),
      };

      const result = await commerceApi.checkout(payload, user!.id);

      // Clear cart after successful checkout creation
      clearCart();
      setRedirecting(true);

      // Redirect to Stripe checkout
      if (result.checkout_url) {
        window.location.href = result.checkout_url;
      }
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          setError("Your session expired. Please sign in again.");
        } else if (err.status === 422) {
          setError("Some items in your cart are no longer available.");
        } else {
          setError(err.message);
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="flex items-center gap-3">
        <h1 className="font-display text-4xl uppercase leading-[0.85] tracking-tight sm:text-5xl">
          Checkout
        </h1>
        <Stamp tone="acid" rotate={-2}>
          {itemCount} {itemCount === 1 ? "piece" : "pieces"}
        </Stamp>
      </div>

      {/* Items summary */}
      <div className="mt-8 flex flex-col gap-3">
        {items.map((item) => {
          const variant = VARIANTS[hashId(item.artwork_id) % VARIANTS.length];
          return (
            <div
              key={item.artwork_id}
              className="flex gap-3 border-2 border-ink bg-paper p-3 shadow-hard-sm"
            >
              <div className="h-14 w-14 flex-shrink-0 overflow-hidden border-2 border-ink bg-paper">
                {item.primary_media_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.primary_media_url}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Artwork variant={variant} />
                )}
              </div>
              <div className="flex flex-1 items-center justify-between">
                <div>
                  <p className="font-display text-sm uppercase leading-none tracking-tight">
                    {item.title}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-ink/60">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-mono text-sm font-bold">
                  ${item.price * item.quantity}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 border-t-2 border-ink pt-6">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-sm uppercase tracking-wider text-ink/70">
            Subtotal
          </p>
          <p className="font-display text-2xl uppercase tracking-tight">
            ${subtotal}
          </p>
        </div>
        <p className="mt-1 text-right font-mono text-[11px] uppercase tracking-wider text-ink/50">
          The backend validates pricing, availability, and creates a Stripe
          session.
        </p>
      </div>

      {error && (
        <div className="mt-4 border-2 border-signal bg-signal/5 p-4">
          <p className="font-mono text-xs font-bold text-signal">{error}</p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <Button
          size="lg"
          className="w-full"
          onClick={() => void handleCheckout()}
          disabled={submitting}
        >
          {submitting ? "Processing…" : "Complete purchase"}
        </Button>
        <div className="flex justify-center">
          <Link
            href="/cart"
            className="font-mono text-xs font-bold uppercase tracking-wider text-ink/60 underline-offset-4 hover:underline hover:decoration-2"
          >
            ← Back to cart
          </Link>
        </div>
      </div>
    </div>
  );
}
