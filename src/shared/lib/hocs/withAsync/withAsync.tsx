import { type WithLoadingOptions, withLoading, type WithLoadingProps } from '../withLoading/withLoading';
import { type DefaultErrorProps, type WithErrorOptions, type WithErrorProps, withError } from '../withError/withError';
import { type FC } from 'react';
import { compose } from '@reduxjs/toolkit';

export type WithAsyncProps = WithErrorProps & WithLoadingProps;

export const withAsync =
    <ErrorProps extends DefaultErrorProps>(options: WithLoadingOptions & WithErrorOptions<ErrorProps>) =>
    <Props extends WithAsyncProps>(Component: FC<Props>): FC<Props> => {
      const errorOptions: WithErrorOptions<ErrorProps> = {
        errorSelector: options.errorSelector,
        ErrorComponent: options.ErrorComponent,
      };
      const loadingOptions: WithLoadingOptions = {
        loadingSelector: options.loadingSelector,
        loadingComponent: options.loadingComponent,
      };

      return compose(withLoading(loadingOptions), withError(errorOptions))(Component) as FC<Props>;
    };
