import '@redux-offline/redux-offline';
import { AxiosPromise } from '../node_modules/axios';
export { Api, ApiActions, Repository } from 'api/api';
export { ReduxUtil } from './redux/util';
export declare const AbyssConfig: {
    api: {
        serverUrl: string;
        prefix: string;
        timeout: number;
    };
    redux: {
        reducerVersion: string;
        blacklist: string[];
        offlineCalls: Record<string, (x: any) => AxiosPromise<any>>;
    };
};
