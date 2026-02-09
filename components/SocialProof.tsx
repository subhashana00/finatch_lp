"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, Quote, ArrowUpRight, TrendingUp, Sparkles } from "lucide-react";
import { ScrollReveal, BlurFadeIn } from "./ScrollAnimations";
import {
  SiStripe,
  SiPaypal,
  SiRevolut,
  SiSquare,
  SiCoinbase,
  SiShopify,
  SiAirbnb,
  SiUber,
  SiVisa,
  SiMastercard,
  SiWise,
  SiRobinhood,
} from "react-icons/si";
import type { IconType } from "react-icons";

type LogoItem = { name: string; icon: IconType };

/* Row 1 scrolls → (left-to-right) */
const logosRow1: LogoItem[] = [
  { name: "Stripe", icon: SiStripe },
  { name: "PayPal", icon: SiPaypal },
  { name: "Revolut", icon: SiRevolut },
  { name: "Square", icon: SiSquare },
  { name: "Coinbase", icon: SiCoinbase },
  { name: "Shopify", icon: SiShopify },
];

/* Row 2 scrolls ← (right-to-left) */
const logosRow2: LogoItem[] = [
  { name: "Airbnb", icon: SiAirbnb },
  { name: "Uber", icon: SiUber },
  { name: "Visa", icon: SiVisa },
  { name: "Mastercard", icon: SiMastercard },
  { name: "Wise", icon: SiWise },
  { name: "Robinhood", icon: SiRobinhood },
];

/* Reusable glassmorphism logo card */
function LogoCard({ logo }: { logo: LogoItem }) {
  return (
    <div className="group cursor-default flex-shrink-0 w-[140px] sm:w-[160px]">
      <div className="relative flex flex-col items-center gap-2.5 px-4 py-4 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.06] hover:bg-white/[0.06] hover:border-[rgba(113,103,234,0.2)] hover:shadow-[0_0_20px_rgba(113,103,234,0.08),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 ease-out">
        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(113,103,234,0.06),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.05] flex items-center justify-center group-hover:bg-[rgba(113,103,234,0.08)] group-hover:border-[rgba(113,103,234,0.15)] group-hover:scale-110 transition-all duration-300">
          <logo.icon className="w-5 h-5 text-white/30 group-hover:text-[#7167EA] transition-colors duration-300" />
        </div>
        <span className="relative text-[11px] font-medium text-white/25 group-hover:text-white/60 transition-colors duration-300 tracking-wide">
          {logo.name}
        </span>
      </div>
    </div>
  );
}

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CFO",
    company: "TechScale Inc.",
    quote:
      "Finatch reduced our financial reporting time by 80%. The AI insights are game-changing for our quarterly planning.",
    rating: 5,
    avatar: "SC",
    metric: "80%",
    metricLabel: "faster reporting",
    gradient: "from-[#7167EA] to-[#A59EF2]",
  },
  {
    name: "Marcus Williams",
    role: "Head of Payments",
    company: "NovaPay",
    quote:
      "We processed $2B in transactions last quarter with zero fraud incidents. Finatch's detection is unmatched.",
    rating: 5,
    avatar: "MW",
    metric: "$2B+",
    metricLabel: "processed safely",
    gradient: "from-[#A59EF2] to-[#7167EA]",
  },
  {
    name: "Elena Rodriguez",
    role: "CEO",
    company: "FinVentures",
    quote:
      "The automation workflows saved us 40 hours per week. Our finance team can now focus on strategy instead of spreadsheets.",
    rating: 5,
    avatar: "ER",
    metric: "40hrs",
    metricLabel: "saved per week",
    gradient: "from-[#7167EA] to-[#8B83EF]",
  },
  {
    name: "David Kim",
    role: "VP Finance",
    company: "GlobalPay Solutions",
    quote:
      "Multi-currency support and real-time analytics have transformed how we manage international operations.",
    rating: 5,
    avatar: "DK",
    metric: "120+",
    metricLabel: "countries served",
    gradient: "from-[#8B83EF] to-[#7167EA]",
  },
];

