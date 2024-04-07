import React, { type FC } from 'react';
import { Button, Page, Text, VStack } from '@/shared/ui';
import { Link } from 'react-router-dom';
import { RoutePath } from '@/shared/config';
import { useTranslation } from 'react-i18next';

const ForbiddenPage: FC = () => {
  const { t, } = useTranslation('forbidden');

  return (
    <Page data-testid="Forbidden">
      <VStack align="center" justify="center" yGap={16}>
        <Text
          align="center"
          theme="error"
          title={t('forbidden_text')}
        />
        <Link to={RoutePath.main}>
          <Button theme="backgroundInverted">{t('go_to_main')}</Button>
        </Link>
      </VStack>
    </Page>
  );
};

export default ForbiddenPage;
