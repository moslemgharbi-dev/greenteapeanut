import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useProduct } from '@/hooks/useProducts';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { Loader2, Minus, Plus, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { ShareButtons } from '@/components/products/ShareButtons';
import { SimilarProducts } from '@/components/products/SimilarProducts';
import { CustomerReviews } from '@/components/products/CustomerReviews';

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useProduct(handle || '');
  const addItem = useCartStore(state => state.addItem);
  const cartLoading = useCartStore(state => state.isLoading);
  
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-serif mb-4">Produit introuvable</h1>
            <Button asChild variant="outline">
              <Link to="/shop">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à la boutique
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const variants = product.variants.edges;
  const selectedVariant = variants.find(v => v.node.id === selectedVariantId)?.node || variants[0]?.node;
  const images = product.images?.edges || [];
  const hasMultipleVariants = variants.length > 1 && variants[0]?.node.title !== 'Default Title';

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    });
    
    toast.success('Ajouté au panier', {
      description: `${product.title}${selectedVariant.title !== 'Default Title' ? ` - ${selectedVariant.title}` : ''}`,
      position: 'top-center',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container pt-8 md:pt-12 pb-20 md:pb-28">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
              <span>/</span>
              {(() => {
                const collections = (product as any).collections?.edges || [];
                const hommeCollection = collections.find((c: any) => c.node.handle === 'homme');
                const femmeCollection = collections.find((c: any) => c.node.handle === 'femme');
                const collectionHandle = hommeCollection ? 'homme' : femmeCollection ? 'femme' : null;
                const collectionLabel = hommeCollection ? 'Pour Lui' : femmeCollection ? 'Pour Elle' : 'Collection';
                return (
                  <Link 
                    to={collectionHandle ? `/collection/${collectionHandle}` : '/shop'} 
                    className="hover:text-foreground transition-colors"
                  >
                    {collectionLabel}
                  </Link>
                );
              })()}
              <span>/</span>
              <Link to={`/marque/${encodeURIComponent(product.vendor || '')}`} className="text-foreground hover:text-foreground/80 transition-colors">{product.vendor || 'Marque'}</Link>
            </div>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 overflow-hidden">
            {/* Images */}
            <div className="space-y-4 min-w-0">
              <div className="aspect-[3/4] bg-secondary/30 rounded-sm overflow-hidden">
                {images[selectedImage]?.node ? (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Aucune image
                  </div>
                )}
              </div>
              
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-sm overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-accent' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image.node.url}
                        alt={image.node.altText || `${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium">
                    {product.title}
                  </h1>
                  {/* Desktop: dropdown menu */}
                  <div className="hidden sm:block">
                    <ShareButtons 
                      productHandle={product.handle}
                      productTitle={product.title}
                      productImage={images[0]?.node?.url}
                      variant="icon"
                    />
                  </div>
                </div>
                <p className="text-xl sm:text-2xl font-semibold">
                  {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
                </p>
              </div>

              {/* Variants */}
              {hasMultipleVariants && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">Choisir une option</label>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((variant) => (
                      <button
                        key={variant.node.id}
                        onClick={() => setSelectedVariantId(variant.node.id)}
                        disabled={!variant.node.availableForSale}
                        className={`px-4 py-2 text-sm border rounded-sm transition-colors ${
                          (selectedVariantId || variants[0]?.node.id) === variant.node.id
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border hover:border-foreground'
                        } ${!variant.node.availableForSale ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {variant.node.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Quantité</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Buy Now & Add to Cart */}
              <div className="flex flex-col gap-2 sm:gap-3">
                <Button
                  onClick={async () => {
                    if (!selectedVariant) return;
                    await addItem({
                      product: { node: product },
                      variantId: selectedVariant.id,
                      variantTitle: selectedVariant.title,
                      price: selectedVariant.price,
                      quantity,
                      selectedOptions: selectedVariant.selectedOptions || []
                    });
                    const checkoutUrl = useCartStore.getState().getCheckoutUrl();
                    if (checkoutUrl) {
                      window.open(checkoutUrl, '_blank');
                    }
                  }}
                  disabled={cartLoading || !selectedVariant?.availableForSale}
                  className="w-full h-10 sm:h-11 text-sm sm:text-base"
                >
                  {cartLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Acheter maintenant'
                  )}
                </Button>
                
                <Button
                  onClick={handleAddToCart}
                  disabled={cartLoading || !selectedVariant?.availableForSale}
                  variant="outline"
                  className="w-full h-10 sm:h-11 text-sm sm:text-base"
                >
                  {cartLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : !selectedVariant?.availableForSale ? (
                    'Rupture de stock'
                  ) : (
                    'Ajouter au panier'
                  )}
                </Button>
              </div>

              {/* Mobile: inline share buttons */}
              <div className="sm:hidden">
                <ShareButtons 
                  productHandle={product.handle}
                  productTitle={product.title}
                  productImage={images[0]?.node?.url}
                  variant="inline"
                />
              </div>

              {/* Description */}
              {product.description && (
                <div className="pt-6 border-t border-border">
                  <h3 className="text-sm font-medium mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Customer Reviews */}
          <CustomerReviews />
        </div>
      </main>
      <SimilarProducts currentHandle={product.handle} vendor={product.vendor} />
      <Footer />
    </div>
  );
}
