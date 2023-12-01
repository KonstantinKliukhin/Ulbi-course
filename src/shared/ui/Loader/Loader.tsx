import { type FC } from 'react';
import cls from './Loader.module.scss';
import { classNames } from '../../lib/classNames/classNames';

interface Props {
  centered?: boolean
}

export const Loader: FC<Props> = (props) => (
  <div className={classNames(cls.wrapper, { [cls.centered]: props.centered, })}>
    <div className={cls.Loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
