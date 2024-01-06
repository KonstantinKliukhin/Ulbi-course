import { type User, UserRole } from 'entities/User';

export const mockedUser: User = {
  id: '1',
  username: 'Kostya',
  avatar: 'https://javascripttraining.ie/img/javascriptlogo.png',
  roles: [UserRole.USER,],
};

export const mockedAdminUser: User = {
  id: '1',
  username: 'Kostya',
  avatar: 'https://javascripttraining.ie/img/javascriptlogo.png',
  roles: [UserRole.ADMIN,],
};

export const mockedManagerUser: User = {
  id: '1',
  username: 'Kostya',
  avatar: 'https://javascripttraining.ie/img/javascriptlogo.png',
  roles: [UserRole.MANAGER,],
};
