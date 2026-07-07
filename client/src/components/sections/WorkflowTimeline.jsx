import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

/**
 * Fixes vs. the previous version — three real bugs, not just style
 * opinions:
 *
 * 1. `color: 'var(--teal)'` and `color: 'var(--alert)'` reference CSS
 *    custom properties that don't exist anywhere in this project's
 *    index.css — the real tokens are `--status-live` and
 *    `--status-alert`. An undefined custom property resolves to
 *    nothing, so the Maintenance and Emergency SOS columns' dot,
 *    eyebrow, connector line, and badge ring were very likely rendering
 *    uncolored (default/inherited text color) rather than teal/red.
 * 2. `background: 'var(--paper)'` — same issue, the real token is
 *    `--surface-light-card` (or raw `--paper-100`/`--paper-200`).
 * 3. Colors were alpha-blended by string concatenation, e.g.
 *    `border: \`1px solid ${color}50\`` — since `color` is the JS
 *    string `'var(--accent)'`, this produces the literal CSS text
 *    `1px solid var(--accent)50`, which is not valid CSS (you can only
 *    append a two-digit alpha suffix to a literal hex color, not to a
 *    var() function call). The browser drops declarations it can't
 *    parse, so every "tinted" border and connector-line gradient in
 *    this component was silently invalid. Fixed with `color-mix()`,
 *    which is the correct modern-CSS way to blend a custom property
 *    with transparency.
 *
 * Visual changes: each workflow now sits in its own card (white surface,
 * hairline border, hover shadow) instead of relying on a `border-left`
 * divider that only appeared at the md breakpoint — on mobile, the three
 * workflows previously had zero visual separation from each other, just
 * a stacked list of text. Added a small step-count pill per card and a
 * subtle tinted highlight behind the final ("done") step.
 */
const workflows = [
  {
    id: 'visitor',
    eyebrow: 'Visitor Entry',
    title: 'From invite to exit — fully logged.',
    color: 'var(--accent)',
    steps: [
      { label: 'Resident Creates Invite', detail: 'One-time QR sent via WhatsApp/SMS' },
      { label: 'Visitor Receives QR Pass', detail: 'Arrives at gate, no calls needed' },
      { label: 'Guard Scans at Gate', detail: 'Name, photo & purpose auto-populated' },
      { label: 'Resident Notified Instantly', detail: 'App push notification on arrival' },
      { label: 'Entry & Exit Logged', detail: 'Timestamped, searchable, exportable' },
    ],
  },
  {
    id: 'complaint',
    eyebrow: 'Maintenance',
    title: 'Every complaint tracked to resolution.',
    color: 'var(--status-live)',
    steps: [
      { label: 'Resident Raises Ticket', detail: 'With photos & description from app' },
      { label: 'Auto-assigned by Category', detail: 'Plumbing → plumber, Electrical → electrician' },
      { label: 'Vendor / Staff Notified', detail: 'SMS + app alert with SLA deadline' },
      { label: 'Resident Rates Resolution', detail: '5-star feedback collected on closure' },
      { label: 'Ticket Closed & Logged', detail: 'Full history retained for audits' },
    ],
  },
  {
    id: 'sos',
    eyebrow: 'Emergency SOS',
    title: 'One tap. Guards on site in seconds.',
    color: 'var(--status-alert)',
    steps: [
      { label: 'Resident Presses SOS', detail: 'Single large button in the app' },
      { label: 'Nearest Guards Notified', detail: 'With floor, unit number & map pin' },
      { label: 'Committee Admins Alerted', detail: 'Simultaneously in parallel' },
      { label: 'Guard Confirms Response', detail: 'Timer started on acknowledgment' },
      { label: 'Incident Report Filed', detail: 'Auto-generated for records & audits' },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
};

function WorkflowColumn({ eyebrow, title, steps, color }) {
  return (
    <motion.div
      variants={cardVariants}
      className="rounded-[20px] border border-[var(--line-on-light)] bg-[var(--surface-light-card)] p-8 lg:p-9 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} aria-hidden="true" />
            <p className="mono text-[12px] font-bold uppercase tracking-[0.12em]" style={{ color }}>
              {eyebrow}
            </p>
          </div>
          <h3 className="text-[21px] font-bold leading-tight text-[var(--text-on-light)]">{title}</h3>
        </div>
        <span
          className="mono shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold"
          style={{ color, background: `color-mix(in srgb, ${color} 10%, transparent)` }}
        >
          {steps.length} steps
        </span>
      </div>

      {/* Steps */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col"
      >
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          return (
            <motion.div key={i} variants={itemVariants} className="group relative flex gap-4 pb-7 last:pb-0">
              {!isLast && (
                <motion.div
                  variants={lineVariants}
                  style={{
                    transformOrigin: 'top',
                    background: `linear-gradient(to bottom, color-mix(in srgb, ${color} 45%, transparent), transparent)`,
                  }}
                  className="absolute left-[19px] top-10 bottom-0 w-px -translate-x-1/2"
                  aria-hidden="true"
                />
              )}

              <div
                className={`relative z-10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold transition-transform duration-300 group-hover:scale-110 ${isLast ? 'shadow-md' : ''
                  }`}
                style={{
                  background: isLast ? color : 'var(--surface-light-card)',
                  border: `1.5px solid ${isLast ? color : `color-mix(in srgb, ${color} 35%, transparent)`}`,
                  color: isLast ? 'var(--navy-900)' : color,
                }}
              >
                {isLast ? <Check size={16} aria-hidden="true" /> : i + 1}
              </div>

              <div
                className={isLast ? '-mt-1 -ml-1 rounded-xl p-2' : ''}
                style={isLast ? { background: `color-mix(in srgb, ${color} 7%, transparent)` } : undefined}
              >
                <p className="mb-1 text-[15px] font-bold leading-tight text-[var(--text-on-light)]">{step.label}</p>
                <p className="text-[13.5px] leading-relaxed text-[var(--text-on-light-muted)] font-medium">
                  {step.detail}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default function WorkflowTimeline({ workflows: customWorkflows }) {
  const items = customWorkflows || workflows;
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8"
    >
      {items.map((w) => (
        <WorkflowColumn key={w.id} {...w} />
      ))}
    </motion.div>
  );
}