import {
  forwardRef,
  type HTMLAttributes,
  memo,
  type PropsWithChildren
} from 'react';
import cls from './Page.module.scss';
import { classNames } from '../../lib/ui/classNames/classNames';
import { type TestProps } from '../../types/testProps';

interface PageProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement>, TestProps {
  className?: string;
}

export const PAGE_ID = 'page';

export const Page = memo(
  forwardRef<HTMLDivElement, PageProps>(function Page (props, ref) {
    const { className, 'data-testid': dataTestId, ...mainProps } = props;

    return (
      <main
        {...mainProps}
        data-testid={`${dataTestId}.Page`}
        className={classNames(cls.Page, {}, [className,])}
        ref={ref}
        id={PAGE_ID}
      >
        {props.children}
      </main>
    );
  })
);
