import { type Comment } from 'entities/Comment';
import { mockedUser } from './mockedUser';

export const mockedComment: Comment = {
  id: '1',
  text: 'Some short text',
  user: mockedUser,
};

export const mockedComments = [
  mockedComment,
  {
    id: '2',
    text: 'Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long textSome very long text Some very long text Some very long text Some very long text',
    user: mockedUser,
  },
  {
    id: '3',
    text: 'Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long textSome very long text Some very long text Some very long text Some very long text',
    user: mockedUser,
  },
  {
    id: '4',
    text: 'Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long textSome very long text Some very long text Some very long text Some very long text',
    user: mockedUser,
  },
  {
    id: '5',
    text: 'Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long text Some very long textSome very long text Some very long text Some very long text Some very long text',
    user: mockedUser,
  },
];
