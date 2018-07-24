import { OfflineAction } from '@redux-offline/redux-offline/lib/types';
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import { AsyncActionCreators } from 'typescript-fsa';
import { AbyssConfig } from '../config';

export interface IApiAction<T, P> {
  type: 'API_CALL';
  actions: {
    start: { type: string };
    success: { type: string };
    fail: { type: string };
  };
  promise: AxiosPromise<T>;
  params: P;
}

export interface IOfflineApiAction<A, P> extends OfflineAction {
  type: 'OFFLINE_API_CALL';
  meta: {
    offline: {
      effect: { action: A; params: P; commit: string; rollback: string };
    };
  };
}

interface IJsonapiRequest<T> {
  data: {
    id?: number;
    attributes?: T;
  };
}

let api: AxiosInstance | null = null;
const getApi = () => {
  if (!api) {
    // we defer creation under the assumption that the config will be set before the first request
    api = axios.create({
      baseURL: `${AbyssConfig.api.serverUrl}${AbyssConfig.api.prefix}`,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: AbyssConfig.api.timeout
    });
  }
  return api;
};

let authToken = '';
export const Api = {
  API_CALL: 'API_CALL',

  setAuthToken(value: string): void {
    getApi().defaults.headers.common.Authorization = `Token ${value}`;
    authToken = value;
  },

  getAuthToken(): string {
    return authToken;
  }
};

export class Repository<T> {
  get(path: string) {
    return getApi().get<T>(path);
  }

  post<R>(path: string, body: IJsonapiRequest<R>) {
    return getApi().post<T>(path, body);
  }

  put(path: string, body: IJsonapiRequest<T>) {
    return getApi().put<T>(path, body);
  }

  patch(path: string, body: IJsonapiRequest<Partial<T>>) {
    return getApi().patch<T>(path, body);
  }

  delete(path: string) {
    return getApi().delete(path);
  }
}

// tslint:disable-next-line:no-any
// type Arguments<T> = T extends (args: infer U) => any ? U : any;
// tslint:disable-next-line:no-any
// type InferFromAxios<T> = T extends AxiosPromise<infer U> ? U : any;

export const ApiActions = {
  directCall<P, S, E>(
    promise: AxiosPromise<S>,
    asyncAction: AsyncActionCreators<P, S, E>,
    params: P
  ): IApiAction<S, P> {
    return {
      type: 'API_CALL',
      actions: {
        start: { type: asyncAction.started.type },
        success: { type: asyncAction.done.type },
        fail: { type: asyncAction.failed.type }
      },
      promise,
      params
    };
  },

  offlineCall<A, P, S, E>(action: A, asyncAction: AsyncActionCreators<P, S, E>, params: P): IOfflineApiAction<A, P> {
    return {
      type: 'OFFLINE_API_CALL',
      meta: {
        offline: {
          effect: { action, params, commit: asyncAction.done.type, rollback: asyncAction.failed.type }
        }
      }
    };
  }
};

export interface IApiError {
  errors: string[];
  httpCode: number | null;
  isJsonApiError: boolean;
  data: any; // tslint:disable-line:no-any
  config: AxiosRequestConfig;
}
