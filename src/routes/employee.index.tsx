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
    title: "Railway Schemes",
    description: "Browse pension and settlement scheme information prepared for railway employees.",
    to: "/employee/schemes",
    icon: BookOpen,
  },
  {
    title: "Circular Library",
    description: "Find circulars, references, and administrative guidance in a searchable library.",
    to: "/employee/circulars",
    icon: ScrollText,
  },
  {
    title: "Railway Pension Assistant",
    description: "Access the pension assistant area after knowledge and AI integrations are introduced.",
    to: "/employee/assistant",
    icon: Bot,
  },
  {
    title: "FAQs",
    description: "Read common questions and answers about settlement and pension advisory workflows.",
    to: "/employee/faqs",
    icon: HelpCircle,
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
