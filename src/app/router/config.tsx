import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config';
import React, { type FC, Suspense } from 'react';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { PageLoader } from 'widgets/PageLoader';
import { ProfilePage } from 'pages/ProfilePage';
import { RequireAuth } from 'entities/User';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage';
import { ArticlesPage } from 'pages/ArticlesPage';

export const createAppRouter = (App: FC) => createBrowserRouter([
  {
    path: RoutePath[AppRoutes.MAIN],
    element: <App/>,
    hasErrorBoundary: true,
    children: [
      {
        path: RoutePath[AppRoutes.MAIN],
        index: true,
        element: (
          <Suspense fallback={<PageLoader/>}>
            <MainPage/>
          </Suspense>
        ),
      },
      {
        path: RoutePath[AppRoutes.ABOUT],
        element: (
          <Suspense fallback={<PageLoader/>}>
            <AboutPage/>
          </Suspense>
        ),
      },
      {
        path: RoutePath[AppRoutes.PROFILE](':id'),
        element: (
          <RequireAuth redirectPath={RoutePath[AppRoutes.MAIN]}>
            <Suspense fallback={<PageLoader/>}>
              <ProfilePage/>
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: RoutePath[AppRoutes.ARTICLES],
        element: <Outlet/>,
        children: [
          {
            index: true,
            element: (
              <RequireAuth redirectPath={RoutePath[AppRoutes.MAIN]}>
                <Suspense fallback={<PageLoader/>}>
                  <ArticlesPage/>
                </Suspense>
              </RequireAuth>
            ),
          },
          {
            path: RoutePath[AppRoutes.ARTICLE_DETAILS](':id'),
            element: (
              <RequireAuth redirectPath={RoutePath[AppRoutes.MAIN]}>
                <Suspense fallback={<PageLoader/>}>
                  <ArticleDetailsPage/>
                </Suspense>
              </RequireAuth>
            ),
          },
        ],
      },
      {
        path: RoutePath[AppRoutes.NOT_FOUND],
        element: <NotFoundPage/>,
      },
    ],
  },
]);
