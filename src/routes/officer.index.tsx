import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Bot,
  Database,
  FileCog,
  ScrollText,
  Settings,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { DashboardCard, PageHeader } from "@/components/rail/common";

export const Route = createFileRoute("/officer/")({
  component: OfficerDashboard,
});

const cards = [
  {
    title: "Circular Management",
    description: "Maintain the administrative shell for circular records and references.",
    to: "/officer/circulars",
    icon: ScrollText,
  },
  {
    title: "Workbook Management",
    description: "Prepare the workspace for settlement workbook governance in a future sprint.",
    to: "/officer/workbooks",
    icon: FileCog,
  },
  {
    title: "Rule Management",
    description: "Review the planned rule management area before rule engine implementation begins.",
    to: "/officer/rules",
    icon: ShieldCheck,
  },
  {
    title: "Benefit Management",
    description: "Organize the benefit management shell without enabling benefit logic yet.",
    to: "/officer/benefits",
    icon: Wallet,
  },
  {
    title: "Knowledge Base",
    description: "Prepare the knowledge base section before indexing, uploads, or AI integrations.",
    to: "/officer/knowledge",
    icon: Database,
  },
  {
    title: "Activity Logs",
    description: "Provide a placeholder audit area for future administrative activity tracking.",
    to: "/officer/logs",
    icon: Activity,
  },
  {
    title: "Configuration",
    description: "Reserve the configuration area for future officer portal settings.",
    to: "/officer/configuration",
    icon: Settings,
  },
  {
    title: "AI Management",
    description: "Reserve the AI management console until AI services are approved for implementation.",
    to: "/officer/ai",
    icon: Bot,
  },
];

function OfficerDashboard() {
  return (
    <>
      <PageHeader
        title="Officer Dashboard"
        description="A compact government administration shell for managing RailAssist foundation modules."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <DashboardCard
            key={card.title}
            title={card.title}
            description={card.description}
            icon={<card.icon className="h-5 w-5" />}
            action={
              <Link to={card.to} className="text-sm font-medium text-primary inline-flex items-center gap-2">
                Open module
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
        ))}
      </div>
    </>
  );
}
