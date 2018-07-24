import config from '@redux-offline/redux-offline/lib/defaults';
import { Config } from '@redux-offline/redux-offline/lib/types';
import { AxiosPromise } from 'axios';
import { AbyssConfig } from 'index';
import { AsyncStorage } from 'react-native';
// import { AppActions } from '../modules/reducer';
import { jsonapiDatastorePersistence } from './jsonapiDatastorePersistence';
// import { store } from './store';

export type OfflineReadyConfig = typeof AbyssConfig.redux.offlineCalls;
export type OfflineReadyCall = keyof OfflineReadyConfig;

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

export const offlineConfig: Config = {
  ...config,
  effect: (effect, action) => {
    if (action.type === 'OFFLINE_API_CALL') {
      return getApiCall(effect.action)(effect.params);
    }
    throw new Error(`Invalid offline action type: ${action.type}`);
  },
  defaultCommit: { type: 'offline/COMMIT' },
  defaultRollback: { type: 'offline/ROLLBACK' },

  // persistCallback: () => store.dispatch(AppActions.startup()),
  persistOptions: {
    blacklist: AbyssConfig.redux.blacklist,
    transforms: [jsonapiDatastorePersistence],
    debug: __DEV__
  },

  // for testing
  discard: () => false
  // retry: (a, retries) => {
  //   if (retries < 1) {
  //     return 2000;
  //   }
  // }
};

// tslint:disable-next-line:no-any
const getApiCall = (action: OfflineReadyCall): ((params: any) => AxiosPromise) => {
  const call = AbyssConfig.redux.offlineCalls[action];
  if (!call) {
    throw new Error(`Invalid API offline effect: ${action}`);
  }
  return call;
};
