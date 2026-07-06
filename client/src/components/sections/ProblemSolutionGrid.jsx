import { motion } from 'framer-motion';
import { ArrowDown, X, Check, FileText, Calculator, MessagesSquare, PhoneCall, LineChart, Siren } from 'lucide-react';

const problems = [
  { icon: FileText, color: 'emerald', problem: 'Paper Visitor Register', solution: 'Digital QR Check-in' },
  { icon: Calculator, color: 'blue', problem: 'Manual Billing & Excel', solution: 'Auto Invoice Generation' },
  { icon: MessagesSquare, color: 'purple', problem: 'WhatsApp Complaints', solution: 'Helpdesk Ticket System' },
  { icon: PhoneCall, color: 'amber', problem: 'Gate Phone Calls', solution: 'QR Visitor Entry Pass' },
  { icon: LineChart, color: 'indigo', problem: 'Excel Accounting', solution: 'Complete Finance ERP' },
  { icon: Siren, color: 'rose', problem: 'No Emergency System', solution: 'One-Tap SOS Alert' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

function ProblemCard({ icon: Icon, color, problem, solution }) {
  // Map colors for Tailwind to avoid purge issues
  const colorMap = {
    emerald: 'from-emerald-500/10 to-emerald-500/5 hover:border-emerald-500/30 shadow-emerald-500/10',
    blue: 'from-blue-500/10 to-blue-500/5 hover:border-blue-500/30 shadow-blue-500/10',
    purple: 'from-purple-500/10 to-purple-500/5 hover:border-purple-500/30 shadow-purple-500/10',
    amber: 'from-amber-500/10 to-amber-500/5 hover:border-amber-500/30 shadow-amber-500/10',
    indigo: 'from-indigo-500/10 to-indigo-500/5 hover:border-indigo-500/30 shadow-indigo-500/10',
    rose: 'from-rose-500/10 to-rose-500/5 hover:border-rose-500/30 shadow-rose-500/10',
  };
  const iconMap = {
    emerald: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    amber: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
    rose: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`group relative overflow-hidden rounded-[24px] border border-white/60 bg-gradient-to-br ${colorMap[color]} bg-white/60 backdrop-blur-xl shadow-xl transition-all duration-300`}
    >
      {/* Category icon */}
      <div className="flex items-center gap-3 px-6 pt-6 md:px-8 md:pt-8">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${iconMap[color]}`}>
          <Icon size={20} className="font-bold" />
        </div>
        <span className="h-px flex-1 bg-white/40" aria-hidden="true" />
      </div>

      {/* Problem */}
      <div className="px-6 pb-6 pt-4 md:px-8">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/10">
            <X size={11} className="text-red-500" />
          </div>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-red-500">
            Before
          </span>
        </div>
        <p className="text-[16px] font-bold text-tx-secondary font-medium">{problem}</p>
      </div>

      {/* Connector */}
      <div className="relative flex items-center justify-center py-2">
        <span className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-white/40" aria-hidden="true" />
        <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/60 bg-white/80 shadow-md backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-1">
          <ArrowDown size={14} className="text-tx-muted" />
        </div>
      </div>

      {/* Solution */}
      <div className="bg-white/40 px-6 pb-6 pt-4 md:px-8 md:pb-8">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 shadow-inner">
            <Check size={12} className="text-emerald-600 font-bold" />
          </div>
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-emerald-600">
            With Parapet
          </span>
        </div>
        <p className="text-[17px] font-bold text-tx-primary">{solution}</p>
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
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {problems.map((item) => (
        <ProblemCard key={item.problem} {...item} />
      ))}
    </motion.div>
  );
}