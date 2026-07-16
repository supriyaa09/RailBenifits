import { Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  Moon,
  Search,
  Sun,
  LayoutDashboard,
  ClipboardCheck,
  FileSpreadsheet,
  FileText,
  Bot,
  BadgeIndianRupee,
  Library,
  CircleHelp,
  ShieldCheck,
  Wallet,
  ScrollText,
  FileCog,
  Database,
  Settings,
  Activity,
  LogOut,
  Menu,
  X,
  UserCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Brand, INDIAN_RAILWAYS_LOGO } from "./common";

type ThemeMode = "light" | "dark";

const themeStorageKeyPrefix = "railassist:theme";

const employeeNav = [
  { title: "Dashboard", to: "/employee", icon: LayoutDashboard, exact: true },
  { title: "Settlement Assessment", to: "/employee/benefits", icon: ClipboardCheck },
  { title: "Settlement Results", to: "/employee/result", icon: FileSpreadsheet },
  { title: "My Settlement Reports", to: "/employee/reports", icon: FileText },
  { title: "Railway Knowledge Assistant", to: "/employee/assistant", icon: Bot },
];

const officerNav = [
  { title: "Dashboard", to: "/officer", icon: LayoutDashboard, exact: true },
  { title: "Pension Rules", to: "/officer/rules", icon: ShieldCheck },
  { title: "Formula Library", to: "/officer/formulas", icon: FileCog },
  { title: "Settlement Benefits", to: "/officer/benefits", icon: Wallet },
  { title: "Document Repository", to: "/officer/documents", icon: ScrollText },
  { title: "Railway Knowledge Base", to: "/officer/knowledge", icon: Database },
  { title: "System Configuration", to: "/officer/configuration", icon: Settings },
];

