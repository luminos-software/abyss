import { IApiError } from 'api/api';
import { AxiosError } from 'axios';
import { Middleware } from 'redux';
export declare const apiMiddleware: Middleware;
export declare const getSuccessResult: (data: any) => any;
export declare const buildErrorPayload: (error: AxiosError) => IApiError;
