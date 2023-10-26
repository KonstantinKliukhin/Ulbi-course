import { App } from 'app/App';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import './app/styles/index.scss';
import { StoreProvider } from 'app/providers/StoreProvider';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <ErrorBoundary>
    <StoreProvider>
      <ThemeProvider>
        <App/>
      </ThemeProvider>
    </StoreProvider>
  </ErrorBoundary>
);
