import { type ComponentProps, type FC } from 'react';
import cls from './LoginModal.module.scss';
import { classNames } from 'shared/lib';
import { Modal } from 'shared/ui';
import { LoginForm } from '../LoginForm/LoginForm';

interface LoginModalProps extends Pick<ComponentProps<typeof Modal>, 'onClose' | 'open'> {
  className?: string
}

export const LoginModal: FC<LoginModalProps> = props => {
  return (
    <Modal
      lazy
      open={props.open}
      onClose={props.onClose}
      className={classNames(cls.LoginModal, {}, [props.className,])}
        >
      <LoginForm/>
    </Modal>
  );
};
