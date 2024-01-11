import { memo, useCallback, useState } from 'react';
import { HStack } from '../../../Stack/HStack/HStack';
import { Star } from '../Star/Star';

interface StarsRatingProps {
  className?: string;
  size?: number;
  selectedStars?: number;
  onSelect?: (star: number) => void;
}

const stars = [1, 2, 3, 4, 5,];

export const StarsRating = memo<StarsRatingProps>(function StarsRating (props) {
  const { onSelect, } = props;
  const [hoveredStar, setHoveredStar,] = useState<number>(props.selectedStars ?? 0);
  const [isSelected, setIsSelected,] = useState(Boolean(props.selectedStars));

  const onHover = useCallback((star: number) => {
    if (!isSelected) {
      setHoveredStar(star);
    }
  }, [isSelected,]);

  const onLeave = useCallback(() => {
    if (!isSelected) {
      setHoveredStar(0);
    }
  }, [isSelected,]);

  const onClick = useCallback((star: number) => {
    if (!isSelected) {
      onSelect?.(star);
      setHoveredStar(star);
      setIsSelected(true);
    }
  }, [isSelected, onSelect,]);

  return (
    <HStack
      xGap={4}
      onMouseLeave={onLeave}
      className={props.className}
    >
      {stars.map(starNumber => (
        <Star
          key={starNumber}
          starNumber={starNumber}
          onClick={onClick}
          onHover={onHover}
          hoveredStar={hoveredStar}
          isSelected={isSelected}
          size={props.size}
        />
      ))}
    </HStack>
  );
});
