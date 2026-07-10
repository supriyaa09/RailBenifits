import { createFileRoute } from "@tanstack/react-router";
import { ScrollText } from "lucide-react";
import { StatusPlaceholder } from "@/components/rail/common";

export const Route = createFileRoute("/officer/circulars")({
  component: CircularManagementPage,
});

function CircularManagementPage() {
  return (
    <StatusPlaceholder
      title="Circular Management"
      description="This module will allow officers to manage circular metadata and source documents in a future sprint."
      icon={<ScrollText className="h-5 w-5" />}
    />
  );
}
