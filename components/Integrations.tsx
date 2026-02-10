"use client";

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ScrollReveal } from "./ScrollAnimations";
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [trackWidth, setTrackWidth] = useState(0);

  /* Measure total scrollable width */
  useEffect(() => {
    const measure = () => {
      if (scrollTrackRef.current) {
        const total = scrollTrackRef.current.scrollWidth;
        const view = scrollTrackRef.current.offsetWidth;
        setTrackWidth(Math.max(0, total - view));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* Map vertical scroll → horizontal translate */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -trackWidth]);
  const smoothX = useSpring(x, { stiffness: 50, damping: 25 });

  /* Parallax for decorative elements */
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.4]);

  return (
    <section
      id="integrations"
      ref={sectionRef}
      className="relative"
      /* Enough height to drive horizontal scroll — taller = slower scroll */
      style={{ height: `${Math.max(250, trackWidth * 0.55 + 100)}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Background glows with parallax */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-[-5%] w-[500px] h-[500px] rounded-full bg-[var(--accent)]/[0.04] blur-[150px]" />
          <div className="absolute bottom-1/4 right-[-5%] w-[400px] h-[400px] rounded-full bg-[var(--secondary)]/[0.03] blur-[120px]" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          {/* Section Header */}
          <motion.div style={{ opacity: headerOpacity }}>
            <ScrollReveal className="text-center mb-10">
              <h2 className="text-heading-1 text-[var(--text-primary)]">
                Connects With Your{" "}
                <span className="gradient-text">Entire Stack</span>
              </h2>
              <p className="section-subheading mt-4">
                200+ native integrations with your favorite tools. API-first architecture for custom connections.
              </p>
            </ScrollReveal>
          </motion.div>

          {/* Horizontal Scroll Track */}
          <div className="relative overflow-hidden">
            {/* Edge fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--surface)] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--surface)] to-transparent z-20 pointer-events-none" />

            <motion.div
              ref={scrollTrackRef}
              style={{ x: smoothX }}
              className="flex gap-5 py-4 px-8 will-change-transform"
            >
              {integrations.map((integration, i) => (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    delay: 0.1 + i * 0.06,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex-shrink-0"
                >
                  <div className="relative w-[200px] p-6 text-center group cursor-default rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] hover:bg-white/[0.05] hover:border-[rgba(113,103,234,0.18)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.2),0_0_0_1px_rgba(113,103,234,0.06)] transition-all duration-400 ease-out hover:-translate-y-1">
                    {/* Top highlight line */}
                    <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent group-hover:via-[rgba(113,103,234,0.25)] transition-all duration-500" />
                    {/* Radial hover glow */}
                    <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(113,103,234,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Icon container */}
                    <div className="relative w-14 h-14 rounded-2xl mx-auto mb-3">
                      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 group-hover:from-[rgba(113,103,234,0.2)] transition-all duration-400" />
                      <div className="relative w-full h-full rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.07] flex items-center justify-center group-hover:bg-[rgba(113,103,234,0.08)] group-hover:border-[rgba(113,103,234,0.2)] group-hover:scale-110 transition-all duration-300">
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
                    <p className="relative text-[11px] text-[var(--text-tertiary)] mt-2 leading-relaxed">
                      {integration.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Scroll progress indicator */}
          <div className="flex justify-center mt-8">
            <div className="w-40 h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full origin-left rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)]"
              />
            </div>
          </div>
        </div>

        {/* API CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-8 relative z-10"
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
