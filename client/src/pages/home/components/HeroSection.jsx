import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Play, ShieldCheck, Building2, Smartphone, Zap, ChevronDown } from 'lucide-react';
import Button from '../../../components/ui/Button';
import HeroBlueprint from '../../../components/sections/HeroBlueprint';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const staggerGrid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const gridItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const FEATURES = [
  { icon: ShieldCheck, iconBg: 'bg-emerald-500/10 border-emerald-500/20', iconColor: 'text-emerald-400', title: 'Secure & Reliable', desc: 'Enterprise-grade security' },
  { icon: Building2, iconBg: 'bg-[#C58A38]/10 border-[#C58A38]/20', iconColor: 'text-[#D4A35B]', title: 'Multi-Society Ready', desc: 'Built for enterprise scale' },
  { icon: Smartphone, iconBg: 'bg-blue-500/10 border-blue-500/20', iconColor: 'text-blue-400', title: 'Mobile First', desc: 'Android • iOS • PWA' },
  { icon: Zap, iconBg: 'bg-purple-500/10 border-purple-500/20', iconColor: 'text-purple-400', title: 'Live in Days', desc: 'Fast onboarding process' },
];

function StatCounter({ end, suffix = '', label }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 1800;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [end]);
  return (
    <div className="text-center">
      <p className="font-['IBM_Plex_Mono'] font-bold text-[32px] leading-none text-white">
        {count.toLocaleString('en-IN')}{suffix}
      </p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[rgba(244,245,241,0.5)]">
        {label}
      </p>
    </div>
  );
}

function TiltPanel({ children }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 });
  const glowX = useTransform(mx, [-0.5, 0.5], ['20%', '80%']);
  const glowY = useTransform(my, [-0.5, 0.5], ['20%', '80%']);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="relative overflow-hidden rounded-[32px] border border-slate-700/60 bg-gradient-to-br from-slate-800/90 to-slate-900 shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(212,163,91,0.16), transparent 45%)`
          ),
        }}
      />
      <div className="relative p-6 sm:p-8 lg:p-10">{children}</div>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-900 pt-12 pb-20 text-white lg:pt-16 lg:pb-24"
      aria-labelledby="hero-heading"
    >
      {/* Animated gradient mesh */}
      <motion.div
        className="pointer-events-none absolute top-10 left-0 h-[30rem] w-[30rem] rounded-full bg-[rgba(197,138,56,0.08)] blur-[130px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-[26rem] w-[26rem] rounded-full bg-[rgba(47,158,110,0.06)] blur-[120px]"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-[rgba(59,130,246,0.05)] blur-[110px]"
        animate={{ x: [0, 20, 0], y: [0, 25, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Blueprint grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(192,138,62,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(192,138,62,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />

      <div className="container relative z-10 px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left: copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl space-y-8 lg:space-y-9"
          >
            {/* Eyebrow badge — floats gently once revealed */}
            <motion.div variants={fadeUp}>
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <Link
                  to="/features"
                  className="group inline-flex items-center gap-3.5 rounded-full border border-[#D4A35B]/20 bg-white/5 p-1.5 pr-5 backdrop-blur-xl transition-all duration-300 hover:border-[#D4A35B]/40 hover:bg-white/10 hover:shadow-[0_8px_32px_rgba(197,138,56,0.15)]"
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#D4A35B]/20 px-3 py-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4A35B] opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D4A35B]" />
                    </span>
                    <span className="select-none text-[10px] font-bold uppercase leading-none tracking-[0.2em] text-[#D4A35B] antialiased">
                      LIVE
                    </span>
                  </span>
                  <span className="text-sm font-medium text-slate-300 transition-colors duration-300 group-hover:text-white">
                    Enterprise Society ERP
                    <span className="mx-2 select-none text-[#D4A35B]/60">•</span>
                    PWA
                  </span>
                  <ArrowRight size={15} className="text-[#D4A35B] transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Heading + subhead */}
            <motion.div variants={fadeUp} className="space-y-5">
              <h1 id="hero-heading" className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
                <span className="block">Run Your Entire</span>
                <span className="block bg-gradient-to-r from-[#E4B876] via-[#D4A35B] to-[#C58A38] bg-clip-text text-transparent">
                  Housing Society
                </span>
                <span className="block">From One Intelligent Platform</span>
              </h1>
              <p className="max-w-md text-base leading-relaxed text-slate-400 sm:text-lg">
                Billing, visitor entry, complaints, and communication — unified
                in one platform your committee and residents actually use.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col gap-4 sm:flex-row">
              <Button
                as={Link}
                to="/book-demo"
                variant="brass"
                size="xl"
                className="group relative isolate justify-center overflow-hidden tracking-wide shadow-2xl shadow-[#C58A38]/30 hover:scale-[1.03] active:scale-[0.98] sm:min-w-[220px]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative flex items-center gap-2.5">
                  Book Free Demo
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>

              <Button
                as={Link}
                to="/features"
                variant="outline-light"
                size="xl"
                className="group justify-center backdrop-blur-md hover:scale-[1.03] hover:border-white/50 hover:bg-white/15 active:scale-[0.98] sm:min-w-[220px]"
              >
                <Play size={16} className="fill-white transition-transform duration-300 group-hover:scale-110" />
                Watch Product Tour
              </Button>
            </motion.div>

            {/* Features — staggered individually */}
            <motion.div
              variants={fadeUp}
              className="border-t border-white/10 pt-8"
            >
              <motion.div
                variants={staggerGrid}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2"
              >
                {FEATURES.map(({ icon: Icon, iconBg, iconColor, title, desc }) => (
                  <motion.div key={title} variants={gridItem} className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${iconBg}`}>
                      <Icon className={`h-5 w-5 ${iconColor}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="text-sm text-slate-400">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 sm:gap-5">
              {[
                { end: 500, suffix: '+', label: 'Societies' },
                { end: 80000, suffix: '+', label: 'Residents' },
                { end: 2, suffix: ' Days', label: 'Deployment' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-2xl border border-slate-700/60 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A35B]/40 hover:bg-white/[0.07]"
                >
                  <StatCounter {...stat} />
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: blueprint SVG with mouse-tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative -translate-y-8 lg:-translate-y-24"
          >
            <div className="absolute -inset-10 rounded-full bg-[#C58A38]/10 blur-[120px]" />
            <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-emerald-500/10 blur-3xl" />
            <TiltPanel>
              <HeroBlueprint />
            </TiltPanel>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 lg:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}