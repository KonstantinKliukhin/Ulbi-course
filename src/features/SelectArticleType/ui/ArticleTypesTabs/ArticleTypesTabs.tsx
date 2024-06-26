import { memo, useCallback, useMemo } from 'react';
import { type TabItem, Tabs } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { ARTICLE_TYPE_TRANSLATIONS } from '../../../../entities/Article/constants/translations';

import { ArticleType } from '@/entities/Article';

interface ArticleTypesTabsProps {
  className?: string;
  onSelectType: (type: ArticleType) => void;
  value: ArticleType | ArticleType[];
  error?: string | null;
  label?: string;
  excludeAll?: boolean;
}

const articleTypes = Object.values(ArticleType);

export const ArticleTypesTabs = memo<ArticleTypesTabsProps>(
  function ArticleTypesTabs (props) {
    const { onSelectType, } = props;
    const { t, } = useTranslation('article');

    const typeTabs = useMemo<Array<TabItem<ArticleType>>>(
      () =>
        articleTypes
          .filter(
            (articleType) =>
              !props.excludeAll || articleType !== ArticleType.ALL
          )
          .map((articleType) => ({
            value: articleType,
            content: ARTICLE_TYPE_TRANSLATIONS[articleType](t),
          })),
      [props.excludeAll, t,]
    );

    const onTabClick = useCallback(
      (tab: TabItem<ArticleType>) => {
        onSelectType(tab.value);
      },
      [onSelectType,]
    );

    return (
      <Tabs
        label={props.label}
        error={props.error}
        tabs={typeTabs}
        value={props.value}
        onTabClick={onTabClick}
        className={props.className}
      />
    );
  }
);
