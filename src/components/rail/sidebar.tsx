import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BookOpen,
  Bot,
  ClipboardCheck,
  Database,
  FileCog,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  ScrollText,
  Settings,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Brand, INDIAN_RAILWAYS_LOGO } from "./common";

const employeeNav = [
  { title: "Dashboard", to: "/employee", icon: LayoutDashboard, exact: true },
  { title: "Settlement Assessment", to: "/employee/benefits", icon: ClipboardCheck },
  { title: "Settlement Results", to: "/employee/result", icon: ShieldCheck },
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
          <img
            src={INDIAN_RAILWAYS_LOGO}
            alt="Indian Railways"
            className="mx-auto h-10 w-10 object-contain"
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{role === "officer" ? "Administration" : "Employee Services"}</SidebarGroupLabel>
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
            <SidebarMenuButton asChild tooltip="Switch portal">
              <Link to="/" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>Switch portal</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export const AppSidebar = RailSidebar;
