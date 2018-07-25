import { AxiosPromise } from 'axios';

export const AbyssConfig = {
  api: {
    serverUrl: '',
    prefix: '/api/v1',
    timeout: 4000,
    // tslint:disable-next-line
    offlineCalls: {} as Record<string, (...args: any[]) => AxiosPromise>,
    authCalls: [] as string[]
  },
  redux: {
    reducerVersion: '0'
  }
};
