import { memo, type PropsWithChildren, useRef } from 'react';
import { Page } from '../Page/Page';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';

interface PageWithInfiniteScrollProps extends PropsWithChildren {
  className?: string
  onScrollEnd?: () => void
}

export const PageWithInfiniteScroll = memo<PageWithInfiniteScrollProps>(
  function PageWithInfiniteScroll (props) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useInfiniteScroll({
      triggerRef,
      wrapperRef,
      onScrollEnd: props.onScrollEnd,
    });

    return (
      <Page className={props.className} ref={wrapperRef}>
        {props.children}
        <div ref={triggerRef}/>
      </Page>
    );
  });
