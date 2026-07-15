import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Bell, Moon, Search, Sun, User } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { RailSidebar } from "./sidebar";

type ThemeMode = "light" | "dark";

const themeStorageKeyPrefix = "railassist:theme";

function crumbLabel(seg: string) {
  const map: Record<string, string> = {
    employee: "Employee",
    officer: "Officer",
    benefits: "Settlement Assessment",
    result: "Settlement Results",
    reports: "My Settlement Reports",
    assistant: "Railway Pension Assistant",
    schemes: "Railway Schemes",
    circulars: "Circular Library",
    faqs: "FAQs",
    rules: "Rule Management",
    workbooks: "Workbook Management",
    knowledge: "Knowledge Base",
    configuration: "Configuration",
    ai: "AI Management",
    logs: "Activity Logs",
  };
  return map[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1);
}

export function RailShell({ role }: { role: "employee" | "officer" }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const segs = pathname.split("/").filter(Boolean);
  const isOfficer = role === "officer";
  const roleThemeStorageKey = `${themeStorageKeyPrefix}:${role}`;
  const defaultTheme: ThemeMode = isOfficer ? "dark" : "light";
  const [theme, setTheme] = useState<ThemeMode>(defaultTheme);
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(roleThemeStorageKey);
    setTheme(savedTheme === "dark" || savedTheme === "light" ? savedTheme : defaultTheme);
    setThemeLoaded(true);
  }, [defaultTheme, roleThemeStorageKey]);

  useEffect(() => {
    if (!themeLoaded) return;
    window.localStorage.setItem(roleThemeStorageKey, theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("theme-dark", theme === "dark");
    document.documentElement.classList.toggle("theme-light", theme === "light");
    document.documentElement.dataset.theme = theme;
  }, [roleThemeStorageKey, theme, themeLoaded]);

  const isDarkMode = theme === "dark";

  return (
    <SidebarProvider>
      <div className={`${isDarkMode ? "dark theme-dark" : "theme-light"} min-h-screen flex w-full bg-background text-foreground`}>
        <RailSidebar role={role} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-3 border-b border-border bg-card/90 backdrop-blur px-3 sticky top-0 z-30 shadow-soft">
            <SidebarTrigger />
            <div className="hidden md:flex items-center gap-2 max-w-sm w-full">
              <div className="relative w-full">
                <Search className="h-4 w-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Search modules, circulars, rules..."
                  className="h-9 w-full pl-8 pr-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTheme(isDarkMode ? "light" : "dark")}
                className="h-9 rounded-md hover:bg-primary/5 inline-flex items-center gap-2 px-2.5 text-muted-foreground border border-transparent hover:border-primary/10"
                aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
                title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="hidden text-xs font-medium sm:inline">{isDarkMode ? "Light" : "Dark"}</span>
              </button>
              <button
                className="h-9 w-9 rounded-md hover:bg-primary/5 grid place-items-center text-muted-foreground border border-transparent hover:border-primary/10"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
              </button>
              <div className="h-9 pl-2 pr-3 flex items-center gap-2 rounded-md border border-input bg-background shadow-soft">
                <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground grid place-items-center ring-1 ring-primary/10">
                  <User className="h-3.5 w-3.5" />
                </div>
                <div className="text-xs leading-tight">
                  <div className="font-medium">{isOfficer ? "Officer Portal" : "Employee Portal"}</div>
                  <div className="text-muted-foreground">{isOfficer ? "SCR/HQ Admin" : "SCR/HQ Employee"}</div>
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
            <span>(c) {new Date().getFullYear()} South Central Railway - RailAssist Advisory System</span>
            <span>Application foundation - no business processing enabled</span>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}

export const AppLayout = RailShell;
