import { AxiosPromise } from 'axios';

// tslint:disable-next-line:no-any
export type Arguments<T> = T extends (args: infer U) => any ? U : any;
// tslint:disable-next-line:no-any
export type InferFromAxiosReturnType<T> = T extends (...args: any[]) => AxiosPromise<infer U> ? U : any;
