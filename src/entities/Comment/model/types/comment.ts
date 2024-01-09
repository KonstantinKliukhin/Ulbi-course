import { type User } from '@/entities/User/@x/comment';

export interface Comment {
  id: string;
  user: User;
  text: string;
}
