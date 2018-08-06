"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
let api = null;
const getApi = () => {
    if (!api) {
        // we defer creation under the assumption that the config will be set before the first request
        api = axios_1.default.create({
            baseURL: `${config_1.AbyssConfig.api.serverUrl}${config_1.AbyssConfig.api.prefix}`,
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: config_1.AbyssConfig.api.timeout
        });
    }
    return api;
};
let authToken = '';
exports.Api = {
    setAuthToken(value) {
        getApi().defaults.headers.common.Authorization = `Token ${value}`;
        authToken = value;
    },
    getAuthToken() {
        return authToken;
    }
};
class Repository {
    get(path) {
        return getApi().get(path);
    }
    post(path, body) {
        return getApi().post(path, body);
    }
    postFreeForm(path, body) {
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
exports.Repository = Repository;
exports.ApiActions = {
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