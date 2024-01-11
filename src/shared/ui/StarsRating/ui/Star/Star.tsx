import cls from './Star.module.scss';
import { classNames } from '../../../../lib/ui/classNames/classNames';
import { type CSSProperties, memo, useCallback, useMemo } from 'react';
import { Icon } from '../../../Icon/Icon';
import { Flex } from '../../../Stack/Flex/Flex';
import { StarIcon } from '../../../../assets';

interface StarProps {
  starNumber: number;
  onClick: (starNumber: number) => void;
  onHover: (starNumber: number) => void;
  hoveredStar: number;
  isSelected: boolean;
  className?: string;
  size?: number;
}

const START_ICON_HEIGHT = 22;
const START_ICON_WIDTH = 24;

export const Star = memo<StarProps>(function Star (props) {
  const { onHover, onClick, } = props;
  const startContainerStyle = useMemo<CSSProperties>(() => ({
    height: props.size ?? START_ICON_HEIGHT,
    width: props.size ?? START_ICON_WIDTH,
  }), [props.size,]);
  const starStyle = useMemo<CSSProperties>(() => ({
    transform: `
    scaleX(${((props.size ?? START_ICON_WIDTH) / START_ICON_WIDTH)}) 
    scaleY(${((props.size ?? START_ICON_HEIGHT) / START_ICON_HEIGHT)})
    `,
  }), [props.size,]);

  const handleHover = useCallback(() => {
    onHover(props.starNumber);
  }, [onHover, props.starNumber,]);

  const handleClick = useCallback(() => {
    onClick(props.starNumber);
  }, [onClick, props.starNumber,]);

  return (
    <Flex
      justify="center"
      align="center"
      key={props.starNumber}
      style={startContainerStyle}
      onMouseEnter={handleHover}
      onClick={handleClick}
    >
      <Icon
        Svg={StarIcon}
        style={starStyle}
        className={classNames(
          cls.startIcon,
          {
            [cls.normal]: props.hoveredStar < props.starNumber,
            [cls.hover]: props.hoveredStar >= props.starNumber,
            [cls.selected]: props.isSelected,
          }
        )}
      />
    </Flex>
  );
});
