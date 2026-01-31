import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useProducts } from '@/hooks/useProducts';

export default function Shop() {
  const { data: products, isLoading } = useProducts();

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="mb-10">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3 block">
                Nos partenaires
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-medium">
                Marques
              </h1>
              <p className="text-muted-foreground mt-2">
                Découvrez toutes les maisons de parfumerie que nous représentons
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-24 bg-muted animate-pulse rounded-lg"
                  />
                ))}
              </div>
            ) : brands.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">
                Aucune marque trouvée
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {brands.map((brand) => (
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
            )}

            <div className="mt-8 text-center text-sm text-muted-foreground">
              {brands.length} marques disponibles
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
