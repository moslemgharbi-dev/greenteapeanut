import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useProducts } from '@/hooks/useProducts';

export default function Shop() {
  const { data: products, isLoading } = useProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mb-10">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3 block">
                Collection
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-medium">
                All Fragrances
              </h1>
              <p className="text-muted-foreground mt-2">
                Explore our curated selection of luxury perfumes
              </p>
            </div>

            <ProductGrid products={products || []} isLoading={isLoading} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
