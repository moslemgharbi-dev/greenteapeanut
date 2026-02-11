import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MessageCircleHeart, Send, X, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePerfumeAdvisor } from "@/hooks/usePerfumeAdvisor";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { RecommendedProduct } from "./RecommendedProduct";

export function PerfumeAssistantWidget() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const {
    messages,
    streamingState,
    sendMessage,
    resetConversation,
    getProductsByHandles,
    hasProducts,
  } = usePerfumeAdvisor();

  const isStreaming = streamingState === "streaming";

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus textarea when dialog opens
  React.useEffect(() => {
    if (open && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [open]);

  const handleSend = React.useCallback(() => {
    const text = input.trim();
    if (!text || isStreaming) return;
    setInput("");
    sendMessage(text);
  }, [input, isStreaming, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewConversation = () => {
    resetConversation();
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "fixed bottom-6 left-6 z-50",
          "h-14 w-14 rounded-full shadow-xl",
          "bg-gradient-to-br from-primary to-primary/80",
          "text-primary-foreground",
          "grid place-items-center",
          "ring-2 ring-primary/20 ring-offset-2 ring-offset-background",
          "hover:shadow-2xl hover:shadow-primary/25",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-shadow duration-300"
        )}
        aria-label="Ouvrir le Conseiller Parfum"
      >
        <MessageCircleHeart className="h-6 w-6" aria-hidden="true" />
      </motion.button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-[85vh] max-h-[700px] flex-col gap-0 overflow-hidden p-0 sm:max-w-xs">
          {/* Header */}
          <header className="relative flex items-center justify-between border-b border-border bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <MessageCircleHeart className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Conseiller Parfum</h2>
                <p className="text-xs text-muted-foreground">PERFUMIST®</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleNewConversation}
                  aria-label="Nouvelle conversation"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </header>

          {/* Messages area */}
          <ScrollArea className="flex-1" ref={scrollRef}>
            <div className="p-4">
              <AnimatePresence mode="wait">
                {messages.length === 0 ? (
                  <motion.div
                    key="welcome"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center py-8 text-center"
                  >
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                      <MessageCircleHeart className="h-7 w-7 text-primary" />
                    </div>
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                      Découvrez
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-foreground">
                      Votre parfum idéal
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      en quelques échanges
                    </p>

                    <div className="mt-8 space-y-4 text-left">
                      <WelcomeStep icon="♥" text="Parlez-moi de vos parfums préférés..." />
                      <WelcomeStep icon="✦" text="Décrivez l'ambiance recherchée..." />
                      <WelcomeStep icon="⌁" text="Recevez des recommandations personnalisées !" />
                    </div>

                    {!hasProducts && (
                      <p className="mt-6 text-xs text-muted-foreground/80">
                        Chargement du catalogue en cours...
                      </p>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="conversation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {messages.map((msg, idx) => (
                      <React.Fragment key={msg.id}>
                        <ChatMessage
                          role={msg.role}
                          content={msg.content}
                          isStreaming={
                            isStreaming &&
                            idx === messages.length - 1 &&
                            msg.role === "assistant"
                          }
                        />
                        {/* Show recommended products after assistant message */}
                        {msg.role === "assistant" &&
                          msg.recommendedHandles &&
                          msg.recommendedHandles.length > 0 && (
                            <div className="ml-2 space-y-2 pt-2">
                              {getProductsByHandles(msg.recommendedHandles).map(
                                (product, pIdx) => (
                                  <RecommendedProduct
                                    key={product.node.id}
                                    product={product}
                                    index={pIdx}
                                  />
                                )
                              )}
                            </div>
                          )}
                      </React.Fragment>
                    ))}
                    {isStreaming && messages[messages.length - 1]?.content === "" && (
                      <TypingIndicator />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>

          {/* Input area */}
          <div className="border-t border-border bg-background p-3">
            <div className="flex gap-2">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Décrivez vos envies olfactives..."
                className="min-h-[44px] max-h-[120px] resize-none"
                rows={1}
                disabled={isStreaming}
                aria-label="Votre message"
              />
              <Button
                type="button"
                size="icon"
                onClick={handleSend}
                disabled={!input.trim() || isStreaming}
                className="h-11 w-11 shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function WelcomeStep({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-sm">
        {icon}
      </div>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
