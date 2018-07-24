import '@redux-offline/redux-offline';
import { AxiosPromise } from '../node_modules/axios';

export { Api, ApiActions, Repository } from './api/api';
export { ReduxUtil } from './redux/util';

export const AbyssConfig = {
  api: {
    serverUrl: '',
    prefix: '/api/v1',
    timeout: 4000
  },
  redux: {
    reducerVersion: '0',
    blacklist: ['volatile'],
    offlineCalls: {} as Record<string, (x: any) => AxiosPromise>
  }
};
