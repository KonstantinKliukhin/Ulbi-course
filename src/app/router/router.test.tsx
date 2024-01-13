import { componentRender } from '@/shared/config/tests';
import { screen } from '@testing-library/react';
import { RoutePath } from '@/shared/config';
import { Outlet } from 'react-router-dom';

describe('Router', () => {
  test('Should render about page', async () => {
    componentRender(<Outlet/>, { withRealRouter: true, route: RoutePath.about, });

    const page = await screen.findByTestId('About.Page');

    expect(page).toBeInTheDocument();
  });

  test('Should render not found page if page does NOT exist', async () => {
    componentRender(<Outlet/>, { withRealRouter: true, route: '/asdfasdfasdfasdf', });

    const page = await screen.findByTestId('NotFound.Page');

    expect(page).toBeInTheDocument();
  });
});
