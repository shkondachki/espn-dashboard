import { Box } from "@mui/material";
import type { ESPNEvent } from "@/types/api";
import { GameCard } from "./GameCard";

interface ScoreboardListProps {
  events: ESPNEvent[];
  onSelectGame?: (gameId: string) => void;
}

export function ScoreboardList({ events, onSelectGame }: ScoreboardListProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
      }}
    >
      {events.map((event) => (
        <GameCard
          key={event.id}
          event={event}
          onClick={() => onSelectGame?.(event.id)}
        />
      ))}
    </Box>
  );
}
