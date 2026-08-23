import { cn } from "@/components/cn";

/** Base skeleton pulse animation. */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse bg-ink/10", className)}
      {...props}
    />
  );
}

/** Artwork card skeleton matching the existing ArtworkCard layout. */
export function ArtworkCardSkeleton({ className }: { className?: string }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col border-2 border-ink bg-paper shadow-hard",
        className,
      )}
    >
      <Skeleton className="aspect-[4/5] border-b-2 border-ink" />
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-baseline justify-between gap-3">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-3 w-1/2" />
      </div>
    </article>
  );
}

/** Artist card skeleton. */
export function ArtistCardSkeleton({ className }: { className?: string }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col border-2 border-ink bg-paper shadow-hard",
        className,
      )}
    >
      <Skeleton className="aspect-[4/3] border-b-2 border-ink" />
      <div className="flex flex-1 flex-col gap-2 p-3">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="mt-auto flex justify-between border-t-2 border-ink pt-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-9 w-full" />
      </div>
    </article>
  );
}

/** Product page skeleton — dual-pane layout. */
export function ProductSkeleton() {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2">
      {/* Left pane — media */}
      <div className="flex flex-col gap-4">
        <Skeleton className="aspect-[4/5] w-full border-2 border-ink" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-16 w-16 border-2 border-ink sm:h-20 sm:w-20"
            />
          ))}
        </div>
      </div>
      {/* Right pane — info */}
      <div className="flex flex-col gap-4 py-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}

/** Artist page skeleton. */
export function ArtistSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
        <Skeleton className="h-20 w-20 border-2 border-ink" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ArtworkCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

/** Search results skeleton. */
export function SearchResultSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <ArtworkCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Checkout skeleton. */
export function CheckoutSkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Skeleton className="h-10 w-48 mb-6" />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-4 border-2 border-ink p-4">
            <Skeleton className="h-16 w-16 border border-ink" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
      <Skeleton className="h-12 w-full mt-6" />
    </div>
  );
}
