import { createFileRoute } from "@tanstack/react-router";
import { Bot } from "lucide-react";
import { StatusPlaceholder } from "@/components/rail/common";

export const Route = createFileRoute("/employee/assistant")({
  component: PensionAssistantPage,
});

function PensionAssistantPage() {
  return (
    <StatusPlaceholder
      title="Railway Pension Assistant"
      description="This module will provide guided pension and settlement assistance after knowledge and AI features are approved."
      icon={<Bot className="h-5 w-5" />}
    />
  );
}
