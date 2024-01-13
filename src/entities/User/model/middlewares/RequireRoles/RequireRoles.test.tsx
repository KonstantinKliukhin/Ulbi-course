import { componentRender } from '@/shared/config/tests';
import { screen } from '@testing-library/react';
import { mockedUser } from '@/shared/mocks';
import { Outlet } from 'react-router-dom';
import { RoutePath } from '@/shared/config';
import { RequireRoles } from './RequireRoles';
import { UserRole } from '../../constants/userRoles';

describe('RequireRoles', () => {
  test('Should show children if user has required role', async () => {
    componentRender(
      <RequireRoles roles={[UserRole.USER,]}>
        <div data-testid="RolesMiddleware.Test" />
      </RequireRoles>,
      {
        initialState: {
          user: {
            authData: { ...mockedUser, roles: [UserRole.USER,], },
          },
        },
      }
    );

    const child = screen.queryByTestId('RolesMiddleware.Test');

    expect(child).toBeInTheDocument();
  });

  test('Should show children if user has one of required roles', async () => {
    componentRender(
      <RequireRoles roles={[UserRole.MANAGER, UserRole.ADMIN,]}>
        <div data-testid="RolesMiddleware.Test" />
      </RequireRoles>,
      {
        initialState: {
          user: {
            authData: { ...mockedUser, roles: [UserRole.MANAGER,], },
          },
        },
      }
    );

    const child = screen.queryByTestId('RolesMiddleware.Test');

    expect(child).toBeInTheDocument();
  });

  test('Should NOT show children if user has NOT required role', async () => {
    componentRender(
      <RequireRoles roles={[UserRole.ADMIN,]}>
        <div data-testid="RolesMiddleware.Test" />
      </RequireRoles>,
      {
        initialState: {
          user: {
            authData: { ...mockedUser, roles: [UserRole.USER,], },
          },
        },
      }
    );

    const child = screen.queryByTestId('RolesMiddleware.Test');

    expect(child).not.toBeInTheDocument();
  });

  test('Should Redirect if user has NOT required role and redirect path is specified', async () => {
    componentRender(<Outlet />, {
      initialState: {
        user: {
          authData: { ...mockedUser, roles: [UserRole.USER,], },
        },
      },
      route: '/test',
      routeConfig: [
        {
          path: '/test',
          element: (
            <RequireRoles
              roles={[UserRole.ADMIN,]}
              redirectPath={RoutePath.forbidden}
            >
              <div data-testid="RolesMiddleware.Test" />
            </RequireRoles>
          ),
        },
        {
          path: RoutePath.forbidden,
          element: <div data-testid="Forbidden.Test" />,
        },
      ],
    });

    const child = screen.queryByTestId('RolesMiddleware.Test');
    expect(child).not.toBeInTheDocument();

    const forbiddenRouteElement = screen.queryByTestId('Forbidden.Test');
    expect(forbiddenRouteElement).toBeInTheDocument();
  });
});
