"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import {
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
} from "lucide-react";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Product", href: "#product" },
  { name: "Security", href: "#security" },
  { name: "Pricing", href: "#pricing" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme } = useTheme();

  // Track scroll position for glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Smooth scroll handler
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
      setMobileOpen(false);
    },
    []
  );

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2.5 header-scrolled"
            : "py-4 sm:py-5"
        }`}
      >
        {/* Top gradient fade — keeps text readable over hero */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            scrolled ? "opacity-0" : "opacity-100"
          }`}
          style={{
            background:
              "linear-gradient(to bottom, var(--surface) 0%, var(--surface) 30%, transparent 100%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="flex items-center gap-2.5 group flex-shrink-0"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 group-hover:scale-105 transition-transform duration-300">
                {/* Glow behind logo */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent to-secondary opacity-60 blur-md group-hover:opacity-80 transition-opacity duration-300" />
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative w-full h-full drop-shadow-sm"
                >
                  <rect width="40" height="40" rx="10" fill="url(#logoGrad)" />
                  {/* Stylised 'F' with data-flow curves */}
                  <path
                    d="M12 10h16v3.5H16.5v4.5H25v3.5h-8.5v8.5H12V10z"
                    fill="white"
                    opacity="0.95"
                  />
                  {/* Flowing accent arc — represents data movement */}
                  <path
                    d="M22 20c4 0 7 2.5 7 6.5"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  <circle cx="29" cy="27" r="2" fill="white" opacity="0.8" />
                  <defs>
                    <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#7167EA" />
                      <stop offset="1" stopColor="#8B83EF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                Finat<span className="gradient-text-accent">ch</span>
              </span>
            </a>

            {/* Desktop Nav — pill style */}
            <nav className="hidden lg:flex items-center gap-1 rounded-2xl px-2 py-1.5 nav-pill">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-2 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navActiveIndicator"
                        className="absolute inset-0 rounded-xl bg-[var(--accent)]"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:shadow-glow-sm transition-all duration-300 group"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" />
                ) : (
                  <Moon className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" />
                )}
              </button>
              <a
                href="#pricing"
                onClick={(e) => handleNavClick(e, "#pricing")}
                className="text-[13px] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-3 py-2"
              >
                Sign In
              </a>
              <a
                href="#hero"
                onClick={(e) => handleNavClick(e, "#hero")}
                className="btn-primary text-[13px] !px-5 !py-2 btn-glow inline-flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-xl glass flex items-center justify-center"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-[var(--text-secondary)]" />
                ) : (
                  <Moon className="w-4 h-4 text-[var(--text-secondary)]" />
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-9 h-9 rounded-xl glass flex items-center justify-center"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5 text-[var(--text-primary)]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5 text-[var(--text-primary)]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 pt-[68px] lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 mobile-menu-backdrop"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-3 sm:mx-4 glass rounded-2xl p-5 sm:p-6 overflow-y-auto max-h-[calc(100vh-80px)] shadow-2xl"
            >
              <nav className="space-y-1">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-semibold transition-all duration-200 ${
                        isActive
                          ? "text-white bg-[var(--accent)]"
                          : "text-[var(--text-primary)] hover:bg-white/[0.06] hover:text-[var(--accent)]"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              <div className="mt-5 pt-5 border-t border-[var(--glass-border)] space-y-3">
                <a
                  href="#pricing"
                  onClick={(e) => handleNavClick(e, "#pricing")}
                  className="block text-center text-[15px] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-2.5 rounded-xl transition-colors"
                >
                  Sign In
                </a>
                <a
                  href="#hero"
                  onClick={(e) => handleNavClick(e, "#hero")}
                  className="flex items-center justify-center gap-2 btn-primary !py-3 btn-glow text-[15px]"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
