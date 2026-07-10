import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, ShieldCheck, Users } from "lucide-react";
import type { ReactNode } from "react";
import { Brand } from "@/components/rail/common";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-card/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Brand />
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <Building2 className="h-4 w-4" />
            South Central Railway Headquarters
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <section className="max-w-3xl">
          <p className="text-sm font-medium text-primary">South Central Railway Headquarters</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">RailAssist</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Intelligent Railway Pension & Settlement Advisory System
          </p>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2 max-w-4xl">
          <PortalCard
            to="/employee"
            title="Employee Portal"
            description="Access settlement guidance, reports, railway schemes, circulars, FAQs, and pension assistance."
            icon={<Users className="h-6 w-6" />}
          />
          <PortalCard
            to="/officer"
            title="Officer Portal"
            description="Manage the administrative foundation for rules, benefits, circulars, workbooks, knowledge, and configuration."
            icon={<ShieldCheck className="h-6 w-6" />}
          />
        </section>
      </main>
    </div>
  );
}

function PortalCard({
  to,
  title,
  description,
  icon,
}: {
  to: "/employee" | "/officer";
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <Link to={to} className="card-surface p-6 min-h-48 flex flex-col hover:border-primary/40 hover:shadow-elevated transition-all group">
      <div className="h-12 w-12 rounded-md bg-primary-soft text-primary grid place-items-center ring-1 ring-primary/10">
        {icon}
      </div>
      <div className="mt-5">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </div>
      <div className="mt-auto pt-5 text-sm font-medium text-primary inline-flex items-center gap-2">
        Open portal
        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
}
