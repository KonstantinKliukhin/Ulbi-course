import { type FC } from 'react';
import cls from './ArticleViewSelector.module.scss';
import { classNames } from '@/shared/lib';
import { ArticleView } from '@/entities/Article';
import ListSvg from '../../../../../public/assets/icons/list-24-24.svg';
import TiledSvg from '../../../../../public/assets/icons/tiled-24-24.svg';
import { Button, HStack, Icon } from '@/shared/ui';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onSelectView: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.BIG,
    icon: ListSvg,
  },
  {
    view: ArticleView.SMALL,
    icon: TiledSvg,
  },
];

export const ArticleViewSelector: FC<ArticleViewSelectorProps> = (props) => {
  return (
    <HStack xGap={8} align="start" className={props.className}>
      {viewTypes.map((viewType, index) => (
        <Button
          className={classNames(cls.button, {
            [cls.selected]: props.view === viewType.view,
          })}
          onClick={props.onSelectView.bind(null, viewType.view)}
          theme="clear"
          square
          key={index}
        >
          <Icon Svg={viewType.icon} />
        </Button>
      ))}
    </HStack>
  );
};
