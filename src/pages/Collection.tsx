import { useParams } from 'react-router-dom';
import { useState, useMemo, useEffect, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useCollection } from '@/hooks/useCollections';
import { Loader2, ArrowUpDown, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { ShopifyProduct } from '@/lib/shopify/types';

type SortOption = 'default' | 'name-asc' | 'name-desc';
const PRODUCTS_PER_PAGE = 12;

export default function Collection() {
  const { handle } = useParams<{ handle: string }>();
  const { data: collection, isLoading, error } = useCollection(handle || '');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedVendor, sortBy]);
  // Extract unique vendors from products
  const vendors = useMemo(() => {
    if (!collection?.products) return [];
    const uniqueVendors = new Set<string>();
    collection.products.forEach((product: ShopifyProduct) => {
      if (product.node.vendor) {
        uniqueVendors.add(product.node.vendor);
      }
    });
    return Array.from(uniqueVendors).sort((a, b) => a.localeCompare(b, 'fr'));
  }, [collection?.products]);

  const filteredAndSortedProducts = useMemo(() => {
    if (!collection?.products) return [];
    
    // Filter by vendor
    let products = [...collection.products];
    if (selectedVendor !== 'all') {
      products = products.filter((p: ShopifyProduct) => p.node.vendor === selectedVendor);
    }
    
    // Sort
    switch (sortBy) {
      case 'name-asc':
        return products.sort((a: ShopifyProduct, b: ShopifyProduct) => 
          a.node.title.localeCompare(b.node.title, 'fr')
        );
      case 'name-desc':
        return products.sort((a: ShopifyProduct, b: ShopifyProduct) => 
          b.node.title.localeCompare(a.node.title, 'fr')
        );
      default:
        return products;
    }
  }, [collection?.products, sortBy, selectedVendor]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of grid
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('ellipsis');
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (currentPage < totalPages - 2) pages.push('ellipsis');
      pages.push(totalPages);
    }
    return pages;
  };

  if (!handle) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Collection non trouvée</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="pt-12 md:pt-16 pb-20 md:pb-28">
          <div className="container">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : error || !collection ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Collection non trouvée</p>
              </div>
            ) : (
              <>
                <div className="mb-10">
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3 block">
                    Collection
                  </span>
                  <h1 className="font-serif text-3xl md:text-4xl font-medium">
                    {collection.title}
                  </h1>
                  {collection.description && (
                    <p className="text-muted-foreground mt-2 max-w-2xl">
                      {collection.description}
                    </p>
                  )}
                </div>

                {/* Filters row */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b">
                  <p className="text-sm text-muted-foreground">
                    {filteredAndSortedProducts.length > 0 
                      ? `${startIndex + 1}-${Math.min(endIndex, filteredAndSortedProducts.length)} sur ${filteredAndSortedProducts.length} produit${filteredAndSortedProducts.length > 1 ? 's' : ''}`
                      : '0 produit'}
                    {selectedVendor !== 'all' && ` • ${selectedVendor}`}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Brand filter */}
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                        <SelectTrigger className="w-[180px] h-9 text-sm">
                          <SelectValue placeholder="Marque" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les marques</SelectItem>
                          {vendors.map((vendor) => (
                            <SelectItem key={vendor} value={vendor}>
                              {vendor}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sort */}
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                      <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                        <SelectTrigger className="w-[150px] h-9 text-sm">
                          <SelectValue placeholder="Trier par" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Par défaut</SelectItem>
                          <SelectItem value="name-asc">Nom A-Z</SelectItem>
                          <SelectItem value="name-desc">Nom Z-A</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div ref={gridRef}>
                  <ProductGrid products={paginatedProducts} />
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination>
                      <PaginationContent>
                        {/* Previous button */}
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                            className={`gap-1 pl-2.5 cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                            aria-disabled={currentPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">Précédent</span>
                          </PaginationLink>
                        </PaginationItem>

                        {/* Page numbers */}
                        {getPageNumbers().map((page, index) => (
                          <PaginationItem key={index}>
                            {page === 'ellipsis' ? (
                              <PaginationEllipsis />
                            ) : (
                              <PaginationLink
                                onClick={() => handlePageChange(page)}
                                isActive={currentPage === page}
                                className="cursor-pointer"
                              >
                                {page}
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        ))}

                        {/* Next button */}
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                            className={`gap-1 pr-2.5 cursor-pointer ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                            aria-disabled={currentPage === totalPages}
                          >
                            <span className="hidden sm:inline">Suivant</span>
                            <ChevronRight className="h-4 w-4" />
                          </PaginationLink>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
