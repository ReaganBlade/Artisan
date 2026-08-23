import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { mediaApi } from "@/lib/api/media";
import { personalizationApi } from "@/lib/api/personalization";
import { ProductPageClient } from "./product-page-client";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const artwork = await mediaApi.getArtwork(id);
    return {
      title: `${artwork.title} — Artisan`,
      description: artwork.description ?? `View ${artwork.title} on Artisan`,
      openGraph: {
        title: artwork.title,
        description: artwork.description ?? undefined,
        images: artwork.primary_media_url
          ? [{ url: artwork.primary_media_url }]
          : [],
        type: "website",
      },
    };
  } catch {
    return { title: "Artwork — Artisan" };
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  let artwork;
  try {
    artwork = await mediaApi.getArtwork(id);
  } catch {
    notFound();
  }

  if (!artwork || artwork.status === "archived") {
    notFound();
  }

  // Log view interaction (fire-and-forget, do not block rendering)
  personalizationApi.logInteraction(id, "view");

  // Fetch media files for gallery
  let mediaFiles: Awaited<ReturnType<typeof mediaApi.getMediaFiles>> = [];
  try {
    mediaFiles = await mediaApi.getMediaFiles(id);
  } catch {
    // Media files are optional — product page still renders
  }

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <ProductPageClient artwork={artwork} mediaFiles={mediaFiles} />
      </main>
      <Footer />
    </>
  );
}
