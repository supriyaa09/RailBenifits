import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/rail/common";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Send, User, Sparkles } from "lucide-react";

export const Route = createFileRoute("/employee/assistant")({
  component: Assistant,
});

type Msg = { role: "user" | "assistant"; text: string };

const suggestions = [
  "Why am I not eligible for Family Pension?",
  "Explain RELHS.",
  "What documents are required for Gratuity?",
  "Difference between OPS, NPS and UPS?",
];

function reply(q: string): string {
  const s = q.toLowerCase();
  if (s.includes("family pension"))
    return "Family Pension is admissible to eligible legal heirs (spouse, dependent children, dependent parents) under Rule 54 of CCS (Pension) Rules. Rate: 30% of last drawn basic pay, enhanced to 50% for the first 10 years or until age 67. If a relationship falls outside Rule 54 (e.g. non-dependent siblings), the claim is not admissible. Reference: RBE No. 12/2021.";
  if (s.includes("relhs"))
    return "RELHS — Railway Employees Liberalised Health Scheme — provides post-retirement medical coverage in railway hospitals and empanelled facilities. Minimum 20 years of qualifying service required. One-time contribution based on last basic pay. Reference: RBE No. 55/2017.";
  if (s.includes("gratuity"))
    return "For Retirement/Death Gratuity you need: Form 6, Nomination Form, Service Certificate, and Bank Details. Computation: emoluments × 1/4 × completed 6-month periods, capped at ₹20,00,000. Reference: RBE No. 78/2020.";
  if (s.includes("ops") || s.includes("nps") || s.includes("ups"))
    return "OPS is a defined-benefit scheme (50% of last basic) for pre-2004 appointees. NPS is a defined-contribution scheme (10% employee + 14% employer) with 60% lumpsum & 40% annuity on exit. UPS (2025) offers an assured 50% pension after 25 years with a minimum floor of ₹10,000/month.";
  if (s.includes("leave"))
    return "Up to 300 days of earned leave can be encashed at retirement or death. Calculation is based on emoluments (basic + DA). Reference: RBE No. 22/2019.";
  if (s.includes("pass"))
    return "Post-retirement complimentary passes require ≥20 years of qualifying service and separation other than removal/dismissal. Group-wise entitlements apply. Reference: RBE No. 33/2022.";
  return "I can help you understand railway retirement benefits and rules. Try asking about pension, family pension, gratuity, RELHS, leave encashment or complimentary passes. I don't decide eligibility — for that, please use the Check Benefits tool.";
}

function Assistant() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Hi, I'm RailAssist. I can explain railway retirement benefits and rules using circulars and manuals. What would you like to know?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: reply(t) }]);
      setTyping(false);
    }, 600);
  };

  return (
    <>
      <PageHeader title="AI Assistant" description="Ask questions about benefits and rules. The assistant explains — it does not decide eligibility." />

      <div className="card-surface flex flex-col h-[70vh] min-h-[500px]">
        <div ref={scrollerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "assistant" && (
                <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground grid place-items-center shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div className={`max-w-[75%] text-sm leading-relaxed ${m.role === "user" ? "bg-primary text-primary-foreground px-4 py-2.5 rounded-2xl rounded-tr-sm" : "text-foreground"}`}>
                {m.text}
              </div>
              {m.role === "user" && (
                <div className="h-8 w-8 rounded-md bg-muted text-muted-foreground grid place-items-center shrink-0">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {typing && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground grid place-items-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="text-sm text-muted-foreground inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:120ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:240ms]" />
              </div>
            </div>
          )}
        </div>

        {messages.length <= 1 && (
          <div className="px-4 md:px-6 pb-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs px-3 py-1.5 rounded-full border hover:bg-muted/60 text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
              >
                <Sparkles className="h-3 w-3" /> {s}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="border-t p-3 flex items-center gap-2"
        >
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about pension, gratuity, RELHS…"
            className="flex-1 h-10 px-3 rounded-md border bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40"
          />
          <Button type="submit" size="icon" aria-label="Send">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
}
