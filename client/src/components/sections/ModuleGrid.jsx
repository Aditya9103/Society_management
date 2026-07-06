import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Home, Wallet, Wrench, Waves, Settings } from 'lucide-react';

const modules = [
  {
    id: 'security',
    icon: ShieldCheck,
    name: 'Security',
    desc: 'Visitor management, QR passes, digital gate register, SOS alerts.',
    accent: { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', glow: 'from-red-500/[0.06]' },
    features: ['Visitor Management', 'QR Gate Pass', 'Emergency SOS', 'Guard Checkpoints'],
    href: '/features',
  },
  {
    id: 'residents',
    icon: Home,
    name: 'Residents',
    desc: 'Complete resident, family, tenant, and vehicle records.',
    accent: { text: 'text-[#C58A38]', bg: 'bg-[#C58A38]/10', border: 'border-[#C58A38]/20', glow: 'from-[#C58A38]/[0.06]' },
    features: ['Resident Directory', 'Tenant Accounts', 'Vehicle Records', 'Document Vault'],
    href: '/features',
  },
  {
    id: 'finance',
    icon: Wallet,
    name: 'Finance',
    desc: 'Billing, payments, receipts, expense tracking, and audit-ready reports.',
    accent: { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', glow: 'from-emerald-500/[0.06]' },
    features: ['Maintenance Billing', 'UPI Payments', 'Auto Receipts', 'Balance Sheet'],
    href: '/features',
  },
  {
    id: 'maintenance',
    icon: Wrench,
    name: 'Maintenance',
    desc: 'Complaint helpdesk, vendor assignment, and SLA tracking.',
    accent: { text: 'text-[#C58A38]', bg: 'bg-[#C58A38]/10', border: 'border-[#C58A38]/20', glow: 'from-[#C58A38]/[0.06]' },
    features: ['Complaint Tickets', 'Vendor Directory', 'SLA Timers', 'Resident Feedback'],
    href: '/features',
  },
  {
    id: 'amenities',
    icon: Waves,
    name: 'Amenities',
    desc: 'Clubhouse, gym, pool, and court bookings with conflict prevention.',
    accent: { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', glow: 'from-emerald-500/[0.06]' },
    features: ['Shared Calendar', 'Usage Caps', 'Approval Workflow', 'Booking History'],
    href: '/features',
  },
  {
    id: 'administration',
    icon: Settings,
    name: 'Administration',
    desc: 'Multi-society dashboard, RBAC, approval flows, and analytics.',
    accent: { text: 'text-[#C58A38]', bg: 'bg-[#C58A38]/10', border: 'border-[#C58A38]/20', glow: 'from-[#C58A38]/[0.06]' },
    features: ['RBAC Roles', 'Multi-Society', 'Approval Chains', 'Analytics Dashboard'],
    href: '/features',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

function ModuleCard({ icon: Icon, name, desc, features, href, accent }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-200/70"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${accent.glow} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

      <div className="relative flex flex-1 flex-col p-8">
        {/* Icon + name */}
        <div className="mb-5 flex items-start gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${accent.border} ${accent.bg}`}>
            <Icon size={22} className={accent.text} />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-800">{name}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">{desc}</p>
          </div>
        </div>

        {/* Feature list */}
        <ul className="mb-6 flex-1 space-y-2.5">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${accent.text.replace('text-', 'bg-')}`} />
              {f}
            </li>
          ))}
        </ul>

        {/* Link */}
        <Link
          to={href}
          className={`inline-flex items-center gap-2 text-sm font-semibold ${accent.text} transition-all hover:gap-3`}
        >
          Explore module <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ModuleGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {modules.map((m) => (
        <ModuleCard key={m.id} {...m} />
      ))}
    </motion.div>
  );
}