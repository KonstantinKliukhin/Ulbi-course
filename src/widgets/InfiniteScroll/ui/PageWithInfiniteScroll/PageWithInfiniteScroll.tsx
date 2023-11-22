import { memo, type PropsWithChildren, type UIEvent, useCallback, useRef } from 'react';
import { Page } from '../../../../shared/ui/Page/Page';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch, useAppSelector, useInitialEffect, useThrottle } from 'shared/lib';
import { getUiScrollByPath, UIActions } from 'features/UI';
import { useLocation } from 'react-router-dom';
import { type StateSchema } from 'app/providers/StoreProvider';
import cls from './PageWithInfiniteScroll.module.scss';

interface PageWithInfiniteScrollProps extends PropsWithChildren {
  className?: string
  onScrollEnd?: () => void
}

export const PageWithInfiniteScroll = memo<PageWithInfiniteScrollProps>(
  function PageWithInfiniteScroll (props) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const savedScroll = useAppSelector(
      (state: StateSchema) => getUiScrollByPath(state, location.pathname)
    );
    useInfiniteScroll({
      triggerRef,
      wrapperRef,
      onScrollEnd: props.onScrollEnd,
    });

    useInitialEffect(useCallback(() => {
      if (wrapperRef.current) {
        wrapperRef.current.scrollTop = savedScroll;
      }
    }, [savedScroll,]));

    const onScroll = useThrottle(useCallback((e: UIEvent<HTMLDivElement>) => {
      dispatch(UIActions.setScrollPosition({
        position: e.currentTarget.scrollTop,
        path: location.pathname,
      }));
    }, [dispatch, location.pathname,]), 1000);

    return (
      <Page onScroll={onScroll} className={props.className} ref={wrapperRef}>
        {props.children}
        {props.onScrollEnd ? <div className={cls.trigger} ref={triggerRef}/> : null}
      </Page>
    );
  });
