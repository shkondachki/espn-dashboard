import type { LeagueSlug } from "@/types/league";

/** ESPN API path segment for sport+league. */
export function getLeaguePath(league: LeagueSlug): string {
  switch (league) {
    case "nba":
      return "basketball/nba";
    case "nfl":
      return "football/nfl";
    case "eng.1":
    case "esp.1":
    case "ger.1":
    case "ita.1":
    case "fra.1":
    case "usa.1":
      return `soccer/${league}`;
    default:
      return "basketball/nba";
  }
}
