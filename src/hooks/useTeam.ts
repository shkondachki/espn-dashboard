import { useQuery } from "@tanstack/react-query";
import type { LeagueSlug } from "@/types/league";
import { fetchTeam } from "@/api/espnClient";
import { queryKeys } from "@/queryKeys";

export function useTeam(league: LeagueSlug, teamId: string | null) {
  return useQuery({
    queryKey: queryKeys.team.detail(league, teamId),
    queryFn: () => fetchTeam(league, teamId!),
    enabled: Boolean(league && teamId),
    staleTime: 10 * 60 * 1000,
  });
}
