import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';

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

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="font-serif text-xl font-semibold tracking-tight">
              WAEL BEN YAGHLANE
            </Link>
            <p className="mt-4 text-sm text-background/70 leading-relaxed">
              Là où chaque fragrance raconte une histoire.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-4 mt-6">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4">Boutique</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-sm text-background/70 hover:text-background transition-colors">
                  Tous les Parfums
                </Link>
              </li>
              <li>
                <Link to="/shop?category=women" className="text-sm text-background/70 hover:text-background transition-colors">
                  Pour Elle
                </Link>
              </li>
              <li>
                <Link to="/shop?category=men" className="text-sm text-background/70 hover:text-background transition-colors">
                  Pour Lui
                </Link>
              </li>
              <li>
                <Link to="/shop?category=new" className="text-sm text-background/70 hover:text-background transition-colors">
                  Nouveautés
                </Link>
              </li>
            </ul>
          </div>

          {/* À propos (sans Blog) */}
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
        </div>

        {/* Informations légales */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="hidden md:block" />
          <div className="hidden md:block" />
          <div className="hidden md:block" />
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
                  Politique de confidentialité & Cookies
                </Link>
              </li>
              <li>
                <Link to="/parametres-cookies" className="text-sm text-background/70 hover:text-background transition-colors">
                  Paramètres des cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/70">
            © {new Date().getFullYear()} Wael Ben Yaghlane. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
