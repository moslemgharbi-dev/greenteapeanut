import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SHOPIFY_ADMIN_URL =
  "https://g1swxp-jj.myshopify.com/admin/api/2025-07/graphql.json";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const SHOPIFY_ACCESS_TOKEN = Deno.env.get("SHOPIFY_ACCESS_TOKEN");
    if (!SHOPIFY_ACCESS_TOKEN) {
      throw new Error("SHOPIFY_ACCESS_TOKEN is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id")
      .eq("email", email.toLowerCase())
      .maybeSingle();

    if (existing) {
      return new Response(
        JSON.stringify({ success: true, message: "already_subscribed" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create customer in Shopify via Admin API
    const mutation = `
      mutation customerCreate($input: CustomerInput!) {
        customerCreate(input: $input) {
          customer {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const shopifyResponse = await fetch(SHOPIFY_ADMIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          input: {
            email: email.toLowerCase(),
            emailMarketingConsent: {
              marketingState: "SUBSCRIBED",
              consentUpdatedAt: new Date().toISOString(),
              marketingOptInLevel: "SINGLE_OPT_IN",
            },
            tags: ["newsletter"],
          },
        },
      }),
    });

    const shopifyData = await shopifyResponse.json();
    console.log("Shopify response:", JSON.stringify(shopifyData));

    const userErrors = shopifyData?.data?.customerCreate?.userErrors;
    const customerId = shopifyData?.data?.customerCreate?.customer?.id;

    // If customer already exists in Shopify, that's fine
    const alreadyExists = userErrors?.some((e: any) =>
      e.message?.includes("has already been taken")
    );

    // Save to our database
    await supabase.from("newsletter_subscribers").insert({
      email: email.toLowerCase(),
      shopify_customer_id: customerId || null,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: alreadyExists ? "already_exists_in_shopify" : "created",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
