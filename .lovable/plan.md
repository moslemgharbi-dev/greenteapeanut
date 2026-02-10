
# Ajout d'une image Hero Banner

## Objectif
Ajouter une image de fond au hero banner pour donner un rendu visuel luxueux et immersif, tout en conservant la lisibilité du texte grâce a un overlay sombre.

## Approche

### Generation d'image
Utiliser le modele d'IA image (google/gemini-2.5-flash-image) via une edge function pour generer une photo de hero banner style luxe parfumerie : flacons elegants, ambiance doree/sombre, esthetique editoriale.

L'image sera stockee dans le storage Lovable Cloud (bucket public) et referencee par URL dans le composant.

### Modification du composant Hero.tsx
- Ajouter une balise `<img>` en position absolue couvrant toute la section
- Superposer un overlay gradient sombre (noir vers transparent) pour garantir la lisibilite du texte blanc/clair
- Conserver les elements decoratifs dores existants par-dessus
- Adapter la couleur du texte si necessaire pour le contraste

### Structure visuelle resultante

```text
┌──────────────────────────────────┐
│  Image de fond (cover)           │
│  ┌────────────────────────────┐  │
│  │  Overlay gradient sombre   │  │
│  │  ┌──────────────────────┐  │  │
│  │  │  Texte + CTA buttons │  │  │
│  │  └──────────────────────┘  │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

## Fichiers concernes
- `supabase/functions/generate-hero-image/index.ts` -- nouvelle edge function pour generer l'image
- `src/components/home/Hero.tsx` -- ajout de l'image de fond avec overlay

## Alternative plus simple
Si la generation IA prend trop de temps ou ne donne pas le resultat souhaite, on peut utiliser une image libre de droits (Unsplash) d'ambiance parfumerie directement via URL, sans edge function.
