import { forwardRef, type HTMLAttributes, memo, type PropsWithChildren } from 'react';
import cls from './Page.module.scss';
import { classNames } from 'shared/lib';

interface PageProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const Page = memo(forwardRef<HTMLDivElement, PageProps>(
  function Page (props, ref) {
    const { className, ...mainProps } = props;
    return (
      <main {...mainProps} className={classNames(cls.Page, {}, [className,])} ref={ref}>
        {props.children}
      </main>
    );
  }));
