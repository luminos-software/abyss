"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const redux_persist_1 = require("redux-persist");
const jsonapiTransforms_1 = require("./jsonapiTransforms");
exports.jsonapiDatastorePersistence = redux_persist_1.createTransform(
// transform state coming from redux on its way to being serialized and stored
(inboundState, key) => serialize(inboundState, key), 
// transform state coming from storage, on its way to be rehydrated into redux
(outboundState, key) => deserialize(outboundState, key));
const serialize = (state, key) => {
    if (key !== 'data') {
        return state;
    }
    return jsonapiTransforms_1.serializeValue(state);
};
const deserialize = (state, key) => {
    if (key !== 'data' || !state || typeof state !== 'object') {
        return state;
    }
    return jsonapiTransforms_1.deserializeValue(state);
};
//# sourceMappingURL=jsonapiDatastorePersistence.js.map