import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const alignClass = {
  left: 'text-left items-start',
  center: 'text-center items-center mx-auto',
  right: 'text-right items-end ml-auto',
};

const justifyClass = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

export default function SectionHeader({
  eyebrow,
  heading,
  subtext,
  align = 'left',
  dark = false,
  maxWidth = '680px',
  className = '',
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={cn('mb-8 flex flex-col', alignClass[align], className)}
    >
      {eyebrow && (
        <motion.div
          variants={childVariants}
          className={cn('mb-4 flex', justifyClass[align])}
        >
          <div
            className={cn(
              'inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-sm font-semibold tracking-wide border shadow-sm backdrop-blur-sm',
              dark
                ? 'bg-[var(--accent)]/10 text-[var(--accent-on-dark)] border-[var(--accent)]/20'
                : 'bg-white/60 text-[var(--accent)] border-[var(--accent)]/15'
            )}
          >
            {/* Pulsing indicator dot */}
            <span className="relative flex h-2 w-2">
              <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-60", dark ? "bg-[var(--accent-on-dark)]" : "bg-[var(--accent)]")}></span>
              <span className={cn("relative inline-flex rounded-full h-2 w-2", dark ? "bg-[var(--accent-on-dark)]" : "bg-[var(--accent)]")}></span>
            </span>
            <span className="uppercase text-xs tracking-[0.15em]">{eyebrow}</span>
          </div>
        </motion.div>
      )}

      <motion.h2
        variants={childVariants}
        className={cn(
          'text-[33px] font-bold leading-[1.05] tracking-tighter sm:text-[39px] lg:text-[45px]',
          dark
            ? 'bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60'
            : 'bg-clip-text text-transparent bg-gradient-to-br from-[var(--navy-950)] to-[var(--navy-700)]'
        )}
      >
        {heading}
      </motion.h2>

      {subtext && (
        <motion.p
          variants={childVariants}
          className={cn(
            'mt-5 text-base sm:text-lg leading-relaxed max-w-2xl',
            dark ? 'text-[var(--text-on-dark-muted)]' : 'text-[var(--text-on-light-muted)]',
            align === 'center' && 'mx-auto'
          )}
        >
          {subtext}
        </motion.p>
      )}
    </motion.div>
  );
}