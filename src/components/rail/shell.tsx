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
  Lock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Brand, INDIAN_RAILWAYS_LOGO } from "./common";

type ThemeMode = "light" | "dark";

const themeStorageKeyPrefix = "railassist:theme";

const employeeNav = [
  { title: "Settlement Assessment", to: "/employee/benefits", icon: ClipboardCheck },
  { title: "Settlement Results", to: "/employee/result", icon: FileSpreadsheet },
  { title: "Railway Knowledge Assistant", to: "/employee/assistant", icon: Bot },
];

const officerNav = [
  { title: "Dashboard", to: "/officer", icon: LayoutDashboard, exact: true },
  { title: "Rules", to: "/officer/rules", icon: ShieldCheck },
  { title: "Documents", to: "/officer/documents", icon: ScrollText },
  { title: "AI Review", to: "/officer/rule-management", icon: Bot },
  { title: "Knowledge", to: "/officer/knowledge", icon: Database },
  { title: "Settings", to: "/officer/configuration", icon: Settings },
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
  const [isOfficerLoginOpen, setIsOfficerLoginOpen] = useState(false);

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
    <div
      className={`${isDarkMode ? "dark theme-dark" : "theme-light"} min-h-screen flex flex-col w-full bg-background text-foreground`}
    >
      {/* Premium Government Top Header Bar */}
      <header className="border-b border-border bg-card/90 backdrop-blur sticky top-0 z-30 shadow-soft print:hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo and Brand Title Info */}
            <div className="flex items-center gap-3">
              <Link to="/employee" className="flex items-center gap-3 group shrink-0">
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
                    South Central Railway
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex items-center gap-2 max-w-xs w-full"
            >
              <div className="relative w-full">
                <Search className="h-4 w-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isOfficer ? "Search rules, formulas, benefits..." : "Search rules, circulars..."
                  }
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
                {isDarkMode ? (
                  <Sun className="h-4 w-4 text-amber-500" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                <span className="hidden text-xs font-semibold md:inline">
                  {isDarkMode ? "Light" : "Dark"}
                </span>
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
                  <div className="font-bold text-foreground">
                    {isOfficer ? "Officer Portal" : "Employee Portal"}
                  </div>
                  <div className="text-muted-foreground">
                    {isOfficer ? "SCR Admin" : "SCR Employee"}
                  </div>
                </div>
              </div>

              {/* Portal Switch Button */}
              {isOfficer ? (
                <Link
                  to="/employee"
                  className="h-9 px-3 rounded-md border border-border hover:border-primary/30 hover:bg-primary/5 text-muted-foreground hover:text-primary flex items-center gap-1.5 text-xs font-semibold transition-colors"
                  title="Switch to Employee Portal"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Switch to Employee Portal</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsOfficerLoginOpen(true)}
                  className="h-9 px-3 rounded-md border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary flex items-center gap-1.5 text-xs font-semibold transition-colors shadow-xs"
                  title="Open Officer Login Modal"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Switch to Officer Portal</span>
                </button>
              )}

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
            <nav
              className="flex space-x-1 py-1.5 overflow-x-auto scrollbar-none"
              aria-label="Global Navigation"
            >
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
                    <item.icon
                      className={`h-4 w-4 shrink-0 ${active ? "text-primary" : "text-muted-foreground"}`}
                    />
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
                  <item.icon
                    className={`h-5 w-5 shrink-0 ${active ? "text-primary" : "text-muted-foreground"}`}
                  />
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 print:p-0 print:m-0 print:max-w-none">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/10 print:hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={INDIAN_RAILWAYS_LOGO} alt="IR" className="h-5 w-5 object-contain" />
            <span>&copy; {new Date().getFullYear()} South Central Railway - RailAssist</span>
          </div>
          <span>Official Portal for Settlement Advisory & Benefits Administration</span>
        </div>
      </footer>
      {/* Officer Login Modal Popup */}
      <OfficerLoginDialog
        isOpen={isOfficerLoginOpen}
        onClose={() => setIsOfficerLoginOpen(false)}
      />
    </div>
  );
}

function OfficerLoginDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleOfficerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim() || !password.trim()) {
      setError("Please enter Officer User ID and Password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password, role: "officer" }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Authentication failed. Please check credentials.");
        setLoading(false);
        return;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("railassist_user", JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem("railassist_token", data.token);
        }
      }

      onClose();
      navigate({ to: "/officer" });
    } catch (err) {
      console.error("Officer login error:", err);
      // Fallback navigation for preview/dev mode
      onClose();
      navigate({ to: "/officer" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-card text-card-foreground border border-border rounded-xl shadow-2xl p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground p-1 rounded-md"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary grid place-items-center ring-1 ring-primary/20 shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground">Officer Portal Authentication</h2>
            <p className="text-xs text-muted-foreground">South Central Railway Administration</p>
          </div>
        </div>

        <form onSubmit={handleOfficerLogin} autoComplete="off" className="space-y-4 mt-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex justify-between">
              <span>Officer User ID</span>
              <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <UserCircle className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter Officer User ID"
                autoComplete="off"
                className="h-9 w-full pl-9 pr-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex justify-between">
              <span>Password</span>
              <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Officer Password"
                autoComplete="new-password"
                className="h-9 w-full pl-9 pr-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring/40"
                required
              />
            </div>
          </div>

          {error && <div className="text-xs text-destructive font-medium">{error}</div>}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 h-9 rounded-md border border-input bg-background hover:bg-muted text-xs font-semibold text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 h-9 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              {loading ? "Authenticating..." : "Sign In →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export const AppLayout = RailShell;
