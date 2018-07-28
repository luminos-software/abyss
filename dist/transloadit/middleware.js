import { AbyssConfig } from '../config';
export const transloaditMiddleware = () => next => action => {
    if (action.type === 'transloadit/UPLOAD_FILE' && AbyssConfig.transloadit.progressAction) {
        next(AbyssConfig.transloadit.progressAction({ file: action.meta.offline.effect.fileUri, written: 0, total: 1 }));
    }
    return next(action);
};
//# sourceMappingURL=middleware.js.map