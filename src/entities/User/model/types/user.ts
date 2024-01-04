export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER',
}

export interface User {
  id: string;
  username: string;
  avatar?: Url;
  roles: UserRole[];
}

export interface UserSchema {
  authData: User | null;
}
