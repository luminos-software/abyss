import { AxiosError, AxiosPromise } from 'axios';
import { ActionCreator } from 'typescript-fsa';
interface IAbyssConfig {
    api: {
        serverUrl: string;
        prefix: string;
        timeout: number;
        offlineCalls: Record<string, (...args: any[]) => AxiosPromise>;
        authCalls: string[];
        onError?: (error: AxiosError) => void;
    };
    redux: {
        reducerVersion: string;
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
    theme: {
        colors: Record<string, string>;
    };
}
export declare const AbyssConfig: IAbyssConfig;
export {};
