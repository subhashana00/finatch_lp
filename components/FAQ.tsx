"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { ScrollReveal } from "./ScrollAnimations";

const faqs = [
  {
    question: "How secure is my financial data with Finatch?",
    answer:
      "Your data is protected with bank-grade 256-bit AES encryption at rest and TLS 1.3 in transit. We're SOC 2 Type II certified, PCI-DSS Level 1 compliant, and GDPR compliant. Our security team monitors systems 24/7, and we conduct regular penetration testing and vulnerability assessments.",
  },
  {
    question: "What compliance standards does Finatch support?",
    answer:
      "Finatch supports SOC 2 Type II, PCI-DSS Level 1, ISO 27001, GDPR, CCPA, and industry-specific regulations. Our compliance engine automatically monitors and reports on your compliance status, and our team of regulatory experts stays ahead of evolving requirements.",
  },
  {
    question: "Can I try Finatch before committing to a paid plan?",
    answer:
      "Absolutely! Our Free plan includes up to 1,000 transactions per month, basic analytics, and support for 2 team members — with no time limit. For Pro and Enterprise features, we offer a 14-day free trial with no credit card required.",
  },
  {
    question: "What integrations does Finatch support?",
    answer:
      "Finatch integrates with 200+ tools including Stripe, PayPal, Plaid, QuickBooks, Xero, Salesforce, Slack, Zapier, and more. We also offer a comprehensive REST API and webhooks for custom integrations, with dedicated integration support for Enterprise customers.",
  },
  {
    question: "How does the AI fraud detection work?",
    answer:
      "Our AI fraud detection uses machine learning models trained on billions of transactions. It analyzes patterns in real-time, detecting anomalies and suspicious activity with 99.97% accuracy. The system continuously learns and adapts to new fraud patterns, and alerts your team instantly when threats are detected.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "Free users get email support with 24-hour response times. Pro users receive priority email and chat support with 4-hour response times. Enterprise customers get a dedicated account manager, 24/7 phone support, custom SLAs, and access to our engineering team for complex integrations.",
  },
  {
    question: "Can Finatch handle multi-currency transactions?",
    answer:
      "Yes! Finatch supports 150+ currencies with real-time exchange rate optimization. Our smart routing engine automatically selects the most cost-effective payment path, potentially saving you up to 60% on cross-border transaction fees compared to traditional banks.",
  },
  {
    question: "How quickly can I get started?",
    answer:
      "Most teams are up and running within 15 minutes. Connect your accounts via our secure API, and our AI engine immediately starts analyzing your financial data. For Enterprise implementations, our onboarding team provides white-glove setup in under 48 hours.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="glass-card overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-body font-medium text-[var(--text-primary)] pr-8 group-hover:text-[var(--accent)] transition-colors">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[var(--text-secondary)] flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[var(--accent)]" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-body-sm text-[var(--text-secondary)] leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="relative py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-12">
          <div className="pill-badge text-[var(--accent)] mx-auto w-fit mb-6">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="text-heading-1 text-[var(--text-primary)]">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-subheading mt-4">
            Everything you need to know about Finatch
          </p>
        </ScrollReveal>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mt-12 glass-card p-8">
            <h3 className="text-heading-3 text-[var(--text-primary)] mb-2">
              Still have questions?
            </h3>
            <p className="text-body-sm text-[var(--text-secondary)] mb-4">
              Our team is here to help. Reach out and we&apos;ll get back to you within 24 hours.
            </p>
            <a
              href="#"
              className="btn-secondary text-sm !px-6 !py-2.5 inline-flex items-center gap-2"
            >
              Contact Support
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
