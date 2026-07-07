import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Home, Wallet, Wrench, Waves, Settings } from 'lucide-react';
import { BaseCard } from '../ui/cards/BaseCard';
import { StaggerContainer, StaggerItem } from '../ui/animations/Animations';
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
    accent: { text: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', glow: 'from-primary/[0.06]' },
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
    accent: { text: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', glow: 'from-primary/[0.06]' },
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
    accent: { text: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', glow: 'from-primary/[0.06]' },
    features: ['RBAC Roles', 'Multi-Society', 'Approval Chains', 'Analytics Dashboard'],
    href: '/features',
  },
];

function ModuleCard({ icon: Icon, name, desc, features, href, accent }) {
  return (
    <StaggerItem>
      <BaseCard className="group flex flex-col h-full" hover={true} dark={true} padding="p-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${accent.glow.replace('from-', 'from-[var(--surface-dark-raised)]')} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0`} />

        <div className="relative z-10 flex flex-1 flex-col p-8">
          {/* Icon + name */}
          <div className="mb-5 flex items-start gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-[var(--line-on-dark)]`}>
              <Icon size={22} className="text-[var(--accent)]" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--text-on-dark)]">{name}</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--text-on-dark-muted)]">{desc}</p>
            </div>
          </div>

          {/* Feature list */}
          <ul className="mb-6 flex-1 space-y-2.5">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-[var(--text-on-dark-muted)]">
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-on-dark)]`} />
                {f}
              </li>
            ))}
          </ul>

          {/* Link */}
          <Link
            to={href}
            className={`inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition-all hover:gap-3 mt-auto`}
          >
            Explore module <ArrowRight size={14} />
          </Link>
        </div>
      </BaseCard>
    </StaggerItem>
  );
}

export default function ModuleGrid() {
  return (
    <StaggerContainer
      staggerDelay={0.08}
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {modules.map((m) => (
        <ModuleCard key={m.id} {...m} />
      ))}
    </StaggerContainer>
  );
}