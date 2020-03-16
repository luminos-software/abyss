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
};
export interface ApiError {
    errors: string[];
    httpCode: number | null;
    isJsonApiError: boolean;
    data: any;
    config: AxiosRequestConfig;
}
export {};
