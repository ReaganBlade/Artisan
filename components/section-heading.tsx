import { CropMarks } from "./crop-marks";
import { cn } from "./cn";

export function SectionHeading({
  kicker,
  title,
  note,
  dark,
  className,
  titleClassName,
}: {
  kicker: string;
  title: string;
  note?: string;
  /** For headings sitting on an ink background */
  dark?: boolean;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative border-2 px-5 py-4 shadow-hard-sm",
        dark
          ? "border-paper bg-ink"
          : "border-ink bg-paper",
        className,
      )}
    >
      <CropMarks className={dark ? "border-paper" : undefined} />
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <p
            className={cn(
              "mb-2 font-mono text-xs uppercase tracking-[0.2em]",
              dark ? "text-paper/60" : "text-ink/70",
            )}
          >
            {kicker}
          </p>
          <h2
            className={cn(
              "font-display text-4xl uppercase leading-[0.9] tracking-tight sm:text-5xl lg:text-6xl",
              dark ? "text-paper" : "text-ink",
              titleClassName,
            )}
          >
            {title}
          </h2>
        </div>
        {note && (
          <p
            className={cn(
              "pb-1 font-mono text-xs uppercase tracking-widest",
              dark ? "text-paper/60" : "text-ink/70",
            )}
          >
            {note}
          </p>
        )}
      </div>
    </div>
  );
}
