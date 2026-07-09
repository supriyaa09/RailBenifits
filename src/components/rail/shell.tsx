import { Outlet, useRouterState, Link } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { RailSidebar } from "./sidebar";
import { Bell, Search, User } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function crumbLabel(seg: string) {
  const map: Record<string, string> = {
    employee: "Employee",
    officer: "Officer",
    benefits: "Benefits",
    result: "Result",
    assistant: "AI Assistant",
    schemes: "Railway Schemes",
    circulars: "Circulars",
    faqs: "FAQs",
    rules: "Rules",
    knowledge: "Knowledge Base",
    documents: "Documents",
    logs: "System Logs",
  };
  return map[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1);
}

export function RailShell({ role }: { role: "employee" | "officer" }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const segs = pathname.split("/").filter(Boolean);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[linear-gradient(180deg,rgba(239,246,255,0.95),rgba(255,255,255,1)_24%,rgba(248,251,255,1))]">
        <RailSidebar role={role} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-3 border-b border-primary/10 bg-white/80 backdrop-blur px-3 sticky top-0 z-30 shadow-[0_1px_0_rgba(37,99,235,0.04)]">
            <SidebarTrigger />
            <div className="hidden md:flex items-center gap-2 max-w-sm w-full">
              <div className="relative w-full">
                <Search className="h-4 w-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Search benefits, rules, circulars…"
                  className="h-9 w-full pl-8 pr-3 rounded-md border border-input bg-white text-sm outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="h-9 w-9 rounded-md hover:bg-primary/5 grid place-items-center text-muted-foreground border border-transparent hover:border-primary/10" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </button>
              <div className="h-9 pl-2 pr-3 flex items-center gap-2 rounded-md border border-input bg-white shadow-soft">
                <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground grid place-items-center ring-1 ring-primary/10">
                  <User className="h-3.5 w-3.5" />
                </div>
                <div className="text-xs leading-tight">
                  <div className="font-medium">{role === "officer" ? "Officer Rao" : "R. Kumar"}</div>
                  <div className="text-muted-foreground">{role === "officer" ? "Admin" : "Employee · SCR/HQ"}</div>
                </div>
              </div>
            </div>
          </header>

          <div className="px-4 md:px-8 py-4">
            <Breadcrumb>
              <BreadcrumbList>
                {segs.map((s, i) => {
                  const href = "/" + segs.slice(0, i + 1).join("/");
                  const isLast = i === segs.length - 1;
                  return (
                    <div key={href} className="flex items-center gap-2">
                      {i > 0 && <BreadcrumbSeparator />}
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{crumbLabel(s)}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link to={href}>{crumbLabel(s)}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </div>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <main className="flex-1 px-4 md:px-8 pb-10">
            <Outlet />
          </main>

          <footer className="border-t px-4 md:px-8 py-4 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
            <span>© {new Date().getFullYear()} South Central Railway · RailAssist Advisory System</span>
            <span>Rule-Based Decision Support · Not an HRMS</span>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
