import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';

export default function CTASection({
  heading = 'Ready to Digitize Your Society?',
  subtext = 'Book a free demo today. Experience the future of society management.',
  primaryLabel = 'Book a Free Demo',
  primaryHref = '/book-demo',
  secondaryLabel = 'See all features',
  secondaryHref = '/features',
  className = '',
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      className={cn('section bg-[var(--surface-dark-deepest)] bp-grid-dark relative overflow-hidden', className)}
      style={{ '--grid-line-on-dark': 'rgba(244,245,241,0.03)' }}
    >
      <div className="container relative z-10">
        <div className="relative rounded-xl border border-[var(--line-on-dark)] bg-[var(--surface-dark-raised)] overflow-hidden px-8 py-16 text-center text-[var(--text-on-dark)] shadow-[var(--shadow-dark-panel)]">
          {/* Radial brass glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--accent)] opacity-[0.15] blur-[100px] rounded-full" />

          {/* Dotted border accent top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-on-dark)] to-transparent opacity-50" />

          <div className="relative z-10">
            <p className="mono tracking-widest text-[12px] uppercase text-[var(--accent-on-dark)] mb-4 font-semibold">
              Get Started Today
            </p>
            <h2 className="max-w-[540px] mx-auto mb-4 text-4xl font-bold">{heading}</h2>
            <p className="text-[var(--text-on-dark-muted)] text-lg max-w-[420px] mx-auto mb-8">
              {subtext}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button as={Link} to={primaryHref} variant="primary" size="xl">
                {primaryLabel} <ArrowRight size={16} />
              </Button>
              <Button as={Link} to={secondaryHref} variant="outline-light" size="xl">
                {secondaryLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
