/**
 * Minimal Refine data provider for layout/routing only.
 * All server data is fetched via our custom React Query hooks (useScoreboard, useTeams, etc.).
 */

import type { DataProvider } from '@refinedev/core';

export const dataProvider: DataProvider = {
  getList: async () => ({ data: [], total: 0 }),
  getOne: async () => ({ data: {} as never }),
  getMany: async () => ({ data: [] }),
  create: async () => ({ data: {} as never }),
  update: async () => ({ data: {} as never }),
  deleteOne: async () => ({ data: {} as never }),
  getApiUrl: () => '',
};
