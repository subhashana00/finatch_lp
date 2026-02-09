"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { ScrollReveal, BlurFadeIn, MagneticHover } from "./ScrollAnimations";

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-glow-accent opacity-20 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-glow-secondary opacity-15 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-glow-accent opacity-15 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <BlurFadeIn>
          <div className="text-center">
            {/* Badge */}
            <div className="pill-badge text-[var(--accent)] mx-auto w-fit mb-8">
              <Sparkles className="w-4 h-4" />
              Ready to transform your finances?
            </div>

            {/* Headline */}
            <h2 className="text-display-lg text-[var(--text-primary)] mb-6">
              Start Building the{" "}
              <span className="gradient-text">Future of Finance</span>{" "}
              Today
            </h2>

            {/* Subheadline */}
            <p className="text-subheading text-[var(--text-secondary)] max-w-2xl mx-auto mb-10">
              Join 10,000+ businesses that trust Finatch to power their financial operations.
              Get started in minutes, no credit card required.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <MagneticHover strength={0.15}>
                <a
                  href="#"
                  className="btn-primary text-lg btn-glow flex items-center gap-2 px-6 sm:px-10 py-4 sm:py-5"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </a>
              </MagneticHover>
              <MagneticHover strength={0.15}>
                <a
                  href="#"
                  className="btn-secondary text-lg flex items-center gap-2 px-6 sm:px-10 py-4 sm:py-5"
                >
                  <Play className="w-5 h-5" />
                  Talk to Sales
                </a>
              </MagneticHover>
            </div>

            {/* Trust line */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-body-sm text-[var(--text-secondary)]">
              <span>✓ 14-day free trial</span>
              <span>✓ No credit card required</span>
              <span>✓ Cancel anytime</span>
            </div>
          </div>
        </BlurFadeIn>
      </div>
    </section>
  );
}
