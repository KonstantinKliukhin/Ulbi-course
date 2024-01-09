import {
  forwardRef,
  memo,
  type PropsWithChildren,
  type UIEvent,
  useCallback, useEffect,
  useRef
} from 'react';
import { Page } from 'shared/ui';
import {
  useInfiniteScroll,
  useAppDispatch,
  useAppSelector,
  useThrottle
} from 'shared/lib';
import { getUiScrollByPath, UIActions } from 'features/UI';
import { useLocation } from 'react-router-dom';
import cls from './PageWithInfiniteScroll.module.scss';

interface PageWithInfiniteScrollProps extends PropsWithChildren {
  className?: string;
  onScrollEnd?: () => void;
  onScrollTopReached?: () => void;
}

export const PageWithInfiniteScroll = memo(
  forwardRef<HTMLDivElement, PageWithInfiniteScrollProps>(
    function PageWithInfiniteScroll (props, propsRef) {
      const bottomTriggerRef = useRef<HTMLDivElement>(null);
      const topTriggerRef = useRef<HTMLDivElement>(null);
      const wrapperRef = useRef<HTMLDivElement | null>(null);
      const dispatch = useAppDispatch();
      const location = useLocation();
      const savedScroll = useAppSelector((state: StateSchema) => getUiScrollByPath(state, location.pathname));
      useInfiniteScroll({
        triggerRef: bottomTriggerRef,
        wrapperRef,
        onScrollAchieved: props.onScrollEnd,
      });

      useInfiniteScroll({
        triggerRef: topTriggerRef,
        wrapperRef,
        onScrollAchieved: props.onScrollTopReached,
      });

      useEffect(() => {
        if (wrapperRef.current && typeof savedScroll === 'number') {
          const isScrollFull = wrapperRef.current?.scrollTop === savedScroll;
          const scrollToApply = isScrollFull ? savedScroll - 20 : savedScroll;
          wrapperRef.current?.scrollTo({ top: scrollToApply, });
        }
      }
      // eslint-disable-next-line
      , []);

      const onScroll = useThrottle(
        useCallback(
          (e: UIEvent<HTMLDivElement>) => {
            dispatch(
              UIActions.setScrollPosition({
                position: e.currentTarget.scrollTop,
                path: location.pathname,
              })
            );
          },
          [dispatch, location.pathname,]
        ),
        1000
      );

      return (
        <Page
          onScroll={onScroll}
          className={props.className}
          ref={(element) => {
            wrapperRef.current = element;
            if (typeof propsRef === 'function') {
              propsRef(element);
            } else if (propsRef) {
              propsRef.current = element;
            }
          }}
        >
          {props.onScrollTopReached
            ? <div className={cls.trigger} ref={topTriggerRef} />
            : null
          }
          {props.children}
          {props.onScrollEnd
            ? <div className={cls.trigger} ref={bottomTriggerRef} />
            : null
          }
        </Page>
      );
    }
  )
);
