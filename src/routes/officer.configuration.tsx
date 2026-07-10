import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { StatusPlaceholder } from "@/components/rail/common";

export const Route = createFileRoute("/officer/configuration")({
  component: ConfigurationPage,
});

function ConfigurationPage() {
  return (
    <StatusPlaceholder
      title="Configuration"
      description="This module will allow officers to configure portal behavior and administrative preferences."
      icon={<Settings className="h-5 w-5" />}
    />
  );
}
