import { Link } from 'react-router-dom';
import { Zap, Globe, AtSign, ExternalLink, ArrowRight } from 'lucide-react';
import { navigation } from '../../data/navigation';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--ink)] text-white border-t border-[var(--line-dark)]">
      {/* Main grid */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand column — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5" aria-label="Parapet home">
              <div className="w-8 h-8 rounded-lg bg-[var(--brass)] flex items-center justify-center shadow-[0_2px_8px_rgba(192,138,62,0.4)]">
                <Zap size={16} className="text-white fill-white" />
              </div>
              <span className="font-['Space_Grotesk'] font-700 text-[18px] tracking-[-0.02em]">Parapet</span>
            </Link>
            <p className="text-[15px] text-[rgba(244,245,241,0.55)] leading-relaxed mb-6 max-w-[260px]">
              {navigation.footer.brand.description}
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { icon: <Globe size={16} />, href: '#', label: 'Website' },
                { icon: <AtSign size={16} />, href: '#', label: 'Email' },
                { icon: <ExternalLink size={16} />, href: '#', label: 'LinkedIn' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-[var(--line-dark)] flex items-center justify-center text-[rgba(244,245,241,0.5)] hover:text-[var(--brass-light)] hover:border-[var(--brass)] transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {navigation.footer.columns.map((col) => (
            <div key={col.heading}>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.1em] text-[rgba(244,245,241,0.45)] mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-[14px] text-[rgba(244,245,241,0.6)] hover:text-[var(--brass-light)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--line-dark)]">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-[rgba(244,245,241,0.35)]">
            © {year} Parapet Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="text-[13px] text-[rgba(244,245,241,0.4)] hover:text-[var(--brass-light)] transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-[13px] text-[rgba(244,245,241,0.4)] hover:text-[var(--brass-light)] transition-colors">
              Terms
            </Link>
            <a
              href="mailto:hello@parapet.io"
              className="flex items-center gap-1.5 text-[13px] text-[var(--brass-light)] hover:text-[var(--brass)] transition-colors"
            >
              hello@parapet.io <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
