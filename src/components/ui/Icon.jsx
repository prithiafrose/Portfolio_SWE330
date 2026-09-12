import {
  Award,
  ArrowRight,
  ArrowUp,
  Braces,
  Brain,
  CheckCircle2,
  Code,
  Database,
  Download,
  ExternalLink,
  Facebook,
  Gamepad2,
  Github,
  GraduationCap,
  Instagram,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Moon,
  Phone,
  Rocket,
  Send,
  Server,
  Smartphone,
  Sparkles,
  Star,
  Sun,
  Target,
  Trophy,
  Wrench,
  X,
} from "lucide-react";

const iconMap = {
  menu: Menu,
  close: X,
  sun: Sun,
  moon: Moon,
  download: Download,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  mapPin: MapPin,
  mail: Mail,
  phone: Phone,
  code: Code,
  smartPhone: Smartphone,
  gamepad: Gamepad2,
  monitor: Monitor,
  server: Server,
  database: Database,
  brain: Brain,
  wrench: Wrench,
  graduation: GraduationCap,
  lightbulb: Lightbulb,
  target: Target,
  sparkles: Sparkles,
  trophy: Trophy,
  github: Github,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
  external: ExternalLink,
  send: Send,
  rocket: Rocket,
  check: CheckCircle2,
  award: Award,
  star: Star,
  braces: Braces,
};

function SnapchatIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2c3 0 5.5 2.5 5.5 5.5 0 1.7-.6 3-1.6 4-.2.3-.2.6 0 .9.2.2.5.3.8.3 1.4 0 2.8.3 3.3 1 .2.3.2 1 .5 1 .3 0 1-.5 1.5-.5.5 0 1.2.5 1.2 1.2 0 .7-1.5 1.5-3 1.9 0 .3.1.6.1.9 0 2-3 3.8-8 3.8s-8-1.8-8-3.8c0-.3 0-.6.1-.9-1.5-.4-3-1.2-3-1.9 0-.7.7-1.2 1.2-1.2.5 0 1.2.5 1.5.5.3 0 .3-.7.5-1 .5-.7 1.9-1 3.3-1 .3 0 .6-.1.8-.3.2-.3.2-.6 0-.9-.9-1-1.5-2.3-1.5-4C6.5 4.5 9 2 12 2Z" />
    </svg>
  );
}

export default function Icon({ name, size = 20, className = "", strokeWidth = 2 }) {
  if (name === "snapchat") {
    return <SnapchatIcon size={size} className={className} />;
  }
  const Cmp = iconMap[name];
  if (!Cmp) return null;
  return <Cmp size={size} className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}