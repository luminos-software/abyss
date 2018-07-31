"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-any
const jsonapi_datastore_1 = require("jsonapi-datastore");
const ramda_1 = __importDefault(require("ramda"));
const redux_persist_1 = require("redux-persist");
const jsonapiStore_1 = require("../api/jsonapiStore");
const DATASTORE_TYPE = 'JSONAPI_DATASTORE';
const DATASTORE_ARRAY_TYPE = 'JSONAPI_DATASTORE_ARRAY';
exports.jsonapiDatastorePersistence = redux_persist_1.createTransform(
// transform state coming from redux on its way to being serialized and stored
(inboundState, key) => serialize(inboundState, key), 
// transform state coming from storage, on its way to be rehydrated into redux
(outboundState, key) => deserialize(outboundState, key));
const serialize = (state, key) => {
    if (key !== 'data') {
        return state;
    }
    return ramda_1.default.map(object => {
        if (object instanceof jsonapi_datastore_1.JsonApiDataStoreModel) {
            return { type: DATASTORE_TYPE, data: object.serialize() };
        }
        if (isJsonApiDataStoreModelArray(object)) {
            return { type: DATASTORE_ARRAY_TYPE, data: object.map(store => store.serialize()) };
        }
        return object;
    }, state);
};
const deserialize = (state, key) => {
    if (key !== 'data' || !state || typeof state !== 'object') {
        return state;
    }
    return ramda_1.default.map(object => {
        if (isStoredModel(object)) {
            return jsonapiStore_1.datastore.sync(object.data);
        }
        if (isStoredModelArray(object)) {
            return object.data.map((element) => jsonapiStore_1.datastore.sync(element));
        }
        return object;
    }, state);
};
const isStoredModel = (object) => object && typeof object === 'object' && object.type === DATASTORE_TYPE;
const isStoredModelArray = (object) => object && typeof object === 'object' && object.type === DATASTORE_ARRAY_TYPE;
const isJsonApiDataStoreModelArray = (object) => object instanceof Array && object[0] instanceof jsonapi_datastore_1.JsonApiDataStoreModel;
//# sourceMappingURL=jsonapiDatastorePersistence.js.map