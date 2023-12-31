import { type MutableRefObject, useEffect } from 'react';

interface UseInfiniteScrollOptions {
  onScrollAchieved?: () => void;
  triggerRef: MutableRefObject<HTMLElement | null>;
  wrapperRef: MutableRefObject<HTMLElement | null>;
}

export const useInfiniteScroll = (options: UseInfiniteScrollOptions) => {
  const { onScrollAchieved, triggerRef, wrapperRef, } = options;

  useEffect(
    function initializeObserver () {
      let observer: IntersectionObserver | null = null;
      const triggerElem = triggerRef.current;
      const wrapperElem = wrapperRef.current;

      if (onScrollAchieved && triggerElem && wrapperElem) {
        const observerInit: IntersectionObserverInit = {
          root: wrapperElem,
          rootMargin: '0px',
          threshold: 0.9,
        };

        observer = new IntersectionObserver(([entry,]) => {
          if (entry.isIntersecting) {
            onScrollAchieved();
          }
        }, observerInit);

        observer.observe(triggerElem);
      }

      return function unsubscribeObserver () {
        if (observer && triggerElem) {
          observer.unobserve(triggerElem);
        }
      };
    },
    [triggerRef, wrapperRef, onScrollAchieved,]
  );
};
