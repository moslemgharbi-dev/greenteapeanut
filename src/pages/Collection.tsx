import { useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useCollection } from '@/hooks/useCollections';
import { Loader2, ArrowUpDown, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShopifyProduct } from '@/lib/shopify/types';

type SortOption = 'default' | 'name-asc' | 'name-desc';

export default function Collection() {
  const { handle } = useParams<{ handle: string }>();
  const { data: collection, isLoading, error } = useCollection(handle || '');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [selectedVendor, setSelectedVendor] = useState<string>('all');

  // Extract unique vendors from products
  const vendors = useMemo(() => {
    if (!collection?.products) return [];
    const uniqueVendors = new Set<string>();
    collection.products.forEach((product: ShopifyProduct) => {
      if (product.node.vendor) {
        uniqueVendors.add(product.node.vendor);
      }
    });
    return Array.from(uniqueVendors).sort((a, b) => a.localeCompare(b, 'fr'));
  }, [collection?.products]);

  const filteredAndSortedProducts = useMemo(() => {
    if (!collection?.products) return [];
    
    // Filter by vendor
    let products = [...collection.products];
    if (selectedVendor !== 'all') {
      products = products.filter((p: ShopifyProduct) => p.node.vendor === selectedVendor);
    }
    
    // Sort
    switch (sortBy) {
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
  }, [collection?.products, sortBy, selectedVendor]);

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
                    {filteredAndSortedProducts.length} produit{filteredAndSortedProducts.length > 1 ? 's' : ''} 
                    {selectedVendor !== 'all' && ` • ${selectedVendor}`}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Brand filter */}
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                        <SelectTrigger className="w-[180px] h-9 text-sm">
                          <SelectValue placeholder="Marque" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les marques</SelectItem>
                          {vendors.map((vendor) => (
                            <SelectItem key={vendor} value={vendor}>
                              {vendor}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sort */}
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                      <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                        <SelectTrigger className="w-[150px] h-9 text-sm">
                          <SelectValue placeholder="Trier par" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Par défaut</SelectItem>
                          <SelectItem value="name-asc">Nom A-Z</SelectItem>
                          <SelectItem value="name-desc">Nom Z-A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <ProductGrid products={filteredAndSortedProducts} />
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
