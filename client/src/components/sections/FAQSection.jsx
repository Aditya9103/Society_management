import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';
import SectionHeader from '../ui/SectionHeader';

export default function FAQSection({ 
  faqs = [], 
  title = "Frequently Asked Questions", 
  subtitle = "Everything you need to know about Parapet.",
  dark = false,
  className = ""
}) {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className={cn(
      "py-24 border-y",
      dark ? "bg-[var(--surface-dark)] border-[var(--line-on-dark)]" : "bg-[var(--surface-light)] border-[var(--line-on-light)]",
      className
    )}>
      <div className="container max-w-4xl">
        <SectionHeader
          eyebrow="FAQ"
          heading={title}
          subtext={subtitle}
          align="center"
          dark={dark}
        />

        <div className="mt-16 flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "border rounded-2xl overflow-hidden transition-colors duration-200",
                  dark 
                    ? isOpen 
                      ? "bg-[var(--surface-dark-raised)] border-[var(--line-on-dark-strong)] shadow-[var(--shadow-dark-panel)]" 
                      : "bg-transparent border-[var(--line-on-dark)] hover:border-[var(--line-on-dark-strong)] hover:bg-white/[0.02]"
                    : isOpen
                      ? "bg-[var(--surface-light-card)] border-[var(--line-on-light-strong)] shadow-sm"
                      : "bg-transparent border-[var(--line-on-light)] hover:border-[var(--line-on-light-strong)] hover:bg-black/[0.02]"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <h3 className={cn(
                    "text-[17px] font-semibold tracking-tight transition-colors",
                    dark 
                      ? isOpen ? "text-[var(--text-on-dark)]" : "text-[var(--text-on-dark-muted)]"
                      : isOpen ? "text-[var(--text-on-light)]" : "text-[var(--text-on-light-muted)]"
                  )}>
                    {faq.question}
                  </h3>
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200",
                    dark
                      ? isOpen ? "bg-[var(--accent-on-dark)]/10 text-[var(--accent-on-dark)]" : "bg-white/5 text-[var(--text-on-dark-faint)]"
                      : isOpen ? "bg-[var(--accent-tint)] text-[var(--accent-hover)]" : "bg-black/5 text-[var(--text-on-light-faint)]"
                  )}>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <ChevronDown size={18} strokeWidth={2.5} />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className={cn(
                        "px-6 pb-6 pt-2 leading-relaxed text-[15.5px] whitespace-pre-wrap",
                        dark ? "text-[var(--text-on-dark-muted)]" : "text-[var(--text-on-light-muted)]"
                      )}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
