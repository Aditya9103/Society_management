import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

const rows = [
  { feature: 'Visitor Management',    parapet: true,  others: true },
  { feature: 'Complete Accounting',   parapet: true,  others: 'partial' },
  { feature: 'QR Vehicle Gate Pass',  parapet: true,  others: 'limited' },
  { feature: 'Emergency SOS',         parapet: true,  others: 'limited' },
  { feature: 'Multi-Society Console', parapet: true,  others: 'partial' },
  { feature: 'PWA (No App Store)',     parapet: true,  others: false },
  { feature: 'Works Offline',         parapet: true,  others: 'limited' },
  { feature: 'Firebase Push Alerts',  parapet: true,  others: false },
  { feature: 'Role-Based Access',     parapet: true,  others: 'partial' },
  { feature: 'Document Vault',        parapet: true,  others: 'partial' },
  { feature: 'Polls & AGM Voting',    parapet: true,  others: 'some' },
  { feature: 'Amenities Booking',     parapet: true,  others: 'partial' },
  { feature: 'Advanced Analytics',    parapet: true,  others: 'basic' },
];

function CellIcon({ value }) {
  if (value === true)    return <Check size={16} className="text-[var(--teal)]" />;
  if (value === false)   return <X size={16} className="text-[var(--alert)]" />;
  return (
    <span className="font-mono text-[11px] text-[rgba(244,245,241,0.55)] capitalize leading-none">
      {value}
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

export default function CompareTable() {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl shadow-2xl shadow-black/20">
      {/* Header */}
      <div className="grid grid-cols-3 bg-slate-800/80 px-6 py-4 border-b border-slate-700/50">
        <div className="font-mono text-[12px] uppercase font-bold tracking-[0.1em] text-slate-400">Feature</div>
        <div className="font-mono text-[12px] uppercase font-bold tracking-[0.1em] text-[#E4B876] text-center">Parapet</div>
        <div className="font-mono text-[12px] uppercase font-bold tracking-[0.1em] text-slate-500 text-center">Others</div>
      </div>

      {/* Rows */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {rows.map((row, i) => (
          <motion.div
            key={row.feature}
            variants={rowVariants}
            className={cn(
              'grid grid-cols-3 px-6 py-4 border-b border-slate-700/50 last:border-0 hover:bg-slate-800/30 transition-colors',
              i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'
            )}
          >
            <p className="text-[15px] font-medium text-slate-300">{row.feature}</p>
            <div className="flex justify-center items-center">
              <CellIcon value={row.parapet} />
            </div>
            <div className="flex justify-center items-center">
              <CellIcon value={row.others} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
