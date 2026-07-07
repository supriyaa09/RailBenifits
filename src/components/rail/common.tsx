import { Link } from "@tanstack/react-router";
import { Train } from "lucide-react";
import { type ReactNode } from "react";

export function Brand({ subtitle }: { subtitle?: string }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground grid place-items-center shadow-soft group-hover:scale-105 transition-transform">
        <Train className="h-5 w-5" />
      </div>
      <div className="leading-tight">
        <div className="font-semibold tracking-tight text-foreground">RailAssist</div>
        <div className="text-[11px] text-muted-foreground">{subtitle ?? "South Central Railway"}</div>
      </div>
    </Link>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        {description && <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="card-surface p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="text-2xl font-semibold text-foreground mt-1">{value}</div>
          {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
        </div>
        {icon && (
          <div className="h-9 w-9 rounded-md bg-primary-soft text-primary grid place-items-center">{icon}</div>
        )}
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="card-surface p-10 text-center">
      {icon && <div className="mx-auto h-12 w-12 rounded-full bg-primary-soft text-primary grid place-items-center mb-4">{icon}</div>}
      <div className="font-medium text-foreground">{title}</div>
      {description && <div className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">{description}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
