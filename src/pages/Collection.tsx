import { useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useCollection } from '@/hooks/useCollections';
import { Loader2, ArrowUpDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShopifyProduct } from '@/lib/shopify/types';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export default function Collection() {
  const { handle } = useParams<{ handle: string }>();
  const { data: collection, isLoading, error } = useCollection(handle || '');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const sortedProducts = useMemo(() => {
    if (!collection?.products) return [];
    
    const products = [...collection.products];
    
    switch (sortBy) {
      case 'price-asc':
        return products.sort((a: ShopifyProduct, b: ShopifyProduct) => {
          const priceA = parseFloat(a.node.priceRange.minVariantPrice.amount);
          const priceB = parseFloat(b.node.priceRange.minVariantPrice.amount);
          return priceA - priceB;
        });
      case 'price-desc':
        return products.sort((a: ShopifyProduct, b: ShopifyProduct) => {
          const priceA = parseFloat(a.node.priceRange.minVariantPrice.amount);
          const priceB = parseFloat(b.node.priceRange.minVariantPrice.amount);
          return priceB - priceA;
        });
      case 'name-asc':
        return products.sort((a: ShopifyProduct, b: ShopifyProduct) => 
          a.node.title.localeCompare(b.node.title, 'fr')
        );
      case 'name-desc':
        return products.sort((a: ShopifyProduct, b: ShopifyProduct) => 
          b.node.title.localeCompare(a.node.title, 'fr')
        );
      default:
        return products;
    }
  }, [collection?.products, sortBy]);

  if (!handle) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Collection non trouvée</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : error || !collection ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Collection non trouvée</p>
              </div>
            ) : (
              <>
                <div className="mb-10">
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3 block">
                    Collection
                  </span>
                  <h1 className="font-serif text-3xl md:text-4xl font-medium">
                    {collection.title}
                  </h1>
                  {collection.description && (
                    <p className="text-muted-foreground mt-2 max-w-2xl">
                      {collection.description}
                    </p>
                  )}
                </div>

                {/* Filters row */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b">
                  <p className="text-sm text-muted-foreground">
                    {collection.products.length} produit{collection.products.length > 1 ? 's' : ''}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                    <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                      <SelectTrigger className="w-[180px] h-9 text-sm">
                        <SelectValue placeholder="Trier par" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Par défaut</SelectItem>
                        <SelectItem value="name-asc">Nom A-Z</SelectItem>
                        <SelectItem value="name-desc">Nom Z-A</SelectItem>
                        <SelectItem value="price-asc">Prix croissant</SelectItem>
                        <SelectItem value="price-desc">Prix décroissant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <ProductGrid products={sortedProducts} />
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