/* ─── Card animation variants ─── */
const cardEnter = {
  hidden: { opacity: 0, y: 25, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  /* Auto-rotate featured testimonial */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-glow-accent opacity-30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Carousel */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-label text-[var(--text-secondary)] mb-8">
              Trusted by industry leaders worldwide
            </p>

            {/* Carousel container with fade masks */}
            <div className="relative">
              {/* Left / right fade masks */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-[var(--surface)] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-[var(--surface)] to-transparent" />

              {/* Row 1 — scrolls right (→) */}
              <div className="overflow-hidden mb-4">
                <div className="flex w-max animate-[scroll-left_35s_linear_infinite] hover:[animation-play-state:paused] gap-4">
                  {[...logosRow1, ...logosRow1].map((logo, i) => (
                    <LogoCard key={`r1-${i}`} logo={logo} />
                  ))}
                </div>
              </div>

              {/* Row 2 — scrolls left (←) */}
              <div className="overflow-hidden">
                <div className="flex w-max animate-[scroll-right_35s_linear_infinite] hover:[animation-play-state:paused] gap-4">
                  {[...logosRow2, ...logosRow2].map((logo, i) => (
                    <LogoCard key={`r2-${i}`} logo={logo} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ═══════════════════════════════════════════
            Testimonials — Modern Bento Layout
            ═══════════════════════════════════════════ */}
        <BlurFadeIn delay={0.15}>
          <div className="text-center mb-14">
            <h2 className="text-heading-1 text-[var(--text-primary)]">
              Loved by{" "}
              <span className="gradient-text">Finance Teams</span>
            </h2>
            <p className="section-subheading mt-4">
              See why thousands of businesses trust Finatch for their financial
              operations
            </p>
          </div>
        </BlurFadeIn>

        <div className="max-w-6xl mx-auto">
          {/* ── Top row: Featured card + metric highlight ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
            {/* Featured testimonial — large card (3 cols) */}
            <motion.div
              custom={0}
              variants={cardEnter}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="lg:col-span-3 group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-[var(--accent)]/20"
            >
              {/* Top accent line */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(113,103,234,0.06),transparent_60%)]" />

              <div className="relative p-7 sm:p-9 min-h-[280px] flex flex-col justify-between">
                {/* Header row */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[var(--accent)] text-[var(--accent)]"
                      />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[var(--accent)]/[0.12]" />
                </div>

                {/* Quote — animated swap */}
                <div className="flex-1 mb-8 relative min-h-[80px]">
                  <AnimatePresence mode="wait">
                    <motion.blockquote
                      key={activeIndex}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="text-[1.15rem] sm:text-[1.3rem] leading-[1.6] text-[var(--text-primary)] font-medium"
                      style={{
                        fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      &ldquo;{testimonials[activeIndex].quote}&rdquo;
                    </motion.blockquote>
                  </AnimatePresence>
                </div>

                {/* Author + dots */}
                <div className="flex items-end justify-between">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.35 }}
                      className="flex items-center gap-3"
                    >
                      {/* Avatar ring */}
                      <div className="relative">
                        <div
                          className={`w-11 h-11 rounded-full bg-gradient-to-br ${testimonials[activeIndex].gradient} flex items-center justify-center text-white text-xs font-bold`}
                        >
                          {testimonials[activeIndex].avatar}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[var(--surface)] flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                          {testimonials[activeIndex].name}
                        </p>
                        <p className="text-xs text-[var(--text-tertiary)]">
                          {testimonials[activeIndex].role},{" "}
                          {testimonials[activeIndex].company}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Minimal dots */}
                  <div className="flex gap-1.5">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className="relative group/dot"
                        aria-label={`Testimonial ${i + 1}`}
                      >
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            i === activeIndex
                              ? "w-6 bg-[var(--accent)]"
                              : "w-1.5 bg-white/[0.12] hover:bg-white/[0.25]"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Metric highlight card (2 cols) */}
            <motion.div
              custom={1}
              variants={cardEnter}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="lg:col-span-2 group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-[var(--accent)]/20"
            >
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--secondary)]/30 to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(113,103,234,0.05),transparent_60%)]" />

              <div className="relative p-7 sm:p-9 h-full flex flex-col justify-between min-h-[280px]">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-tertiary)]">
                      Impact
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div
                        className="text-[3.5rem] sm:text-[4.5rem] font-extrabold leading-none gradient-text mb-2"
                        style={{
                          fontFamily:
                            "var(--font-space-grotesk), system-ui, sans-serif",
                        }}
                      >
                        {testimonials[activeIndex].metric}
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] font-medium">
                        {testimonials[activeIndex].metricLabel}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Decorative dots */}
                <div className="flex gap-1 mt-6">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 rounded-full"
                      style={{
                        backgroundColor:
                          i < 8
                            ? `rgba(113,103,234,${0.15 + i * 0.06})`
                            : "var(--glass-border)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Bottom row: 4 mini testimonial cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                custom={i + 2}
                variants={cardEnter}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                onClick={() => setActiveIndex(i)}
                className={`group relative rounded-2xl overflow-hidden border backdrop-blur-xl cursor-pointer transition-all duration-500 ${
                  i === activeIndex
                    ? "border-[var(--accent)]/25 bg-[var(--accent)]/[0.04]"
                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]"
                }`}
              >
                {/* Active indicator line */}
                <div
                  className={`absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent transition-opacity duration-500 ${
                    i === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div className="relative p-5">
                  {/* Author */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}
                    >
                      {t.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-[var(--text-primary)] truncate">
                        {t.name}
                      </p>
                      <p className="text-[11px] text-[var(--text-tertiary)] truncate">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>

                  {/* Mini quote */}
                  <p className="text-[13px] text-[var(--text-secondary)] leading-[1.6] line-clamp-3">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.04]">
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, s) => (
                        <Star
                          key={s}
                          className="w-2.5 h-2.5 fill-[var(--accent)] text-[var(--accent)]"
                        />
                      ))}
                    </div>
                    <span
                      className={`text-[11px] font-bold transition-colors duration-300 ${
                        i === activeIndex
                          ? "text-[var(--accent)]"
                          : "text-[var(--text-tertiary)]"
                      }`}
                    >
                      {t.metric} {t.metricLabel}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Social proof strip ── */}
          <motion.div
            custom={6}
            variants={cardEnter}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {[
              { label: "4.9/5 on G2", icon: Star },
              { label: "500+ Five-star reviews", icon: Sparkles },
              { label: "Featured on ProductHunt", icon: ArrowUpRight },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors duration-300"
              >
                <badge.icon className="w-3.5 h-3.5 text-[var(--accent)]/60" />
                <span className="text-[12px] font-medium">{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
