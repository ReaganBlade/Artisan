import { cn } from "./cn";

export type ArtVariant =
  | "sunburst"
  | "stripes"
  | "checker"
  | "halftone"
  | "blocks"
  | "bars"
  | "sun"
  | "grid"
  | "tri";

/**
 * Placeholder artwork rendered entirely in CSS, using the site palette.
 * Stands in for real images until the marketplace has actual assets —
 * and honestly, the loud graphic look suits the zine vibe.
 */
export function Artwork({
  variant,
  className,
}: {
  variant: ArtVariant;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate h-full w-full overflow-hidden bg-paper",
        className,
      )}
    >
      {renderArt(variant)}
    </div>
  );
}

function renderArt(variant: ArtVariant) {
  switch (variant) {
    case "sunburst":
      return (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 32% 30%, var(--acid) 0%, var(--acid) 26%, var(--electric) 27%, var(--electric) 100%)",
            }}
          />
          <div
            className="absolute -left-6 -top-10 h-48 w-48 rounded-full border-4 border-ink"
            style={{ background: "var(--paper)" }}
          />
          <div className="absolute bottom-0 right-0 h-16 w-3/5 border-t-4 border-ink bg-ink" />
        </>
      );
    case "stripes":
      return (
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(45deg, var(--ink) 0 22px, var(--acid) 22px 44px, var(--riot-pink) 44px 66px, var(--paper) 66px 88px)",
          }}
        />
      );
    case "checker":
      return (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                "conic-gradient(var(--ink) 25%, var(--paper) 0 50%, var(--ink) 0 75%, var(--paper) 0)",
              backgroundSize: "44px 44px",
            }}
          />
          <div
            className="absolute -right-10 -top-10 h-44 w-44 rounded-full border-4 border-ink"
            style={{ background: "var(--riot-pink)" }}
          />
        </>
      );
    case "halftone":
      return (
        <div
          className="absolute inset-0 bg-acid"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--ink) 2.4px, transparent 3px)",
            backgroundSize: "18px 18px",
          }}
        />
      );
    case "blocks":
      return (
        <>
          <div className="absolute inset-0 bg-paper" />
          <div
            className="absolute left-[8%] top-[12%] h-[45%] w-[55%] border-4 border-ink bg-electric"
            style={{ transform: "rotate(-4deg)" }}
          />
          <div
            className="absolute bottom-[8%] right-[6%] h-[38%] w-[42%] border-4 border-ink bg-riot"
            style={{ transform: "rotate(3deg)" }}
          />
        </>
      );
    case "bars":
      return (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--ink) 0 12%, var(--acid) 12% 26%, var(--ink) 26% 40%, var(--electric) 40% 60%, var(--ink) 60% 74%, var(--riot-pink) 74% 88%, var(--ink) 88% 100%)",
          }}
        />
      );
    case "sun":
      return (
        <>
          <div className="absolute inset-0 bg-ink" />
          <div
            className="absolute -top-8 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full border-4 border-ink"
            style={{ background: "var(--acid)" }}
          />
          <div className="absolute bottom-[28%] left-0 h-6 w-full bg-paper" />
          <div className="absolute bottom-[16%] left-0 h-4 w-full bg-electric" />
        </>
      );
    case "grid":
      return (
        <>
          <div
            className="absolute inset-0 bg-ink"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, var(--acid) 0 3px, transparent 3px 44px), repeating-linear-gradient(90deg, var(--acid) 0 3px, transparent 3px 44px)",
            }}
          />
          <div
            className="absolute bottom-4 right-4 h-20 w-20 border-4 border-ink"
            style={{ background: "var(--signal-orange)" }}
          />
        </>
      );
    case "tri":
      return (
        <>
          <div className="absolute inset-0 bg-paper" />
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(0 100%, 100% 100%, 0 0)",
              background: "var(--ink)",
            }}
          />
          <div
            className="absolute left-[55%] top-[12%] h-24 w-24 rounded-full border-4 border-ink"
            style={{ background: "var(--acid)" }}
          />
        </>
      );
  }
}
