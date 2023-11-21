import { useStore } from 'react-redux';
import { type ReduxStoreWithManager, type StateSchema } from 'app/providers/StoreProvider';
import { type Reducer } from '@reduxjs/toolkit';
import { type FC, type ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib';
import { Loader } from 'shared/ui';

const getInitSliceAction = (sliceKey: keyof StateSchema) => ({ type: `@@INIT_SLICE ${sliceKey}`, });
const getRemoveSliceAction = (sliceKey: keyof StateSchema) => ({ type: `@@DESTROY_SLICE ${sliceKey}`, });

type ReducersList = {
  [Name in keyof StateSchema]?: Reducer<NonNullable<StateSchema[Name]>>;
};

interface WithLazySliceOptions {
  reducers: ReducersList
  removeOnUnmount?: boolean
  onlyIfSliceReady?: boolean
  loaderComponent?: ReactNode
}

export const withLazySlices = <const Key extends keyof StateSchema, >(options: WithLazySliceOptions) =>
    <Props extends Record<string, any>>(WrappedComponent: FC<Props>): FC<Props> => {
      const {
        reducers,
        onlyIfSliceReady = false,
        removeOnUnmount = false,
      } = options;
      const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

      const ReturnComponent: FC<Props> = props => {
        const dispatch = useAppDispatch();
        const store = useStore() as ReduxStoreWithManager;
        const isReady = useAppSelector(state => (
          Object.keys(reducers).every(key => Boolean(state[key as Key]))
        ));
        const loader = options.loaderComponent ?? <Loader centered/>;

        useEffect(function manageLazyReducer () {
          Object.entries(reducers).forEach(([key, reducer,]) => {
            if (!store.reducerManager.getReducerMap()[key as Key]) {
              store.reducerManager.add(key as Key, reducer as Reducer<NonNullable<Values<StateSchema>>>);
              dispatch(getInitSliceAction(key as Key));
            }
          });

          return () => {
            if (removeOnUnmount) {
              Object.keys(reducers).forEach(key => {
                store.reducerManager.remove(key as Key);
                dispatch(getRemoveSliceAction(key as Key));
              });
            }
          };
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        if (!isReady && onlyIfSliceReady) return loader;

        return <WrappedComponent {...props}/>;
      };

      ReturnComponent.displayName = `withLazySlices(${displayName})`;

      return ReturnComponent;
    };
