import config from '@redux-offline/redux-offline/lib/defaults';
import { AbyssConfig } from 'index';
import { AsyncStorage } from 'react-native';
// import { AppActions } from '../modules/reducer';
import { jsonapiDatastorePersistence } from './jsonapiDatastorePersistence';
// clear the persist cache when reducerVersion changes (dev mostly)
AsyncStorage.getItem('reducerVersion')
    .then(localVersion => {
    if (localVersion !== AbyssConfig.redux.reducerVersion) {
        AsyncStorage.clear().then(() => AsyncStorage.setItem('reducerVersion', AbyssConfig.redux.reducerVersion));
    }
})
    .catch(() => {
    AsyncStorage.setItem('reducerVersion', AbyssConfig.redux.reducerVersion);
});
export const offlineConfig = Object.assign({}, config, { effect: (effect, action) => {
        if (action.type === 'OFFLINE_API_CALL') {
            return getApiCall(effect.action)(effect.params);
        }
        throw new Error(`Invalid offline action type: ${action.type}`);
    }, defaultCommit: { type: 'offline/COMMIT' }, defaultRollback: { type: 'offline/ROLLBACK' }, 
    // persistCallback: () => store.dispatch(AppActions.startup()),
    persistOptions: {
        blacklist: AbyssConfig.redux.blacklist,
        transforms: [jsonapiDatastorePersistence],
        debug: __DEV__
    }, 
    // for testing
    discard: () => false });
// tslint:disable-next-line:no-any
const getApiCall = (action) => {
    const call = AbyssConfig.redux.offlineCalls[action];
    if (!call) {
        throw new Error(`Invalid API offline effect: ${action}`);
    }
    return call;
};
//# sourceMappingURL=offline.js.map