import { createFileRoute } from "@tanstack/react-router";
import { FileCog } from "lucide-react";
import { StatusPlaceholder } from "@/components/rail/common";

export const Route = createFileRoute("/officer/workbooks")({
  component: WorkbookManagementPage,
});

function WorkbookManagementPage() {
  return (
    <StatusPlaceholder
      title="Formula Management"
      description="This module will allow officers to govern formula parameters and rule logic rules dynamically."
      icon={<FileCog className="h-5 w-5" />}
    />
  );
}
