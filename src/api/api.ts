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

let authToken: string | null = '';
export const Api = {
  setAuthToken(value: string | null): void {
    getApi().defaults.headers.common.Authorization = `Token ${value}`;
    authToken = value;
  },

  getAuthToken() {
    return authToken;
  },

  setHeader(header: string, value: string | null | undefined) {
    getApi().defaults.headers.common[header] = value;
  }
};

export class Repository<T> {
  get(path: string) {
    return getApi().get<T>(path);
  }

  post<R>(path: string, body: IJsonapiRequest<R>) {
    return getApi().post<T>(path, body);
  }

  postFreeForm<R>(path: string, body: R) {
    return getApi().post<T>(path, body);
  }

  put(path: string, body: IJsonapiRequest<T>) {
    return getApi().put<T>(path, body);
  }

  patch(path: string, body: IJsonapiRequest<Partial<T>>) {
    return getApi().patch<T>(path, body);
  }

  delete(path: string) {
    return getApi().delete(path) as AxiosPromise<null>;
  }
}

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
  }
};

export interface ApiError {
  errors: string[];
  httpCode: number | null;
  isJsonApiError: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  config: AxiosRequestConfig;
}
