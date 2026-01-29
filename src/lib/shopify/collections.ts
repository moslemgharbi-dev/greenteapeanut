import { storefrontApiRequest } from "./api";
import { ShopifyCollection, ShopifyProduct } from "./types";

// GraphQL Queries for Collections
const COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

const COLLECTION_BY_HANDLE_QUERY = `
  query GetCollectionByHandle($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
        altText
      }
      products(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            description
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            options {
              name
              values
            }
          }
        }
      }
    }
  }
`;

export async function fetchCollections(first: number = 50): Promise<ShopifyCollection[]> {
  const data = await storefrontApiRequest(COLLECTIONS_QUERY, { first });
  return data?.data?.collections?.edges || [];
}

export interface CollectionWithProducts {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: { url: string; altText: string | null } | null;
  products: ShopifyProduct[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}

export async function fetchCollectionByHandle(handle: string, first: number = 50, after?: string): Promise<CollectionWithProducts | null> {
  const data = await storefrontApiRequest(COLLECTION_BY_HANDLE_QUERY, { handle, first, after });
  const collection = data?.data?.collection;
  
  if (!collection) return null;

  return {
    id: collection.id,
    title: collection.title,
    handle: collection.handle,
    description: collection.description,
    image: collection.image,
    products: collection.products.edges || [],
    pageInfo: collection.products.pageInfo || { hasNextPage: false, endCursor: null }
  };
}

export async function fetchAllCollectionProducts(handle: string): Promise<CollectionWithProducts | null> {
  let allProducts: ShopifyProduct[] = [];
  let hasNextPage = true;
  let cursor: string | undefined = undefined;
  let collectionInfo: Omit<CollectionWithProducts, 'products' | 'pageInfo'> | null = null;

  while (hasNextPage) {
    const result = await fetchCollectionByHandle(handle, 250, cursor);
    if (!result) return null;
    
    if (!collectionInfo) {
      collectionInfo = {
        id: result.id,
        title: result.title,
        handle: result.handle,
        description: result.description,
        image: result.image
      };
    }
    
    allProducts.push(...result.products);
    hasNextPage = result.pageInfo.hasNextPage;
    cursor = result.pageInfo.endCursor || undefined;
  }

  if (!collectionInfo) return null;

  return {
    ...collectionInfo,
    products: allProducts,
    pageInfo: { hasNextPage: false, endCursor: null }
  };
}
