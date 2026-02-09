"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Clock,
  AlertTriangle,
  FileSpreadsheet,
  ShieldAlert,
  Zap,
  Brain,
  Shield,
  BarChart3,
  ArrowRight,
  X,
  Check,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "./ScrollAnimations";

/* ── Card animation variants ── */
const cardVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ── Data ── */
const pairs = [
  {
    problem: {
      icon: Clock,
      title: "Manual Reporting",
      stat: "16hrs",
      statLabel: "wasted weekly",
      pain: "Hours compiling spreadsheets and reconciling data across multiple systems.",
    },
    solution: {
      icon: Zap,
      title: "Automated Workflows",
      stat: "< 30s",
      statLabel: "report generation",
      fix: "AI-powered automation reduces reporting from hours to seconds with zero errors.",
    },
  },
  {
    problem: {
      icon: AlertTriangle,
      title: "Fraud Exposure",
      stat: "$4.2M",
      statLabel: "avg. annual loss",
      pain: "Inability to detect fraudulent transactions until after significant losses occur.",
    },
    solution: {
      icon: Brain,
      title: "Real-Time Detection",
      stat: "99.8%",
      statLabel: "fraud blocked",
      fix: "Machine learning models analyze every transaction in real-time, blocking threats instantly.",
    },
  },
  {
    problem: {
      icon: FileSpreadsheet,
      title: "Siloed Data",
      stat: "7+",
      statLabel: "disconnected tools",
      pain: "Critical data scattered across tools with no unified view of financial health.",
    },
    solution: {
      icon: BarChart3,
      title: "Unified Dashboard",
      stat: "1",
      statLabel: "single source of truth",
      fix: "All your financial data in one intelligent dashboard with actionable insights.",
    },
  },
  {
    problem: {
      icon: ShieldAlert,
      title: "Compliance Gaps",
      stat: "68%",
      statLabel: "firms non-compliant",
      pain: "Struggling to keep up with evolving regulations across multiple jurisdictions.",
    },
    solution: {
      icon: Shield,
      title: "Built-In Compliance",
      stat: "4",
      statLabel: "certifications covered",
      fix: "Automated compliance monitoring for SOC 2, PCI-DSS, GDPR, and ISO 27001.",
    },
  },
];

export default function ProblemSolution() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="solutions" ref={ref} className="relative py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide">
              Problems → Solutions
            </span>
          </div>
          <h2 className="text-heading-1 text-[var(--text-primary)]">
            From <span className="text-white/30">Pain Points</span> to{" "}
            <span className="gradient-text">Solutions</span>
          </h2>
          <p className="section-subheading mt-4">
            We understand the challenges modern finance teams face — and
            we&apos;ve built the solution.
          </p>
        </ScrollReveal>

        {/* ── Comparison Cards ── */}
        <div className="space-y-4">
          {pairs.map((pair, i) => (
            <motion.div
              key={pair.problem.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.015] backdrop-blur-xl transition-all duration-500 hover:border-[var(--accent)]/20"
            >
              {/* Top accent line */}
              <div
                className={`absolute top-0 inset-x-0 h-[1px] transition-opacity duration-500 bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent ${
                  hoveredCard === i ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(113,103,234,0.03),transparent_70%)]" />

              <div className="relative grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr]">
                {/* ── Problem Side ── */}
                <div className="p-5 sm:p-7 flex items-start gap-4 sm:gap-5">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.06] transition-colors duration-300">
                    <pair.problem.icon className="w-4.5 h-4.5 text-white/30 group-hover:text-white/50 transition-colors duration-300" />
                  </div>

                  <div className="min-w-0 flex-1">
                    {/* Label */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <X className="w-3 h-3 text-white/20" />
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/25">
                        Problem
                      </span>
                    </div>

                    <h4 className="text-[15px] font-semibold text-white/50 mb-1 line-clamp-1">
                      {pair.problem.title}
                    </h4>
                    <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                      {pair.problem.pain}
                    </p>

                    {/* Problem stat */}
                    <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                      <span className="text-[14px] font-bold text-white/35 font-[family-name:var(--font-space-grotesk)]">
                        {pair.problem.stat}
                      </span>
                      <span className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
                        {pair.problem.statLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── Center Divider / Arrow ── */}
                <div className="hidden lg:flex items-center justify-center px-2">
                  <div className="relative flex flex-col items-center gap-1">
                    <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-white/[0.06] to-white/[0.06]" />
                    <motion.div
                      animate={{
                        x: hoveredCard === i ? [0, 4, 0] : 0,
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: hoveredCard === i ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                      className="w-8 h-8 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center group-hover:bg-[var(--accent)]/15 group-hover:border-[var(--accent)]/30 transition-all duration-300"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                    </motion.div>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-white/[0.06] via-white/[0.06] to-transparent" />
                  </div>
                </div>

                {/* Mobile arrow */}
                <div className="lg:hidden flex justify-center py-1">
                  <div className="w-7 h-7 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center rotate-90">
                    <ArrowRight className="w-3 h-3 text-[var(--accent)]" />
                  </div>
                </div>

                {/* ── Solution Side ── */}
                <div className="p-5 sm:p-7 flex items-start gap-4 sm:gap-5 lg:bg-[var(--accent)]/[0.015] group-hover:bg-[var(--accent)]/[0.03] transition-colors duration-500">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--accent)]/[0.08] border border-[var(--accent)]/[0.12] flex items-center justify-center group-hover:bg-[var(--accent)]/[0.14] group-hover:border-[var(--accent)]/[0.2] transition-all duration-300">
                    <pair.solution.icon className="w-4.5 h-4.5 text-[var(--accent)] transition-colors duration-300" />
                  </div>

                  <div className="min-w-0 flex-1">
                    {/* Label */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <Check className="w-3 h-3 text-[var(--accent)]" />
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--accent)]/60">
                        Solution
                      </span>
                    </div>

                    <h4 className="text-[15px] font-semibold text-[var(--text-primary)] mb-1 line-clamp-1">
                      {pair.solution.title}
                    </h4>
                    <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                      {pair.solution.fix}
                    </p>

                    {/* Solution stat */}
                    <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[var(--accent)]/[0.06] border border-[var(--accent)]/[0.1]">
                      <span className="text-[14px] font-bold text-[var(--accent)] font-[family-name:var(--font-space-grotesk)]">
                        {pair.solution.stat}
                      </span>
                      <span className="text-[10px] text-[var(--accent)]/60 uppercase tracking-wider">
                        {pair.solution.statLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom summary strip ── */}
        <motion.div
          custom={5}
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {[
            { value: "80%", label: "less manual work" },
            { value: "3x", label: "faster decisions" },
            { value: "$0", label: "fraud losses" },
            { value: "100%", label: "compliance coverage" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-[var(--text-tertiary)]"
            >
              <span className="text-[14px] font-bold text-[var(--accent)] font-[family-name:var(--font-space-grotesk)]">
                {item.value}
              </span>
              <span className="text-xs font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
