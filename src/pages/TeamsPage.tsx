import { useState, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useTeams } from "@/hooks/useTeams";
import { QueryStates } from "@/components/QueryStates";
import { TeamsList } from "@/features/teams/TeamsList";
import { TeamDetailDrawer } from "@/features/teams/TeamDetailDrawer";

export function TeamsPage() {
  const league = useAppSelector((s) => s.league.selectedLeague);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const { data, isLoading, isError, error, refetch } = useTeams(league);

  const teams =
    data?.sports?.[0]?.leagues?.[0]?.teams?.map((t) => t.team) ?? [];
  const isEmpty = !isLoading && !isError && teams.length === 0;
  const openTeam = useCallback(
    (teamId: string) => setSelectedTeamId(teamId),
    [],
  );
  const closeTeam = useCallback(() => setSelectedTeamId(null), []);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" gutterBottom>
        Teams
      </Typography>
      <QueryStates
        isLoading={isLoading}
        isError={isError}
        error={error ?? null}
        isEmpty={isEmpty}
        emptyMessage="No teams found for this league."
        onRetry={() => refetch()}
      >
        {teams.length > 0 && (
          <TeamsList teams={teams} onSelectTeam={openTeam} />
        )}
      </QueryStates>
      <TeamDetailDrawer
        league={league}
        teamId={selectedTeamId}
        onClose={closeTeam}
      />
    </Box>
  );
}