export function RailShell({ role }: { role: "employee" | "officer" }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const isOfficer = role === "officer";
  const roleThemeStorageKey = `${themeStorageKeyPrefix}:${role}`;
  const defaultTheme: ThemeMode = isOfficer ? "dark" : "light";
  const [theme, setTheme] = useState<ThemeMode>(defaultTheme);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (isOfficer) {
      navigate({ to: "/officer/knowledge", search: { q: searchQuery } as any });
    } else {
      navigate({ to: "/employee/assistant", search: { q: searchQuery } as any });
    }
  };

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

  // Close mobile menu on path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isDarkMode = theme === "dark";
  const items = isOfficer ? officerNav : employeeNav;

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <div className={`${isDarkMode ? "dark theme-dark" : "theme-light"} min-h-screen flex flex-col w-full bg-background text-foreground`}>
      {/* Premium Government Top Header Bar */}
      <header className="border-b border-border bg-card/90 backdrop-blur sticky top-0 z-30 shadow-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo and Brand Title Info */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3 group shrink-0">
                <img
                  src={INDIAN_RAILWAYS_LOGO}
                  alt="Indian Railways"
                  className="h-10 w-10 shrink-0 object-contain group-hover:scale-105 transition-transform"
                />
                <div className="leading-tight">
                  <div className="font-semibold text-lg tracking-tight text-primary flex items-center gap-1.5">
                    RailAssist
                    <span className="text-[10px] bg-primary-soft text-primary px-1.5 py-0.5 rounded border border-primary/20 uppercase font-bold tracking-wider">
                      {isOfficer ? "Admin" : "Employee"}
                    </span>
                  </div>
                  <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider hidden sm:block">
                    South Central Railway Headquarters
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center gap-2 max-w-xs w-full">
              <div className="relative w-full">
                <Search className="h-4 w-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isOfficer ? "Search rules, formulas, benefits..." : "Search rules, circulars..."}
                  className="h-9 w-full pl-8 pr-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40 transition-shadow"
                />
              </div>
            </form>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2">
              {/* Dark/Light Mode Theme Toggle */}
              <button
                type="button"
                onClick={() => setTheme(isDarkMode ? "light" : "dark")}
                className="h-9 w-9 md:w-auto md:px-3 rounded-md hover:bg-primary-soft/40 hover:text-primary flex items-center justify-center gap-2 text-muted-foreground border border-transparent hover:border-primary/10 transition-colors"
                aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
                title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              >
                {isDarkMode ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4" />}
                <span className="hidden text-xs font-semibold md:inline">{isDarkMode ? "Light" : "Dark"}</span>
              </button>

              {/* Notifications */}
              <button
                className="h-9 w-9 rounded-md hover:bg-primary-soft/40 hover:text-primary flex items-center justify-center text-muted-foreground border border-transparent hover:border-primary/10 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
              </button>

              {/* Profile Card */}
              <div className="hidden lg:flex h-9 pl-2 pr-3 items-center gap-2 rounded-md border border-input bg-background shadow-soft select-none">
                <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground grid place-items-center ring-1 ring-primary/10">
                  <UserCircle className="h-4 w-4" />
                </div>
                <div className="text-left text-[10px] leading-tight">
                  <div className="font-bold text-foreground">{isOfficer ? "Officer Portal" : "Employee Portal"}</div>
                  <div className="text-muted-foreground">{isOfficer ? "SCR/HQ Admin" : "SCR/HQ Employee"}</div>
                </div>
              </div>

              {/* Portal Switch (LogOut) */}
              <Link
                to="/"
                className="h-9 px-3 rounded-md border border-border hover:border-destructive/20 hover:bg-destructive/5 text-muted-foreground hover:text-destructive flex items-center gap-1.5 text-xs font-semibold transition-colors"
                title="Switch Portal Role"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Switch Portal</span>
              </Link>

              {/* Mobile Hamburger Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-9 w-9 rounded-md hover:bg-primary-soft/40 hover:text-primary flex items-center justify-center text-muted-foreground border border-transparent hover:border-primary/10 md:hidden transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links Row */}
        <div className="hidden md:block border-t border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 py-1.5 overflow-x-auto scrollbar-none" aria-label="Global Navigation">
              {items.map((item) => {
                const active = isActive(item.to, item.exact);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-md border border-transparent transition-all select-none whitespace-nowrap ${
                      active
                        ? "bg-primary-soft/60 text-primary border-primary/20 shadow-soft"
                        : "text-muted-foreground hover:text-primary hover:bg-primary-soft/20"
                    }`}
                  >
                    <item.icon className={`h-4 w-4 shrink-0 ${active ? "text-primary" : "text-muted-foreground"}`} />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-20 flex flex-col md:hidden bg-card/95 backdrop-blur border-b border-border shadow-elevated">
          {/* Mobile Search input */}
          <form onSubmit={handleSearchSubmit} className="p-4 border-b">
            <div className="relative w-full">
              <Search className="h-4 w-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isOfficer ? "Search rules, formulas..." : "Search rules, circulars..."}
                className="h-9 w-full pl-8 pr-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </form>
          {/* List of Mobile Nav Links */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1" aria-label="Mobile Navigation">
            {items.map((item) => {
              const active = isActive(item.to, item.exact);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-lg border border-transparent transition-all ${
                    active
                      ? "bg-primary-soft/80 text-primary border-primary/20"
                      : "text-muted-foreground hover:bg-primary-soft/10 hover:text-primary"
                  }`}
                >
                  <item.icon className={`h-5 w-5 shrink-0 ${active ? "text-primary" : "text-muted-foreground"}`} />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t flex items-center justify-between bg-muted/20">
            <div className="flex items-center gap-2">
              <UserCircle className="h-5 w-5 text-primary" />
              <span className="text-xs font-bold text-foreground">
                {isOfficer ? "Officer Admin" : "Employee Portal"}
              </span>
            </div>
            <Link
              to="/"
              className="flex items-center gap-1 text-xs font-bold text-destructive hover:underline"
            >
              <LogOut className="h-4 w-4" />
              Switch Portal
            </Link>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={INDIAN_RAILWAYS_LOGO} alt="IR" className="h-5 w-5 object-contain" />
            <span>&copy; {new Date().getFullYear()} South Central Railway - RailAssist HQ</span>
          </div>
          <span>Official Portal for Settlement Advisory & Benefits Administration</span>
        </div>
      </footer>
    </div>
  );
}

export const AppLayout = RailShell;
