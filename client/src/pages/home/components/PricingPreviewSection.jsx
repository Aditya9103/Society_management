import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '../../../components/ui/SectionHeader';
import PricingTable from '../../../components/sections/PricingTable';

export default function PricingPreviewSection() {
  return (
    <section className="py-32 lg:py-40 bg-white border-y border-slate-200/60">
      <div className="container">
        <SectionHeader
          eyebrow="Transparent Pricing"
          heading="Simple plans. No hidden per-feature charges."
          subtext="Every plan includes unlimited transactions and residents within its unit limit. No charge per module."
          align="center"
          maxWidth="520px"
        />
        <PricingTable />
        <div className="text-center mt-8">
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 text-[var(--brass)] font-medium text-[15px] hover:gap-3 transition-all"
          >
            See full feature comparison <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
