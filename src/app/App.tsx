import { RouterProvider } from 'react-router-dom';
import { AppRouter } from 'app/router';
import 'shared/config/i18n/i18n';
import { type FC } from 'react';
import { useInitUser } from 'entities/User';

export const App: FC = () => {
  useInitUser();
  return (
    <div className='app'>
      <RouterProvider router={AppRouter}/>
    </div>
  );
};
