import { mapCustomConfig } from '../lib/mapCustomConfig/mapCustomConfig';
import { getCustomRouterConfig } from './getCustomRouterConfig';
import { createBrowserRouter } from 'react-router-dom';
import type { ReactNode } from 'react';

export const getBrowserRuter = (root: ReactNode) => (
  createBrowserRouter(mapCustomConfig(getCustomRouterConfig(root)))
);
