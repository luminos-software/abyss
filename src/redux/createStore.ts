/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from '@react-native-community/async-storage';
import R from 'ramda';
import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Middleware,
  Reducer,
  Store,
  StoreEnhancer
} from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/developmentOnly';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import { transloaditMiddleware } from '../transloadit/middleware';
import { setTransloaditReduxStore } from '../transloadit/service';
import { apiMiddleware } from './apiMiddleware';
import { loggerMiddleware } from './loggerMiddleware';

interface IReduxConfig<State extends Record<string, any>> {
  offline: {
    persistCallback?: () => void;
    persistConfig?: PersistConfig<State>;
  };
  transloadit?: boolean;
  logger?: boolean;
}

const compact = R.reject(R.isNil);

export const createReduxStore = <State extends Record<string, any>>(
  epics: any,
  reducers: any,
  config: IReduxConfig<State>
): Store<State, Action> => {
  const epicMiddleware = createEpicMiddleware<Action, Action, State>();

  const middlewares = compact([
    apiMiddleware,
    config.transloadit ? transloaditMiddleware : null,
    epicMiddleware,
    config.logger ? loggerMiddleware : null
  ]) as Middleware[];

  const enhancers = compact([applyMiddleware(...middlewares), devToolsEnhancer({})]) as StoreEnhancer[];

  const enhancer: StoreEnhancer<State> = compose(...enhancers);
  const reducer = combineReducers(reducers) as Reducer<State>;
  const persistedReducer = persistReducer({ key: 'persist', storage: AsyncStorage, ...config.offline }, reducer);

  const newStore: Store<State> = createStore(persistedReducer, enhancer);
  persistStore(newStore, null, config.offline.persistCallback);

  store = newStore;
  config.transloadit && setTransloaditReduxStore(store);

  epicMiddleware.run(combineEpics(...R.values(epics)));

  return newStore;
};

export let store: Store | null = null;
