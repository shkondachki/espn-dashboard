# Sports Dashboard (ESPN)

A production-grade Sports Dashboard built with React, TypeScript, Refine, Material-UI, and the ESPN public API. It displays scoreboards and teams for NBA and NFL, with game and team detail drawers.

## Tech Stack

- **React** 18.2+
- **TypeScript** 5.2+
- **Vite** – build tool
- **Refine.dev** – app structure, layout, routing, resources
- **Material-UI (MUI)** 5.14+ with **Emotion** (CSS-in-JS)
- **React Query** – server state (all API data)
- **Redux Toolkit** – global UI state only (league selection)

## Setup

1. **Clone and install dependencies**

   ```bash
   npm install
   ```

2. **Environment**

   No API keys or env vars are required. The app uses the public ESPN API (no authentication).

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

## Architecture Notes

- **Routing & layout**  
  Refine resources define routes and sidebar menu: **Scoreboard** (`/`) and **Teams** (`/teams`). Layout is MUI `ThemedLayoutV2` with a custom header that includes the league selector.

- **State**
  - **Server/API data**: 100% managed by **React Query** via custom hooks. No API data is stored in Redux.
  - **Global UI state**: **Redux Toolkit** holds only the selected league (NBA, NFL etc.). Used by the league dropdown and passed into API hooks.

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

- **Loading / error / empty**  
  Handled in `QueryStates` and reused on Dashboard and Teams. Drawers show loading and error with retry where applicable.

- **Responsive**  
  MUI breakpoints used for grid columns and padding; one Emotion styled component (`StyledCard`) for card layout and hover.

## ESPN API Usage Note

This app uses **ESPN’s public, undocumented site API** (e.g. `site.api.espn.com`). There is no official public API or API key; endpoints are used as-is and may change or be restricted by ESPN. Use responsibly and consider caching and rate limiting for production. Data is used for display only (scores, games, teams, game summary).

## License

MIT
