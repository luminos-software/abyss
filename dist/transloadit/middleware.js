"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
exports.transloaditMiddleware = () => next => action => {
    if (action.type === 'transloadit/UPLOAD_FILE' && config_1.AbyssConfig.transloadit.progressAction) {
        next(config_1.AbyssConfig.transloadit.progressAction({ file: action.meta.offline.effect.fileUri, written: 0, total: 1 }));
    }
    return next(action);
};
//# sourceMappingURL=middleware.js.map