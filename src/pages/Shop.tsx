import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useProducts } from '@/hooks/useProducts';
import { cn } from '@/lib/utils';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function Shop() {
  const { data: products, isLoading } = useProducts();
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  // Extract unique brands from products
  const brands = useMemo(() => {
    if (!products) return [];
    
    const brandSet = new Set<string>();
    products.forEach((product) => {
      if (product.node.vendor) {
        brandSet.add(product.node.vendor);
      }
    });
    
    return Array.from(brandSet).sort((a, b) => 
      a.localeCompare(b, 'fr', { sensitivity: 'base' })
    );
  }, [products]);

  // Get available first letters from brands
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    brands.forEach((brand) => {
      const firstLetter = brand.charAt(0).toUpperCase();
      if (ALPHABET.includes(firstLetter)) {
        letters.add(firstLetter);
      }
    });
    return letters;
  }, [brands]);

  // Group brands by first letter
  const brandsByLetter = useMemo(() => {
    const grouped: Record<string, string[]> = {};
    brands.forEach((brand) => {
      const firstLetter = brand.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(brand);
    });
    return grouped;
  }, [brands]);

  // Filter brands based on active letter
  const filteredBrands = useMemo(() => {
    if (!activeLetter) return brands;
    return brandsByLetter[activeLetter] || [];
  }, [activeLetter, brands, brandsByLetter]);

  const handleLetterClick = (letter: string) => {
    if (!availableLetters.has(letter)) return;
    setActiveLetter(activeLetter === letter ? null : letter);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="pt-12 md:pt-16 pb-20 md:pb-28">
          <div className="container">
            {/* Hero section */}
            <div className="text-center mb-12 md:mb-16">
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-4">
                Maison de parfums
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Une sélection pointue de parfums exclusifs,
                <br className="hidden sm:block" />
                Une profusion de senteurs subtiles. Prenez le temps, sentez différemment...
              </p>
            </div>

            {/* Alphabetical navigation */}
            <div className="mb-12">
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-0.5 sm:gap-1 flex-wrap justify-center border-t border-b border-border py-3 px-2 sm:px-4">
                  {ALPHABET.map((letter) => {
                    const isAvailable = availableLetters.has(letter);
                    const isActive = activeLetter === letter;
                    
                    return (
                      <button
                        key={letter}
                        onClick={() => handleLetterClick(letter)}
                        disabled={!isAvailable}
                        className={cn(
                          "w-6 h-8 sm:w-8 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-medium transition-colors",
                          isAvailable 
                            ? "text-foreground hover:text-primary cursor-pointer" 
                            : "text-muted-foreground/40 cursor-default",
                          isActive && "text-primary underline underline-offset-4"
                        )}
                        aria-label={`Filtrer par la lettre ${letter}`}
                      >
                        {letter}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {activeLetter && (
                <div className="text-center mt-4">
                  <button 
                    onClick={() => setActiveLetter(null)}
                    className="text-sm text-muted-foreground hover:text-foreground underline"
                  >
                    Afficher toutes les marques
                  </button>
                </div>
              )}
            </div>

            {/* Brands grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-24 bg-muted animate-pulse rounded-lg"
                  />
                ))}
              </div>
            ) : filteredBrands.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">
                {activeLetter 
                  ? `Aucune marque commençant par "${activeLetter}"`
                  : 'Aucune marque trouvée'
                }
              </p>
            ) : (
              <>
                {activeLetter ? (
                  // When a letter is selected, show simple grid
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredBrands.map((brand) => (
                      <Link
                        key={brand}
                        to={`/marque/${encodeURIComponent(brand)}`}
                        className="group flex items-center justify-center h-24 px-4 border border-border rounded-lg bg-background hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                      >
                        <span className="text-sm font-medium text-center tracking-wide">
                          {brand}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  // Show all brands grouped by letter
                  <div className="space-y-10">
                    {ALPHABET.filter(letter => brandsByLetter[letter]?.length > 0).map((letter) => (
                      <div key={letter}>
                        <h2 className="font-serif text-2xl font-medium mb-4 border-b border-border pb-2">
                          {letter}
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                          {brandsByLetter[letter].map((brand) => (
                            <Link
                              key={brand}
                              to={`/marque/${encodeURIComponent(brand)}`}
                              className="group flex items-center justify-center h-24 px-4 border border-border rounded-lg bg-background hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                            >
                              <span className="text-sm font-medium text-center tracking-wide">
                                {brand}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            <div className="mt-12 text-center text-sm text-muted-foreground">
              {filteredBrands.length} marque{filteredBrands.length > 1 ? 's' : ''} 
              {activeLetter ? ` commençant par "${activeLetter}"` : ' disponibles'}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
