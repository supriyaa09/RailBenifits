import { createFileRoute } from "@tanstack/react-router";
import { ScrollText } from "lucide-react";
import { StatusPlaceholder } from "@/components/rail/common";

export const Route = createFileRoute("/employee/circulars")({
  component: CircularLibraryPage,
});

function CircularLibraryPage() {
  return (
    <StatusPlaceholder
      title="Circular Library"
      description="This module will allow Railway employees to browse circulars and source references."
      icon={<ScrollText className="h-5 w-5" />}
    />
  );
}
