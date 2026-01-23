import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type ClientMessage = {
  role: "user" | "assistant";
  content: string;
};

type ProductContext = {
  title: string;
  handle: string;
  description?: string;
  price?: string;
  currencyCode?: string;
};

const SYSTEM_PROMPT = `Tu es "Conseiller Parfum PERFUMIST®", un conseiller parfum premium pour une boutique de parfums.

Objectif:
- Aider le client à choisir un parfum.
- Poser des questions pertinentes (occasion, famille olfactive, intensité, saison, budget, préférences / allergies si pertinentes).
- Proposer 3 recommandations maximum, avec des raisons courtes et élégantes.

Contraintes importantes:
- Réponds en français.
- Ton: premium, élégant, concis, sans blabla.
- Si un catalogue est fourni (message SYSTEM "CATALOG"), recommande UNIQUEMENT parmi ces produits.
- À la fin de ta réponse, ajoute UNE LIGNE EXACTE:
  RECO_HANDLES: handle1, handle2, handle3
  (utilise 1 à 3 handles; s'il n'y a pas de match fiable, mets RECO_HANDLES: ).
`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => null);
    const messages = (body?.messages ?? []) as ClientMessage[];
    const products = (body?.products ?? []) as ProductContext[];

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const catalogMessage = products.length
      ? {
          role: "system",
          content: `CATALOG\nRègle: recommander uniquement parmi ces produits.\n${JSON.stringify(products)}`,
        }
      : null;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...(catalogMessage ? [catalogMessage] : []),
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({
          error: "Payment required, please add funds to your Lovable AI workspace.",
        }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("perfumist-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
