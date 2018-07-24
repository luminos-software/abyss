import { OfflineAction } from '@redux-offline/redux-offline/lib/types';
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { OfflineReadyCall } from 'redux/offline';
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
export interface IOfflineApiAction<P> extends OfflineAction {
    type: 'OFFLINE_API_CALL';
    meta: {
        offline: {
            effect: {
                action: OfflineReadyCall;
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
    API_CALL: string;
    setAuthToken(value: string): void;
    getAuthToken(): string;
};
export declare class Repository<T> {
    get(path: string): AxiosPromise<T>;
    post<R>(path: string, body: IJsonapiRequest<R>): AxiosPromise<T>;
    put(path: string, body: IJsonapiRequest<T>): AxiosPromise<T>;
    patch(path: string, body: IJsonapiRequest<Partial<T>>): AxiosPromise<T>;
    delete(path: string): AxiosPromise<any>;
}
declare type Arguments<T> = T extends (args: infer U) => any ? U : any;
declare type InferFromAxios<T> = T extends AxiosPromise<infer U> ? U : any;
export declare const ApiActions: {
    directCall<P, S, E>(promise: AxiosPromise<S>, asyncAction: AsyncActionCreators<P, S, E>, params: P): IApiAction<S, P>;
    offlineCall<A extends string, P extends Arguments<Record<string, (x: any) => AxiosPromise<any>>[A]>, S extends InferFromAxios<ReturnType<Record<string, (x: any) => AxiosPromise<any>>[A]>>, E>(action: A, asyncAction: AsyncActionCreators<P, S, E>, params: P): IOfflineApiAction<P>;
};
export interface IApiError {
    errors: string[];
    httpCode: number | null;
    isJsonApiError: boolean;
    data: any;
    config: AxiosRequestConfig;
}
export {};
