import { type FC } from 'react';
import cls from './Loader.module.scss';
import { classNames } from '../../lib/ui/classNames/classNames';
import { type TestProps } from '../../types/testProps';

interface Props extends TestProps {
  centered?: boolean;
}

export const Loader: FC<Props> = (props) => (
  <div
    className={classNames(cls.wrapper, { [cls.centered]: props.centered, })}
    data-testid={`${props['data-testid']}.Loader`}
  >
    <div className={cls.Loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
