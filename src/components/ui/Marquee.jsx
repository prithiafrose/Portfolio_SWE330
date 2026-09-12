import Reveal from "./Reveal";

export default function Marquee({ items, className = "" }) {
  const row = [...items, ...items];
  return (
    <Reveal y={16} className={className}>
      <div className="marquee-mask overflow-hidden py-2">
        <div className="animate-marquee flex w-max items-center gap-3 pr-3">
          {row.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-edge bg-surface px-4 py-2 text-sm font-medium text-sub"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}