/**
 * Dedicated API layer for ESPN public API.
 * All API calls must go through this module — no direct fetch in hooks/features.
 */

import type { LeagueSlug } from '@/types/league';
import type {
  ScoreboardResponse,
  GameSummaryResponse,
  TeamsResponse,
} from '@/types/api';
import { getLeaguePath } from '@/types/league';

const BASE_URL = 'https://site.api.espn.com/apis/site/v2/sports';

function buildUrl(league: LeagueSlug, path: string, params?: Record<string, string>): string {
  const segment = getLeaguePath(league);
  const url = new URL(`${BASE_URL}/${segment}/${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  return url.toString();
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`ESPN API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

/** Fetch scoreboard for a league (recent/live games). */
export async function fetchScoreboard(league: LeagueSlug): Promise<ScoreboardResponse> {
  const url = buildUrl(league, 'scoreboard');
  return fetchJson<ScoreboardResponse>(url);
}

/** Fetch game summary by game/event id. */
export async function fetchGameSummary(
  league: LeagueSlug,
  gameId: string
): Promise<GameSummaryResponse> {
  const url = buildUrl(league, 'summary', { event: gameId });
  return fetchJson<GameSummaryResponse>(url);
}

/** Fetch all teams for a league. */
export async function fetchTeams(league: LeagueSlug): Promise<TeamsResponse> {
  const url = buildUrl(league, 'teams');
  return fetchJson<TeamsResponse>(url);
}

/** Fetch single team by id (optional; teams list gives full data). */
export async function fetchTeam(
  league: LeagueSlug,
  teamId: string
): Promise<{ team: import('@/types/api').ESPNTeam }> {
  const url = buildUrl(league, `teams/${teamId}`);
  return fetchJson<{ team: import('@/types/api').ESPNTeam }>(url);
}
