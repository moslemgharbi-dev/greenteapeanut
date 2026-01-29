import { useQuery } from '@tanstack/react-query';
import { fetchCollections, fetchAllCollectionProducts, CollectionWithProducts } from '@/lib/shopify/collections';
import { ShopifyCollection } from '@/lib/shopify/types';

export function useCollections() {
  return useQuery({
    queryKey: ['collections'],
    queryFn: () => fetchCollections(50),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useCollection(handle: string) {
  return useQuery({
    queryKey: ['collection', handle],
    queryFn: () => fetchAllCollectionProducts(handle),
    enabled: !!handle,
    staleTime: 1000 * 60 * 5,
  });
}

export type { ShopifyCollection, CollectionWithProducts };
