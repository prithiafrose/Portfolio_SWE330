import { useState } from "react";
import { personal, socials } from "../../data/portfolio";
import Reveal from "../ui/Reveal";
import GlassCard from "../ui/GlassCard";
import SectionTitle from "../ui/SectionTitle";
import SocialButton from "../ui/SocialButton";
import Icon from "../ui/Icon";

const infoCards = [
  {
    icon: "mail",
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    icon: "phone",
    label: "Phone",
    value: personal.phone,
    href: `tel:${personal.phoneRaw}`,
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    value: "prithi-afrose-152220393",
    href: "https://www.linkedin.com/in/prithi-afrose-152220393",
  },
  {
    icon: "mapPin",
    label: "Location",
    value: personal.location,
    href: null,
  },
];

export default function Contact() {
  const [status, setStatus] = useState({ sent: false, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus({
        sent: false,
        message: "Form not configured yet — the site owner needs to set the Web3Forms key.",
      });
      return;
    }

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();

    setStatus({ sent: false, message: "Sending…" });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          message,
          subject: `Portfolio message from ${name}`,
          from_name: name,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus({ sent: true, message: "Message sent — I'll get back to you soon!" });
        form.reset();
      } else {
        setStatus({ sent: false, message: "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ sent: false, message: "Network error. Please try again." });
    }

    setTimeout(() => setStatus({ sent: false, message: "" }), 5000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-bg-secondary/60" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionTitle
          eyebrow="Contact"
          title={
            <>
              Let's{" "}
              <span className="text-gradient">connect</span>
            </>
          }
          sub="Open to internship and entry-level opportunities. Say hello — I reply fast."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="flex flex-col gap-4 lg:col-span-2">
            {infoCards.map((card, i) => (
              <Reveal key={card.label} delay={i * 0.06}>
                {card.href ? (
                  <a
                    href={card.href}
                    className="group flex items-center gap-4 rounded-2xl border border-edge bg-surface p-5 transition-all duration-300 hover:border-accent/60 hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-105">
                      <Icon name={card.icon} size={19} />
                    </span>
                    <span>
                      <span className="block text-xs font-medium text-mute">{card.label}</span>
                      <span className="text-sm font-semibold text-ink">{card.value}</span>
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 rounded-2xl border border-edge bg-surface p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <Icon name={card.icon} size={19} />
                    </span>
                    <span>
                      <span className="block text-xs font-medium text-mute">{card.label}</span>
                      <span className="text-sm font-semibold text-ink">{card.value}</span>
                    </span>
                  </div>
                )}
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <GlassCard className="p-5" spotlight>
                <div className="flex items-center gap-2 text-sm font-bold text-ink">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  {personal.availability}
                </div>
                <p className="mt-1.5 text-sm text-sub">
                  Currently accepting internship and entry-level roles.
                </p>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.26}>
              <p className="text-xs font-semibold uppercase tracking-widest text-mute">
                Find me on
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {socials.map((social) => (
                  <SocialButton key={social.id} social={social} />
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="glass-card flex h-full flex-col gap-5 rounded-3xl p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Your name</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Jane Doe"
                    required
                    autoComplete="name"
                    className="mt-2 w-full rounded-xl border border-edge bg-bg px-4 py-3 text-sm text-ink placeholder-mute transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Your email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="jane@example.com"
                    required
                    autoComplete="email"
                    className="mt-2 w-full rounded-xl border border-edge bg-bg px-4 py-3 text-sm text-ink placeholder-mute transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none"
                  />
                </label>
              </div>
              <label className="block flex-1">
                <span className="text-sm font-semibold text-ink">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell me about your opportunity…"
                  required
                  className="mt-2 h-full min-h-[8rem] w-full resize-none rounded-xl border border-edge bg-bg px-4 py-3 text-sm text-ink placeholder-mute transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_var(--glow)] transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_14px_36px_-8px_var(--glow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Send Message <Icon name="send" size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              {status.sent && (
                <p role="status" aria-live="polite" className="text-sm font-medium text-emerald-500">
                  {status.message}
                </p>
              )}
              {!status.sent && status.message && (
                <p role="status" aria-live="polite" className="text-sm font-medium text-red-500">
                  {status.message}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}