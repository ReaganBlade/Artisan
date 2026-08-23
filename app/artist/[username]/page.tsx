import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { mediaApi } from "@/lib/api/media";
import { ArtistPageClient } from "./artist-page-client";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  try {
    const profile = await mediaApi.getProfile(username);
    return {
      title: `${profile.display_name} — Artisan`,
      description: profile.bio ?? `View ${profile.display_name}'s work on Artisan`,
      openGraph: {
        title: profile.display_name,
        description: profile.bio ?? undefined,
        images: profile.avatar_url ? [{ url: profile.avatar_url }] : [],
        type: "profile",
      },
    };
  } catch {
    return { title: "Artist — Artisan" };
  }
}

export default async function ArtistPage({ params }: Props) {
  const { username } = await params;

  let profile;
  try {
    profile = await mediaApi.getProfile(username);
  } catch {
    notFound();
  }

  // Fetch artworks for this profile
  let artworks: Awaited<ReturnType<typeof mediaApi.getProfileArtworks>> = {
    items: [],
    total: 0,
    limit: 20,
    offset: 0,
  };
  try {
    artworks = await mediaApi.getProfileArtworks(profile.id, { limit: 20 });
  } catch {
    // Empty portfolio is a valid state
  }

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <ArtistPageClient profile={profile} artworks={artworks.items} />
      </main>
      <Footer />
    </>
  );
}
