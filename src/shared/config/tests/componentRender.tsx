import { type ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import i18nForTest from 'shared/config/i18n/i18nForTest';
import { I18nextProvider } from 'react-i18next';
import { AppRoutes, RoutePath } from 'shared/config';
import { StoreProvider } from 'app/providers/StoreProvider';

interface RenderWithRouterOptions {
  route?: string
  initialState?: DeepPartial<StateSchema>
}

const defaultOptions = {
  route: RoutePath[AppRoutes.MAIN],
  initialState: {},
};

export const componentRender = (
  component: ReactNode,
  options: RenderWithRouterOptions = defaultOptions
) => {
  const {
    route = defaultOptions.route,
    initialState = defaultOptions.initialState,
  } = options;

  return render(
    <MemoryRouter initialEntries={[route,]}>
      <StoreProvider initialState={initialState}>
        <I18nextProvider i18n={i18nForTest}>
          {component}
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
};
