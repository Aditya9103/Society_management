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
    'rounded-2xl border overflow-hidden transition-all duration-300 ease-out',
    dark
      ? 'bg-[#1E293B]/80 backdrop-blur-xl border-[#334155]/50 text-white shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:shadow-slate-900/40 hover:border-slate-600'
      : glass
      ? 'bg-white/40 backdrop-blur-xl border-white/40 text-slate-900 shadow-lg shadow-slate-200/50 hover:bg-white/60 hover:shadow-xl hover:shadow-slate-200/50'
      : 'bg-white border-slate-200/60 text-slate-900 shadow-sm shadow-slate-200/40 hover:shadow-xl hover:shadow-slate-200/60 hover:border-slate-300',
    hover && 'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
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
      {children}
    </motion.div>
  );
}
