const BAR_HEIGHTS = [40, 70, 55, 90];

export function StackMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-6 items-end gap-[3px] ${className}`}
      aria-hidden="true"
    >
      {BAR_HEIGHTS.map((height, index) => (
        <span
          key={index}
          className="w-[4px] rounded-[1px] bg-teal-light"
          style={{ height: `${height}%` }}
        />
      ))}
    </span>
  );
}
