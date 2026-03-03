import { useState, useCallback, useRef } from "react";
import { useProducts, type ShopifyProduct } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  recommendedHandles?: string[];
};

type StreamingState = "idle" | "streaming" | "error";

const ADVISOR_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/perfume-advisor`;

export function usePerfumeAdvisor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingState, setStreamingState] = useState<StreamingState>("idle");
  const abortControllerRef = useRef<AbortController | null>(null);

  const { data: products = [] } = useProducts();

  const getProductsByHandles = useCallback(
    (handles: string[]): ShopifyProduct[] => {
      return products.filter((p) => handles.includes(p.node.handle));
    },
    [products]
  );

  const resetConversation = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages([]);
    setStreamingState("idle");
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || streamingState === "streaming") return;

      // Add user message
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: content.trim(),
      };
      setMessages((prev) => [...prev, userMessage]);

      // Prepare assistant message placeholder
      const assistantId = crypto.randomUUID();
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      setStreamingState("streaming");

      // Create abort controller for this request
      abortControllerRef.current = new AbortController();

      try {
        // Prepare products for context (simplified)
        const productContext = products.slice(0, 50).map((p) => ({
          handle: p.node.handle,
          title: p.node.title,
          description: p.node.description?.slice(0, 300) || "",
          vendor: p.node.vendor,
        }));

        const allMessages = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        // Get current session token
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) {
          throw new Error("auth_required");
        }

        const response = await fetch(ADVISOR_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            messages: allMessages,
            products: productContext,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          if (response.status === 401) {
            throw new Error("auth_required");
          }
          if (response.status === 429) {
            throw new Error("rate_limit");
          }
          if (response.status === 402) {
            throw new Error("payment_required");
          }
          throw new Error(errorData.message || "Erreur de connexion");
        }

        if (!response.body) {
          throw new Error("No response body");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let fullContent = "";
        let toolCallArguments = "";
        let isCollectingToolCall = false;
        let recommendedHandles: string[] = [];
        let toolCallReason = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // Process line by line
          let newlineIndex: number;
          while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
            let line = buffer.slice(0, newlineIndex);
            buffer = buffer.slice(newlineIndex + 1);

            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (line.startsWith(":") || line.trim() === "") continue;
            if (!line.startsWith("data: ")) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") break;

            try {
              const parsed = JSON.parse(jsonStr);
              const delta = parsed.choices?.[0]?.delta;

              // Handle text content
              if (delta?.content) {
                fullContent += delta.content;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: fullContent } : m
                  )
                );
              }

              // Handle tool calls - check for complete tool call in one chunk
              if (delta?.tool_calls) {
                for (const toolCall of delta.tool_calls) {
                  if (toolCall.function?.name === "recommend_products") {
                    isCollectingToolCall = true;
                  }
                  if (toolCall.function?.arguments) {
                    toolCallArguments += toolCall.function.arguments;
                  }
                }
              }

              // Check for finish reason - process tool calls
              const finishReason = parsed.choices?.[0]?.finish_reason;
              if ((finishReason === "tool_calls" || finishReason === "stop") && isCollectingToolCall && toolCallArguments) {
                try {
                  const toolArgs = JSON.parse(toolCallArguments);
                  if (toolArgs.handles && Array.isArray(toolArgs.handles)) {
                    recommendedHandles = toolArgs.handles;
                  }
                  if (toolArgs.reason) {
                    toolCallReason = toolArgs.reason;
                    // If no text content yet, use the reason as content
                    if (!fullContent.trim()) {
                      fullContent = toolCallReason;
                      setMessages((prev) =>
                        prev.map((m) =>
                          m.id === assistantId ? { ...m, content: fullContent } : m
                        )
                      );
                    }
                  }
                } catch (e) {
                  console.error("Failed to parse tool call arguments:", e);
                }
              }
            } catch {
              // Incomplete JSON, put back and wait for more
              buffer = line + "\n" + buffer;
              break;
            }
          }
        }

        // If we only got tool call with reason but no content, use the reason
        if (!fullContent.trim() && toolCallReason) {
          fullContent = toolCallReason;
        }

        // Final update with recommendations
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: fullContent, recommendedHandles }
              : m
          )
        );

        setStreamingState("idle");
      } catch (error) {
        console.error("Stream error:", error);

        if (error instanceof Error && error.name === "AbortError") {
          setStreamingState("idle");
          return;
        }

        const errorMessage =
          error instanceof Error && error.message === "auth_required"
            ? "Connecte-toi pour utiliser le conseiller parfum."
            : error instanceof Error && error.message === "rate_limit"
            ? "Trop de requêtes, réessaie dans quelques secondes."
            : error instanceof Error && error.message === "payment_required"
            ? "Service temporairement indisponible."
            : "Désolé, une erreur est survenue. Réessaie.";

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: errorMessage }
              : m
          )
        );

        toast.error("Erreur de connexion", {
          description: errorMessage,
        });

        setStreamingState("error");
      }
    },
    [messages, products, streamingState]
  );

  return {
    messages,
    streamingState,
    sendMessage,
    resetConversation,
    getProductsByHandles,
    hasProducts: products.length > 0,
  };
}
