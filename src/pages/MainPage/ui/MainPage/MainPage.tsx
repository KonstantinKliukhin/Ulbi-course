import React, { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Counter } from '@/entities/Counter';
import { Page } from '@/shared/ui';

const MainPage: FC = () => {
  const { t, } = useTranslation('main');

  return (
    <Page>
      <Counter/>
      {t('main_page')}
    </Page>
  );
};

export default MainPage;
