import { motion } from 'framer-motion';
import { Shield, Lock, Database, Activity, Clock, FileCheck } from 'lucide-react';

const items = [
  { icon: <Shield size={22} />, label: 'AES-256 Encryption', detail: 'All data at rest & in transit' },
  { icon: <Lock size={22} />, label: 'Role-Based Access', detail: 'Granular per-module permissions' },
  { icon: <Database size={22} />, label: 'Daily Cloud Backup', detail: 'AWS Mumbai — data residency' },
  { icon: <Activity size={22} />, label: 'Full Audit Trail', detail: 'Every action timestamped & logged' },
  { icon: <Clock size={22} />, label: '99.9% Uptime SLA', detail: 'Redundant infrastructure' },
  { icon: <FileCheck size={22} />, label: 'DPDP Ready', detail: 'India data protection compliance' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function SecurityStrip() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
    >
      {items.map((item) => (
        <motion.div
          key={item.label}
          variants={itemVariants}
          className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-[var(--line-on-dark)] bg-[var(--surface-dark-raised)] shadow-[var(--shadow-dark-panel)] hover:bg-white/5 hover:border-[var(--text-on-dark-muted)] transition-all duration-300"
        >
          <div className="text-[var(--accent)] bg-white/5 border border-[var(--line-on-dark)] p-3 rounded-xl">{item.icon}</div>
          <div>
            <p className="text-[var(--text-on-dark)] font-bold text-[14px] leading-tight mb-1">{item.label}</p>
            <p className="text-[var(--text-on-dark-muted)] font-medium text-[12px]">{item.detail}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
