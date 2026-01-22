import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchDialog } from '@/components/search/SearchDialog';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-xl md:text-2xl font-semibold tracking-tight">
            WAEL BEN YAGHLANE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/shop" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Tous les parfums
          </Link>
          <Link 
            to="/shop?category=women" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Pour elle
          </Link>
          <Link 
            to="/shop?category=men" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Pour lui
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Notre histoire
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
          <CartDrawer />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="container py-4 flex flex-col gap-4">
            <Link 
              to="/shop" 
              className="text-sm font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tous les parfums
            </Link>
            <Link 
              to="/shop?category=women" 
              className="text-sm font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pour elle
            </Link>
            <Link 
              to="/shop?category=men" 
              className="text-sm font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pour lui
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Notre histoire
            </Link>
          </div>
        </nav>
      )}

      {/* Search Dialog */}
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  );
}
