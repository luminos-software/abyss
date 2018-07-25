import R from 'ramda';
import { combineEpics } from 'redux-observable';
// credit: https://github.com/nozzlegear/import-to-array
export function importToArray(importObject) {
    var keys = Object.getOwnPropertyNames(importObject);
    // ES6 / TypeScript exports contain a __esModule property. Don't include that.
    return keys.filter(function (key) { return key.indexOf('__') !== 0; }).map(function (key) { return importObject[key]; });
}
export var ReduxUtil = {
    combineEpics: function () {
        var epics = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            epics[_i] = arguments[_i];
        }
        return combineEpics(R.values(R.mergeAll(epics)));
    }
};
//# sourceMappingURL=redux.js.map