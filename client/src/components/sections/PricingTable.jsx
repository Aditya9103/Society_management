import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';

const plans = [
  {
    tier: 'Starter',
    price: { monthly: 2999, annual: 2499 },
    unitLimit: 'Up to 100 Units',
    description: 'For smaller housing societies getting started with digital management.',
    features: [
      'Visitor Management',
      'Resident Directory',
      'Notice Board',
      'Complaint Helpdesk',
      'Basic Reports',
      'Email Support',
    ],
    ctaLabel: 'Start Free Trial',
    ctaHref: '/book-demo',
    highlighted: false,
  },
  {
    tier: 'Professional',
    price: { monthly: 6999, annual: 5999 },
    unitLimit: 'Up to 500 Units',
    description: 'Full-featured ERP for established societies with active finances and amenities.',
    features: [
      'Everything in Starter',
      'Complete Accounting & Billing',
      'UPI / Card Payments',
      'QR Vehicle Gate Pass',
      'Amenities Booking',
      'Document Vault',
      'Vendor & SLA Management',
      'Advanced Analytics',
      'Priority Support',
    ],
    ctaLabel: 'Book a Demo',
    ctaHref: '/book-demo',
    highlighted: true,
  },
  {
    tier: 'Enterprise',
    price: null,
    unitLimit: 'Unlimited Units',
    description: 'For management groups and large townships running multiple societies.',
    features: [
      'Everything in Professional',
      'Multi-Society Console',
      'Custom Role Configuration',
      'API Access & Webhooks',
      'Custom Branding',
      'Dedicated Account Manager',
      'SLA-backed Support',
      'On-site Training',
    ],
    ctaLabel: 'Contact Sales',
    ctaHref: '/contact',
    highlighted: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export function PricingCard({ tier, price, unitLimit, description, features, ctaLabel, ctaHref, highlighted, billing = 'monthly' }) {
  const displayPrice = price
    ? billing === 'annual' ? price.annual : price.monthly
    : null;

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        'relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300',
        highlighted
          ? 'bg-[var(--surface-dark-deepest)] border-primary shadow-2xl shadow-primary/20 scale-105 z-10'
          : 'bg-white shadow-sm border-[var(--line-on-light)] backdrop-blur-xl border-[var(--line-on-light)]/60 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:-translate-y-1'
      )}
    >
      {highlighted && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--brass)] to-transparent" />
      )}
      {highlighted && (
        <div className="absolute top-3 right-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] bg-[var(--brass)] text-white px-2 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className={`p-8 md:p-10 flex flex-col flex-1 ${highlighted ? '' : ''}`}>
        {/* Tier */}
        <p className={`font-mono text-[12px] font-bold uppercase tracking-[0.12em] mb-3 ${highlighted ? 'text-[var(--accent-on-dark)]' : 'text-[var(--accent)]'}`}>
          {tier}
        </p>

        {/* Price */}
        {displayPrice ? (
          <div className="mb-2">
            <span className={`font-mono font-bold text-[44px] tracking-tight ${highlighted ? 'text-white' : 'text-[var(--text-on-light)]'}`}>
              ₹{displayPrice.toLocaleString('en-IN')}
            </span>
            <span className={`text-[15px] ml-1 font-medium ${highlighted ? 'text-[var(--text-on-dark-muted)]' : 'text-[var(--text-on-light-muted)]'}`}>/month</span>
          </div>
        ) : (
          <div className="mb-2">
            <span className={`font-heading font-bold text-[32px] ${highlighted ? 'text-white' : 'text-[var(--text-on-light)]'}`}>
              Custom Pricing
            </span>
          </div>
        )}
        {billing === 'annual' && displayPrice && (
          <p className={`text-[13px] font-semibold mb-2 text-emerald-600`}>
            Billed annually — save 17%
          </p>
        )}

        <p className={`font-mono text-[12px] font-bold uppercase tracking-[0.08em] mb-5 ${highlighted ? 'text-[var(--accent-on-dark)]' : 'text-[var(--accent)]'}`}>
          {unitLimit}
        </p>

        <p className={`text-[15px] leading-relaxed mb-8 ${highlighted ? 'text-[var(--text-on-dark-muted)]' : 'text-[var(--text-on-light-muted)]'}`}>
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-3.5 mb-10 flex-1">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${highlighted ? 'bg-emerald-500/20' : 'bg-emerald-500/15'}`}>
                <Check size={12} className="text-emerald-500" />
              </div>
              <span className={`text-[14px] font-medium ${highlighted ? 'text-[var(--text-on-dark)]' : 'text-[var(--text-on-light)]'}`}>{f}</span>
            </li>
          ))}
        </ul>

        <Button
          as={Link}
          to={ctaHref}
          variant={highlighted ? 'brass' : 'outline'}
          size="lg"
          className="w-full"
        >
          {ctaLabel} <ArrowRight size={15} />
        </Button>
      </div>
    </motion.div>
  );
}

export default function PricingTable({ billing = 'monthly', preview = false }) {
  const data = preview ? plans : plans;
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {data.map((plan) => (
        <PricingCard key={plan.tier} {...plan} billing={billing} />
      ))}
    </motion.div>
  );
}
