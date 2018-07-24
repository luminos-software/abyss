// tslint:disable:no-any
import { JsonApiDataStoreModel } from 'jsonapi-datastore';
import R from 'ramda';
import { createTransform } from 'redux-persist';
import { datastore } from '../api/jsonapiStore';
const DATASTORE_TYPE = 'JSONAPI_DATASTORE';
const DATASTORE_ARRAY_TYPE = 'JSONAPI_DATASTORE_ARRAY';
export const jsonapiDatastorePersistence = createTransform(
// transform state coming from redux on its way to being serialized and stored
(inboundState, key) => serialize(inboundState, key), 
// transform state coming from storage, on its way to be rehydrated into redux
(outboundState, key) => deserialize(outboundState, key));
const serialize = (state, key) => {
    if (key !== 'data') {
        return state;
    }
    return R.map(object => {
        if (object instanceof JsonApiDataStoreModel) {
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
    return R.map(object => {
        if (isStoredModel(object)) {
            return datastore.sync(object.data);
        }
        if (isStoredModelArray(object)) {
            return object.data.map((element) => datastore.sync(element));
        }
        return object;
    }, state);
};
const isStoredModel = (object) => object && typeof object === 'object' && object.type === DATASTORE_TYPE;
const isStoredModelArray = (object) => object && typeof object === 'object' && object.type === DATASTORE_ARRAY_TYPE;
const isJsonApiDataStoreModelArray = (object) => object instanceof Array && object[0] instanceof JsonApiDataStoreModel;
//# sourceMappingURL=jsonapiDatastorePersistence.js.map