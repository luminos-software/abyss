import config from '@redux-offline/redux-offline/lib/defaults';
import { Config } from '@redux-offline/redux-offline/lib/types';
import { AxiosPromise } from 'axios';
import { AsyncStorage } from 'react-native';
import { AbyssConfig } from '../config';
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

  persistOptions: {
    transforms: [jsonapiDatastorePersistence],
    debug: __DEV__
  }
};

// tslint:disable-next-line:no-any
const getApiCall = (action: keyof typeof AbyssConfig.api.offlineCalls): ((params: any) => AxiosPromise) => {
  const call = AbyssConfig.api.offlineCalls[action];
  if (!call) {
    throw new Error(`Invalid API offline effect: ${action}`);
  }
  return call;
};
