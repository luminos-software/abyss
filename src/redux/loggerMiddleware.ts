import { createLogger } from 'redux-logger';

export const loggerMiddleware = createLogger({
  collapsed: true,
  predicate: () => __DEV__
});
