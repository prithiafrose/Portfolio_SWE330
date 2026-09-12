import Reveal from "./Reveal";

export default function SectionTitle({ eyebrow, title, sub, align = "center" }) {
  const alignCls =
    align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignCls}`}>
      <Reveal>
        {eyebrow && (
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-edge bg-accent-soft px-3.5 py-1.5 text-xs font-semibold tracking-wide text-accent uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-sub sm:text-lg">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}