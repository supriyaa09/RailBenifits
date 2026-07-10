import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { StatusPlaceholder } from "@/components/rail/common";

export const Route = createFileRoute("/officer/documents")({
  component: DocumentsPage,
});

function DocumentsPage() {
  return (
    <StatusPlaceholder
      title="Document Library"
      description="This legacy route is preserved as a placeholder while the officer portal uses Circular and Workbook Management."
      icon={<FileText className="h-5 w-5" />}
    />
  );
}
