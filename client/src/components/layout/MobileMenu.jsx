import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Zap } from 'lucide-react';
import Button from '../ui/Button';
import { navigation } from '../../data/navigation';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { x: '100%', transition: { duration: 0.25, ease: 'easeIn' } },
};

export default function MobileMenu({ open, onClose }) {
  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-[var(--ink)] flex flex-col overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--line-dark)]">
              <Link to="/" onClick={onClose} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-[var(--brass)] flex items-center justify-center">
                  <Zap size={14} className="text-white fill-white" />
                </div>
                <span className="font-['Space_Grotesk'] font-bold text-white">Parapet</span>
              </Link>
              <button
                onClick={onClose}
                className="text-[rgba(244,245,241,0.7)] hover:text-white p-2 rounded-lg hover:bg-white/8 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main nav links */}
            <nav className="flex-1 p-5 space-y-1">
              <NavLink
                to="/features"
                onClick={onClose}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-[rgba(244,245,241,0.75)] hover:text-white hover:bg-white/6'}`
                }
              >
                Features
              </NavLink>
              {navigation.main.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-[rgba(244,245,241,0.75)] hover:text-white hover:bg-white/6'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {/* Department sections */}
              <div className="pt-4 border-t border-[var(--line-dark)] mt-4">
                <p className="mono text-[var(--brass-light)] px-4 mb-3">Feature Modules</p>
                {navigation.departments.slice(0, 4).map((dept) => (
                  <div key={dept.id} className="mb-3">
                    <p className="px-4 py-1 text-xs font-semibold text-[rgba(244,245,241,0.45)] uppercase tracking-wider">
                      {dept.label}
                    </p>
                    {dept.features.slice(0, 3).map((feat) => (
                      <Link
                        key={feat.slug}
                        to={`/features/${feat.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-[rgba(244,245,241,0.65)] hover:text-white hover:bg-white/6 rounded-lg transition-colors"
                      >
                        <ArrowRight size={12} className="text-[var(--brass)]" />
                        {feat.name}
                      </Link>
                    ))}
                  </div>
                ))}
                <Link
                  to="/features"
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--brass-light)] hover:text-[var(--brass)] transition-colors"
                >
                  View all 25 features <ArrowRight size={13} />
                </Link>
              </div>
            </nav>

            {/* Footer CTAs */}
            <div className="p-5 border-t border-[var(--line-dark)] space-y-3">
              <Button as={Link} to="/book-demo" variant="brass" size="lg" className="w-full" onClick={onClose}>
                Book a Free Demo
              </Button>
              <Link
                to="/admin/login"
                onClick={onClose}
                className="block text-center text-sm text-[rgba(244,245,241,0.55)] hover:text-white transition-colors py-2"
              >
                Admin Sign in
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
