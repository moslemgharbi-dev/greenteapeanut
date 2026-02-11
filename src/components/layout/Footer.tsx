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

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.45 0 .1 5.35.1 11.95c0 2.1.55 4.16 1.6 5.98L0 24l6.24-1.64a11.9 11.9 0 0 0 5.7 1.45h.01c6.6 0 11.95-5.35 11.95-11.95 0-3.2-1.25-6.21-3.38-8.37ZM11.95 21.8h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.22-3.7.97.99-3.6-.24-.37a9.86 9.86 0 0 1-1.52-5.24C2.06 6.44 6.44 2.06 11.95 2.06c2.64 0 5.12 1.03 6.98 2.89a9.8 9.8 0 0 1 2.9 6.97c0 5.51-4.38 9.88-9.88 9.88Zm5.74-7.86c-.31-.15-1.84-.9-2.12-1.01-.28-.1-.49-.15-.7.15-.2.31-.8 1-.99 1.2-.18.2-.36.23-.67.08-.31-.15-1.3-.48-2.47-1.52-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.13-.63.13-.13.31-.36.46-.54.15-.18.2-.31.31-.51.1-.2.05-.39-.03-.54-.08-.15-.7-1.68-.96-2.3-.25-.6-.5-.52-.7-.53h-.6c-.2 0-.54.08-.82.39-.28.31-1.08 1.06-1.08 2.59 0 1.53 1.11 3.01 1.26 3.22.15.2 2.18 3.33 5.28 4.67.74.32 1.32.51 1.77.65.74.24 1.41.2 1.94.12.59-.09 1.84-.75 2.1-1.47.26-.72.26-1.34.18-1.47-.08-.13-.28-.2-.59-.36Z" />
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
              <a
                href="https://wa.me/21624433702"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-5 w-5" />
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
                <a
                  href="https://wa.me/21624433702"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="h-5 w-5" />
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
