

## Objectif

Deux corrections sur le filtre par marque des pages "Pour Lui" et "Pour Elle" :

1. **Permettre le scroll de la page meme quand la liste du filtre est ouverte** -- actuellement Radix UI bloque le scroll du body quand le Select est ouvert.
2. **Ajouter un petit scrollbar visible dans la liste des marques** -- pour que l'utilisateur voie qu'il peut faire defiler la liste.

---

## Approche technique

Le probleme principal vient du composant Radix `Select` qui, via son `Portal`, ajoute un overlay invisible qui bloque les interactions avec la page. La solution est de **remplacer le Radix Select par un dropdown custom** uniquement pour le filtre marque sur les pages collection, ou bien de modifier le composant Select global.

### Solution retenue : modifier le `SelectContent` global

On va modifier `src/components/ui/select.tsx` pour :

1. **Supprimer le blocage du scroll** :
   - Ajouter `modal={false}` sur `SelectPrimitive.Content` pour desactiver le comportement modal de Radix (qui bloque le scroll de la page).
   - Retirer le `Portal` pour eviter l'overlay bloquant, ou le garder avec `modal={false}`.

2. **Ajouter un scrollbar visible dans la liste** :
   - Utiliser le composant `ScrollArea` de Radix (deja installe dans le projet) a l'interieur du `SelectPrimitive.Viewport`, ou simplement ajouter des styles CSS pour rendre le scrollbar visible avec une hauteur max limitee.
   - Ajouter `max-h-60 overflow-y-auto` sur le Viewport avec des styles de scrollbar fins via Tailwind (`scrollbar-thin` ou des styles CSS custom).

### Fichiers modifies

| Fichier | Modification |
|---------|-------------|
| `src/components/ui/select.tsx` | Ajouter `modal={false}` au `SelectPrimitive.Content` pour permettre le scroll de la page. Ajouter des styles de scrollbar visible sur le Viewport. |
| `src/index.css` | Ajouter des styles CSS pour un scrollbar fin et elegant dans les dropdowns select (`::-webkit-scrollbar` etc.). |

### Details des changements

**select.tsx** :
- `SelectPrimitive.Content` recevra la prop `modal={false}` -- cela empeche Radix de bloquer le focus et le scroll en arriere-plan.
- Le `Viewport` gardera `max-h-60` (ou similaire) et recevra `overflow-y-auto` avec une classe custom pour le scrollbar.

**index.css** :
- Ajout d'une classe `.select-scrollbar` avec des regles `::-webkit-scrollbar` pour un scrollbar fin (4px de large), discret, avec un thumb arrondi et une couleur subtile.

