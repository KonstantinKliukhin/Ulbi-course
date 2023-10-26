import { RouterProvider } from 'react-router-dom';
import { AppRouter } from 'app/providers/router';
import 'shared/config/i18n/i18n';
import { type FC } from 'react';

export const App: FC = () => (
  <div className='app'>
    <RouterProvider router={AppRouter}/>
  </div>
);
