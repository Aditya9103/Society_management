import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';
import { navigation } from '../../data/navigation';
import MobileMenu from './MobileMenu';

const deptIcons = {
  security:       '🔐',
  residents:      '🏠',
  community:      '👥',
  finance:        '💰',
  maintenance:    '🔧',
  amenities:      '🏊',
  administration: '⚙️',
};

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [megaOpen, setMegaOpen]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeTab, setActiveTab]     = useState(navigation.departments[0].id);
  const megaRef                        = useRef(null);
  const triggerRef                     = useRef(null);
  const location                       = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click-outside to close mega
  useEffect(() => {
    function handleClick(e) {
      if (
        megaRef.current && !megaRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)
      ) {
        setMegaOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const activeDept = navigation.departments.find((d) => d.id === activeTab);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-bd-subtle py-3 shadow-sm'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 mr-4" aria-label="Parapet home">
            <div className="w-8 h-8 rounded-lg bg-primary shadow-lg">
              <Zap size={16} className="text-white fill-white" />
            </div>
            <span className="font-heading font-700 text-[18px] tracking-[-0.02em] text-tx-primary">
              Parapet
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1" role="navigation" aria-label="Main navigation">
            {/* Features trigger */}
            <button
              ref={triggerRef}
              onClick={() => setMegaOpen((o) => !o)}
              aria-haspopup="true"
              aria-expanded={megaOpen}
              className={cn(
                'flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors',
                megaOpen
                  ? 'bg-bg-surface shadow-sm border border-bd-subtle text-tx-primary'
                  : 'text-tx-secondary hover:text-tx-primary hover:bg-bg-subtle'
              )}
            >
              Features
              <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={14} />
              </motion.span>
            </button>

            {navigation.main.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  isActive
                    ? 'text-tx-primary bg-bg-surface shadow-sm border border-bd-subtle'
                    : 'text-tx-secondary hover:text-tx-primary hover:bg-bg-subtle'
                )}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            <Link
              to="/admin/login"
              className="text-tx-secondary hover:text-tx-primary text-sm transition-colors"
            >
              Sign in
            </Link>
            <Button as={Link} to="/book-demo" size="sm" variant="brass">
              Book a Demo
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden ml-auto text-tx-primary p-2 rounded-lg hover:bg-bg-surface shadow-sm border border-bd-subtle transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* ── Mega Menu ── */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              ref={megaRef}
              key="mega"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-full left-0 right-0 bg-white/90 backdrop-blur-md border-b border-bd-subtle shadow-lg"
            >
              <div className="container py-8">
                <div className="flex gap-8">
                  {/* Department tabs (left sidebar) */}
                  <div className="w-44 shrink-0 flex flex-col gap-1 border-r border-bd-subtle pr-6">
                    <p className="mono text-tx-primary mb-3">Departments</p>
                    {navigation.departments.map((dept) => (
                      <button
                        key={dept.id}
                        onMouseEnter={() => setActiveTab(dept.id)}
                        onClick={() => setActiveTab(dept.id)}
                        className={cn(
                          'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors',
                          activeTab === dept.id
                            ? 'bg-bg-subtle text-tx-primary'
                            : 'text-tx-secondary hover:text-tx-primary hover:bg-bg-subtle'
                        )}
                      >
                        <span>{deptIcons[dept.id]}</span>
                        {dept.label}
                      </button>
                    ))}
                  </div>

                  {/* Feature links (right panel) */}
                  <div className="flex-1">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.15 }}
                      >
                        <p className="mono text-tx-primary mb-4">
                          {activeDept?.label} Module
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {activeDept?.features.map((feat) => (
                            <Link
                              key={feat.slug}
                              to={`/features/${feat.slug}`}
                              onClick={() => setMegaOpen(false)}
                              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-tx-secondary hover:text-tx-primary hover:bg-bg-subtle transition-colors group"
                            >
                              <ArrowRight size={12} className="text-primary opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all" />
                              {feat.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* View all CTA */}
                  <div className="w-40 shrink-0 border-l border-bd-subtle pl-6 flex flex-col justify-center gap-3">
                    <Link
                      to="/features"
                      onClick={() => setMegaOpen(false)}
                      className="flex items-center gap-2 text-sm text-tx-primary hover:text-primary font-medium transition-colors"
                    >
                      View all features <ArrowRight size={14} />
                    </Link>
                    <Button as={Link} to="/book-demo" size="sm" variant="brass" onClick={() => setMegaOpen(false)}>
                      Book a Demo
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
