import { type ReactNode } from 'react';
import { render } from '@testing-library/react';
import i18nForTest from '../i18n/i18nForTest';
import { I18nextProvider } from 'react-i18next';
import { RoutePath } from '../routeConfig/routeConfig';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { type ReducersMapObject } from '@reduxjs/toolkit';
import { TestAppRouter } from './TestAppRouter';
import type { CustomRouteObject } from '@/app/router/types/customRouteObject';

interface RenderWithRouterOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
  withRealRouter?: boolean;
  routeConfig?: CustomRouteObject[];
}

const defaultOptions = {
  route: RoutePath.main,
  initialState: {},
} as const;

export const componentRender = (
  component: ReactNode,
  options: RenderWithRouterOptions = defaultOptions
) => {
  const {
    route = defaultOptions.route,
    initialState = defaultOptions.initialState,
    asyncReducers,
    withRealRouter = false,
    routeConfig,
  } = options;

  return render(
    <TestAppRouter initialEntries={[route,]} withRealRouter={withRealRouter} routerConfig={routeConfig}>
      <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
        <I18nextProvider i18n={i18nForTest}>{component}</I18nextProvider>
      </StoreProvider>
    </TestAppRouter>
  );
};
