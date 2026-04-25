import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Scan, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const navLinks = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Our Vision', href: '/#our-vision' },
  { label: 'Technical Deep Dive', href: '/#tech-deep-dive' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const handleAnchor = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || open
          ? 'bg-surface-variant/70 backdrop-blur-xl border-b border-outline-variant/20 shadow-glass'
          : 'bg-transparent'
      )}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-container to-primary flex items-center justify-center shadow-ambient-blue">
              <Scan className="w-4 h-4 text-on-primary" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-on-surface tracking-tight">
              VDS<span className="text-primary">.</span>
            </span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchor(e, link.href)}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                  location.pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-highest/50'
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <NavLink
              to="/upload"
              className="btn-primary py-2.5 px-6 text-sm flex items-center gap-2"
            >
              Start Scan
              <ChevronRight className="w-4 h-4" />
            </NavLink>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-highest/50 transition-all"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 border-t border-outline-variant/20 mt-1 pt-4 animate-fade-in">
            <nav className="flex flex-col gap-1 mb-4">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchor(e, link.href)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-highest/50 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <NavLink to="/upload" className="btn-primary w-full text-center flex items-center justify-center gap-2 py-3 text-sm">
              Start Scan <ChevronRight className="w-4 h-4" />
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}
