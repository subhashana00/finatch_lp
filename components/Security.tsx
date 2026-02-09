"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import {
  Shield,
  Lock,
  Eye,
  CheckCircle,
  ShieldCheck,
  Key,
  Fingerprint,
  Server,
  Globe,
  Zap,
  Activity,
  ShieldAlert,
  Scan,
  Network,
  Binary,
  Clock,
  BarChart3,
  Users,
  FileCheck,
  AlertTriangle,
} from "lucide-react";
import { ScrollReveal } from "./ScrollAnimations";

/* ────────────────────────────────────────────────────────────────
   ANIMATED COUNTER
   ──────────────────────────────────────────────────────────────── */

function AnimatedNumber({ target, duration = 1400 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      current += step;
      if (current >= target) {
        setValue(target);
        clearInterval(id);
      } else {
        setValue(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(id);
  }, [isInView, target, duration]);

  return <span ref={ref}>{value.toLocaleString()}</span>;
}

/* ────────────────────────────────────────────────────────────────
   SHIELD VISUAL — Animated concentric rings + floating nodes
   ──────────────────────────────────────────────────────────────── */

function ShieldVisual() {
  return (
    <div className="relative w-full aspect-square max-w-[320px] mx-auto">
      {/* Outermost ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-[var(--accent)]/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {/* Node 1 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center backdrop-blur-sm">
          <Lock className="w-3.5 h-3.5 text-[var(--accent)]" />
        </div>
        {/* Node 2 */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 flex items-center justify-center backdrop-blur-sm">
          <Fingerprint className="w-3.5 h-3.5 text-[var(--secondary)]" />
        </div>
        {/* Node 3 */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--warning)]/10 border border-[var(--warning)]/20 flex items-center justify-center backdrop-blur-sm">
          <Eye className="w-3.5 h-3.5 text-[var(--warning)]" />
        </div>
        {/* Node 4 */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center backdrop-blur-sm">
          <Key className="w-3.5 h-3.5 text-white/70" />
        </div>
      </motion.div>

      {/* Middle ring */}
      <motion.div
        className="absolute inset-[18%] rounded-full border border-dashed border-[var(--accent)]/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 right-[15%] -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/25 flex items-center justify-center">
          <Scan className="w-3 h-3 text-[var(--accent)]" />
        </div>
        <div className="absolute bottom-0 left-[15%] translate-y-1/2 w-6 h-6 rounded-full bg-[var(--secondary)]/15 border border-[var(--secondary)]/25 flex items-center justify-center">
          <Network className="w-3 h-3 text-[var(--secondary)]" />
        </div>
      </motion.div>

      {/* Inner ring */}
      <div className="absolute inset-[32%] rounded-full border border-[var(--accent)]/10" />

      {/* Center shield */}
      <div className="absolute inset-[36%] rounded-full bg-gradient-to-br from-[var(--accent)]/20 via-[var(--accent)]/10 to-transparent flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/25 flex items-center justify-center backdrop-blur-xl"
        >
          <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--accent)]" />
        </motion.div>
      </div>

      {/* Pulse rings */}
      <motion.div
        className="absolute inset-[34%] rounded-full border border-[var(--accent)]/20"
        animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-[34%] rounded-full border border-[var(--accent)]/15"
        animate={{ scale: [1, 1.8], opacity: [0.2, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   ENCRYPTION STREAM — Animated hex/binary stream
   ──────────────────────────────────────────────────────────────── */

function EncryptionStream() {
  const chars = useMemo(() => {
    const hexChars = "0123456789ABCDEF";
    return Array.from({ length: 48 }, () =>
      Array.from({ length: 8 }, () => hexChars[Math.floor(Math.random() * 16)]).join("")
    );
  }, []);

  return (
    <div className="relative overflow-hidden h-24 rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-transparent to-[#0a0a0f] z-10 pointer-events-none" />
      <div className="flex flex-col gap-1 font-mono text-[10px] text-[var(--accent)]/30 leading-tight animate-scroll-up">
        {chars.map((line, i) => (
          <div key={i} className="whitespace-nowrap">
            {line.split("").map((c, j) => (
              <span
                key={j}
                className={
                  (i + j) % 7 === 0
                    ? "text-[var(--accent)]/80"
                    : (i + j) % 5 === 0
                    ? "text-[var(--secondary)]/50"
                    : ""
                }
              >
                {c}
              </span>
            ))}
            {" "}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   LIVE THREAT MONITOR — Animated mini log
   ──────────────────────────────────────────────────────────────── */

function ThreatMonitor() {
  const events = [
    { text: "Blocked suspicious login from 192.168.x.x", type: "blocked", time: "2s ago" },
    { text: "SSL certificate verified — Grade A+", type: "success", time: "5s ago" },
    { text: "DDoS mitigation active — 0 impact", type: "blocked", time: "12s ago" },
    { text: "API rate limit enforced — 429 returned", type: "warning", time: "18s ago" },
    { text: "Encryption key rotated successfully", type: "success", time: "30s ago" },
    { text: "Anomaly detection scan complete", type: "success", time: "45s ago" },
  ];

  return (
    <div className="space-y-2">
      {events.map((event, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + i * 0.1 }}
          className="flex items-start gap-2.5"
        >
          <div
            className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
              event.type === "success"
                ? "bg-[var(--accent)]"
                : event.type === "blocked"
                ? "bg-white/30"
                : "bg-[var(--warning)]"
            }`}
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-white/80 leading-snug truncate">{event.text}</p>
            <p className="text-[11px] text-[var(--text-secondary)]">{event.time}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ──────────────────────────────────────────────────────────────── */

const certifications = [
  {
    icon: ShieldCheck,
    title: "SOC 2 Type II",
    desc: "Annual third-party audits verifying our security controls meet the highest standards.",
    color: "text-[var(--accent)]",
    bg: "bg-[var(--accent)]/10",
    border: "border-[var(--accent)]/20",
  },
  {
    icon: Lock,
    title: "PCI-DSS Level 1",
    desc: "Highest payment card industry compliance — processing billions securely.",
    color: "text-[var(--secondary)]",
    bg: "bg-[var(--secondary)]/10",
    border: "border-[var(--secondary)]/20",
  },
  {
    icon: Eye,
    title: "GDPR Compliant",
    desc: "Full European data protection — privacy by design, right to erasure enforced.",
    color: "text-white/80",
    bg: "bg-white/[0.06]",
    border: "border-white/[0.12]",
  },
  {
    icon: Key,
    title: "ISO 27001",
    desc: "International gold standard for information security management systems.",
    color: "text-[var(--warning)]",
    bg: "bg-[var(--warning)]/10",
    border: "border-[var(--warning)]/20",
  },
];

const securityFeatures = [
  { text: "256-bit AES encryption at rest", icon: Binary },
  { text: "TLS 1.3 in transit", icon: Lock },
  { text: "Multi-factor authentication", icon: Fingerprint },
  { text: "Role-based access control", icon: Users },
  { text: "Real-time threat monitoring", icon: Activity },
  { text: "Automated vulnerability scanning", icon: Scan },
  { text: "24/7 SOC monitoring", icon: Clock },
  { text: "Disaster recovery < 1hr RTO", icon: Server },
];

export default function Security() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="security" ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[var(--accent)]/[0.02] blur-[120px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* ── Section Header ── */}
        <ScrollReveal className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-6"
          >
            <Shield className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">Bank-Grade Security</span>
          </motion.div>
          <h2 className="text-heading-1 text-[var(--text-primary)]">
            Your Data is <span className="gradient-text">Fort Knox Secure</span>
          </h2>
          <p className="section-subheading mt-4 max-w-2xl mx-auto">
            Enterprise-grade security infrastructure protecting billions in transactions daily with zero breaches since inception
          </p>
        </ScrollReveal>

        {/* ════════════════════════════════════════════════════════
            ROW 1 — Shield Visual + Metrics Bento
           ════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Left — Shield Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="relative bg-white/[0.02] border border-[var(--glass-border)] rounded-2xl p-6 lg:p-8 overflow-hidden"
          >
            {/* Decorative corner lines */}
            <div className="absolute top-0 left-0 w-24 h-px bg-gradient-to-r from-[var(--accent)]/40 to-transparent" />
            <div className="absolute top-0 left-0 w-px h-24 bg-gradient-to-b from-[var(--accent)]/40 to-transparent" />

            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider">Protection Active</span>
            </div>

            <ShieldVisual />

            {/* Status bar at bottom */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px]">
              {[
                { label: "Firewall", ok: true },
                { label: "Encryption", ok: true },
                { label: "MFA", ok: true },
                { label: "SIEM", ok: true },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${s.ok ? "bg-[var(--accent)]" : "bg-white/30"}`} />
                  <span className="text-[var(--text-secondary)] font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                value: 99.99,
                suffix: "%",
                label: "Uptime SLA",
                sublabel: "Last 365 days",
                icon: BarChart3,
                accentColor: "text-[var(--accent)]",
                bgColor: "bg-[var(--accent)]/10",
              },
              {
                value: 0,
                suffix: "",
                label: "Zero Breaches",
                sublabel: "Since inception",
                icon: ShieldAlert,
                accentColor: "text-[var(--secondary)]",
                bgColor: "bg-[var(--secondary)]/10",
                displayOverride: "0",
              },
              {
                value: 256,
                suffix: "-bit",
                label: "AES Encryption",
                sublabel: "Military grade",
                icon: Binary,
                accentColor: "text-white/80",
                bgColor: "bg-white/[0.06]",
              },
              {
                value: 24,
                suffix: "/7",
                label: "SOC Monitoring",
                sublabel: "Real-time alerts",
                icon: Activity,
                accentColor: "text-[var(--warning)]",
                bgColor: "bg-[var(--warning)]/10",
              },
            ].map((metric, i) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                  className="group relative bg-white/[0.02] border border-[var(--glass-border)] rounded-2xl p-5 hover:border-[var(--accent)]/20 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className={`w-9 h-9 rounded-xl ${metric.bgColor} flex items-center justify-center mb-3`}>
                      <Icon className={`w-4.5 h-4.5 ${metric.accentColor}`} />
                    </div>
                    <div className={`text-2xl sm:text-3xl font-bold font-[family-name:var(--font-space)] ${metric.accentColor}`}>
                      {metric.displayOverride ?? (
                        <>
                          <AnimatedNumber target={metric.value} />
                          {metric.suffix}
                        </>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-white mt-1">{metric.label}</div>
                    <div className="text-xs text-[var(--text-secondary)]">{metric.sublabel}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════
            ROW 2 — Certifications (4 cards)
           ════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {certifications.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
                className="group relative bg-white/[0.02] border border-[var(--glass-border)] rounded-2xl p-5 hover:border-[var(--accent)]/20 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent ${cert.border.replace("border-", "via-")} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

                <div className="relative">
                  <div className={`w-11 h-11 rounded-xl ${cert.bg} border ${cert.border} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-5 h-5 ${cert.color}`} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">{cert.title}</h3>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{cert.desc}</p>
                  {/* Verified badge */}
                  <div className="mt-3 flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3 text-[var(--accent)]" />
                    <span className="text-[10px] font-semibold text-[var(--accent)] uppercase tracking-wider">Verified</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ════════════════════════════════════════════════════════
            ROW 3 — Threat Monitor + Security Features + Encryption
           ════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Live Threat Monitor */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="bg-white/[0.02] border border-[var(--glass-border)] rounded-2xl p-5 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                <h4 className="text-sm font-semibold text-white">Threat Monitor</h4>
              </div>
              <span className="text-[10px] font-semibold text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-md">
                LIVE
              </span>
            </div>
            <ThreatMonitor />
            {/* Status summary */}
            <div className="mt-4 pt-3 border-t border-[var(--glass-border)] flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-[var(--accent)]" />
                <span className="text-[var(--accent)] font-semibold">All Systems Operational</span>
              </div>
              <span className="text-[var(--text-secondary)] font-mono">Last scan: 2s ago</span>
            </div>
          </motion.div>

          {/* Security Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-white/[0.02] border border-[var(--glass-border)] rounded-2xl p-5 overflow-hidden"
          >
            <h4 className="text-sm font-semibold text-white mb-4">Security Infrastructure</h4>
            <div className="grid grid-cols-1 gap-2">
              {securityFeatures.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.text}
                    initial={{ opacity: 0, x: -8 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.55 + i * 0.05 }}
                    className="flex items-center gap-2.5 py-1.5 px-2.5 rounded-xl hover:bg-white/[0.03] transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent)]/15 transition-colors">
                      <Icon className="w-3.5 h-3.5 text-[var(--accent)]" />
                    </div>
                    <span className="text-[13px] text-white/80 group-hover:text-white transition-colors font-medium">
                      {feat.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Encryption Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="bg-white/[0.02] border border-[var(--glass-border)] rounded-2xl p-5 overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-white">Encryption Layer</h4>
              <span className="text-[10px] font-semibold text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-md font-mono">
                AES-256-GCM
              </span>
            </div>

            <EncryptionStream />

            {/* Encryption pipeline */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {[
                { label: "Plaintext", color: "bg-white/10 text-white/50" },
                { label: "→", color: "text-[var(--text-secondary)]" },
                { label: "Key Derivation", color: "bg-[var(--warning)]/10 text-[var(--warning)]" },
                { label: "→", color: "text-[var(--text-secondary)]" },
                { label: "Ciphertext", color: "bg-[var(--accent)]/10 text-[var(--accent)]" },
              ].map((step, i) =>
                step.label === "→" ? (
                  <span key={i} className={`text-xs ${step.color}`}>→</span>
                ) : (
                  <span key={i} className={`text-[9px] font-semibold px-2 py-1 rounded-md ${step.color}`}>
                    {step.label}
                  </span>
                )
              )}
            </div>

            {/* Key stats */}
            <div className="mt-auto pt-4 grid grid-cols-3 gap-2">
              {[
                { label: "Key Length", value: "256-bit" },
                { label: "Protocol", value: "TLS 1.3" },
                { label: "Rotation", value: "24h" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xs font-bold font-[family-name:var(--font-space)] text-white">{stat.value}</div>
                  <div className="text-[10px] text-[var(--text-secondary)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════════════
            BOTTOM TRUST STRIP
           ════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65 }}
          className="mt-6 bg-white/[0.02] border border-[var(--glass-border)] rounded-2xl px-6 py-4"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { icon: Shield, label: "$4.8B+ protected daily" },
              { icon: FileCheck, label: "10,000+ compliance audits" },
              { icon: Globe, label: "Data centers in 12 regions" },
              { icon: AlertTriangle, label: "< 30ms threat response" },
              { icon: Users, label: "Trusted by 2,400+ companies" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span className="text-xs text-[var(--text-secondary)] font-medium">{item.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
