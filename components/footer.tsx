import Link from "next/link";
import { Stamp } from "./stamp";

const collectors = [
  { label: "Browse the wall", href: "/#just-dropped" },
  { label: "Curated walls", href: "/#curated-wall" },
  { label: "Meet the artists", href: "/#artists" },
  { label: "Track an order", href: "/user/sign-in" },
  { label: "FAQ", href: "/#faq" },
];

const artists = [
  { label: "Sell your work", href: "/user/sign-up" },
  { label: "Artist payouts", href: "/#faq" },
  { label: "Submission rules", href: "/#faq" },
  { label: "The journal", href: "/#journal" },
  { label: "Press kit", href: "/" },
];

const company = [
  { label: "About", href: "/" },
  { label: "Journal", href: "/#journal" },
  { label: "Contact", href: "/" },
  { label: "Terms", href: "/" },
  { label: "Privacy", href: "/" },
];

const socials = ["Instagram", "TikTok", "X", "Substack"];

const decoration: Record<string, string> = {
  acid: "decoration-acid",
  riot: "decoration-riot",
  electric: "decoration-electric",
};

function LinkCol({
  title,
  links,
  accent,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
  accent: "acid" | "riot" | "electric";
}) {
  return (
    <div>
      <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink/50">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className={`font-mono text-xs uppercase tracking-wider underline-offset-4 hover:underline hover:decoration-2 text-paper/80 hover:text-paper ${decoration[accent]}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-display text-4xl uppercase leading-none tracking-tight">
              Artisan
              <span className="align-super font-mono text-xs text-signal">®</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/80">
              A marketplace for indie and unknown artists to sell original art
              and prints directly to collectors. No galleries, no gatekeepers,
              no bullshit.
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-paper/60">
              We take 15%. That&apos;s it.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">                {socials.map((social) => (
                  <li key={social}>
                    <Link
                      href="/"
                      className="inline-block border-2 border-paper/30 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-paper/80 transition-colors hover:border-acid hover:bg-acid hover:text-ink"
                    >
                      {social}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <LinkCol title="For Collectors" links={collectors} accent="electric" />
          </div>
          <div className="lg:col-span-2">
            <LinkCol title="For Artists" links={artists} accent="riot" />
          </div>
          <div className="lg:col-span-2">
            <LinkCol title="The Studio" links={company} accent="acid" />
          </div>

          <div className="flex items-start justify-start lg:col-span-2 lg:justify-end">
            <Stamp tone="riot" rotate={6}>
              Made by artists
            </Stamp>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t-2 border-paper/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-widest text-paper/50">
            © 2026 Artisan. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-widest text-paper/50">
            Made by artists. Sold by artists. Hung by anyone.
          </p>
        </div>
      </div>
    </footer>
  );
}
