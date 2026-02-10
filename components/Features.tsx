"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Brain,
  CreditCard,
  ShieldCheck,
  FileBarChart,
  Globe,
  BarChart3,
  Puzzle,
  Scale,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Lock,
  Zap,
  Activity,
  Layers,
  CheckCircle,
} from "lucide-react";
import { ScrollReveal, ParallaxLayer } from "./ScrollAnimations";

/* ── Card animation variants ── */
const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ── Mini Visual Components ── */

function AIBrainVisual() {
  return (
    <div className="relative w-full h-[100px] flex items-center justify-center overflow-hidden">
      {/* Neural network lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 100">
        <motion.line x1="30" y1="20" x2="100" y2="50" stroke="var(--accent)" strokeWidth="0.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }} />
        <motion.line x1="30" y1="80" x2="100" y2="50" stroke="var(--accent)" strokeWidth="0.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.6 }} />
        <motion.line x1="100" y1="50" x2="170" y2="30" stroke="var(--accent)" strokeWidth="0.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.7 }} />
        <motion.line x1="100" y1="50" x2="170" y2="70" stroke="var(--accent)" strokeWidth="0.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.8 }} />
        {[{ cx: 30, cy: 20 }, { cx: 30, cy: 80 }, { cx: 100, cy: 50 }, { cx: 170, cy: 30 }, { cx: 170, cy: 70 }].map((p, i) => (
          <motion.circle key={i} cx={p.cx} cy={p.cy} r="3" fill="var(--accent)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9 + i * 0.1 }} />
        ))}
      </svg>
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }} className="w-12 h-12 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
        <Brain className="w-5 h-5 text-[var(--accent)]" />
      </motion.div>
    </div>
  );
}

function PaymentFlowVisual() {
  const items = ["Invoice", "Process", "Settle"];
  return (
    <div className="flex items-center justify-center gap-2 w-full h-[100px]">
      {items.map((label, i) => (
        <motion.div key={label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.15 }} className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
            <span className="text-[9px] font-medium text-[var(--text-secondary)]">{label}</span>
          </div>
          {i < items.length - 1 && <ArrowRight className="w-2.5 h-2.5 text-[var(--accent)]/40" />}
        </motion.div>
      ))}
    </div>
  );
}

function ShieldVisual() {
  return (
    <div className="relative w-full h-[100px] flex items-center justify-center">
      <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-16 h-16 rounded-full border border-dashed border-[var(--accent)]/[0.1]" />
      <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/15 flex items-center justify-center">
        <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
      </div>
      {/* Orbiting dots */}
      {[0, 120, 240].map((deg) => (
        <motion.div key={deg} animate={{ rotate: [deg, deg + 360] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute w-16 h-16" style={{ transformOrigin: "center" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/40" />
        </motion.div>
      ))}
    </div>
  );
}

function ChartBarsVisual() {
  const bars = [40, 65, 50, 80, 60, 90, 70];
  return (
    <div className="flex items-end justify-center gap-[3px] w-full h-[100px] px-4 pb-2">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: 0.5 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 rounded-[2px]"
          style={{
            background: i === bars.length - 1 ? "linear-gradient(to top, var(--accent), var(--secondary))" : "rgba(113,103,234,0.12)",
          }}
        />
      ))}
    </div>
  );
}

