import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { GouvernoratSelector } from "./GouvernoratSelector";

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGovError, setShowGovError] = useState(false);
  const { items, isLoading, isSyncing, selectedGouvernorat, setGouvernorat, updateQuantity, removeItem, getCheckoutUrl, syncCart, getTotalItems, getTotalPrice } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  useEffect(() => { 
    if (isOpen) syncCart(); 
  }, [isOpen, syncCart]);

  const handleCheckout = () => {
    if (!selectedGouvernorat) {
      setShowGovError(true);
      return;
    }
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  const handleSelectGouvernorat = (gov: string) => {
    setShowGovError(false);
    setGouvernorat(gov);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[88%] max-w-[360px] sm:max-w-md flex flex-col h-[92vh] mt-[4vh] rounded-l-2xl sm:h-full sm:mt-0 sm:rounded-none sm:w-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-serif text-xl">Panier</SheetTitle>
          <SheetDescription>
            {totalItems === 0
              ? "Votre panier est vide"
              : `${totalItems} article${totalItems !== 1 ? 's' : ''} dans votre panier`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Votre panier est vide</p>
                <p className="text-sm text-muted-foreground mt-1">Ajoutez des fragrances pour commencer</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-3 bg-secondary/30 rounded-sm">
                      <div className="w-20 h-20 bg-muted rounded-sm overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img 
                            src={item.product.node.images.edges[0].node.url} 
                            alt={item.product.node.title} 
                            className="w-full h-full object-cover" 
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.product.node.title}</h4>
                        {item.variantTitle !== 'Default Title' && (
                          <p className="text-xs text-muted-foreground mt-0.5">{item.variantTitle}</p>
                        )}
                        <p className="font-semibold text-sm mt-2">
                          {item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-muted-foreground hover:text-destructive" 
                          onClick={() => removeItem(item.variantId)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-7 w-7" 
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-7 w-7" 
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gouvernorat Selector */}
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-sm font-medium mb-3">Gouvernorat de livraison</p>
                  <GouvernoratSelector
                    selected={selectedGouvernorat}
                    onSelect={handleSelectGouvernorat}
                    disabled={isLoading}
                  />
                  {showGovError && !selectedGouvernorat && (
                    <p className="text-xs text-destructive mt-2">Veuillez sélectionner un gouvernorat</p>
                  )}
                </div>
              </div>
              
              <div className="flex-shrink-0 space-y-4 pt-6 border-t border-border mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Sous-total</span>
                  <span className="text-lg font-semibold">
                    {items[0]?.price.currencyCode || 'USD'} {totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Livraison calculée lors du paiement</p>
                <Button 
                  onClick={handleCheckout} 
                  className="w-full" 
                  size="lg" 
                  disabled={items.length === 0 || isLoading || isSyncing || !selectedGouvernorat}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Procéder au paiement
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
