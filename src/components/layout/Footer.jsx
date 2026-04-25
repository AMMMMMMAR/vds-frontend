import React from 'react';
import { NavLink } from 'react-router-dom';
import { Scan, Code, MessageCircle, Shield } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Upload Photo', href: '/upload' },
    { label: 'Virtual Try-On', href: '/try-on' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'AI Ethics', href: '#' },
  ],
  Support: [
    { label: 'Contact Support', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'Clinical Standards', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface-lowest border-t border-outline-variant/10">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <NavLink to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-container to-primary flex items-center justify-center">
                <Scan className="w-4 h-4 text-on-primary" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-on-surface">VDS<span className="text-primary">.</span></span>
            </NavLink>
            <p className="text-body text-sm mb-6 max-w-xs">
              The Digital Atelier. AI-powered precision fitting that celebrates every body type.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-xl bg-surface-highest/50 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all">
                <Code className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-surface-highest/50 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-surface-highest/50 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all">
                <Shield className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-label text-primary/80 mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-outline-variant/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-label text-on-surface-variant/50 text-[11px]">
            © 2026 VDS — Virtual Dressing System. All rights reserved.
          </p>
          <p className="text-[11px] text-on-surface-variant/40 flex items-center gap-1.5">
            <Shield className="w-3 h-3" />
            Privacy-first. Your biometric data never leaves your device.
          </p>
        </div>
      </div>
    </footer>
  );
}
