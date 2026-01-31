import { useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useProducts } from '@/hooks/useProducts';
import { useMemo } from 'react';

export default function Brand() {
  const { name } = useParams<{ name: string }>();
  const { data: products, isLoading } = useProducts();

  const decodedName = name ? decodeURIComponent(name) : '';

  // Filter products by brand/vendor
  const brandProducts = useMemo(() => {
    if (!products || !decodedName) return [];
    return products.filter(
      (product) => product.node.vendor.toLowerCase() === decodedName.toLowerCase()
    );
  }, [products, decodedName]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="pt-12 md:pt-16 pb-20 md:pb-28">
          <div className="container">
            <div className="mb-10">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3 block">
                Marque
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-medium">
                {decodedName}
              </h1>
              <p className="text-muted-foreground mt-2">
                {brandProducts.length} parfum{brandProducts.length > 1 ? 's' : ''} disponible{brandProducts.length > 1 ? 's' : ''}
              </p>
            </div>

            <ProductGrid products={brandProducts} isLoading={isLoading} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
