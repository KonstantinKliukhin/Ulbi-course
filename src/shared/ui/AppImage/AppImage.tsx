import { type ImgHTMLAttributes, memo, type ReactNode, useLayoutEffect, useState } from 'react';
import { useIsMounted } from '../../lib/utils/useIsMounted/useIsMounted';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactNode;
  errorFallback?: ReactNode;
}

export const AppImage = memo<ImageProps>(function AppImage (props) {
  const {
    src,
    alt = 'image',
    fallback,
    errorFallback,
    ...imageProps
  } = props;
  const [isLoading, setIsLoading,] = useState(false);
  const [isError, setIsError,] = useState(false);
  const isMounted = useIsMounted();

  useLayoutEffect(function loadImage () {
    if (!src) return;
    const img = new Image();
    setIsLoading(true);

    img.src = src;
    img.onload = () => {
      if (isMounted.current) {
        setIsLoading(false);
        setIsError(false);
      }
    };

    img.onerror = () => {
      if (isMounted.current) {
        setIsLoading(false);
        setIsError(true);
      }
    };
  }, [src, isMounted,]);

  if (isLoading && fallback) return fallback;

  if (isError && errorFallback) return errorFallback;

  return (
    <img
      {...imageProps}
      alt={alt}
      src={src}
    />
  );
});
