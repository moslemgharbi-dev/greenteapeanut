

# Avis Clients Interactifs et Profils Clients

## Objectif
Deux fonctionnalités complémentaires :
1. Permettre aux clients de cliquer sur les étoiles pour laisser un avis sur un produit
2. Créer un système de compte client (inscription / connexion / profil)

---

## 1. Système d'authentification et profils

### Pages et composants
- **Page `/auth`** : formulaire d'inscription et de connexion (email + mot de passe), avec onglets "Créer un compte" / "Se connecter"
- **Page `/profil`** : page de profil affichant le nom, l'email, et les avis laissés par le client
- **Header** : ajout d'une icone "Compte" (User icon) dans la barre d'actions, qui redirige vers `/auth` si non connecté ou `/profil` si connecté
- **Hook `useAuth`** : gestion de l'état d'authentification via `onAuthStateChange`

### Base de données
- **Table `profiles`** : `id (uuid, FK auth.users)`, `full_name (text)`, `created_at`
  - Trigger automatique pour créer un profil à l'inscription
  - RLS : chaque utilisateur ne peut lire/modifier que son propre profil

---

## 2. Avis clients interactifs

### Base de données
- **Table `reviews`** : `id`, `user_id (FK auth.users)`, `product_handle (text)`, `rating (int 1-5)`, `comment (text, nullable)`, `created_at`
  - RLS : lecture publique, insertion/modification limitée au propriétaire
  - Contrainte d'unicité sur `(user_id, product_handle)` (un seul avis par client par produit)

### Composant `CustomerReviews` amélioré
- **Etoiles cliquables** : au survol, les étoiles se remplissent dynamiquement ; au clic, la note est sélectionnée
- **Formulaire d'avis** : champ de commentaire optionnel + bouton "Soumettre"
- Si le client n'est pas connecté, un message l'invite à se connecter
- Si le client a déjà laissé un avis, il voit son avis existant avec possibilité de le modifier
- **Calcul dynamique** : la note moyenne et la répartition par étoile sont calculées à partir des avis réels en base

---

## Parcours utilisateur

1. Le client visite une page produit et voit la section "Avis Clients"
2. Il clique sur les étoiles pour choisir sa note
3. S'il n'est pas connecté, il est redirigé vers la page de connexion/inscription
4. Une fois connecté, il peut soumettre son avis (note + commentaire optionnel)
5. L'avis apparait immédiatement dans la liste et les statistiques se mettent à jour

---

## Details techniques

### Migrations SQL (2 migrations)

**Migration 1 - Profiles :**
```sql
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Trigger auto-creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS policies
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
```

**Migration 2 - Reviews :**
```sql
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_handle text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_handle)
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Auth users insert own review" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own review" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own review" ON public.reviews FOR DELETE USING (auth.uid() = user_id);
```

### Fichiers a creer/modifier

| Fichier | Action |
|---------|--------|
| `src/hooks/useAuth.ts` | Creer - hook authentification |
| `src/pages/Auth.tsx` | Creer - page connexion/inscription |
| `src/pages/Profile.tsx` | Creer - page profil client |
| `src/hooks/useReviews.ts` | Creer - hook CRUD avis |
| `src/components/products/CustomerReviews.tsx` | Modifier - etoiles cliquables + formulaire |
| `src/components/products/InteractiveStarRating.tsx` | Creer - composant etoiles cliquables |
| `src/components/layout/Header.tsx` | Modifier - ajout icone compte |
| `src/App.tsx` | Modifier - ajout routes `/auth` et `/profil` |

