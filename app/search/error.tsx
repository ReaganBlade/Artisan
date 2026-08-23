"use client";

import { Button } from "@/components/button";
import { Stamp } from "@/components/stamp";

export default function SearchError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <Stamp tone="signal" rotate={-3}>
        Error
      </Stamp>
      <h1 className="mt-6 font-display text-4xl uppercase leading-[0.85] tracking-tight">
        Search unavailable
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed">
        The search service is temporarily down. Try again in a moment.
      </p>
      {error.digest && (
        <p className="mt-2 font-mono text-xs text-ink/50">
          Reference: {error.digest}
        </p>
      )}
      <div className="mt-8 flex gap-3">
        <Button onClick={reset} variant="acid" size="md">
          Try again
        </Button>
        <Button href="/" variant="ink" size="md">
          Back to the wall
        </Button>
      </div>
    </div>
  );
}
