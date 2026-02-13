import type { LeagueSlug } from "@/types/league";
import { useTeam } from "@/hooks/useTeam";
import { DetailDrawer } from "@/components/DetailDrawer";
import { TeamDetailContent } from "./TeamDetailContent";

interface TeamDetailDrawerProps {
  league: LeagueSlug;
  teamId: string | null;
  onClose: () => void;
}

export function TeamDetailDrawer({
  league,
  teamId,
  onClose,
}: TeamDetailDrawerProps) {
  const { data, isLoading, isError, error, refetch } = useTeam(league, teamId);

  return (
    <DetailDrawer
      open={Boolean(teamId)}
      onClose={onClose}
      title="Team Details"
      isLoading={isLoading}
      isError={isError}
      error={error ?? null}
      onRetry={() => refetch()}
    >
      {data?.team ? <TeamDetailContent team={data.team} /> : null}
    </DetailDrawer>
  );
}
