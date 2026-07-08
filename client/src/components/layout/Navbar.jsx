import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, Zap } from 'lucide-react';
import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedinIn, FaYoutube, FaWhatsapp } from 'react-icons/fa6';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';
import { navigation } from '../../data/navigation';
import MobileMenu from './MobileMenu';

const deptIcons = {
  security: '🔐',
  residents: '🏠',
  community: '👥',
  finance: '💰',
  maintenance: '🔧',
  amenities: '🏊',
  administration: '⚙️',
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(navigation.departments[0].id);
  const megaRef = useRef(null);
  const triggerRef = useRef(null);
  const location = useLocation();

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
            ? 'bg-[var(--nav-bg-scrolled)] backdrop-blur-md border-b border-[var(--nav-border-scrolled)] py-3'
            : 'bg-[var(--nav-bg-top)] py-5'
        )}
      >
        <div className="container flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 mr-4" aria-label="Parapet home">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent)] shadow-[var(--shadow-accent)] flex items-center justify-center">
              <Zap size={16} className="text-[var(--navy-900)] fill-[var(--navy-900)]" />
            </div>
            <span className="font-display font-bold text-[18px] tracking-tight text-[var(--text-on-dark)]">
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
                  ? 'bg-[var(--surface-dark-raised)] border border-[var(--line-on-dark)] text-[var(--nav-link-color-active)]'
                  : 'text-[var(--nav-link-color)] hover:text-[var(--nav-link-color-hover)] hover:bg-[var(--surface-dark-raised)]'
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
                    ? 'text-[var(--nav-link-color-active)] bg-[var(--surface-dark-raised)] border border-[var(--line-on-dark)]'
                    : 'text-[var(--nav-link-color)] hover:text-[var(--nav-link-color-hover)] hover:bg-[var(--surface-dark-raised)]'
                )}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="hidden lg:flex items-center gap-4 ml-auto">
            {/* Social Icons */}
            <div className="flex items-center gap-3 pr-4 border-r border-[var(--line-on-dark)]">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-[var(--nav-link-color)] hover:text-[#1877F2] transition-colors" aria-label="Facebook">
                <FaFacebook size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[var(--nav-link-color)] hover:text-[#E4405F] transition-colors" aria-label="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-[var(--nav-link-color)] hover:text-white transition-colors" aria-label="Twitter">
                <FaXTwitter size={15} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-[var(--nav-link-color)] hover:text-[#0A66C2] transition-colors" aria-label="LinkedIn">
                <FaLinkedinIn size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-[var(--nav-link-color)] hover:text-[#FF0000] transition-colors" aria-label="YouTube">
                <FaYoutube size={16} />
              </a>
              <a href="https://wa.me/" target="_blank" rel="noreferrer" className="text-[var(--nav-link-color)] hover:text-[#25D366] transition-colors" aria-label="WhatsApp">
                <FaWhatsapp size={16} />
              </a>
            </div>
            <Link
              to="/admin/login"
              className="text-[var(--nav-link-color)] hover:text-[var(--nav-link-color-hover)] text-sm font-medium transition-colors"
            >
              Sign in
            </Link>
            <Button as={Link} to="/book-demo" size="sm" variant="brass">
              Book a Demo
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden ml-auto text-[var(--text-on-dark)] p-2 rounded-lg hover:bg-[var(--surface-dark-raised)] border border-[var(--line-on-dark)] transition-colors"
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
              className="absolute top-full left-0 right-0 bg-[var(--surface-dark)] border-b border-[var(--line-on-dark)] shadow-[var(--shadow-dark-panel)]"
            >
              <div className="container py-8">
                <div className="flex gap-8">
                  {/* Department tabs (left sidebar) */}
                  <div className="w-44 shrink-0 flex flex-col gap-1 border-r border-[var(--line-on-dark)] pr-6">
                    <p className="mono text-[var(--text-on-dark-muted)] mb-3">Departments</p>
                    {navigation.departments.map((dept) => (
                      <button
                        key={dept.id}
                        onMouseEnter={() => setActiveTab(dept.id)}
                        onClick={() => setActiveTab(dept.id)}
                        className={cn(
                          'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors',
                          activeTab === dept.id
                            ? 'bg-[var(--surface-dark-raised)] text-[var(--accent-on-dark)]'
                            : 'text-[var(--text-on-dark-muted)] hover:text-[var(--text-on-dark)] hover:bg-[var(--surface-dark-raised)]'
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
                        <p className="mono tracking-widest uppercase text-[var(--accent-on-dark)] text-[11px] mb-4">
                          {activeDept?.label} Module
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {activeDept?.features.map((feat) => (
                            <Link
                              key={feat.slug}
                              to={`/features/${feat.slug}`}
                              onClick={() => setMegaOpen(false)}
                              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-[var(--text-on-dark)] hover:text-[var(--accent-on-dark)] hover:bg-[var(--surface-dark-raised)] transition-colors group"
                            >
                              <ArrowRight size={12} className="text-[var(--accent-on-dark)] opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all" />
                              {feat.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* View all CTA */}
                  <div className="w-40 shrink-0 border-l border-[var(--line-on-light)] pl-6 flex flex-col justify-center gap-3">
                    <Link
                      to="/features"
                      onClick={() => setMegaOpen(false)}
                      className="flex items-center gap-2 text-sm text-[var(--text-on-dark)] hover:text-[var(--accent-on-dark)] font-medium transition-colors"
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
