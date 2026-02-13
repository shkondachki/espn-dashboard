// Convert ESPN API status codes to user-friendly text
export function formatGameStatus(
  statusName: string,
  displayClock?: string,
): string {
  const statusMap: Record<string, string> = {
    STATUS_SCHEDULED: "Scheduled",
    STATUS_IN_PROGRESS: displayClock || "Live",
    STATUS_HALFTIME: "Halftime",
    STATUS_END_PERIOD: "End of Period",
    STATUS_FINAL: "Final",
    STATUS_FULL_TIME: "Full Time",
    STATUS_DELAYED: "Delayed",
    STATUS_POSTPONED: "Postponed",
    COMPLETED: "Final",
  };

  return statusMap[statusName] || statusName;
}

// Assign color based on game state
export function getStatusColor(
  statusName: string,
): "default" | "success" | "error" | "warning" | "info" {
  if (
    statusName.includes("FINAL") ||
    statusName === "COMPLETED" ||
    statusName.includes("FULL_TIME")
  ) {
    return "default";
  }
  if (statusName.includes("IN_PROGRESS")) return "success";
  if (statusName.includes("HALFTIME") || statusName.includes("END_PERIOD"))
    return "warning";
  if (statusName.includes("DELAYED") || statusName.includes("POSTPONED"))
    return "error";
  return "info"; // Scheduled games
}
