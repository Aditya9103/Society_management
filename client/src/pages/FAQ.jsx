import { motion } from 'framer-motion';
import { HelpCircle, Search, MessageSquare, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeader from '../components/ui/SectionHeader';
import CTASection from '../components/sections/CTASection';
import { faqData } from '../data/faqData';
import { cn } from '../utils/cn';
import { useState } from 'react';

function FaqGroup({ title, faqs }) {
  return (
    <div className="mb-16 last:mb-0">
      <h2 className="text-2xl font-bold text-[var(--text-on-light)] mb-8 border-b border-[var(--line-on-light)] pb-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {faqs.map((faq, i) => (
          <div key={i}>
            <h3 className="text-[17px] font-bold text-[var(--text-on-light)] mb-3">{faq.question}</h3>
            <p className="text-[15px] text-[var(--text-on-light-muted)] leading-relaxed whitespace-pre-wrap">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic
  const allCategories = [
    { key: 'home', label: 'General & Overview' },
    { key: 'visitor-management', label: 'Visitor Management' },
    { key: 'qr-vehicle-gate-pass', label: 'Vehicle Management' },
    { key: 'resident-directory', label: 'Resident Directory' },
    { key: 'maintenance-billing', label: 'Maintenance & Billing' },
    { key: 'online-payments', label: 'Online Payments' },
    { key: 'complaint-helpdesk', label: 'Helpdesk & Complaints' },
    { key: 'amenities-booking', label: 'Amenities Booking' },
    { key: 'notices-announcements', label: 'Notices & Announcements' },
    { key: 'about', label: 'Security & Trust' },
    { key: 'pricing', label: 'Pricing & Plans' },
    { key: 'contact', label: 'Support & Help' }
  ];

  return (
    <PageWrapper
      title="Frequently Asked Questions | Parapet"
      description="Find answers to common questions about Parapet's society management software, pricing, and features."
    >
      <div className="pt-32 pb-24 bg-surface-light text-text-primary-on-light min-h-screen">
        
        {/* Hero Section */}
        <section className="container mb-24">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--accent-tint)] mb-6 shadow-sm border border-[var(--line-on-light)]"
            >
              <HelpCircle size={32} className="text-[var(--accent)]" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-on-light)] mb-6 tracking-tight"
            >
              Frequently Asked Questions
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[var(--text-on-light-muted)] leading-relaxed font-medium mb-12"
            >
              Everything you need to know about the product, pricing, and how we can help your society.
            </motion.p>

          </div>
        </section>

        {/* Content Section */}
        <section className="container max-w-5xl">
          <div className="bg-[var(--surface-light-card)] border border-[var(--line-on-light)] rounded-[24px] p-8 md:p-12 shadow-sm mb-24">
            
            {allCategories.map(category => {
              const categoryFaqs = faqData[category.key] || [];
              if (categoryFaqs.length === 0) return null;
              
              return (
                <FaqGroup 
                  key={category.key} 
                  title={category.label} 
                  faqs={categoryFaqs} 
                />
              );
            })}

          </div>

          {/* Still have questions? */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="p-8 rounded-2xl border border-[var(--line-on-light)] bg-white text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[var(--surface-light-alt)] flex items-center justify-center mb-4">
                <MessageSquare size={24} className="text-[var(--text-on-light-muted)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-on-light)] mb-2">Still have questions?</h3>
              <p className="text-[var(--text-on-light-muted)] mb-6">Can't find the answer you're looking for? Please chat to our friendly team.</p>
              <Link to="/contact" className="px-6 py-2.5 rounded-full bg-[var(--surface-dark)] text-white font-medium hover:bg-[var(--surface-dark-raised)] transition-colors">
                Get in touch
              </Link>
            </div>
            
            <div className="p-8 rounded-2xl border border-[var(--line-on-light)] bg-[var(--accent-tint)] text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                <Phone size={24} className="text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-on-light)] mb-2">See it in action</h3>
              <p className="text-[var(--text-on-light-muted)] mb-6">Want to see exactly how Parapet works for your specific society needs?</p>
              <Link to="/book-demo" className="px-6 py-2.5 rounded-full bg-[var(--accent)] text-[var(--navy-950)] font-bold shadow-md hover:shadow-lg transition-all">
                Book a demo
              </Link>
            </div>
          </div>
        </section>

      </div>
      <CTASection />
    </PageWrapper>
  );
}
