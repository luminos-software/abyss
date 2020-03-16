/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosPromise } from 'axios';

export type Arguments<T> = T extends (args: infer U) => any ? U : any;
export type InferFromAxiosReturnType<T> = T extends (...args: any[]) => AxiosPromise<infer U> ? U : any;
