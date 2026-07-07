import { createFileRoute } from "@tanstack/react-router";
import { RailShell } from "@/components/rail/shell";

export const Route = createFileRoute("/employee")({
  component: () => <RailShell role="employee" />,
});
