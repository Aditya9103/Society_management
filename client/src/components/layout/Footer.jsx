import { Link } from 'react-router-dom';
import { Zap, Globe, AtSign, ExternalLink, ArrowRight } from 'lucide-react';
import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedinIn, FaYoutube, FaWhatsapp } from 'react-icons/fa6';
import { navigation } from '../../data/navigation';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--surface-dark-deepest)] text-[var(--text-on-dark)] border-t border-[var(--line-on-dark)]">
      {/* Main grid */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand column — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5" aria-label="Parapet home">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center shadow-lg">
                <Zap size={16} className="text-[var(--navy-900)] fill-[var(--navy-900)]" />
              </div>
              <span className="font-heading font-bold text-[18px] tracking-tight">Parapet</span>
            </Link>
            <p className="text-[15px] text-[var(--text-on-dark-muted)] leading-relaxed mb-6 max-w-[260px]">
              {navigation.footer.brand.description}
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-[var(--line-on-dark)] flex items-center justify-center text-[var(--text-on-dark-muted)] hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-colors" aria-label="Facebook">
                <FaFacebook size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-[var(--line-on-dark)] flex items-center justify-center text-[var(--text-on-dark-muted)] hover:text-white hover:bg-[#E4405F] hover:border-[#E4405F] transition-colors" aria-label="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-[var(--line-on-dark)] flex items-center justify-center text-[var(--text-on-dark-muted)] hover:text-white hover:bg-black hover:border-black transition-colors" aria-label="Twitter">
                <FaXTwitter size={15} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-[var(--line-on-dark)] flex items-center justify-center text-[var(--text-on-dark-muted)] hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-colors" aria-label="LinkedIn">
                <FaLinkedinIn size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-[var(--line-on-dark)] flex items-center justify-center text-[var(--text-on-dark-muted)] hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] transition-colors" aria-label="YouTube">
                <FaYoutube size={16} />
              </a>
              <a href="https://wa.me/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-[var(--line-on-dark)] flex items-center justify-center text-[var(--text-on-dark-muted)] hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-colors" aria-label="WhatsApp">
                <FaWhatsapp size={16} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {navigation.footer.columns.map((col) => (
            <div key={col.heading}>
              <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--text-on-dark-muted)] mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-[14px] text-[var(--text-on-dark-muted)] hover:text-[var(--accent)] transition-colors"
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
      <div className="border-t border-[var(--line-on-dark)]">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-[var(--text-on-dark-muted)]">
            © {year} Parapet Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="text-[13px] text-[var(--text-on-dark-muted)] hover:text-[var(--text-on-dark)] transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-[13px] text-[var(--text-on-dark-muted)] hover:text-[var(--text-on-dark)] transition-colors">
              Terms
            </Link>
            <a
              href="mailto:hello@parapet.io"
              className="flex items-center gap-1.5 text-[13px] text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors"
            >
              hello@parapet.io <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
