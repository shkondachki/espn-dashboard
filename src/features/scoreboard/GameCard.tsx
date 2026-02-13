import { Typography, Chip } from "@mui/material";
import type { ESPNEvent } from "@/types/api";
import { StyledCard } from "@/components/StyledCard";
import { formatGameStatus, getStatusColor } from "@/utils/gameStatus";

interface GameCardProps {
  event: ESPNEvent;
  onClick?: () => void;
}

function getCompetitorsAndStatus(event: ESPNEvent) {
  const comp = event.competitions?.[0];

  if (!comp) return { away: null, home: null, status: "", statusColor: "default" as const };

  // ESPN API returns competitors as [away, home]
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

export function GameCard({ event, onClick }: GameCardProps) {
  const { away, home, status, statusColor } = getCompetitorsAndStatus(event);

  return (
    <StyledCard
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) =>
        e.key === "Enter" ? onClick?.() : undefined
      }
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {away && home ? (
        <>
          <Typography variant="body1" fontWeight={600}>
            {away.team.displayName} {away.score != null ? ` ${away.score}` : ""}
          </Typography>
          <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
            {home.team.displayName} {home.score != null ? ` ${home.score}` : ""}
          </Typography>
          {status && (
            <Chip
              label={status}
              color={statusColor}
              size="small"
              sx={{ mt: 1 }}
            />
          )}
        </>
      ) : (
        <Typography variant="body2">{event.shortName || event.name}</Typography>
      )}
    </StyledCard>
  );
}