import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SocialProof from "@/components/SocialProof";
import ProblemSolution from "@/components/ProblemSolution";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

// Lazy load heavier sections for performance
const ProductShowcase = dynamic(
  () => import("@/components/ProductShowcase"),
  {
    loading: () => (
      <div className="py-28 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

const Security = dynamic(() => import("@/components/Security"), {
  loading: () => (
    <div className="py-28 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const Integrations = dynamic(() => import("@/components/Integrations"), {
  loading: () => (
    <div className="py-28 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const Pricing = dynamic(() => import("@/components/Pricing"), {
  loading: () => (
    <div className="py-28 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const ScrollProgressBar = dynamic(
  () => import("@/components/ScrollAnimations").then((mod) => ({ default: mod.ScrollProgress })),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--surface)] text-[var(--text-primary)]">
      <ScrollProgressBar />
      <Header />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Social Proof */}
      <SocialProof />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
      </div>

      {/* 3. Problem → Solution */}
      <ProblemSolution />

      {/* 4. Features */}
      <Features />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--secondary)]/20 to-transparent" />
      </div>

      {/* 5. Product Showcase */}
      <ProductShowcase />

      {/* 6. How It Works */}
      <HowItWorks />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
      </div>

      {/* 7. Security & Compliance */}
      <Security />

      {/* 8. Integrations */}
      <Integrations />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--secondary)]/20 to-transparent" />
      </div>

      {/* 9. Pricing */}
      <Pricing />

      {/* 10. FAQ */}
      <FAQ />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
      </div>

      {/* 11. Final CTA */}
      <FinalCTA />

      {/* 12. Footer */}
      <Footer />
    </main>
  );
}
