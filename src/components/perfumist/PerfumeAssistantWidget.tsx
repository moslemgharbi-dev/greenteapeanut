import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { useProducts, type ShopifyProduct } from "@/hooks/useProducts";
import { ProductCard } from "@/components/products/ProductCard";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

function extractRecoHandles(text: string): string[] {
  const match = text.match(/\n?RECO_HANDLES:\s*(.*)\s*$/m);
  if (!match) return [];
  const raw = match[1]?.trim();
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);
}

async function streamPerfumist({
  messages,
  products,
  signal,
  onDelta,
  onDone,
}: {
  messages: Msg[];
  products: Array<{ title: string; handle: string; description?: string; price?: string; currencyCode?: string }>;
  signal: AbortSignal;
  onDelta: (delta: string) => void;
  onDone: () => void;
}) {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/perfumist-chat`;

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages, products }),
    signal,
  });

  if (!resp.ok) {
    if (resp.status === 429) throw new Error("Trop de requêtes (429). Réessaie dans quelques secondes.");
    if (resp.status === 402) throw new Error("Crédits IA insuffisants (402). Merci d’ajouter des crédits.");
    throw new Error(`Erreur IA (${resp.status}).`);
  }
  if (!resp.body) throw new Error("Flux indisponible.");

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);

      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") {
        streamDone = true;
        break;
      }

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        // Incomplete JSON split across chunks: re-buffer and wait
        textBuffer = line + "\n" + textBuffer;
        break;
      }
    }
  }

  // Final flush
  if (textBuffer.trim()) {
    for (let raw of textBuffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        // ignore leftovers
      }
    }
  }

  onDone();
}

export function PerfumeAssistantWidget() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [recommendedHandles, setRecommendedHandles] = React.useState<string[]>([]);

  const { data: products = [] } = useProducts();
  const catalog = React.useMemo(
    () =>
      (products ?? []).map((p) => ({
        title: p.node.title,
        handle: p.node.handle,
        description: p.node.description?.slice(0, 180) || "",
        price: p.node.priceRange?.minVariantPrice?.amount,
        currencyCode: p.node.priceRange?.minVariantPrice?.currencyCode,
      })),
    [products],
  );

  const recommendedProducts = React.useMemo(() => {
    if (!recommendedHandles.length) return [] as ShopifyProduct[];
    const map = new Map(products.map((p) => [p.node.handle, p] as const));
    return recommendedHandles.map((h) => map.get(h)).filter(Boolean) as ShopifyProduct[];
  }, [products, recommendedHandles]);

  const abortRef = React.useRef<AbortController | null>(null);

  const close = React.useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsLoading(false);
    setOpen(false);
  }, []);

  const send = React.useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    setInput("");
    setRecommendedHandles([]);

    const userMsg: Msg = { role: "user", content: text };
    const nextMsgs = [...messages, userMsg];
    setMessages(nextMsgs);
    setIsLoading(true);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamPerfumist({
        messages: nextMsgs,
        products: catalog,
        signal: controller.signal,
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: () => {
          setIsLoading(false);
          const handles = extractRecoHandles(assistantSoFar);
          setRecommendedHandles(handles);
        },
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erreur inconnue";
      console.error(e);
      setIsLoading(false);
      toast.error("Impossible de lancer le Conseiller Parfum", { description: msg });
    }
  }, [catalog, input, isLoading, messages]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") send();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-6 left-6 z-50",
          "h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg",
          "grid place-items-center",
          "hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        )}
        aria-label="Ouvrir le Conseiller Parfum"
      >
        <Sparkles className="h-5 w-5" aria-hidden="true" />
      </button>

      <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : close())}>
        <DialogContent className="p-0 sm:max-w-md">
          <header className="flex items-center gap-3 rounded-t-lg bg-primary px-4 py-3 text-primary-foreground">
            <div className="text-sm font-medium">Conseiller Parfum PERFUMIST®</div>
          </header>

          <div className="p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Dites-nous, quel est votre parfum favori ?"
                aria-label="Votre message"
              />
              <Button type="button" onClick={send} disabled={isLoading || !input.trim()}>
                Envoyer
              </Button>
            </div>

            {messages.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-xs tracking-[0.25em] text-muted-foreground">DÉCOUVREZ</p>
                <h2 className="mt-2 text-sm font-medium">VOTRE PARFUM IDÉAL</h2>
                <p className="mt-1 text-xs text-muted-foreground">EN QUELQUES CLICS</p>

                <div className="mx-auto mt-8 max-w-xs space-y-6 text-xs">
                  <div className="flex items-center justify-center gap-3 text-muted-foreground">
                    <div className="h-9 w-9 rounded-full border border-border grid place-items-center text-foreground/80">♥</div>
                    <div className="text-left">ÉCRIVEZ LE NOM DE VOTRE PARFUM PRÉFÉRÉ…</div>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-muted-foreground">
                    <div className="h-9 w-9 rounded-full border border-border grid place-items-center text-foreground/80">✦</div>
                    <div className="text-left">LAISSEZ LA MAGIE OPÉRER…</div>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-muted-foreground">
                    <div className="h-9 w-9 rounded-full border border-border grid place-items-center text-foreground/80">⌁</div>
                    <div className="text-left">ET DÉCOUVREZ VOTRE SÉLECTION PERSONNALISÉE !</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <div className="max-h-[40vh] overflow-auto rounded-md border border-border p-3">
                  <div className="space-y-3 text-sm">
                    {messages.map((m, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "flex",
                          m.role === "user" ? "justify-end" : "justify-start",
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[85%] rounded-lg px-3 py-2",
                            m.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground",
                          )}
                        >
                          {m.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {recommendedProducts.length > 0 && (
                  <section aria-label="Recommandations" className="pt-2">
                    <p className="text-sm font-medium">Sélection recommandée</p>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      {recommendedProducts.map((p) => (
                        <ProductCard key={p.node.id} product={p} />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
