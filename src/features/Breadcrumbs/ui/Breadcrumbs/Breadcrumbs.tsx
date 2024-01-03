import cls from './Breadcrumbs.module.scss';
import { classNames } from 'shared/lib';
import { memo } from 'react';

interface BreadcrumbsProps {
  className?: string;
}

export const Breadcrumbs = memo<BreadcrumbsProps>(function Breadcrumbs (props) {
  return (
    <div className={classNames(cls.Breadcrumbs, {}, [props.className,])}></div>
  );
});
