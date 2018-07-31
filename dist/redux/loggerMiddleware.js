"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_logger_1 = require("redux-logger");
exports.loggerMiddleware = redux_logger_1.createLogger({
    collapsed: true,
    predicate: () => __DEV__
});
//# sourceMappingURL=loggerMiddleware.js.map