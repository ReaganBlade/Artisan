"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Artwork } from "@/components/artwork";
import { Stamp } from "@/components/stamp";
import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { discoveryApi } from "@/lib/api/discovery";
import { cn } from "@/components/cn";
import type { SearchResult } from "@/types";
import { ArtworkCardSkeleton } from "@/components/ui/skeleton";

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

export function SearchPageClient() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"standard" | "vibe">("standard");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;

      setLoading(true);
      setError(null);
      setSearched(true);

      try {
        const response =
          mode === "vibe"
            ? await discoveryApi.vibeSearch(query.trim())
            : await discoveryApi.search(query.trim());
        setResults(response.items ?? []);
      } catch {
        if (mode === "vibe") {
          // AI search failure — offer standard search as fallback
          setError(
            "AI vibe search is unavailable. Try standard search instead.",
          );
          // Attempt fallback to standard search
          try {
            const fallback = await discoveryApi.search(query.trim());
            setResults(fallback.items ?? []);
            setMode("standard");
          } catch {
            setResults([]);
          }
        } else {
          setError("Search is temporarily unavailable. Please try again.");
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [query, mode],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl uppercase leading-[0.85] tracking-tight sm:text-5xl">
            Search the wall
          </h1>
          <p className="mt-2 text-sm text-ink/70">
            Find art by keyword, or let AI match your vibe.
          </p>
        </div>

        {/* Mode toggle */}
        <div
          className="flex border-2 border-ink shadow-hard-sm"
          role="radiogroup"
          aria-label="Search mode"
        >
          <button
            type="button"
            role="radio"
            aria-checked={mode === "standard"}
            onClick={() => setMode("standard")}
            className={cn(
              "px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors",
              mode === "standard"
                ? "bg-ink text-paper"
                : "bg-paper text-ink hover:bg-acid",
            )}
          >
            Standard
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={mode === "vibe"}
            onClick={() => setMode("vibe")}
            className={cn(
              "px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors",
              mode === "vibe"
                ? "bg-ink text-paper"
                : "bg-paper text-ink hover:bg-acid",
            )}
          >
            AI Vibe
          </button>
        </div>
      </div>

      {/* Search form */}
      <form onSubmit={handleSearch} className="mt-6">
        <div className="flex gap-3">
          <Field
            id="search-query"
            label=""
            placeholder={
              mode === "vibe"
                ? "Describe the mood… e.g. \"melancholy cityscape at dawn\""
                : "Search artworks, artists, mediums…"
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="lg" disabled={loading || !query.trim()}>
            {loading ? "Searching…" : "Search"}
          </Button>
        </div>
        {mode === "vibe" && (
          <p className="mt-2 font-mono text-[11px] text-ink/50">
            Powered by AI semantic search. Describe what you feel, not just what
            you see.
          </p>
        )}
      </form>

      {/* Error */}
      {error && (
        <div className="mt-6 border-2 border-signal bg-signal/5 p-4">
          <p className="font-mono text-xs font-bold text-signal">{error}</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ArtworkCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && searched && (
        <div className="mt-8">
          {results.length === 0 ? (
            <div className="flex flex-col items-center border-2 border-ink bg-paper py-16 text-center shadow-hard">
              <Stamp tone="riot" rotate={-4}>
                Nothing
              </Stamp>
              <p className="mt-4 font-display text-2xl uppercase tracking-tight">
                No results
              </p>
              <p className="mt-2 max-w-sm text-sm text-ink/70">
                {mode === "vibe"
                  ? "The AI couldn't find a match. Try different words or switch to standard search."
                  : "Try different keywords or check your spelling."}
              </p>
              {mode === "vibe" && (
                <Button
                  variant="paper"
                  size="sm"
                  className="mt-4"
                  onClick={() => setMode("standard")}
                >
                  Switch to standard search
                </Button>
              )}
            </div>
          ) : (
            <>
              <p className="mb-4 font-mono text-xs uppercase tracking-wider text-ink/60">
                {results.length} {results.length === 1 ? "result" : "results"}{" "}
                {mode === "vibe" ? "matched your vibe" : "found"}
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {results.map((result) => {
                  const variant =
                    VARIANTS[hashId(result.id) % VARIANTS.length];
                  return (
                    <Link
                      key={result.id}
                      href={`/product/${result.id}`}
                      className="card-hover group flex h-full flex-col border-2 border-ink bg-paper shadow-hard"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-ink">
                        {result.primary_media_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={result.primary_media_url}
                            alt={result.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Artwork variant={variant} />
                        )}
                      </div>
                      <div className="flex flex-col gap-1 p-3">
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="font-display text-lg uppercase leading-none tracking-tight">
                            {result.title}
                          </h3>
                          {result.price != null && (
                            <p className="whitespace-nowrap font-mono text-sm font-bold">
                              ${result.price}
                            </p>
                          )}
                        </div>
                        <p className="font-mono text-[11px] uppercase tracking-wider text-ink/70">
                          {result.artist_name} · {result.art_type}
                        </p>
                        {result.score != null && mode === "vibe" && (
                          <p className="font-mono text-[10px] text-electric">
                            Match: {Math.round(result.score * 100)}%
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* Initial state */}
      {!searched && !loading && (
        <div className="mt-16 flex flex-col items-center text-center">
          <Stamp tone="acid" rotate={-3}>
            Discover
          </Stamp>
          <p className="mt-4 font-display text-3xl uppercase tracking-tight">
            What are you looking for?
          </p>
          <p className="mt-2 max-w-md text-sm text-ink/70">
            {mode === "vibe"
              ? "Describe a mood, a feeling, or a scene. The AI will find art that matches."
              : "Search by artwork title, artist name, medium, or style."}
          </p>
        </div>
      )}
    </div>
  );
}
