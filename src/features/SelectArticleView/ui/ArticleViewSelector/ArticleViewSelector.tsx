import { type FC } from 'react';
import cls from './ArticleViewSelector.module.scss';
import { classNames } from '@/shared/lib';
import { ArticleView } from '@/entities/Article';
import { ListIcon, TiledIcon } from '@/shared/assets';
import { Button, HStack, Icon } from '@/shared/ui';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onSelectView: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.BIG,
    icon: ListIcon,
  },
  {
    view: ArticleView.SMALL,
    icon: TiledIcon,
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
