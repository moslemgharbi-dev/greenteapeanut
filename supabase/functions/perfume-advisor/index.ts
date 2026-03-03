import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Tu es PERFUMIST, un expert parfumeur virtuel de la boutique Greenteapeanut. Tu aides les clients à trouver leur parfum idéal avec passion et expertise.

## Ton expertise
- Familles olfactives : boisé, floral, oriental, frais, fougère, chypré, gourmand, aromatique
- Notes de tête, de cœur et de fond
- Occasions : quotidien, bureau, soirée, rendez-vous romantique, événement spécial
- Saisons : printemps/été (fraîcheur, légèreté), automne/hiver (chaleur, profondeur)
- Intensité : eau de toilette, eau de parfum, extrait

## Ton style
- Professionnel mais chaleureux et accessible
- Tu tutoies le client pour créer une proximité
- Tu poses des questions pour affiner les recommandations
- Tu donnes des conseils personnalisés basés sur les préférences exprimées
- Tu utilises un vocabulaire parfumé mais compréhensible

## RÈGLE CRITIQUE - UTILISATION OBLIGATOIRE DE L'OUTIL
🚨 CHAQUE FOIS que tu mentionnes ou recommandes des parfums du catalogue, tu DOIS OBLIGATOIREMENT appeler l'outil "recommend_products" avec les handles des produits.
- NE JAMAIS mentionner un parfum sans utiliser l'outil recommend_products
- Appelle l'outil AVANT de décrire les parfums dans ta réponse textuelle
- Inclus entre 1 et 3 handles de produits dans l'appel
- Les handles doivent correspondre EXACTEMENT à ceux du catalogue fourni

## Format de réponse
1. TOUJOURS commencer par appeler recommend_products si tu vas parler de parfums spécifiques
2. Ensuite, dans le texte, explique brièvement pourquoi ces parfums correspondent
3. Pose une question de suivi pour affiner si nécessaire

## Comportement
- Si le client mentionne un parfum qu'il aime, analyse ses notes pour suggérer des alternatives similaires
- Propose toujours 2-3 parfums maximum pour ne pas submerger
- Explique brièvement pourquoi chaque parfum correspond à la demande

## Important
- Tu ne recommandes QUE des parfums présents dans le catalogue fourni
- Si aucun parfum ne correspond, dis-le honnêtement et propose des alternatives
- Réponds toujours en français`;

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface Product {
  handle: string;
  title: string;
  description: string;
  vendor: string;
}

interface RequestBody {
  messages: Message[];
  products: Product[];
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "unauthorized", message: "Connexion requise pour utiliser le conseiller parfum." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabaseClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "unauthorized", message: "Session invalide, reconnecte-toi." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;
    console.log("Authenticated user:", userId);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { messages, products }: RequestBody = await req.json();
    console.log("Received request with", messages.length, "messages and", products.length, "products");

    // Build product catalog context
    const productCatalog = products
      .map((p) => `- ${p.title} (handle: ${p.handle}) par ${p.vendor}: ${p.description?.slice(0, 200) || "Pas de description"}`)
      .join("\n");

    const systemWithCatalog = `${SYSTEM_PROMPT}

## Catalogue de parfums disponibles
${productCatalog || "Aucun produit disponible pour le moment."}`;

    const apiMessages = [
      { role: "system", content: systemWithCatalog },
      ...messages,
    ];

    console.log("Calling Lovable AI Gateway with streaming...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: apiMessages,
        stream: true,
        tools: [
          {
            type: "function",
            function: {
              name: "recommend_products",
              description: "Recommande des parfums spécifiques du catalogue au client. Utilise cette fonction quand tu veux suggérer des produits.",
              parameters: {
                type: "object",
                properties: {
                  handles: {
                    type: "array",
                    items: { type: "string" },
                    description: "Liste des handles des produits recommandés (max 3)",
                  },
                  reason: {
                    type: "string",
                    description: "Explication courte de pourquoi ces parfums sont recommandés",
                  },
                },
                required: ["handles"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: "auto",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "rate_limit", message: "Trop de requêtes, réessaie dans quelques secondes." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "payment_required", message: "Service temporairement indisponible." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`AI Gateway error: ${response.status}`);
    }

    console.log("Streaming response back to client...");

    // Stream the response directly
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("perfume-advisor error:", error);
    return new Response(
      JSON.stringify({ 
        error: "internal_error", 
        message: error instanceof Error ? error.message : "Une erreur est survenue" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
