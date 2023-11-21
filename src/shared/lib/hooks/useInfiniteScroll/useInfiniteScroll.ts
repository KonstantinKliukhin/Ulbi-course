import { type MutableRefObject, useEffect } from 'react';

interface UseInfiniteScrollOptions {
  onScrollEnd?: () => void
  triggerRef: MutableRefObject<HTMLElement | null>
  wrapperRef: MutableRefObject<HTMLElement | null>
}

export const useInfiniteScroll = (options: UseInfiniteScrollOptions) => {
  const { onScrollEnd, triggerRef, wrapperRef, } = options;

  useEffect(function initializeObserver () {
    let observer: IntersectionObserver | null = null;
    const triggerElem = triggerRef.current;
    const wrapperElem = wrapperRef.current;

    if (onScrollEnd && triggerElem && wrapperElem) {
      const observerInit: IntersectionObserverInit = {
        root: wrapperElem,
        rootMargin: '0px',
        threshold: 1.0,
      };

      observer = new IntersectionObserver(
        ([entry,]) => {
          if (entry.isIntersecting) {
            onScrollEnd();
          }
        },
        observerInit
      );

      observer.observe(triggerElem);
    }

    return function unsubscribeObserver () {
      if (observer && triggerElem) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(triggerElem);
      }
    };
  }, [triggerRef, wrapperRef, onScrollEnd,]);
};
