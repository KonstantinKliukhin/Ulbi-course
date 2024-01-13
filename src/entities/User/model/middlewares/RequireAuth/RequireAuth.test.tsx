import { componentRender } from '@/shared/config/tests';
import { screen } from '@testing-library/react';
import { RequireAuth } from './RequireAuth';
import { mockedUser } from '@/shared/mocks';
import { Outlet } from 'react-router-dom';
import { RoutePath } from '@/shared/config';

describe('RequireAuth', () => {
  test('Should show children if authorized', async () => {
    componentRender(<RequireAuth><div data-testid="AuthMiddleware.Test"/></RequireAuth>, {
      initialState: {
        user: {
          authData: mockedUser,
        },
      },
    });

    const child = screen.queryByTestId('AuthMiddleware.Test');

    expect(child).toBeInTheDocument();
  });

  test('Should NOT show children if NOT authorized', async () => {
    componentRender(<RequireAuth><div data-testid="AuthMiddleware.Test"/></RequireAuth>, {
      initialState: {
        user: {
          authData: null,
        },
      },
    });

    const child = screen.queryByTestId('AuthMiddleware.Test');

    expect(child).not.toBeInTheDocument();
  });

  test('Should Redirect if NOT authorized and redirect path is specified', async () => {
    componentRender(<Outlet/>, {
      initialState: {
        user: {
          authData: null,
        },
      },
      route: '/test',
      routeConfig: [
        {
          path: '/test',
          element: (
            <RequireAuth redirectPath={RoutePath.forbidden}>
              <div data-testid="AuthMiddleware.Test"/>
            </RequireAuth>
          ),
        },
        {
          path: RoutePath.forbidden,
          element: <div data-testid="Forbidden.Test"/>,
        },
      ],
    });

    const child = screen.queryByTestId('AuthMiddleware.Test');
    expect(child).not.toBeInTheDocument();

    const forbiddenRouteElement = screen.queryByTestId('Forbidden.Test');
    expect(forbiddenRouteElement).toBeInTheDocument();
  });
});
