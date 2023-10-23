import { type FC } from 'react';
import cls from './Navbar.module.scss';
import { classNames } from 'shared/lib';

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = props => {
  return (
    <div className={classNames(cls.navbar, {}, [props.className,])}>
      <div className={cls.links}>

      </div>
    </div>
  );
};
