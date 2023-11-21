import { type FC } from 'react';
import cls from './NotFoundPage.module.scss';
import { classNames } from 'shared/lib';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared/ui';

interface NotFoundPageProps {
  className?: string
}

export const NotFoundPage: FC<NotFoundPageProps> = props => {
  const { t, } = useTranslation();
  return (
    <Page className={classNames(cls.NotFoundPage, {}, [props.className,])}>
      {t('not_found_page')}
    </Page>
  );
};
