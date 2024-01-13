import type { UserRole } from '@/entities/User';
import type { IndexRouteObject, NonIndexRouteObject } from 'react-router';

export interface RouteConfigEnhancer {
  suspense?: boolean;
  roles?: UserRole[];
  onlyAuth?: boolean;
  nonAuthRedirectPath?: string;
  invalidRoleRedirectPath?: string;
}

interface CustomNonIndexRouteObject extends NonIndexRouteObject, RouteConfigEnhancer {}
interface CustomIndexRouteObject extends IndexRouteObject, RouteConfigEnhancer {}

export type CustomRouteObject =
  (Omit<CustomNonIndexRouteObject, 'children'> & { children?: CustomRouteObject[] })
  | (Omit<CustomIndexRouteObject, 'children'> & { children?: CustomRouteObject[] });
