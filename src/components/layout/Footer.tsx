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
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="font-serif text-xl font-semibold tracking-tight">
              WAEL BEN YAGHLANE
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Là où chaque fragrance raconte une histoire.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-4 mt-6">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
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
                <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Tous les Parfums
                </Link>
              </li>
              <li>
                <Link to="/shop?category=women" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pour Elle
                </Link>
              </li>
              <li>
                <Link to="/shop?category=men" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pour Lui
                </Link>
              </li>
              <li>
                <Link to="/shop?category=new" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Nouveautés
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4">À Propos</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Notre Histoire
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Livraison & Retours
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider mb-4">Restez Connecté</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Inscrivez-vous pour des offres exclusives.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-3 py-2 text-sm bg-background border border-input rounded-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
              >
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Wael Ben Yaghlane. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Politique de Confidentialité
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Conditions d'Utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
