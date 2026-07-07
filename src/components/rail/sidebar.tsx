import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ClipboardCheck,
  Bot,
  BookOpen,
  FileText,
  HelpCircle,
  ShieldCheck,
  Wallet,
  ScrollText,
  Files,
  Database,
  Activity,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Brand } from "./common";

const employeeNav = [
  { title: "Dashboard", to: "/employee", icon: LayoutDashboard, exact: true },
  { title: "Check Benefits", to: "/employee/benefits", icon: ClipboardCheck },
  { title: "AI Assistant", to: "/employee/assistant", icon: Bot },
  { title: "Railway Schemes", to: "/employee/schemes", icon: BookOpen },
  { title: "Circular Library", to: "/employee/circulars", icon: FileText },
  { title: "FAQs", to: "/employee/faqs", icon: HelpCircle },
];

const officerNav = [
  { title: "Dashboard", to: "/officer", icon: LayoutDashboard, exact: true },
  { title: "Benefits", to: "/officer/benefits", icon: Wallet },
  { title: "Rules", to: "/officer/rules", icon: ShieldCheck },
  { title: "Circulars", to: "/officer/circulars", icon: ScrollText },
  { title: "AI Knowledge Base", to: "/officer/knowledge", icon: Database },
  { title: "Uploaded Documents", to: "/officer/documents", icon: Files },
  { title: "System Logs", to: "/officer/logs", icon: Activity },
];

export function RailSidebar({ role }: { role: "employee" | "officer" }) {
  const items = role === "employee" ? employeeNav : officerNav;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-4 border-b">
        {!collapsed ? (
          <Brand subtitle={role === "officer" ? "Officer Portal" : "Employee Portal"} />
        ) : (
          <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground grid place-items-center mx-auto">
            <span className="text-xs font-bold">RA</span>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{role === "officer" ? "Administration" : "Menu"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to, item.exact)} tooltip={item.title}>
                    <Link to={item.to} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Switch role">
              <Link to="/" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>Switch role</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
