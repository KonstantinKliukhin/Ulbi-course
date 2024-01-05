import { type UserRole } from '../constants/userRoles';

export interface User {
  id: string;
  username: string;
  avatar?: Url;
  roles: UserRole[];
}

export interface UserSchema {
  authData: User | null;
}
