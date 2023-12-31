import { type CSSProperties, useMemo } from 'react';
import { useDrawerContext } from '../drawerContext/drawerContext';
import { type DrawerPosition } from '../../types/position';
import {
  DEFAULT_HEIGHT_IN_PERCENTAGES,
  DEFAULT_WIDTH_IN_PERCENTAGES,
  HEIGHT_BY_NESTING_MULTIPLIER, WIDTH_BY_NESTING_MULTIPLIER
} from '../../constants/ui';

interface DrawerPositionStyle {
  height?: string;
  width?: string;
}

const verticalStyleGetter = (nestedLevel: number): DrawerPositionStyle => ({
  height: `${DEFAULT_HEIGHT_IN_PERCENTAGES - HEIGHT_BY_NESTING_MULTIPLIER * nestedLevel}%`,
});

const horizontalStyleGetter = (nestedLevel: number): DrawerPositionStyle => ({
  width: `${DEFAULT_WIDTH_IN_PERCENTAGES - WIDTH_BY_NESTING_MULTIPLIER * nestedLevel}%`,
});

const mapPositionToStyleGetter: Record<DrawerPosition, (nestedLevel: number) => DrawerPositionStyle> = {
  top: verticalStyleGetter,
  right: horizontalStyleGetter,
  bottom: verticalStyleGetter,
  left: horizontalStyleGetter,
};

export const useDrawerPositionStyle = (position: DrawerPosition) => {
  const { nestedLevel, } = useDrawerContext();

  return useMemo<CSSProperties>(
    () => mapPositionToStyleGetter[position](nestedLevel),
    [nestedLevel, position,]
  );
};
