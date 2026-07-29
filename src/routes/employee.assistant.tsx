import { createFileRoute } from "@tanstack/react-router";
import { Bot, Send, Trash2, User, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export const Route = createFileRoute("/employee/assistant")({
  component: PensionAssistantPage,
});

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function PensionAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I am your RailAssist Knowledge Assistant. You can ask me any questions about Railway Pension Rules 2026, leave encashment calculations, retirement gratuity, or circular details.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch response");
      }

      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content || "No reply received.";

      setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ Error: ${err.message}. Please verify that GROQ_API_KEY is configured in your .env file at the root and the dev server has restarted.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hello! I am your RailAssist Knowledge Assistant. You can ask me any questions about Railway Pension Rules 2026, leave encashment calculations, retirement gratuity, or circular details.",
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto rounded-xl border border-border bg-card shadow-soft overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between shadow-soft border-b border-border">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 animate-pulse" />
          <div>
            <h1 className="text-sm font-semibold leading-none">Railway Knowledge Assistant</h1>
            <span className="text-[10px] text-primary-foreground/75 mt-1 block">
              South Central Railway
            </span>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="p-1.5 rounded-lg text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/15 transition-colors cursor-pointer"
          title="Clear Conversation"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex gap-3 max-w-[85%] ${
              m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            <div
              className={`h-8 w-8 rounded-full grid place-items-center shrink-0 ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary-soft text-primary border"
              }`}
            >
              {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div
              className={`p-3 rounded-xl text-sm leading-relaxed border shadow-soft bg-card text-foreground border-border`}
            >
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 mr-auto max-w-[80%] items-center">
            <div className="h-8 w-8 rounded-full bg-primary-soft text-primary border grid place-items-center shrink-0 animate-pulse">
              <Bot className="h-4 w-4" />
            </div>
            <div className="p-3 rounded-xl text-sm border bg-card text-foreground border-border flex items-center gap-2 shadow-soft">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSend} className="p-3 border-t border-border bg-card flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder="Ask about pension rules, leave encashment calculations..."
          className="flex-1 px-4 py-2 text-sm rounded-lg border border-input bg-background text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-shadow disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/95 transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center gap-1.5 text-sm cursor-pointer"
        >
          <Send className="h-4 w-4" />
          Send
        </button>
      </form>
    </div>
  );
}
