"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollAnimations";
import {
  SiStripe,
  SiPaypal,
  SiCashapp,
  SiVisa,
  SiMastercard,
  SiQuickbooks,
  SiXero,
  SiSlack,
  SiZapier,
  SiAmazonwebservices,
  SiSalesforce,
  SiHubspot,
} from "react-icons/si";
import type { IconType } from "react-icons";

const integrations: { name: string; category: string; description: string; icon: IconType }[] = [
  { name: "Stripe", category: "Payments", description: "Payment processing & billing", icon: SiStripe },
  { name: "PayPal", category: "Payments", description: "Global payment solutions", icon: SiPaypal },
  { name: "Cash App", category: "Banking", description: "Peer-to-peer payments & banking", icon: SiCashapp },
  { name: "Visa", category: "Cards", description: "Card network integration", icon: SiVisa },
  { name: "Mastercard", category: "Cards", description: "Card payment processing", icon: SiMastercard },
  { name: "QuickBooks", category: "Accounting", description: "Accounting & bookkeeping", icon: SiQuickbooks },
  { name: "Xero", category: "Accounting", description: "Cloud accounting software", icon: SiXero },
  { name: "Slack", category: "Productivity", description: "Team notifications & alerts", icon: SiSlack },
  { name: "Zapier", category: "Automation", description: "Workflow automation", icon: SiZapier },
  { name: "AWS", category: "Infrastructure", description: "Cloud infrastructure", icon: SiAmazonwebservices },
  { name: "Salesforce", category: "CRM", description: "Customer management", icon: SiSalesforce },
  { name: "HubSpot", category: "CRM", description: "Marketing & sales platform", icon: SiHubspot },
];

export default function Integrations() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="integrations" ref={ref} className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-heading-1 text-[var(--text-primary)]">
            Connects With Your{" "}
            <span className="gradient-text">Entire Stack</span>
          </h2>
          <p className="section-subheading mt-4">
            200+ native integrations with your favorite tools. API-first architecture for custom connections.
          </p>
        </ScrollReveal>

        {/* Integration Grid */}
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {integrations.map((integration) => (
            <StaggerItem key={integration.name}>
              <div className="relative p-5 text-center group cursor-default h-full rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] hover:bg-white/[0.05] hover:border-[rgba(113,103,234,0.18)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.2),0_0_0_1px_rgba(113,103,234,0.06)] transition-all duration-400 ease-out">
                {/* Top highlight line */}
                <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent group-hover:via-[rgba(113,103,234,0.25)] transition-all duration-500" />
                {/* Radial hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(113,103,234,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon container — layered glass */}
                <div className="relative w-14 h-14 rounded-2xl mx-auto mb-3">
                  {/* Outer glow ring */}
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 group-hover:from-[rgba(113,103,234,0.2)] transition-all duration-400" />
                  {/* Glass body */}
                  <div className="relative w-full h-full rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.07] flex items-center justify-center group-hover:bg-[rgba(113,103,234,0.08)] group-hover:border-[rgba(113,103,234,0.2)] group-hover:scale-110 transition-all duration-300">
                    {/* Inner top shine */}
                    <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <integration.icon className="w-6 h-6 text-white/35 group-hover:text-[#7167EA] group-hover:drop-shadow-[0_0_8px_rgba(113,103,234,0.4)] transition-all duration-300" />
                  </div>
                </div>

                <h4 className="relative text-body-sm font-semibold text-[var(--text-primary)]">
                  {integration.name}
                </h4>
                <p className="relative text-caption mt-1">
                  {integration.category}
                </p>

                {/* Tooltip — glass style (hidden on touch, clipped safe) */}
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-xl bg-white/[0.06] backdrop-blur-2xl border border-white/[0.1] text-xs font-medium text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 shadow-[0_8px_24px_rgba(0,0,0,0.25)] hidden sm:block">
                  {integration.description}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/[0.06] backdrop-blur-2xl border border-white/[0.1] rotate-45 border-t-0 border-l-0" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* API CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-[var(--text-secondary)] mb-4">
            Don&apos;t see your tool?{" "}
            <span className="text-[var(--accent)]">
              Build custom integrations with our REST API
            </span>
          </p>
          <a href="#" className="btn-secondary text-sm !px-6 !py-2.5 inline-flex items-center gap-2">
            View API Documentation
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
