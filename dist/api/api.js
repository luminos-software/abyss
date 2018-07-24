import axios from 'axios';
import { AbyssConfig } from '../config';
let api = null;
const getApi = () => {
    if (!api) {
        // we defer creation under the assumption that the config will be set before the first request
        api = axios.create({
            baseURL: `${AbyssConfig.api.serverUrl}${AbyssConfig.api.prefix}`,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: AbyssConfig.api.timeout
        });
    }
    return api;
};
let authToken = '';
export const Api = {
    API_CALL: 'API_CALL',
    setAuthToken(value) {
        getApi().defaults.headers.common.Authorization = `Token ${value}`;
        authToken = value;
    },
    getAuthToken() {
        return authToken;
    }
};
export class Repository {
    get(path) {
        return getApi().get(path);
    }
    post(path, body) {
        return getApi().post(path, body);
    }
    put(path, body) {
        return getApi().put(path, body);
    }
    patch(path, body) {
        return getApi().patch(path, body);
    }
    delete(path) {
        return getApi().delete(path);
    }
}
// tslint:disable-next-line:no-any
// type Arguments<T> = T extends (args: infer U) => any ? U : any;
// tslint:disable-next-line:no-any
// type InferFromAxios<T> = T extends AxiosPromise<infer U> ? U : any;
export const ApiActions = {
    directCall(promise, asyncAction, params) {
        return {
            type: 'API_CALL',
            actions: {
                start: { type: asyncAction.started.type },
                success: { type: asyncAction.done.type },
                fail: { type: asyncAction.failed.type }
            },
            promise,
            params
        };
    },
    offlineCall(action, asyncAction, params) {
        return {
            type: 'OFFLINE_API_CALL',
            meta: {
                offline: {
                    effect: { action, params, commit: asyncAction.done.type, rollback: asyncAction.failed.type }
                }
            }
        };
    }
};
//# sourceMappingURL=api.js.map