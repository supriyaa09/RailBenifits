import { createFileRoute, Link } from "@tanstack/react-router";
import { Brand } from "@/components/rail/common";
import { Users, ShieldCheck, ArrowRight, Bot, FileText, ClipboardCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/60 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Brand />
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#modules" className="hover:text-foreground">Modules</a>
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-primary-soft text-primary text-xs font-medium">
            South Central Railway · Headquarters
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mt-4 text-foreground">
            Intelligent Retirement & Benefits Advisory
          </h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl">
            A rule-based decision support system that helps railway employees and officers determine
            retirement-related benefits with full transparency into the applicable circulars and rules.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-2xl">
            <Link
              to="/employee"
              className="card-surface p-5 hover:border-primary/40 hover:shadow-elevated transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary grid place-items-center">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Employee Portal</div>
                  <div className="text-xs text-muted-foreground">Check benefits & get answers</div>
                </div>
                <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link
              to="/officer"
              className="card-surface p-5 hover:border-primary/40 hover:shadow-elevated transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary grid place-items-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Officer Portal</div>
                  <div className="text-xs text-muted-foreground">Manage rules & circulars</div>
                </div>
                <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-4">
        {[
          { icon: ClipboardCheck, title: "Rule-based eligibility", desc: "Deterministic evaluation across pension, gratuity, family pension, RELHS and more." },
          { icon: Bot, title: "AI Assistant", desc: "Ask questions in plain language. Answers grounded in circulars and manuals." },
          { icon: FileText, title: "Circular library", desc: "Every benefit links back to its source circular for full traceability." },
        ].map((f) => (
          <div key={f.title} className="card-surface p-6">
            <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary grid place-items-center">
              <f.icon className="h-5 w-5" />
            </div>
            <div className="mt-4 font-medium">{f.title}</div>
            <div className="text-sm text-muted-foreground mt-1">{f.desc}</div>
          </div>
        ))}
      </section>

      <footer className="border-t mt-8">
        <div className="max-w-6xl mx-auto px-6 py-6 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} South Central Railway</span>
          <span>Advisory system · Not a payroll or HRMS platform</span>
        </div>
      </footer>
    </div>
  );
}
