import { Link, useNavigate } from 'react-router-dom';
import { ShopifyProduct } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { Loader2, Plus, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { ShareButtons } from './ShareButtons';

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { node } = product;
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);
  const isFavorite = useFavoritesStore(state => state.isFavorite)(node.id);
  const isAuthenticated = useFavoritesStore(state => state.isAuthenticated);
  const navigate = useNavigate();
  
  const firstVariant = node.variants.edges[0]?.node;
  const firstImage = node.images?.edges?.[0]?.node;
  const secondImage = node.images?.edges?.[1]?.node;
  const price = node.priceRange.maxVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;
    
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    });
    
    toast.success('Ajouté au panier', {
      description: node.title,
      position: 'top-center',
      duration: 2000,
    });
  };

  return (
    <Link 
      to={`/product/${node.handle}`}
      className="group block"
    >
      <div className="relative aspect-[3/4] bg-secondary/30 overflow-hidden rounded-sm mb-4">
        {firstImage ? (
          <div className="relative w-full h-full">
            <img
              src={firstImage.url}
              alt={firstImage.altText || node.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
        
        {/* Favorite & Share Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isAuthenticated) {
                toast.info('Connectez-vous pour ajouter des favoris', {
                  position: 'top-center',
                  duration: 2000,
                  action: { label: 'Se connecter', onClick: () => navigate('/auth') },
                });
                return;
              }
              toggleFavorite(node.id);
            }}
            className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Heart 
              className={`h-4 w-4 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-foreground'}`} 
            />
          </button>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ShareButtons 
              productHandle={node.handle}
              productTitle={node.title}
              productImage={firstImage?.url}
            />
          </div>
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button 
            onClick={handleAddToCart}
            disabled={isLoading || !firstVariant?.availableForSale}
            className="w-full"
            size="sm"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                Ajouter au panier
              </>
            )}
          </Button>
        </div>

        {/* Out of stock badge */}
        {firstVariant && !firstVariant.availableForSale && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-sm">
            Rupture de stock
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-medium text-sm group-hover:text-accent transition-colors line-clamp-2">
          {node.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
