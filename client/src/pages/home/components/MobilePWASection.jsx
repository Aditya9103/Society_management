import { motion } from 'framer-motion';
import { Smartphone, Wifi, WifiOff, QrCode, BellRing, CreditCard, Ticket, Calendar } from 'lucide-react';


const mobileFeatures = [
  { icon: BellRing, label: 'Push Notifications' },
  { icon: QrCode, label: 'QR Scanner' },
  { icon: CreditCard, label: 'Online Payments' },
  { icon: Ticket, label: 'Raise Complaints' },
  { icon: Calendar, label: 'Book Amenities' },
  { icon: WifiOff, label: 'Works Offline' },
];

const notifications = [
  { text: 'Visitor arrived', tone: 'var(--status-live)' },
  { text: 'Bill paid ₹3,200', tone: 'var(--accent)' },
  { text: 'Ticket #041 closed', tone: 'var(--accent)' },
  { text: 'SOS cleared', tone: 'var(--status-live)' },
];

const guardEntries = [
  { name: 'Ravi Sharma', detail: 'Flat 204' },
  { name: 'Blue Honda', detail: 'MH 01 AB 1234' },
];

export default function MobilePWASection() {
  return (
    <section className="py-32 lg:py-40 bg-surface-light-alt text-text-primary-on-light">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: phone mockups */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center gap-4 py-10"
          >
            {/* Ambient glow behind the phones — single hue, restrained */}
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  'radial-gradient(420px 420px at 50% 40%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)',
              }}
              aria-hidden="true"
            />

            {/* Resident App mockup */}
            <div
              className="relative w-52 h-[420px] rounded-[36px] bg-[var(--surface-dark-deepest)] shadow-2xl overflow-hidden flex flex-col z-10"
              style={{
                border: '6px solid color-mix(in srgb, var(--accent) 25%, var(--navy-800))',
                boxShadow: '0 30px 60px rgba(16,24,43,0.22)',
              }}
            >
              <div className="bg-[var(--surface-dark-deepest)]/90 px-5 py-4 border-b border-[var(--line-on-dark)]">
                <p className="mono text-[10px] uppercase tracking-[0.1em] text-[var(--accent-on-dark)]">
                  Resident App
                </p>
              </div>

              <div className="p-4 space-y-2.5 flex-1 bg-white">
                {notifications.map(({ text, tone }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 bg-[var(--surface-light-alt)]"
                  >
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: tone }} aria-hidden="true" />
                    <p className="text-[11px] font-medium text-[var(--text-on-light)]">{text}</p>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-[var(--line-on-light)] bg-white">
                <div className="bg-[var(--accent)] rounded-full py-2 text-center">
                  <p className="text-[var(--navy-900)] mono text-[9px] font-bold uppercase tracking-[0.1em]">SOS</p>
                </div>
              </div>
            </div>

            {/* Guard App mockup */}
            <div
              className="relative w-48 h-[340px] mt-12 -ml-8 rounded-[32px] bg-[var(--surface-dark-deepest)] shadow-2xl overflow-hidden flex flex-col z-20"
              style={{
                border: '6px solid color-mix(in srgb, var(--accent) 25%, var(--navy-800))',
                boxShadow: '0 24px 48px rgba(16,24,43,0.2)',
              }}
            >
              <div className="bg-[var(--surface-dark-deepest)] px-5 py-4 border-b border-[var(--line-on-dark)]">
                <p className="mono text-[10px] uppercase tracking-[0.1em] text-[var(--accent-on-dark)]">Guard App</p>
              </div>

              <div className="p-4 space-y-2.5 flex-1 bg-white">
                <div className="rounded-2xl p-4 bg-[var(--accent-tint)] border border-[var(--accent)]/20">
                  <QrCode size={30} className="text-[var(--accent)] mx-auto mb-1" aria-hidden="true" />
                  <p className="text-center mono text-[9px] font-bold text-[var(--accent-hover)] uppercase tracking-[0.1em]">
                    Scan QR
                  </p>
                </div>
                {guardEntries.map(({ name, detail }) => (
                  <div key={name} className="rounded-lg px-3 py-2 bg-[var(--surface-light-alt)]">
                    <p className="text-[11px] font-semibold text-[var(--text-on-light)]">{name}</p>
                    <p className="text-[10px] text-[var(--text-on-light-muted)]">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* "Works Offline" floating badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-30">
              <div
                className="flex items-center gap-2 px-5 py-3 rounded-full text-[13px] font-bold tracking-wide uppercase text-white"
                style={{
                  background: 'var(--status-live)',
                  boxShadow: '0 12px 28px color-mix(in srgb, var(--status-live) 35%, transparent)',
                }}
              >
                <WifiOff size={15} aria-hidden="true" /> Works Offline
              </div>
            </div>
          </motion.div>

          {/* Right: copy */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:pl-8"
          >
            <p className="mono text-[12px] uppercase tracking-[0.12em] text-[var(--accent)] mb-5 font-bold">
              Mobile + PWA
            </p>
            <h2 className="mb-6 text-4xl lg:text-5xl font-bold leading-tight text-[var(--text-on-light)]">
              No App Store required.
              <br />
              Install it like any website.
            </h2>
            <p className="text-[18px] text-[var(--text-on-light-muted)] leading-relaxed mb-10">
              Parapet is a Progressive Web App — residents and guards install it directly from their
              browser. No waiting for App Store approvals. Updates ship instantly to every device.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {mobileFeatures.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-[15px] font-medium text-[var(--text-on-light-muted)]">
                  <div className="w-10 h-10 rounded-xl bg-[var(--surface-light-card)] shadow-sm flex items-center justify-center text-[var(--accent)]">
                    <Icon size={16} aria-hidden="true" />
                  </div>
                  {label}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-[var(--surface-light-card)] shadow-sm px-4 py-2 rounded-full text-[13px] font-medium text-[var(--text-on-light)]">
                <Wifi size={14} className="text-[var(--accent)]" aria-hidden="true" /> Works Online
              </div>
              <div className="flex items-center gap-2 bg-[var(--surface-light-card)] shadow-sm px-4 py-2 rounded-full text-[13px] font-medium text-[var(--text-on-light)]">
                <WifiOff size={14} className="text-[var(--text-on-light-muted)]" aria-hidden="true" /> Seamless Offline
              </div>
              <div className="flex items-center gap-2 bg-[var(--surface-light-card)] shadow-sm px-4 py-2 rounded-full text-[13px] font-medium text-[var(--text-on-light)]">
                <Smartphone size={14} className="text-[var(--text-on-light-muted)]" aria-hidden="true" /> Android + iOS
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}