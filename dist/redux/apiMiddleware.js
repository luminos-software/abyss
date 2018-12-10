"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../api/api");
const jsonapiStore_1 = require("../api/jsonapiStore");
const config_1 = require("../config");
// tslint:disable-next-line:no-any
const isApiAction = (action) => action.type === 'API_CALL';
exports.apiMiddleware = () => next => action => {
    if (!isApiAction(action)) {
        next(action);
        return action;
    }
    next({ type: action.actions.start.type, payload: action.params });
    action.promise
        .then(payload => {
        // insanely ugly hack, but I have no idea at this time how to ensure that another api call
        // does not get started between LOG_IN_DONE and the action that would set the token
        if (config_1.AbyssConfig.api.authCalls.includes(action.actions.success.type)) {
            api_1.Api.setAuthToken(payload.data.data.attributes.auth_token);
        }
        next({
            payload: { result: exports.getSuccessResult(payload.data), params: action.params, offline: false },
            type: action.actions.success.type
        });
    })
        .catch((error) => {
        const errorPayload = exports.buildErrorPayload(error);
        if (!errorPayload.httpCode || errorPayload.httpCode >= 400) {
            config_1.AbyssConfig.api.onError && config_1.AbyssConfig.api.onError(errorPayload);
        }
        next({
            type: action.actions.fail.type,
            payload: { error: errorPayload, params: action.params, offline: false }
        });
    });
    return action;
};
// tslint:disable-next-line:no-any
exports.getSuccessResult = (data) => {
    if (data.data) {
        // jsonapi
        const result = jsonapiStore_1.datastore.syncWithMeta(data);
        return result.data;
    }
    else {
        return data;
    }
};
exports.buildErrorPayload = (error) => {
    const payload = error.response || {
        statusText: error.message,
        status: null,
        data: null
    };
    const isJsonApiError = !!(payload.data && payload.data.errors);
    const errorPayload = {
        errors: isJsonApiError ? payload.data.errors.map((errorObj) => errorObj.detail) : [payload.statusText],
        httpCode: payload.status,
        isJsonApiError,
        data: payload.data,
        config: error.config
    };
    return errorPayload;
};
//# sourceMappingURL=apiMiddleware.js.map