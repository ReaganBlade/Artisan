import { Artwork } from "./artwork";
import { Stamp } from "./stamp";
import { cn } from "./cn";
import type { Artwork as ArtworkData } from "./data";

export function ArtworkCard({
  artwork,
  className,
  aspect = "aspect-[4/5]",
}: {
  artwork: ArtworkData;
  className?: string;
  aspect?: string;
}) {
  return (
    <article
      className={cn(
        "card-hover group flex h-full flex-col border-2 border-ink bg-paper shadow-hard",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden border-b-2 border-ink", aspect)}>
        <Artwork variant={artwork.art} />
        {artwork.isNew && (
          <Stamp tone="acid" className="absolute left-2 top-2 z-10">
            New
          </Stamp>
        )}
        {artwork.isSold && (
          <Stamp tone="signal" className="absolute left-2 top-2 z-10">
            Sold out
          </Stamp>
        )}
        {/* Signature device: the hand-stamped edition tag, every single card */}
        <Stamp tone="ink" rotate={3} className="absolute bottom-2 right-2 z-10">
          Ed. {artwork.edition}
        </Stamp>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg uppercase leading-none tracking-tight">
            {artwork.title}
          </h3>
          <p className="whitespace-nowrap font-mono text-sm font-bold">
            ${artwork.price}
          </p>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-wider text-ink/70">
          {artwork.artist} · {artwork.medium}
        </p>
      </div>
    </article>
  );
}
