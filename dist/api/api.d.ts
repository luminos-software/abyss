import { OfflineAction } from '@redux-offline/redux-offline/lib/types';
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { AsyncActionCreators } from 'typescript-fsa';
export interface IApiAction<T, P> {
    type: 'API_CALL';
    actions: {
        start: {
            type: string;
        };
        success: {
            type: string;
        };
        fail: {
            type: string;
        };
    };
    promise: AxiosPromise<T>;
    params: P;
}
interface IOfflineApiAction<A, P> extends OfflineAction {
    type: 'OFFLINE_API_CALL';
    meta: {
        offline: {
            effect: {
                action: A;
                params: P;
                commit: string;
                rollback: string;
            };
        };
    };
}
interface IJsonapiRequest<T> {
    data: {
        id?: number;
        attributes?: T;
    };
}
export declare const Api: {
    setAuthToken(value: string | null): void;
    getAuthToken(): string | null;
    setHeader(header: string, value: string | null | undefined): void;
};
export declare class Repository<T> {
    get(path: string): Promise<import("axios").AxiosResponse<T>>;
    post<R>(path: string, body: IJsonapiRequest<R>): Promise<import("axios").AxiosResponse<T>>;
    postFreeForm<R>(path: string, body: R): Promise<import("axios").AxiosResponse<T>>;
    put(path: string, body: IJsonapiRequest<T>): Promise<import("axios").AxiosResponse<T>>;
    patch(path: string, body: IJsonapiRequest<Partial<T>>): Promise<import("axios").AxiosResponse<T>>;
    delete(path: string): AxiosPromise<null>;
}
export declare const ApiActions: {
    directCall<P, S, E>(promise: AxiosPromise<S>, asyncAction: AsyncActionCreators<P, S, E>, params: P): IApiAction<S, P>;
    offlineCall<A, P_1, S_1, E_1>(action: A, asyncAction: AsyncActionCreators<P_1, S_1, E_1>, params: P_1): IOfflineApiAction<A, P_1>;
};
export interface ApiError {
    errors: string[];
    httpCode: number | null;
    isJsonApiError: boolean;
    data: any;
    config: AxiosRequestConfig;
}
export {};
