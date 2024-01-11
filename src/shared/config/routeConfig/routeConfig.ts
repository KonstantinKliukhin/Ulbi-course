export type AppRoutes =
  'main' |
  'about' |
  'profile' |
  'articles' |
  'articleDetails' |
  'adminPanel' |
  'forbidden' |
  'notFound';

export const RoutePath = {
  main: '/',
  about: '/about',
  adminPanel: '/admin-panel',
  profile: (id: string | number) => `/profile/${id}`,
  articles: '/articles',
  articleDetails: (id: string | number) => `/articles/${id}`,
  forbidden: '/forbidden',
  // last
  notFound: '*',
} as const satisfies Record<AppRoutes, string | ((id: string | number) => string)>;
