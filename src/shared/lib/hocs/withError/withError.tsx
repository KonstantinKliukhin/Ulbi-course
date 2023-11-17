import { type FC } from 'react';
import { Text, TextAlign, TextTheme } from '../../../ui/Text/Text';
import { COMMON_API_ERRORS } from '../../../constants/commonApiErrors';
import i18n from '../../../config/i18n/i18n';
import { useAppSelector } from 'shared/lib';

export interface WithErrorProps {
  error?: string | null
}

interface DefaultErrorProps {
  error?: string
}

interface WithErrorOptions<Props extends DefaultErrorProps> {
  ErrorComponent?: FC<Props>
  errorSelector?: (state: StateSchema) => string | null
}

const DefaultErrorComponent: FC<DefaultErrorProps> = props => (
  <Text
    align={TextAlign.CENTER}
    theme={TextTheme.ERROR}
    title={props.error ?? COMMON_API_ERRORS.UNKNOWN_ERROR}
    text={i18n.t('try_reload')}
  />
);

export const withError = <ErrorProps extends DefaultErrorProps>
  (options?: WithErrorOptions<ErrorProps>) => <Props extends WithErrorProps>(WrappedComponent: FC<Props>) => {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    const ErrorComponent = options?.ErrorComponent ?? DefaultErrorComponent;

    const ReturnComponent: FC<Props> = (props) => {
      const error = useAppSelector(options?.errorSelector ?? (() => props.error));
      if (error) {
        const errorProps = { error, } as unknown as ErrorProps;
        return <ErrorComponent {...errorProps}/>;
      } else {
        return <WrappedComponent {...props} />;
      }
    };

    ReturnComponent.displayName = `withError(${displayName})`;

    return ReturnComponent;
  };
