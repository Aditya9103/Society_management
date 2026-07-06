// Badge — small status indicator pill
import { cn } from '../../utils/cn';

export function Badge({ children, color = 'brass', className = '' }) {
  const colors = {
    brass:  'bg-[#C58A38]/10 text-[#C58A38] border border-[#C58A38]/20 backdrop-blur-md',
    teal:   'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 backdrop-blur-md',
    alert:  'bg-red-500/10 text-red-700 border border-red-500/20 backdrop-blur-md',
    ink:    'bg-[#1E293B]/90 text-white border border-[#334155]/50 backdrop-blur-md shadow-sm',
    muted:  'bg-slate-100/80 text-slate-600 border border-slate-200/60 backdrop-blur-md',
    light:  'bg-white/20 text-white border border-white/30 backdrop-blur-md shadow-sm',
  };
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full',
      'text-[11px] uppercase font-bold tracking-[0.06em]',
      colors[color] || colors.brass,
      className
    )}>
      {children}
    </span>
  );
}

// Tag — department / category label (mono, used as eyebrow)
export function Tag({ children, className = '' }) {
  return (
    <span className={cn(
      'inline-block text-xs uppercase tracking-wider font-semibold',
      'text-[#C58A38]',
      className
    )}>
      {children}
    </span>
  );
}

export default Badge;
