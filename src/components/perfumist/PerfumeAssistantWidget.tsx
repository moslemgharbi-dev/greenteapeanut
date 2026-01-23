import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { useProducts, type ShopifyProduct } from "@/hooks/useProducts";
import { ProductCard } from "@/components/products/ProductCard";

type Msg = { role: "user" | "assistant"; content: string };

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pickRecommendations({
  products,
  userText,
  limit = 3,
}: {
  products: ShopifyProduct[];
  userText: string;
  limit?: number;
}): ShopifyProduct[] {
  const q = normalize(userText);
  if (!products.length) return [];

  // Simple keyword mapping (basic rule-based)
  const keywordGroups: Record<string, string[]> = {
    vanille: ["vanille", "vanilla", "gourmand", "caramel", "sucre"],
    boise: ["boise", "bois", "cedre", "santal", "oud", "ambre"],
    frais: ["frais", "fresh", "agrume", "citrus", "bergamote", "marine"],
    floral: ["floral", "fleur", "rose", "jasmin", "iris", "tubereuse"],
    epice: ["epice", "epices", "poivre", "cannelle", "cardamome"],
  };

  const desired = Object.entries(keywordGroups)
    .filter(([, kws]) => kws.some((k) => q.includes(k)))
    .map(([k]) => k);

  const scored = products
    .map((p) => {
      const text = normalize(`${p.node.title} ${p.node.description ?? ""}`);
      let score = 0;
      // direct contains user words
      for (const token of q.split(" ")) {
        if (token.length < 4) continue;
        if (text.includes(token)) score += 2;
      }
      // mapped keywords boost
      for (const group of desired) {
        for (const kw of keywordGroups[group] ?? []) {
          if (text.includes(normalize(kw))) score += 3;
        }
      }
      return { p, score };
    })
    .sort((a, b) => b.score - a.score);

  const top = scored.filter((x) => x.score > 0).slice(0, limit).map((x) => x.p);
  if (top.length) return top;
  return scored.slice(0, limit).map((x) => x.p);
}

export function PerfumeAssistantWidget() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [recommended, setRecommended] = React.useState<ShopifyProduct[]>([]);

  const { data: products = [] } = useProducts();
  const hasProducts = products.length > 0;

  const close = React.useCallback(() => {
    setOpen(false);
  }, []);

  const send = React.useCallback(async () => {
    const text = input.trim();
    if (!text) return;

    setInput("");
    setRecommended([]);

    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    const recos = pickRecommendations({ products, userText: text, limit: 3 });
    setRecommended(recos);

    const assistant: Msg = {
      role: "assistant",
      content:
        `Très bien. Pour affiner :\n` +
        `1) Occasion (quotidien / bureau / soirée) ?\n` +
        `2) Plutôt (frais / floral / boisé / vanillé / épicé) ?\n` +
        `3) Intensité (discrète / marquée) ?` +
        (!hasProducts
          ? `\n\nJe ne vois pas encore de produits dans la boutique pour te recommander une sélection.`
          : `\n\nVoici une première sélection selon ce que tu as écrit :`),
    };
    setMessages((prev) => [...prev, assistant]);
  }, [hasProducts, input, products]);

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
              <Button type="button" onClick={send} disabled={!input.trim()}>
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

                {recommended.length > 0 && (
                  <section aria-label="Recommandations" className="pt-2">
                    <p className="text-sm font-medium">Sélection recommandée</p>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      {recommended.map((p) => (
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
