import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/products/ProductCard';
import { Loader2 } from 'lucide-react';

export function FeaturedProducts() {
  const { data: products, isLoading } = useProducts();

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3 block">
              Notre collection
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium">
              Parfums en vedette
            </h2>
          </div>
          <Link 
            to="/shop" 
            className="hidden sm:flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
          >
            Voir tout
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-secondary/30 rounded-lg">
            <p className="text-muted-foreground mb-2">Aucun produit dans votre boutique pour le moment</p>
            <p className="text-sm text-muted-foreground">
              Dites-moi quels parfums vous souhaitez ajouter, et je les créerai pour vous.
            </p>
          </div>
        )}

        <div className="sm:hidden mt-8 text-center">
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
          >
            Voir tous les produits
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
