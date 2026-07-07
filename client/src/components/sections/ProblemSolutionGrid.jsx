import { motion } from 'framer-motion';
import { ArrowDown, X, Check, FileText, Calculator, MessagesSquare, PhoneCall, LineChart, Siren } from 'lucide-react';

/**
 * Full rewrite. The previous version used six different rainbow accent
 * hues (emerald/blue/purple/amber/indigo/rose) and heavy glassmorphism
 * (backdrop-blur-2xl, glossy overlays, colored shadows) — the opposite
 * of this site's "Blueprint Dark" direction, which is explicitly one
 * accent hue (brass), restrained shadows, and no decorative glass/mesh.
 * This version uses only tokens already defined in index.css: brass for
 * the connector/accent, the semantic status colors for their actual
 * semantic purpose (alert for "before", live/teal for "after" — not as
 * decoration), and the same card recipe (white surface, hairline border,
 * hover lift + top accent line) used by FeatureCard elsewhere on the
 * site, so this section feels like part of the same product rather than
 * a visually distinct one-off.
 */
const problems = [
  { icon: FileText, problem: 'Paper visitor register', solution: 'Digital QR check-in' },
  { icon: Calculator, problem: 'Manual billing & Excel', solution: 'Auto invoice generation' },
  { icon: MessagesSquare, problem: 'WhatsApp complaints', solution: 'Helpdesk ticket system' },
  { icon: PhoneCall, problem: 'Gate phone calls', solution: 'QR visitor entry pass' },
  { icon: LineChart, problem: 'Excel accounting', solution: 'Complete finance ERP' },
  { icon: Siren, problem: 'No emergency system', solution: 'One-tap SOS alert' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};

function ProblemCard({ icon: Icon, problem, solution }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="group relative rounded-[18px] border border-[var(--line-on-light)] bg-[var(--surface-light-card)] shadow-sm hover:shadow-md hover:border-[var(--accent)]/30 transition-shadow duration-300 overflow-hidden"
    >
      {/* Top accent line, reveals on hover — same motif as FeatureCard */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Category icon */}
      <div className="px-7 pt-7">
        <div className="w-11 h-11 rounded-xl bg-[var(--accent-tint)] flex items-center justify-center text-[var(--accent)]">
          <Icon size={20} strokeWidth={2} aria-hidden="true" />
        </div>
      </div>

      {/* Before */}
      <div className="px-7 pt-5">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--status-alert)]/10">
            <X size={10} className="text-[var(--status-alert)]" strokeWidth={3} aria-hidden="true" />
          </div>
          <span className="mono text-[11px] font-semibold uppercase tracking-widest text-[var(--text-on-light-faint)]">
            Before
          </span>
        </div>
        <p className="text-[15px] font-medium text-[var(--text-on-light-muted)] line-through decoration-[var(--line-on-light-strong)]">
          {problem}
        </p>
      </div>

      {/* Connector */}
      <div className="relative flex items-center justify-center py-3">
        <span
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[var(--line-on-light)]"
          aria-hidden="true"
        />
        <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--brass-500)]/40 bg-[var(--surface-light-card)] transition-transform duration-300 group-hover:translate-y-0.5">
          <ArrowDown size={13} className="text-[var(--brass-500)]" aria-hidden="true" />
        </div>
      </div>

      {/* Solution */}
      <div className="px-7 pb-7 pt-2">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--status-live)]/10">
            <Check size={10} className="text-[var(--status-live)]" strokeWidth={3} aria-hidden="true" />
          </div>
          <span className="mono text-[11px] font-semibold uppercase tracking-widest text-[var(--text-on-light-faint)]">
            With Parapet
          </span>
        </div>
        <p className="text-[17px] font-bold text-[var(--text-on-light)]">{solution}</p>
      </div>
    </motion.div>
  );
}

export default function ProblemSolutionGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
    >
      {problems.map((item) => (
        <ProblemCard key={item.problem} {...item} />
      ))}
    </motion.div>
  );
}