import { AxiosPromise } from 'axios';
import { ActionCreator } from 'typescript-fsa';

// tslint:disable:no-object-literal-type-assertion
export const AbyssConfig = {
  api: {
    serverUrl: '',
    prefix: '/api/v1',
    timeout: 4000,
    // tslint:disable-next-line:no-any
    offlineCalls: {} as Record<string, (...args: any[]) => AxiosPromise>,
    authCalls: [] as string[]
  },
  redux: {
    reducerVersion: '0'
  },
  transloadit: {
    key: '',
    secret: '',
    notifiyUrl: 'https://localhost/transloadit/file_upload',
    templates: {} as Record<string, string>,
    progressAction: null as ActionCreator<{ file: string; written: number; total: number }> | null
  }
};