/* ── Features Data ── */
const features = [
  {
    icon: Brain,
    title: "AI Financial Insights",
    description: "Predictive analytics and intelligent recommendations powered by machine learning.",
    tag: "AI-Powered",
    visual: "ai",
  },
  {
    icon: CreditCard,
    title: "Smart Payments",
    description: "Automated payment processing with intelligent routing and instant reconciliation.",
    tag: "Automated",
    visual: "payments",
  },
  {
    icon: ShieldCheck,
    title: "Fraud Detection",
    description: "Real-time threat analysis with ML models that adapt to emerging fraud patterns.",
    tag: "Real-Time",
    visual: "shield",
  },
  {
    icon: FileBarChart,
    title: "Automated Reporting",
    description: "Generate compliance-ready financial reports automatically with zero manual effort.",
    tag: "Zero-Effort",
    visual: "chart",
  },
  {
    icon: Globe,
    title: "Global Payments",
    description: "Process payments in 150+ currencies with real-time exchange rate optimization.",
    tag: "150+ Currencies",
    visual: null,
  },
  {
    icon: BarChart3,
    title: "Live Analytics",
    description: "Live financial dashboards with customizable KPIs, alerts, and trend analysis.",
    tag: "Dashboards",
    visual: null,
  },
  {
    icon: Puzzle,
    title: "API & Integrations",
    description: "Connect with 200+ tools via our REST API, webhooks, and native integrations.",
    tag: "200+ Tools",
    visual: null,
  },
  {
    icon: Scale,
    title: "Compliance & Risk",
    description: "Automated compliance monitoring across SOC 2, PCI-DSS, GDPR, and more.",
    tag: "Enterprise",
    visual: null,
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="features" ref={ref} className="relative py-20 sm:py-28">
      {/* Background glows — parallax depth layers */}
      <ParallaxLayer speed={-0.15} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--accent)]/[0.03] blur-[150px]" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.12} className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[var(--secondary)]/[0.03] blur-[150px]" />
      </ParallaxLayer>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header — subtle parallax offset */}
        <ParallaxLayer speed={0.06} className="relative z-10">
          <ScrollReveal className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide">
                Core Features
              </span>
            </div>
            <h2 className="text-heading-1 text-[var(--text-primary)]">
              Everything You Need to{" "}
              <span className="gradient-text">Master Finance</span>
            </h2>
            <p className="section-subheading mt-4">
              A comprehensive suite of AI-powered tools designed for modern
              financial operations
            </p>
          </ScrollReveal>
        </ParallaxLayer>

        {/* ── Bento Feature Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* ═══ Row 1: 4 feature cards with visuals (top row, 2 large + 2 medium) ═══ */}

          {/* Card 1 — AI Insights (3 cols, tall with visual) */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="md:col-span-3 group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-[var(--accent)]/20"
          >
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(113,103,234,0.05),transparent_60%)]" />

            <div className="relative p-6 sm:p-7 flex flex-col h-full min-h-[300px]">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--accent)]/[0.08] border border-[var(--accent)]/[0.1] text-[9px] font-bold tracking-[0.1em] uppercase text-[var(--accent)]/70 mb-3">
                    {features[0].tag}
                  </span>
                  <h3 className="text-heading-3 text-[var(--text-primary)] mb-1.5">
                    {features[0].title}
                  </h3>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed max-w-xs">
                    {features[0].description}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/[0.12] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent)]/15 transition-colors duration-300">
                  <Brain className="w-4.5 h-4.5 text-[var(--accent)]" />
                </div>
              </div>
              <div className="flex-1 flex items-end">
                <AIBrainVisual />
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Smart Payments (3 cols, tall with visual) */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            onMouseEnter={() => setHoveredIndex(1)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="md:col-span-3 group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-[var(--accent)]/20"
          >
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--secondary)]/30 to-transparent" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(139,131,239,0.05),transparent_60%)]" />

            <div className="relative p-6 sm:p-7 flex flex-col h-full min-h-[300px]">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--accent)]/[0.08] border border-[var(--accent)]/[0.1] text-[9px] font-bold tracking-[0.1em] uppercase text-[var(--accent)]/70 mb-3">
                    {features[1].tag}
                  </span>
                  <h3 className="text-heading-3 text-[var(--text-primary)] mb-1.5">
                    {features[1].title}
                  </h3>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed max-w-xs">
                    {features[1].description}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/[0.12] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent)]/15 transition-colors duration-300">
                  <CreditCard className="w-4.5 h-4.5 text-[var(--accent)]" />
                </div>
              </div>
              <div className="flex-1 flex items-end">
                <PaymentFlowVisual />
              </div>
            </div>
          </motion.div>

          {/* ═══ Row 2: Fraud + Reporting (2 cols each) + small summary (2 cols) ═══ */}

          {/* Card 3 — Fraud Detection */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            onMouseEnter={() => setHoveredIndex(2)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="md:col-span-2 group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-[var(--accent)]/20"
          >
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/25 to-transparent" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(113,103,234,0.04),transparent_60%)]" />

            <div className="relative p-5 sm:p-6 flex flex-col h-full min-h-[260px]">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--accent)]/[0.08] border border-[var(--accent)]/[0.1] text-[9px] font-bold tracking-[0.1em] uppercase text-[var(--accent)]/70">
                  {features[2].tag}
                </span>
                <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center group-hover:bg-[var(--accent)]/15 transition-colors duration-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]" />
                </div>
              </div>
              <h3 className="text-[15px] font-semibold text-[var(--text-primary)] mb-1">
                {features[2].title}
              </h3>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-3">
                {features[2].description}
              </p>
              <div className="flex-1 flex items-end">
                <ShieldVisual />
              </div>
            </div>
          </motion.div>

          {/* Card 4 — Automated Reporting */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            onMouseEnter={() => setHoveredIndex(3)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="md:col-span-2 group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-[var(--accent)]/20"
          >
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/25 to-transparent" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(113,103,234,0.04),transparent_60%)]" />

            <div className="relative p-5 sm:p-6 flex flex-col h-full min-h-[260px]">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--accent)]/[0.08] border border-[var(--accent)]/[0.1] text-[9px] font-bold tracking-[0.1em] uppercase text-[var(--accent)]/70">
                  {features[3].tag}
                </span>
                <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center group-hover:bg-[var(--accent)]/15 transition-colors duration-300">
                  <FileBarChart className="w-3.5 h-3.5 text-[var(--accent)]" />
                </div>
              </div>
              <h3 className="text-[15px] font-semibold text-[var(--text-primary)] mb-1">
                {features[3].title}
              </h3>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-3">
                {features[3].description}
              </p>
              <div className="flex-1 flex items-end">
                <ChartBarsVisual />
              </div>
            </div>
          </motion.div>

          {/* Card 5 — Stats summary (2 cols) */}
          <motion.div
            custom={4}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="md:col-span-2 group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[var(--accent)]/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-[var(--accent)]/20"
          >
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(113,103,234,0.06),transparent_60%)]" />

            <div className="relative p-5 sm:p-6 flex flex-col justify-between h-full min-h-[260px]">
              <div>
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-tertiary)] mb-4 block">
                  Platform Stats
                </span>
                <div className="space-y-4 mt-3">
                  {[
                    { icon: Activity, value: "99.9%", label: "Uptime SLA" },
                    { icon: Zap, value: "< 50ms", label: "API Latency" },
                    { icon: Lock, value: "256-bit", label: "Encryption" },
                  ].map((stat) => {
                    const Icon = stat.icon;
                    return (
                    <div key={stat.label} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[var(--accent)]/[0.06] flex items-center justify-center">
                        <Icon className="w-3 h-3 text-[var(--accent)]" />
                      </div>
                      <div>
                        <span className="text-[14px] font-bold text-[var(--text-primary)] font-[family-name:var(--font-space-grotesk)]">
                          {stat.value}
                        </span>
                        <span className="text-[11px] text-[var(--text-tertiary)] ml-1.5">
                          {stat.label}
                        </span>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
              {/* Decorative dots */}
              <div className="flex gap-1 mt-4">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full"
                    style={{
                      backgroundColor:
                        i < 5
                          ? `rgba(113,103,234,${0.12 + i * 0.08})`
                          : "var(--glass-border)",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ═══ Row 3: Bottom 4 compact feature cards ═══ */}
          {features.slice(4).map((feature, i) => {
            const Icon = feature.icon;
            return (
            <motion.div
              key={feature.title}
              custom={i + 5}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              onMouseEnter={() => setHoveredIndex(i + 5)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="md:col-span-3 lg:col-span-3 group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-[var(--accent)]/20"
            >
              <div
                className={`absolute top-0 inset-x-0 h-[1px] transition-opacity duration-500 bg-gradient-to-r from-transparent via-[var(--accent)]/25 to-transparent ${
                  hoveredIndex === i + 5 ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(113,103,234,0.03),transparent_60%)]" />

              <div className="relative p-5 sm:p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/[0.08] border border-[var(--accent)]/[0.1] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent)]/[0.14] transition-colors duration-300">
                  <Icon className="w-4 h-4 text-[var(--accent)]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">
                      {feature.title}
                    </h3>
                    <span className="inline-flex px-2 py-0.5 rounded text-[8px] font-bold tracking-[0.1em] uppercase bg-[var(--accent)]/[0.06] border border-[var(--accent)]/[0.08] text-[var(--accent)]/60">
                      {feature.tag}
                    </span>
                  </div>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                  {/* Hover reveal arrow */}
                  <div className="mt-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-xs font-medium text-[var(--accent)]">
                      Learn more
                    </span>
                    <ArrowRight className="w-3 h-3 text-[var(--accent)]" />
                  </div>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
