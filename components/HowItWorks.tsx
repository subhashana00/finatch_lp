"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Link2,
  BarChart3,
  Zap,
  Shield,
  ArrowRight,
  Building2,
  CreditCard,
  Wallet,
  TrendingUp,
  TrendingDown,
  Lock,
  Globe,
  CheckCircle,
} from "lucide-react";
import { ScrollReveal } from "./ScrollAnimations";

/* ═══════════════════════════════════════
   Card Animation Variants
   ═══════════════════════════════════════ */
const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay: 0.15 * i,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ─── Mini Visual: Connection Nodes ─── */
function ConnectionVisual() {
  const banks = [
    { icon: Building2, label: "Bank", x: 0 },
    { icon: CreditCard, label: "Cards", x: 1 },
    { icon: Wallet, label: "Wallet", x: 2 },
  ];

  return (
    <div className="relative w-full h-full min-h-[140px] flex items-center justify-center">
      {/* Central hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[var(--accent)]/20 border border-[var(--accent)]/30 flex items-center justify-center z-10">
        <Link2 className="w-4 h-4 text-[var(--accent)]" />
      </div>

      {/* Orbiting nodes */}
      {banks.map((bank, i) => {
        const angle = -30 + i * 60;
        const radius = 65;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <motion.div
            key={bank.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
            className="absolute left-1/2 top-1/2 z-10"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            {/* Connector line */}
            <svg
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              width={Math.abs(x) * 2 + 20}
              height={Math.abs(y) * 2 + 20}
              style={{ overflow: "visible" }}
            >
              <motion.line
                x1="0"
                y1="0"
                x2={-x}
                y2={-y}
                stroke="rgba(113,103,234,0.15)"
                strokeWidth="1"
                strokeDasharray="3,3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
              />
            </svg>
            <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center backdrop-blur-sm">
              <bank.icon className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
            </div>
          </motion.div>
        );
      })}

      {/* Animated ring */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full border border-dashed border-[var(--accent)]/[0.08] animate-[rotate-slow_30s_linear_infinite]" />
    </div>
  );
}

/* ─── Mini Visual: Analytics Chart ─── */
function AnalyticsVisual() {
  const bars = [35, 55, 45, 70, 60, 85, 75, 92];

  return (
    <div className="w-full h-full min-h-[120px] flex flex-col justify-end px-2 pb-2">
      {/* Trend line */}
      <div className="flex items-end justify-between gap-[3px] h-[80px]">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{
              delay: 0.9 + i * 0.07,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex-1 rounded-sm relative group/bar"
            style={{
              background:
                i === bars.length - 1
                  ? "linear-gradient(to top, var(--accent), var(--secondary))"
                  : "rgba(113,103,234,0.15)",
            }}
          />
        ))}
      </div>
      {/* Mini metrics */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-[var(--accent)]" />
          <span className="text-[10px] font-semibold text-[var(--accent)]">
            +34.2%
          </span>
        </div>
        <span className="text-[9px] text-[var(--text-tertiary)]">
          Last 8 weeks
        </span>
      </div>
    </div>
  );
}

