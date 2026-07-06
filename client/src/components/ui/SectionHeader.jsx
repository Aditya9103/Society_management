import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

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
      className={cn('mb-12 flex flex-col', alignClass[align], className)}
      style={{ maxWidth }}
    >
      {eyebrow && (
        <motion.div
          variants={childVariants}
          className={cn('mb-4 flex items-center gap-2', justifyClass[align])}
        >
          <span
            className={cn('h-px w-6', dark ? 'bg-[#E4B876]/50' : 'bg-[#C58A38]/50')}
            aria-hidden="true"
          />
          <p
            className={cn(
              'text-sm font-semibold uppercase tracking-wider',
              dark ? 'text-[#E4B876]' : 'text-[#C58A38]'
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
          dark ? 'text-white' : 'text-slate-900'
        )}
      >
        {heading}
      </motion.h2>

      {subtext && (
        <motion.p
          variants={childVariants}
          className={cn(
            'mt-4 text-lg leading-relaxed',
            dark ? 'text-gray-400' : 'text-gray-600'
          )}
        >
          {subtext}
        </motion.p>
      )}
    </motion.div>
  );
}