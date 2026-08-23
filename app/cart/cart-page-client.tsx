"use client";

import Link from "next/link";
import { Artwork } from "@/components/artwork";
import { Button } from "@/components/button";
import { Stamp } from "@/components/stamp";
import { useCart } from "@/lib/cart/provider";

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

export function CartPageClient() {
  const { items, itemCount, subtotal, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center sm:px-6">
        <Stamp tone="riot" rotate={-3}>
          Empty
        </Stamp>
        <h1 className="mt-6 font-display text-5xl uppercase leading-[0.85] tracking-tight sm:text-6xl">
          Your cart is empty
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed">
          The wall is waiting. Find something worth hanging.
        </p>
        <Button href="/" variant="ink" size="lg" className="mt-8">
          Browse the wall
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="flex items-center gap-3">
        <h1 className="font-display text-4xl uppercase leading-[0.85] tracking-tight sm:text-5xl">
          Your cart
        </h1>
        <Stamp tone="acid" rotate={-2}>
          {itemCount} {itemCount === 1 ? "piece" : "pieces"}
        </Stamp>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {items.map((item) => {
          const variant = VARIANTS[hashId(item.artwork_id) % VARIANTS.length];
          return (
            <div
              key={item.artwork_id}
              className="flex gap-4 border-2 border-ink bg-paper p-3 shadow-hard sm:p-4"
            >
              <Link
                href={`/product/${item.artwork_id}`}
                className="h-20 w-20 flex-shrink-0 overflow-hidden border-2 border-ink bg-paper sm:h-24 sm:w-24"
              >
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
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={`/product/${item.artwork_id}`}
                    className="font-display text-lg uppercase leading-none tracking-tight hover:underline"
                  >
                    {item.title}
                  </Link>
                  <p className="font-mono text-xs uppercase tracking-wider text-ink/60">
                    {item.artist_name}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor={`qty-${item.artwork_id}`}
                      className="sr-only"
                    >
                      Quantity
                    </label>
                    <select
                      id={`qty-${item.artwork_id}`}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.artwork_id,
                          Number(e.target.value),
                        )
                      }
                      className="border-2 border-ink bg-paper px-2 py-1 font-mono text-xs font-bold"
                    >
                      {Array.from({ length: 10 }).map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeItem(item.artwork_id)}
                      className="font-mono text-xs font-bold uppercase tracking-wider text-signal underline-offset-4 hover:underline hover:decoration-2"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="font-mono text-sm font-bold">
                    ${item.price * item.quantity}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-8 border-t-2 border-ink pt-6">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-sm uppercase tracking-wider text-ink/70">
            Subtotal
          </p>
          <p className="font-display text-2xl uppercase tracking-tight">
            ${subtotal}
          </p>
        </div>
        <p className="mt-1 text-right font-mono text-[11px] uppercase tracking-wider text-ink/50">
          Shipping &amp; tax calculated at checkout
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="paper" size="md" className="flex-1">
            Keep browsing
          </Button>
          <Button href="/checkout" variant="ink" size="lg" className="flex-1">
            Proceed to checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
