import { Header } from "@/components/header";
import { SearchResultSkeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="h-10 w-48 animate-pulse bg-ink/10" />
          <div className="mt-6 h-12 w-full animate-pulse bg-ink/10" />
          <div className="mt-8">
            <SearchResultSkeleton />
          </div>
        </div>
      </main>
    </>
  );
}
