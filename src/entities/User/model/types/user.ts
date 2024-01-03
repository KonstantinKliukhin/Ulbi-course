export interface User {
  id: string;
  username: string;
  avatar?: Url;
}

export interface UserSchema {
  authData: User | null;
}
