/** Supported leagues for the dashboard (UI state only). */
export type LeagueSlug =
  | "nba"
  | "nfl"
  | "eng.1" // Premier League
  | "esp.1" // La Liga
  | "ger.1" // Bundesliga
  | "ita.1" // Serie A
  | "fra.1" // Ligue 1
  | "usa.1"; // MLS

export const LEAGUE_OPTIONS: { value: LeagueSlug; label: string }[] = [
  { value: "nba", label: "NBA" },
  { value: "nfl", label: "NFL" },
  { value: "eng.1", label: "Premier League" },
  { value: "esp.1", label: "La Liga" },
  { value: "ger.1", label: "Bundesliga" },
  { value: "ita.1", label: "Serie A" },
  { value: "fra.1", label: "Ligue 1" },
  { value: "usa.1", label: "MLS" },
];

export { getLeaguePath } from "@/utils/league";
