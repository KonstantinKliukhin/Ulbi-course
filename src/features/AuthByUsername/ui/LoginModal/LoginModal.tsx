import { type ComponentProps, memo, Suspense } from 'react';
import { Loader, Modal } from 'shared/ui';
import { AsyncLoginForm as LoginForm } from '../LoginForm/AsyncLoginForm';

interface LoginModalProps extends Pick<ComponentProps<typeof Modal>, 'onClose' | 'open'> {
  className?: string
}

export const LoginModal = memo<LoginModalProps>(function LoginModal (props) {
  return (
    <Modal
      lazy
      open={props.open}
      onClose={props.onClose}
    >
      <Suspense fallback={<Loader/>}>
        <LoginForm onSuccess={props.onClose}/>
      </Suspense>
    </Modal>
  );
});
