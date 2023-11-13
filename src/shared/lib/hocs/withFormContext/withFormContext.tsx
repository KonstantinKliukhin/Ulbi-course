import { type FC, memo } from 'react';
import { useFormContext, type UseFormReturn } from 'react-hook-form';

export const withFormContext = <Props extends Record<string, any>>(WrappedComponent: FC<Props>) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ReturnComponent: FC<Omit<Props, keyof UseFormReturn>> = memo(props => {
    const methods = useFormContext();

    // @ts-expect-error props could be instanced with different types, be careful
    return <WrappedComponent {...methods} {...props} />;
  });

  ReturnComponent.displayName = `withFormContext(${displayName})`;

  return ReturnComponent;
};
