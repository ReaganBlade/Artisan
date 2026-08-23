import { Header } from "@/components/header";
import { ArtistSkeleton } from "@/components/ui/skeleton";

export default function ArtistLoading() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <ArtistSkeleton />
      </main>
    </>
  );
}
