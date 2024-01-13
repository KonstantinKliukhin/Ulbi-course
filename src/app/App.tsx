// eslint-disable-next-line ulbi-eslint-plugin/public-api-imports
import '@/shared/config/i18n/i18n';
import './styles/index.scss';
import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AppRouter } from './router';
import { StoreProvider } from './providers/StoreProvider';
import { ErrorBoundary } from './providers/ErrorBoundary';
import { ThemeProvider } from './providers/ThemeProvider';
import { UserIniter } from '@/features/InitUser';
import { RootLayout } from './layout';

export const App: FC = () => (
  <AppRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <UserIniter>
            <div className="app">
              <RootLayout>
                <Outlet />
              </RootLayout>
            </div>
          </UserIniter>
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </AppRouter>
);
