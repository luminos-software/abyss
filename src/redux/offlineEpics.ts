import { OfflineAction } from '@redux-offline/redux-offline/lib/types';
import { AxiosResponse } from 'axios';
import { Action } from 'redux';
import { Epic } from 'redux-observable';
import { filter, map } from 'rxjs/operators';
import { buildErrorPayload, getSuccessResult } from './apiMiddleware';
import { OfflineActions } from './offlineReducer';

interface IOfflineActionMeta {
  offlineAction: OfflineAction;
}

interface IEffect {
  action: string;
  params: {};
  commit: string;
  rollback: string;
}

export const offlineRollback: Epic<Action, Action> = action$ =>
  action$.pipe(
    filter(OfflineActions.rollback.match),
    map(action => {
      const meta = action.meta as IOfflineActionMeta;
      const effect = meta.offlineAction.meta.offline.effect as IEffect;

      return {
        type: effect.rollback,
        // tslint:disable-next-line:no-any
        payload: { params: effect.params, error: buildErrorPayload(action.payload as any), offline: true }
      };
    })
  );

export const offlineCommit: Epic<Action, Action> = action$ =>
  action$.pipe(
    filter(OfflineActions.commit.match),
    map(action => {
      const meta = action.meta as IOfflineActionMeta;
      const effect = meta.offlineAction.meta.offline.effect as IEffect;
      // tslint:disable-next-line:no-any
      const payload: AxiosResponse = action.payload as any;

      return {
        type: effect.commit,
        payload: { result: getSuccessResult(payload.data), params: effect.params, offline: true }
      };
    })
  );
