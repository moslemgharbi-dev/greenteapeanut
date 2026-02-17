

# Plan de modifications

## 1. Renommer le bouton "Ajout rapide" en "Ajouter au panier"

Modification simple dans `src/components/products/ProductCard.tsx` : remplacer le texte "Ajout rapide" par "Ajouter au panier".

## 2. Toast "Ajouté au panier" : durée 2 secondes + disparition au toucher

- Modifier les appels `toast.success()` dans `ProductCard.tsx` et `ProductDetail.tsx` pour ajouter `duration: 2000`.
- Ajouter un listener global (`touchstart` / `click`) qui ferme tous les toasts actifs via `toast.dismiss()` de Sonner. Ce listener sera ajouté dans `App.tsx`.

## 3. Favoris liés au compte utilisateur (base de données)

Actuellement les favoris sont stockés en local (localStorage). Pour les lier au compte :

### Base de données
- Creer une table `favorites` avec colonnes : `id` (uuid), `user_id` (uuid, NOT NULL), `product_id` (text, NOT NULL), `created_at` (timestamptz).
- Contrainte unique sur `(user_id, product_id)`.
- Politiques RLS : chaque utilisateur ne peut lire/inserer/supprimer que ses propres favoris.

### Store Zustand (`favoritesStore.ts`)
- Refactorer pour synchroniser avec la base de donnees quand l'utilisateur est connecte.
- Garder le fonctionnement local (localStorage) pour les utilisateurs non connectes.
- Ajouter des fonctions `loadFavorites()` (fetch depuis la DB), `toggleFavorite()` (insert/delete en DB + mise a jour locale).

### Integration
- Dans `ProductCard.tsx`, si l'utilisateur n'est pas connecte et clique sur le coeur, afficher un toast l'invitant a se connecter (avec lien vers `/auth`).
- Charger les favoris depuis la DB au login via un hook dans `App.tsx`.

---

## Details techniques

### Table SQL

```sql
CREATE TABLE public.favorites (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  product_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE UNIQUE INDEX favorites_user_product_idx ON public.favorites (user_id, product_id);

CREATE POLICY "Users can read own favorites"
  ON public.favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON public.favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON public.favorites FOR DELETE
  USING (auth.uid() = user_id);
```

### Fichiers modifies

| Fichier | Changement |
|---|---|
| `src/components/products/ProductCard.tsx` | Texte bouton, logique favoris avec auth check |
| `src/pages/ProductDetail.tsx` | Toast duration 2000ms |
| `src/stores/favoritesStore.ts` | Refactoring complet : sync DB + fallback local |
| `src/App.tsx` | Listener dismiss toast au toucher, chargement favoris au login |

