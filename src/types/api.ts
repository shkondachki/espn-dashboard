/** ESPN API response types — strong typing, no `any`. */

export interface ESPNTeam {
  id: string;
  uid: string;
  slug: string;
  location: string;
  name: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  color?: string;
  alternateColor?: string;
  logo?: string;
  links?: Array<{ href: string; text: string }>;
}

export interface ESPNCompetitor {
  id: string;
  uid: string;
  type: string;
  order: number;
  homeAway: "home" | "away";
  team: {
    id: string;
    uid: string;
    location: string;
    name: string;
    abbreviation: string;
    displayName: string;
    shortDisplayName: string;
    logo?: string;
    links?: Array<{ href: string }>;
  };
  score?: string;
  linescores?: Array<{ value: number }>;
  records?: Array<{ type: string; summary: string }>;
}

export interface ESPNEvent {
  id: string;
  uid: string;
  date: string;
  name: string;
  shortName: string;
  season: { year: number; type: number };
  week?: number;
  competitions: Array<{
    id: string;
    uid: string;
    date: string;
    venue?: { fullName: string; address?: { city: string; state: string } };
    competitors: ESPNCompetitor[];
    status: {
      type: { id: string; name: string; state: string };
      period?: number;
      displayClock?: string;
      periodType?: string;
    };
  }>;
  links?: Array<{ href: string; text: string }>;
}

export interface ScoreboardResponse {
  leagues?: Array<{ id: string; name: string; slug: string }>;
  season?: { type: number; year: number };
  week?: number;
  events: ESPNEvent[];
}

/** Unstructured JSON object from API (e.g. boxscore, news) we don't fully type. */
export type JsonObject = Record<string, unknown>;

export interface GameSummaryResponse {
  boxscore?: JsonObject;
  format?: JsonObject;
  gameInfo?: JsonObject;
  header?: {
    id: string;
    name: string;
    competitions: Array<{
      competitors: ESPNCompetitor[];
      venue?: { fullName: string };
      status?: { type: { name: string }; displayClock?: string };
    }>;
  };
  news?: JsonObject;
  roster?: JsonObject;
  [key: string]: unknown;
}

export interface TeamsResponse {
  sports: Array<{
    leagues: Array<{
      teams: Array<{
        team: ESPNTeam;
      }>;
    }>;
  }>;
}
