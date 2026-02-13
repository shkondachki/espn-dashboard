import type { LeagueSlug } from "@/types/league";
import { useGameSummary } from "@/hooks/useGameSummary";
import { DetailDrawer } from "@/components/DetailDrawer";
import { GameDetailContent } from "./GameDetailContent";

interface GameDetailDrawerProps {
  league: LeagueSlug;
  gameId: string | null;
  onClose: () => void;
}

export function GameDetailDrawer({
  league,
  gameId,
  onClose,
}: GameDetailDrawerProps) {
  const { data, isLoading, isError, error, refetch } = useGameSummary(
    league,
    gameId,
  );

  return (
    <DetailDrawer
      open={Boolean(gameId)}
      onClose={onClose}
      title="Game Details"
      isLoading={isLoading}
      isError={isError}
      error={error ?? null}
      onRetry={() => refetch()}
    >
      {data ? <GameDetailContent data={data} /> : null}
    </DetailDrawer>
  );
}
