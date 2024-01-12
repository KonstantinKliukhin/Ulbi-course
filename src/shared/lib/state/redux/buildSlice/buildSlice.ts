import { createSlice } from '@reduxjs/toolkit';
import type { SliceCaseReducers, CreateSliceOptions, Slice } from '@reduxjs/toolkit/dist';
import { useActions } from '../useActions/useActions';
import { omit } from '../../../utils/omit/omit';

type UseActionsName<Name extends string> = `use${Capitalize<Name>}Actions`;
type ActionsName<Name extends string> = `${Name}Actions`;
type ReducerName<Name extends string> = `${Name}Reducer`;

type BuildSliceReturn<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string
> = Omit<Slice<State, CaseReducers, Name>, 'actions' | 'reducer'> &
{ [K in UseActionsName<Name>]: () => Slice<State, CaseReducers, Name>['actions'] } &
{ [K in ActionsName<Name>]: Slice<State, CaseReducers, Name>['actions'] } &
{ [K in ReducerName<Name>]: Slice<State, CaseReducers, Name>['reducer'] };

const getUseActionsName = <const Name extends string>(name: Name): UseActionsName<Name> => (
  `use${name[0].toUpperCase()}${name.slice(1)}Actions` as UseActionsName<Name>
);

const getActionsName = <const Name extends string>(name: Name): ActionsName<Name> => (
  `${name}Actions`
);

const getReducerName = <const Name extends string>(name: Name): ReducerName<Name> => (
  `${name}Reducer`
);

export const buildSlice = <
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string
>(options: CreateSliceOptions<State, CaseReducers, Name>): BuildSliceReturn<State, CaseReducers, Name> => {
  const slice = createSlice<State, CaseReducers, Name>(options);

  const useBoundActions = () => useActions(slice.actions);
  const useActionsName = getUseActionsName<Name>(options.name);
  const actionsName = getActionsName<Name>(options.name);
  const reducerName = getReducerName<Name>(options.name);

  return {
    ...omit(slice, 'actions', 'reducer'),
    [reducerName]: slice.reducer,
    [actionsName]: slice.actions,
    [useActionsName]: useBoundActions,
  } as unknown as BuildSliceReturn<State, CaseReducers, Name>;
};
