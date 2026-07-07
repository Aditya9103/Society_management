import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Building2, Shield, Users, HelpCircle } from 'lucide-react';
import { cn } from '../utils/cn';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import CTASection from '../components/sections/CTASection';
import FAQSection from '../components/sections/FAQSection';
import { faqData } from '../data/faqData';
import { Link } from 'react-router-dom';

const pricingPlans = [
  {
    name: 'Starter',
    desc: 'For small societies under 100 flats looking to digitize basic operations.',
    priceMonthly: 2499,
    priceAnnually: 1999,
    icon: Building2,
    popular: false,
    features: [
      'Digital Visitor Management',
      'Resident Directory',
      'Basic Maintenance Billing',
      'Email Support'
    ],
    notIncluded: [
      'Accounting & Ledger',
      'Amenities Booking',
      'Dedicated Account Manager'
    ]
  },
  {
    name: 'Professional',
    desc: 'The complete OS for mid-to-large societies requiring full automation.',
    priceMonthly: 4999,
    priceAnnually: 3999,
    icon: Shield,
    popular: true,
    features: [
      'Everything in Starter',
      'Full Accounting & Balance Sheets',
      'Automated Online Payments (UPI/CC)',
      'Amenities & Facility Booking',
      'Priority Phone Support'
    ],
    notIncluded: [
      'Multi-Society Management'
    ]
  },
  {
    name: 'Enterprise',
    desc: 'For townships, builders, and federations managing multiple properties.',
    priceMonthly: 9999,
    priceAnnually: 7999,
    icon: Users,
    popular: false,
    features: [
      'Everything in Professional',
      'Multi-Society Dashboards',
      'Custom SLA & Vendor Management',
      'API Access for Custom Integrations',
      'Dedicated Account Manager'
    ],
    notIncluded: []
  }
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState('Professional');

  return (
    <PageWrapper 
      title="Pricing | Parapet"
      description="Simple, transparent pricing for societies of all sizes."
    >
      <div className="pt-32 pb-24 bg-surface-light text-text-primary-on-light min-h-screen">
        <div className="container">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-[var(--navy-950)] to-slate-500 bg-clip-text text-transparent mb-6"
            >
              Simple, transparent pricing.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-[var(--text-on-light)] leading-relaxed font-medium mb-10"
            >
              Whether you're a single building or a sprawling township, we have a plan perfectly scaled for your needs.
            </motion.p>
            
            {/* Billing Toggle */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-4"
            >
              <span className={cn("text-lg font-semibold transition-colors", !isAnnual ? "text-[var(--text-on-light)]" : "text-[var(--text-on-light-muted)]")}>
                Monthly
              </span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-16 h-8 rounded-full bg-[var(--line-on-light)] relative p-1 cursor-pointer hover:bg-slate-300 transition-colors"
                aria-label="Toggle billing cycle"
              >
                <motion.div 
                  className="w-6 h-6 rounded-full bg-white shadow-sm"
                  animate={{ x: isAnnual ? 32 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span className={cn("text-lg font-semibold transition-colors flex items-center gap-2", isAnnual ? "text-[var(--text-on-light)]" : "text-[var(--text-on-light-muted)]")}>
                Annually
                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full uppercase tracking-wider">Save 20%</span>
              </span>
            </motion.div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
            {pricingPlans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                className={cn(
                  "relative rounded-3xl p-8 shadow-xl transition-all hover:-translate-y-1 cursor-pointer overflow-hidden z-10",
                  selectedPlan === plan.name ? "bg-[var(--surface-dark-deepest)] border border-[var(--brass)] shadow-2xl scale-105 z-20" : "bg-white border border-[var(--line-on-light)] hover:border-[var(--accent)]/50 opacity-80 hover:opacity-100"
                )}
                onClick={() => setSelectedPlan(plan.name)}
              >
                {selectedPlan === plan.name && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--brass)] to-transparent" />
                )}
                {plan.popular && (
                  <div className="absolute top-4 right-4 bg-[var(--brass)] text-white text-[10px] uppercase tracking-[0.1em] font-bold px-2 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="flex items-center gap-4 mb-6">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-colors", selectedPlan === plan.name ? "bg-[var(--accent)]/10" : "bg-[var(--surface-light-alt)]")}>
                    <plan.icon size={24} className={selectedPlan === plan.name ? "text-[var(--brass)]" : "text-[var(--text-on-light)]"} />
                  </div>
                  <h3 className={cn("text-2xl font-bold", selectedPlan === plan.name ? "text-white" : "text-[var(--text-on-light)]")}>{plan.name}</h3>
                </div>
                
                <p className={cn("h-16", selectedPlan === plan.name ? "text-[var(--text-on-dark-muted)]" : "text-[var(--text-on-light-muted)]")}>{plan.desc}</p>
                
                <div className="my-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isAnnual ? 'annual' : 'monthly'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex items-baseline gap-1"
                    >
                      <span className={cn("text-4xl font-bold", selectedPlan === plan.name ? "text-white" : "text-[var(--text-on-light)]")}>
                        ₹{isAnnual ? plan.priceAnnually.toLocaleString() : plan.priceMonthly.toLocaleString()}
                      </span>
                      <span className={selectedPlan === plan.name ? "text-[var(--text-on-dark-muted)]" : "text-[var(--text-on-light-muted)]"}>/mo</span>
                    </motion.div>
                  </AnimatePresence>
                  <p className={cn("text-sm mt-1", selectedPlan === plan.name ? "text-[var(--text-on-dark-muted)]" : "text-[var(--text-on-light-muted)]")}>Billed {isAnnual ? 'annually' : 'monthly'}</p>
                </div>
                
                <Button 
                  as={Link} 
                  to="/book-demo" 
                  variant={selectedPlan === plan.name ? 'brass' : 'outline'} 
                  className="w-full mb-8"
                  size="lg"
                >
                  Get Started
                </Button>
                
                <div className="space-y-4">
                  <p className={cn("text-sm font-bold uppercase tracking-wider", selectedPlan === plan.name ? "text-white" : "text-[var(--text-on-light)]")}>Features included:</p>
                  {plan.features.map(feat => (
                    <div key={feat} className="flex items-start gap-3">
                      <div className={cn("shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5", selectedPlan === plan.name ? "bg-emerald-500/20" : "bg-emerald-500/15")}>
                        <Check size={12} className="text-emerald-500" />
                      </div>
                      <span className={cn("font-medium", selectedPlan === plan.name ? "text-[var(--text-on-dark)]" : "text-[var(--text-on-light)]")}>{feat}</span>
                    </div>
                  ))}
                  
                  {plan.notIncluded.length > 0 && (
                    <div className={cn("pt-4 border-t mt-4 space-y-4", selectedPlan === plan.name ? "border-[var(--line-on-dark)]" : "border-[var(--line-on-light)]")}>
                      {plan.notIncluded.map(feat => (
                        <div key={feat} className="flex items-start gap-3 opacity-50">
                          <X size={20} className={cn("shrink-0 mt-0.5", selectedPlan === plan.name ? "text-[var(--text-on-dark-muted)]" : "text-[var(--text-on-light-muted)]")} />
                          <span className={selectedPlan === plan.name ? "text-[var(--text-on-dark-muted)]" : "text-[var(--text-on-light-muted)]"}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enterprise CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 max-w-4xl mx-auto bg-[var(--surface-dark-deepest)] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10 max-w-xl">
              <h3 className="text-3xl font-bold text-[var(--text-on-dark)] mb-4">Need a custom enterprise solution?</h3>
              <p className="text-[var(--text-on-dark-muted)] leading-relaxed">
                If you manage multiple properties, require custom API integrations, or need white-label solutions, our enterprise team can build a custom package for you.
              </p>
            </div>
            <Button as={Link} to="/contact" variant="brass" size="lg" className="shrink-0 relative z-10">
              Contact Sales
            </Button>
          </motion.div>

        </div>
      </div>
      
      <FAQSection faqs={faqData.pricing} title="Pricing FAQs" subtitle="Common questions about our billing and plans." />

      <CTASection 
        heading="Ready to transform your society?" 
        subtext="Join the smartest societies running on Parapet."
      />
    </PageWrapper>
  );
}
