import { createFileRoute } from "@tanstack/react-router";
import { Database } from "lucide-react";
import { StatusPlaceholder } from "@/components/rail/common";

export const Route = createFileRoute("/officer/knowledge")({
  component: KnowledgeBasePage,
});

function KnowledgeBasePage() {
  return (
    <StatusPlaceholder
      title="Knowledge Base"
      description="This module will organize approved source knowledge before indexing or AI integration is implemented."
      icon={<Database className="h-5 w-5" />}
    />
  );
}
