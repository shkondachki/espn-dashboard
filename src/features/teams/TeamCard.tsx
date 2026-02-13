import { Typography } from "@mui/material";
import type { ESPNTeam } from "@/types/api";
import { StyledCard } from "@/components/StyledCard";

interface TeamCardProps {
  team: ESPNTeam;
  onClick?: () => void;
}

export function TeamCard({ team, onClick }: TeamCardProps) {
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
      <Typography variant="subtitle1" fontWeight={600}>
        {team.displayName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {team.abbreviation}
      </Typography>
    </StyledCard>
  );
}
