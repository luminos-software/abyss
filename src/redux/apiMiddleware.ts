import { AxiosError } from 'axios';
// import { ErrorNotification } from 'lib/ErrorNotification';
import { Action, Middleware } from 'redux';
import { Api, ApiError, IApiAction } from '../api/api';
import { datastore } from '../api/jsonapiStore';
import { AbyssConfig } from '../config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isApiAction = (action: Action): action is IApiAction<any, any> => action.type === 'API_CALL';

export const apiMiddleware: Middleware = () => next => action => {
  if (!isApiAction(action)) {
    next(action);
    return action;
  }

  next({ type: action.actions.start.type, payload: action.params });

  action.promise
    .then(payload => {
      // insanely ugly hack, but I have no idea at this time how to ensure that another api call
      // does not get started between LOG_IN_DONE and the action that would set the token
      if (AbyssConfig.api.authCalls.includes(action.actions.success.type)) {
        Api.setAuthToken(payload.data.data.attributes.auth_token);
      }

      next({
        payload: { result: getSuccessResult(payload.data), params: action.params, offline: false },
        type: action.actions.success.type
      });
    })
    .catch((error: AxiosError) => {
      const errorPayload = buildErrorPayload(error);

      if (!errorPayload.httpCode || errorPayload.httpCode >= 400) {
        AbyssConfig.api.onError && AbyssConfig.api.onError(errorPayload);
      }

      next({
        type: action.actions.fail.type,
        payload: { error: errorPayload, params: action.params, offline: false }
      });
    });
  return action;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSuccessResult = (data: any) => {
  if (data.data) {
    // jsonapi
    const result = datastore.syncWithMeta(data);
    return result.data;
  }
  return data;
};

export const buildErrorPayload = (error: AxiosError) => {
  const payload = error.response || {
    statusText: error.message,
    status: null, // TIMEOUT
    data: null
  };
  const isJsonApiError = !!(payload.data && payload.data.errors);
  const errorPayload: ApiError = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: isJsonApiError ? payload.data.errors.map((errorObj: any) => errorObj.detail) : [payload.statusText],
    httpCode: payload.status,
    isJsonApiError,
    data: payload.data,
    config: error.config
  };

  return errorPayload;
};
