import { useStore } from 'react-redux';
import { type ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { type Reducer } from '@reduxjs/toolkit';
import { type FC, type ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib';
import { Loader } from 'shared/ui';

const getInitSliceAction = (sliceKey: keyof StateSchema) => ({ type: `@@INIT_SLICE ${sliceKey}`, });
const getRemoveSliceAction = (sliceKey: keyof StateSchema) => ({ type: `@@DESTROY_SLICE ${sliceKey}`, });

interface WithLazySliceOptions<Key extends keyof StateSchema> {
  name: Key
  reducer: Reducer<NonNullable<StateSchema[Key]>>
  removeOnUnmount?: boolean
  onlyIfSliceReady?: boolean
  LoaderComponent?: ReactNode
}

export const withLazySlice = <Key extends keyof StateSchema, Props extends Record<string, any>>
  (WrappedComponent: FC<Props>, options: WithLazySliceOptions<Key>): FC<Props> => {
  const {
    name,
    reducer,
    onlyIfSliceReady,
    removeOnUnmount = false,
  } = options;
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ReturnComponent: FC<Props> = props => {
    const dispatch = useAppDispatch();
    const store = useStore() as ReduxStoreWithManager;
    const isReady = Boolean(useAppSelector(state => state[name]));
    const loader = options.LoaderComponent ?? <Loader centered/>;

    useEffect(function manageLazyReducer () {
      store.reducerManager.add(name, reducer);
      dispatch(getInitSliceAction(name));

      return () => {
        if (removeOnUnmount) {
          store.reducerManager.remove(name);
          dispatch(getRemoveSliceAction(name));
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isReady && onlyIfSliceReady) return loader;

    return <WrappedComponent {...props}/>;
  };

  ReturnComponent.displayName = `withLazy${name}Slice(${displayName})`;

  return ReturnComponent;
};
