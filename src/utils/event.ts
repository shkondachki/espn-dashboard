import type { ESPNCompetitor, ESPNEvent } from "@/types/api";
import { formatGameStatus, getStatusColor } from "@/utils/gameStatus";

export type CompetitorsAndStatus = {
  away: ESPNCompetitor | null;
  home: ESPNCompetitor | null;
  status: string;
  statusColor: "default" | "success" | "error" | "warning" | "info";
};

/** Derive away/home competitors and display status from an ESPN event. */
export function getCompetitorsAndStatus(
  event: ESPNEvent,
): CompetitorsAndStatus {
  const comp = event.competitions?.[0];

  if (!comp)
    return { away: null, home: null, status: "", statusColor: "default" };

  const [away, home] =
    comp.competitors?.length === 2
      ? [comp.competitors[0], comp.competitors[1]]
      : [null, null];

  const rawStatus = comp.status?.type?.name ?? "";
  const displayClock = comp.status?.displayClock;
  const status = formatGameStatus(rawStatus, displayClock);
  const statusColor = getStatusColor(rawStatus);

  return { away, home, status, statusColor };
}
