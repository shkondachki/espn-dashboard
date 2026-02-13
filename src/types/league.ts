/** Supported leagues for the dashboard (UI state only). */
export type LeagueSlug =
  | 'nba'
  | 'nfl'
  | 'eng.1'   // Premier League
  | 'esp.1'   // La Liga
  | 'ger.1'   // Bundesliga
  | 'ita.1'   // Serie A
  | 'fra.1'   // Ligue 1
  | 'usa.1';  // MLS

export const LEAGUE_OPTIONS: { value: LeagueSlug; label: string }[] = [
  { value: 'nba', label: 'NBA' },
  { value: 'nfl', label: 'NFL' },
  { value: 'eng.1', label: 'Premier League' },
  { value: 'esp.1', label: 'La Liga' },
  { value: 'ger.1', label: 'Bundesliga' },
  { value: 'ita.1', label: 'Serie A' },
  { value: 'fra.1', label: 'Ligue 1' },
  { value: 'usa.1', label: 'MLS' },
];

/** ESPN API path segment for sport+league. */
export const getLeaguePath = (league: LeagueSlug): string => {
  switch (league) {
    case 'nba':
      return 'basketball/nba';
    case 'nfl':
      return 'football/nfl';
    case 'eng.1':
    case 'esp.1':
    case 'ger.1':
    case 'ita.1':
    case 'fra.1':
    case 'usa.1':
      return `soccer/${league}`;
    default:
      return 'basketball/nba';
  }
};
