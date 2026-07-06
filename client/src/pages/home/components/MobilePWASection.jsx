import { motion } from 'framer-motion';
import { Smartphone, Wifi, WifiOff, QrCode, BellRing, CreditCard, Ticket, Calendar } from 'lucide-react';

const mobileFeatures = [
  { icon: <BellRing size={16} />, label: 'Push Notifications' },
  { icon: <QrCode size={16} />, label: 'QR Scanner' },
  { icon: <CreditCard size={16} />, label: 'Online Payments' },
  { icon: <Ticket size={16} />, label: 'Raise Complaints' },
  { icon: <Calendar size={16} />, label: 'Book Amenities' },
  { icon: <WifiOff size={16} />, label: 'Works Offline' },
];

export default function MobilePWASection() {
  return (
    <section className="py-32 lg:py-40 bg-slate-50">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center gap-4"
          >
            {/* Resident App mockup */}
            <div className="relative w-52 h-[420px] rounded-[36px] bg-slate-900 border-[6px] border-slate-800 shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col z-10">
              <div className="bg-slate-800 px-5 py-4 border-b border-slate-700/50">
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#E4B876]">Resident App</p>
              </div>
              {/* Fake app content */}
              <div className="p-4 space-y-3 flex-1 bg-slate-900/50">
                {[['Visitor arrived', '#2F9E6E'], ['Bill paid ₹3,200', '#C08A3E'], ['Ticket #041 closed', '#C08A3E'], ['SOS cleared', '#2F9E6E']].map(([text, color]) => (
                  <div key={text} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                    <p className="text-[10px] text-[rgba(244,245,241,0.7)]">{text}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-[var(--line-dark)]">
                <div className="bg-[var(--brass)] rounded-full py-2 text-center">
                  <p className="text-white font-mono text-[9px] uppercase tracking-[0.1em]">SOS</p>
                </div>
              </div>
            </div>

            {/* Guard App mockup */}
            <div className="relative w-48 h-[340px] mt-12 -ml-8 rounded-[32px] bg-slate-800 border-[6px] border-slate-700 shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col z-20">
              <div className="bg-slate-900 px-5 py-4 border-b border-slate-700/50">
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#E4B876]">Guard App</p>
              </div>
              <div className="p-4 space-y-3 flex-1 bg-slate-800/50">
                <div className="bg-[#C58A38]/10 rounded-2xl p-4 border border-[#C58A38]/20 backdrop-blur-sm">
                  <QrCode size={32} className="text-[var(--brass-light)] mx-auto mb-1" />
                  <p className="text-center font-mono text-[9px] text-[var(--brass-light)] uppercase tracking-[0.1em]">Scan QR</p>
                </div>
                {[['Ravi Sharma', 'Flat 204'], ['Blue Honda', 'MH 01 AB 1234']].map(([a, b]) => (
                  <div key={a} className="bg-white/5 rounded-lg px-3 py-2">
                    <p className="text-[10px] text-white font-medium">{a}</p>
                    <p className="text-[9px] text-[rgba(244,245,241,0.5)]">{b}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* "Works Offline" badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30">
              <div className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-3 rounded-full text-[13px] font-bold shadow-xl shadow-emerald-500/20 tracking-wide uppercase">
                <WifiOff size={15} /> Works Offline
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
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#C58A38] mb-5 font-bold">Mobile + PWA</p>
            <h2 className="mb-6 text-4xl lg:text-5xl font-bold leading-tight">
              No App Store required.<br />Install it like any website.
            </h2>
            <p className="text-[18px] text-slate-500 leading-relaxed mb-10">
              Parapet is a Progressive Web App — residents and guards install it directly from their browser. No waiting for App Store approvals. Updates ship instantly to every device.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {mobileFeatures.map((f) => (
                <div key={f.label} className="flex items-center gap-3 text-[15px] font-medium text-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#C58A38] shadow-sm">
                    {f.icon}
                  </div>
                  {f.label}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-[var(--paper-2)] px-4 py-2 rounded-full text-[13px] font-medium text-[var(--text)]">
                <Wifi size={14} className="text-[var(--teal)]" /> Works Online
              </div>
              <div className="flex items-center gap-2 bg-[var(--paper-2)] px-4 py-2 rounded-full text-[13px] font-medium text-[var(--text)]">
                <WifiOff size={14} className="text-[var(--brass)]" /> Works Offline
              </div>
              <div className="flex items-center gap-2 bg-[var(--paper-2)] px-4 py-2 rounded-full text-[13px] font-medium text-[var(--text)]">
                <Smartphone size={14} className="text-[var(--text-muted)]" /> Android + iOS
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
