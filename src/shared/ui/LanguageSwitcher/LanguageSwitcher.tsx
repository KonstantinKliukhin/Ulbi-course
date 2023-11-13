import { memo } from 'react';
import { classNames } from 'shared/lib';
import { Button, ButtonTheme } from '../Button/Button';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  className?: string
  short?: boolean
}

export const LanguageSwitcher = memo<LanguageSwitcherProps>(function LanguageSwitcher (props) {
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
});
