"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Check,
  Globe,
  Shield,
  Cpu,
} from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Integrations", href: "#integrations" },
    { name: "API Docs", href: "#" },
    { name: "Changelog", href: "#" },
  ],
  Company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#", badge: "Hiring" },
    { name: "Press", href: "#" },
    { name: "Contact", href: "#" },
  ],
  Resources: [
    { name: "Documentation", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Community", href: "#" },
    { name: "Case Studies", href: "#" },
    { name: "Status", href: "#", external: true },
  ],
  Legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "GDPR", href: "#" },
    { name: "Security", href: "#security" },
  ],
};

const socialLinks = [
  {
    name: "X",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "Discord",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
      </svg>
    ),
  },
];

const trustBadges = [
  { icon: Shield, label: "SOC 2 Type II" },
  { icon: Globe, label: "GDPR Ready" },
  { icon: Cpu, label: "99.99% Uptime" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Decorative top border — gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />

      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent)] opacity-[0.03] blur-[120px] pointer-events-none" />

      {/* ─── TOP SECTION: Newsletter CTA band ─── */}
      <div className="relative border-b border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Left — CTA copy */}
            <div className="max-w-md">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-5 h-5 text-[var(--accent)]" />
                <span className="text-sm font-bold tracking-[0.15em] uppercase text-[var(--accent)]">
                  Newsletter
                </span>
              </div>
              <h3
                className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Stay ahead of fintech
              </h3>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                Weekly insights on payments, AI automation, and financial
                technology. Trusted by 5,000+ industry leaders.
              </p>
            </div>

            {/* Right — Email form */}
            <form
              onSubmit={handleSubscribe}
              className="w-full lg:w-auto flex-shrink-0"
            >
              <div
                className={`relative flex items-center gap-2 p-1.5 rounded-2xl transition-all duration-300 ${
                  focused
                    ? "bg-[var(--glass-bg)] border border-[var(--accent)]/30 shadow-[0_0_24px_rgba(113,103,234,0.12)]"
                    : "bg-[var(--glass-bg)] border border-[var(--glass-border)]"
                }`}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="you@company.com"
                  className="flex-1 min-w-0 lg:w-72 px-4 py-3 bg-transparent text-base text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none font-medium"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-secondary text-white text-base font-semibold hover:shadow-glow-sm transition-all flex items-center gap-2"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="hidden sm:inline">Subscribed!</span>
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </motion.button>
              </div>
              <p className="mt-2 text-sm text-[var(--text-tertiary)] pl-4">
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* ─── MIDDLE SECTION: Brand + Links grid ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10">
          {/* Brand Column — spans 2 cols */}
          <div className="col-span-2">
            <a
              href="#"
              className="inline-flex items-center gap-2.5 mb-5 group"
            >
              <div className="relative w-9 h-9 group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent to-secondary opacity-50 blur-md group-hover:opacity-70 transition-opacity duration-300" />
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative w-full h-full drop-shadow-sm"
                >
                  <rect width="40" height="40" rx="10" fill="url(#footerLogoGrad)" />
                  <path
                    d="M12 10h16v3.5H16.5v4.5H25v3.5h-8.5v8.5H12V10z"
                    fill="white"
                    opacity="0.95"
                  />
                  <path
                    d="M22 20c4 0 7 2.5 7 6.5"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  <circle cx="29" cy="27" r="2" fill="white" opacity="0.8" />
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#7167EA" />
                      <stop offset="1" stopColor="#8B83EF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                Finat<span className="gradient-text-accent">ch</span>
              </span>
            </a>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-6 max-w-[320px]">
              AI-powered financial intelligence for modern businesses. Smart
              payments, real-time analytics, and automated workflows.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-sm font-medium text-[var(--text-secondary)]"
                >
                  <Icon className="w-4 h-4 text-[var(--accent)]" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-bold tracking-[0.12em] uppercase text-[var(--text-tertiary)] mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                    >
                      {link.name}
                      {"badge" in link && link.badge && (
                        <span className="px-2 py-0.5 rounded text-xs font-bold tracking-wider uppercase bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                          {link.badge}
                        </span>
                      )}
                      {"external" in link && link.external && (
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 group-hover:opacity-60 group-hover:translate-y-0 transition-all duration-200" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ─── BOTTOM BAR ─── */}
      <div className="border-t border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-base text-[var(--text-tertiary)] order-2 sm:order-1">
              &copy; {new Date().getFullYear()} Finatch, Inc. All rights
              reserved.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 order-1 sm:order-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
