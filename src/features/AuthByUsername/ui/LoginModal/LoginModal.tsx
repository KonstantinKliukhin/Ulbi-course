import { type ComponentProps, type FC } from 'react';
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
        >
      <LoginForm/>
    </Modal>
  );
};
