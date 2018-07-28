import { AxiosPromise } from 'axios';
import { Store } from 'redux';
import { ActionCreator } from 'typescript-fsa';
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
        store: Store<any, import("../../../../../Users/radu/work/abyss/node_modules/redux").AnyAction> | null;
    };
    transloadit: {
        key: string;
        secret: string;
        notifiyUrl: string;
        templates: Record<string, string>;
        progressAction: ActionCreator<{
            file: string;
            written: number;
            total: number;
        }> | null;
    };
};
