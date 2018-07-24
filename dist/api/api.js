import axios from 'axios';
import { AbyssConfig } from '..';
const api = axios.create({
    baseURL: `${AbyssConfig.api.serverUrl}${AbyssConfig.api.prefix}`,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: AbyssConfig.api.timeout
});
let authToken = '';
export const Api = {
    API_CALL: 'API_CALL',
    setAuthToken(value) {
        api.defaults.headers.common.Authorization = `Token ${value}`;
        authToken = value;
    },
    getAuthToken() {
        return authToken;
    }
};
export class Repository {
    get(path) {
        return api.get(path);
    }
    post(path, body) {
        return api.post(path, body);
    }
    put(path, body) {
        return api.put(path, body);
    }
    patch(path, body) {
        return api.patch(path, body);
    }
    delete(path) {
        return api.delete(path);
    }
}
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