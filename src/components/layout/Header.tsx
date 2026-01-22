import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchDialog } from '@/components/search/SearchDialog';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { label: 'Marques', to: '/shop' },
      { label: 'Parfums', to: '/shop' },
      { label: 'Nos collaborations exclusives', to: '/about' },
      { label: 'Nos best-sellers', to: '/shop' },
      { label: 'Offres exclusives', to: '/shop' },
      { label: 'Consultation parfumée', to: '/about' },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
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
      <div className="container grid h-20 grid-cols-[auto,1fr,auto] items-center gap-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Search (desktop) */}
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="hidden md:flex w-full max-w-md items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Rechercher"
        >
          <Search className="h-4 w-4" />
          <span className="truncate">Rechercher une marque, un produit…</span>
        </button>

        {/* Brand (center) */}
        <Link to="/" className="justify-self-center text-center">
          <span className="font-serif text-xl md:text-3xl font-semibold tracking-tight">
            WAEL BEN YAGHLANE
          </span>
          <span className="sr-only">Accueil</span>
        </Link>

        {/* Actions (right) */}
        <div className="justify-self-end flex items-center gap-1 md:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Rechercher"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Favoris"
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
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="container py-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground"
            >
              <Search className="h-4 w-4" />
              <span className="truncate">Rechercher une marque, un produit…</span>
            </button>

            <div className="pt-2 flex flex-col">
              <Link
                to="/shop"
                className="text-sm font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Marques
              </Link>
              <Link
                to="/shop"
                className="text-sm font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Parfums
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Nos collaborations exclusives
              </Link>
              <Link
                to="/shop"
                className="text-sm font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Nos best-sellers
              </Link>
              <Link
                to="/shop"
                className="text-sm font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Offres exclusives
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Consultation parfumée
              </Link>
            </div>

            <div className="pt-2 border-t border-border flex flex-col">
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

      {/* Search Dialog */}
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  );
}
