const createApiRouteGetter = (): ((route: string) => string) => {
  if (__PROJECT__ !== 'frontend') {
    return (route: string) => `${__API__}${route}`;
  } else {
    return (route: string) => route;
  }
};

const getApiRoute = createApiRouteGetter();
const addId = (id?: string) => `${id ? `/${id}` : ''}`;

export const API_ROUTES = {
  login: () => getApiRoute('/login'),
  articles: (id?: string) => getApiRoute(`/articles${addId(id)}`),
  comments: () => getApiRoute('/comments'),
  profile: (id: string) => getApiRoute(`/profile${addId(id)}`),
} as const;
