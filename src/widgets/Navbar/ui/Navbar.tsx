import { type FC } from 'react';
import cls from './Navbar.module.scss';
import { classNames, useBoolState } from 'shared/lib';
import { Button, Modal } from 'shared/ui';
import { ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = props => {
  const authModal = useBoolState();
  const { t, } = useTranslation();
  return (
    <div className={classNames(cls.navbar, {}, [props.className,])}>
      <Button theme={ButtonTheme.CLEAR_INVERTED} className={cls.links} onClick={authModal.enable}>
        {t('login')}
      </Button>
      <Modal open={authModal.boolState} onClose={authModal.disable}>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, doloribus.</div>
      </Modal>
    </div>
  );
};
