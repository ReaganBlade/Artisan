import type { ArtVariant } from "./artwork";

export type Artwork = {
  id: string;
  title: string;
  artist: string;
  price: number;
  medium: string;
  edition: string;
  isNew?: boolean;
  isSold?: boolean;
  art: ArtVariant;
};

export type Artist = {
  id: string;
  name: string;
  bio: string;
  followers: number;
  sold: number;
  color: "acid" | "riot" | "electric" | "signal";
};

export const artworks: Artwork[] = [
  {
    id: "sunshower",
    title: "Sunshower",
    artist: "Mara Villanueva",
    price: 240,
    medium: "Screenprint",
    edition: "12/25",
    isNew: true,
    art: "sunburst",
  },
  {
    id: "tape-war",
    title: "Tape War",
    artist: "Dex Okafor",
    price: 90,
    medium: "Risograph print",
    edition: "8/40",
    art: "stripes",
  },
  {
    id: "soft-machine",
    title: "Soft Machine",
    artist: "Ingrid Sørensen",
    price: 510,
    medium: "Oil on panel",
    edition: "1/1",
    art: "blocks",
  },
  {
    id: "glass-teeth",
    title: "Glass Teeth",
    artist: "June Park",
    price: 180,
    medium: "Linocut",
    edition: "20/30",
    isNew: true,
    art: "checker",
  },
  {
    id: "parking-lot-sun",
    title: "Parking Lot Sun",
    artist: "Abel Torres",
    price: 320,
    medium: "Ink on paper",
    edition: "1/1",
    art: "sun",
  },
  {
    id: "moth-season",
    title: "Moth Season",
    artist: "Priya Nair",
    price: 145,
    medium: "Digital print",
    edition: "50/50",
    isSold: true,
    art: "halftone",
  },
  {
    id: "heavy-metal",
    title: "Heavy Metal",
    artist: "Dex Okafor",
    price: 120,
    medium: "Screenprint",
    edition: "10/50",
    art: "bars",
  },
  {
    id: "blue-noon",
    title: "Blue Noon",
    artist: "Ingrid Sørensen",
    price: 460,
    medium: "Oil on panel",
    edition: "1/1",
    art: "tri",
  },
];

export const artists: Artist[] = [
  {
    id: "mara",
    name: "Mara Villanueva",
    bio: "Printmaker. Screens, ink, and a lot of noise.",
    followers: 2140,
    sold: 46,
    color: "riot",
  },
  {
    id: "dex",
    name: "Dex Okafor",
    bio: "Draws the city at 3am. Posters for rent.",
    followers: 980,
    sold: 31,
    color: "electric",
  },
  {
    id: "ingrid",
    name: "Ingrid Sørensen",
    bio: "Oil paintings about machines that miss you.",
    followers: 3200,
    sold: 88,
    color: "signal",
  },
  {
    id: "june",
    name: "June Park",
    bio: "Carves anything that annoys her.",
    followers: 1560,
    sold: 52,
    color: "acid",
  },
];

export const categories = [
  { name: "Painting", count: "1,240 pieces", color: "bg-acid" },
  { name: "Print", count: "3,812 pieces", color: "bg-riot" },
  { name: "Photography", count: "980 pieces", color: "bg-electric" },
  { name: "Digital", count: "1,574 pieces", color: "bg-acid" },
  { name: "Sculpture", count: "412 pieces", color: "bg-riot" },
  { name: "Ceramics", count: "640 pieces", color: "bg-electric" },
] as const;

export const press = [
  "ART PULP",
  "THE DAILY PRINT",
  "MARGINALIA",
  "JUNK DRAWER",
  "GALLERY VOID",
  "SCREEN TIME",
] as const;

export const testimonials = [
  {
    quote:
      "Bought a print from a complete stranger. It's the best thing on my wall. Zero regrets.",
    name: "Priya D.",
    role: "Collector, London",
    stars: 5,
  },
  {
    quote:
      "Sold out in four hours. Payout hit my account before the pizza I ordered did.",
    name: "Dex Okafor",
    role: "Artist, Chicago",
    stars: 5,
  },
  {
    quote:
      "Never bought art before. This felt like buying a zine from a friend, not a gallery visit.",
    name: "Tom R.",
    role: "First-time collector",
    stars: 4,
  },
  {
    quote: "The fees are printed in plain numbers. No service-charge surprise at checkout.",
    name: "Ana M.",
    role: "Collector, Lisbon",
    stars: 5,
  },
];

export const journal = [
  {
    id: "studio-visit-mara",
    date: "AUG 12, 2026",
    title: "Studio visit: Mara's screen-print kitchen",
    excerpt:
      "She prints in her apartment, between the stove and the laundry machine. We asked how that's even legal.",
  },
  {
    id: "how-i-made-tape-war",
    date: "AUG 5, 2026",
    title: "How I made this: 'Tape War' in four steps",
    excerpt:
      "Dex walks through the riso, the misprint he kept, and why the red is that specific red.",
  },
  {
    id: "what-raw-means",
    date: "JUL 28, 2026",
    title: "What 'raw' actually means to twelve artists",
    excerpt:
      "We asked twelve artists what they want a collector to know. The answers are not polite.",
  },
];

export const faqs = [
  {
    q: "How much do you take?",
    a: "15% on each sale. That's it. No listing fees, no hidden charges, no 'platform enhancements'. Artists get 85% the day the buyer's payment clears.",
  },
  {
    q: "How do artists get paid?",
    a: "Flat payout to your bank account, 48 hours after delivery is confirmed. No escrow theater, no 'waiting for the invoice cycle'.",
  },
  {
    q: "How do I submit my work?",
    a: "Sign up as an artist and upload three pieces. A human reviews them — not a bot, not an algorithm. Approval takes two to four days. No CV, no gallery history, no gatekeeping.",
  },
  {
    q: "What about returns?",
    a: "Buyers have seven days from delivery. If the work arrives damaged, we cover shipping both ways. If you just changed your mind, you pay return shipping. Be honest and it's simple.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, to 40+ countries. Prints ship flat in a rigid mailer. Paintings and sculpture ship in custom crates, fully insured.",
  },
  {
    q: "Is the art actually original?",
    a: "Every work is uploaded by the artist who made it. We verify identity at sign-up and run the occasional reverse-image check. If we catch a fake, it's gone — and so is the artist.",
  },
];
