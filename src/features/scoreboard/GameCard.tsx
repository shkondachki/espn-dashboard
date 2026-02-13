import { Typography, Chip } from "@mui/material";
import type { ESPNEvent } from "@/types/api";
import { StyledCard } from "@/components/StyledCard";
import { getCompetitorsAndStatus } from "@/utils/event";

interface GameCardProps {
  event: ESPNEvent;
  onClick?: () => void;
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
