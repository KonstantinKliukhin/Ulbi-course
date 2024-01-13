import { type FC, type PropsWithChildren } from 'react';
import { useInitUser } from '../../model/hooks/useInitUser/useInitUser';

export const UserIniter: FC<PropsWithChildren> = (props) => {
  useInitUser();

  return props.children;
};
