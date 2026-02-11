import { useMemo } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/products/ProductCard';
import { ShopifyProduct } from '@/lib/shopify/types';

interface SimilarProductsProps {
  currentHandle: string;
  vendor: string;
}

export function SimilarProducts({ currentHandle, vendor }: SimilarProductsProps) {
  const { data: products } = useProducts();

  const similarProducts = useMemo(() => {
    if (!products) return [];
    
    return products
      .filter((p: ShopifyProduct) => p.node.vendor !== vendor && p.node.handle !== currentHandle)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  }, [products, vendor, currentHandle]);

  if (similarProducts.length === 0) return null;

  return (
    <section className="py-16 md:py-20 border-t border-border">
      <div className="container">
        <div className="mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3 block">
            Vous aimerez aussi
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-medium">
            Parfums similaires
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {similarProducts.map((product: ShopifyProduct) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
