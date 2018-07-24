import { Api } from 'api/api';
import { datastore } from '../api/jsonapiStore';
// tslint:disable-next-line:no-any
const isApiAction = (action) => action.type === Api.API_CALL;
export const apiMiddleware = () => next => action => {
    if (!isApiAction(action)) {
        next(action);
        return action;
    }
    next({ type: action.actions.start.type });
    action.promise
        .then(payload => {
        // insanely ugly hack, but I have no idea at this time how to ensure that another api call
        // does not get started between LOG_IN_DONE and the `action that would set the token
        // if (['login/LOG_IN_DONE', 'login/CREATE_USER_ACCOUNT_DONE'].includes(action.actions.success.type)) {
        //   Api.setAuthToken(payload.data.data.attributes.auth_token);
        // }
        next({
            payload: { result: getSuccessResult(payload.data), params: action.params, offline: false },
            type: action.actions.success.type
        });
    })
        .catch((error) => {
        const errorPayload = buildErrorPayload(error);
        if (!errorPayload.httpCode || errorPayload.httpCode >= 500) {
            // ErrorNotification.show(errorPayload);
        }
        next({
            type: action.actions.fail.type,
            payload: { error: errorPayload, params: action.params, offline: false }
        });
    });
    return action;
};
// tslint:disable-next-line:no-any
export const getSuccessResult = (data) => {
    if (data.data) {
        // jsonapi
        const result = datastore.syncWithMeta(data);
        return result.data;
    }
    else {
        return data;
    }
};
export const buildErrorPayload = (error) => {
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