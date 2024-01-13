import { Outlet } from 'react-router-dom';
import { RoutePath } from '@/shared/config';
import React, { type ReactNode } from 'react';
import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { UserRole } from '@/entities/User';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import type { CustomRouteObject } from '../types/customRouteObject';

export const getCustomRouterConfig = (root: ReactNode): CustomRouteObject[] => [
  {
    path: RoutePath.main,
    element: root,
    hasErrorBoundary: true,
    children: [
      {
        path: RoutePath.main,
        index: true,
        element: <MainPage />,
      },
      {
        path: RoutePath.about,
        element: <AboutPage />,
      },
      {
        path: RoutePath.adminPanel,
        onlyAuth: true,
        roles: [UserRole.ADMIN, UserRole.MANAGER,],
        element: <AdminPanelPage />,
      },
      {
        path: RoutePath.profile(':id'),
        onlyAuth: true,
        element: <ProfilePage />,
      },
      {
        path: RoutePath.articles,
        element: <Outlet />,
        children: [
          {
            index: true,
            onlyAuth: true,
            element: <ArticlesPage />,
          },
          {
            path: RoutePath.articleDetails(':id'),
            onlyAuth: true,
            element: <ArticleDetailsPage />,
          },
        ],
      },
      {
        path: RoutePath.forbidden,
        element: <ForbiddenPage />,
      },
      {
        path: RoutePath.notFound,
        element: <NotFoundPage />,
      },
    ],
  },
];
