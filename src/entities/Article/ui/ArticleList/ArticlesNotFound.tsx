import { type FC } from 'react';
import { Text } from 'shared/ui';
import { useTranslation } from 'react-i18next';

export const ArticlesNotFound: FC = () => {
  const { t, } = useTranslation('article');
  return <Text title={t('articles_not_found')} size="l" align="center" />;
};
