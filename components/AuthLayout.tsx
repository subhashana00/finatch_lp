"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import Link from "next/link";
import {
  Shield,
  Lock,
  Fingerprint,
  Activity,
  TrendingUp,
  Globe,
} from "lucide-react";

/* ── Animated floating nodes on left panel ── */
function FloatingNodes() {
  const nodes = [
    { icon: Shield, x: "15%", y: "20%", delay: 0, size: 40 },
    { icon: Lock, x: "75%", y: "15%", delay: 0.3, size: 36 },
    { icon: Fingerprint, x: "25%", y: "75%", delay: 0.6, size: 36 },
    { icon: Activity, x: "80%", y: "70%", delay: 0.9, size: 32 },
    { icon: TrendingUp, x: "50%", y: "45%", delay: 1.2, size: 44 },
    { icon: Globe, x: "65%", y: "85%", delay: 0.4, size: 34 },
  ];

  return (
    <>
      {nodes.map((node, i) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.8 + node.delay,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute"
            style={{ left: node.x, top: node.y }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div
                className="rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center"
                style={{ width: node.size, height: node.size }}
              >
                <Icon
                  className="text-[var(--accent)]/40"
                  style={{ width: node.size * 0.4, height: node.size * 0.4 }}
                />
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
}

/* ── Connector lines SVG ── */
function ConnectorLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]"
      viewBox="0 0 400 600"
    >
      <motion.line
        x1="60" y1="120" x2="300" y2="90"
        stroke="var(--accent)" strokeWidth="0.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
      />
      <motion.line
        x1="100" y1="450" x2="320" y2="420"
        stroke="var(--accent)" strokeWidth="0.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1.8 }}
      />
      <motion.line
        x1="200" y1="270" x2="60" y2="450"
        stroke="var(--secondary)" strokeWidth="0.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 2.0 }}
      />
      <motion.line
        x1="200" y1="270" x2="320" y2="420"
        stroke="var(--secondary)" strokeWidth="0.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 2.2 }}
      />
    </svg>
  );
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="min-h-screen flex bg-[var(--surface)]">
      {/* ── Left Panel — Branding & Visual ── */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] relative overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface)] via-[#12121a] to-[var(--surface)]" />
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--accent)]/[0.06] blur-[130px] animate-[float_14s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[var(--secondary)]/[0.04] blur-[120px] animate-[float-reverse_16s_ease-in-out_infinite]" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(113,103,234,1) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Connector lines */}
        <ConnectorLines />

        {/* Floating nodes */}
        <FloatingNodes />

        {/* Centered content */}
        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 w-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center shadow-[0_0_20px_rgba(113,103,234,0.3)]">
                <span className="text-white text-sm font-bold">F</span>
              </div>
              <span className="text-lg font-bold text-[var(--text-primary)] font-[family-name:var(--font-space-grotesk)] tracking-tight">
                Finatch
              </span>
            </Link>
          </motion.div>

          {/* Center text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <h1 className="text-display-lg text-[var(--text-primary)]">
              The Future of{" "}
              <span className="gradient-text">Financial</span>{" "}
              Intelligence
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-md leading-relaxed">
              Join 10,000+ businesses using AI-powered analytics, smart
              payments, and automated fraud detection.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {[
                { value: "$50B+", label: "Processed" },
                { value: "120+", label: "Countries" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <span className="text-sm font-bold text-[var(--accent)] font-[family-name:var(--font-space-grotesk)]">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[var(--text-tertiary)]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xs text-[var(--text-tertiary)]"
          >
            © {new Date().getFullYear()} Finatch. All rights reserved.
          </motion.div>
        </div>
      </div>

      {/* ── Right Panel — Form ── */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12 relative">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent)]/[0.02] blur-[150px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[440px] relative z-10"
        >
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex justify-center">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center shadow-[0_0_20px_rgba(113,103,234,0.3)]">
                <span className="text-white text-sm font-bold">F</span>
              </div>
              <span className="text-lg font-bold text-[var(--text-primary)] font-[family-name:var(--font-space-grotesk)] tracking-tight">
                Finatch
              </span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-heading-2 text-[var(--text-primary)] mb-2">
              {title}
            </h2>
            <p className="text-body-sm text-[var(--text-secondary)]">
              {subtitle}
            </p>
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  );
}
