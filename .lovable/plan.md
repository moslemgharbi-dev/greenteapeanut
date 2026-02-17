
# Formulaire d'onboarding post-inscription (2 pages)

## Objectif
Apres l'inscription d'un nouveau client, afficher un formulaire en 2 etapes pour collecter des informations supplementaires avant d'acceder au profil.

## Modifications de la base de donnees

Ajouter des colonnes a la table `profiles` :

- `civility` (text, nullable) -- "monsieur" ou "madame"
- `first_name` (text, nullable)
- `last_name` (text, nullable)
- `phone` (text, nullable)
- `address` (text, nullable)
- `privacy_accepted` (boolean, default false)
- `notify_sms` (boolean, default false)
- `notify_email` (boolean, default false)
- `onboarding_completed` (boolean, default false)

La colonne `onboarding_completed` permet de savoir si le client a deja rempli le formulaire.

## Nouveau composant : `src/pages/Onboarding.tsx`

Un formulaire en 2 etapes avec navigation interne (state React, pas de routes separees) :

### Page 1 -- Informations personnelles
- Civilite : boutons radio "Monsieur" / "Madame"
- Nom (requis)
- Prenom (requis)
- Numero de telephone (optionnel)
- Adresse (optionnel)
- Case a cocher : "J'ai lu et j'ai pris connaissance de la politique de donnees personnelles" (requis pour continuer, avec lien vers `/confidentialite-cookies`)

Bouton "Suivant" (desactive si champs requis non remplis)

### Page 2 -- Preferences de communication
- Texte explicatif : "Souhaitez-vous recevoir nos nouvelles offres ?"
- Case a cocher : "Par SMS"
- Case a cocher : "Par email"
- Bouton "Confirmer"

Au clic sur Confirmer, les donnees sont sauvegardees dans la table `profiles` et `onboarding_completed` passe a `true`. Redirection vers `/profil`.

## Modifications du routage

- Ajouter la route `/onboarding` dans `App.tsx`
- Modifier `Auth.tsx` : apres inscription reussie + confirmation email + premiere connexion, rediriger vers `/onboarding` au lieu de `/profil` si `onboarding_completed` est `false`
- Modifier `Profile.tsx` : verifier `onboarding_completed` au chargement, rediriger vers `/onboarding` si `false`

## Details techniques

- Le formulaire utilise les composants existants : `Input`, `Label`, `Checkbox`, `Button`, `RadioGroup`
- Design coherent avec la page Auth : style luxe, uppercase labels, hauteur h-12 pour les inputs
- Validation cote client avec messages d'erreur en francais
- La mise a jour se fait via `supabase.from('profiles').update(...)` avec RLS existante (l'utilisateur ne peut modifier que son propre profil)
- Indicateur de progression visuel (etape 1/2, 2/2) en haut du formulaire
