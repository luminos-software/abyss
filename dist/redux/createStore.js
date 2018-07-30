import { offline } from '@redux-offline/redux-offline';
import R from 'ramda';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/developmentOnly';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { transloaditMiddleware } from '../transloadit/middleware';
import { apiMiddleware } from './apiMiddleware';
import { loggerMiddleware } from './loggerMiddleware';
import { offlineConfig } from './offline';
import * as offlineEpics from './offlineEpics';
const compact = R.reject(R.isNil);
// tslint:disable-next-line:no-any
export function createReduxStore(epics, reducers, config) {
    const epicMiddleware = createEpicMiddleware();
    const offlineEnhancer = config.offline ? offline(Object.assign({}, offlineConfig, config.offline)) : null;
    const middlewares = compact([
        apiMiddleware,
        config.transloadit ? transloaditMiddleware : null,
        epicMiddleware,
        config.logger ? loggerMiddleware : null
    ]);
    const enhancers = compact([
        offlineEnhancer,
        applyMiddleware(...middlewares),
        devToolsEnhancer({})
    ]);
    const enhancer = compose(...enhancers);
    const reducer = combineReducers(reducers);
    const newStore = createStore(reducer, enhancer);
    store = newStore;
    epicMiddleware.run(combineEpics(...R.values(R.mergeAll([offlineEpics, epics]))));
    return newStore;
}
export let store = null;
//# sourceMappingURL=createStore.js.map