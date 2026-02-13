import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { InlineSearch } from '@/components/search/InlineSearch';
import collectionHommeImg from '@/assets/collection-homme-hover.jpg';
import collectionFemmeImg from '@/assets/collection-femme-hover.jpg';

const collectionHoverImages: Record<string, { src: string; label: string; subtitle: string }> = {
  '/collection/homme': { src: collectionHommeImg, label: 'Collection Pour Lui', subtitle: 'Découvrez nos fragrances masculines' },
  '/collection/femme': { src: collectionFemmeImg, label: 'Collection Pour Elle', subtitle: 'Découvrez nos fragrances féminines' },
};

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Static navigation items with Pour Lui/Pour Elle linking to homme/femme collections
  const navItems = useMemo(() => [
    { label: 'Marques', to: '/shop' },
    { label: 'Pour Lui', to: '/collection/homme' },
    { label: 'Pour Elle', to: '/collection/femme' },
    { label: 'Parfum De Niche', to: '/collection/parfum-de-niche' },
  ], []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Mobile slogan bar */}
      <div className="md:hidden bg-foreground text-background">
        <div className="flex h-8 items-center justify-center text-xs tracking-widest uppercase">
          Une signature, un parcours
        </div>
      </div>

      {/* Top bar (desktop) */}
      <div className="hidden md:block bg-foreground text-background">
        <div className="container flex h-9 items-center justify-start gap-6 text-xs tracking-wide">
          <Link to="/contact" className="hover:opacity-80 transition-opacity">
            Contact
          </Link>
          <Link to="/maison" className="hover:opacity-80 transition-opacity">
            Maison Wael Ben Yaghlane
          </Link>
        </div>
      </div>

      {/* Main row */}
      <div className="container grid h-16 md:h-20 grid-cols-[auto,1fr,auto] items-center gap-2 md:gap-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Search (desktop) */}
        <div className="hidden md:block">
          <InlineSearch />
        </div>

        {/* Brand (center) */}
        <Link to="/" className="justify-self-center text-center group min-w-0">
          <span className="font-brand text-base sm:text-lg md:text-3xl font-medium tracking-[0.1em] md:tracking-[0.15em] uppercase transition-opacity group-hover:opacity-80 whitespace-nowrap">
            Wael Ben Yaghlane
          </span>
          <span className="sr-only">Accueil</span>
        </Link>

        {/* Actions (right) */}
        <div className="justify-self-end flex items-center gap-1 md:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            aria-label="Rechercher"
          >
            {isMobileSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Favoris"
            className="hidden md:flex"
            onClick={() => {
              // Placeholder: pas de fonctionnalité demandée
            }}
          >
            <Heart className="h-5 w-5" />
          </Button>

          <CartDrawer />
        </div>
      </div>

      {/* Category row (desktop) */}
      <div className="hidden md:block border-t border-border">
        <div className="container">
          <nav className="flex items-center justify-between gap-6 py-4 text-xs font-medium uppercase tracking-[0.16em]">
            {navItems.map((item) => {
              const hoverData = collectionHoverImages[item.to];
              return (
                <div key={item.label} className="relative group/nav pb-4 -mb-4">
                  <Link
                    to={item.to}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                  {hoverData && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible translate-y-2 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 transition-all duration-500 ease-out z-50 pointer-events-none group-hover/nav:pointer-events-auto">
                      <Link to={item.to} className="block w-[420px] rounded-lg overflow-hidden shadow-2xl border border-border/50 bg-popover group/card">
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <img
                            src={hoverData.src}
                            alt={hoverData.label}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                          />
                        </div>
                        <div className="p-5 text-center">
                          <p className="text-sm font-medium tracking-wider text-foreground normal-case">{hoverData.label}</p>
                          <p className="text-xs text-muted-foreground mt-1.5 normal-case">{hoverData.subtitle}</p>
                          <span className="inline-block mt-3.5 text-xs font-medium tracking-widest uppercase text-foreground border-b border-foreground pb-0.5 transition-all duration-300 group-hover/card:tracking-[0.25em]">
                            Découvrir
                          </span>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="container py-4 flex flex-col gap-2">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-sm font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-border flex flex-col">
              <button
                type="button"
                className="flex items-center gap-2 text-sm font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="h-4 w-4" />
                Favoris
              </button>
              <Link
                to="/contact"
                className="text-sm font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/maison"
                className="text-sm font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Maison Wael Ben Yaghlane
              </Link>
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Search Bar */}
      {isMobileSearchOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-3">
          <InlineSearch onSelect={() => setIsMobileSearchOpen(false)} />
        </div>
      )}
    </header>
  );
}
