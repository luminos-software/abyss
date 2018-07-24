import R from 'ramda';
import { combineEpics } from 'redux-observable';

// credit: https://github.com/nozzlegear/import-to-array
function importToArray<PropType>(importObject: { [key: string]: PropType }): PropType[] {
  const keys = Object.getOwnPropertyNames(importObject);
  // ES6 / TypeScript exports contain a __esModule property. Don't include that.
  return keys.filter(key => key.indexOf('__') !== 0).map(key => importObject[key]);
}

export const ReduxUtil = {
  combineEpics(...epics: Record<string, any>[]) {
    return combineEpics<any>(...importToArray(R.mergeAll(epics)));
  }
};
