import { Typography, Box } from "@mui/material";
import type { ESPNTeam } from "@/types/api";

interface TeamDetailContentProps {
  team: ESPNTeam;
}

export function TeamDetailContent({ team }: TeamDetailContentProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {team.displayName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {team.location} {team.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        Abbreviation: {team.abbreviation}
      </Typography>
      {team.links?.length ? (
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Links: {team.links.map((l) => l.text).join(", ")}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
}
