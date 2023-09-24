import { createBrowserRouter } from 'react-router-dom'
import { AppRoutes, RoutePath } from 'shared/config'
import React, { Suspense } from 'react'
import { MainPage } from 'pages/MainPage'
import { AboutPage } from 'pages/AboutPage'
import { RootLayout } from 'app/RootLayout'

export const AppRouter = createBrowserRouter([
  {
    path: RoutePath[AppRoutes.MAIN],
    element: <RootLayout/>,
    children: [
      {
        path: RoutePath[AppRoutes.MAIN],
        index: true,
        element: <Suspense fallback={<div>Loading...</div>}><MainPage/></Suspense>,
      },
      {
        path: RoutePath[AppRoutes.ABOUT],
        element: <Suspense fallback={<div>Loading...</div>}><AboutPage/></Suspense>,
      }
    ]
  }
])
