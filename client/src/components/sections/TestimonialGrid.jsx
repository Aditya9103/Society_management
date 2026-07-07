import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Parapet replaced our paper register, 3 WhatsApp groups, and our accountant's Excel in one go. Setup took 2 days.",
    author: 'Rajesh Menon',
    role: 'Society Chairman',
    society: 'Greenview Apartments, Bengaluru — 280 units',
    initials: 'RM',
    stars: 5,
  },
  {
    quote: "The QR entry system is the first thing residents noticed. No more gate calls at odd hours. Guards love the app.",
    author: 'Priya Nair',
    role: 'Committee Treasurer',
    society: 'Palm Grove Residency, Kochi — 180 units',
    initials: 'PN',
    stars: 5,
  },
  {
    quote: "Financial reports that our CA accepts directly — that alone saved us two weeks of back-and-forth before the AGM.",
    author: 'Sanjay Krishnamurthy',
    role: 'RWA President',
    society: 'Sunrise Heights, Chennai — 420 units',
    initials: 'SK',
    stars: 5,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

function TestimonialCard({ quote, author, role, society, initials, stars }) {
  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col gap-5 rounded-2xl border-[var(--line-on-light)]/60 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-sm border-[var(--line-on-light)] backdrop-blur-xl p-8 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:to-indigo-50/30 transition-all duration-300"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-2">
        {Array.from({ length: stars }, (_, i) => (
          <Star key={i} size={15} className="fill-primary text-primary" />
        ))}
      </div>

      {/* Quote */}
      <div className="relative mb-4">
        <Quote size={24} className="text-bd-subtle absolute -top-2 -left-2" />
        <p className="text-[16px] leading-relaxed text-[var(--text-on-light)] pl-4 relative z-10">
          {quote}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-4 pt-5 border-t border-[var(--line-on-light)]/60 mt-auto">
        <div className="w-11 h-11 rounded-full bg-[var(--surface-light-alt)] flex items-center justify-center text-[var(--text-on-light)] font-mono text-[13px] font-bold shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-bold text-[15px] text-[var(--text-on-light-muted)] leading-tight">{author}</p>
          <p className="text-[13px] text-[var(--text-on-light-muted)] mt-0.5">{role}</p>
          <p className="font-mono text-[11px] text-primary mt-1 uppercase tracking-wider">{society}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialGrid({ items }) {
  const data = items || testimonials;
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {data.map((t) => (
        <TestimonialCard key={t.author} {...t} />
      ))}
    </motion.div>
  );
}
