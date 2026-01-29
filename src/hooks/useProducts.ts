import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts, fetchProductByHandle } from '@/lib/shopify/products';
import { ShopifyProduct } from '@/lib/shopify/types';

export function useProducts(query?: string) {
  return useQuery({
    queryKey: ['products', query],
    queryFn: () => fetchAllProducts(query),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useProduct(handle: string) {
  return useQuery({
    queryKey: ['product', handle],
    queryFn: () => fetchProductByHandle(handle),
    enabled: !!handle,
    staleTime: 1000 * 60 * 5,
  });
}

export type { ShopifyProduct };
