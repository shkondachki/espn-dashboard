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

export type StatusColor = "default" | "success" | "error" | "warning" | "info";

const STATUS_COLOR_RULES: Array<{ color: StatusColor; matches: (statusName: string) => boolean; }> = [
  {
    color: "default",
    matches: (s) =>
      s.includes("FINAL") ||
      s === "COMPLETED" ||
      s.includes("FULL_TIME"),
  },
  {
    color: "success",
    matches: (s) => s.includes("IN_PROGRESS")
  },
  {
    color: "warning",
    matches: (s) => s.includes("HALFTIME") || s.includes("END_PERIOD"),
  },
  {
    color: "error",
    matches: (s) => s.includes("DELAYED") || s.includes("POSTPONED"),
  },
];

/** Assign MUI color for chip based on game state. */
export function getStatusColor(statusName: string): StatusColor {
  return (
    STATUS_COLOR_RULES.find((rule) => rule.matches(statusName))?.color ??
    "info"
  );
}
