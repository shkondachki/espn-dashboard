import { useQuery } from '@tanstack/react-query';
import type { LeagueSlug } from '@/types/league';
import { fetchTeams } from '@/api/espnClient';

const QUERY_KEY = 'teams';

export function useTeams(league: LeagueSlug) {
  return useQuery({
    queryKey: [QUERY_KEY, league],
    queryFn: () => fetchTeams(league),
    staleTime: 10 * 60 * 1000,
  });
}
