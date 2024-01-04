export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'articleDetails',
  ADMIN_PANEL = 'adminPanel',
  FORBIDDEN = 'forbidden',
  // last
  NOT_FOUND = 'notFound',
}

export const RoutePath = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.ADMIN_PANEL]: '/admin-panel',
  [AppRoutes.PROFILE]: (id: string | number) => `/profile/${id}`,
  [AppRoutes.ARTICLES]: '/articles',
  [AppRoutes.ARTICLE_DETAILS]: (id: string | number) => `/articles/${id}`,
  [AppRoutes.FORBIDDEN]: '/forbidden',
  // last
  [AppRoutes.NOT_FOUND]: '*',
} as const;
