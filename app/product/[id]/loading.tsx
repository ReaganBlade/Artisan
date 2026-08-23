import { Header } from "@/components/header";
import { ProductSkeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <ProductSkeleton />
      </main>
    </>
  );
}
