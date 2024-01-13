import React, { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/shared/ui';

const AboutPage: FC = () => {
  const { t, } = useTranslation('about');

  return (
    <Page data-testid="About">
      {t('about_site')}
    </Page>
  );
};

export default AboutPage;