/* ─── Mini Visual: Automation Flow ─── */
function AutomationVisual() {
  const nodes = [
    { label: "Trigger", color: "var(--accent)" },
    { label: "Process", color: "var(--secondary)" },
    { label: "Execute", color: "var(--accent)" },
  ];

  return (
    <div className="w-full h-full min-h-[80px] flex items-center justify-center gap-3 px-2">
      {nodes.map((node, i) => (
        <motion.div
          key={node.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 + i * 0.15, duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <div className="relative">
            <div className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
              <span className="text-[10px] font-medium text-[var(--text-secondary)]">
                {node.label}
              </span>
            </div>
            {/* Pulse dot */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
              style={{ backgroundColor: node.color }}
            />
          </div>
          {i < nodes.length - 1 && (
            <ArrowRight className="w-3 h-3 text-[var(--text-tertiary)]" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Mini Visual: Security Shield ─── */
function SecurityVisual() {
  const items = [
    { icon: Lock, label: "Encrypted" },
    { icon: Shield, label: "Protected" },
    { icon: Globe, label: "Compliant" },
  ];

  return (
    <div className="w-full h-full min-h-[80px] flex items-center justify-center">
      <div className="flex items-center gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 + i * 0.12, duration: 0.4 }}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/[0.08] border border-[var(--accent)]/[0.12] flex items-center justify-center">
              <item.icon className="w-4 h-4 text-[var(--accent)]" />
            </div>
            <span className="text-[9px] font-medium text-[var(--text-tertiary)]">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   Bento Grid Section
   ═══════════════════════════════════════ */
export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" ref={ref} className="relative py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-14">
          <h2 className="text-heading-1 text-[var(--text-primary)]">
            Get Started in{" "}
            <span className="gradient-text">4 Simple Steps</span>
          </h2>
          <p className="section-subheading mt-4">
            From setup to scale — we make financial management effortless
          </p>
        </ScrollReveal>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-auto">
          {/* ╔═══ Card 1 — Connect (Large, spans 4 cols, 2 rows) ═══╗ */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="md:col-span-4 md:row-span-2 group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-[var(--accent)]/20 hover:bg-white/[0.035]"
          >
            {/* Top accent line */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(113,103,234,0.06),transparent_60%)]" />

            <div className="relative p-6 sm:p-8 flex flex-col h-full min-h-[340px]">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--accent)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    Step 01
                  </span>
                  <h3 className="text-heading-2 text-[var(--text-primary)] mt-2">
                    Connect Your Accounts
                  </h3>
                  <p className="text-body-sm text-[var(--text-secondary)] mt-2 max-w-sm leading-relaxed">
                    Securely link your bank accounts, payment processors, and
                    financial tools in minutes with our encrypted API
                    connections.
                  </p>
                </div>
                <div className="hidden sm:flex w-11 h-11 rounded-xl bg-[var(--accent)]/10 items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent)]/20 transition-colors duration-300">
                  <Link2 className="w-5 h-5 text-[var(--accent)]" />
                </div>
              </div>

              {/* Visual */}
              <div className="flex-1 flex items-center justify-center mt-2">
                <ConnectionVisual />
              </div>

              {/* Bottom tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {["256-bit SSL", "OAuth 2.0", "12,000+ Banks"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[10px] font-medium text-[var(--text-tertiary)]"
                  >
                    <CheckCircle className="w-2.5 h-2.5 text-[var(--accent)]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ╔═══ Card 2 — Analyze (Top-right) ═══╗ */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="md:col-span-2 group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-[var(--accent)]/20 hover:bg-white/[0.035]"
          >
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--secondary)]/30 to-transparent" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(139,131,239,0.06),transparent_60%)]" />

            <div className="relative p-5 sm:p-6 flex flex-col h-full min-h-[200px]">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--secondary)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)]" />
                  Step 02
                </span>
                <div className="w-8 h-8 rounded-lg bg-[var(--secondary)]/10 flex items-center justify-center group-hover:bg-[var(--secondary)]/20 transition-colors duration-300">
                  <BarChart3 className="w-4 h-4 text-[var(--secondary)]" />
                </div>
              </div>

              <h3 className="text-heading-3 text-[var(--text-primary)] mb-1">
                Analyze Finances
              </h3>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-3">
                AI-powered insights identify trends and anomalies instantly.
              </p>

              {/* Chart Visual */}
              <div className="flex-1">
                <AnalyticsVisual />
              </div>
            </div>
          </motion.div>

          {/* ╔═══ Card 3 — Automate (Bottom-right) ═══╗ */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="md:col-span-2 group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-[var(--accent)]/20 hover:bg-white/[0.035]"
          >
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/25 to-transparent" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_right,rgba(113,103,234,0.06),transparent_60%)]" />

            <div className="relative p-5 sm:p-6 flex flex-col h-full min-h-[180px]">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--accent)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  Step 03
                </span>
                <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center group-hover:bg-[var(--accent)]/20 transition-colors duration-300">
                  <Zap className="w-4 h-4 text-[var(--accent)]" />
                </div>
              </div>

              <h3 className="text-heading-3 text-[var(--text-primary)] mb-1">
                Automate Workflows
              </h3>
              <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed mb-3">
                Intelligent automation for payments, reporting &amp;
                compliance.
              </p>

              {/* Automation Flow Visual */}
              <div className="flex-1">
                <AutomationVisual />
              </div>
            </div>
          </motion.div>

          {/* ╔═══ Card 4 — Scale (Full width bottom) ═══╗ */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="md:col-span-6 group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-[var(--accent)]/20 hover:bg-white/[0.035]"
          >
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(113,103,234,0.04),transparent_60%)]" />

            <div className="relative p-5 sm:p-6 sm:py-7">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                {/* Left — Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--accent)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      Step 04
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center group-hover:bg-[var(--accent)]/20 transition-colors duration-300">
                      <Shield className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                  </div>
                  <h3 className="text-heading-3 text-[var(--text-primary)] mb-1.5">
                    Scale Securely
                  </h3>
                  <p className="text-[13px] sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-md">
                    Grow your operations with enterprise-grade security,
                    real-time fraud detection, and guaranteed 99.9% uptime.
                  </p>
                </div>

                {/* Right — Security Visual */}
                <div className="flex-shrink-0">
                  <SecurityVisual />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
