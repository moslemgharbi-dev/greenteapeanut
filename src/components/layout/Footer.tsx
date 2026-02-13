import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Plus, Minus } from 'lucide-react';
import { TrustBadges } from '@/components/layout/TrustBadges';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

interface FooterAccordionProps {
  title: string;
  children: React.ReactNode;
}

function FooterAccordion({ title, children }: FooterAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-background/20 md:border-none">
      {/* Mobile: Accordion */}
      <button
        className="md:hidden flex items-center justify-between w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h4 className="font-medium text-sm uppercase tracking-wider">{title}</h4>
        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </button>
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
        {children}
      </div>

      {/* Desktop: Always visible */}
      <div className="hidden md:block">
        <h4 className="font-medium text-sm uppercase tracking-wider mb-4">{title}</h4>
        {children}
      </div>
    </div>
  );
}

// Static boutique links with Pour Lui/Pour Elle linking to homme/femme collections
const boutiqueLinks = [
  { label: 'Marques', to: '/shop' },
  { label: 'Pour Lui', to: '/collection/homme' },
  { label: 'Pour Elle', to: '/collection/femme' },
  { label: 'Parfum De Niche', to: '/collection/parfum-de-niche' },
];

export function Footer() {
  return (
    <>
      <TrustBadges />
      <footer className="border-t border-border bg-foreground text-background">
        <div className="container py-12 md:py-16">
          {/* Brand section - always visible */}
          <div className="mb-8 md:hidden">
            <Link to="/" className="font-brand text-xl font-medium tracking-[0.15em]">
              Wael Ben Yaghlane
            </Link>
            <p className="mt-4 text-sm text-background/70 leading-relaxed">
              Là où chaque fragrance raconte une histoire.
            </p>
            <div className="flex gap-4 mt-6">
              <a 
                href="https://www.instagram.com/ben_yaghlane_fragrance/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/benyaghlanefragrance.24433702" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@ben_yaghlanefragrance01" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Mobile: Accordion menus */}
          <div className="md:hidden">
            <FooterAccordion title="Boutique">
              <ul className="space-y-3">
                {boutiqueLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-background/70 hover:text-background transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterAccordion>

            <FooterAccordion title="À Propos">
              <ul className="space-y-3">
                <li>
                  <Link to="/maison" className="text-sm text-background/70 hover:text-background transition-colors">
                    La Maison
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-background/70 hover:text-background transition-colors">
                    Notre histoire
                  </Link>
                </li>
              </ul>
            </FooterAccordion>

            <FooterAccordion title="Maison Wael Ben Yaghlane & vous">
              <ul className="space-y-3">
                <li>
                  <Link to="/shipping" className="text-sm text-background/70 hover:text-background transition-colors">
                    Livraison
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-background/70 hover:text-background transition-colors">
                    Contactez-nous
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-sm text-background/70 hover:text-background transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </FooterAccordion>

            <FooterAccordion title="Informations légales">
              <ul className="space-y-3">
                <li>
                  <Link to="/mentions-legales" className="text-sm text-background/70 hover:text-background transition-colors">
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link to="/cgv" className="text-sm text-background/70 hover:text-background transition-colors">
                    CGV
                  </Link>
                </li>
                <li>
                  <Link to="/cgu" className="text-sm text-background/70 hover:text-background transition-colors">
                    CGU
                  </Link>
                </li>
                <li>
                  <Link to="/confidentialite-cookies" className="text-sm text-background/70 hover:text-background transition-colors">
                    Confidentialité & Cookies
                  </Link>
                </li>
                <li>
                  <Link to="/parametres-cookies" className="text-sm text-background/70 hover:text-background transition-colors">
                    Paramètres cookies
                  </Link>
                </li>
              </ul>
            </FooterAccordion>
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden md:grid grid-cols-5 gap-8">
            {/* Brand */}
            <div>
              <Link to="/" className="font-brand text-xl font-medium tracking-[0.15em]">
                Wael Ben Yaghlane
              </Link>
              <p className="mt-4 text-sm text-background/70 leading-relaxed">
                Là où chaque fragrance raconte une histoire.
              </p>
              <div className="flex gap-4 mt-6">
                <a 
                  href="https://www.instagram.com/ben_yaghlane_fragrance/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.facebook.com/benyaghlanefragrance.24433702" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.tiktok.com/@ben_yaghlanefragrance01" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Boutique */}
            <div>
              <h4 className="font-medium text-sm uppercase tracking-wider mb-4">Boutique</h4>
              <ul className="space-y-3">
                {boutiqueLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-background/70 hover:text-background transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* À propos */}
            <div>
              <h4 className="font-medium text-sm uppercase tracking-wider mb-4">À Propos</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/maison" className="text-sm text-background/70 hover:text-background transition-colors">
                    La Maison
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-background/70 hover:text-background transition-colors">
                    Notre histoire
                  </Link>
                </li>
              </ul>
            </div>

            {/* Maison Wael Ben Yaghlane & vous */}
            <div>
              <h4 className="font-medium text-sm uppercase tracking-wider mb-4">Maison Wael Ben Yaghlane &amp; vous</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/shipping" className="text-sm text-background/70 hover:text-background transition-colors">
                    Livraison
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-background/70 hover:text-background transition-colors">
                    Contactez-nous
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-sm text-background/70 hover:text-background transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Informations légales */}
            <div>
              <h4 className="font-medium text-sm uppercase tracking-wider mb-4">Informations légales</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/mentions-legales" className="text-sm text-background/70 hover:text-background transition-colors">
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link to="/cgv" className="text-sm text-background/70 hover:text-background transition-colors">
                    CGV
                  </Link>
                </li>
                <li>
                  <Link to="/cgu" className="text-sm text-background/70 hover:text-background transition-colors">
                    CGU
                  </Link>
                </li>
                <li>
                  <Link to="/confidentialite-cookies" className="text-sm text-background/70 hover:text-background transition-colors">
                    Confidentialité & Cookies
                  </Link>
                </li>
                <li>
                  <Link to="/parametres-cookies" className="text-sm text-background/70 hover:text-background transition-colors">
                    Paramètres cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-background/70">
              © {new Date().getFullYear()} Automind Studio. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
