import R from 'ramda';
import { combineEpics } from 'redux-observable';
// credit: https://github.com/nozzlegear/import-to-array
function importToArray(importObject) {
    const keys = Object.getOwnPropertyNames(importObject);
    // ES6 / TypeScript exports contain a __esModule property. Don't include that.
    return keys.filter(key => key.indexOf('__') !== 0).map(key => importObject[key]);
}
export const ReduxUtil = {
    combineEpics(...epics) {
        return combineEpics(...importToArray(R.mergeAll(epics)));
    }
};
//# sourceMappingURL=util.js.map