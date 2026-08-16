import { Button } from "./button";
import { Stamp } from "./stamp";
import { cn } from "./cn";
import type { Artist } from "./data";

const avatarBg: Record<Artist["color"], string> = {
  acid: "bg-acid",
  riot: "bg-riot",
  electric: "bg-electric",
  signal: "bg-signal",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <article className="card-hover flex h-full flex-col border-2 border-ink bg-paper shadow-hard">
      <div className="relative border-b-2 border-ink">
        <div
          className={cn(
            "flex aspect-[4/3] items-center justify-center",
            avatarBg[artist.color],
          )}
        >
          <span className="font-display text-6xl uppercase leading-none tracking-tight">
            {initials(artist.name)}
          </span>
        </div>
        <Stamp tone="paper" rotate={-4} className="absolute bottom-2 right-2">
          On the wall
        </Stamp>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="font-display text-2xl uppercase leading-none tracking-tight">
          {artist.name}
        </h3>
        <p className="text-sm leading-snug">{artist.bio}</p>
        <dl className="mt-auto flex justify-between border-t-2 border-ink pt-2 font-mono text-[11px] uppercase tracking-wider">
          <div>
            <dt className="sr-only">Followers</dt>
            <dd className="font-bold">{artist.followers.toLocaleString()} followers</dd>
          </div>
          <div>
            <dt className="sr-only">Pieces sold</dt>
            <dd className="font-bold">{artist.sold} sold</dd>
          </div>
        </dl>
        <Button variant="paper" size="sm" className="w-full">
          Follow this artist
        </Button>
      </div>
    </article>
  );
}
