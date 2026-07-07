// Badge — small status indicator pill
import { cn } from '../../utils/cn';

export function Badge({ children, color = 'brass', className = '' }) {
  const colors = {
    brass:  'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 backdrop-blur-md',
    teal:   'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 backdrop-blur-md',
    alert:  'bg-red-500/10 text-red-700 border border-red-500/20 backdrop-blur-md',
    ink:    'bg-[var(--surface-dark-raised)] text-[var(--text-on-dark)] border border-[var(--line-on-dark)] backdrop-blur-md shadow-[var(--shadow-dark-panel)]',
    muted:  'bg-white/5 text-[var(--text-on-dark-muted)] border border-[var(--line-on-dark)] backdrop-blur-md',
    light:  'bg-white text-[var(--text-on-light)] border border-[var(--line-on-light)] backdrop-blur-md shadow-sm',
  };
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full',
      'mono tracking-widest text-[11px] uppercase',
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
      'inline-block mono tracking-widest text-eyebrow-size uppercase',
      'text-[var(--accent)]',
      className
    )}>
      {children}
    </span>
  );
}

export default Badge;
