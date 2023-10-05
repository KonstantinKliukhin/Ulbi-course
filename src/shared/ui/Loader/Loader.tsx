import { type FC } from 'react';
import cls from './Loader.module.scss';

export const Loader: FC = () => {
  return (
    <div className={cls.Loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
