import { type User } from 'entities/User/@x/comment';
import { v4 as uuidV4 } from 'uuid';

interface CreateOptimisticCommentArg {
  text: string;
  user: User;
}

export const createOptimisticComment = (arg: CreateOptimisticCommentArg) => ({
  id: uuidV4(),
  text: arg.text,
  user: arg.user,
});
