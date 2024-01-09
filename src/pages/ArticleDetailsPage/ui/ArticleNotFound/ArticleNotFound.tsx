import { type FC } from 'react';
import { Page, Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';

export const ArticleNotFound: FC = () => {
  const { t, } = useTranslation('article');

  return (
    <Page>
      <Text title={t('article_not_found')} align="center" theme="error" />
    </Page>
  );
};
