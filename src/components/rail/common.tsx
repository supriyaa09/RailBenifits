import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

export const INDIAN_RAILWAYS_LOGO = "/assets/logo/indian-railways.png";

export function Brand({ subtitle }: { subtitle?: string }) {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <img
        src={INDIAN_RAILWAYS_LOGO}
        alt="Indian Railways"
        className="h-10 w-10 shrink-0 object-contain md:h-12 md:w-12 lg:h-14 lg:w-14 group-hover:scale-105 transition-transform"
      />
      <div className="leading-tight">
        <div className="font-semibold tracking-tight text-foreground">RailAssist</div>
        <div className="text-[11px] text-muted-foreground">
          {subtitle ?? "South Central Railway"}
        </div>
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
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6 rounded-lg border border-border bg-card p-5 shadow-soft print:hidden">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}

export const PageTitle = PageHeader;

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
          <div className="h-9 w-9 rounded-md bg-primary-soft text-primary grid place-items-center ring-1 ring-primary/10">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export function DashboardCard({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="card-surface p-5 h-full flex flex-col gap-4 hover:border-primary/30 transition-colors">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="h-10 w-10 rounded-md bg-primary-soft text-primary grid place-items-center ring-1 ring-primary/10 shrink-0">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-medium text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
      {action && <div className="mt-auto">{action}</div>}
    </div>
  );
}

export function SectionCard({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="card-surface p-5">
      {(title || description) && (
        <div className="mb-4">
          {title && <h2 className="font-medium text-foreground">{title}</h2>}
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatusPlaceholder({
  title,
  description,
  sprint = "Coming in Sprint 2",
  icon,
}: {
  title: string;
  description: string;
  sprint?: string;
  icon?: ReactNode;
}) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <SectionCard>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {icon && (
            <div className="h-12 w-12 rounded-md bg-primary-soft text-primary grid place-items-center ring-1 ring-primary/10">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-medium text-foreground">Module Status</h2>
              <Badge variant="secondary">{sprint}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              This page is part of the application foundation. Business workflows, uploads,
              calculations, rule processing, database logic, and AI integrations are intentionally
              not enabled yet.
            </p>
          </div>
        </div>
      </SectionCard>
    </>
  );
}

export function LoadingState({ label = "Loading module" }: { label?: string }) {
  return (
    <div className="card-surface p-5 space-y-3" aria-label={label}>
      <Skeleton className="h-5 w-48" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export function SearchBar({
  placeholder = "Search",
  value,
  onChange,
}: {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="relative w-full">
      <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className="pl-9"
      />
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
      {icon && (
        <div className="mx-auto h-12 w-12 rounded-full bg-primary-soft text-primary grid place-items-center mb-4 ring-1 ring-primary/10">
          {icon}
        </div>
      )}
      <div className="font-medium text-foreground">{title}</div>
      {description && (
        <div className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">{description}</div>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
