
# Pagination des collections - 12 produits par page

## Objectif
Afficher les produits des collections "Pour Lui" et "Pour Elle" avec une pagination de 12 produits par page.

## Modifications à effectuer

### 1. Page Collection (`src/pages/Collection.tsx`)

Ajouter la logique de pagination :

- **Nouveau state** : `currentPage` initialisé à 1
- **Constante** : `PRODUCTS_PER_PAGE = 12`
- **Calcul des produits paginés** : extraire uniquement les 12 produits de la page courante
- **Réinitialisation** : remettre la page à 1 quand les filtres changent (vendor, tri)
- **Affichage du compteur** : montrer "X-Y sur Z produits"

### 2. Composant de pagination

Utiliser le composant `Pagination` existant avec :
- Boutons "Précédent" / "Suivant" traduits en français
- Numéros de page cliquables
- Ellipsis (...) pour les longues listes de pages
- Style cohérent avec le reste du site

### 3. Comportement utilisateur

- Scroll automatique vers le haut de la grille lors du changement de page
- La pagination n'apparaît que s'il y a plus de 12 produits
- Navigation fluide entre les pages

---

## Détails techniques

```text
┌─────────────────────────────────────────┐
│  Collection: Pour Lui                   │
│  Affichage 1-12 sur 156 produits        │
├─────────────────────────────────────────┤
│  [Filtre Marque ▼]  [Tri ▼]             │
├─────────────────────────────────────────┤
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐            │
│  │ P1 │ │ P2 │ │ P3 │ │ P4 │            │
│  └────┘ └────┘ └────┘ └────┘            │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐            │
│  │ P5 │ │ P6 │ │ P7 │ │ P8 │            │
│  └────┘ └────┘ └────┘ └────┘            │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐            │
│  │ P9 │ │P10 │ │P11 │ │P12 │            │
│  └────┘ └────┘ └────┘ └────┘            │
├─────────────────────────────────────────┤
│  ◄ Précédent  1 2 3 ... 13  Suivant ►   │
└─────────────────────────────────────────┘
```

### Fichiers modifiés

| Fichier | Modification |
|---------|--------------|
| `src/pages/Collection.tsx` | Ajout state pagination + logique de découpage + composant pagination |

### Code pagination (aperçu)

```typescript
const PRODUCTS_PER_PAGE = 12;
const [currentPage, setCurrentPage] = useState(1);

// Reset page when filters change
useEffect(() => {
  setCurrentPage(1);
}, [selectedVendor, sortBy]);

// Calculate paginated products
const paginatedProducts = useMemo(() => {
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  return filteredAndSortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
}, [filteredAndSortedProducts, currentPage]);

const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);
```

## Résultat attendu

- Les pages "Pour Lui" et "Pour Elle" afficheront exactement 12 produits par page
- Navigation intuitive avec boutons précédent/suivant
- Le compteur indique la position actuelle (ex: "13-24 sur 156 produits")
- Les filtres et le tri fonctionnent correctement avec la pagination
