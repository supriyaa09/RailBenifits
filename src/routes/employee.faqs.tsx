import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle } from "lucide-react";
import { StatusPlaceholder } from "@/components/rail/common";

export const Route = createFileRoute("/employee/faqs")({
  component: FaqPage,
});

function FaqPage() {
  return (
    <StatusPlaceholder
      title="FAQs"
      description="This module will provide frequently asked questions about Railway pension and settlement advisory workflows."
      icon={<HelpCircle className="h-5 w-5" />}
    />
  );
}
