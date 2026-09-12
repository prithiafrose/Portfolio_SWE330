import Magnetic from "./Magnetic";

const variants = {
  primary:
    "bg-accent text-white shadow-[0_10px_30px_-10px_var(--glow)] hover:bg-accent-hover hover:shadow-[0_14px_36px_-8px_var(--glow)]",
  secondary:
    "border border-edge text-ink hover:border-accent/60 hover:bg-accent-soft",
  ghost: "text-sub hover:text-accent",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function AnimatedButton({
  href,
  onClick,
  variant = "primary",
  size = "md",
  children,
  className = "",
  download,
  newTab = true,
  ariaLabel,
}) {
  const classes = `group relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${variants[variant]} ${sizes[size]} ${className}`;

  const inner = (
    <Magnetic className="inline-flex items-center gap-2">
      <span className="inline-flex items-center gap-2">{children}</span>
    </Magnetic>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        download={download}
        aria-label={ariaLabel}
        {...(newTab && !download
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}