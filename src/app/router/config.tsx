import { createBrowserRouter, Outlet } from 'react-router-dom';
import { RoutePath } from 'shared/config';
import React, { type FC, Suspense } from 'react';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { PageLoader } from 'widgets/PageLoader';
import { ProfilePage } from 'pages/ProfilePage';
import { RequireAuth, RequireRoles, UserRole } from 'entities/User';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage';
import { ArticlesPage } from 'pages/ArticlesPage';
import { AdminPanelPage } from 'pages/AdminPanelPage';
import { ForbiddenPage } from 'pages/ForbiddenPage';

export const createAppRouter = (App: FC) =>
  createBrowserRouter([
    {
      path: RoutePath.main,
      element: <App />,
      hasErrorBoundary: true,
      children: [
        {
          path: RoutePath.main,
          index: true,
          element: (
            <Suspense fallback={<PageLoader />}>
              <MainPage />
            </Suspense>
          ),
        },
        {
          path: RoutePath.about,
          element: (
            <Suspense fallback={<PageLoader />}>
              <AboutPage />
            </Suspense>
          ),
        },
        {
          path: RoutePath.adminPanel,
          element: (
            <RequireAuth redirectPath={RoutePath.main}>
              <RequireRoles
                roles={[UserRole.ADMIN, UserRole.MANAGER,]}
                redirectPath={RoutePath.forbidden}
              >
                <Suspense fallback={<PageLoader />}>
                  <AdminPanelPage />
                </Suspense>
              </RequireRoles>
            </RequireAuth>
          ),
        },
        {
          path: RoutePath.profile(':id'),
          element: (
            <RequireAuth redirectPath={RoutePath.main}>
              <Suspense fallback={<PageLoader />}>
                <ProfilePage />
              </Suspense>
            </RequireAuth>
          ),
        },
        {
          path: RoutePath.articles,
          element: <Outlet />,
          children: [
            {
              index: true,
              element: (
                <RequireAuth redirectPath={RoutePath.main}>
                  <Suspense fallback={<PageLoader />}>
                    <ArticlesPage />
                  </Suspense>
                </RequireAuth>
              ),
            },
            {
              path: RoutePath.articleDetails(':id'),
              element: (
                <RequireAuth redirectPath={RoutePath.main}>
                  <Suspense fallback={<PageLoader />}>
                    <ArticleDetailsPage />
                  </Suspense>
                </RequireAuth>
              ),
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
  ]);
