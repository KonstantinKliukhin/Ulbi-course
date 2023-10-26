import { App } from 'app/App';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import './app/styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <ErrorBoundary>
    <ThemeProvider>
      <App/>
    </ThemeProvider>
  </ErrorBoundary>
);
