import type { LeagueSlug } from "@/types/league";

/**
 * Centralized React Query keys for cache lookup and invalidation.
 * Use the factory functions so keys stay consistent across hooks and any future prefetch/invalidate calls.
 */
export const queryKeys = {
  scoreboard: {
    all: ["scoreboard"] as const,
    list: (league: LeagueSlug) => ["scoreboard", league] as const,
  },
  gameSummary: {
    all: ["gameSummary"] as const,
    detail: (league: LeagueSlug, gameId: string | null) =>
      ["gameSummary", league, gameId] as const,
  },
  teams: {
    all: ["teams"] as const,
    list: (league: LeagueSlug) => ["teams", league] as const,
  },
  team: {
    all: ["team"] as const,
    detail: (league: LeagueSlug, teamId: string | null) =>
      ["team", league, teamId] as const,
  },
};
