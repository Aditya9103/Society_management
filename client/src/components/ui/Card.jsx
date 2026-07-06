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
      ? 'bg-ink/90 backdrop-blur-xl border-[#334155]/50 text-white shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:border-slate-600'
      : glass
      ? 'bg-bg-surface shadow-sm border border-bd-subtle backdrop-blur-xl border-white/40 text-tx-primary shadow-lg shadow-slate-200/50 hover:bg-bg-surface shadow-sm border border-bd-subtle hover:shadow-xl'
      : 'bg-bg-surface border-bd-subtle/60 text-tx-primary shadow-sm shadow-slate-200/40 hover:shadow-xl hover:border-primary/30',
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
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary-light/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10" />
      <div className="relative z-0 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
