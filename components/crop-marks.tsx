const positions = [
  "left-1.5 top-1.5 border-l-2 border-t-2",
  "right-1.5 top-1.5 border-r-2 border-t-2",
  "left-1.5 bottom-1.5 border-l-2 border-b-2",
  "right-1.5 bottom-1.5 border-r-2 border-b-2",
];

export function CropMarks({ className }: { className?: string }) {
  return (
    <>
      {positions.map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`pointer-events-none absolute h-2.5 w-2.5 border-ink ${pos} ${className ?? ""}`}
        />
      ))}
    </>
  );
}
