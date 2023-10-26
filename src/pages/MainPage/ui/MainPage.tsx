import React, { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Counter } from 'entities/Counter';

const MainPage: FC = () => {
  const { t, } = useTranslation('main');

  return (
    <div>
      <Counter/>
      {t('main_page')}
    </div>
  );
};

export default MainPage;
