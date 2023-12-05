import {
  createContext,
  type CSSProperties,
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';
import cls from './Flyout.module.scss';
import { classNames } from '../../lib/classNames/classNames';
import { stopPropagation } from '../../lib/stopPropagation/stopPropagation';
import { useSyntheticMounted } from '../../lib/hooks/utility/useSyntheticMounted/useSyntheticMounted';
import { useEscapeClose } from '../../lib/hooks/ui/useEscapeClose/useEscapeClose';
import { Portal } from '../Portal/Portal';
import { HStack } from '../Stack/HStack/HStack';

interface FlyoutProps extends PropsWithChildren {
  className?: string
  contentClassName?: string
  open: boolean
  onClose: () => void
  lazy?: boolean
  removeContentWhenClosed?: boolean
}

interface FlyoutContext {
  nestedLevel: number
}

const DEFAULT_Z_INDEX = 10;
const DEFAULT_WIDTH_IN_PERCENTAGES = 75;
const WIDTH_BY_NESTING_MULTIPLIER = 5;

const flyoutContext = createContext<FlyoutContext>({ nestedLevel: 0, });

export const Flyout: FC<FlyoutProps> = (props) => {
  const { onClose, open, contentClassName, } = props;
  const [closing, setClosing,] = useState<boolean>(false);
  const syntheticMounted = useSyntheticMounted(open);
  const shouldRenderChildren =
    (!props.lazy || syntheticMounted) &&
    (open || !props.removeContentWhenClosed || closing);

  const handleClose = useCallback(() => {
    setClosing(true);

    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 200);
  }, [onClose,]);

  useEscapeClose(handleClose, open);

  const { nestedLevel, } = useContext(flyoutContext);
  const flyoutStyle = useMemo<CSSProperties>(
    () => ({
      zIndex: (nestedLevel + 1) * DEFAULT_Z_INDEX,
    }),
    [nestedLevel,]
  );

  const contentStyle = useMemo<CSSProperties>(
    () => ({
      width: `${
        DEFAULT_WIDTH_IN_PERCENTAGES - WIDTH_BY_NESTING_MULTIPLIER * nestedLevel
      }%`,
    }),
    [nestedLevel,]
  );

  const flyoutContextValue = useMemo<FlyoutContext>(
    () => ({
      nestedLevel: nestedLevel + 1,
    }),
    [nestedLevel,]
  );

  return (
    <flyoutContext.Provider value={flyoutContextValue}>
      <Portal>
        <div
          style={flyoutStyle}
          className={classNames(
            cls.Flyout,
            { [cls.open]: open, [cls.closing]: closing, },
            [props.className,]
          )}
        >
          <HStack
            justify="end"
            align="center"
            className={cls.overlay}
            onClick={handleClose}
          >
            <div
              style={contentStyle}
              className={classNames(cls.content, {}, [contentClassName,])}
              onClick={stopPropagation}
            >
              {shouldRenderChildren ? props.children : null}
            </div>
          </HStack>
        </div>
      </Portal>
    </flyoutContext.Provider>
  );
};
