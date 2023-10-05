import { createBrowserRouter } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config';
import React, { Suspense } from 'react';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { RootLayout } from 'app/RootLayout';
import { NotFoundPage } from 'pages/NotFoundPage';
import { PageLoader } from 'widgets/PageLoader';

export const AppRouter = createBrowserRouter([
  {
    path: RoutePath[AppRoutes.MAIN],
    element: <RootLayout/>,
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
        path: RoutePath[AppRoutes.NOT_FOUND],
        element: <NotFoundPage/>,
      },
    ],
  },
]);
