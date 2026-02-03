
## Problème constaté
Même en augmentant `mr-4 / ml-4`, l’éloignement entre les boutons **Précédent/Suivant** et les numéros reste insuffisant (ou irrégulier) car on met la marge sur le lien (`<a>`) alors que, dans une liste en flex, l’élément qui “gère” réellement l’espacement entre items est surtout le `<li>` (le `PaginationItem`, qui est le vrai flex-item).

## Objectif
Créer une séparation visuelle nette et stable entre :
- le bouton **Précédent** et le premier numéro
- le dernier numéro et le bouton **Suivant**
sans casser le responsive (éviter tout débordement horizontal sur mobile).

## Changements prévus

### 1) Déplacer l’espacement sur les `<PaginationItem>` (li), pas sur le `<PaginationLink>` (a)
Fichier : `src/pages/Collection.tsx`

- Sur le `PaginationItem` du bouton **Précédent** :
  - ajouter une marge droite responsive, par ex. `className="mr-3 sm:mr-6"` (ou plus si tu veux un gros espace sur desktop)
- Sur le `PaginationItem` du bouton **Suivant** :
  - ajouter une marge gauche responsive, par ex. `className="ml-3 sm:ml-6"`

- En parallèle, retirer `mr-* / ml-*` du `className` du `PaginationLink` (pour éviter doublon et garder une règle claire : “l’espace entre items se fait sur le li”).

Pourquoi : `PaginationContent` est un `ul` en `display:flex`, et ses enfants directs (`li`) sont les items qui s’espacent proprement via marges/gap. Mettre la marge sur l’enfant interne (`a`) peut donner un rendu moins fiable selon le calcul de largeur.

### 2) (Optionnel mais recommandé) Légèrement augmenter l’espace global entre les boutons de pages
Toujours dans `src/pages/Collection.tsx`, au niveau de :
```tsx
<PaginationContent>
```
ajouter une classe :
- `className="gap-1 sm:gap-2"`
Cela garde les numéros compacts sur mobile, mais un peu plus respirants sur desktop.

## Tests de validation (rapides)
1. Aller sur `/collection/homme` et `/collection/femme`.
2. Vérifier visuellement :
   - il y a un espace clair entre “Précédent” et la page 1
   - il y a un espace clair entre la dernière page et “Suivant”
3. Tester au moins 2-3 pages (clic sur un numéro, puis “Suivant/Précédent”).
4. Tester en largeur mobile (petit écran) pour confirmer :
   - pas de débordement horizontal
   - boutons toujours utilisables

## Résultat attendu
- Espacement nettement plus visible et constant (car appliqué aux vrais items flex : les `<li>`).
- Rendu plus propre sur desktop et mobile, sans effet “collé” entre texte et numéros.
