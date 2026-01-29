import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2, X } from 'lucide-react';
import { fetchProducts } from '@/lib/shopify/products';
import { ShopifyProduct } from '@/lib/shopify/types';
interface InlineSearchProps {
  onSelect?: () => void;
}

export function InlineSearch({ onSelect }: InlineSearchProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (handle: string) => {
    navigate(`/product/${handle}`);
    setQuery('');
    setIsFocused(false);
    onSelect?.();
  };

  const showDropdown = isFocused && (query.trim() || isLoading);

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Rechercher une marque, un produit…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 pr-8 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 max-h-[350px] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((product) => (
                <button
                  key={product.node.id}
                  onClick={() => handleSelect(product.node.handle)}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-secondary transition-colors text-left"
                >
                  {product.node.images?.edges?.[0]?.node && (
                    <img
                      src={product.node.images.edges[0].node.url}
                      alt={product.node.title}
                      className="w-10 h-10 object-cover rounded-sm"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.node.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                      {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : query.trim() ? (
            <p className="text-center text-muted-foreground py-6 text-sm">Aucun parfum trouvé</p>
          ) : null}
        </div>
      )}
    </div>
  );
}
