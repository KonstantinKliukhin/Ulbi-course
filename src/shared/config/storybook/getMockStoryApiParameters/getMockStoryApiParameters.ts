interface GetMockStoryApiParametersArg<T> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  status: number;
  data: T;
  urlBase?: string;
  delay?: number;
  isLoading?: boolean;
  error?: string;
}

export const getMockStoryApiParameters = <T>(arg: GetMockStoryApiParametersArg<T>) => {
  return {
    url: arg.urlBase ? `${arg.urlBase}${arg.url}` : `${__API__}${arg.url}`,
    method: arg.method,
    status: arg.status,
    delay: arg.isLoading ? 600000 : arg.delay,
    response: {
      data: arg.data || arg.error || 'Some Api Error',
    },
  };
};
