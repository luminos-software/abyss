import { AxiosPromise } from 'axios';
export declare const AbyssConfig: {
    api: {
        serverUrl: string;
        prefix: string;
        timeout: number;
        offlineCalls: Record<string, (...args: any[]) => AxiosPromise<any>>;
        authCalls: string[];
    };
    redux: {
        reducerVersion: string;
    };
};
