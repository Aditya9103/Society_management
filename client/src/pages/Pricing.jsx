import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Building2, Shield, Users, HelpCircle } from 'lucide-react';
import { cn } from '../utils/cn';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import CTASection from '../components/sections/CTASection';
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

  return (
    <PageWrapper 
      title="Pricing | Parapet"
      description="Simple, transparent pricing for societies of all sizes."
    >
      <div className="pt-32 pb-24 bg-transparent min-h-screen">
        <div className="container">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-tx-primary mb-6"
            >
              Simple, transparent pricing.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-tx-primary leading-relaxed font-medium mb-10"
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
              <span className={cn("text-lg font-semibold transition-colors", !isAnnual ? "text-tx-primary" : "text-tx-secondary font-medium")}>
                Monthly
              </span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-16 h-8 rounded-full bg-bd-subtle relative p-1 cursor-pointer hover:bg-bd-strong transition-colors"
                aria-label="Toggle billing cycle"
              >
                <motion.div 
                  className="w-6 h-6 rounded-full bg-bg-surface shadow-sm"
                  animate={{ x: isAnnual ? 32 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span className={cn("text-lg font-semibold transition-colors flex items-center gap-2", isAnnual ? "text-tx-primary" : "text-tx-secondary font-medium")}>
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
                  "relative bg-bg-surface rounded-3xl p-8 shadow-xl transition-all hover:-translate-y-1",
                  plan.popular ? "border-2 border-[var(--brass)] shadow-[0_20px_40px_rgba(192,138,62,0.15)]" : "border border-bd-subtle"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--brass)] text-white text-sm font-bold px-4 py-1 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}
                
                <div className="flex items-center gap-4 mb-6">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", plan.popular ? "bg-[#C58A38]/10" : "bg-bg-subtle")}>
                    <plan.icon size={24} className={plan.popular ? "text-[var(--brass)]" : "text-tx-primary"} />
                  </div>
                  <h3 className="text-2xl font-bold text-tx-primary">{plan.name}</h3>
                </div>
                
                <p className="text-tx-secondary font-medium h-16">{plan.desc}</p>
                
                <div className="my-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isAnnual ? 'annual' : 'monthly'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex items-baseline gap-1"
                    >
                      <span className="text-4xl font-bold text-tx-primary">
                        ₹{isAnnual ? plan.priceAnnually.toLocaleString() : plan.priceMonthly.toLocaleString()}
                      </span>
                      <span className="text-tx-secondary font-medium font-medium">/mo</span>
                    </motion.div>
                  </AnimatePresence>
                  <p className="text-sm text-tx-secondary font-medium mt-1 font-medium">Billed {isAnnual ? 'annually' : 'monthly'}</p>
                </div>
                
                <Button 
                  as={Link} 
                  to="/book-demo" 
                  variant={plan.popular ? 'brass' : 'outline'} 
                  className="w-full mb-8"
                  size="lg"
                >
                  Get Started
                </Button>
                
                <div className="space-y-4">
                  <p className="text-sm font-bold text-tx-primary uppercase tracking-wider">Features included:</p>
                  {plan.features.map(feat => (
                    <div key={feat} className="flex items-start gap-3">
                      <Check size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-tx-primary font-medium">{feat}</span>
                    </div>
                  ))}
                  
                  {plan.notIncluded.length > 0 && (
                    <div className="pt-4 border-t border-bd-subtle mt-4 space-y-4">
                      {plan.notIncluded.map(feat => (
                        <div key={feat} className="flex items-start gap-3 opacity-50">
                          <X size={20} className="text-tx-secondary font-medium shrink-0 mt-0.5" />
                          <span className="text-tx-secondary font-medium font-medium">{feat}</span>
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
            className="mt-24 max-w-4xl mx-auto bg-bg-inverted rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--brass)]/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10 max-w-xl">
              <h3 className="text-3xl font-bold text-tx-primary mb-4">Need a custom enterprise solution?</h3>
              <p className="text-tx-secondary font-medium leading-relaxed">
                If you manage multiple properties, require custom API integrations, or need white-label solutions, our enterprise team can build a custom package for you.
              </p>
            </div>
            <Button as={Link} to="/contact" variant="brass" size="lg" className="shrink-0 relative z-10">
              Contact Sales
            </Button>
          </motion.div>

        </div>
      </div>
      
      <CTASection 
        heading="Ready to transform your society?" 
        subtext="Join the smartest societies running on Parapet."
      />
    </PageWrapper>
  );
}
