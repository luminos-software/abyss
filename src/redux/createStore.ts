/* eslint-disable @typescript-eslint/no-explicit-any */
import { offline } from '@redux-offline/redux-offline';
import { Config } from '@redux-offline/redux-offline/lib/types';
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
import { transloaditMiddleware } from '../transloadit/middleware';
import { setTransloaditReduxStore } from '../transloadit/service';
import { apiMiddleware } from './apiMiddleware';
import { loggerMiddleware } from './loggerMiddleware';
import { offlineConfig } from './offline';
import * as offlineEpics from './offlineEpics';

interface IReduxConfig {
  offline: false | Partial<Config>;
  transloadit?: boolean;
  logger?: boolean;
}

const compact = R.reject(R.isNil);

export const createReduxStore = <State extends Record<string, any>>(
  epics: any,
  reducers: any,
  config: IReduxConfig
): Store<State, Action> => {
  const epicMiddleware = createEpicMiddleware<Action, Action, State>();

  const offlineEnhancer = config.offline ? offline(R.mergeDeepRight(offlineConfig, config.offline) as Config) : null;

  const middlewares = compact([
    apiMiddleware,
    config.transloadit ? transloaditMiddleware : null,
    epicMiddleware,
    config.logger ? loggerMiddleware : null
  ]) as Middleware[];

  const enhancers = compact([
    offlineEnhancer,
    applyMiddleware(...middlewares),
    devToolsEnhancer({})
  ]) as StoreEnhancer[];

  const enhancer: StoreEnhancer<State> = compose(...enhancers);
  const reducer = combineReducers(reducers) as Reducer<State>;

  const newStore: Store<State> = createStore(reducer, enhancer);
  store = newStore;
  config.transloadit && setTransloaditReduxStore(store);

  epicMiddleware.run(combineEpics(...R.values(R.mergeAll([offlineEpics, epics]))));

  return newStore;
};

export let store: Store | null = null;
