import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { fetchProducts } from '@/lib/shopify/products';
import { ShopifyProduct } from '@/lib/shopify/types';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const result = await fetchProducts(10, `title:*${query}*`);
        setResults(result.products);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (handle: string) => {
    navigate(`/product/${handle}`);
    onOpenChange(false);
    setQuery('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
            <DialogTitle className="font-serif">Rechercher</DialogTitle>
        </DialogHeader>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom ou marque..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>

        <div className="mt-4 max-h-[300px] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              {results.map((product) => (
                <button
                  key={product.node.id}
                  onClick={() => handleSelect(product.node.handle)}
                  className="w-full flex items-center gap-4 p-3 rounded-sm hover:bg-secondary transition-colors text-left"
                >
                  {product.node.images?.edges?.[0]?.node && (
                    <img
                      src={product.node.images.edges[0].node.url}
                      alt={product.node.title}
                      className="w-12 h-12 object-cover rounded-sm"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.node.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.node.priceRange.maxVariantPrice.currencyCode}{' '}
                      {parseFloat(product.node.priceRange.maxVariantPrice.amount).toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : query.trim() ? (
            <p className="text-center text-muted-foreground py-8">Aucun parfum trouvé</p>
          ) : (
            <p className="text-center text-muted-foreground py-8">Commencez à écrire pour rechercher</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
