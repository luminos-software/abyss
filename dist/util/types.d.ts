import { AxiosPromise } from 'axios';
export declare type Arguments<T> = T extends (args: infer U) => any ? U : any;
export declare type InferFromAxiosReturnType<T> = T extends (...args: any[]) => AxiosPromise<infer U> ? U : any;
