"use client";

import { useState } from "react";
import Link from "next/link";
import { Artwork } from "@/components/artwork";
import { Button } from "@/components/button";
import { Stamp } from "@/components/stamp";
import { useCart } from "@/lib/cart/provider";
import { cn } from "@/components/cn";
import type { Artwork as ArtworkType, MediaFile } from "@/types";

type Props = {
  artwork: ArtworkType;
  mediaFiles: MediaFile[];
};

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

export function ProductPageClient({ artwork, mediaFiles }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem, isInCart } = useCart();

  const variant = VARIANTS[hashId(artwork.id) % VARIANTS.length];
  const inCart = isInCart(artwork.id);
  const isSold = artwork.status === "sold";
  const price = artwork.price ?? 0;

  // Build image list: primary media URL first, then additional media files
  const images: string[] = [];
  if (artwork.primary_media_url) {
    images.push(artwork.primary_media_url);
  }
  for (const file of mediaFiles) {
    if (file.url !== artwork.primary_media_url) {
      images.push(file.url);
    }
  }

  function handleAddToCart() {
    if (inCart || isSold) return;
    addItem({
      artwork_id: artwork.id,
      title: artwork.title,
      price,
      primary_media_url: artwork.primary_media_url,
      artist_name: "Artist",
      quantity: 1,
    });
    setAddedToCart(true);
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2">
      {/* Left Pane — Media */}
      <div className="flex flex-col gap-4">
        <div className="relative aspect-[4/5] w-full overflow-hidden border-2 border-ink bg-paper shadow-hard">
          {images.length > 0 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={images[selectedImage]}
              alt={artwork.title}
              className="h-full w-full object-contain"
            />
          ) : (
            <Artwork variant={variant} />
          )}
          {artwork.status === "sold" && (
            <Stamp
              tone="signal"
              className="absolute left-4 top-4 z-10 text-sm"
            >
              Sold out
            </Stamp>
          )}
        </div>

        {/* Thumbnail gallery */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {images.map((url, idx) => (
              <button
                key={url}
                type="button"
                onClick={() => setSelectedImage(idx)}
                className={cn(
                  "h-16 w-16 flex-shrink-0 border-2 border-ink bg-paper transition-colors sm:h-20 sm:w-20",
                  selectedImage === idx && "border-electric shadow-[2px_2px_0_0_var(--electric)]",
                )}
                aria-label={`View image ${idx + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Pane — Info */}
      <div className="flex flex-col gap-5 py-4">
        <p className="font-mono text-xs uppercase tracking-wider text-ink/60">
          {artwork.art_type}
        </p>

        <h1 className="font-display text-4xl uppercase leading-[0.9] tracking-tight sm:text-5xl">
          {artwork.title}
        </h1>

        <Link
          href={`/artist/unknown`}
          className="font-mono text-sm font-bold uppercase tracking-wider text-electric underline-offset-4 hover:underline hover:decoration-2"
        >
          Artist
        </Link>

        {artwork.description && (
          <p className="text-base leading-relaxed text-ink/80">
            {artwork.description}
          </p>
        )}

        <div className="flex items-baseline gap-3">
          <p className="font-display text-3xl uppercase tracking-tight">
            ${price}
          </p>
          <Stamp tone="acid" rotate={-2}>
            {isSold ? "Sold" : "Available"}
          </Stamp>
        </div>

        <dl className="grid grid-cols-2 gap-3 border-t-2 border-ink pt-4 font-mono text-xs uppercase tracking-wider">
          <div>
            <dt className="text-ink/60">Medium</dt>
            <dd className="mt-0.5 font-bold">{artwork.art_type}</dd>
          </div>
          <div>
            <dt className="text-ink/60">Status</dt>
            <dd className="mt-0.5 font-bold">{artwork.status}</dd>
          </div>
          <div>
            <dt className="text-ink/60">Added</dt>
            <dd className="mt-0.5 font-bold">
              {new Date(artwork.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </dd>
          </div>
        </dl>

        <div className="flex flex-col gap-3 pt-2">
          {isSold ? (
            <Button size="lg" className="w-full" disabled>
              Sold out
            </Button>
          ) : addedToCart || inCart ? (
            <Button href="/cart" variant="electric" size="lg" className="w-full">
              View cart ({isInCart(artwork.id) ? "in cart" : "added"})
            </Button>
          ) : (
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
