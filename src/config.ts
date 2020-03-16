import { AxiosPromise } from 'axios';
import { ActionCreator } from 'typescript-fsa';
import { ApiError } from './api/api';

interface IAbyssConfig {
  api: {
    serverUrl: string;
    prefix: string;
    timeout: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offlineCalls: Record<string, (...args: any[]) => AxiosPromise>;
    authCalls: string[];
    onError?: (error: ApiError) => void;
  };
  redux: {
    reducerVersion: string;
  };
  transloadit: {
    key: string;
    secret: string;
    notifiyUrl: string;
    templates: Record<string, string>;
    progressAction: ActionCreator<{ file: string; written: number; total: number }> | null;
  };
  theme: {
    colors: Record<string, string>;
  };
}

export const AbyssConfig: IAbyssConfig = {
  api: {
    serverUrl: '',
    prefix: '/api/v1',
    timeout: 4000,
    offlineCalls: {},
    authCalls: []
  },
  redux: {
    reducerVersion: '0'
  },
  transloadit: {
    key: '',
    secret: '',
    notifiyUrl: 'https://localhost/transloadit/file_upload',
    templates: {},
    progressAction: null
  },
  theme: { colors: {} }
};
