import { useQuery } from "@tanstack/react-query";
import type { LeagueSlug } from "@/types/league";
import { fetchScoreboard } from "@/api/espnClient";
import { queryKeys } from "@/queryKeys";

export function useScoreboard(league: LeagueSlug) {
  return useQuery({
    queryKey: queryKeys.scoreboard.list(league),
    queryFn: () => fetchScoreboard(league),
    staleTime: 60 * 1000,
  });
}
