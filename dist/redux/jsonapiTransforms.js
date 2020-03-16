"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const jsonapiStore_1 = require("../api/jsonapiStore");
const DATASTORE_TYPE = 'JSONAPI_DATASTORE';
const DATASTORE_ARRAY_TYPE = 'JSONAPI_DATASTORE_ARRAY';
exports.serializeValue = (object) => {
    const result = {};
    for (const key in object) {
        if (object[key] instanceof jsonapiStore_1.JsonApiDataStoreModel) {
            result[key] = { type: DATASTORE_TYPE, data: object[key].serialize() };
        }
        else if (isJsonApiDataStoreModelArray(object[key])) {
            result[key] = { type: DATASTORE_ARRAY_TYPE, data: object[key].map((s) => s.serialize()) };
        }
        else {
            result[key] = object[key];
        }
    }
    return result;
};
exports.deserializeValue = (object) => {
    const result = {};
    for (const key in object) {
        if (isStoredModel(object[key])) {
            result[key] = jsonapiStore_1.datastore.sync(object[key].data);
        }
        else if (isStoredModelArray(object[key])) {
            result[key] = object[key].data.map((element) => jsonapiStore_1.datastore.sync(element));
        }
        else {
            result[key] = object[key];
        }
    }
    return result;
};
const isStoredModel = (object) => object && typeof object === 'object' && object.type === DATASTORE_TYPE;
const isStoredModelArray = (object) => object && typeof object === 'object' && object.type === DATASTORE_ARRAY_TYPE;
const isJsonApiDataStoreModelArray = (object) => object instanceof Array && object[0] instanceof jsonapiStore_1.JsonApiDataStoreModel;
//# sourceMappingURL=jsonapiTransforms.js.map