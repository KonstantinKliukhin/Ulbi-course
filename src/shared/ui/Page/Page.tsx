import {
  forwardRef,
  type HTMLAttributes,
  memo,
  type PropsWithChildren
} from 'react';
import cls from './Page.module.scss';
import { classNames } from '../../lib/classNames/classNames';

interface PageProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const PAGE_ID = 'page';

export const Page = memo(
  forwardRef<HTMLDivElement, PageProps>(function Page (props, ref) {
    const { className, ...mainProps } = props;
    return (
      <main
        {...mainProps}
        className={classNames(cls.Page, {}, [className,])}
        ref={ref}
        id={PAGE_ID}
      >
        {props.children}
      </main>
    );
  })
);
