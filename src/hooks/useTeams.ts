import { useQuery } from "@tanstack/react-query";
import type { LeagueSlug } from "@/types/league";
import { fetchTeams } from "@/api/espnClient";
import { queryKeys } from "@/queryKeys";

export function useTeams(league: LeagueSlug) {
  return useQuery({
    queryKey: queryKeys.teams.list(league),
    queryFn: () => fetchTeams(league),
    staleTime: 10 * 60 * 1000,
  });
}
