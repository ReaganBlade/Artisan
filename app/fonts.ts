import { Anton, Archivo, JetBrains_Mono } from "next/font/google";

// Display — heavy condensed grotesk, ALL CAPS, shouts like a poster.
export const display = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Body/UI — plain honest grotesk workhorse.
export const sans = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

// Labels/meta — mono for the small print, stamps, and tags.
export const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});
