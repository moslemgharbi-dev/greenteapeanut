

# Correction du problème visuel de pagination

## Problème identifié

Les numéros de page sont collés aux boutons "Précédent" et "Suivant" car :
1. L'espacement (`gap-1`) dans `PaginationContent` est insuffisant
2. Les boutons Précédent/Suivant personnalisés n'ont pas assez de marge

## Solution

Ajouter des marges aux boutons Précédent et Suivant dans `Collection.tsx` pour créer une séparation visuelle claire.

## Modification à effectuer

**Fichier : `src/pages/Collection.tsx`**

| Élément | Avant | Après |
|---------|-------|-------|
| Bouton Précédent | `className="gap-1 pl-2.5 cursor-pointer..."` | `className="gap-1 pl-2.5 mr-2 cursor-pointer..."` |
| Bouton Suivant | `className="gap-1 pr-2.5 cursor-pointer..."` | `className="gap-1 pr-2.5 ml-2 cursor-pointer..."` |

## Résultat attendu

```text
Avant:  < Précéden1  2  ...  12Suivant >
Après:  < Précédent   1  2  ...  12   Suivant >
```

Les numéros de page seront correctement séparés des boutons de navigation.

