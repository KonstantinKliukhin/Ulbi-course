export const getQueryParams = (params: Partial<Record<string, string>>) => {
  const searchParams = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([key, value,]) => {
    if (value !== undefined) {
      searchParams.set(key, value);
    }
  });

  return `?${searchParams.toString()}`;
};

export const addQueryParams = (params: Partial<Record<string, string>>) => {
  window.history.pushState(null, '', getQueryParams(params));
};
