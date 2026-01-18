import { Link } from 'react-router-dom';
import { ShopifyProduct } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { node } = product;
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  
  const firstVariant = node.variants.edges[0]?.node;
  const firstImage = node.images?.edges?.[0]?.node;
  const price = node.priceRange.minVariantPrice;

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
    
    toast.success('Added to bag', {
      description: node.title,
      position: 'top-center',
    });
  };

  return (
    <Link 
      to={`/product/${node.handle}`}
      className="group block"
    >
      <div className="relative aspect-[3/4] bg-secondary/30 overflow-hidden rounded-sm mb-4">
        {firstImage ? (
          <img
            src={firstImage.url}
            alt={firstImage.altText || node.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
        
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
                Quick Add
              </>
            )}
          </Button>
        </div>

        {/* Out of stock badge */}
        {firstVariant && !firstVariant.availableForSale && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-sm">
            Out of Stock
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
