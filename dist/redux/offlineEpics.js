import { buildErrorPayload, getSuccessResult } from 'redux/apiMiddleware';
import { filter, map } from 'rxjs/operators';
import { OfflineActions } from './offlineReducer';
export const offlineRollback = action$ => action$.pipe(filter(OfflineActions.rollback.match), map(action => {
    const meta = action.meta;
    const effect = meta.offlineAction.meta.offline.effect;
    return {
        type: effect.rollback,
        // tslint:disable-next-line:no-any
        payload: { params: effect.params, error: buildErrorPayload(action.payload), offline: true }
    };
}));
export const offlineCommit = action$ => action$.pipe(filter(OfflineActions.commit.match), map(action => {
    const meta = action.meta;
    const effect = meta.offlineAction.meta.offline.effect;
    // tslint:disable-next-line:no-any
    const payload = action.payload;
    return {
        type: effect.commit,
        payload: { result: getSuccessResult(payload.data), params: effect.params, offline: true }
    };
}));
//# sourceMappingURL=offlineEpics.js.map