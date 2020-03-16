"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const redux_offline_1 = require("@redux-offline/redux-offline");
const ramda_1 = __importDefault(require("ramda"));
const redux_1 = require("redux");
const developmentOnly_1 = require("redux-devtools-extension/developmentOnly");
const redux_observable_1 = require("redux-observable");
const middleware_1 = require("../transloadit/middleware");
const service_1 = require("../transloadit/service");
const apiMiddleware_1 = require("./apiMiddleware");
const loggerMiddleware_1 = require("./loggerMiddleware");
const offline_1 = require("./offline");
const offlineEpics = __importStar(require("./offlineEpics"));
const compact = ramda_1.default.reject(ramda_1.default.isNil);
exports.createReduxStore = (epics, reducers, config) => {
    const epicMiddleware = redux_observable_1.createEpicMiddleware();
    const offlineEnhancer = config.offline ? redux_offline_1.offline(ramda_1.default.mergeDeepRight(offline_1.offlineConfig, config.offline)) : null;
    const middlewares = compact([
        apiMiddleware_1.apiMiddleware,
        config.transloadit ? middleware_1.transloaditMiddleware : null,
        epicMiddleware,
        config.logger ? loggerMiddleware_1.loggerMiddleware : null
    ]);
    const enhancers = compact([
        offlineEnhancer,
        redux_1.applyMiddleware(...middlewares),
        developmentOnly_1.devToolsEnhancer({})
    ]);
    const enhancer = redux_1.compose(...enhancers);
    const reducer = redux_1.combineReducers(reducers);
    const newStore = redux_1.createStore(reducer, enhancer);
    exports.store = newStore;
    config.transloadit && service_1.setTransloaditReduxStore(exports.store);
    epicMiddleware.run(redux_observable_1.combineEpics(...ramda_1.default.values(ramda_1.default.mergeAll([offlineEpics, epics]))));
    return newStore;
};
exports.store = null;
//# sourceMappingURL=createStore.js.map