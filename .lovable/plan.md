

## Rendre le bouton "Procéder au paiement" plus visible

Le bouton est actuellement tout en bas du panier, après la liste des articles et le sélecteur de gouvernorat. L'objectif est de remonter la section de paiement (sous-total + bouton) pour qu'elle soit plus visible sans avoir à scroller.

### Changements prevus

**Fichier : `src/components/cart/CartDrawer.tsx`**

- Deplacer le selecteur de gouvernorat hors de la zone scrollable et le placer dans la section fixe du bas, juste avant le sous-total et le bouton de paiement
- Cela permet au bouton "Proceder au paiement" d'etre toujours visible en bas de l'ecran sans etre cache par le scroll
- La zone scrollable ne contiendra plus que les articles du panier

### Resultat

La section du bas (fixe, non scrollable) contiendra dans l'ordre :
1. Selecteur de gouvernorat
2. Sous-total
3. Bouton "Proceder au paiement"

Les articles du panier resteront dans la zone scrollable au-dessus.

