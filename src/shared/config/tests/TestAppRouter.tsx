import type { FC, PropsWithChildren, ReactNode } from 'react';
import { useMemo } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { getCustomRouterConfig } from '@/app/router/config/getCustomRouterConfig';
import { mapCustomConfig } from '@/app/router/lib/mapCustomConfig/mapCustomConfig';
import { type CustomRouteObject } from '@/app/router/types/customRouteObject';
import { RoutePath } from '../../config/routeConfig/routeConfig';

// eslint-disable-next-line @typescript-eslint/ban-types
type MemoryRouterOptions = Parameters<typeof createMemoryRouter>[1] & {};

interface TestAppRouterProps extends MemoryRouterOptions, PropsWithChildren {
  withRealRouter?: boolean;
  routerConfig?: CustomRouteObject[];
}

const getMockedRouterConfig = (
  root: ReactNode,
  routeChildren?: CustomRouteObject[]
): CustomRouteObject[] => [{
  path: RoutePath.main,
  element: root,
  children: routeChildren,
},];

export const TestAppRouter: FC<TestAppRouterProps> = (props) => {
  const { children, withRealRouter = false, routerConfig, ...memoryRouterOptions } = props;
  const router = useMemo(() => (
    withRealRouter
      ? createMemoryRouter(mapCustomConfig(getCustomRouterConfig(children)), memoryRouterOptions)
      : createMemoryRouter(
        mapCustomConfig(getMockedRouterConfig(children, routerConfig)),
        memoryRouterOptions
      )
  )
  // eslint-disable-next-line
  , []);

  return <RouterProvider router={router} />;
};
