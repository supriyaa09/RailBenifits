import { createFileRoute } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { StatusPlaceholder } from "@/components/rail/common";

export const Route = createFileRoute("/officer/logs")({
  component: ActivityLogsPage,
});

function ActivityLogsPage() {
  return (
    <StatusPlaceholder
      title="Activity Logs"
      description="This module will display officer activity and audit logs after backend logging is implemented."
      icon={<Activity className="h-5 w-5" />}
    />
  );
}
