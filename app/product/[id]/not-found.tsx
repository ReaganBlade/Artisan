import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/button";
import { Stamp } from "@/components/stamp";

export default function ProductNotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center sm:px-6">
          <Stamp tone="signal" rotate={-4}>
            404
          </Stamp>
          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.85] tracking-tight sm:text-6xl">
            Artwork not found
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed">
            This piece may have been removed, sold, or never existed. The wall
            moves fast.
          </p>
          <Button href="/" variant="ink" size="lg" className="mt-8">
            Back to the wall
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
