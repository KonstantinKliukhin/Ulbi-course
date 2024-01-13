import { type RouteObject } from 'react-router';
import { omit } from '@/shared/lib';
import { type ReactNode, Suspense } from 'react';
import { PageLoader } from '@/widgets/PageLoader';
import { RequireAuth, RequireRoles } from '@/entities/User';
import { type CustomRouteObject, type RouteConfigEnhancer } from '../../types/customRouteObject';
import { RoutePath } from '@/shared/config';

const customRouteObjectKeys: Array<keyof RouteConfigEnhancer> = [
  'suspense',
  'roles',
  'onlyAuth',
  'nonAuthRedirectPath',
  'invalidRoleRedirectPath',
];

const extractRouteFromCustomRoute = (customRouteObject: CustomRouteObject): RouteObject => omit(
  customRouteObject,
  ...customRouteObjectKeys
) as RouteObject;

const getRouteElement = (route: CustomRouteObject) => {
  let element: ReactNode = route.element;
  const {
    suspense = true,
    invalidRoleRedirectPath = RoutePath.forbidden,
    nonAuthRedirectPath = RoutePath.forbidden,
  } = route;

  if (suspense) {
    element = (
      <Suspense fallback={<PageLoader/>}>
        {element}
      </Suspense>
    );
  }

  if (route.roles) {
    element = (
      <RequireRoles roles={route.roles} redirectPath={invalidRoleRedirectPath}>
        {element}
      </RequireRoles>
    );
  }

  if (route.onlyAuth) {
    element = (
      <RequireAuth redirectPath={nonAuthRedirectPath}>
        {element}
      </RequireAuth>
    );
  }

  return element;
};

const mapCustomRouteToRoute = (route: CustomRouteObject): RouteObject => {
  return ({
    ...extractRouteFromCustomRoute(route),
    element: getRouteElement(route),
    children: route.children?.map(mapCustomRouteToRoute),
  }) as unknown as RouteObject;
};

export const mapCustomConfig = (routes: CustomRouteObject[]): RouteObject[] => (
  routes.map(mapCustomRouteToRoute)
);
