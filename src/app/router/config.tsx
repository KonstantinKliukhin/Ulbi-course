import { createBrowserRouter } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config';
import React, { type FC, Suspense } from 'react';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { PageLoader } from 'widgets/PageLoader';
import { ProfilePage } from 'pages/ProfilePage';
import { AuthorizedComponent } from 'entities/User';

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
        path: RoutePath[AppRoutes.PROFILE],
        element: (
          <AuthorizedComponent redirectPath={RoutePath[AppRoutes.MAIN]}>
            <Suspense fallback={<PageLoader/>}>
              <ProfilePage/>
            </Suspense>
          </AuthorizedComponent>
        ),
      },
      {
        path: RoutePath[AppRoutes.NOT_FOUND],
        element: <NotFoundPage/>,
      },
    ],
  },
]);
