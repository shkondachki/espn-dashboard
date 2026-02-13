import { Typography, Box, Divider } from "@mui/material";
import type { GameSummaryResponse } from "@/types/api";

interface GameDetailContentProps {
  data: GameSummaryResponse;
}

export function GameDetailContent({ data }: GameDetailContentProps) {
  const header = data.header;
  if (!header?.competitions?.[0]) {
    return (
      <Typography color="text.secondary">No details available.</Typography>
    );
  }

  const comp = header.competitions[0];
  const competitors = comp.competitors ?? [];
  const venue = comp.venue?.fullName;
  const status = comp.status?.type?.name ?? comp.status?.displayClock ?? "";

  return (
    <Box>
      {competitors.map((c) => (
        <Box key={c.id} sx={{ py: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {c.team.displayName} {c.score != null ? ` — ${c.score}` : ""}
          </Typography>
          {c.records?.[0] && (
            <Typography variant="caption" color="text.secondary">
              {c.records[0].summary}
            </Typography>
          )}
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      {venue && (
        <Typography variant="body2" color="text.secondary">
          Venue: {venue}
        </Typography>
      )}
      {status && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Status: {status}
        </Typography>
      )}
    </Box>
  );
}
