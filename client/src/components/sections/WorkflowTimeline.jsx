import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const workflows = [
  {
    id: 'visitor',
    eyebrow: 'Visitor Entry',
    title: 'From invite to exit — fully logged.',
    color: '#C08A3E',
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
    color: '#2F9E6E',
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
    color: '#C24C3D',
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
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
};

function WorkflowColumn({ eyebrow, title, steps, color, isFirst }) {
  return (
    <div className={`flex flex-col ${isFirst ? '' : 'md:border-l md:border-white/10 md:pl-10 lg:pl-14'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} aria-hidden="true" />
          <p className="font-mono text-[12px] font-bold uppercase tracking-[0.12em]" style={{ color }}>
            {eyebrow}
          </p>
        </div>
        <h3 className="text-[22px] font-bold leading-tight text-white">{title}</h3>
      </div>

      {/* Steps */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col"
      >
        {steps.map((step, i) => (
          <motion.div key={i} variants={itemVariants} className="group relative flex gap-5 pb-8">
            {/* Connector line — draws in on scroll */}
            {i < steps.length - 1 && (
              <motion.div
                variants={lineVariants}
                style={{
                  transformOrigin: 'top',
                  background: `linear-gradient(to bottom, ${color}80, transparent)`,
                }}
                className="absolute left-5 top-10 bottom-0 w-px -translate-x-1/2"
              />
            )}

            {/* Step number badge */}
            <div
              className="relative z-10 mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold shadow-lg transition-transform duration-300 group-hover:scale-110"
              style={{
                background: i === steps.length - 1 ? color : 'rgba(255,255,255,0.05)',
                border: `1px solid ${color}50`,
                color: i === steps.length - 1 ? 'white' : color,
              }}
            >
              {i === steps.length - 1 ? <Check size={18} /> : i + 1}
            </div>

            {/* Step content */}
            <div>
              <p className="mb-1.5 text-[16px] font-bold leading-tight text-white">{step.label}</p>
              <p className="text-[14px] leading-relaxed text-slate-400">{step.detail}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function WorkflowTimeline({ workflows: customWorkflows }) {
  const items = customWorkflows || workflows;
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-0">
      {items.map((w, i) => (
        <WorkflowColumn key={w.id} {...w} isFirst={i === 0} />
      ))}
    </div>
  );
}