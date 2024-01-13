import React, { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/shared/ui';

const MainPage: FC = () => {
  const { t, } = useTranslation('main');

  return (
    <Page data-testid="Main">
      {t('main_page')}
    </Page>
  );
};

export default MainPage;
