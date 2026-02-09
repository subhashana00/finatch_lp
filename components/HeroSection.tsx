"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Play,
  TrendingUp,
  Users,
  Globe,
  DollarSign,
  ChevronDown,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { MagneticHover, Parallax } from "./ScrollAnimations";

/* ═══════════════════════════════════════════
   Animated Counter
   ═══════════════════════════════════════════ */
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = target / (duration * 60);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return (
    <span className="text-stat">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════
   Rotating Word Animation
   ═══════════════════════════════════════════ */
const rotatingWords = ["Payments", "Analytics", "Security", "Growth"];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex h-[1.15em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-text inline-block"
          style={{ fontWeight: 800 }}
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ═══════════════════════════════════════════
   Data
   ═══════════════════════════════════════════ */
const stats = [
  { icon: Users, value: 10000, suffix: "+", label: "Active Businesses", prefix: "" },
  { icon: DollarSign, value: 50, suffix: "B+", label: "Processed", prefix: "$" },
  { icon: Globe, value: 120, suffix: "+", label: "Countries", prefix: "" },
  { icon: TrendingUp, value: 99, suffix: ".9%", label: "Uptime SLA", prefix: "" },
];

const liveNotifications = [
  { text: "Payment received", amount: "+$4,200", time: "2s ago" },
  { text: "Fraud blocked", amount: "$12,800", time: "12s ago" },
  { text: "Transfer complete", amount: "+$8,350", time: "45s ago" },
];

/* ═══════════════════════════════════════════
   Hero Section
   ═══════════════════════════════════════════ */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  /* Mouse position for interactive spotlight */
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* ── Background Layers ── */}
      <div className="absolute inset-0 z-0 bg-[var(--surface)]" />

      {/* Gradient orbs */}
      <div className="absolute top-[-15%] left-[-5%] w-[600px] h-[600px] rounded-full bg-[var(--accent)]/[0.06] blur-[130px] animate-[float_14s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-8%] w-[500px] h-[500px] rounded-full bg-[var(--secondary)]/[0.04] blur-[120px] animate-[float-reverse_16s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[var(--accent)]/[0.025] blur-[160px] pointer-events-none" />

      {/* Mouse-following spotlight */}
      <div
        className="absolute inset-0 z-[1] opacity-50 pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}% ${mousePos.y}%, rgba(113,103,234,0.07), transparent 60%)`,
        }}
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(113,103,234,1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle rotating conic rays */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-[0.015]"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, transparent 0deg, var(--accent) 1deg, transparent 3deg, transparent 60deg, var(--accent) 61deg, transparent 63deg, transparent 120deg, var(--accent) 121deg, transparent 123deg, transparent 180deg, var(--accent) 181deg, transparent 183deg, transparent 240deg, var(--accent) 241deg, transparent 243deg, transparent 300deg, var(--accent) 301deg, transparent 303deg)",
            animation: "rotate-slow 80s linear infinite",
          }}
        />
      </div>

      {/* ── Main Content ── */}
      <motion.div
        style={{ opacity, scale, y: smoothY }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20"
      >
        <div className="text-center space-y-7">
          {/* ── Animated Badge ── */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative inline-flex group cursor-pointer">
              {/* Top shine line */}
              <div className="absolute -top-[1px] left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />
              <div className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl hover:border-[var(--accent)]/20 transition-colors duration-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
                </span>
                <span className="text-[13px] font-medium text-[var(--text-secondary)] tracking-[-0.01em]">
                  AI-Powered Fraud Detection is Live
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </div>
          </motion.div>

          {/* ── Headline with Rotating Word ── */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-display-xl text-[var(--text-primary)]"
              style={{ fontWeight: 400 }}
            >
              The Future of
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 35, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h1 className="text-display-xl">
                <span
                  className="gradient-text"
                  style={{ fontWeight: 800 }}
                >
                  Financial&nbsp;
                </span>
                <RotatingWord />
              </h1>

              {/* Animated underline accent */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mx-auto mt-4 h-[2px] w-32 origin-center"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--accent), transparent)",
                }}
              />
            </motion.div>
          </div>

          {/* ── Subheadline ── */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="text-subheading text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed"
          >
            Harness AI to automate payments, detect fraud in
            real&#8209;time, and unlock actionable insights&nbsp;— all from
            one platform.
          </motion.p>

          {/* ── CTAs ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1"
          >
            <MagneticHover strength={0.15}>
              <a
                href="#pricing"
                className="btn-primary text-base btn-glow group flex items-center gap-2.5"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </MagneticHover>
            <MagneticHover strength={0.15}>
              <a
                href="#demo"
                className="btn-secondary text-base group flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center group-hover:bg-[var(--accent)]/20 transition-colors duration-300">
                  <Play className="w-3.5 h-3.5 fill-[var(--accent)] text-[var(--accent)]" />
                </div>
                Watch Demo
              </a>
            </MagneticHover>
          </motion.div>

          {/* ── Quick Trust Indicators ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[var(--text-tertiary)] text-sm"
          >
            {[
              "No credit card required",
              "14-day free trial",
              "SOC 2 Certified",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span className="text-[13px]">{item}</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Stats Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-20"
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl">
            {/* Top gradient accent line */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />

            {/* Gap-as-border grid technique */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 bg-white/[0.04]"
              style={{ gap: "1px" }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0 + i * 0.1, duration: 0.5 }}
                  className="relative bg-[var(--surface)] p-6 sm:p-8 text-center hover:bg-white/[0.015] transition-colors duration-300 cursor-default group"
                >
                  <stat.icon className="w-4 h-4 mx-auto mb-2.5 text-[var(--accent)] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="text-2xl sm:text-3xl text-[var(--text-primary)] mb-1">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </div>
                  <div className="text-[12px] sm:text-[13px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    {stat.label}
                  </div>
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(113,103,234,0.04),transparent_70%)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Floating Cards (desktop only) ── */}
      <div className="hidden xl:block pointer-events-none">
        {/* Left — Live Activity Feed */}
        <Parallax speed={0.12}>
          <motion.div
            initial={{ opacity: 0, x: -80, rotate: -2 }}
            animate={{ opacity: 1, x: 0, rotate: -2 }}
            transition={{
              delay: 2.2,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute top-[28%] left-6 2xl:left-16 z-10 pointer-events-auto"
          >
            <div className="glass-card p-4 w-56 animate-[float_7s_ease-in-out_infinite] hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold text-[var(--text-tertiary)] tracking-[0.1em] uppercase">
                  Live Feed
                </span>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]" />
                </span>
              </div>
              <div className="space-y-2.5">
                {liveNotifications.map((n, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.5 + i * 0.2, duration: 0.4 }}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[var(--text-primary)] truncate">
                        {n.text}
                      </p>
                      <p className="text-[10px] text-[var(--text-tertiary)]">
                        {n.time}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[var(--accent)] whitespace-nowrap">
                      {n.amount}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </Parallax>

        {/* Right — AI Fraud Score Ring */}
        <Parallax speed={-0.1}>
          <motion.div
            initial={{ opacity: 0, x: 80, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 2 }}
            transition={{
              delay: 2.4,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute top-[22%] right-6 2xl:right-16 z-10 pointer-events-auto"
          >
            <div className="glass-card p-5 w-48 animate-[float-reverse_8s_ease-in-out_infinite] hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]" />
                </div>
                <span className="text-[10px] font-semibold text-[var(--text-tertiary)] tracking-[0.1em] uppercase">
                  AI Score
                </span>
              </div>

              {/* Circular progress ring */}
              <div className="relative w-[72px] h-[72px] mx-auto mb-2">
                <svg
                  className="w-full h-full -rotate-90"
                  viewBox="0 0 72 72"
                >
                  <circle
                    cx="36"
                    cy="36"
                    r="30"
                    fill="none"
                    strokeWidth="3"
                    stroke="var(--glass-border)"
                  />
                  <motion.circle
                    cx="36"
                    cy="36"
                    r="30"
                    fill="none"
                    strokeWidth="3"
                    stroke="url(#heroScoreGrad)"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 30}`}
                    initial={{
                      strokeDashoffset: 2 * Math.PI * 30,
                    }}
                    animate={{
                      strokeDashoffset: 2 * Math.PI * 30 * (1 - 0.98),
                    }}
                    transition={{
                      delay: 2.8,
                      duration: 1.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                  <defs>
                    <linearGradient
                      id="heroScoreGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#7167EA" />
                      <stop offset="100%" stopColor="#A59EF2" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-base font-bold text-[var(--text-primary)]">
                    98%
                  </span>
                </div>
              </div>
              <p className="text-center text-[11px] text-[var(--text-tertiary)]">
                Fraud Prevention Score
              </p>
            </div>
          </motion.div>
        </Parallax>

        {/* Bottom-right mini stat card */}
        <Parallax speed={0.08}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 2.6,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute bottom-[20%] right-[18%] z-10 pointer-events-auto"
          >
            <div className="glass-card px-4 py-3 flex items-center gap-3 animate-[float_5s_ease-in-out_infinite]">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                <Activity className="w-4 h-4 text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--text-primary)]">
                  $2.4M saved
                </p>
                <p className="text-[11px] text-[var(--text-tertiary)]">
                  fraud blocked this month
                </p>
              </div>
            </div>
          </motion.div>
        </Parallax>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)] font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)]" />
        </motion.div>
      </motion.div>

      {/* ── Bottom gradient fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--surface)] to-transparent z-[5]" />
    </section>
  );
}
