import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export function AccordionItem({ question, answer, dark = false }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn(
      'border-b last:border-b-0 transition-colors duration-300',
      dark ? 'border-[#334155]/60' : 'border-bd-subtle/60'
    )}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          'w-full flex items-center justify-between gap-4 py-6 text-left',
          'font-semibold text-[16px] transition-colors',
          dark
            ? 'text-white hover:text-primary'
            : 'text-tx-primary hover:text-primary'
        )}
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="shrink-0 text-primary"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className={cn(
              'pb-6 text-[15px] leading-relaxed',
              dark ? 'text-tx-primary' : 'text-tx-primary'
            )}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({ items = [], dark = false, className = '' }) {
  return (
    <div className={cn(
      'rounded-2xl overflow-hidden transition-all duration-300',
      dark ? 'bg-ink/80 backdrop-blur-xl px-8 shadow-xl shadow-slate-900/20' : 'bg-bg-surface shadow-sm border border-bd-subtle backdrop-blur-xl border border-bd-subtle/60 px-8 shadow-lg shadow-slate-200/40',
      className
    )}>
      {items.map((item, i) => (
        <AccordionItem key={i} {...item} dark={dark} />
      ))}
    </div>
  );
}
