"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const apiMiddleware_1 = require("./apiMiddleware");
const offlineReducer_1 = require("./offlineReducer");
exports.offlineRollback = action$ => action$.pipe(operators_1.filter(offlineReducer_1.OfflineActions.rollback.match), operators_1.map(action => {
    const meta = action.meta;
    const effect = meta.offlineAction.meta.offline.effect;
    return {
        type: effect.rollback,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        payload: { params: effect.params, error: apiMiddleware_1.buildErrorPayload(action.payload), offline: true }
    };
}));
exports.offlineCommit = action$ => action$.pipe(operators_1.filter(offlineReducer_1.OfflineActions.commit.match), operators_1.map(action => {
    const meta = action.meta;
    const effect = meta.offlineAction.meta.offline.effect;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = action.payload;
    return {
        type: effect.commit,
        payload: { result: apiMiddleware_1.getSuccessResult(payload.data), params: effect.params, offline: true }
    };
}));
//# sourceMappingURL=offlineEpics.js.map