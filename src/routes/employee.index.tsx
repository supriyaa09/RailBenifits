import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, BookOpen, ClipboardCheck, FileText, HelpCircle, ScrollText } from "lucide-react";
import { DashboardCard, PageHeader } from "@/components/rail/common";

export const Route = createFileRoute("/employee/")({
  component: EmployeeDashboard,
});

const cards = [
  {
    title: "Start Settlement Assessment",
    description: "Begin the guided settlement assessment workflow when Sprint 2 enables forms and rules.",
    to: "/employee/benefits",
    icon: ClipboardCheck,
  },
  {
    title: "My Settlement Reports",
    description: "Review generated settlement summaries and advisory reports once reporting is enabled.",
    to: "/employee/reports",
    icon: FileText,
  },
  {
    title: "Railway Knowledge Assistant",
    description: "Access the knowledge assistant to ask AI guided pension and settlement questions.",
    to: "/employee/assistant",
    icon: Bot,
  },
];

function EmployeeDashboard() {
  return (
    <>
      <PageHeader
        title="Employee Dashboard"
        description="A readable portal shell for railway employees to access settlement and pension advisory modules."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
