import { type ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import i18nForTest from 'shared/config/i18n/i18nForTest';
import { I18nextProvider } from 'react-i18next';
import { AppRoutes, RoutePath } from 'shared/config';

interface RenderWithRouterOptions {
  route: string
}

const defaultOptions = {
  route: RoutePath[AppRoutes.MAIN],
};

export const componentRender = (
  component: ReactNode,
  options: RenderWithRouterOptions = defaultOptions
) => {
  const { route, } = options;
  return render(
    <I18nextProvider i18n={i18nForTest}>
      <MemoryRouter initialEntries={[route,]}>
        {component}
      </MemoryRouter>
    </I18nextProvider>
  );
};
