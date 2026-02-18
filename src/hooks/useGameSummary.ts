import { useQuery } from "@tanstack/react-query";
import type { LeagueSlug } from "@/types/league";
import { fetchGameSummary } from "@/api/espnClient";
import { queryKeys } from "@/queryKeys";

export function useGameSummary(league: LeagueSlug, gameId: string | null) {
  return useQuery({
    queryKey: queryKeys.gameSummary.detail(league, gameId),
    queryFn: () => fetchGameSummary(league, gameId!),
    enabled: Boolean(league && gameId),
    staleTime: 2 * 60 * 1000,
  });
}
