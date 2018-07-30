import { createLogger } from 'redux-logger';
export const loggerMiddleware = createLogger({
    collapsed: true,
    predicate: () => __DEV__
});
//# sourceMappingURL=loggerMiddleware.js.map