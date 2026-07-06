import { motion } from 'framer-motion';
import { ArrowDown, X, Check, FileText, Calculator, MessagesSquare, PhoneCall, LineChart, Siren } from 'lucide-react';

const problems = [
  { icon: FileText, problem: 'Paper Visitor Register', solution: 'Digital QR Check-in' },
  { icon: Calculator, problem: 'Manual Billing & Excel', solution: 'Auto Invoice Generation' },
  { icon: MessagesSquare, problem: 'WhatsApp Complaints', solution: 'Helpdesk Ticket System' },
  { icon: PhoneCall, problem: 'Gate Phone Calls', solution: 'QR Visitor Entry Pass' },
  { icon: LineChart, problem: 'Excel Accounting', solution: 'Complete Finance ERP' },
  { icon: Siren, problem: 'No Emergency System', solution: 'One-Tap SOS Alert' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

function ProblemCard({ icon: Icon, problem, solution }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm shadow-slate-200/60 transition-colors duration-300 hover:border-[#C58A38]/40 hover:shadow-lg hover:shadow-slate-200/70"
    >
      {/* Category icon */}
      <div className="flex items-center gap-3 px-6 pt-6 md:px-8 md:pt-8">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
          <Icon size={18} className="text-slate-500" />
        </div>
        <span className="h-px flex-1 bg-slate-100" aria-hidden="true" />
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
        <p className="text-[16px] font-bold text-slate-800">{problem}</p>
      </div>

      {/* Connector */}
      <div className="relative flex items-center justify-center py-1">
        <span className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-slate-100" aria-hidden="true" />
        <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-[#C58A38] shadow-[0_2px_10px_rgba(197,138,56,0.4)] transition-transform duration-300 group-hover:translate-y-0.5">
          <ArrowDown size={14} className="text-white" />
        </div>
      </div>

      {/* Solution */}
      <div className="bg-emerald-500/5 px-6 pb-6 pt-4 md:px-8 md:pb-8">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15">
            <Check size={11} className="text-emerald-600" />
          </div>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-600">
            With Parapet
          </span>
        </div>
        <p className="text-[16px] font-bold text-slate-800">{solution}</p>
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