// Badge — small status indicator pill
import { cn } from '../../utils/cn';

export function Badge({ children, color = 'brass', className = '' }) {
  const colors = {
    brass:  'bg-primary/10 text-primary border border-primary/20 backdrop-blur-md',
    teal:   'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 backdrop-blur-md',
    alert:  'bg-red-500/10 text-red-700 border border-red-500/20 backdrop-blur-md',
    ink:    'bg-ink/90 text-white border border-[#334155]/50 backdrop-blur-md shadow-sm',
    muted:  'bg-bg-subtle/80 text-tx-primary border border-bd-subtle/60 backdrop-blur-md',
    light:  'bg-bg-surface shadow-sm border border-bd-subtle text-white border border-white/30 backdrop-blur-md shadow-sm',
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
      'text-primary',
      className
    )}>
      {children}
    </span>
  );
}

export default Badge;
