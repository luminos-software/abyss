import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

const actionCreator = actionCreatorFactory('offline');

export const OfflineActions = {
  rollback: actionCreator('ROLLBACK'),
  commit: actionCreator('COMMIT')
};

export type State = Readonly<{}>;

const initialState: State = {};

export const reducer = reducerWithInitialState(initialState).build();
