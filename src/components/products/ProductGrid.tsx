import { ShopifyProduct } from '@/lib/shopify';
import { ProductCard } from './ProductCard';
import { Loader2 } from 'lucide-react';

interface ProductGridProps {
  products: ShopifyProduct[];
  isLoading?: boolean;
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Aucun produit trouvé</p>
        <p className="text-sm text-muted-foreground mt-1">
          Dites-moi quels produits vous souhaitez ajouter à votre boutique.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {products.map((product) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </div>
  );
}
