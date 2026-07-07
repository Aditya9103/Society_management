import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

/**
 * Two fixes here, both worth flagging because this is a SHARED component
 * used by every section header on every page — these bugs weren't local
 * to one section, they were sitewide:
 *
 * 1. The light-mode heading used
 *      bg-gradient-to-br from-[var(--navy-950)] to-slate-500
 *    `slate-500` isn't a token in this design system at all — it's
 *    Tailwind's own default gray scale, a different, colder hue family
 *    than the navy/paper palette everywhere else. Every light-section
 *    heading on the entire site (Home, Pricing, About, Features, ...)
 *    was rendering with this off-brand gradient. Replaced with solid
 *    on-token text — cleaner, more legible, and matches the "no
 *    decorative gradients" direction already established for this build.
 *    The dark-mode gradient (white → white/70) is left as-is since it's
 *    monochrome and doesn't introduce an off-palette hue.
 *
 * 2. `text-eyebrow-size` assumed a Tailwind fontSize key named
 *    "eyebrow-size" was registered in the theme. It isn't (only
 *    `--text-mono-label` exists as a CSS custom property) — so this
 *    class was very likely a silent no-op, falling back to the
 *    browser/parent default size instead of the intended 12px eyebrow
 *    size. Replaced with an explicit arbitrary-value reference to the
 *    real token so it's guaranteed to resolve.
 */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
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
  maxWidth = '640px',
  className = '',
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={cn('mb-5 flex flex-col', alignClass[align], className)}
      style={{ maxWidth }}
    >
      {eyebrow && (
        <motion.div
          variants={childVariants}
          className={cn('mb-2 flex items-center gap-2', justifyClass[align])}
        >
          <span
            className={cn('h-px w-6', dark ? 'bg-[var(--accent-on-dark)]' : 'bg-[var(--accent)]')}
            aria-hidden="true"
          />
          <p
            className={cn(
              'mono tracking-widest uppercase text-[length:var(--text-mono-label)]',
              dark ? 'text-[var(--accent-on-dark)]' : 'text-[var(--accent)]'
            )}
          >
            {eyebrow}
          </p>
        </motion.div>
      )}

      <motion.h2
        variants={childVariants}
        className={cn(
          'text-[28px] font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[44px]',
          dark
            ? 'bg-clip-text text-transparent bg-gradient-to-br from-white to-white/70'
            : 'text-[var(--text-on-light)]'
        )}
      >
        {heading}
      </motion.h2>

      {subtext && (
        <motion.p
          variants={childVariants}
          className={cn(
            'mt-3 text-lg leading-relaxed',
            dark ? 'text-[var(--text-on-dark-muted)]' : 'text-[var(--text-on-light-muted)]'
          )}
        >
          {subtext}
        </motion.p>
      )}
    </motion.div>
  );
}