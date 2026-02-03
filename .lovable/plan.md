
# Plan d'amélioration du Conseiller Parfum

## Objectif
Transformer le chatbot actuel (basé sur des mots-clés) en un assistant IA conversationnel intelligent avec un design premium moderne, capable de comprendre les préférences des utilisateurs et de recommander des parfums de manière personnalisée.

## Architecture proposée

```text
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend React                            │
│  PerfumeAssistantWidget.tsx (refactorisé)                       │
│  - UI premium avec animations                                    │
│  - Streaming des réponses IA                                     │
│  - Affichage des produits recommandés                           │
└────────────────────────┬────────────────────────────────────────┘
                         │ fetch streaming SSE
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Edge Function: perfume-advisor                 │
│  - System prompt expert parfums                                  │
│  - Catalogue produits injecté dans le contexte                  │
│  - Streaming via Lovable AI Gateway                             │
│  - Extraction des recommandations (tool calling)                │
└─────────────────────────────────────────────────────────────────┘
```

## Changements prévus

### 1. Création de l'Edge Function `perfume-advisor`

Fichier : `supabase/functions/perfume-advisor/index.ts`

Fonctionnalités :
- System prompt expert en parfumerie (connaissance des familles olfactives, occasions, saisons)
- Reçoit le catalogue des produits Shopify en contexte
- Utilise le modèle `google/gemini-3-flash-preview` via Lovable AI Gateway
- Streaming SSE pour des réponses en temps réel
- Tool calling pour extraire les handles des produits recommandés de manière structurée
- Gestion des erreurs 429/402

### 2. Refactorisation du widget `PerfumeAssistantWidget.tsx`

Améliorations visuelles :
- Header avec gradient doré subtil et icône animée
- Bulles de messages avec animations d'entrée fluides
- Indicateur de typing animé pendant le streaming
- Scroll automatique vers les nouveaux messages
- Bouton de fermeture et bouton pour nouvelle conversation
- Cartes produits compactes et élégantes dans le chat
- Design responsive optimisé pour mobile

Améliorations fonctionnelles :
- Streaming token-par-token des réponses IA
- Affichage progressif du texte (effet machine à écrire)
- Gestion de l'historique de conversation complet
- Recommandations produits intégrées dans le flux de conversation
- État de chargement avec animation élégante
- Gestion des erreurs avec messages utilisateur-friendly

### 3. Création d'un hook `usePerfumeAdvisor`

Fichier : `src/hooks/usePerfumeAdvisor.ts`

Responsabilités :
- Gestion de l'état des messages
- Logique de streaming SSE
- Parsing des recommandations produits
- Gestion des erreurs et rate limits

### 4. Création de composants auxiliaires

Fichier : `src/components/perfumist/ChatMessage.tsx`
- Composant pour afficher une bulle de message (user/assistant)
- Support markdown pour les réponses IA
- Animation d'entrée

Fichier : `src/components/perfumist/TypingIndicator.tsx`
- Animation de points pendant le chargement

Fichier : `src/components/perfumist/RecommendedProduct.tsx`
- Carte produit compacte pour les recommandations dans le chat
- Image, titre, prix, bouton d'ajout rapide

### 5. Mise à jour de la configuration

Fichier : `supabase/config.toml`
- Ajouter la fonction `perfume-advisor` avec `verify_jwt = false` (public)

## System Prompt de l'IA

L'assistant sera configuré comme un expert parfumeur avec les capacités suivantes :
- Connaissance des familles olfactives (boisé, floral, oriental, frais, fougère, chypré)
- Compréhension des occasions (quotidien, bureau, soirée, événement spécial)
- Conseils selon les saisons
- Recommandations basées sur les parfums préférés mentionnés
- Ton professionnel mais chaleureux, en français

## Flux utilisateur amélioré

1. L'utilisateur ouvre le widget (bouton flottant avec animation pulse)
2. Message de bienvenue personnalisé avec suggestions de questions
3. L'utilisateur tape son message (ex: "Je cherche quelque chose de frais pour l'été")
4. L'IA répond en streaming avec des conseils personnalisés
5. Les produits recommandés s'affichent sous forme de cartes cliquables
6. L'utilisateur peut continuer la conversation pour affiner
7. Bouton d'ajout au panier directement depuis le chat

## Tests de validation

1. Vérifier que le streaming fonctionne correctement
2. Tester les recommandations avec différents types de requêtes
3. Valider le rendu sur mobile
4. Tester la gestion des erreurs (rate limit, réseau)
5. Vérifier les performances (pas de lag pendant le streaming)

## Section technique

### Structure des fichiers

```text
src/
├── components/
│   └── perfumist/
│       ├── PerfumeAssistantWidget.tsx  (refactorisé)
│       ├── ChatMessage.tsx              (nouveau)
│       ├── TypingIndicator.tsx          (nouveau)
│       └── RecommendedProduct.tsx       (nouveau)
├── hooks/
│   └── usePerfumeAdvisor.ts             (nouveau)
supabase/
├── functions/
│   └── perfume-advisor/
│       └── index.ts                      (nouveau)
└── config.toml                           (mis à jour)
```

### API de l'Edge Function

Request :
```json
{
  "messages": [
    { "role": "user", "content": "Je cherche un parfum boisé" }
  ],
  "products": [
    { "handle": "...", "title": "...", "description": "...", "vendor": "..." }
  ]
}
```

Response : Stream SSE avec format OpenAI compatible + tool calls pour les recommandations

### Gestion des recommandations

L'IA utilisera le tool calling pour retourner les handles des produits recommandés :
```json
{
  "name": "recommend_products",
  "arguments": {
    "handles": ["product-handle-1", "product-handle-2"],
    "reason": "Ces parfums correspondent à votre recherche de notes boisées..."
  }
}
```

Le frontend parsera ces tool calls et affichera les cartes produits correspondantes.
