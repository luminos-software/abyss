"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const async_storage_1 = __importDefault(require("@react-native-community/async-storage"));
const ramda_1 = __importDefault(require("ramda"));
const redux_1 = require("redux");
const developmentOnly_1 = require("redux-devtools-extension/developmentOnly");
const redux_observable_1 = require("redux-observable");
const redux_persist_1 = require("redux-persist");
const middleware_1 = require("../transloadit/middleware");
const service_1 = require("../transloadit/service");
const apiMiddleware_1 = require("./apiMiddleware");
const loggerMiddleware_1 = require("./loggerMiddleware");
const compact = ramda_1.default.reject(ramda_1.default.isNil);
exports.createReduxStore = (epics, reducers, config) => {
    const epicMiddleware = redux_observable_1.createEpicMiddleware();
    const middlewares = compact([
        apiMiddleware_1.apiMiddleware,
        config.transloadit ? middleware_1.transloaditMiddleware : null,
        epicMiddleware,
        config.logger ? loggerMiddleware_1.loggerMiddleware : null
    ]);
    const enhancers = compact([redux_1.applyMiddleware(...middlewares), developmentOnly_1.devToolsEnhancer({})]);
    const enhancer = redux_1.compose(...enhancers);
    const reducer = redux_1.combineReducers(reducers);
    const persistedReducer = redux_persist_1.persistReducer(Object.assign({ key: 'persist', storage: async_storage_1.default }, config.offline), reducer);
    const newStore = redux_1.createStore(persistedReducer, enhancer);
    redux_persist_1.persistStore(newStore, null, config.offline.persistCallback);
    exports.store = newStore;
    config.transloadit && service_1.setTransloaditReduxStore(exports.store);
    epicMiddleware.run(redux_observable_1.combineEpics(...ramda_1.default.values(epics)));
    return newStore;
};
exports.store = null;
//# sourceMappingURL=createStore.js.map