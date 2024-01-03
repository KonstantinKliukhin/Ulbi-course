import 'shared/config/i18n/i18n';
import { type FC } from 'react';
import { useInitUser } from 'entities/User';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { RootLayout } from 'app/layout';
import { Outlet, RouterProvider } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider';
import { createAppRouter } from 'app/router';

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
