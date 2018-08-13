import { offline } from '@redux-offline/redux-offline';
import { Config } from '@redux-offline/redux-offline/lib/types';
import R from 'ramda';
import { Action, applyMiddleware, combineReducers, compose, createStore, Middleware, Reducer, Store, StoreEnhancer } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/developmentOnly';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { transloaditMiddleware } from '../transloadit/middleware';
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

// tslint:disable-next-line:no-any
export function createReduxStore<State>(epics: any, reducers: any, config: IReduxConfig): Store<State, Action> {
  const epicMiddleware = createEpicMiddleware<Action, Action, State>();

  const offlineEnhancer = config.offline ? offline(R.mergeDeepRight(offlineConfig, config.offline)) : null;

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
  const reducer: Reducer<State> = combineReducers(reducers);

  const newStore: Store<State> = createStore(reducer, enhancer);
  store = newStore;

  epicMiddleware.run(combineEpics(...R.values(R.mergeAll([offlineEpics, epics]))));

  return newStore;
}

export let store: Store | null = null;
