import { type FC } from 'react';
import { Text } from '../../../ui/Text/Text';
import { COMMON_API_ERRORS } from '../../../constants/commonApiErrors';
import i18n from '../../../config/i18n/i18n';
import { useAppSelector } from '../../hooks/reduxHooks/useAppSelector';

export interface WithErrorProps {
  error?: string | null;
}

export interface DefaultErrorProps {
  error?: string;
}

export interface WithErrorOptions<Props extends DefaultErrorProps> {
  ErrorComponent?: FC<Props>;
  errorSelector?: (state: StateSchema) => string | null;
}

const DefaultErrorComponent: FC<DefaultErrorProps> = (props) => (
  <Text
    align="center"
    theme="error"
    title={props.error ?? COMMON_API_ERRORS.UNKNOWN_ERROR}
    text={i18n.t('try_reload')}
  />
);

export const withError =
  <ErrorProps extends DefaultErrorProps>(
    options?: WithErrorOptions<ErrorProps>
  ) =>
  <Props extends WithErrorProps>(WrappedComponent: FC<Props>) => {
    const displayName =
      WrappedComponent.displayName || WrappedComponent.name || 'Component';
    const ErrorComponent = options?.ErrorComponent ?? DefaultErrorComponent;

    const ReturnComponent: FC<Props> = (props) => {
      const error = useAppSelector(
        options?.errorSelector ?? (() => props.error)
      );
      if (error) {
        const errorProps = { error, } as unknown as ErrorProps;

        return <ErrorComponent {...errorProps} />;
      } else {
        return <WrappedComponent {...props} />;
      }
    };

    ReturnComponent.displayName = `withError(${displayName})`;

    return ReturnComponent;
  };
