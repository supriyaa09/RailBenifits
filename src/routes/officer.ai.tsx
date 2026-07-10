import { createFileRoute } from "@tanstack/react-router";
import { Bot } from "lucide-react";
import { StatusPlaceholder } from "@/components/rail/common";

export const Route = createFileRoute("/officer/ai")({
  component: AiManagementPage,
});

function AiManagementPage() {
  return (
    <StatusPlaceholder
      title="AI Management"
      description="This module will manage AI settings and oversight after AI implementation is approved."
      icon={<Bot className="h-5 w-5" />}
    />
  );
}
