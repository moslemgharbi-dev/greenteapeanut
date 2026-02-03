import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type ShopifyProduct } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface RecommendedProductProps {
  product: ShopifyProduct;
  index?: number;
}

export function RecommendedProduct({ product, index = 0 }: RecommendedProductProps) {
  const { node } = product;
  const addItem = useCartStore((s) => s.addItem);

  const imageUrl = node.images.edges[0]?.node.url;
  const priceData = node.priceRange.minVariantPrice;
  const price = parseFloat(priceData.amount);
  const currency = priceData.currencyCode;
  const firstVariant = node.variants.edges[0]?.node;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (firstVariant?.id) {
      addItem({
        product,
        variantId: firstVariant.id,
        variantTitle: firstVariant.title,
        price: { amount: priceData.amount, currencyCode: currency },
        quantity: 1,
        selectedOptions: firstVariant.selectedOptions || [],
      });
      toast.success("Ajouté au panier", {
        description: node.title,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
    >
      <Link
        to={`/product/${node.handle}`}
        className="group flex gap-3 rounded-xl border border-border bg-card p-2.5 transition-all hover:border-primary/30 hover:shadow-md"
      >
        {imageUrl && (
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
            <img
              src={imageUrl}
              alt={node.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div>
            <p className="text-xs text-muted-foreground">{node.vendor}</p>
            <h4 className="line-clamp-1 text-sm font-medium text-foreground">
              {node.title}
            </h4>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-primary">
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency,
              }).format(price)}
            </span>
            <Button
              size="sm"
              variant="secondary"
              className="h-7 px-2 text-xs"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="mr-1 h-3 w-3" />
              Ajouter
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
