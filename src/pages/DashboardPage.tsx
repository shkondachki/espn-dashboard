import { useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useScoreboard } from '@/hooks/useScoreboard';
import { QueryStates } from '@/components/QueryStates';
import { ScoreboardList } from '@/features/scoreboard/ScoreboardList';
import { GameDetailDrawer } from '@/features/scoreboard/GameDetailDrawer';

export function DashboardPage() {
  const league = useAppSelector((s) => s.league.selectedLeague);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const { data, isLoading, isError, error, refetch } = useScoreboard(league);

  const isEmpty = !isLoading && !isError && (!data?.events || data.events.length === 0);
  const openGame = useCallback((gameId: string) => setSelectedGameId(gameId), []);
  const closeGame = useCallback(() => setSelectedGameId(null), []);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" gutterBottom>
        Scoreboard
      </Typography>
      <QueryStates
        isLoading={isLoading}
        isError={isError}
        error={error ?? null}
        isEmpty={isEmpty}
        emptyMessage="No games scheduled or available for this league."
        onRetry={() => refetch()}
      >
        {data?.events && (
          <ScoreboardList
            events={data.events}
            league={league}
            onSelectGame={openGame}
          />
        )}
      </QueryStates>
      <GameDetailDrawer
        league={league}
        gameId={selectedGameId}
        onClose={closeGame}
      />
    </Box>
  );
}
