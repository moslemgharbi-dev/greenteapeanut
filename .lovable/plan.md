
## Ameliorations de la page de creation de compte

### 1. Email de confirmation non recu

Les logs montrent que le hook d'email est bien appele et retourne un succes, mais aucun email n'arrive. Cela signifie que le service d'envoi d'emails n'est pas correctement configure. La solution est de verifier la configuration du service email dans Lovable Cloud. En attendant, on peut aussi ameliorer le message affiche apres l'inscription pour donner plus d'informations au client (verifier les spams, etc.).

**Note importante** : Il faudra verifier dans les parametres de Lovable Cloud que le service d'envoi d'emails est bien actif. Si le probleme persiste, on pourra creer une edge function dediee pour envoyer l'email de confirmation via un service tiers (comme Resend).

### 2. Bouton de visibilite du mot de passe

Ajouter une icone "oeil" a cote du champ mot de passe pour basculer entre le mode masque et visible.

**Fichier : `src/pages/Auth.tsx`**
- Ajouter un state `showPassword` (boolean)
- Remplacer le champ mot de passe par un conteneur relatif avec une icone Eye/EyeOff de lucide-react
- Le type du champ bascule entre `password` et `text` selon l'etat

### 3. Lier la creation de compte a Shopify

Creer une edge function qui, lors de l'inscription, cree automatiquement un client dans Shopify via l'Admin API.

**Fichier : `supabase/functions/create-shopify-customer/index.ts`**
- Appelee apres une inscription reussie
- Utilise le secret `SHOPIFY_ACCESS_TOKEN` (deja configure) et le domaine du store
- Appelle l'API Admin Shopify pour creer un client avec l'email et le nom complet
- Gestion d'erreurs : si le client existe deja dans Shopify, on ignore l'erreur

**Fichier : `supabase/config.toml`**
- Ajouter la configuration de la nouvelle edge function avec `verify_jwt = false`

**Fichier : `src/hooks/useAuth.ts`**
- Apres un `signUp` reussi, appeler l'edge function `create-shopify-customer` avec l'email et le nom

**Fichier : `src/pages/Auth.tsx`**
- Ameliorer le message post-inscription pour indiquer de verifier les spams
- Integrer le toggle de visibilite du mot de passe

### Details techniques

**Toggle mot de passe** :
```text
+------------------------------------------+
| Mot de passe                             |
| [**********]                     [icone] |
+------------------------------------------+
```
L'icone sera un composant `Eye` ou `EyeOff` de `lucide-react`, place en position absolue a droite du champ input.

**Edge function `create-shopify-customer`** :
- Endpoint : POST avec body `{ email, firstName, lastName }`
- Utilise l'API Admin REST Shopify (`/admin/api/2025-07/customers.json`)
- Retourne un statut de succes ou d'erreur
- Le secret `SHOPIFY_ACCESS_TOKEN` est deja present dans les secrets du projet
