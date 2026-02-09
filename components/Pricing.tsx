"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { CheckCircle, X, Sparkles, ArrowRight } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollAnimations";

const plans = [
  {
    name: "Free",
    description: "Perfect for startups and small teams getting started",
    monthlyPrice: 0,
    annualPrice: 0,
    popular: false,
    cta: "Start Free",
    features: [
      { name: "Up to 1,000 transactions/mo", included: true },
      { name: "Basic analytics dashboard", included: true },
      { name: "2 team members", included: true },
      { name: "Email support", included: true },
      { name: "1 bank connection", included: true },
      { name: "AI insights", included: false },
      { name: "Custom automations", included: false },
      { name: "API access", included: false },
      { name: "Priority support", included: false },
      { name: "Custom integrations", included: false },
    ],
  },
  {
    name: "Pro",
    description: "For growing businesses that need powerful automation",
    monthlyPrice: 79,
    annualPrice: 59,
    popular: true,
    cta: "Start Pro Trial",
    features: [
      { name: "Unlimited transactions", included: true },
      { name: "Advanced analytics & AI insights", included: true },
      { name: "25 team members", included: true },
      { name: "Priority email & chat support", included: true },
      { name: "10 bank connections", included: true },
      { name: "AI-powered insights", included: true },
      { name: "Custom automations", included: true },
      { name: "Full API access", included: true },
      { name: "Priority support", included: false },
      { name: "Custom integrations", included: false },
    ],
  },
  {
    name: "Enterprise",
    description: "For large organizations with advanced security needs",
    monthlyPrice: 299,
    annualPrice: 249,
    popular: false,
    cta: "Contact Sales",
    features: [
      { name: "Unlimited everything", included: true },
      { name: "Custom analytics & reporting", included: true },
      { name: "Unlimited team members", included: true },
      { name: "24/7 dedicated support", included: true },
      { name: "Unlimited bank connections", included: true },
      { name: "Advanced AI & ML models", included: true },
      { name: "Enterprise automations", included: true },
      { name: "Full API + webhooks", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "Custom integrations & SLA", included: true },
    ],
  },
];

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" ref={ref} className="relative py-20 sm:py-28">
      {/* Background glows */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-glow-secondary opacity-15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-glow-accent opacity-15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-heading-1 text-[var(--text-primary)]">
            Simple, Transparent{" "}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="section-subheading mt-4">
            Start free. Scale as you grow. No hidden fees, ever.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span
              className={`text-sm font-medium ${
                !isAnnual
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                isAnnual
                  ? "bg-gradient-to-r from-accent to-secondary"
                  : "bg-[var(--glass-border)]"
              }`}
              aria-label="Toggle annual billing"
            >
              <div
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                  isAnnual ? "translate-x-7.5 left-0.5" : "left-0.5"
                }`}
                style={{
                  transform: isAnnual ? "translateX(30px)" : "translateX(2px)",
                }}
              />
            </button>
            <span
              className={`text-sm font-medium flex items-center gap-2 ${
                isAnnual
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              Annual
              {isAnnual && (
                <span className="px-2 py-0.5 rounded-full bg-[var(--success)]/10 text-[var(--success)] text-xs font-semibold">
                  Save 25%
                </span>
              )}
            </span>
          </div>
        </ScrollReveal>

        {/* Pricing Cards */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto" staggerDelay={0.15}>
          {plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div
                className={`relative glass-card p-8 flex flex-col h-full ${
                  plan.popular
                    ? "ring-2 ring-[var(--accent)] shadow-glow-md lg:scale-105"
                    : ""
                }`}
              >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-accent to-secondary text-white text-xs font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Most Popular
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <h3 className="text-heading-2 text-[var(--text-primary)]">
                  {plan.name}
                </h3>
                <p className="text-body-sm text-[var(--text-secondary)] mt-1">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-stat text-4xl sm:text-5xl text-[var(--text-primary)]">
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  {plan.monthlyPrice > 0 && (
                    <span className="text-[var(--text-secondary)] text-sm">/month</span>
                  )}
                </div>
                {isAnnual && plan.monthlyPrice > 0 && (
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Billed annually (${(isAnnual ? plan.annualPrice : plan.monthlyPrice) * 12}/yr)
                  </p>
                )}
              </div>

              {/* CTA */}
              <a
                href="#"
                className={`w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 mb-8 flex items-center justify-center gap-2 ${
                  plan.popular
                    ? "btn-primary btn-glow"
                    : "btn-secondary"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Features */}
              <div className="space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature.name} className="flex items-start gap-3">
                    {feature.included ? (
                      <CheckCircle className="w-4 h-4 text-[var(--success)] flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-4 h-4 text-[var(--text-secondary)]/30 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included
                          ? "text-[var(--text-secondary)]"
                          : "text-[var(--text-secondary)]/40"
                      }`}
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-[var(--text-secondary)] mt-8"
        >
          All plans include a 14-day free trial. No credit card required.{" "}
          <a href="#" className="text-[var(--accent)] hover:underline">
            Compare plans in detail →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
