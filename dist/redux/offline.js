"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaults_1 = __importDefault(require("@redux-offline/redux-offline/lib/defaults"));
const react_native_1 = require("react-native");
const config_1 = require("../config");
const service_1 = require("../transloadit/service");
const jsonapiDatastorePersistence_1 = require("./jsonapiDatastorePersistence");
// clear the persist cache when reducerVersion changes (dev mostly)
react_native_1.AsyncStorage.getItem('reducerVersion')
    .then(localVersion => {
    if (localVersion !== config_1.AbyssConfig.redux.reducerVersion) {
        react_native_1.AsyncStorage.clear().then(() => react_native_1.AsyncStorage.setItem('reducerVersion', config_1.AbyssConfig.redux.reducerVersion));
    }
})
    .catch(() => {
    react_native_1.AsyncStorage.setItem('reducerVersion', config_1.AbyssConfig.redux.reducerVersion);
});
exports.offlineConfig = Object.assign({}, defaults_1.default, { effect: (effect, action) => {
        if (action.type === 'OFFLINE_API_CALL') {
            return getApiCall(effect.action)(effect.params);
        }
        if (action.type === 'transloadit/UPLOAD_FILE') {
            return service_1.uploadFile(effect);
        }
        throw new Error(`Invalid offline action type: ${action.type}`);
    }, defaultCommit: { type: 'offline/COMMIT' }, defaultRollback: { type: 'offline/ROLLBACK' }, persistOptions: {
        transforms: [jsonapiDatastorePersistence_1.jsonapiDatastorePersistence],
        debug: __DEV__
    } });
// tslint:disable-next-line:no-any
const getApiCall = (action) => {
    const call = config_1.AbyssConfig.api.offlineCalls[action];
    if (!call) {
        throw new Error(`Invalid API offline effect: ${action}`);
    }
    return call;
};
//# sourceMappingURL=offline.js.map