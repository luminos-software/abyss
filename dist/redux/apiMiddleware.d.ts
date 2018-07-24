import { AxiosError } from 'axios';
import { Middleware } from 'redux';
import { IApiError } from '../api/api';
export declare const apiMiddleware: Middleware;
export declare const getSuccessResult: (data: any) => any;
export declare const buildErrorPayload: (error: AxiosError) => IApiError;
