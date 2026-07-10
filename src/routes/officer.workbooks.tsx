import { createFileRoute } from "@tanstack/react-router";
import { FileCog } from "lucide-react";
import { StatusPlaceholder } from "@/components/rail/common";

export const Route = createFileRoute("/officer/workbooks")({
  component: WorkbookManagementPage,
});

function WorkbookManagementPage() {
  return (
    <StatusPlaceholder
      title="Workbook Management"
      description="This module will allow officers to govern Excel workbooks after workbook reading is approved."
      icon={<FileCog className="h-5 w-5" />}
    />
  );
}
