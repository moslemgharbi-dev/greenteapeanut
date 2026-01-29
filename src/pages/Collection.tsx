import { useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useCollection } from '@/hooks/useCollections';
import { Loader2 } from 'lucide-react';

export default function Collection() {
  const { handle } = useParams<{ handle: string }>();
  const { data: collection, isLoading, error } = useCollection(handle || '');

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
                  <p className="text-sm text-muted-foreground mt-4">
                    {collection.products.length} produit{collection.products.length > 1 ? 's' : ''}
                  </p>
                </div>

                <ProductGrid products={collection.products} />
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
