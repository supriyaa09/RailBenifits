import { createFileRoute } from "@tanstack/react-router";
import { RailShell } from "@/components/rail/shell";

export const Route = createFileRoute("/officer")({
  component: () => <RailShell role="officer" />,
});
