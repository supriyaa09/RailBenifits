import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { StatusPlaceholder } from "@/components/rail/common";

export const Route = createFileRoute("/officer/benefits")({
  component: BenefitManagementPage,
});

function BenefitManagementPage() {
  return (
    <StatusPlaceholder
      title="Benefit Management"
      description="This module will allow officers to maintain benefit definitions in a future sprint."
      icon={<Wallet className="h-5 w-5" />}
    />
  );
}
