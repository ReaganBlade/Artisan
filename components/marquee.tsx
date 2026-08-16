const items = [
  "No gatekeepers",
  "Artists keep 85%",
  "No curatorial ego",
  "New drops daily",
  "Sold direct to you",
  "No CV required",
];

export function Marquee() {
  const row = (
    <>
      {items.map((item) => (
        <span key={item} className="flex shrink-0 items-center">
          <span className="whitespace-nowrap px-6 font-display text-xl uppercase tracking-wide">
            {item}
          </span>
          <span aria-hidden="true" className="text-acid">
            ✦
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y-2 border-ink bg-ink py-2.5 text-paper"
    >
      <div className="animate-marquee flex w-max">
        <div className="flex shrink-0">{row}</div>
        <div className="flex shrink-0">{row}</div>
      </div>
    </div>
  );
}
