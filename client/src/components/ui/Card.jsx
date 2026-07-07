import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function Card({
  children,
  className = '',
  hover = true,
  glass = false,
  dark = false,
  onClick,
  ...props
}) {
  const base = cn(
    'relative rounded-2xl border overflow-hidden transition-all duration-300 ease-out group',
    dark
      ? 'bg-[var(--surface-dark-raised)] backdrop-blur-xl border-[var(--line-on-dark)] text-white shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:border-slate-600'
      : glass
        ? 'bg-gradient-to-br from-white/90 via-slate-50/60 to-slate-100/80 border border-white/60 backdrop-blur-xl text-[var(--text-on-light)] shadow-[0_8px_32px_rgba(16,24,43,0.04)] hover:bg-gradient-to-br hover:from-white hover:to-indigo-50/40 hover:border-white/80 hover:shadow-[0_16px_48px_rgba(16,24,43,0.08)]'
        : 'bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-[var(--line-on-light)] text-[var(--text-on-light)] shadow-sm shadow-slate-200/40 hover:shadow-xl hover:border-[var(--accent)]/30 hover:to-indigo-50/30',
    hover && 'cursor-pointer',
    className
  );

  return (
    <motion.div
      className={base}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={onClick}
      {...props}
    >
      {/* Subtle top highlight line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent)]/20 via-[var(--accent)] to-[var(--accent)]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10" />
      <div className="relative z-0 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
