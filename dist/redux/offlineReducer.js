"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_fsa_1 = __importDefault(require("typescript-fsa"));
const typescript_fsa_reducers_1 = require("typescript-fsa-reducers");
const actionCreator = typescript_fsa_1.default('offline');
exports.OfflineActions = {
    rollback: actionCreator('ROLLBACK'),
    commit: actionCreator('COMMIT')
};
const initialState = {};
exports.reducer = typescript_fsa_reducers_1.reducerWithInitialState(initialState).build();
//# sourceMappingURL=offlineReducer.js.map