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
      className={cn('section', className)}
    >
      <div className="container">
        <div className="relative rounded-[24px] bg-[#1E293B] border border-[#334155] overflow-hidden px-8 py-16 text-center text-white">
          {/* Background gradient blobs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#C58A38]/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Dotted border accent top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C58A38] to-transparent opacity-50" />

          <div className="relative">
            <p className="text-xs uppercase tracking-wider font-semibold text-[#E4B876] mb-4">
              Get Started Today
            </p>
            <h2 className="text-white max-w-[540px] mx-auto mb-4">{heading}</h2>
            <p className="text-gray-400 text-lg max-w-[420px] mx-auto mb-8">
              {subtext}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button as={Link} to={primaryHref} variant="brass" size="xl">
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
