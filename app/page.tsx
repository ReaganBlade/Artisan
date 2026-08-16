import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Marquee } from "@/components/marquee";
import { Hero } from "@/components/sections/hero";
import { JustDropped } from "@/components/sections/just-dropped";
import { Artists } from "@/components/sections/artists";
import { Categories } from "@/components/sections/categories";
import { Press } from "@/components/sections/press";
import { CuratedWall } from "@/components/sections/curated-wall";
import { Testimonials } from "@/components/sections/testimonials";
import { Journal } from "@/components/sections/journal";
import { Newsletter } from "@/components/sections/newsletter";
import { FaqSection } from "@/components/sections/faq-section";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Marquee />
        <Hero />
        <JustDropped />
        <Artists />
        <Categories />
        <Press />
        <CuratedWall />
        <Testimonials />
        <Journal />
        <Newsletter />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
