import { type FC } from 'react';
// import cls from './LanguageSwitcher.module.scss';
import { classNames } from 'shared/lib';
import { Button } from 'shared/ui';
import { ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  className?: string
  short?: boolean
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = props => {
  const { t, i18n, } = useTranslation();

  const toggleLanguage = (): void => {
    void i18n.changeLanguage(i18n.language === 'uk' ? 'en' : 'uk');
  };

  return (
    <Button
      theme={ButtonTheme.CLEAR}
      className={classNames('', {}, [props.className,])}
      onClick={toggleLanguage}
    >
      {props.short ? t('language_short') : t('language')}
    </Button>
  );
};
