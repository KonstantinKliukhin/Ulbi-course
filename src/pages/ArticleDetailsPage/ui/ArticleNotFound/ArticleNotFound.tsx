import { type FC } from 'react';
import { Text, TextAlign, TextTheme } from 'shared/ui';
import { useTranslation } from 'react-i18next';

export const ArticleNotFound: FC = () => {
  const { t, } = useTranslation('articleDetails');

  return (
    <Text title={t('article_not_found')} align={TextAlign.CENTER} theme={TextTheme.ERROR}/>
  );
};
