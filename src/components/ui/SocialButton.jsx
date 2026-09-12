import Icon from "./Icon";
import Magnetic from "./Magnetic";

export default function SocialButton({ social, compact = false }) {
  return (
    <Magnetic strength={0.2}>
      <a
        href={social.href}
        aria-label={`${social.label} profile`}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-2 rounded-xl border border-edge bg-surface text-sub transition-all duration-300 hover:border-accent/60 hover:bg-accent-soft hover:text-accent ${
          compact ? "h-11 w-11 justify-center" : "h-11 px-4"
        }`}
      >
        <Icon name={social.icon} size={compact ? 18 : 17} />
        {!compact && (
          <span className="text-sm font-medium text-ink group-hover:text-accent">
            {social.label}
          </span>
        )}
      </a>
    </Magnetic>
  );
}