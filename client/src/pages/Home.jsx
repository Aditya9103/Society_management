import PageWrapper from '../components/layout/PageWrapper';
import CTASection from '../components/sections/CTASection';

import HeroSection from './home/components/HeroSection';
import TrustStripSection from './home/components/TrustStripSection';
import ProblemSolutionSection from './home/components/ProblemSolutionSection';
import PlatformOverviewSection from './home/components/PlatformOverviewSection';
import WorkflowSection from './home/components/WorkflowSection';
import MobilePWASection from './home/components/MobilePWASection';
import CompareSection from './home/components/CompareSection';
import PricingPreviewSection from './home/components/PricingPreviewSection';
import SecuritySection from './home/components/SecuritySection';
import TestimonialsSection from './home/components/TestimonialsSection';
import FAQSection from './home/components/FAQSection';

export default function Home() {
  return (
    <PageWrapper
      title="Parapet — The Operating System for Gated Communities"
      description="Manage Security, Accounting, Maintenance, Residents, Visitors, Payments & Facilities from one platform. Book a free demo today."
    >
      <HeroSection />
      <TrustStripSection />
      <ProblemSolutionSection />
      <PlatformOverviewSection />
      <WorkflowSection />
      <MobilePWASection />
      <CompareSection />
      <PricingPreviewSection />
      <SecuritySection />
      <TestimonialsSection />
      <FAQSection />

      {/* ═══════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════ */}
      <CTASection
        heading="Ready to Digitize Your Society?"
        subtext="Book a free demo today. We'll walk you through setup and answer every question — no sales pressure."
        primaryLabel="Book a Free Demo"
        primaryHref="/book-demo"
        secondaryLabel="See all Features"
        secondaryHref="/features"
      />
    </PageWrapper>
  );
}
