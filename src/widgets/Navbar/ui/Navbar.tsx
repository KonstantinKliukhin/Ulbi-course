import { type FC } from 'react';
import cls from './Navbar.module.scss';
import { classNames, useBoolState } from 'shared/lib';
import { Button } from 'shared/ui';
import { ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { LoginModal } from 'features/AuthByUsername';

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = props => {
  const loginModal = useBoolState();
  const { t, } = useTranslation();

  return (
    <div className={classNames(cls.navbar, {}, [props.className,])}>
      <Button theme={ButtonTheme.CLEAR_INVERTED} className={cls.links} onClick={loginModal.enable}>
        {t('login')}
      </Button>
      <LoginModal open={loginModal.boolState} onClose={loginModal.disable}/>
    </div>
  );
};
