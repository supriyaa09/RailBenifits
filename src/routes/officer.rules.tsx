import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { StatusPlaceholder } from "@/components/rail/common";

export const Route = createFileRoute("/officer/rules")({
  component: RuleManagementPage,
});

function RuleManagementPage() {
  return (
    <StatusPlaceholder
      title="Rule Management"
      description="This module will allow officers to manage eligibility rules after the Rule Engine is introduced."
      icon={<ShieldCheck className="h-5 w-5" />}
    />
  );
}
