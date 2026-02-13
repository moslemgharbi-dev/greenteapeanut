

## Sélecteur de Gouvernorats Tunisiens avec intégration Shopify

### Objectif
Creer un composant de selection des 24 gouvernorats de Tunisie, integre dans le panier (CartDrawer). La selection est obligatoire avant le checkout et sera envoyee a Shopify via la mutation `cartAttributesUpdate`.

### Composants a creer / modifier

#### 1. Nouveau composant : `src/components/cart/GouvernoratSelector.tsx`
- Grille de badges cliquables affichant les 24 gouvernorats
- Animations Framer Motion au clic (scale, couleur)
- Un seul gouvernorat selectionnable a la fois
- Etat visuel clair pour le badge selectionne (couleur primaire, bordure)
- Liste : Ariana, Beja, Ben Arous, Bizerte, Gabes, Gafsa, Jendouba, Kairouan, Kasserine, Kebili, Le Kef, Mahdia, La Manouba, Medenine, Monastir, Nabeul, Sfax, Sidi Bouzid, Siliana, Sousse, Tataouine, Tozeur, Tunis, Zaghouan

#### 2. Nouvelle fonction Shopify : `src/lib/shopify/cart.ts`
- Ajouter une mutation `cartAttributesUpdate` pour enregistrer l'attribut "Gouvernorat" sur le panier Shopify
- GraphQL :
  ```graphql
  mutation cartAttributesUpdate($cartId: ID!, $attributes: [AttributeInput!]!) {
    cartAttributesUpdate(cartId: $cartId, attributes: $attributes) {
      cart { id }
      userErrors { field message }
    }
  }
  ```
- Nouvelle fonction exportee `updateShopifyCartAttributes(cartId, attributes)`

#### 3. Mise a jour du store : `src/stores/cartStore.ts`
- Ajouter `selectedGouvernorat: string | null` au state
- Ajouter `setGouvernorat(gouvernorat: string)` qui :
  - Met a jour le state local
  - Appelle `updateShopifyCartAttributes` avec `{ key: "Gouvernorat", value: gouvernorat }`
- Persister `selectedGouvernorat` dans le localStorage
- Vider `selectedGouvernorat` lors du `clearCart()`

#### 4. Mise a jour du CartDrawer : `src/components/cart/CartDrawer.tsx`
- Integrer le `GouvernoratSelector` entre la liste des articles et le bouton de paiement
- Afficher un label "Gouvernorat de livraison" au-dessus du selecteur
- Desactiver le bouton "Proceder au paiement" si aucun gouvernorat n'est selectionne
- Afficher un message d'erreur si l'utilisateur tente de payer sans selection

### Details techniques

**Design du GouvernoratSelector :**
- Grille responsive : `grid-cols-3` sur mobile, `grid-cols-4` sur desktop
- Chaque badge utilise `motion.button` de Framer Motion
- Animation : `whileTap={{ scale: 0.95 }}`, transition de couleur avec `animate`
- Badge selectionne : fond primaire, texte blanc
- Badge non selectionne : fond secondary/30, texte foreground

**Validation checkout :**
- Le bouton checkout est `disabled` quand `!selectedGouvernorat`
- Un texte rouge "Veuillez selectionner un gouvernorat" apparait si tentative sans selection

**Flux complet :**
1. L'utilisateur ajoute des articles au panier
2. Il ouvre le CartDrawer
3. Il selectionne un gouvernorat dans la grille
4. La mutation `cartAttributesUpdate` envoie le choix a Shopify
5. Le bouton "Proceder au paiement" devient actif
6. Redirection vers le checkout Shopify

