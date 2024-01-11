// eslint-disable-next-line ulbi-eslint-plugin/public-api-imports
import '@/shared/config/i18n/i18n';
import './styles/index.scss';
import { type FC } from 'react';
import { useInitUser } from '@/entities/User';
import { ErrorBoundary } from './providers/ErrorBoundary';
import { ThemeProvider } from './providers/ThemeProvider';
import { RootLayout } from './layout';
import { Outlet, RouterProvider } from 'react-router-dom';
import { StoreProvider } from './providers/StoreProvider';
import { createAppRouter } from './router';

const App: FC = () => {
  useInitUser();

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="app">
          <RootLayout>
            <Outlet />
          </RootLayout>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

const AppWithStore: FC = () => (
  <StoreProvider>
    <App />
  </StoreProvider>
);

const AppRouter = createAppRouter(AppWithStore);
const AppWithRouter = () => <RouterProvider router={AppRouter} />;

export { AppWithRouter as App };
