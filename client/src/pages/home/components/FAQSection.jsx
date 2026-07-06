import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '../../../components/ui/SectionHeader';
import Accordion from '../../../components/ui/Accordion';
import { homeFaqs } from '../../../data/faqs';

export default function FAQSection() {
  return (
    <section className="py-32 lg:py-40 bg-transparent">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <SectionHeader
            eyebrow="FAQ"
            heading="Questions before you decide."
            subtext="The most common things committees ask before booking a demo. More detailed answers on the pricing page."
          />
          <div>
            <Accordion items={homeFaqs} />
            <div className="mt-5 text-center">
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 text-[var(--brass)] font-medium text-[14px] hover:gap-3 transition-all"
              >
                See all FAQs on the Pricing page <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
