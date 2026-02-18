# Sports Dashboard (ESPN)

A production-grade Sports Dashboard built with React, TypeScript, Refine, Material-UI, and the ESPN public API. It displays scoreboards and teams for **NBA, NFL, and select soccer leagues** (e.g. Premier League, La Liga, MLS), with game and team detail drawers.

## Table of contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Quick start](#quick-start)
- [Run](#run)
- [Architecture notes](#architecture-notes)
- [Where to look first](#where-to-look-first)
- [State at a glance](#state-at-a-glance)
- [Data flow (scoreboard)](#data-flow-scoreboard)
- [Conventions](#conventions)
- [ESPN API usage note](#espn-api-usage-note)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Tech Stack

- **React** 18.2+
- **TypeScript** 5.2+
- **Vite** – build tool
- **Refine.dev** – app structure, layout, routing, resources
- **Material-UI (MUI)** 5.14+ with **Emotion** (CSS-in-JS)
- **React Query** – server state (all API data)
- **Redux Toolkit** – global UI state only (league selection)

## Prerequisites

- **Node.js** 18+ (or 20+)
- **npm** (comes with Node)

## Setup

1. **Clone and install dependencies**

   ```bash
   npm install
   ```

2. **Environment**

   No API keys or env vars are required. The app uses the public ESPN API (no authentication).

## Quick start

1. Clone the repo, then from the project root:
2. `npm install`
3. `npm run dev` — open **http://localhost:5173** (or the URL Vite prints).

You should see the scoreboard for the selected league (default NBA), a sidebar (Scoreboard / Teams), and a league dropdown in the header. Click a game or team to open its detail drawer.

## Run

- **Development**

  ```bash
  npm run dev
  ```

- **Build**

  ```bash
  npm run build
  ```

- **Preview production build**

  ```bash
  npm run preview
  ```

- **Lint / format**

  ```bash
  npm run lint
  npm run format
  ```

## Architecture notes

- **Routing & layout**  
  Refine resources define routes and sidebar menu: **Scoreboard** (`/`) and **Teams** (`/teams`). Layout is MUI `ThemedLayoutV2` with a custom header that includes the league selector.

- **API layer**  
  All ESPN requests go through `src/api/espnClient.ts`. Hooks and components do not call `fetch` directly.

- **Custom hooks (React Query)**
  - `useScoreboard(league)` – scoreboard / recent games
  - `useGameSummary(league, gameId)` – game details (for drawer)
  - `useTeams(league)` – teams list
  - `useTeam(league, teamId)` – single team (for drawer)

- **Folder structure**
  - `api/` – ESPN client and Refine data provider
  - `components/` – shared UI (e.g. LeagueSelector, QueryStates, StyledCard, DetailDrawer)
  - `features/` – scoreboard and teams (list, card, detail drawer/content)
  - `hooks/` – React Query hooks and Redux typed hooks
  - `pages/` – Refine list pages (Dashboard, Teams)
  - `providers/` – QueryClient, Redux, Theme, Router and Refine setup
  - `store/` – Redux slice (league)
  - `types/` – league and API response types
  - `utils/` – pure helpers (league path, event/competitors status, game status formatting)
  - `queryKeys.ts` – centralized React Query keys

- **Loading / error / empty**  
  Handled in `QueryStates` and reused on Dashboard and Teams. Drawers show loading and error with retry where applicable.

- **Responsive**  
  MUI breakpoints used for grid columns and padding; one Emotion styled component (`StyledCard`) for card layout and hover.

## Where to look first

If you’re new to the codebase, open these in order:

| Purpose        | File(s) |
|----------------|---------|
| Entry         | `src/main.tsx` → `src/App.tsx` → `src/providers/index.tsx` |
| Routing       | `src/providers/router.tsx`, `src/components/RefineLayout.tsx` |
| Data & API    | `src/api/espnClient.ts`, `src/hooks/useScoreboard.ts`, `src/queryKeys.ts` |
| Example page  | `src/pages/DashboardPage.tsx` (scoreboard + game drawer) |

## State at a glance

| What                | Where | Notes |
|---------------------|-------|--------|
| Selected league     | Redux (`store/leagueSlice.ts`) | League selector reads/writes this; hooks use it for API calls. |
| Scoreboard / teams / game summary | React Query (hooks in `hooks/`) | Server state; no API data in Redux. |
| Selected game ID    | Local `useState` in `DashboardPage` | Opens/closes game detail drawer. |
| Selected team ID    | Local `useState` in `TeamsPage` | Opens/closes team detail drawer. |

## Data flow (scoreboard)

User lands on `/` → **DashboardPage** reads league from Redux and calls **useScoreboard(league)** → **espnClient** fetches from ESPN → data is shown in **ScoreboardList** / **GameCard**. Changing the league in the header updates Redux → the hook refetches for the new league. Clicking a game sets local state → **GameDetailDrawer** mounts → **useGameSummary(league, gameId)** runs → **GameDetailContent** shows the summary.

## Conventions

- **Path alias:** `@/` points to `src/` (e.g. `@/api/espnClient`).
- **API:** All HTTP requests go through `src/api/espnClient.ts`; no direct `fetch` in hooks or components.
- **Types:** Shared types live in `src/types/` (e.g. `api.ts`, `league.ts`).
- **Query keys:** Centralized in `src/queryKeys.ts` for cache and invalidation.
- **State:** Server state only in React Query; global UI state (e.g. league) only in Redux.

## ESPN API usage note

This app uses **ESPN’s public, undocumented site API**. There is no official public API or API key; endpoints are used as-is and may change or be restricted by ESPN.

- **Base URL:** `https://site.api.espn.com/apis/site/v2/sports`
- **Path pattern:** `{sport}/{league}/{endpoint}` — e.g. `basketball/nba/scoreboard`, `football/nfl/teams`, `soccer/eng.1/scoreboard`. Game summary: `.../summary?event={gameId}`.
- Use responsibly; consider caching and rate limiting for production. Data is used for display only (scores, games, teams, game summary).

## Testing

No test suite is configured. Good candidates to add tests for: pure utils (`utils/gameStatus.ts`, `utils/league.ts`, `utils/event.ts`), Redux league slice, API client with mocked `fetch`, and presentational components (e.g. `QueryStates`, `GameCard`) with React Testing Library.

## Troubleshooting

- **CORS or 403 from ESPN** – The API is undocumented and may change or restrict access; there is no API key to add. Try from the app (browser) rather than Postman if CORS appears.
- **Blank or wrong data** – Check the Network tab for the request URL and response. Confirm the league/path matches [ESPN API usage note](#espn-api-usage-note).
- **Build fails** – Ensure Node 18+ and run `npm install` again. If TypeScript or Vite errors persist, check `tsconfig.json` and `vite.config.ts`.

## License

MIT
