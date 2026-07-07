import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Fixes vs. the previous version:
 *
 * 1. `Minus` was imported from lucide-react but never actually used
 *    anywhere in the component — every "partial support" row (the
 *    string values: 'partial', 'limited', 'basic', 'some') rendered as
 *    plain text with no icon at all, while true/false got a Check/X.
 *    That's an inconsistent hierarchy: two of the three states got a
 *    glyph, one didn't. Wired `Minus` in properly for that state.
 * 2. The header used `bg-black/20` and rows alternated
 *    `bg-black/10` / `bg-transparent`, plus a `hover:bg-white/[0.03]`
 *    on top — all raw black/white opacity values instead of this
 *    project's actual navy tokens. Replaced with `--surface-dark-deepest`
 *    for the header and a navy-based `color-mix` for zebra striping.
 * 3. `backdrop-blur-xl` on the outer wrapper was a no-op: the panel
 *    sits on `--surface-dark-raised`, an opaque solid color, over an
 *    opaque `--surface-dark` section — there's no translucency for a
 *    backdrop blur to act on, so it was pure dead weight. Removed.
 * 4. The header's "Parapet" label correctly used `--accent-on-dark`,
 *    but the checkmark icon two lines below it used plain `--accent`
 *    instead — same dark context, two different brass variants for
 *    what should be one consistent treatment. Standardized on
 *    `--accent-on-dark` throughout.
 * 5. This design system has dedicated `--table-*` tokens
 *    (`--table-highlight-col-bg` etc.), but they were authored assuming
 *    a table on a LIGHT background (`--table-header-bg: var(--surface-
 *    light-alt)`), and this table actually renders on a dark section.
 *    Rather than force light-table tokens into a dark card, this
 *    version hand-colors for the dark context directly — worth
 *    knowing that the existing `--table-*` tokens are effectively
 *    unused/reserved for a hypothetical light-context table elsewhere
 *    (e.g. a printable/exportable report), not this one.
 *
 * Visual changes: the feature-name column now gets more width than the
 * two value columns (was an even three-way split, wasting space
 * centering a single icon in the same width as a long label). Added a
 * continuous, subtle brass-tinted band down the "Parapet" column the
 * same way most comparison tables highlight "your" column — the token
 * built for exactly this (`--table-highlight-col-bg`) existed but
 * wasn't being used anywhere.
 */
const rows = [
  { feature: 'Visitor Management', parapet: true, others: true },
  { feature: 'Complete Accounting', parapet: true, others: 'partial' },
  { feature: 'QR Vehicle Gate Pass', parapet: true, others: 'limited' },
  { feature: 'Emergency SOS', parapet: true, others: 'limited' },
  { feature: 'Multi-Society Console', parapet: true, others: 'partial' },
  { feature: 'PWA (No App Store)', parapet: true, others: false },
  { feature: 'Works Offline', parapet: true, others: 'limited' },
  { feature: 'Firebase Push Alerts', parapet: true, others: false },
  { feature: 'Role-Based Access', parapet: true, others: 'partial' },
  { feature: 'Document Vault', parapet: true, others: 'partial' },
  { feature: 'Polls & AGM Voting', parapet: true, others: 'some' },
  { feature: 'Amenities Booking', parapet: true, others: 'partial' },
  { feature: 'Advanced Analytics', parapet: true, others: 'basic' },
];

function CellIcon({ value }) {
  if (value === true) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-on-dark)]/15">
        <Check size={14} className="text-[var(--accent-on-dark)]" strokeWidth={3} aria-hidden="true" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.04]">
        <X size={14} className="text-[var(--text-on-dark-faint)]" strokeWidth={2.5} aria-hidden="true" />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5">
      <Minus size={13} className="text-[var(--text-on-dark-faint)]" strokeWidth={3} aria-hidden="true" />
      <span className="mono text-[11px] text-[var(--text-on-dark-muted)] capitalize leading-none">{value}</span>
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};
const rowVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const GRID_COLS = 'grid grid-cols-[1.6fr_1fr_1fr]';
const PARAPET_COL_BG = 'bg-[color-mix(in_srgb,var(--accent)_7%,transparent)]';

export default function CompareTable() {
  return (
    <div className="rounded-2xl overflow-hidden border border-[var(--line-on-dark)] bg-[var(--surface-dark-raised)] shadow-[var(--shadow-dark-panel)]">
      {/* Header */}
      <div className={cn(GRID_COLS, 'bg-[var(--surface-dark-deepest)] px-6 py-4 border-b border-[var(--line-on-dark)]')}>
        <div className="mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-on-dark-muted)] font-medium">
          Feature
        </div>
        <div className={cn('mono text-[12px] uppercase tracking-[0.1em] text-[var(--accent-on-dark)] text-center font-semibold rounded-t-lg -my-4 py-4', PARAPET_COL_BG)}>
          Parapet
        </div>
        <div className="mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-on-dark-muted)] font-medium text-center">
          Others
        </div>
      </div>

      {/* Rows */}
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        {rows.map((row, i) => {
          const isLast = i === rows.length - 1;
          return (
            <motion.div
              key={row.feature}
              variants={rowVariants}
              className={cn(
                GRID_COLS,
                'px-6 py-3.5 border-b border-[var(--line-on-dark)] last:border-0 hover:bg-white/[0.02] transition-colors',
                i % 2 === 1 && 'bg-[color-mix(in_srgb,var(--navy-700)_28%,transparent)]'
              )}
            >
              <p className="text-[14.5px] font-medium text-[var(--text-on-dark)] flex items-center pr-4">
                {row.feature}
              </p>
              <div className={cn('flex justify-center items-center -my-3.5 py-3.5', PARAPET_COL_BG, isLast && 'rounded-b-lg')}>
                <CellIcon value={row.parapet} />
              </div>
              <div className="flex justify-center items-center">
                <CellIcon value={row.others} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}