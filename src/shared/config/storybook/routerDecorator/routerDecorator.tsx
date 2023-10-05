import { type FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export const RouterDecorator = (Story: FC) => {
  return <RouterProvider router={createBrowserRouter([{ element: <Story/>, path: '*', },])}/>;
};
