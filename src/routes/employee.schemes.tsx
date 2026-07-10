import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { StatusPlaceholder } from "@/components/rail/common";

export const Route = createFileRoute("/employee/schemes")({
  component: SchemesPage,
});

function SchemesPage() {
  return (
    <StatusPlaceholder
      title="Railway Schemes"
      description="This module will present Railway pension, settlement, health, and welfare scheme information."
      icon={<BookOpen className="h-5 w-5" />}
    />
  );
}
