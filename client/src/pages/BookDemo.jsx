import { motion } from 'framer-motion';
import { CheckCircle2, Building2, Users2, ShieldCheck, Zap } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import LeadForm from '../components/ui/LeadForm';
import FAQSection from '../components/sections/FAQSection';
import { faqData } from '../data/faqData';

const features = [
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    desc: 'Secure data protection and encrypted access controls.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast Entry',
    desc: 'Reduce gate wait times from 2 minutes to just 3 seconds.'
  },
  {
    icon: Building2,
    title: 'Automated Billing',
    desc: 'Zero manual reconciliation for maintenance dues.'
  },
  {
    icon: Users2,
    title: 'Happy Residents',
    desc: 'One beautiful app for everything they need.'
  }
];

export default function BookDemo() {
  return (
    <PageWrapper
      title="Book a Demo | Parapet"
      description="Schedule a personalized walkthrough of the Parapet Society Management platform."
    >
      <div className="min-h-screen pt-32 pb-24 bg-surface-light text-text-primary-on-light relative overflow-hidden">
        {/* Background Gradients */}

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left Column: Value Prop */}
            <div className="text-[var(--text-on-light)] pt-8 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm border border-[var(--line-on-light)] backdrop-blur-md border border-white/10 text-sm font-medium text-[var(--brass-light)] mb-8">
                  <Zap size={14} className="fill-[var(--brass-light)]" />
                  Free 30-Minute Consultation
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1]">
                  See Parapet in <br />
                  <span className="text-[var(--brass)]">action</span>.
                </h1>

                <p className="text-xl text-[var(--text-on-light)] mb-12 max-w-lg leading-relaxed font-medium">
                  Join 500+ premium societies running their operations on autopilot. Book a demo to see how we can digitize your entire society management.
                </p>

                <div className="space-y-8">
                  {features.map((feat, idx) => {
                    const Icon = feat.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + (idx * 0.1) }}
                        className="flex gap-4"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <Icon size={24} className="text-[var(--brass-light)]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[var(--text-on-light)] mb-1.5">{feat.title}</h3>
                          <p className="text-[var(--text-on-light)] leading-relaxed font-medium">{feat.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              {/* Decorative blobs */}

              <LeadForm source="book-demo" className="relative z-10" />
            </motion.div>

          </div>
        </div>
      </div>

      <FAQSection faqs={faqData.demo} title="Demo FAQs" subtitle="Common questions about our demo process." dark={true} />
    </PageWrapper>
  );
}
