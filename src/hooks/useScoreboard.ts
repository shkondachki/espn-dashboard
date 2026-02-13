import { useQuery } from "@tanstack/react-query";
import type { LeagueSlug } from "@/types/league";
import { fetchScoreboard } from "@/api/espnClient";

const QUERY_KEY = "scoreboard";

export function useScoreboard(league: LeagueSlug) {
  return useQuery({
    queryKey: [QUERY_KEY, league],
    queryFn: () => fetchScoreboard(league),
    staleTime: 60 * 1000,
  });
}
