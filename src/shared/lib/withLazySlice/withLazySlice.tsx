import { useStore } from 'react-redux';
import { type ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { type Reducer } from '@reduxjs/toolkit';
import { type FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib';

const getInitSliceAction = (sliceKey: keyof StateSchema) => ({ type: `@@INIT_SLICE ${sliceKey}`, });
const getRemoveSliceAction = (sliceKey: keyof StateSchema) => ({ type: `@@DESTROY_SLICE ${sliceKey}`, });

interface WithLazySliceOptions<Key extends keyof StateSchema> {
  name: Key
  reducer: Reducer<NonNullable<StateSchema[Key]>>
  removeAfterMount?: boolean
  onlyIfSliceReady?: boolean
}

export const withLazySlice = <Key extends keyof StateSchema, Props>
  (WrappedComponent: FC<Props>, options: WithLazySliceOptions<Key>): FC<Props> => {
  const {
    name,
    reducer,
    onlyIfSliceReady,
    removeAfterMount,
  } = options;
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ReturnComponent: FC<Props> = props => {
    const dispatch = useAppDispatch();
    const store = useStore() as ReduxStoreWithManager;
    const isReady = Boolean(useAppSelector(state => state[name]));

    useEffect(function manageLazyReducer () {
      store.reducerManager.add(name, reducer);
      dispatch(getInitSliceAction(name));

      return () => {
        if (removeAfterMount) return;
        store.reducerManager.remove(name);
        dispatch(getRemoveSliceAction(name));
      };
      // eslint-disable-next-line
        }, []);

    if (!isReady && onlyIfSliceReady) return null;

    // @ts-expect-error strange error with jsx attributes
    return <WrappedComponent {...props}/>;
  };

  ReturnComponent.displayName = `withLazy${name}Slice(${displayName})`;

  return ReturnComponent;
};
