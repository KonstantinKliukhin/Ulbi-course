import { type FC, type PropsWithChildren, useMemo } from 'react';
import { getBrowserRuter } from '../../config/getBrowserRouter';
import { RouterProvider } from 'react-router-dom';

export const AppRouter: FC<PropsWithChildren> = (props) => {
  const router = useMemo(
    () => getBrowserRuter(props.children),
    // eslint-disable-next-line
    []
  );

  return <RouterProvider router={router} />;
};
