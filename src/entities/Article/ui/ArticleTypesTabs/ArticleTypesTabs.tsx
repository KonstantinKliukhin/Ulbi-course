import { memo, useCallback, useMemo } from 'react';
import { type TabItem, Tabs } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { ARTICLE_TYPE_TRANSLATIONS } from '../../constants/translations';
import { ArticleType } from '../../model/types/article';

interface ArticleTypesTabsProps {
  className?: string
  onSelectType: (type: ArticleType) => void
  value: ArticleType
}

const articleTypes = Object.values(ArticleType);

export const ArticleTypesTabs = memo<ArticleTypesTabsProps>(function ArticleTypesTabs (props) {
  const { onSelectType, } = props;
  const { t, } = useTranslation('article');

  const typeTabs = useMemo<Array<TabItem<ArticleType>>>(() => (
    articleTypes.map(articleType => ({
      value: articleType,
      content: ARTICLE_TYPE_TRANSLATIONS[articleType](t),
    }))
  ), [t,]);

  const onTabClick = useCallback((tab: TabItem<ArticleType>) => {
    onSelectType(tab.value);
  }, [onSelectType,]);

  return (
    <Tabs
      tabs={typeTabs}
      value={props.value}
      onTabClick={onTabClick}
      className={props.className}
    />
  );
});
