import { AxiosPromise } from 'axios';

export const AbyssConfig = {
  api: {
    serverUrl: '',
    prefix: '/api/v1',
    timeout: 4000,
    offlineCalls: {} as Record<string, (...args: any[]) => AxiosPromise>
  },
  redux: {
    reducerVersion: '0'
  }
};
